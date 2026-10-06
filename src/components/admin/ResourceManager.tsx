'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Download, GripVertical, Pencil, Plus, Trash2 } from 'lucide-react';
import { api, download, type ListResponse } from '@/lib/admin/api';
import { ImageField } from './MediaLibrary';
import { StringListEditor } from './ListEditors';
import RichTextEditor from './RichTextEditor';
import {
  Button, Card, cx, Drawer, EmptyState, Field, Input, PageHeader, Pagination, SearchInput, Select, Spinner,
  Textarea, Toggle, useConfirm, useToast,
} from './ui';

export type Row = Record<string, any> & { id: number };

export interface FieldConfig {
  name: string;
  label: string;
  type?: 'text' | 'textarea' | 'number' | 'toggle' | 'select' | 'image' | 'richtext' | 'list' | 'date' | 'url' | 'email';
  required?: boolean;
  placeholder?: string;
  hint?: React.ReactNode;
  options?: { value: string; label: string }[];
  full?: boolean;
  folder?: string;
  counter?: { min?: number; max: number };
  section?: string;
  description?: string;
  showIf?: (values: Record<string, any>) => boolean;
}

export interface ColumnConfig {
  key: string;
  label: string;
  render?: (row: Row) => React.ReactNode;
  className?: string;
}

export interface ResourceConfig {
  endpoint: string;
  title: string;
  singular: string;
  description?: string;
  columns: ColumnConfig[];
  fields: FieldConfig[];
  defaults?: Record<string, any>;
  searchPlaceholder?: string;
  filters?: { name: string; label: string; options: { value: string; label: string }[] }[];
  reorderable?: boolean;
  canCreate?: boolean;
  canDelete?: boolean;
  exportable?: boolean;
  drawerWidth?: string;
  emptyIcon?: React.ReactNode;
  renderDetail?: (row: Row) => React.ReactNode;
  rowActions?: (row: Row) => React.ReactNode;
  /** Mark a row as read etc. when it is opened. */
  onOpen?: (row: Row) => Record<string, any> | null;
  highlightRow?: (row: Row) => boolean;
}

