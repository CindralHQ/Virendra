// google.js
import { google } from "googleapis";
import dotenv from "dotenv";
dotenv.config();

// ===============================
// 🔐 GOOGLE AUTH
// ===============================

function normalizePrivateKey(key) {
  if (!key) return "";

  // Case 1: Vercel / production ----> contains "\n" as TEXT
  if (key.includes("\\n")) {
    return key.replace(/\\n/g, "\n");
  }

  // Case 2: Local machine ----> real newlines → already correct
  return key;
}


const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,

    private_key: normalizePrivateKey(process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY),

    private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, "\n"),

  },
  scopes: [
    "https://www.googleapis.com/auth/spreadsheets.readonly",
    "https://www.googleapis.com/auth/documents.readonly",
    "https://www.googleapis.com/auth/drive",
  ],
});

// ===============================
// 📌 Cache so we don't re-set permissions
// ===============================
const publicCache = new Set();

// ===============================
// 🔵 Extract DRIVE FILE ID from any URL
// ===============================
export function extractDriveFileId(url) {
  if (!url) return null;

  const patterns = [
    /\/d\/([^/]+)/,
    /id=([^&]+)/,
    /open\?id=([^&]+)/,
    /uc\?export=view&id=([^&]+)/,
  ];

  for (const p of patterns) {
    const match = url.match(p);
    if (match) return match[1];
  }
  return null;
}

// ===============================
// 🔵 THUMBNAIL URL GENERATOR
// ===============================
export function getThumbnailURL(fileId, size = 300) {
  return `https://drive.google.com/thumbnail?authuser=0&sz=w${size}&id=${fileId}`;
}

// ===============================
// 🔵 Make file PUBLIC + return image URL
// ===============================
export async function getPublicImageURL(fileId, thumb = true) {
  if (!fileId) return "";

  const client = await auth.getClient();
  const drive = google.drive({ version: "v3", auth: client });

  // Only make public once
  if (!publicCache.has(fileId)) {
    try {
      await drive.permissions.create({
        fileId,
        requestBody: {
          role: "reader",
          type: "anyone",
        },
      });
      publicCache.add(fileId);
    } catch (err) {
      console.log("Permission already public or error:", err.message);
      publicCache.add(fileId);
    }
  }

  // Thumbnail mode (recommended for frontend)
  if (thumb) {
    return getThumbnailURL(fileId, 500); // you can change size
  }

  // Full-size download mode
  return `https://drive.google.com/uc?export=view&id=${fileId}`;
}

// ===============================
// 🔵 GET GOOGLE SHEET (Images auto → thumbnails)
// ===============================
export async function getSheet(sheetId) {
  const client = await auth.getClient();
  const sheets = google.sheets({ version: "v4", auth: client });

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: "Sheet1!A1:Z1000",
  });

  const rows = res.data.values || [];

  const output = await Promise.all(
    rows.map(async (row) =>
      Promise.all(
        row.map(async (cell) => {
          const fileId = extractDriveFileId(cell);
          return fileId ? await getPublicImageURL(fileId, true) : cell;
        })
      )
    )
  );

  return output;
}

// ===============================
// 🔵 GET GOOGLE DOC → HTML TEXT
// ===============================
export async function getDocWithMeta(docId) {
  const client = await auth.getClient();
  const docs = google.docs({ version: "v1", auth: client });

  const res = await docs.documents.get({ documentId: docId });

  let html = "";

  for (const block of res.data.body.content || []) {
    if (!block.paragraph) continue;

    for (const el of block.paragraph.elements || []) {
      if (el.textRun?.content) {
        html += `<p>${el.textRun.content}</p>`;
      }
    }
  }

  return { html };
}
