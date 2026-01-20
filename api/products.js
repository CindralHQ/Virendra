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
    const headerRow = rows[0] || [];
    const body = rows.slice(1);
    const normalizeHeader = (value) =>
      String(value || "")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "");

    const headerIndex = headerRow.reduce((acc, header, index) => {
      const key = normalizeHeader(header);
      if (key) acc[key] = index;
      return acc;
    }, {});

    const headerAliases = {
      title: ["productname", "product", "name"],
      casNo: ["casnumber", "casno", "cas"],
      description: ["description", "desc"],
      synonyms: ["synonyms", "synonym"],
      tdsLink: ["technicaldatasheet", "tds", "tdslink"],
      msdsLink: ["safetydatasheet", "msds", "sds", "msdslink"],
      relatedProducts: ["relatedproducts", "relatedproduct", "related"],
      category: ["category"],
      image: ["visualreferenceimage", "visualreference", "image"],
      bondImage: ["chemicalbondimage", "bondimage"],
      timestamp: ["timestamp"],
    };

    const hasRecognizedHeader = Object.values(headerAliases).some((aliases) =>
      aliases.some((alias) => headerIndex[alias] !== undefined)
    );

    const getCell = (row, aliases, fallbackIndex) => {
      for (const alias of aliases) {
        const index = headerIndex[alias];
        if (index !== undefined) {
          return row[index] ?? "";
        }
      }
      if (!hasRecognizedHeader && fallbackIndex !== undefined) {
        return row[fallbackIndex] ?? "";
      }
      return "";
    };

    const products = body.map((row, index) => ({
      id: index + 1,
      title: getCell(row, headerAliases.title, 0),
      casNo: getCell(row, headerAliases.casNo, 1),
      description: getCell(row, headerAliases.description, 2),
      synonyms: getCell(row, headerAliases.synonyms),
      tdsLink: getCell(row, headerAliases.tdsLink, 3),
      msdsLink: getCell(row, headerAliases.msdsLink, 4),
      relatedProducts: getCell(row, headerAliases.relatedProducts, 6),
      category: getCell(row, headerAliases.category, 5),
      image: getCell(row, headerAliases.image, 7),
      bondImage: getCell(row, headerAliases.bondImage),
      timestamp: getCell(row, headerAliases.timestamp),
    }));

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to load products" });
  }
}
