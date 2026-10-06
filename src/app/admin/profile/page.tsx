'use client';

import { useEffect, useState } from 'react';
import { KeyRound, Save } from 'lucide-react';
import { useAuth } from '@/components/admin/AuthProvider';
import { Button, Card, Field, Input, PageHeader, useToast } from '@/components/admin/ui';
import { api } from '@/lib/admin/api';

export default function ProfilePage() {
  const { user, refresh } = useAuth();
  const toast = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);
  const [pw, setPw] = useState({ current: '', next: '', confirm: '' });
  const [savingPw, setSavingPw] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    setSavingProfile(true);
    try {
      await api('/auth/profile', { method: 'PUT', body: { name, email } });
      await refresh();
      toast('Profile updated');
    } catch (err) {
      toast((err as Error).message, 'error');
    } finally {
      setSavingProfile(false);
    }
  }

  async function changePassword(e: React.FormEvent) {
    e.preventDefault();
    if (pw.next !== pw.confirm) return toast('New passwords do not match', 'error');
    setSavingPw(true);
    try {
      await api('/auth/password', { method: 'PUT', body: { current_password: pw.current, new_password: pw.next } });
      setPw({ current: '', next: '', confirm: '' });
      toast('Password changed');
    } catch (err) {
      toast((err as Error).message, 'error');
    } finally {
      setSavingPw(false);
    }
  }

  return (
    <div className="max-w-2xl space-y-6">
      <PageHeader title="My profile" description="Your account details and password." />
      <Card title="Account">
        <form onSubmit={saveProfile} className="space-y-4">
          <Field label="Name"><Input value={name} onChange={(e) => setName(e.target.value)} required /></Field>
          <Field label="Email"><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></Field>
          <Button type="submit" icon={<Save size={15} />} loading={savingProfile}>Save profile</Button>
        </form>
      </Card>
      <Card title="Change password">
        <form onSubmit={changePassword} className="space-y-4">
          <Field label="Current password"><Input type="password" autoComplete="current-password" value={pw.current} onChange={(e) => setPw({ ...pw, current: e.target.value })} required /></Field>
          <Field label="New password" hint="At least 8 characters, with letters and numbers."><Input type="password" autoComplete="new-password" value={pw.next} onChange={(e) => setPw({ ...pw, next: e.target.value })} required minLength={8} /></Field>
          <Field label="Confirm new password"><Input type="password" autoComplete="new-password" value={pw.confirm} onChange={(e) => setPw({ ...pw, confirm: e.target.value })} required /></Field>
          <Button type="submit" icon={<KeyRound size={15} />} loading={savingPw}>Update password</Button>
        </form>
      </Card>
    </div>
  );
}
