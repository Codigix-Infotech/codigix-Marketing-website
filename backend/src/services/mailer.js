import nodemailer from 'nodemailer';
import env from '../config/env.js';

let transporter = null;

/** True when SMTP_HOST and MAIL_FROM are set. Without them nothing is ever sent. */
export function mailConfigured() {
  // A username without a password can never log in, so treat that as "not configured".
  return Boolean(env.smtp.host && env.smtp.from && (!env.smtp.user || env.smtp.pass));
}

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: env.smtp.host,
      port: env.smtp.port,
      secure: env.smtp.secure,
      auth: env.smtp.user ? { user: env.smtp.user, pass: env.smtp.pass } : undefined,
      pool: true,
      maxConnections: 3,
    });
  }
  return transporter;
}

export async function sendMail({ to, subject, html, text, headers }) {
  if (!mailConfigured()) throw new Error('Email is not configured. Set SMTP_HOST and MAIL_FROM in backend/.env.');
  return getTransporter().sendMail({ from: env.smtp.from, replyTo: env.smtp.replyTo || undefined, to, subject, html, text, headers });
}
