'use client';

import { createContext, forwardRef, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { AlertTriangle, CheckCircle2, ChevronLeft, ChevronRight, Info, Loader2, Search, X, XCircle } from 'lucide-react';

export const cx = (...classes: (string | false | null | undefined)[]) => classes.filter(Boolean).join(' ');

/* ---------------- Buttons ---------------- */
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md';
  loading?: boolean;
  icon?: React.ReactNode;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', loading, icon, className, children, disabled, type = 'button', ...rest },
  ref
) {
  const styles = {
    primary: 'bg-[#1a1053] text-white hover:bg-[#2b1f7a] shadow-sm',
    secondary: 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300',
    ghost: 'text-slate-600 hover:bg-slate-100',
    danger: 'bg-rose-600 text-white hover:bg-rose-700 shadow-sm',
    success: 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm',
  }[variant];
  const sizes = size === 'sm' ? 'h-8 px-3 text-xs gap-1.5' : 'h-10 px-4 text-sm gap-2';
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      className={cx(
        'inline-flex items-center justify-center rounded-lg font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1',
        styles,
        sizes,
        className
      )}
      {...rest}
    >
      {loading ? <Loader2 size={size === 'sm' ? 14 : 16} className="animate-spin" /> : icon}
      {children}
    </button>
  );
});

/* ---------------- Form controls ---------------- */
export const inputClass =
  'w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition disabled:bg-slate-50';

export function Field({
  label,
  hint,
  children,
  required,
  counter,
  className,
  htmlFor,
}: {
  label?: string;
  hint?: React.ReactNode;
  children: React.ReactNode;
  required?: boolean;
  counter?: { value: number; min?: number; max: number };
  className?: string;
  htmlFor?: string;
}) {
  let counterColor = 'text-slate-400';
  if (counter) {
    const { value, min = 0, max } = counter;
    counterColor = value === 0 ? 'text-slate-400' : value > max ? 'text-rose-600' : value < min ? 'text-amber-600' : 'text-emerald-600';
  }
  return (
    <div className={className}>
      {(label || counter) && (
        <div className="flex items-center justify-between mb-1.5">
          {label && (
            <label htmlFor={htmlFor} className="text-[13px] font-semibold text-slate-700">
              {label} {required && <span className="text-rose-500">*</span>}
            </label>
          )}
          {counter && (
            <span className={cx('text-[11px] font-semibold tabular-nums', counterColor)}>
              {counter.value}/{counter.max}
            </span>
          )}
        </div>
      )}
      {children}
      {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
    </div>
  );
}

export const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(function Input(
  { className, ...rest },
  ref
) {
  return <input ref={ref} className={cx(inputClass, className)} {...rest} />;
});

export const Textarea = forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(function Textarea(
  { className, ...rest },
  ref
) {
  return <textarea ref={ref} className={cx(inputClass, 'min-h-[90px] leading-relaxed', className)} {...rest} />;
});

export function Select({ className, children, ...rest }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={cx(inputClass, 'pr-8 cursor-pointer', className)} {...rest}>
      {children}
    </select>
  );
}

export function Toggle({
  checked,
  onChange,
  label,
  description,
  disabled,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
}) {
  return (
    <label className={cx('flex items-start gap-3 select-none', disabled ? 'opacity-60' : 'cursor-pointer')}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cx(
          'relative mt-0.5 inline-flex h-5 w-9 shrink-0 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500',
          checked ? 'bg-indigo-600' : 'bg-slate-300'
        )}
      >
        <span className={cx('absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform', checked ? 'translate-x-[18px]' : 'translate-x-0.5')} />
      </button>
      {(label || description) && (
        <span>
          {label && <span className="block text-sm font-medium text-slate-700">{label}</span>}
          {description && <span className="block text-xs text-slate-500">{description}</span>}
        </span>
      )}
    </label>
  );
}

export function SearchInput({ value, onChange, placeholder = 'Search…' }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  const [local, setLocal] = useState(value);
  useEffect(() => setLocal(value), [value]);
  useEffect(() => {
    const t = setTimeout(() => local !== value && onChange(local), 300);
    return () => clearTimeout(t);
  }, [local, value, onChange]);
  return (
    <div className="relative w-full sm:w-72">
      <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
      <input value={local} onChange={(e) => setLocal(e.target.value)} placeholder={placeholder} className={cx(inputClass, 'pl-9')} />
    </div>
  );
}

