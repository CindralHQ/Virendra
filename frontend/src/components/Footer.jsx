import React from "react";
import { Link } from "react-router-dom";
import siteConfig from "../config/siteConfig.js";

const Footer = () => {
  return (
    <footer className="bg-base-200 border-t border-base-300 text-base-content">
      <div className="max-w-6xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-3">
        <div className="space-y-3">
          <img
            src="/TextualLogo.png"
            alt={`${siteConfig.company.name} textual logo`}
            className="h-16 w-auto object-contain"
          />
          <p className="text-sm text-base-content/60">
            High-purity aroma chemicals, pheromone intermediates, and specialty
            molecules engineered for reliable scale.
          </p>
        </div>

        <div>
          <p className="font-semibold uppercase tracking-[0.3em] text-xs text-primary/80">
            Navigate
          </p>
          <ul className="mt-3 space-y-2 text-sm text-base-content/70">
            {/* <li>
              <Link to="/brand-guidelines">Brand Guidelines</Link>
            </li> */}
            <li>
              <Link to="/products">Product library</Link>
            </li>
            <li>
              <Link to="/about">About {siteConfig.company.name}</Link>
            </li>
            <li>
              <Link to="/blogs">Blogs</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-semibold uppercase tracking-[0.3em] text-xs text-primary/80">
            Contact
          </p>
          <ul className="mt-3 space-y-2 text-sm text-base-content/70">
            <li>
              <a href={`mailto:${siteConfig.contact.email}`}>
                {siteConfig.contact.email}
              </a>
            </li>
            <li>
              <a href={`tel:${siteConfig.contact.phoneHref}`}>
                {siteConfig.contact.phone}
              </a>
            </li>
            <li><b>Office Address:</b><br/>{siteConfig.contact.office_address}</li>
            <li><b>Unit Address:</b><br/>{siteConfig.contact.address}</li>
          </ul>
        </div>

      </div>
      <div className="border-t border-base-300">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-base-content/60">
          <p className="font-medium">© 2026 Virendra. All rights reserved.</p>
          <p>
            Website Developed by{" "}
            <a
              href="https://cindral.org"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-primary hover:text-primary-focus"
            >
              Cindral
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
