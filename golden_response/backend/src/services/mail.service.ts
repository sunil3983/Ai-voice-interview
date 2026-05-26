import nodemailer from 'nodemailer';
import { env } from '../config/env.js';

const canSendMail = Boolean(env.SUPPORT_EMAIL && env.SUPPORT_EMAIL_PASSWORD && env.ADMIN_EMAIL);

const transporter = canSendMail
  ? nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: env.SUPPORT_EMAIL,
        pass: env.SUPPORT_EMAIL_PASSWORD
      }
    })
  : null;

export const sendContactEmails = async (payload: { name: string; email: string; subject: string; message: string }) => {
  if (!transporter) return;

  await Promise.all([
    transporter.sendMail({
      from: `"PrepWise Support" <${env.SUPPORT_EMAIL}>`,
      to: payload.email,
      subject: 'We received your PrepWise message',
      text: `Hi ${payload.name},\n\nThanks for contacting PrepWise. We received your message and will reply soon.\n\nSubject: ${payload.subject}\n\nPrepWise Team`
    }),
    transporter.sendMail({
      from: `"PrepWise Contact" <${env.SUPPORT_EMAIL}>`,
      to: env.ADMIN_EMAIL,
      subject: `PrepWise contact: ${payload.subject}`,
      text: `Name: ${payload.name}\nEmail: ${payload.email}\n\n${payload.message}`
    })
  ]);
};
