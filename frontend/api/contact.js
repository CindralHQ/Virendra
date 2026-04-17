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
  const missing = [
    !host ? "SMTP_HOST" : null,
    !user ? "SMTP_USER" : null,
    !pass ? "SMTP_PASS" : null,
  ].filter(Boolean);

  if (missing.length) {
    throw new Error(`Missing SMTP configuration: ${missing.join(", ")}.`);
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

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function formatProductLines(selectedProducts) {
  if (!Array.isArray(selectedProducts) || !selectedProducts.length) {
    return [];
  }

  return selectedProducts.map((product, index) => {
    const title = trimValue(product?.title) || "Untitled product";
    const casNo = trimValue(product?.casNo) || "Not provided";
    const category = trimValue(product?.category) || "Not provided";
    return `${index + 1}. ${title} | CAS: ${casNo} | Category: ${category}`;
  });
}

function buildHtml({ name, email, phone, company, message, selectedProducts }) {
  const lines = [
    ["Name", name],
    ["Email", email],
    ["Phone", phone || "Not provided"],
    ["Company", company || "Not provided"],
    ["Message", message],
  ];
  const selectedProductLines = formatProductLines(selectedProducts);

  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
      <h2 style="margin-bottom: 16px;">New Contact Form Submission</h2>
      ${lines
        .map(
          ([label, value]) =>
            `<p style="margin: 0 0 12px;"><strong>${label}:</strong><br />${escapeHtml(value)
              .replace(/\n/g, "<br />")}</p>`
        )
        .join("")}
      ${
        selectedProductLines.length
          ? `<div style="margin-top: 20px;">
        <h3 style="margin-bottom: 10px;">Selected Products</h3>
        <ul style="padding-left: 20px; margin: 0;">
          ${selectedProductLines
            .map((line) => `<li style="margin-bottom: 8px;">${escapeHtml(line)}</li>`)
            .join("")}
        </ul>
      </div>`
          : ""
      }
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
    const selectedProducts = Array.isArray(body.selectedProducts)
      ? body.selectedProducts.map((product) => ({
          id: trimValue(product?.id),
          title: trimValue(product?.title),
          casNo: trimValue(product?.casNo),
          category: trimValue(product?.category),
        }))
      : [];

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
        ...(selectedProducts.length
          ? [
              "",
              "Selected Products:",
              ...formatProductLines(selectedProducts),
            ]
          : []),
      ].join("\n"),
      html: buildHtml({ name, email, phone, company, message, selectedProducts }),
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Contact form send failed:", error);
    const message =
      error?.message && /SMTP_|Missing SMTP configuration/i.test(error.message)
        ? error.message
        : "Failed to send message. Please verify the mail server configuration.";

    return res.status(500).json({ error: message });
  }
}
