import sanitizeHtml from 'sanitize-html';

// Rich text produced by the admin editor. We strip scripts and event handlers so a
// compromised editor account can't inject JavaScript into the public site.
const options = {
  allowedTags: [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'br', 'hr', 'blockquote', 'pre', 'code',
    'strong', 'b', 'em', 'i', 'u', 's', 'mark', 'sub', 'sup', 'span', 'small',
    'ul', 'ol', 'li', 'a', 'img', 'figure', 'figcaption',
    'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td', 'caption', 'colgroup', 'col',
    'div', 'iframe',
  ],
  allowedAttributes: {
    '*': ['id', 'class', 'style'],
    a: ['href', 'name', 'target', 'rel', 'title'],
    img: ['src', 'alt', 'title', 'width', 'height', 'loading'],
    iframe: ['src', 'width', 'height', 'allow', 'allowfullscreen', 'frameborder', 'title'],
    th: ['colspan', 'rowspan', 'scope', 'colwidth'],
    td: ['colspan', 'rowspan', 'colwidth'],
    ol: ['start', 'type'],
  },
  allowedStyles: {
    '*': {
      'text-align': [/^(left|right|center|justify)$/],
    },
  },
  allowedSchemes: ['http', 'https', 'mailto', 'tel'],
  allowedSchemesByTag: { img: ['http', 'https'] },
  allowProtocolRelative: false,
  allowedIframeHostnames: ['www.youtube.com', 'youtube.com', 'www.youtube-nocookie.com', 'player.vimeo.com', 'www.google.com'],
  transformTags: {
    a: (tagName, attribs) => {
      const attrs = { ...attribs };
      if (attrs.target === '_blank') attrs.rel = 'noopener noreferrer';
      return { tagName, attribs: attrs };
    },
  },
};

export function sanitizeRichText(html) {
  if (html == null) return html;
  return sanitizeHtml(String(html), options);
}
