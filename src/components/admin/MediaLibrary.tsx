'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Check, ImageIcon, Link2, Loader2, Trash2, UploadCloud, X } from 'lucide-react';
import { api, type ListResponse } from '@/lib/admin/api';
import { mediaUrl } from '@/lib/config';
import { Button, cx, EmptyState, Input, Modal, SearchInput, Spinner, useConfirm, useToast } from './ui';

export interface MediaItem {
  id: number;
  url: string;
  original_name: string;
  filename: string;
  mime: string;
  size: number;
  width: number | null;
  height: number | null;
  alt: string | null;
  folder: string;
  created_at: string;
}

export async function uploadImages(files: FileList | File[], folder = 'general'): Promise<MediaItem[]> {
  const form = new FormData();
  Array.from(files).forEach((f) => form.append('files', f));
  form.append('folder', folder);
  const { data } = await api<{ data: MediaItem[] }>('/admin/media', { method: 'POST', body: form });
  return data;
}

export const formatBytes = (n: number) => (n > 1024 * 1024 ? `${(n / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(n / 1024))} KB`);

/** Grid of uploaded media with upload, search, delete and (optionally) select. */
export function MediaGrid({ onSelect, folder = 'general', selectable = false }: { onSelect?: (item: MediaItem) => void; folder?: string; selectable?: boolean }) {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState('');
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const toast = useToast();
  const confirm = useConfirm();

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api<ListResponse<MediaItem>>(`/admin/media?limit=120&search=${encodeURIComponent(search)}`);
      setItems(res.data);
    } catch (err) {
      toast((err as Error).message, 'error');
    } finally {
      setLoading(false);
    }
  }, [search, toast]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleFiles(files: FileList | null) {
    if (!files?.length) return;
    setUploading(true);
    try {
      const saved = await uploadImages(files, folder);
      toast(`${saved.length} image${saved.length > 1 ? 's' : ''} uploaded & optimised`);
      await load();
      if (selectable && saved.length === 1 && onSelect) onSelect(saved[0]);
    } catch (err) {
      toast((err as Error).message, 'error');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  }

  async function remove(item: MediaItem) {
    const ok = await confirm({
      title: 'Delete image?',
      message: `"${item.original_name}" will be permanently deleted. Pages still using it will show a broken image.`,
      confirmLabel: 'Delete',
      danger: true,
    });
    if (!ok) return;
    try {
      await api(`/admin/media/${item.id}`, { method: 'DELETE' });
      setItems((all) => all.filter((i) => i.id !== item.id));
      toast('Image deleted');
    } catch (err) {
      toast((err as Error).message, 'error');
    }
  }

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => fileRef.current?.click()}
        className={cx(
          'mb-5 cursor-pointer rounded-xl border-2 border-dashed px-6 py-8 text-center transition-colors',
          dragging ? 'border-indigo-500 bg-indigo-50' : 'border-slate-200 hover:border-indigo-400 bg-slate-50/50'
        )}
      >
        {uploading ? <Loader2 className="mx-auto mb-2 animate-spin text-indigo-600" /> : <UploadCloud className="mx-auto mb-2 text-slate-400" />}
        <p className="text-sm font-medium text-slate-700">{uploading ? 'Uploading & optimising…' : 'Drop images here or click to upload'}</p>
        <p className="text-xs text-slate-500 mt-1">JPG, PNG, WEBP, GIF · auto-converted to WebP & resized for fast loading</p>
        <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleFiles(e.target.files)} />
      </div>

      <div className="flex items-center justify-between gap-3 mb-4">
        <SearchInput value={search} onChange={setSearch} placeholder="Search by file name…" />
        <span className="text-xs text-slate-500">{items.length} images</span>
      </div>

      {loading ? (
        <Spinner />
      ) : items.length === 0 ? (
        <EmptyState icon={<ImageIcon size={20} />} title="No images yet" description="Upload your first image above." />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {items.map((item) => (
            <div key={item.id} className="group relative rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
              <button
                type="button"
                onClick={() => onSelect?.(item)}
                className={cx('block w-full aspect-square', selectable ? 'cursor-pointer' : 'cursor-default')}
                title={item.original_name}
              >
                <img src={mediaUrl(item.url)} alt={item.alt || item.original_name} loading="lazy" className="w-full h-full object-cover" />
              </button>
              {selectable && (
                <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-indigo-600/0 group-hover:bg-indigo-600/30 transition-colors">
                  <Check className="text-white opacity-0 group-hover:opacity-100" />
                </span>
              )}
              <div className="px-2 py-1.5 bg-white border-t border-slate-100">
                <p className="text-[11px] font-medium text-slate-700 truncate">{item.original_name}</p>
                <p className="text-[10px] text-slate-400">
                  {item.width && item.height ? `${item.width}×${item.height} · ` : ''}
                  {formatBytes(item.size)}
                </p>
              </div>
              <div className="absolute top-1.5 right-1.5 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard?.writeText(mediaUrl(item.url));
                    toast('Image URL copied', 'info');
                  }}
                  className="p-1.5 rounded-lg bg-white/95 shadow text-slate-600 hover:text-indigo-600"
                  aria-label="Copy URL"
                >
                  <Link2 size={13} />
                </button>
                <button type="button" onClick={() => remove(item)} className="p-1.5 rounded-lg bg-white/95 shadow text-slate-600 hover:text-rose-600" aria-label="Delete">
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function MediaPickerModal({ open, onClose, onSelect, folder }: { open: boolean; onClose: () => void; onSelect: (item: MediaItem) => void; folder?: string }) {
  return (
    <Modal open={open} onClose={onClose} title="Choose an image" size=" ">
      {open && (
        <MediaGrid
          selectable
          folder={folder}
          onSelect={(item) => {
            onSelect(item);
            onClose();
          }}
        />
      )}
    </Modal>
  );
}

/** Form field: image preview + upload / library / URL. Stores a path like /uploads/blog/x.webp */
export function ImageField({ value, onChange, folder = 'general', aspect = 'aspect-video', compact = false }: {
  value?: string | null;
  onChange: (v: string) => void;
  folder?: string;
  aspect?: string;
  compact?: boolean;
}) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showUrl, setShowUrl] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const toast = useToast();

  async function upload(files: FileList | null) {
    if (!files?.length) return;
    setUploading(true);
    try {
      const [saved] = await uploadImages([files[0]], folder);
      onChange(saved.url);
    } catch (err) {
      toast((err as Error).message, 'error');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  }

  return (
    <div>
      <div className={cx('relative rounded-lg border border-slate-200 bg-slate-50 overflow-hidden', compact ? 'w-28 h-28' : aspect)}>
        {value ? (
          <>
            <img src={mediaUrl(value)} alt="" className={cx('w-full h-full', compact ? 'object-contain p-2' : 'object-cover')} />
            <button
              type="button"
              onClick={() => onChange('')}
              className="absolute top-2 right-2 p-1 rounded-lg bg-white/95 shadow text-slate-500 hover:text-rose-600"
              aria-label="Remove image"
            >
              <X size={14} />
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="w-full h-full flex flex-col items-center justify-center gap-1 text-slate-400 hover:text-indigo-600 transition-colors"
          >
            {uploading ? <Loader2 className="animate-spin" /> : <UploadCloud size={compact ? 18 : 24} />}
            {!compact && <span className="text-xs font-medium">{uploading ? 'Uploading…' : 'Upload image'}</span>}
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-1.5 mt-2">
        <Button size="sm" variant="secondary" onClick={() => fileRef.current?.click()} loading={uploading}>
          Upload
        </Button>
        <Button size="sm" variant="secondary" onClick={() => setPickerOpen(true)}>
          Library
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setShowUrl((s) => !s)}>
          URL
        </Button>
      </div>
      {showUrl && (
        <Input className="mt-2" placeholder="https://… or /uploads/…" value={value || ''} onChange={(e) => onChange(e.target.value)} />
      )}
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => upload(e.target.files)} />
      <MediaPickerModal open={pickerOpen} onClose={() => setPickerOpen(false)} onSelect={(m) => onChange(m.url)} folder={folder} />
    </div>
  );
}
