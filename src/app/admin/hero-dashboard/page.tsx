'use client';

import { useEffect, useState } from 'react';
import { Eye, EyeOff, RotateCcw, Save } from 'lucide-react';
import HeroDashboard from '@/components/home/HeroDashboard';
import { ObjectListEditor, StringListEditor, type ColumnDef } from '@/components/admin/ListEditors';
import { Button, Card, Field, Input, PageHeader, Spinner, useConfirm, useToast } from '@/components/admin/ui';
import { api } from '@/lib/admin/api';
import { defaultDashboard } from '@/lib/defaults';
import type { HeroDashboardData } from '@/lib/types';

const ICONS = ['users', 'filter', 'target', 'coins', 'chart', 'search', 'map-pin', 'instagram', 'youtube', 'trending', 'eye', 'phone'].map((v) => ({ value: v, label: v }));
const COLORS = ['blue', 'purple', 'emerald', 'orange', 'indigo', 'pink', 'red'].map((v) => ({ value: v, label: v }));

const metricCols: ColumnDef[] = [
  { key: 'title', label: 'Label', width: 'flex-[2]' },
  { key: 'value', label: 'Value', type: 'number' },
  { key: 'decimals', label: 'Decimals', type: 'number', width: 'w-20' },
  { key: 'suffix', label: 'Suffix', width: 'w-16', placeholder: 'L / x' },
  { key: 'isCurrency', label: '₹', type: 'checkbox', width: 'w-14', placeholder: '₹' },
  { key: 'trend', label: 'Trend %', type: 'number', width: 'w-20' },
  { key: 'icon', label: 'Icon', type: 'select', options: ICONS, width: 'w-28' },
  { key: 'color', label: 'Colour', type: 'select', options: COLORS, width: 'w-28' },
];

const channelCols: ColumnDef[] = [
  { key: 'name', label: 'Channel', width: 'flex-[2]' },
  { key: 'value', label: 'Value', placeholder: '12.4K' },
  { key: 'sub', label: 'Unit', placeholder: 'Clicks' },
  { key: 'trend', label: 'Trend %', type: 'number', width: 'w-20' },
  { key: 'stat1', label: 'Stat 1' },
  { key: 'stat2', label: 'Stat 2' },
  { key: 'progress', label: 'Ring %', type: 'number', width: 'w-20' },
  { key: 'icon', label: 'Icon', type: 'select', options: ICONS, width: 'w-28' },
  { key: 'color', label: 'Colour', type: 'select', options: COLORS, width: 'w-28' },
];

