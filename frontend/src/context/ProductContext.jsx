import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  buildProductDescription,
  buildProductKeywords,
  buildProductTitle,
  getProductSlug,
} from "../utils/seo.js";

const ProductContext = createContext(null);
const PRODUCT_CACHE_KEY = "products";
const PRODUCT_CACHE_TTL = 1000 * 60 * 60; // 1 hour

// -----------------------------
// APPS SCRIPT ENDPOINT
// -----------------------------
const PRODUCTS_API_URL = (import.meta.env.VITE_PRODUCTS_API_URL || "").replace(
  /\/$/,
  ""
);

// -----------------------------
// CACHE FUNCTIONS
// -----------------------------
const readCachedProducts = () => {
  if (typeof window === "undefined") return { data: [], timestamp: 0 };

  try {
    const raw = window.localStorage.getItem(PRODUCT_CACHE_KEY);
    if (!raw) return { data: [], timestamp: 0 };
    const parsed = JSON.parse(raw);

    if (Array.isArray(parsed)) {
      return { data: parsed, timestamp: 0 };
    }

    if (parsed && Array.isArray(parsed.data)) {
      return {
        data: parsed.data,
        timestamp: Number(parsed.timestamp) || 0,
      };
    }

    return { data: [], timestamp: 0 };
  } catch (err) {
    console.warn("Failed to read product cache", err);
    return { data: [], timestamp: 0 };
  }
};

const isCacheFresh = (timestamp) => {
  if (!timestamp) return false;
  return Date.now() - timestamp < PRODUCT_CACHE_TTL;
};

// -----------------------------
// PROVIDER
// -----------------------------
export const ProductProvider = ({ children }) => {
  const cached = readCachedProducts();
  const [products, setProducts] = useState(cached.data);
  const [status, setStatus] = useState(() =>
    products.length ? "success" : "idle"
  );
  const [error, setError] = useState(null);
  const bootstrapped = useRef(false);
  const cacheTimestampRef = useRef(cached.timestamp || 0);

  const fetchProducts = useCallback(
    async (hasExistingData = false, force = false) => {
      if (!force && hasExistingData && isCacheFresh(cacheTimestampRef.current)) {
        setStatus("success");
        return;
      }

    setStatus(hasExistingData ? "refreshing" : "loading");
    setError(null);

    try {
      if (!PRODUCTS_API_URL) {
        throw new Error(
          "Missing VITE_PRODUCTS_API_URL. Add your Apps Script endpoint to .env.local."
        );
      }

      const response = await fetch(PRODUCTS_API_URL);

      if (!response.ok) {
        throw new Error("Unable to load the latest product catalogue.");
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Invalid product data format.");
      }

      const normalizeText = (value) =>
        value === null || value === undefined ? "" : String(value);

      const normalized = data.map((product, index) => ({
        ...product,
        id: product.id ?? index + 1,
        title: normalizeText(product.title),
        casNo: normalizeText(product.casNo),
        description: normalizeText(product.description),
        category: normalizeText(product.category),
        synonyms: normalizeText(product.synonyms),
        relatedProducts: normalizeText(product.relatedProducts),
        tdsLink: normalizeText(product.tdsLink),
        msdsLink: normalizeText(product.msdsLink),
        image: normalizeText(product.image),
        bondImage: normalizeText(product.bondImage),
        timestamp: normalizeText(product.timestamp),
        metaTitle: normalizeText(product.metaTitle || product.meta_title),
        metaDescription: normalizeText(
          product.metaDescription || product.meta_description
        ),
        keywords: normalizeText(product.keywords || product.meta_keywords),
        applications: normalizeText(product.applications),
        slug: normalizeText(product.slug),
      }))
      .map((product) => ({
        ...product,
        slug: getProductSlug(product),
        seoTitle: buildProductTitle(product),
        seoDescription: buildProductDescription(product),
        seoKeywords: buildProductKeywords(product).join(", "),
      }));

      setProducts(normalized);

      if (typeof window !== "undefined") {
        window.localStorage.setItem(
          PRODUCT_CACHE_KEY,
          JSON.stringify({ data: normalized, timestamp: Date.now() })
        );
      }
      cacheTimestampRef.current = Date.now();

      setStatus("success");
    } catch (err) {
      const message =
        err?.message || "Something went wrong while loading products.";
      setError(message);
      setStatus(hasExistingData ? "success" : "error");
    }
  }, []);

  useEffect(() => {
    if (bootstrapped.current) return;
    bootstrapped.current = true;
    const hasExistingData = products.length > 0;
    if (!hasExistingData || !isCacheFresh(cacheTimestampRef.current)) {
      fetchProducts(hasExistingData);
    }
  }, [fetchProducts, products.length]);

  const value = useMemo(
    () => ({
      products,
      isLoading: status === "loading",
      isRefreshing: status === "refreshing",
      error,
      reload: () => fetchProducts(products.length > 0, true),
    }),
    [products, status, error, fetchProducts]
  );

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

// -----------------------------
// HOOK
// -----------------------------
// eslint-disable-next-line react-refresh/only-export-components
export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used inside ProductProvider");
  }
  return context;
};
