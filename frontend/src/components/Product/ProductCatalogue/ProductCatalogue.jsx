import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import MaterialIcon from "../../MaterialIcon.jsx";
import featuredCategories from "../../../data/featuredCategories.js";
import demoProducts from "../../../data/demoProducts.js";
import ProductCard from "./ProductCard.jsx";
import useProducts from "../../../hooks/useProducts.js";

const ProductCatalogue = () => {
  const { products, isLoading, isRefreshing, error, reload } = useProducts();
  const [query, setQuery] = useState("");

  const filteredProducts = useMemo(() => {
    const sourceProducts = products.length ? products : demoProducts;
    if (!query.trim()) return sourceProducts;
    const term = query.toLowerCase();

    return sourceProducts.filter(
      (product) =>
        product.title?.toLowerCase().includes(term) ||
        product.casNo?.toLowerCase().includes(term) ||
        product.category?.toLowerCase().includes(term)
    );
  }, [products, query]);

  return (
    <section className="px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="uppercase tracking-[0.35em] text-xs text-primary/70 font-semibold">
              catalogue
            </p>
            <h2 className="text-4xl font-bold text-base-content">
              Product catalogue
            </h2>
            <p className="mt-2 text-base-content/70">
              Search by molecule, CAS number or category.{" "}
              {isRefreshing && (
                <span className="ml-2 inline-flex items-center text-xs text-primary">
                  Updating listings...
                </span>
              )}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <label className="relative w-full sm:w-80">
              <span className="sr-only">Search products</span>
              <MaterialIcon
                name="search"
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-base-content/60"
              />
              <input
                className="input input-bordered w-full border-base-200 bg-base-100 pl-10 pr-10 text-base-content placeholder:text-base-content/60"
                placeholder="Search by molecule, CAS, or category"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="btn btn-ghost btn-xs absolute right-3 top-1/2 -translate-y-1/2"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </label>
            <button
              className="btn btn-outline border-base-300 text-base-content"
              onClick={() => reload()}
            >
              Refresh
            </button>
          </div>
        </header>

        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs uppercase tracking-[0.35em] text-base-content/50">
            Browse categories
          </span>
          <div className="flex flex-wrap gap-2">
            {featuredCategories.map((category) => (
              <Link
                key={category.slug}
                to={`/products/${category.slug}`}
                className="rounded-full border border-base-200 bg-base-100 px-4 py-2 text-xs font-semibold text-base-content/80 transition hover:border-primary/40 hover:text-primary"
              >
                {category.title}
              </Link>
            ))}
          </div>
        </div>

        {error && (
          <div className="alert alert-error bg-error/10 border-error/40 text-error-content">
            <div>
              <h3 className="font-semibold">Couldn&apos;t load products</h3>
              <p className="text-sm text-base-content/70">{error}</p>
            </div>
            <button className="btn btn-sm ml-auto" onClick={() => reload()}>
              Try again
            </button>
          </div>
        )}

        {isLoading && !products.length ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-80 rounded-3xl border border-base-200 bg-base-200 animate-pulse"
              />
            ))}
          </div>
        ) : filteredProducts.length ? (
          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-base-300 bg-base-200 p-12 text-center text-base-content/70">
            <p className="text-lg font-semibold text-base-content">
              No matches for "{query.trim()}".
            </p>
            <p className="mt-2 text-sm">
              Try searching for the molecule name, CAS number or explore the
              entire list again.
            </p>
            <button
              className="btn btn-sm mt-4"
              onClick={() => setQuery("")}
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductCatalogue;
