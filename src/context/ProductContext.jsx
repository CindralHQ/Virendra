import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const ProductContext = createContext(null);
const PRODUCT_CACHE_KEY = "products";

// -----------------------------
// FIXED API BASE RESOLVER
// -----------------------------
const resolveApiBase = () => {
  // 1. Use Vercel / .env variable if provided
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL.replace(/\/$/, "");
  }

  // 2. Local development environment
  if (typeof window !== "undefined") {
    const { hostname } = window.location;

    const isLocalhost =
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname === "::1";

    if (isLocalhost) {
      return "http://localhost:3000";
    }
  }

  // 3. Default fallback (never used in production)
  return "http://localhost:3000";
};

const API_BASE_URL = resolveApiBase();

// -----------------------------
// CACHE FUNCTIONS
// -----------------------------
const readCachedProducts = () => {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(PRODUCT_CACHE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.warn("Failed to read product cache", err);
    return [];
  }
};

// -----------------------------
// PROVIDER
// -----------------------------
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(readCachedProducts);
  const [status, setStatus] = useState(() =>
    products.length ? "success" : "idle"
  );
  const [error, setError] = useState(null);
  const bootstrapped = useRef(false);

  const fetchProducts = useCallback(async (hasExistingData = false) => {
    setStatus(hasExistingData ? "refreshing" : "loading");
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/products`);

      if (!response.ok) {
        throw new Error("Unable to load the latest product catalogue.");
      }

      const data = await response.json();
      setProducts(data);

      if (typeof window !== "undefined") {
        window.localStorage.setItem(PRODUCT_CACHE_KEY, JSON.stringify(data));
      }

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
    fetchProducts(products.length > 0);
  }, [fetchProducts, products.length]);

  const value = useMemo(
    () => ({
      products,
      isLoading: status === "loading",
      isRefreshing: status === "refreshing",
      error,
      reload: () => fetchProducts(products.length > 0),
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
export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used inside ProductProvider");
  }
  return context;
};
