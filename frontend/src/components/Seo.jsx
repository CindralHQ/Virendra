import { useEffect } from "react";
import siteConfig from "../config/siteConfig.js";
import { buildPageTitle, toAbsoluteUrl } from "../utils/seo.js";

const upsertMeta = (selector, attributes, content) => {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement("meta");
    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
};

const upsertLink = (selector, attributes) => {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement("link");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
};

const Seo = ({
  title,
  description = siteConfig.seo.defaultDescription,
  keywords = siteConfig.seo.defaultKeywords,
  canonicalPath = "/",
  image = "/Logo.png",
  type = "website",
  robots = "index, follow",
  jsonLd,
}) => {
  useEffect(() => {
    if (typeof document === "undefined") return undefined;

    const resolvedTitle = title?.includes(siteConfig.company.name)
      ? title
      : buildPageTitle(title);
    const canonicalUrl = toAbsoluteUrl(canonicalPath);
    const imageUrl = image.startsWith("http") ? image : toAbsoluteUrl(image);
    const keywordContent = Array.isArray(keywords)
      ? keywords.join(", ")
      : String(keywords || "");

    document.title = resolvedTitle;

    upsertMeta('meta[name="description"]', { name: "description" }, description);
    upsertMeta('meta[name="keywords"]', { name: "keywords" }, keywordContent);
    upsertMeta('meta[name="robots"]', { name: "robots" }, robots);
    upsertMeta('meta[name="theme-color"]', { name: "theme-color" }, "#1a9b84");
    upsertMeta('meta[property="og:title"]', { property: "og:title" }, resolvedTitle);
    upsertMeta(
      'meta[property="og:description"]',
      { property: "og:description" },
      description
    );
    upsertMeta('meta[property="og:type"]', { property: "og:type" }, type);
    upsertMeta('meta[property="og:url"]', { property: "og:url" }, canonicalUrl);
    upsertMeta(
      'meta[property="og:site_name"]',
      { property: "og:site_name" },
      siteConfig.company.name
    );
    upsertMeta('meta[property="og:image"]', { property: "og:image" }, imageUrl);
    upsertMeta(
      'meta[property="og:image:alt"]',
      { property: "og:image:alt" },
      `${siteConfig.company.name} logo`
    );
    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card" }, "summary_large_image");
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title" }, resolvedTitle);
    upsertMeta(
      'meta[name="twitter:description"]',
      { name: "twitter:description" },
      description
    );
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image" }, imageUrl);

    upsertLink('link[rel="canonical"]', {
      rel: "canonical",
      href: canonicalUrl,
    });

    const existingScripts = document.head.querySelectorAll('script[data-seo-jsonld="true"]');
    existingScripts.forEach((script) => script.remove());

    if (jsonLd) {
      const payload = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      payload.forEach((entry) => {
        if (!entry) return;
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.dataset.seoJsonld = "true";
        script.text = JSON.stringify(entry);
        document.head.appendChild(script);
      });
    }

    return () => {
      const activeScripts = document.head.querySelectorAll('script[data-seo-jsonld="true"]');
      activeScripts.forEach((script) => script.remove());
    };
  }, [canonicalPath, description, image, jsonLd, keywords, robots, title, type]);

  return null;
};

export default Seo;