/* ---------------- Layout bits ---------------- */
export function PageHeader({ title, description, actions }: { title: string; description?: string; actions?: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{title}</h1>
        {description && <p className="text-sm text-slate-500 mt-1">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

export function Card({ title, description, actions, children, className, bodyClassName }: {
  title?: React.ReactNode;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <section className={cx('bg-white rounded-xl border border-slate-200/80 shadow-[0_1px_2px_rgba(15,23,42,0.04)]', className)}>
      {(title || actions) && (
        <header className="flex items-center justify-between gap-3 px-5 py-4 border-b border-slate-100">
          <div>
            {title && <h2 className="text-sm font-semibold text-slate-900">{title}</h2>}
            {description && <p className="text-xs text-slate-500 mt-0.5">{description}</p>}
          </div>
          {actions}
        </header>
      )}
      <div className={cx('p-5', bodyClassName)}>{children}</div>
    </section>
  );
}

const BADGE_TONES = {
  gray: 'bg-slate-100 text-slate-700 ring-slate-200',
  green: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  blue: 'bg-blue-50 text-blue-700 ring-blue-200',
  amber: 'bg-amber-50 text-amber-700 ring-amber-200',
  red: 'bg-rose-50 text-rose-700 ring-rose-200',
  purple: 'bg-violet-50 text-violet-700 ring-violet-200',
};
export type BadgeTone = keyof typeof BADGE_TONES;

export function Badge({ tone = 'gray', children }: { tone?: BadgeTone; children: React.ReactNode }) {
  return <span className={cx('inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ring-inset capitalize', BADGE_TONES[tone])}>{children}</span>;
}

export const STATUS_TONES: Record<string, BadgeTone> = {
  published: 'green', open: 'green', subscribed: 'green', hired: 'green', replied: 'green', active: 'green',
  draft: 'gray', closed: 'gray', archived: 'gray', unsubscribed: 'gray', inactive: 'gray',
  scheduled: 'blue', reviewing: 'blue', read: 'blue',
  new: 'amber', shortlisted: 'purple', rejected: 'red',
};

export function StatusBadge({ status }: { status: string }) {
  return <Badge tone={STATUS_TONES[status] || 'gray'}>{status}</Badge>;
}

export function Spinner({ label = 'Loading…' }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-2 py-16 text-sm text-slate-500">
      <Loader2 size={18} className="animate-spin" /> {label}
    </div>
  );
}

export function EmptyState({ icon, title, description, action }: { icon?: React.ReactNode; title: string; description?: string; action?: React.ReactNode }) {
  return (
    <div className="text-center py-16 px-6">
      {icon && <div className="mx-auto mb-3 w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">{icon}</div>}
      <p className="font-semibold text-slate-800">{title}</p>
      {description && <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function Pagination({ page, pages, total, onChange }: { page: number; pages: number; total: number; onChange: (p: number) => void }) {
  if (pages <= 1) return <p className="text-xs text-slate-500 px-5 py-3">{total} item{total === 1 ? '' : 's'}</p>;
  return (
    <div className="flex items-center justify-between px-5 py-3 border-t border-slate-100">
      <p className="text-xs text-slate-500">
        Page {page} of {pages} · {total} items
      </p>
      <div className="flex gap-1">
        <Button size="sm" variant="secondary" disabled={page <= 1} onClick={() => onChange(page - 1)} icon={<ChevronLeft size={14} />}>
          Prev
        </Button>
        <Button size="sm" variant="secondary" disabled={page >= pages} onClick={() => onChange(page + 1)}>
          Next <ChevronRight size={14} />
        </Button>
      </div>
    </div>
  );
}

/* ---------------- Overlays ---------------- */
function useEscape(open: boolean, onClose: () => void) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);
}

export function Drawer({ open, onClose, title, subtitle, children, footer, width = 'max-w-2xl' }: {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  width?: string;
}) {
  useEscape(open, onClose);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-label={title}>
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] animate-[fadeIn_.15s_ease-out]" onClick={onClose} />
      <div className={cx('relative w-full h-full bg-white shadow-2xl flex flex-col animate-[slideIn_.2s_ease-out]', width)}>
        <header className="flex items-start justify-between gap-4 px-6 py-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
            {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700" aria-label="Close">
            <X size={18} />
          </button>
        </header>
        <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>
        {footer && <footer className="px-6 py-4 border-t border-slate-100 bg-slate-50/60 flex justify-end gap-2">{footer}</footer>}
      </div>
    </div>
  );
}

export function Modal({ open, onClose, title, children, footer, size = 'max-w-lg' }: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: string;
}) {
  useEscape(open, onClose);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={title}>
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-[2px]" onClick={onClose} />
      <div className={cx('relative w-full bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh]', size)}>
        <header className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-900">{title}</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100" aria-label="Close">
            <X size={18} />
          </button>
        </header>
        <div className="overflow-y-auto p-5 flex-1">{children}</div>
        {footer && <footer className="px-5 py-3 border-t border-slate-100 flex justify-end gap-2">{footer}</footer>}
      </div>
    </div>
  );
}

