'use client';

import { useEffect, useState } from 'react';
import { Building, Globe, MapPin, RefreshCw, Save, Search, Share2, type LucideIcon } from 'lucide-react';
import { ImageField } from '@/components/admin/MediaLibrary';
import { StringListEditor } from '@/components/admin/ListEditors';
import { Button, Card, cx, Field, Input, PageHeader, Spinner, Textarea, useToast } from '@/components/admin/ui';
import { useAuth } from '@/components/admin/AuthProvider';
import { api } from '@/lib/admin/api';
import { defaultSettings } from '@/lib/defaults';
import type { ContactSettings, SeoSettings, SiteSettings, SocialSettings } from '@/lib/types';

type Tab = 'site' | 'seo' | 'contact' | 'social';
type AllSettings = { site: SiteSettings; seo: SeoSettings; contact: ContactSettings; social: SocialSettings };

const TABS: { key: Tab; label: string; icon: LucideIcon; description: string }[] = [
  { key: 'contact', label: 'Contact details', icon: MapPin, description: 'Address, phone and email shown in the footer, contact page and Google structured data.' },
  { key: 'social', label: 'Social links', icon: Share2, description: 'Social profiles shown as footer icons and linked in Organization schema.' },
  { key: 'site', label: 'General', icon: Building, description: 'Company name, description and newsletter copy.' },
  { key: 'seo', label: 'SEO defaults', icon: Search, description: 'Default titles and descriptions used when a page has none of its own.' },
];

