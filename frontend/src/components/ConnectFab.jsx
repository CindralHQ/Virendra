import React from "react";
import siteConfig from "../config/siteConfig.js";
import MaterialIcon from "./MaterialIcon.jsx";
import { useEnquiryCart } from "../context/EnquiryCartContext.jsx";

const ConnectFab = () => {
  const { itemCount, openCart } = useEnquiryCart();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <div className="dropdown dropdown-top dropdown-end">
        <label
          tabIndex={0}
          className="btn btn-primary btn-circle btn-lg shadow-2xl p-5"
          aria-label="Open contact options"
        >
          <MaterialIcon name="support_agent" className="text-2xl" />
        </label>
        <ul
          tabIndex={0}
          className="menu dropdown-content bg-base-100 rounded-2xl z-[1] w-64 p-4 border border-base-200 shadow-xl space-y-2"
        >
          <li>
            <a
              href={`tel:${siteConfig.contact.phoneHref}`}
              className="flex items-center gap-3"
            >
              <MaterialIcon name="call" className="text-lg" />
              Phone Call
            </a>
          </li>
          <li>
            <a
              href={`mailto:${siteConfig.contact.salesEmail}`}
              className="flex items-center gap-3"
            >
              <MaterialIcon name="mail" className="text-lg" />
              Mail
            </a>
          </li>
          <li>
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/[^\d]/g, "")}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3"
            >
              <MaterialIcon name="chat" className="text-lg" />
              WhatsApp
            </a>
          </li>
        </ul>
      </div>

      <button
        type="button"
        onClick={openCart}
        className="inline-flex items-center gap-2 rounded-full border border-base-300 bg-base-100 px-5 py-3 text-sm font-semibold text-base-content shadow-xl transition hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
      >
        <MaterialIcon name="inventory_2" className="text-lg leading-none" />
        <span>Enquiry cart</span>
        <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-primary px-2 text-xs font-bold leading-none text-primary-content">
          {itemCount}
        </span>
      </button>
    </div>
  );
};

export default ConnectFab;
