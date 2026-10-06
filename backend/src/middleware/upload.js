import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import multer from 'multer';
import sharp from 'sharp';
import env from '../config/env.js';
import { badRequest } from '../utils/httpError.js';

const IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif']);
const RESUME_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);
const RESUME_EXT = new Set(['.pdf', '.doc', '.docx']);

export const imageUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: env.maxImageBytes, files: 20 },
  fileFilter: (_req, file, cb) => {
    if (!IMAGE_TYPES.has(file.mimetype)) {
      return cb(badRequest('Only JPG, PNG, WEBP, GIF or AVIF images are allowed'));
    }
    cb(null, true);
  },
});

export const resumeUpload = multer({
  storage: multer.diskStorage({
    destination: path.join(env.privateUploadDir, 'resumes'),
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      cb(null, `${Date.now()}-${crypto.randomBytes(6).toString('hex')}${ext}`);
    },
  }),
  limits: { fileSize: env.maxResumeBytes, files: 1 },
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (!RESUME_TYPES.has(file.mimetype) || !RESUME_EXT.has(ext)) {
      return cb(badRequest('Resume must be a PDF, DOC or DOCX file'));
    }
    cb(null, true);
  },
});

const SAFE_FOLDER = /^[a-z0-9-]{1,40}$/;

/**
 * Optimise an uploaded image (resize + WebP) and write it to /uploads/<folder>/.
 * GIFs are stored as-is to keep animation.
 */
export async function saveImage(file, folder = 'general') {
  const dirName = SAFE_FOLDER.test(folder) ? folder : 'general';
  const dir = path.join(env.uploadDir, dirName);
  await fs.mkdir(dir, { recursive: true });

  const base = path
    .parse(file.originalname)
    .name.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60) || 'image';
  const id = crypto.randomBytes(4).toString('hex');

  let buffer = file.buffer;
  let ext = path.extname(file.originalname).toLowerCase() || '.img';
  let mime = file.mimetype;
  let width = null;
  let height = null;

  if (file.mimetype !== 'image/gif') {
    const img = sharp(file.buffer, { failOn: 'error' }).rotate();
    const out = await img
      .resize({ width: 2000, height: 2000, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 82 })
      .toBuffer({ resolveWithObject: true });
    buffer = out.data;
    width = out.info.width;
    height = out.info.height;
    ext = '.webp';
    mime = 'image/webp';
  } else {
    const meta = await sharp(file.buffer).metadata();
    width = meta.width ?? null;
    height = meta.height ?? null;
  }

  const filename = `${base}-${id}${ext}`;
  await fs.writeFile(path.join(dir, filename), buffer);

  return {
    filename,
    original_name: file.originalname.slice(0, 255),
    url: `/uploads/${dirName}/${filename}`,
    mime,
    size: buffer.length,
    width,
    height,
    folder: dirName,
  };
}
