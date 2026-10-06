'use client';

import { ArrowDown, ArrowUp, GripVertical, Plus, Trash2 } from 'lucide-react';
import { Button, cx, Input, inputClass, Select, Textarea } from './ui';

function move<T>(arr: T[], from: number, to: number) {
  const next = [...arr];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

/** Editable list of strings (responsibilities, requirements…). */
export function StringListEditor({ value, onChange, placeholder = 'Add an item', addLabel = 'Add item' }: {
  value: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
  addLabel?: string;
}) {
  const items = Array.isArray(value) ? value : [];
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="text-xs text-slate-400 w-5 text-right tabular-nums">{i + 1}.</span>
          <Input
            value={item}
            placeholder={placeholder}
            onChange={(e) => onChange(items.map((x, j) => (j === i ? e.target.value : x)))}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                onChange([...items.slice(0, i + 1), '', ...items.slice(i + 1)]);
              }
            }}
          />
          <button type="button" disabled={i === 0} onClick={() => onChange(move(items, i, i - 1))} className="p-1.5 text-slate-400 hover:text-slate-700 disabled:opacity-30" aria-label="Move up"><ArrowUp size={14} /></button>
          <button type="button" disabled={i === items.length - 1} onClick={() => onChange(move(items, i, i + 1))} className="p-1.5 text-slate-400 hover:text-slate-700 disabled:opacity-30" aria-label="Move down"><ArrowDown size={14} /></button>
          <button type="button" onClick={() => onChange(items.filter((_, j) => j !== i))} className="p-1.5 text-slate-400 hover:text-rose-600" aria-label="Remove"><Trash2 size={14} /></button>
        </div>
      ))}
      <Button size="sm" variant="secondary" icon={<Plus size={14} />} onClick={() => onChange([...items, ''])}>
        {addLabel}
      </Button>
    </div>
  );
}

export interface ColumnDef {
  key: string;
  label: string;
  type?: 'text' | 'number' | 'textarea' | 'select' | 'checkbox';
  options?: { value: string; label: string }[];
  width?: string;
  placeholder?: string;
}

/** Editable list of objects rendered as rows (dashboard metrics, FAQs…). */
export function ObjectListEditor<T extends Record<string, any>>({ value, onChange, columns, newItem, max, addLabel = 'Add row', layout = 'row' }: {
  value: T[];
  onChange: (v: T[]) => void;
  columns: ColumnDef[];
  newItem: () => T;
  max?: number;
  addLabel?: string;
  layout?: 'row' | 'card';
}) {
  const items = Array.isArray(value) ? value : [];
  const update = (i: number, key: string, v: unknown) => onChange(items.map((row, j) => (j === i ? { ...row, [key]: v } : row)));

  const renderControl = (row: T, i: number, col: ColumnDef) => {
    const v = row[col.key];
    switch (col.type) {
      case 'number':
        return <Input type="number" step="any" value={v ?? ''} placeholder={col.placeholder} onChange={(e) => update(i, col.key, e.target.value === '' ? '' : Number(e.target.value))} />;
      case 'textarea':
        return <Textarea rows={3} value={v ?? ''} placeholder={col.placeholder} onChange={(e) => update(i, col.key, e.target.value)} />;
      case 'select':
        return (
          <Select value={v ?? ''} onChange={(e) => update(i, col.key, e.target.value)}>
            {col.options?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </Select>
        );
      case 'checkbox':
        return (
          <label className="flex items-center h-[38px] gap-2 text-sm text-slate-600">
            <input type="checkbox" checked={!!v} onChange={(e) => update(i, col.key, e.target.checked)} />
            {col.placeholder}
          </label>
        );
      default:
        return <Input value={v ?? ''} placeholder={col.placeholder} onChange={(e) => update(i, col.key, e.target.value)} />;
    }
  };

  return (
    <div className="space-y-2">
      {layout === 'row' && items.length > 0 && (
        <div className="hidden md:flex gap-2 pl-7 pr-[92px] text-[11px] font-semibold uppercase tracking-wide text-slate-400">
          {columns.map((c) => <span key={c.key} className={cx('min-w-0', c.width || 'flex-1')}>{c.label}</span>)}
        </div>
      )}
      {items.map((row, i) => (
        <div key={i} className={cx('flex gap-2', layout === 'card' ? 'items-start rounded-lg border border-slate-200 p-3 bg-slate-50/50' : 'items-center flex-wrap md:flex-nowrap')}>
          <GripVertical size={14} className="text-slate-300 shrink-0 hidden md:block mt-0" />
          <div className={cx('flex-1 min-w-0', layout === 'card' ? 'space-y-2' : 'flex gap-2 flex-wrap md:flex-nowrap w-full')}>
            {columns.map((col) => (
              <div key={col.key} className={cx('min-w-0', layout === 'card' ? '' : col.width || 'flex-1', layout === 'row' && 'w-full md:w-auto')}>
                {layout === 'card' && <p className="text-[11px] font-semibold text-slate-500 mb-1">{col.label}</p>}
                <span className="md:hidden text-[11px] text-slate-400">{layout === 'row' ? col.label : ''}</span>
                {renderControl(row, i, col)}
              </div>
            ))}
          </div>
          <div className="flex shrink-0">
            <button type="button" disabled={i === 0} onClick={() => onChange(move(items, i, i - 1))} className="p-1.5 text-slate-400 hover:text-slate-700 disabled:opacity-30" aria-label="Move up"><ArrowUp size={14} /></button>
            <button type="button" disabled={i === items.length - 1} onClick={() => onChange(move(items, i, i + 1))} className="p-1.5 text-slate-400 hover:text-slate-700 disabled:opacity-30" aria-label="Move down"><ArrowDown size={14} /></button>
            <button type="button" onClick={() => onChange(items.filter((_, j) => j !== i))} className="p-1.5 text-slate-400 hover:text-rose-600" aria-label="Remove"><Trash2 size={14} /></button>
          </div>
        </div>
      ))}
      <div className="flex items-center gap-3">
        <Button size="sm" variant="secondary" icon={<Plus size={14} />} disabled={!!max && items.length >= max} onClick={() => onChange([...items, newItem()])}>
          {addLabel}
        </Button>
        {max && <span className="text-xs text-slate-400">{items.length}/{max} shown on the website</span>}
      </div>
    </div>
  );
}

export { inputClass };
