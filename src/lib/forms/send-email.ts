import nodemailer from "nodemailer";
import { contact } from "@/data/site";

type EmailPayload = {
  subject: string;
  replyTo: string;
  to: string;
  lines: { label: string; value: string }[];
};

function isSmtpConfigured(): boolean {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

function buildTextBody(lines: { label: string; value: string }[]): string {
  return lines
    .filter((line) => line.value.trim())
    .map((line) => `${line.label} : ${line.value}`)
    .join("\n");
}

function buildHtmlBody(lines: { label: string; value: string }[]): string {
  const rows = lines
    .filter((line) => line.value.trim())
    .map(
      (line) =>
        `<tr><td style="padding:6px 12px;font-weight:600;vertical-align:top;">${line.label}</td><td style="padding:6px 12px;">${escapeHtml(line.value)}</td></tr>`,
    )
    .join("");

  return `<table style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">${rows}</table>`;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendFormEmail(payload: EmailPayload): Promise<void> {
  const from =
    process.env.SMTP_FROM ?? process.env.FORM_FROM ?? contact.emails.info;

  if (!isSmtpConfigured()) {
    console.info("[Form] SMTP non configuré — soumission reçue :", {
      subject: payload.subject,
      to: payload.to,
      body: buildTextBody(payload.lines),
    });
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from,
    to: payload.to,
    replyTo: payload.replyTo,
    subject: payload.subject,
    text: buildTextBody(payload.lines),
    html: buildHtmlBody(payload.lines),
  });
}

export function getQuoteRecipient(): string {
  return process.env.FORM_TO_COMMERCIAL ?? contact.emails.commercial;
}

export function getSavRecipient(): string {
  return process.env.FORM_TO_SAV ?? contact.emails.info;
}
