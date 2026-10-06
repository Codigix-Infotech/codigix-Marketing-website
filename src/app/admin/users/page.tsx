'use client';

import { useCallback, useEffect, useState } from 'react';
import { Pencil, Plus, ShieldCheck, Trash2, UsersRound } from 'lucide-react';
import { useAuth } from '@/components/admin/AuthProvider';
import { Badge, Button, Card, Drawer, EmptyState, Field, Input, PageHeader, Select, Spinner, Toggle, timeAgo, useConfirm, useToast } from '@/components/admin/ui';
import { api, type AdminUser } from '@/lib/admin/api';

type FormState = { id?: number; name: string; email: string; role: 'admin' | 'editor'; is_active: boolean; password: string };
const EMPTY: FormState = { name: '', email: '', role: 'editor', is_active: true, password: '' };

export default function UsersPage() {
  const { user: me } = useAuth();
  const [users, setUsers] = useState<AdminUser[] | null>(null);
  const [form, setForm] = useState<FormState | null>(null);
  const [saving, setSaving] = useState(false);
  const toast = useToast();
  const confirm = useConfirm();

  const load = useCallback(() => {
    api<{ data: AdminUser[] }>('/admin/users').then((r) => setUsers(r.data)).catch((e) => toast(e.message, 'error'));
  }, [toast]);
  useEffect(load, [load]);

  async function save() {
    if (!form) return;
    setSaving(true);
    try {
      const body: Record<string, unknown> = { name: form.name, email: form.email, role: form.role, is_active: form.is_active };
      if (form.password) body.password = form.password;
      if (form.id) await api(`/admin/users/${form.id}`, { method: 'PUT', body });
      else await api('/admin/users', { method: 'POST', body });
      toast(form.id ? 'User updated' : 'User created');
      setForm(null);
      load();
    } catch (err) {
      toast((err as Error).message, 'error');
    } finally {
      setSaving(false);
    }
  }

  async function remove(u: AdminUser) {
    const ok = await confirm({ title: `Remove ${u.name}?`, message: 'They will no longer be able to sign in.', confirmLabel: 'Remove', danger: true });
    if (!ok) return;
    try {
      await api(`/admin/users/${u.id}`, { method: 'DELETE' });
      toast('User removed');
      load();
    } catch (err) {
      toast((err as Error).message, 'error');
    }
  }

  if (me && me.role !== 'admin') return <p className="text-sm text-slate-500">Only administrators can manage users.</p>;

  return (
    <div>
      <PageHeader
        title="Users"
        description="Team members who can sign in to the admin panel."
        actions={<Button icon={<Plus size={16} />} onClick={() => setForm({ ...EMPTY })}>Add user</Button>}
      />
      <Card bodyClassName="p-0">
        {!users ? (
          <Spinner />
        ) : users.length === 0 ? (
          <EmptyState icon={<UsersRound size={20} />} title="No users" />
        ) : (
          <ul className="divide-y divide-slate-100">
            {users.map((u) => (
              <li key={u.id} className="flex items-center gap-4 px-5 py-4">
                <span className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-[#1a1053] text-white font-semibold flex items-center justify-center">{u.name.charAt(0).toUpperCase()}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-800 flex items-center gap-2">
                    {u.name} {u.id === me?.id && <span className="text-xs font-normal text-slate-400">(you)</span>}
                  </p>
                  <p className="text-sm text-slate-500 truncate">{u.email}</p>
                </div>
                <div className="hidden sm:block text-right">
                  <Badge tone={u.role === 'admin' ? 'purple' : 'blue'}>{u.role === 'admin' && <ShieldCheck size={11} />}{u.role}</Badge>
                  <p className="text-[11px] text-slate-400 mt-1">{u.last_login_at ? `Last login ${timeAgo(u.last_login_at)}` : 'Never signed in'}</p>
                </div>
                {!u.is_active && <Badge tone="red">Disabled</Badge>}
                <div className="flex">
                  <button onClick={() => setForm({ id: u.id, name: u.name, email: u.email, role: u.role, is_active: u.is_active, password: '' })} className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50" aria-label="Edit"><Pencil size={15} /></button>
                  {u.id !== me?.id && <button onClick={() => remove(u)} className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50" aria-label="Delete"><Trash2 size={15} /></button>}
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
      <div className="mt-4 text-xs text-slate-500 space-y-1">
        <p><strong>Admin</strong> — full access, including settings and users.</p>
        <p><strong>Editor</strong> — manages content (blogs, clients, videos, careers, messages) but not settings or users.</p>
      </div>

      <Drawer
        open={!!form}
        onClose={() => setForm(null)}
        title={form?.id ? 'Edit user' : 'Add user'}
        width="max-w-md"
        footer={
          <>
            <Button variant="secondary" onClick={() => setForm(null)}>Cancel</Button>
            <Button onClick={save} loading={saving}>{form?.id ? 'Save' : 'Create user'}</Button>
          </>
        }
      >
        {form && (
          <div className="space-y-4">
            <Field label="Full name" required><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></Field>
            <Field label="Email" required><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></Field>
            <Field label="Role">
              <Select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as FormState['role'] })} disabled={form.id === me?.id}>
                <option value="editor">Editor</option>
                <option value="admin">Admin</option>
              </Select>
            </Field>
            <Field label={form.id ? 'New password' : 'Password'} required={!form.id} hint={form.id ? 'Leave empty to keep the current password.' : 'At least 8 characters with letters and numbers.'}>
              <Input type="password" autoComplete="new-password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
            </Field>
            {form.id !== me?.id && <Toggle checked={form.is_active} onChange={(v) => setForm({ ...form, is_active: v })} label="Active" description="Disabled users cannot sign in." />}
          </div>
        )}
      </Drawer>
    </div>
  );
}
