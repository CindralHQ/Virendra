import { getSheet } from "./google.js";

export default async function handler(req, res) {
  // ---- CORS FIX ----
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  // ------------------

  try {
    const rows = await getSheet(process.env.SHEET_ID);

    const body = rows.slice(1);

    const products = body.map((row, index) => ({
      id: index + 1,
      title: row[0] || "",
      casNo: row[1] || "",
      description: row[2] || "",
      tdsLink: row[3] || "",
      msdsLink: row[4] || "",
      category: row[5] || "",
      relatedProducts: row[6] || "",
      image: row[7] || "",
    }));

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to load products" });
  }
}
