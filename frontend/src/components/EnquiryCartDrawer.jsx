import React from "react";
import { Link } from "react-router-dom";
import { useEnquiryCart } from "../context/EnquiryCartContext.jsx";
import { formatCasNumber } from "../utils/productFormatting.js";
import MaterialIcon from "./MaterialIcon.jsx";

const EnquiryCartDrawer = () => {
  const { items, isOpen, itemCount, removeItem, clearItems, closeCart } = useEnquiryCart();

  return (
    <>
      <div
        className={`fixed inset-0 z-[85] bg-base-content/35 backdrop-blur-sm transition ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeCart}
      />

      <aside
        className={`fixed right-0 top-0 z-[90] flex h-full w-full max-w-md flex-col border-l border-base-200 bg-base-100 shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="border-b border-base-200 bg-base-200/45 p-6">
          <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary/75">
              Enquiry Cart
            </p>
            <h2 className="mt-2 text-2xl font-bold">Selected products</h2>
            <p className="mt-2 text-sm text-base-content/70">
              Add multiple molecules, then submit one combined quote request.
            </p>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="btn btn-ghost btn-circle"
            aria-label="Close enquiry cart"
          >
            <MaterialIcon name="close" className="text-xl" />
          </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length ? (
            <div className="space-y-4">
              {items.map((item) => (
                <article
                  key={item.id}
                  className="rounded-2xl border border-base-200 bg-base-100 p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="mt-2 text-sm text-base-content/70">
                        {item.category || "Uncategorized"}
                      </p>
                      <p className="mt-1 text-sm font-mono text-base-content/65">
                        CAS: {formatCasNumber(item.casNo)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="rounded-full border border-base-300 px-3 py-1.5 text-xs font-semibold text-base-content transition hover:border-primary/40 hover:text-primary"
                    >
                      Remove
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-base-300 bg-base-200/45 p-8 text-center">
              <p className="text-lg font-semibold">No products selected yet.</p>
              <p className="mt-2 text-sm text-base-content/70">
                Add products from the catalogue or product detail page to build one enquiry.
              </p>
            </div>
          )}
        </div>

        <div className="border-t border-base-200 p-6">
          <div className="mb-4 flex items-center justify-between text-sm text-base-content/70">
            <span>Total selected</span>
            <span className="font-semibold text-base-content">{itemCount} products</span>
          </div>

          <div className="flex flex-col gap-3">
            <Link
              to="/contact"
              onClick={closeCart}
              className={`btn btn-primary ${items.length ? "" : "btn-disabled"}`}
            >
              Continue to enquiry form
            </Link>
            <button
              type="button"
              onClick={clearItems}
              className="btn btn-outline border-base-300 text-base-content"
              disabled={!items.length}
            >
              Clear selected products
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default EnquiryCartDrawer;
