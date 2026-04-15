const env = globalThis.process?.env ?? {};

const escapeXml = (value) =>
  String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const slugify = (value) =>
  String(value || "")
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const getSiteOrigin = (req) => {
  const configured = env.SITE_URL || env.VITE_SITE_URL || env.VERCEL_PROJECT_PRODUCTION_URL;

  if (configured) {
    const normalized = String(configured).replace(/^https?:\/\//, "").replace(/\/$/, "");
    return `https://${normalized}`;
  }

  const forwardedProto = req.headers["x-forwarded-proto"] || "https";
  const forwardedHost = req.headers["x-forwarded-host"] || req.headers.host;
  return `${forwardedProto}://${forwardedHost}`;
};

const getProductsApiUrl = () =>
  env.PRODUCTS_API_URL || env.VITE_PRODUCTS_API_URL || "";

const buildProductPath = (product) => {
  const casPart =
    typeof product.casNo === "string" &&
    /\d{2,7}-\d{2}-\d/.test(product.casNo)
      ? product.casNo
      : "";
  const slug = slugify(product.slug || `${product.title || ""} ${casPart}`);
  return `/product/${product.id}/${slug}`;
};

const normalizeProduct = (product, index) => ({
  id: product.id ?? index + 1,
  title: String(product.title || "").trim(),
  slug: String(product.slug || "").trim(),
  timestamp: String(product.timestamp || "").trim(),
});

export default async function handler(req, res) {
  const siteOrigin = getSiteOrigin(req);
  const categoryPaths = [
    "/products/perfumery-ingredients",
    "/products/pheromone-intermediates",
    "/products/specialty-chemical-intermediates",
    "/products/cro-services",
  ];

  const urls = [
    { loc: `${siteOrigin}/`, priority: "1.0" },
    { loc: `${siteOrigin}/about`, priority: "0.8" },
    { loc: `${siteOrigin}/products`, priority: "0.9" },
    { loc: `${siteOrigin}/contact`, priority: "0.8" },
    ...categoryPaths.map((path) => ({ loc: `${siteOrigin}${path}`, priority: "0.8" })),
  ];

  try {
    const productsApiUrl = getProductsApiUrl();

    if (productsApiUrl) {
      const response = await fetch(productsApiUrl);
      if (response.ok) {
        const products = await response.json();

        if (Array.isArray(products)) {
          products
            .map(normalizeProduct)
            .filter((product) => product.title)
            .forEach((product) => {
              urls.push({
                loc: `${siteOrigin}${buildProductPath(product)}`,
                lastmod: product.timestamp || undefined,
                priority: "0.7",
              });
            });
        }
      }
    }
  } catch (error) {
    console.error("Sitemap generation failed:", error);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (item) => `  <url>
    <loc>${escapeXml(item.loc)}</loc>
    ${item.lastmod ? `<lastmod>${escapeXml(item.lastmod)}</lastmod>` : ""}
    <priority>${item.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate=3600");
  res.status(200).send(xml);
}
