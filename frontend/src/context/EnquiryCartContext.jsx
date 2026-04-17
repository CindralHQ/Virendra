import { createContext, useContext, useEffect, useMemo, useState } from "react";

const EnquiryCartContext = createContext(null);
const ENQUIRY_CART_STORAGE_KEY = "enquiry-cart";

const readStoredCart = () => {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(ENQUIRY_CART_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn("Failed to read enquiry cart", error);
    return [];
  }
};

const toCartItem = (product) => ({
  id: product.id,
  title: product.title || "Untitled product",
  casNo: product.casNo || "",
  category: product.category || "",
});

export const EnquiryCartProvider = ({ children }) => {
  const [items, setItems] = useState(readStoredCart);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(ENQUIRY_CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo(
    () => ({
      items,
      isOpen,
      itemCount: items.length,
      addItem: (product) => {
        const nextItem = toCartItem(product);
        setItems((prev) =>
          prev.some((item) => String(item.id) === String(nextItem.id))
            ? prev
            : [...prev, nextItem]
        );
      },
      removeItem: (id) => {
        setItems((prev) => prev.filter((item) => String(item.id) !== String(id)));
      },
      clearItems: () => setItems([]),
      hasItem: (id) => items.some((item) => String(item.id) === String(id)),
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
    }),
    [isOpen, items]
  );

  return (
    <EnquiryCartContext.Provider value={value}>
      {children}
    </EnquiryCartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useEnquiryCart = () => {
  const context = useContext(EnquiryCartContext);
  if (!context) {
    throw new Error("useEnquiryCart must be used inside EnquiryCartProvider");
  }
  return context;
};
