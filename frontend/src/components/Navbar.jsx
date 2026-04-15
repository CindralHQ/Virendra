import React, { useMemo, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import siteConfig from "../config/siteConfig.js";
import MaterialIcon from "./MaterialIcon.jsx";
import useProducts from "../hooks/useProducts.js";
import demoProducts from "../data/demoProducts.js";
import featuredCategories from "../data/featuredCategories.js";
import { getProductPath } from "../utils/seo.js";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Products", to: "/products" },
  { label: "Contact", to: "/contact" },
];

const navLinkClasses =
  "rounded-lg px-4 py-2 text-sm font-medium text-base-content/80 transition hover:bg-primary/10 hover:text-primary aria-[current=page]:bg-primary/15 aria-[current=page]:text-primary";

const Navbar = () => {
  const navigate = useNavigate();
  const { products } = useProducts();
  const [query, setQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const searchSource = useMemo(
    () => (products.length ? products : demoProducts),
    [products]
  );

  const suggestions = useMemo(() => {
    const term = query.trim().toLowerCase();

    if (!term) {
      return searchSource.slice(0, 6);
    }

    return searchSource
      .filter(
        (product) =>
          product.title?.toLowerCase().includes(term) ||
          product.casNo?.toLowerCase().includes(term) ||
          product.category?.toLowerCase().includes(term)
      )
      .slice(0, 6);
  }, [query, searchSource]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      navigate("/products");
      return;
    }

    const nextParams = new URLSearchParams();
    nextParams.set("search", trimmedQuery);

    const exactMatch = searchSource.find(
      (product) =>
        product.title?.toLowerCase() === trimmedQuery.toLowerCase() ||
        product.casNo?.toLowerCase() === trimmedQuery.toLowerCase()
    );

    if (exactMatch) {
      navigate(getProductPath(exactMatch));
      setIsSearchOpen(false);
      setQuery("");
      return;
    }

    navigate(`/products?${nextParams.toString()}`);
    setIsSearchOpen(false);
  };

  const handleProductSelect = (product) => {
    navigate(getProductPath(product));
    setIsSearchOpen(false);
    setQuery("");
  };

  const handleCategorySelect = (slug) => {
    navigate(`/products/${slug}`);
    setIsSearchOpen(false);
    setQuery("");
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-base-200 bg-base-100/95 backdrop-blur">
        <div className="navbar max-w-6xl mx-auto px-4">
        <div className="navbar-start w-full lg:w-auto lg:mr-auto">
          <div className="dropdown">
            <label
              tabIndex={0}
              className="btn btn-ghost lg:hidden"
              aria-label="Open navigation menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow bg-base-100 rounded-box w-60 gap-1 [--menu-active-bg:color-mix(in_oklab,var(--color-primary)_16%,transparent)] [--menu-active-fg:var(--color-primary)]"
            >
              {navLinks.map((item) => (
                <li key={item.to}>
                  <NavLink to={item.to} className={`${navLinkClasses} capitalize`}>
                    {item.label}
                  </NavLink>
                </li>
              ))}
              <li className="mt-3">
                <SearchTrigger
                  className="w-full justify-start"
                  onClick={() => setIsSearchOpen(true)}
                />
              </li>
            </ul>
          </div>
          <Link
            to="/"
            className="flex flex-1 items-center justify-center gap-3 text-center font-bold text-xl lg:flex-none lg:justify-start lg:text-left"
          >
            <img
            src="/TextualLogo.png"
            alt={`${siteConfig.company.name} textual logo`}
            className="h-20 w-auto object-contain"
          />
            {/* <div className="h-25 w-25 shrink-0">
              <img
                src="/Logo.png"
                alt={`${siteConfig.company.name} logo`}
                className="h-full w-full object-contain"
              />
            </div>
            <span className="flex flex-col leading-tight">
              <span>{siteConfig.company.name}</span>
              <span className="text-sm text-base-content/70 font-medium">
                {siteConfig.company.tagline}
              </span>
            </span> */}
          </Link>
        </div>

        <div className="navbar-end hidden lg:flex">
          <div className="flex items-center gap-4">
            <ul className="menu menu-horizontal gap-2 font-medium [--menu-active-bg:color-mix(in_oklab,var(--color-primary)_16%,transparent)] [--menu-active-fg:var(--color-primary)]">
              {navLinks.map((item) => (
                <li key={item.to}>
                  <NavLink to={item.to} className={navLinkClasses}>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <SearchTrigger onClick={() => setIsSearchOpen(true)} />
          </div>
        </div>
        </div>
      </header>

      <SearchModal
        isOpen={isSearchOpen}
        query={query}
        setQuery={setQuery}
        suggestions={suggestions}
        onClose={() => setIsSearchOpen(false)}
        onSubmit={handleSearchSubmit}
        onProductSelect={handleProductSelect}
        onCategorySelect={handleCategorySelect}
      />
    </>
  );
};

const SearchTrigger = ({ onClick, className = "" }) => (
  <button
    type="button"
    onClick={onClick}
    className={`btn border border-primary bg-primary text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:bg-primary/90 hover:text-white hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${className}`}
  >
    <MaterialIcon name="search" className="text-lg" />
    Search
  </button>
);

const SearchModal = ({
  isOpen,
  query,
  setQuery,
  suggestions,
  onClose,
  onSubmit,
  onProductSelect,
  onCategorySelect,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[80] overflow-y-auto bg-base-content/35 px-3 py-4 backdrop-blur-sm sm:px-4 sm:py-10"
      onClick={onClose}
    >
      <div className="flex min-h-full items-start justify-center">
        <div
          className="w-full max-w-3xl rounded-3xl border border-base-200 bg-white p-4 shadow-2xl sm:p-6"
          onClick={(event) => event.stopPropagation()}
        >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-primary/70 font-semibold">
              Search products
            </p>
            <h2 className="mt-2 text-xl font-bold text-base-content sm:text-2xl">
              Find molecules and categories
            </h2>
          </div>
          <button type="button" onClick={onClose} className="btn btn-ghost btn-circle">
            <MaterialIcon name="close" className="text-xl" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="mt-6 relative">
          <label className="sr-only" htmlFor="navbar-search-modal-input">
            Search products
          </label>
          <MaterialIcon
            name="search"
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-base-content/55"
          />
          <input
            id="navbar-search-modal-input"
            type="search"
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by molecule, CAS, or category"
            className="input input-bordered h-14 w-full rounded-2xl border-base-200 bg-white pl-12 pr-4 text-base text-base-content placeholder:text-base-content/55 sm:pr-28"
          />
          <button
            type="submit"
            className="btn btn-primary mt-3 w-full sm:absolute sm:right-2 sm:top-1/2 sm:mt-0 sm:w-auto sm:-translate-y-1/2"
          >
            Search
          </button>
        </form>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-base-content/60">
                Suggestions
              </h3>
              {query.trim() ? (
                <button
                  type="button"
                  className="text-sm font-medium text-primary"
                  onClick={(event) => {
                    onSubmit(event);
                  }}
                >
                  View all results
                </button>
              ) : null}
            </div>
            <div className="mt-4 space-y-3">
              {suggestions.length ? (
                suggestions.map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => onProductSelect(product)}
                    className="flex w-full flex-col gap-3 rounded-2xl border border-base-200 bg-white px-4 py-4 text-left transition hover:border-primary/40 hover:bg-base-200 sm:flex-row sm:items-start sm:justify-between"
                  >
                    <div>
                      <p className="font-semibold text-base-content">{product.title}</p>
                      <p className="mt-1 text-sm text-base-content/60">
                        CAS: {product.casNo || "Not available"}
                      </p>
                    </div>
                    <span className="rounded-full bg-base-200 px-3 py-1 text-xs font-semibold text-base-content/70">
                      {product.category || "Product"}
                    </span>
                  </button>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-base-300 px-4 py-8 text-center text-sm text-base-content/60">
                  No matching products found.
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-base-content/60">
              Categories
            </h3>
            <div className="mt-4 flex flex-wrap gap-3">
              {featuredCategories.map((category) => (
                <button
                  key={category.slug}
                  type="button"
                  onClick={() => onCategorySelect(category.slug)}
                  className="rounded-full border border-base-200 bg-white px-4 py-2 text-sm font-semibold text-base-content/80 transition hover:border-primary/40 hover:text-primary"
                >
                  {category.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Navbar;