export default function HeroDashboardEditor() {
  const [data, setData] = useState<HeroDashboardData | null>(null);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [preview, setPreview] = useState(true);
  const toast = useToast();
  const confirm = useConfirm();

  useEffect(() => {
    api<{ data: Partial<HeroDashboardData> }>('/admin/settings/hero_dashboard')
      .then(({ data }) => setData({ ...defaultDashboard, ...data }))
      .catch((e) => toast(e.message, 'error'));
  }, [toast]);

  const update = <K extends keyof HeroDashboardData>(key: K, value: HeroDashboardData[K]) => {
    setData((d) => (d ? { ...d, [key]: value } : d));
    setDirty(true);
  };

  async function save() {
    if (!data) return;
    setSaving(true);
    try {
      await api('/admin/settings/hero_dashboard', { method: 'PUT', body: data });
      setDirty(false);
      toast('Dashboard numbers updated on the home page');
    } catch (err) {
      toast((err as Error).message, 'error');
    } finally {
      setSaving(false);
    }
  }

  async function reset() {
    const ok = await confirm({ title: 'Reset to original numbers?', message: 'This replaces the form with the original demo values. Nothing is saved until you click Save.', confirmLabel: 'Reset' });
    if (ok) {
      setData(defaultDashboard);
      setDirty(true);
    }
  }

  if (!data) return <Spinner />;

  return (
    <div className="space-y-6 pb-16">
      <PageHeader
        title="Hero Dashboard"
        description="The animated analytics dashboard in the home page hero. Edit any value — the preview updates as you type."
        actions={
          <>
            <Button variant="ghost" icon={<RotateCcw size={15} />} onClick={reset}>Reset</Button>
            <Button variant="secondary" icon={preview ? <EyeOff size={15} /> : <Eye size={15} />} onClick={() => setPreview((p) => !p)}>
              {preview ? 'Hide preview' : 'Show preview'}
            </Button>
            <Button icon={<Save size={15} />} onClick={save} loading={saving} disabled={!dirty}>Save changes</Button>
          </>
        }
      />

      {preview && (
        <div className="rounded-2xl bg-[#e9ecf5] p-3 md:p-5 shadow-sm ring-1 ring-slate-200">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-2">Live preview</p>
          <div className="max-w-3xl mx-auto pointer-events-none">
            <HeroDashboard data={data} key={JSON.stringify(data.metrics.map((m) => m.value))} />
          </div>
        </div>
      )}

      <Card title="Top metrics" description="The 5 headline KPI cards. Values count up when the page loads.">
        <ObjectListEditor value={data.metrics} onChange={(v) => update('metrics', v)} columns={metricCols} max={5}
          newItem={() => ({ title: 'New metric', value: 0, trend: 0, icon: 'chart', color: 'blue' })} />
      </Card>

      <Card title="Channel performance" description="The 6 channel cards. The ring around each card fills to the “Ring %”.">
        <ObjectListEditor value={data.channels} onChange={(v) => update('channels', v)} columns={channelCols} max={6}
          newItem={() => ({ name: 'Channel', value: '0', sub: 'Clicks', trend: 0, progress: 50, icon: 'search', color: 'blue' })} />
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card title="Traffic sources" description="Donut legend next to the website traffic chart.">
          <Field label="Total visitors (centre of donut)" className="mb-4">
            <Input value={data.traffic_total} onChange={(e) => update('traffic_total', e.target.value)} />
          </Field>
          <ObjectListEditor value={data.traffic_sources} onChange={(v) => update('traffic_sources', v)} max={6}
            columns={[{ key: 'label', label: 'Source', width: 'flex-[2]' }, { key: 'pct', label: '%', type: 'number' }]}
            newItem={() => ({ label: 'Source', pct: 0 })} />
          <p className="text-xs text-slate-500 mt-2">
            Total: {data.traffic_sources.reduce((s, x) => s + (Number(x.pct) || 0), 0)}%
          </p>
        </Card>

        <Card title="Traffic chart dates" description="Labels under the website traffic chart.">
          <StringListEditor value={data.traffic_axis} onChange={(v) => update('traffic_axis', v)} placeholder="e.g. 1 Sep" addLabel="Add label" />
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card title="Keyword rankings" description="Top 5 rows are shown. Use a negative change to show a drop.">
          <ObjectListEditor value={data.keywords} onChange={(v) => update('keywords', v)} max={5}
            columns={[
              { key: 'keyword', label: 'Keyword', width: 'flex-[2]' },
              { key: 'position', label: 'Pos.', type: 'number', width: 'w-20' },
              { key: 'change', label: 'Change', type: 'number', width: 'w-20' },
              { key: 'volume', label: 'Volume', width: 'w-24' },
            ]}
            newItem={() => ({ keyword: '', position: 1, change: 0, volume: '' })} />
        </Card>

        <Card title="Content performance" description="Top 5 blog/video rows.">
          <ObjectListEditor value={data.content} onChange={(v) => update('content', v)} max={5}
            columns={[
              { key: 'title', label: 'Title', width: 'flex-[2]' },
              { key: 'views', label: 'Views', width: 'w-24' },
              { key: 'engagement', label: 'Engagement', width: 'w-28' },
            ]}
            newItem={() => ({ title: '', views: '', engagement: '' })} />
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card title="Ad performance" description="4 animated counters. Tick “down” for a decrease (shown in red).">
          <ObjectListEditor value={data.ads} onChange={(v) => update('ads', v)} max={4}
            columns={[
              { key: 'label', label: 'Label', width: 'flex-[2]' },
              { key: 'value', label: 'Value', type: 'number' },
              { key: 'isCurrency', label: '₹', type: 'checkbox', width: 'w-14', placeholder: '₹' },
              { key: 'trend', label: 'Trend %', type: 'number', width: 'w-20' },
              { key: 'down', label: 'Down', type: 'checkbox', width: 'w-16', placeholder: '↓' },
            ]}
            newItem={() => ({ label: '', value: 0, trend: 0 })} />
        </Card>

        <Card title="Lead funnel" description="Bar width is a percentage of the full row.">
          <ObjectListEditor value={data.funnel} onChange={(v) => update('funnel', v)} max={6}
            columns={[
              { key: 'label', label: 'Stage', width: 'flex-[2]' },
              { key: 'value', label: 'Value', width: 'w-24' },
              { key: 'pct', label: 'Rate', width: 'w-20' },
              { key: 'width', label: 'Bar %', type: 'number', width: 'w-20' },
            ]}
            newItem={() => ({ label: '', value: '', pct: '', width: 10 })} />
        </Card>
      </div>
    </div>
  );
}
