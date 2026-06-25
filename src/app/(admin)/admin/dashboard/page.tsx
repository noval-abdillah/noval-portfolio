'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';
import { Project } from '@/types';
import {
  UploadIcon,
  TrashIcon,
  PlusIcon,
  CheckIcon,
  ExternalLinkIcon,
  GitHubIcon,
  WarningIcon,
  InfoIcon,
  CloseIcon
} from '@/components/ui';
import { SVGSpinner } from '@/components/ui';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState<'projects' | 'resume'>('projects');
  const [formLoading, setFormLoading] = useState(false);
  
  // Status and feedback messaging states
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [dashboardError, setDashboardError] = useState<string | null>(null);
  const [dashboardSuccess, setDashboardSuccess] = useState<string | null>(null);

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeUploading, setResumeUploading] = useState(false);
  const [resumeSuccess, setResumeSuccess] = useState<string | null>(null);
  const [resumeError, setResumeError] = useState<string | null>(null);
  const [currentResumeUrl, setCurrentResumeUrl] = useState<string | null>(null);

  const router = useRouter();

  // Form input state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tech_stack: '',
    image: null as File | null,
    live_url: '',
    github_url: '',
  });

  useEffect(() => {
    fetchProjects();
    loadCurrentResumeUrl();
  }, []);

  async function fetchProjects() {
    setLoading(true);
    setDashboardError(null);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        setDashboardError(error.message);
        return;
      }

      setProjects((data as Project[]) ?? []);
    } catch (err) {
      setDashboardError(err instanceof Error ? err.message : 'Gagal memuat daftar proyek.');
    } finally {
      setLoading(false);
    }
  }

  const handleImageUpload = async (file: File): Promise<string> => {
    const supabase = createClient();
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `${fileName}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('project-thumbnails')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      throw new Error(`Gagal mengunggah berkas gambar: ${uploadError.message}`);
    }

    const { data: publicUrlData } = supabase.storage
      .from('project-thumbnails')
      .getPublicUrl(filePath);

    if (!publicUrlData || !publicUrlData.publicUrl) {
      throw new Error('Gagal mendapatkan tautan publik untuk berkas gambar.');
    }

    return publicUrlData.publicUrl;
  };

  const handleResumeUpload = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch(`/api/resume/upload?filename=${encodeURIComponent(file.name)}`, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.error || 'Gagal mengunggah resume.');
    }

    const blob = await res.json();
    return blob.url;
  };

  async function loadCurrentResumeUrl() {
    setCurrentResumeUrl('/resume/CV_Noval_AbdillahEN.pdf');
  }
  const triggerRevalidation = async () => {
    try {
      const res = await fetch('/api/revalidate', {
        method: 'POST',
      });
      if (!res.ok) {
        throw new Error('Gagal memperbarui cache server global.');
      }
    } catch (err) {
      // Revalidation warning is logged internally, but does not block dashboard experience
      console.warn('Revalidation warning:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError(null);
    setFormSuccess(null);

    if (!formData.image) {
      setFormError('Harap pilih gambar penjelas (thumbnail) proyek terlebih dahulu.');
      setFormLoading(false);
      return;
    }

    try {
      setUploading(true);
      const imageUrl = await handleImageUpload(formData.image);
      setUploading(false);

      const supabase = createClient();
      const techStackArray = formData.tech_stack
        .split(',')
        .map((tech) => tech.trim())
        .filter((tech) => tech.length > 0);

      const { error: insertError } = await supabase
        .from('projects')
        .insert([
          {
            title: formData.title,
            description: formData.description,
            tech_stack: techStackArray,
            image_url: imageUrl,
            live_url: formData.live_url || null,
            github_url: formData.github_url || null,
          },
        ]);

      if (insertError) {
        throw insertError;
      }

      setFormSuccess('Proyek berhasil ditambahkan ke database.');
      
      // Reset form fields
      setFormData({
        title: '',
        description: '',
        tech_stack: '',
        image: null,
        live_url: '',
        github_url: '',
      });
      
      // Close form panel after delay
      setTimeout(() => {
        setShowForm(false);
        setFormSuccess(null);
      }, 1500);

      // Revalidate Next.js cache and refresh UI
      await triggerRevalidation();
      router.refresh();
      await fetchProjects();
    } catch (err) {
      setUploading(false);
      setFormError(err instanceof Error ? err.message : 'Gagal menyimpan data proyek.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id: string, imageUrl: string) => {
    setDeleting(id);
    setDashboardError(null);
    setDashboardSuccess(null);

    try {
      const supabase = createClient();
      
      // 1. Delete record from database
      const { error: dbError } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (dbError) {
        throw dbError;
      }

      // 2. Parse filename and delete object from storage if url is present
      if (imageUrl) {
        const parts = imageUrl.split('/project-thumbnails/');
        if (parts.length > 1) {
          const fileName = parts[1].split('?')[0];
          if (fileName) {
            await supabase.storage
              .from('project-thumbnails')
              .remove([fileName]);
          }
        }
      }

      setDashboardSuccess('Proyek berhasil dihapus beserta aset gambar terkait.');
      
      setTimeout(() => {
        setDashboardSuccess(null);
      }, 3000);

      // Revalidate cache and refresh list
      await triggerRevalidation();
      router.refresh();
      await fetchProjects();
    } catch (err) {
      setDashboardError(err instanceof Error ? err.message : 'Gagal menghapus proyek dari database.');
    } finally {
      setDeleting(null);
    }
  };

  const handleLogout = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push('/admin/login');
      router.refresh();
    } catch (err) {
      setDashboardError('Gagal melakukan proses keluar.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <SVGSpinner size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      {/* Visual neon glow decorations */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-green-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        
        {/* Dashboard Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10 border-b border-zinc-900 pb-8">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight font-mono">
              ADMIN<span className="text-green-500">.</span>PANEL
            </h1>
            <p className="text-sm text-zinc-400 mt-1 font-mono">/ Manage your portfolio projects and resume real-time</p>
          </div>
          <div className="flex items-center gap-3">
            {activeTab === 'projects' && (
              <button
                onClick={() => setShowForm(!showForm)}
                className="px-5 py-2.5 bg-green-600 hover:bg-green-500 text-zinc-950 font-bold rounded-lg transition-all duration-300 flex items-center gap-2 text-sm shadow-[0_0_20px_rgba(34,197,94,0.15)] cursor-pointer"
              >
                <PlusIcon className="w-4 h-4 stroke-[3]" />
                <span>{showForm ? 'Tutup Form' : 'Tambah Proyek'}</span>
              </button>
            )}
            <button
              onClick={handleLogout}
              className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white font-semibold rounded-lg transition-all duration-300 text-sm cursor-pointer"
            >
              Keluar
            </button>
          </div>
        </div>

        {/* Global Dashboard Feedback Notification */}
        {dashboardError && (
          <div className="mb-8 p-4 bg-red-950/20 border border-red-800/40 rounded-xl flex items-start gap-3 text-red-400 animate-in fade-in slide-in-from-top-2 duration-300">
            <WarningIcon className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-red-200 text-sm">Kesalahan Sistem</h4>
              <p className="text-xs text-red-400/90 mt-1">{dashboardError}</p>
            </div>
          </div>
        )}

        {dashboardSuccess && (
          <div className="mb-8 p-4 bg-green-950/20 border border-green-800/40 rounded-xl flex items-start gap-3 text-green-400 animate-in fade-in slide-in-from-top-2 duration-300">
            <CheckIcon className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-green-200 text-sm">Berhasil</h4>
              <p className="text-xs text-green-400/90 mt-1">{dashboardSuccess}</p>
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex border-b border-zinc-900 mb-8 gap-6">
          <button
            onClick={() => setActiveTab('projects')}
            className={`pb-4 text-sm md:text-base font-semibold font-mono tracking-wider transition-all border-b-2 px-1 cursor-pointer ${
              activeTab === 'projects' 
                ? 'border-green-500 text-green-500' 
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            PROYEK ({projects.length})
          </button>
          <button
            onClick={() => setActiveTab('resume')}
            className={`pb-4 text-sm md:text-base font-semibold font-mono tracking-wider transition-all border-b-2 px-1 cursor-pointer ${
              activeTab === 'resume' 
                ? 'border-green-500 text-green-500' 
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            RESUME & CV
          </button>
        </div>

        {/* PROJECTS TAB CONTENT */}
        {activeTab === 'projects' && (
          <div className="space-y-8">
            {/* Inline Project Add Form */}
            {showForm && (
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/80 rounded-2xl p-6 md:p-8 shadow-xl animate-in slide-in-from-top-4 duration-300">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-850">
                  <h2 className="text-xl font-bold text-white font-mono">Tambah Proyek Baru</h2>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setFormError(null);
                      setFormSuccess(null);
                    }}
                    className="p-1.5 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <CloseIcon className="w-5 h-5" />
                  </button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {formError && (
                    <div className="p-4 bg-red-950/20 border border-red-800/40 rounded-xl flex items-start gap-3 text-red-400">
                      <WarningIcon className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-red-200 text-sm">Kesalahan Input</h4>
                        <p className="text-xs text-red-400/90 mt-1">{formError}</p>
                      </div>
                    </div>
                  )}

                  {formSuccess && (
                    <div className="p-4 bg-green-950/20 border border-green-800/40 rounded-xl flex items-start gap-3 text-green-400">
                      <CheckIcon className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-green-200 text-sm">Berhasil</h4>
                        <p className="text-xs text-green-400/90 mt-1">{formSuccess}</p>
                      </div>
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">Judul Proyek</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        placeholder="Nama platform atau aplikasi"
                        className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-green-500 transition-colors text-sm"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                        Tech Stack (pisahkan dengan koma)
                      </label>
                      <input
                        type="text"
                        value={formData.tech_stack}
                        onChange={(e) => setFormData({ ...formData, tech_stack: e.target.value })}
                        required
                        placeholder="Next.js, Tailwind CSS, PostgreSQL"
                        className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-green-500 transition-colors text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">Deskripsi Ringkas</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                      rows={4}
                      placeholder="Jelaskan fitur utama, peran Anda, dan hasil pencapaian teknis proyek ini secara mendalam."
                      className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-green-500 transition-colors text-sm resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                      Thumbnail Proyek
                    </label>
                    <div className="flex items-center gap-4 p-4 bg-zinc-950 border border-zinc-800 rounded-lg">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] || null })}
                        required
                        className="block w-full text-xs text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-zinc-800 file:text-zinc-200 hover:file:bg-zinc-700 transition-colors cursor-pointer"
                      />
                      {(uploading || formLoading) && <SVGSpinner size={24} />}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">Tautan Live Demo</label>
                      <input
                        type="url"
                        value={formData.live_url}
                        onChange={(e) => setFormData({ ...formData, live_url: e.target.value })}
                        placeholder="https://example.com"
                        className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-green-500 transition-colors text-sm"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">Tautan Repository GitHub</label>
                      <input
                        type="url"
                        value={formData.github_url}
                        onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                        placeholder="https://github.com/noval-abdillah/repo"
                        className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-green-500 transition-colors text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-4">
                    <button
                      type="submit"
                      disabled={formLoading || uploading}
                      className="flex-1 md:flex-initial px-8 py-3 bg-green-600 hover:bg-green-500 disabled:bg-green-600/40 text-zinc-950 font-bold rounded-lg transition-colors flex items-center justify-center gap-2 text-sm cursor-pointer font-mono"
                    >
                      {(formLoading || uploading) && <SVGSpinner size={16} />}
                      <span>SIMPAN PROYEK</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        setFormError(null);
                        setFormSuccess(null);
                      }}
                      className="px-6 py-3 bg-zinc-850 hover:bg-zinc-800 text-zinc-300 rounded-lg transition-colors text-sm cursor-pointer"
                    >
                      Batal
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Existing Projects Grid */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white font-mono flex items-center gap-2">
                <span>Daftar Proyek Saat Ini</span>
                <span className="text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full font-mono">{projects.length}</span>
              </h2>
              
              {projects.length === 0 ? (
                <div className="text-center py-20 bg-zinc-900/20 border border-zinc-800/80 rounded-2xl">
                  <InfoIcon className="w-10 h-10 text-zinc-600 mx-auto mb-4" />
                  <p className="text-zinc-500 text-sm">Belum ada proyek yang terdaftar. Mulai tambahkan proyek pertama Anda.</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className="bg-zinc-900/40 backdrop-blur-sm rounded-xl overflow-hidden border border-zinc-800/80 hover:border-zinc-700 transition-all duration-300 flex flex-col group hover:shadow-[0_0_20px_rgba(34,197,94,0.02)]"
                    >
                      <div className="aspect-video w-full relative bg-zinc-950 border-b border-zinc-800/80 overflow-hidden">
                        {project.image_url ? (
                          <Image
                            src={project.image_url}
                            alt={project.title}
                            fill
                            priority
                            className="object-cover transition-transform duration-500 group-hover:scale-103"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <WarningIcon className="w-8 h-8 text-zinc-700" />
                          </div>
                        )}
                      </div>

                      <div className="p-5 flex-1 flex flex-col">
                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-green-500 transition-colors">{project.title}</h3>
                        <p className="text-zinc-400 text-xs mb-4 line-clamp-3 leading-relaxed flex-1">{project.description}</p>
                        
                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {project.tech_stack?.map((tech) => (
                            <span key={tech} className="px-2 py-0.5 bg-zinc-950 text-zinc-400 text-[10px] rounded border border-zinc-800/60 font-mono uppercase tracking-wider">
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-2 border-t border-zinc-800/60 pt-4 mt-auto">
                          {project.live_url && (
                            <a
                              href={project.live_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-850 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 rounded transition-colors text-xs"
                            >
                              <ExternalLinkIcon className="w-3.5 h-3.5" />
                              <span>Live</span>
                            </a>
                          )}
                          
                          {project.github_url && (
                            <a
                              href={project.github_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-850 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 rounded transition-colors text-xs"
                            >
                              <GitHubIcon className="w-3.5 h-3.5" />
                              <span>Code</span>
                            </a>
                          )}

                          <button
                            onClick={() => {
                              if (confirm(`Apakah Anda yakin ingin menghapus proyek "${project.title}"?`)) {
                                handleDelete(project.id, project.image_url);
                              }
                            }}
                            disabled={deleting === project.id}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-950/20 hover:bg-red-950/40 text-red-400 border border-red-900/40 rounded transition-colors text-xs ml-auto disabled:opacity-50 cursor-pointer"
                          >
                            {deleting === project.id ? (
                              <SVGSpinner size={14} />
                            ) : (
                              <TrashIcon className="w-3.5 h-3.5" />
                            )}
                            <span>Hapus</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* RESUME TAB CONTENT */}
        {activeTab === 'resume' && (
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] animate-in fade-in slide-in-from-bottom-4 duration-300">
            {/* Upload form card */}
            <div className="bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/80 rounded-2xl p-6 md:p-8 flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-bold text-white font-mono mb-2">Upload Resume Baru</h2>
                <p className="text-sm text-zinc-400 mb-6">
                  Unggah file PDF baru untuk resume portofolio Anda. File lama akan langsung ditimpa dan diperbarui secara global.
                </p>

                {resumeError && (
                  <div className="p-4 bg-red-950/20 border border-red-800/40 rounded-xl flex items-start gap-3 text-red-400 mb-6">
                    <WarningIcon className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-red-200 text-sm">Kesalahan Upload</h4>
                      <p className="text-xs text-red-400/90 mt-1">{resumeError}</p>
                    </div>
                  </div>
                )}

                {resumeSuccess && (
                  <div className="p-4 bg-green-950/20 border border-green-800/40 rounded-xl flex items-start gap-3 text-green-400 mb-6">
                    <CheckIcon className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-green-200 text-sm">Berhasil</h4>
                      <p className="text-xs text-green-400/90 mt-1">{resumeSuccess}</p>
                    </div>
                  </div>
                )}

                <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-xl border-dashed hover:border-green-500/50 transition-colors mb-6 group flex flex-col items-center justify-center text-center">
                  <UploadIcon className="w-10 h-10 text-zinc-600 mb-3 group-hover:text-green-500 transition-colors" />
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">Pilih PDF Resume</label>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                    className="block w-full max-w-xs text-xs text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-zinc-800 file:text-zinc-200 hover:file:bg-zinc-700 transition-colors cursor-pointer"
                  />
                  {resumeFile && (
                    <p className="text-xs text-green-400 font-mono mt-3">Terpilih: {resumeFile.name} ({(resumeFile.size / 1024).toFixed(1)} KB)</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-zinc-850">
                <button
                  type="button"
                  onClick={async () => {
                    if (!resumeFile) {
                      setResumeError('Pilih file PDF resume terlebih dahulu.');
                      return;
                    }
                    setResumeError(null);
                    setResumeSuccess(null);
                    setResumeUploading(true);
                    try {
                      const publicUrl = await handleResumeUpload(resumeFile);
                      setResumeSuccess('Resume berhasil diunggah dan sekarang tersedia untuk diunduh.');
                      setCurrentResumeUrl(publicUrl);
                      setResumeFile(null);
                      await triggerRevalidation();
                    } catch (err) {
                      setResumeError(err instanceof Error ? err.message : 'Gagal mengunggah resume.');
                    } finally {
                      setResumeUploading(false);
                    }
                  }}
                  disabled={resumeUploading}
                  className="w-full sm:w-auto px-6 py-3 bg-green-600 hover:bg-green-500 disabled:bg-green-600/40 text-zinc-950 font-bold rounded-lg transition-colors text-sm flex items-center justify-center gap-2 cursor-pointer font-mono"
                >
                  {resumeUploading && <SVGSpinner size={16} />}
                  <span>{resumeUploading ? 'MENGUNGGAH...' : 'UNGGAH RESUME PDF'}</span>
                </button>
                <p className="text-xs text-zinc-500 font-mono">File akan terunggah secara statis sebagai resume aktif portofolio.</p>
              </div>
            </div>

            {/* Status Panel card */}
            <div className="bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/80 rounded-2xl p-6 md:p-8 flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-bold text-white font-mono mb-2">Status Resume Saat Ini</h2>
                <p className="text-sm text-zinc-400 mb-6">
                  Periksa ketersediaan tautan dan kelola pembagian resume portofolio Anda.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-xl bg-zinc-950 border border-zinc-850 p-4">
                    <span className="text-sm text-zinc-400 font-mono">Status Aktif</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-mono font-semibold ${currentResumeUrl ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'} border`}>
                      {currentResumeUrl ? 'AKTIF' : 'TIDAK TERSEDIA'}
                    </span>
                  </div>

                  <div className="rounded-xl bg-zinc-950 border border-zinc-850 p-5 text-sm text-zinc-400">
                    <p className="font-semibold text-white font-mono mb-2">Link Unduhan:</p>
                    <p className="truncate bg-zinc-900 px-3 py-2 rounded border border-zinc-850 text-xs font-mono text-zinc-300 mb-4 select-all">
                      {currentResumeUrl ?? 'Belum ada resume terunggah.'}
                    </p>
                    
                    {currentResumeUrl && (
                      <div className="flex items-center gap-2">
                        <a
                          href={currentResumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-green-500 hover:bg-green-400 text-zinc-950 font-bold rounded-lg transition-colors text-xs cursor-pointer font-mono"
                        >
                          <ExternalLinkIcon className="w-3.5 h-3.5" />
                          <span>PREVIEW PDF</span>
                        </a>
                        <button
                          onClick={() => {
                            const cleanUrl = currentResumeUrl.split('?')[0];
                            navigator.clipboard.writeText(cleanUrl);
                            alert('Link PDF berhasil disalin!');
                          }}
                          className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white rounded-lg text-xs font-mono transition-colors border border-zinc-700 cursor-pointer"
                        >
                          Salin Link
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="text-xs text-zinc-500 border-t border-zinc-850 pt-4 mt-6">
                💡 <em>Tips: Selalu lakukan uji pratinjau (Preview PDF) setelah mengunggah resume untuk memastikan berkas terbaca secara utuh di peramban.</em>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
