import nodemailer from "nodemailer";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?[0-9\s-]{7,15}$/;
const env = globalThis.process?.env ?? {};

function trimValue(value) {
  return String(value ?? "").trim();
}

function getTransporter() {
  const host = env.SMTP_HOST;
  const port = Number(env.SMTP_PORT || 587);
  const user = env.SMTP_USER;
  const pass = env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error("Missing SMTP configuration.");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });
}

function buildHtml({ name, email, phone, company, message }) {
  const lines = [
    ["Name", name],
    ["Email", email],
    ["Phone", phone || "Not provided"],
    ["Company", company || "Not provided"],
    ["Message", message],
  ];

  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
      <h2 style="margin-bottom: 16px;">New Contact Form Submission</h2>
      ${lines
        .map(
          ([label, value]) =>
            `<p style="margin: 0 0 12px;"><strong>${label}:</strong><br />${String(value)
              .replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/\n/g, "<br />")}</p>`
        )
        .join("")}
    </div>
  `;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  try {
    const body =
      typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};

    const name = trimValue(body.name);
    const email = trimValue(body.email);
    const phone = trimValue(body.phone);
    const company = trimValue(body.company);
    const message = trimValue(body.message);

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required." });
    }

    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({ error: "Enter a valid email address." });
    }

    if (phone && !PHONE_REGEX.test(phone)) {
      return res.status(400).json({ error: "Enter a valid phone number." });
    }

    const transporter = getTransporter();
    const fromEmail = env.CONTACT_FROM_EMAIL || env.SMTP_USER;
    const toEmail = env.CONTACT_TO_EMAIL || fromEmail;

    await transporter.sendMail({
      from: `"Virendra Research Chem LLP" <${fromEmail}>`,
      to: toEmail,
      replyTo: email,
      subject: `New enquiry from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || "Not provided"}`,
        `Company: ${company || "Not provided"}`,
        "",
        "Message:",
        message,
      ].join("\n"),
      html: buildHtml({ name, email, phone, company, message }),
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Contact form send failed:", error);
    return res.status(500).json({ error: "Failed to send message." });
  }
}
