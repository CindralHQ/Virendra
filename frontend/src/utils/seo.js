import siteConfig from "../config/siteConfig.js";
import { formatCasNumber } from "./productFormatting.js";

const FALLBACK_SITE_ORIGIN = "https://virendra.net";

const BASE_KEYWORDS = [
  siteConfig.company.name,
  "Virendra",
  "Virendra Enterprises",
  "Virendra Research Chem",
  "Virendra Research Chem LLP",
  "chemical manufacturer Navi Mumbai",
  "chemical manufacturer Mumbai",
  "chemical manufacturer Maharashtra",
  "specialty chemical manufacturer India",
  "aroma chemicals manufacturer",
  "pheromone intermediates manufacturer",
  "specialty chemical intermediates",
  "chemical synthesis company India",
  "custom synthesis Navi Mumbai",
];

export const slugify = (value) =>
  String(value || "")
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const splitKeywords = (value) =>
  String(value || "")
    .split(/[|,;]+/)
    .map((item) => item.trim())
    .filter(Boolean);

export const uniqueKeywords = (items) => [...new Set(items.filter(Boolean))];

export const truncateText = (value, limit = 160) => {
  const source = String(value || "").trim().replace(/\s+/g, " ");
  if (!source || source.length <= limit) return source;

  const sliced = source.slice(0, limit + 1);
  const boundary = sliced.lastIndexOf(" ");
  return `${sliced.slice(0, boundary > 80 ? boundary : limit).trim()}...`;
};

export const getSiteOrigin = () => {
  const configuredOrigin =
    (typeof import.meta !== "undefined" && import.meta.env?.VITE_SITE_URL) ||
    siteConfig.website?.url;

  if (configuredOrigin) {
    return String(configuredOrigin).replace(/\/$/, "");
  }

  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin.replace(/\/$/, "");
  }

  return FALLBACK_SITE_ORIGIN;
};

export const toAbsoluteUrl = (path = "/") => {
  const normalizedPath = String(path || "/").startsWith("/")
    ? String(path || "/")
    : `/${String(path || "")}`;

  return new URL(normalizedPath, `${getSiteOrigin()}/`).toString();
};

export const getCategoryPath = (slug) => `/products/${slug}`;

export const getProductSlug = (product) => {
  if (product?.slug) return product.slug;
  const casPart = formatCasNumber(product?.casNo);
  return slugify(
    [product?.title, casPart !== "N/A" ? casPart : ""].filter(Boolean).join(" ")
  );
};

export const getProductPath = (product) =>
  `/product/${product?.id}/${getProductSlug(product)}`;

export const buildPageTitle = (value) =>
  value ? `${value} | ${siteConfig.company.name}` : siteConfig.seo.defaultTitle;

export const buildProductKeywords = (product) => {
  const title = String(product?.title || "").trim();
  const category = String(product?.category || "").trim();
  const casNo = formatCasNumber(product?.casNo);
  const sheetKeywords = splitKeywords(
    product?.keywords || product?.metaKeywords || product?.seoKeywords
  );
  const synonyms = splitKeywords(product?.synonyms);
  const relatedProducts = splitKeywords(product?.relatedProducts);

  return uniqueKeywords([
    ...sheetKeywords,
    ...synonyms,
    ...relatedProducts,
    ...BASE_KEYWORDS,
    title,
    category,
    title && `${title} manufacturer`,
    title && `${title} supplier India`,
    casNo !== "N/A" ? `${title} CAS ${casNo}` : "",
    category && `${category} Navi Mumbai`,
    "chemical manufacturing Navi Mumbai",
    "chemical manufacturing Mumbai",
    "chemical manufacturing Maharashtra",
  ]);
};

export const buildProductTitle = (product) =>
  truncateText(
    product?.metaTitle ||
      [product?.title, product?.category, siteConfig.company.name]
        .filter(Boolean)
        .join(" | "),
    65
  );

export const buildProductDescription = (product) =>
  truncateText(
    product?.metaDescription ||
      product?.seoDescription ||
      [
        product?.title,
        product?.category
          ? `is offered under ${product.category.toLowerCase()} by ${siteConfig.company.name}`
          : `is manufactured by ${siteConfig.company.name}`,
        "based in Navi Mumbai, Maharashtra, India.",
        product?.description,
      ]
        .filter(Boolean)
        .join(" "),
    165
  );

export const buildOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.company.name,
  url: toAbsoluteUrl("/"),
  logo: toAbsoluteUrl("/Logo.png"),
  description: siteConfig.seo.defaultDescription,
  email: siteConfig.contact.email,
  telephone: siteConfig.contact.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.contact.address,
    addressLocality: siteConfig.contact.locality,
    addressRegion: siteConfig.contact.region,
    postalCode: siteConfig.contact.postalCode,
    addressCountry: siteConfig.contact.countryCode,
  },
  areaServed: siteConfig.seo.serviceAreas,
  knowsAbout: [
    "Aroma chemicals",
    "Pheromone intermediates",
    "Specialty chemical intermediates",
    "Custom synthesis",
    "Process scale-up",
  ],
});

export const buildWebsiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.company.name,
  url: toAbsoluteUrl("/"),
  description: siteConfig.seo.defaultDescription,
  potentialAction: {
    "@type": "SearchAction",
    target: `${toAbsoluteUrl("/products")}?search={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
});

export const buildBreadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: toAbsoluteUrl(item.path),
  })),
});

export const buildItemListSchema = (items, itemPathBuilder) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: toAbsoluteUrl(itemPathBuilder(item)),
    name: item.title || item.name,
  })),
});

export const buildProductSchema = (product) => {
  const casNo = formatCasNumber(product?.casNo);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product?.title,
    description: buildProductDescription(product),
    category: product?.category,
    sku: String(product?.id || ""),
    image: [product?.image, product?.bondImage]
      .filter(Boolean)
      .map((asset) =>
        String(asset).startsWith("http") ? asset : toAbsoluteUrl(asset)
      ),
    brand: {
      "@type": "Brand",
      name: siteConfig.company.name,
    },
    manufacturer: {
      "@type": "Organization",
      name: siteConfig.company.name,
      url: toAbsoluteUrl("/"),
    },
    additionalProperty:
      casNo !== "N/A"
        ? [
            {
              "@type": "PropertyValue",
              name: "CAS Number",
              value: casNo,
            },
          ]
        : undefined,
    keywords: buildProductKeywords(product).join(", "),
    url: toAbsoluteUrl(getProductPath(product)),
  };
};