export default function SettingsPage() {
  const { user } = useAuth();
  const [tab, setTab] = useState<Tab>('contact');
  const [data, setData] = useState<AllSettings | null>(null);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState<Partial<Record<Tab, boolean>>>({});
  const toast = useToast();

  useEffect(() => {
    api<{ data: Partial<AllSettings> }>('/admin/settings')
      .then(({ data }) =>
        setData({
          site: { ...defaultSettings.site, ...data.site },
          seo: { ...defaultSettings.seo, ...data.seo },
          contact: { ...defaultSettings.contact, ...data.contact },
          social: { ...defaultSettings.social, ...data.social },
        })
      )
      .catch((e) => toast(e.message, 'error'));
  }, [toast]);

  function set<T extends Tab>(group: T, key: keyof AllSettings[T], value: unknown) {
    setData((d) => (d ? { ...d, [group]: { ...d[group], [key]: value } } : d));
    setDirty((x) => ({ ...x, [group]: true }));
  }

  async function save() {
    if (!data) return;
    setSaving(true);
    try {
      await api(`/admin/settings/${tab}`, { method: 'PUT', body: data[tab] });
      setDirty((x) => ({ ...x, [tab]: false }));
      toast('Settings saved — the website has been updated');
    } catch (err) {
      toast((err as Error).message, 'error');
    } finally {
      setSaving(false);
    }
  }

  async function purge() {
    try {
      await api('/admin/revalidate', { method: 'POST' });
      toast('Website cache refreshed', 'info');
    } catch (err) {
      toast((err as Error).message, 'error');
    }
  }

  if (user && user.role !== 'admin') return <p className="text-sm text-slate-500">Only administrators can change site settings.</p>;
  if (!data) return <Spinner />;
  const current = TABS.find((t) => t.key === tab)!;
  const text = <T extends Tab>(group: T, key: keyof AllSettings[T] & string, label: string, props: Partial<React.ComponentProps<typeof Field>> & { placeholder?: string; type?: string } = {}) => (
    <Field label={label} hint={props.hint} counter={props.counter}>
      <Input
        type={props.type}
        value={String((data[group] as Record<string, unknown>)[key] ?? '')}
        placeholder={props.placeholder}
        onChange={(e) => set(group, key, e.target.value)}
      />
    </Field>
  );

  return (
    <div className="pb-16">
      <PageHeader
        title="Site Settings"
        description="Business information used across the whole website."
        actions={
          <>
            <Button variant="ghost" icon={<RefreshCw size={15} />} onClick={purge}>Refresh website cache</Button>
            <Button icon={<Save size={15} />} onClick={save} loading={saving} disabled={!dirty[tab]}>Save {current.label.toLowerCase()}</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-6">
        <nav className="flex lg:flex-col gap-1 overflow-x-auto">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={cx(
                'flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-left whitespace-nowrap transition-colors',
                tab === t.key ? 'bg-white text-indigo-700 shadow-sm ring-1 ring-slate-200' : 'text-slate-600 hover:bg-white/70'
              )}
            >
              <t.icon size={16} /> {t.label}
              {dirty[t.key] && <span className="ml-auto w-2 h-2 rounded-full bg-amber-500" aria-label="Unsaved" />}
            </button>
          ))}
        </nav>

        <Card title={current.label} description={current.description}>
          {tab === 'contact' && (
            <div className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                {text('contact', 'address_line1', 'Address line 1', { placeholder: 'Office no., building' })}
                {text('contact', 'address_line2', 'Address line 2', { placeholder: 'Street, area' })}
                {text('contact', 'city', 'City')}
                {text('contact', 'state', 'State')}
                {text('contact', 'postal_code', 'PIN code')}
                {text('contact', 'country', 'Country')}
              </div>
              <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                {text('contact', 'phone', 'Primary phone', { placeholder: '+91 …', type: 'tel' })}
                {text('contact', 'phone_secondary', 'Secondary phone', { type: 'tel' })}
                {text('contact', 'whatsapp', 'WhatsApp number', { placeholder: '+91 …', hint: 'Shows a WhatsApp link on the contact page.' })}
                {text('contact', 'working_hours', 'Working hours', { placeholder: 'Mon – Sat, 10 AM – 7 PM' })}
                {text('contact', 'email', 'General email', { type: 'email' })}
                {text('contact', 'careers_email', 'Careers email', { type: 'email' })}
              </div>
              <div className="pt-4 border-t border-slate-100">
                {text('contact', 'map_embed_url', 'Google Maps embed URL', {
                  placeholder: 'https://www.google.com/maps/embed?pb=…',
                  hint: 'In Google Maps: Share → Embed a map → copy only the src="…" link. Shows a map on the contact page.',
                })}
              </div>
              <Field label="Services in the contact form dropdown" className="pt-4 border-t border-slate-100">
                <StringListEditor value={data.contact.services || []} onChange={(v) => set('contact', 'services', v)} placeholder="Service name" addLabel="Add service" />
              </Field>
            </div>
          )}

          {tab === 'social' && (
            <div className="grid sm:grid-cols-2 gap-4">
              {text('social', 'linkedin', 'LinkedIn', { placeholder: 'https://www.linkedin.com/company/…', type: 'url' })}
              {text('social', 'instagram', 'Instagram', { placeholder: 'https://www.instagram.com/…', type: 'url' })}
              {text('social', 'facebook', 'Facebook', { placeholder: 'https://www.facebook.com/…', type: 'url' })}
              {text('social', 'youtube', 'YouTube', { placeholder: 'https://www.youtube.com/@…', type: 'url' })}
              {text('social', 'twitter', 'X (Twitter)', { placeholder: 'https://x.com/…', type: 'url' })}
              <p className="sm:col-span-2 text-xs text-slate-500">Empty links are hidden on the website.</p>
            </div>
          )}

          {tab === 'site' && (
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                {text('site', 'name', 'Company name')}
                {text('site', 'tagline', 'Tagline')}
              </div>
              <Field label="Short description" hint="Shown in the footer under the logo.">
                <Textarea value={data.site.description || ''} onChange={(e) => set('site', 'description', e.target.value)} rows={3} />
              </Field>
              <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                {text('site', 'newsletter_title', 'Newsletter heading')}
                <Field label="Newsletter text">
                  <Textarea value={data.site.newsletter_text || ''} onChange={(e) => set('site', 'newsletter_text', e.target.value)} rows={3} />
                </Field>
              </div>
            </div>
          )}

          {tab === 'seo' && (
            <div className="space-y-4">
              <Field label="Default page title" counter={{ value: (data.seo.default_title || '').length, min: 30, max: 60 }} hint="Used for the home page and any page without its own title.">
                <Input value={data.seo.default_title || ''} onChange={(e) => set('seo', 'default_title', e.target.value)} />
              </Field>
              <Field label="Default meta description" counter={{ value: (data.seo.default_description || '').length, min: 120, max: 160 }}>
                <Textarea value={data.seo.default_description || ''} onChange={(e) => set('seo', 'default_description', e.target.value)} rows={3} />
              </Field>
              {text('seo', 'title_template', 'Title template', { hint: 'Used for blog, category and job pages. %s is replaced with the page title, e.g. "%s | Codigix Infotech".' })}
              <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                {text('seo', 'blog_title', 'Blog page title')}
                <Field label="Blog page description" counter={{ value: (data.seo.blog_description || '').length, max: 160 }}>
                  <Textarea value={data.seo.blog_description || ''} onChange={(e) => set('seo', 'blog_description', e.target.value)} rows={3} />
                </Field>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                <Field label="Default social share image" hint="1200×630px. Used when a page has no image of its own.">
                  <ImageField value={data.seo.default_og_image} onChange={(v) => set('seo', 'default_og_image', v)} folder="seo" aspect="aspect-[1.91/1]" />
                </Field>
                <div className="space-y-4">
                  {text('seo', 'twitter_handle', 'X (Twitter) handle', { placeholder: '@codigix' })}
                  {text('seo', 'google_site_verification', 'Google Search Console verification code', {
                    hint: 'Paste only the content="…" value from the HTML-tag verification method.',
                  })}
                </div>
              </div>
              <p className="text-xs text-slate-500 flex items-center gap-1.5 pt-2"><Globe size={13} /> Sitemap: <a href="/sitemap.xml" target="_blank" className="text-indigo-600 hover:underline">/sitemap.xml</a> · Robots: <a href="/robots.txt" target="_blank" className="text-indigo-600 hover:underline">/robots.txt</a></p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