function FieldControl({ field, value, onChange }: { field: FieldConfig; value: any; onChange: (v: any) => void }) {
  const id = `f-${field.name}`;
  switch (field.type) {
    case 'textarea':
      return <Textarea id={id} value={value ?? ''} placeholder={field.placeholder} onChange={(e) => onChange(e.target.value)} rows={4} />;
    case 'number':
      return <Input id={id} type="number" step="any" value={value ?? ''} placeholder={field.placeholder} onChange={(e) => onChange(e.target.value === '' ? null : Number(e.target.value))} />;
    case 'toggle':
      return <Toggle checked={!!value} onChange={onChange} label={field.label} description={field.description} />;
    case 'select':
      return (
        <Select id={id} value={value ?? ''} onChange={(e) => onChange(e.target.value)}>
          {field.options?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </Select>
      );
    case 'image':
      return <ImageField value={value} onChange={onChange} folder={field.folder} compact={field.folder === 'clients' || field.folder === 'avatars'} />;
    case 'richtext':
      return <RichTextEditor value={value || ''} onChange={onChange} folder={field.folder} minimal />;
    case 'list':
      return <StringListEditor value={value || []} onChange={onChange} placeholder={field.placeholder} />;
    case 'date':
      return <Input id={id} type="date" value={value ? String(value).slice(0, 10) : ''} onChange={(e) => onChange(e.target.value || null)} />;
    default:
      return (
        <Input
          id={id}
          type={field.type === 'email' ? 'email' : field.type === 'url' ? 'url' : 'text'}
          value={value ?? ''}
          placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      );
  }
}

export default function ResourceManager({ config }: { config: ResourceConfig }) {
  const {
    endpoint, title, singular, description, columns, fields, defaults = {}, searchPlaceholder, filters = [],
    reorderable, canCreate = true, canDelete = true, exportable, drawerWidth, emptyIcon, renderDetail, rowActions, onOpen, highlightRow,
  } = config;

  const [rows, setRows] = useState<Row[]>([]);
  const [meta, setMeta] = useState({ total: 0, page: 1, pages: 1, limit: 25 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<number[]>([]);
  const [editing, setEditing] = useState<Row | null>(null);
  const [creating, setCreating] = useState(false);
  const [values, setValues] = useState<Record<string, any>>({});
  const [saving, setSaving] = useState(false);
  const [dragId, setDragId] = useState<number | null>(null);
  const initialValues = useRef<string>('');
  const toast = useToast();
  const confirm = useConfirm();

  const filtered = Boolean(search || Object.values(filterValues).some(Boolean));
  const canReorder = reorderable && !filtered;

  const query = useMemo(() => {
    const q = new URLSearchParams({ page: String(page), limit: reorderable ? '500' : '25' });
    if (search) q.set('search', search);
    for (const [k, v] of Object.entries(filterValues)) if (v) q.set(k, v);
    return q.toString();
  }, [page, search, filterValues, reorderable]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api<ListResponse<Row>>(`${endpoint}?${query}`);
      setRows(res.data);
      setMeta(res.meta);
      setSelected([]);
    } catch (err) {
      toast((err as Error).message, 'error');
    } finally {
      setLoading(false);
    }
  }, [endpoint, query, toast]);

  useEffect(() => {
    load();
  }, [load]);

  function openCreate() {
    const v = { ...defaults };
    setValues(v);
    initialValues.current = JSON.stringify(v);
    setEditing(null);
    setCreating(true);
  }

  async function openEdit(row: Row) {
    const v = { ...row };
    setValues(v);
    initialValues.current = JSON.stringify(v);
    setEditing(row);
    setCreating(false);
    const patch = onOpen?.(row);
    if (patch) {
      try {
        await api(`${endpoint}/${row.id}`, { method: 'PUT', body: patch });
        setRows((all) => all.map((r) => (r.id === row.id ? { ...r, ...patch } : r)));
        setEditing((cur) => (cur && cur.id === row.id ? { ...cur, ...patch } : cur));
        setValues((cur) => ({ ...cur, ...patch }));
        initialValues.current = JSON.stringify({ ...v, ...patch });
      } catch {
        /* non-critical */
      }
    }
  }

  async function closeDrawer() {
    if (JSON.stringify(values) !== initialValues.current) {
      const ok = await confirm({ title: 'Discard changes?', message: 'You have unsaved changes that will be lost.', confirmLabel: 'Discard', danger: true });
      if (!ok) return;
    }
    setEditing(null);
    setCreating(false);
  }

  async function save() {
    for (const f of fields) {
      if (f.required && (f.showIf ? f.showIf(values) : true) && (values[f.name] === undefined || values[f.name] === null || values[f.name] === '')) {
        toast(`${f.label} is required`, 'error');
        return;
      }
    }
    setSaving(true);
    try {
      const payload: Record<string, any> = {};
      for (const f of fields) payload[f.name] = values[f.name];
      if (editing) {
        await api(`${endpoint}/${editing.id}`, { method: 'PUT', body: payload });
        toast(`${singular} updated`);
      } else {
        await api(endpoint, { method: 'POST', body: payload });
        toast(`${singular} created`);
      }
      initialValues.current = JSON.stringify(values);
      setEditing(null);
      setCreating(false);
      load();
    } catch (err) {
      toast((err as Error).message, 'error');
    } finally {
      setSaving(false);
    }
  }

  async function remove(ids: number[]) {
    const ok = await confirm({
      title: ids.length > 1 ? `Delete ${ids.length} items?` : `Delete this ${singular.toLowerCase()}?`,
      message: 'This action cannot be undone.',
      confirmLabel: 'Delete',
      danger: true,
    });
    if (!ok) return;
    try {
      if (ids.length === 1) await api(`${endpoint}/${ids[0]}`, { method: 'DELETE' });
      else await api(`${endpoint}/bulk-delete`, { method: 'POST', body: { ids } });
      toast(ids.length > 1 ? `${ids.length} items deleted` : `${singular} deleted`);
      setEditing(null);
      load();
    } catch (err) {
      toast((err as Error).message, 'error');
    }
  }

  async function onDrop(targetId: number) {
    if (dragId == null || dragId === targetId) return;
    const from = rows.findIndex((r) => r.id === dragId);
    const to = rows.findIndex((r) => r.id === targetId);
    const next = [...rows];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    setRows(next);
    setDragId(null);
    try {
      await api(`${endpoint}/reorder`, { method: 'POST', body: { ids: next.map((r) => r.id) } });
      toast('Order saved');
    } catch (err) {
      toast((err as Error).message, 'error');
      load();
    }
  }

  const allSelected = rows.length > 0 && selected.length === rows.length;
  const drawerOpen = creating || !!editing;
  const sections = Array.from(new Set(fields.map((f) => f.section || '')));

  return (
    <div>
      <PageHeader
        title={title}
        description={description}
        actions={
          <>
            {exportable && (
              <Button
                variant="secondary"
                icon={<Download size={16} />}
                onClick={() => download(`${endpoint}/export.csv?${new URLSearchParams(filterValues)}`, `${singular.toLowerCase()}-export.csv`).catch((e) => toast(e.message, 'error'))}
              >
                Export CSV
              </Button>
            )}
            {canCreate && (
              <Button icon={<Plus size={16} />} onClick={openCreate}>
                Add {singular.toLowerCase()}
              </Button>
            )}
          </>
        }
      />

      <Card bodyClassName="p-0">
        <div className="flex flex-col md:flex-row md:items-center gap-3 justify-between px-5 py-3 border-b border-slate-100">
          <div className="flex flex-wrap items-center gap-2">
            <SearchInput value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder={searchPlaceholder || `Search ${title.toLowerCase()}…`} />
            {filters.map((f) => (
              <Select
                key={f.name}
                aria-label={f.label}
                value={filterValues[f.name] || ''}
                onChange={(e) => { setFilterValues((cur) => ({ ...cur, [f.name]: e.target.value })); setPage(1); }}
                className="!w-auto"
              >
                <option value="">{f.label}: All</option>
                {f.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </Select>
            ))}
          </div>
          <div className="flex items-center gap-2">
            {canReorder && rows.length > 1 && <span className="text-xs text-slate-400 hidden md:inline">Drag rows to reorder</span>}
            {canDelete && selected.length > 0 && (
              <Button size="sm" variant="danger" icon={<Trash2 size={14} />} onClick={() => remove(selected)}>
                Delete {selected.length}
              </Button>
            )}
          </div>
        </div>

        {loading ? (
          <Spinner />
        ) : rows.length === 0 ? (
          <EmptyState
            icon={emptyIcon}
            title={filtered ? 'No matches' : `No ${title.toLowerCase()} yet`}
            description={filtered ? 'Try a different search or filter.' : canCreate ? `Create your first ${singular.toLowerCase()} to show it on the website.` : undefined}
            action={!filtered && canCreate ? <Button icon={<Plus size={16} />} onClick={openCreate}>Add {singular.toLowerCase()}</Button> : undefined}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500 bg-slate-50/70 border-b border-slate-100">
                  {canDelete && (
                    <th className="w-10 pl-5 py-2.5">
                      <input type="checkbox" aria-label="Select all" checked={allSelected} onChange={() => setSelected(allSelected ? [] : rows.map((r) => r.id))} />
                    </th>
                  )}
                  {canReorder && <th className="w-6" />}
                  {columns.map((c) => <th key={c.key} className={cx('px-3 py-2.5', c.className)}>{c.label}</th>)}
                  <th className="w-24 pr-5" />
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr
                    key={row.id}
                    draggable={canReorder}
                    onDragStart={() => setDragId(row.id)}
                    onDragOver={(e) => canReorder && e.preventDefault()}
                    onDrop={() => onDrop(row.id)}
                    onDragEnd={() => setDragId(null)}
                    className={cx(
                      'border-b border-slate-100 last:border-0 hover:bg-slate-50/70 transition-colors',
                      dragId === row.id && 'opacity-40',
                      highlightRow?.(row) && 'bg-amber-50/40'
                    )}
                  >
                    {canDelete && (
                      <td className="pl-5 py-3">
                        <input
                          type="checkbox"
                          aria-label="Select row"
                          checked={selected.includes(row.id)}
                          onChange={() => setSelected((s) => (s.includes(row.id) ? s.filter((x) => x !== row.id) : [...s, row.id]))}
                        />
                      </td>
                    )}
                    {canReorder && (
                      <td className="cursor-grab text-slate-300 hover:text-slate-500"><GripVertical size={16} /></td>
                    )}
                    {columns.map((c, i) => (
                      <td key={c.key} className={cx('px-3 py-3 align-middle', c.className)}>
                        {i === 0 ? (
                          <button type="button" onClick={() => openEdit(row)} className="text-left hover:text-indigo-600">
                            {c.render ? c.render(row) : row[c.key] ?? '—'}
                          </button>
                        ) : c.render ? c.render(row) : row[c.key] ?? '—'}
                      </td>
                    ))}
                    <td className="pr-5 py-3">
                      <div className="flex items-center justify-end gap-1">
                        {rowActions?.(row)}
                        <button type="button" onClick={() => openEdit(row)} className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50" aria-label="Edit">
                          <Pencil size={15} />
                        </button>
                        {canDelete && (
                          <button type="button" onClick={() => remove([row.id])} className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50" aria-label="Delete">
                            <Trash2 size={15} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {!loading && rows.length > 0 && <Pagination page={meta.page} pages={meta.pages} total={meta.total} onChange={setPage} />}
      </Card>

      <Drawer
        open={drawerOpen}
        onClose={closeDrawer}
        title={editing ? (renderDetail ? singular : `Edit ${singular.toLowerCase()}`) : `New ${singular.toLowerCase()}`}
        width={drawerWidth}
        footer={
          <>
            {editing && canDelete && (
              <Button variant="ghost" className="mr-auto text-rose-600 hover:bg-rose-50" icon={<Trash2 size={15} />} onClick={() => remove([editing.id])}>
                Delete
              </Button>
            )}
            <Button variant="secondary" onClick={closeDrawer}>Cancel</Button>
            <Button onClick={save} loading={saving}>{editing ? 'Save changes' : `Create ${singular.toLowerCase()}`}</Button>
          </>
        }
      >
        {editing && renderDetail && <div className="mb-6">{renderDetail(editing)}</div>}
        <div className="space-y-6">
          {sections.map((section) => (
            <div key={section || 'main'}>
              {section && <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 pb-2 border-b border-slate-100">{section}</h3>}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {fields
                  .filter((f) => (f.section || '') === section && (!f.showIf || f.showIf(values)))
                  .map((f) => (
                    <div key={f.name} className={f.full || ['textarea', 'richtext', 'list', 'image'].includes(f.type || '') ? 'sm:col-span-2' : ''}>
                      {f.type === 'toggle' ? (
                        <FieldControl field={f} value={values[f.name]} onChange={(v) => setValues((cur) => ({ ...cur, [f.name]: v }))} />
                      ) : (
                        <Field
                          label={f.label}
                          required={f.required}
                          hint={f.hint}
                          htmlFor={`f-${f.name}`}
                          counter={f.counter ? { ...f.counter, value: String(values[f.name] || '').length } : undefined}
                        >
                          <FieldControl field={f} value={values[f.name]} onChange={(v) => setValues((cur) => ({ ...cur, [f.name]: v }))} />
                        </Field>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </Drawer>
    </div>
  );
}
