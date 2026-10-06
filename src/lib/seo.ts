/** Serialise JSON-LD safely for a <script> tag (content comes from the CMS). */
export function jsonLd(data: unknown): { __html: string } {
  return {
    __html: JSON.stringify(data)
      .replace(/</g, '\\u003c')
      .replace(/>/g, '\\u003e')
      .replace(/&/g, '\\u0026'),
  };
}

/** Apply the admin-configured title template, e.g. "%s | Codigix Infotech". */
export function withTemplate(template: string | undefined, title: string) {
  return template && template.includes('%s') ? template.replace('%s', title) : title;
}

export function formatDate(value?: string | null, opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' }) {
  if (!value) return '';
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? '' : d.toLocaleDateString('en-IN', { ...opts, timeZone: 'Asia/Kolkata' });
}