/* ---------------- Toasts & confirm ---------------- */
type Toast = { id: number; type: 'success' | 'error' | 'info'; message: string };
type ConfirmOpts = { title: string; message?: string; confirmLabel?: string; danger?: boolean };

const FeedbackContext = createContext<{
  toast: (message: string, type?: Toast['type']) => void;
  confirm: (opts: ConfirmOpts) => Promise<boolean>;
} | null>(null);

export function useToast() {
  const ctx = useContext(FeedbackContext);
  if (!ctx) throw new Error('useToast outside FeedbackProvider');
  return ctx.toast;
}

export function useConfirm() {
  const ctx = useContext(FeedbackContext);
  if (!ctx) throw new Error('useConfirm outside FeedbackProvider');
  return ctx.confirm;
}

export function FeedbackProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [confirmState, setConfirmState] = useState<(ConfirmOpts & { resolve: (v: boolean) => void }) | null>(null);
  const idRef = useRef(0);

  const toast = useCallback((message: string, type: Toast['type'] = 'success') => {
    const id = ++idRef.current;
    setToasts((t) => [...t, { id, type, message }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), type === 'error' ? 6000 : 3500);
  }, []);

  const confirm = useCallback((opts: ConfirmOpts) => new Promise<boolean>((resolve) => setConfirmState({ ...opts, resolve })), []);
  const close = (v: boolean) => {
    confirmState?.resolve(v);
    setConfirmState(null);
  };

  return (
    <FeedbackContext.Provider value={{ toast, confirm }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[80] flex flex-col gap-2 w-[min(380px,calc(100vw-2rem))]" aria-live="polite">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cx(
              'flex items-start gap-3 rounded-xl px-4 py-3 shadow-lg ring-1 text-sm bg-white animate-[slideUp_.2s_ease-out]',
              t.type === 'success' && 'ring-emerald-200',
              t.type === 'error' && 'ring-rose-200',
              t.type === 'info' && 'ring-blue-200'
            )}
          >
            {t.type === 'success' && <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />}
            {t.type === 'error' && <XCircle size={18} className="text-rose-500 shrink-0" />}
            {t.type === 'info' && <Info size={18} className="text-blue-500 shrink-0" />}
            <p className="text-slate-700 flex-1">{t.message}</p>
            <button onClick={() => setToasts((all) => all.filter((x) => x.id !== t.id))} className="text-slate-400 hover:text-slate-600" aria-label="Dismiss">
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
      <Modal
        open={!!confirmState}
        onClose={() => close(false)}
        title={confirmState?.title || ''}
        size="max-w-md"
        footer={
          <>
            <Button variant="secondary" onClick={() => close(false)}>Cancel</Button>
            <Button variant={confirmState?.danger ? 'danger' : 'primary'} onClick={() => close(true)} autoFocus>
              {confirmState?.confirmLabel || 'Confirm'}
            </Button>
          </>
        }
      >
        <div className="flex gap-3">
          {confirmState?.danger && (
            <div className="w-10 h-10 shrink-0 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center">
              <AlertTriangle size={18} />
            </div>
          )}
          <p className="text-sm text-slate-600 leading-relaxed">{confirmState?.message}</p>
        </div>
      </Modal>
    </FeedbackContext.Provider>
  );
}

/* ---------------- Helpers ---------------- */
export function formatDateTime(value?: string | null) {
  if (!value) return '—';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit', timeZone: 'Asia/Kolkata' });
}

export function timeAgo(value?: string | null) {
  if (!value) return '';
  const diff = (Date.now() - new Date(value).getTime()) / 1000;
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 86400 * 30) return `${Math.floor(diff / 86400)}d ago`;
  return formatDateTime(value).split(',')[0];
}
