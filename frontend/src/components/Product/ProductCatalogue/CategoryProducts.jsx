import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductCard from "./ProductCard.jsx";
import useProducts from "../../../hooks/useProducts.js";
import featuredCategories from "../../../data/featuredCategories.js";
import MaterialIcon from "../../MaterialIcon.jsx";
import demoProducts from "../../../data/demoProducts.js";

const CategoryProducts = () => {
  const { category } = useParams();
  const { products, isLoading, error } = useProducts();
  const [query, setQuery] = useState("");

  const categoryData = featuredCategories.find((item) => item.slug === category);
  const normalizedCategory = categoryData
    ? categoryData.title.toLowerCase()
    : category
      ? category.replace(/-/g, " ").toLowerCase()
      : null;

  const filteredProducts = useMemo(() => {
    const sourceProducts = products.length ? products : demoProducts;

    let list = [...sourceProducts];

    // Filter by category from URL
    if (normalizedCategory) {
      list = list.filter(
        (p) =>
          p.category?.toLowerCase().replace(/[^a-z0-9]+/g, " ") ===
          normalizedCategory
      );
    }

    // Search filter
    if (query.trim()) {
      const term = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(term) ||
          p.casNo.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term)
      );
    }

    return list;
  }, [products, query, normalizedCategory]);

  if (isLoading) return <p className="text-center py-10">Loading...</p>;

  return (
    <section className="py-16 bg-base-200 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 space-y-10">
        {categoryData ? (
          <div className="rounded-3xl border border-base-200 bg-base-100 p-8 md:p-10 shadow-lg">
            <p className="text-xs uppercase tracking-[0.35em] text-primary/70 font-semibold">
              Featured category
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <div
                className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${categoryData.gradient} text-white font-bold flex items-center justify-center text-lg shadow-lg`}
              >
                <MaterialIcon name={categoryData.icon} className="text-2xl" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">
                {categoryData.title}
              </h2>
            </div>
            <p className="mt-4 text-lg text-base-content/70 max-w-3xl">
              {categoryData.overview}
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 text-sm text-base-content/70">
              {categoryData.points.map((point) => (
                <li key={point} className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary"></span>
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <label className="relative block w-full max-w-md">
                <span className="sr-only">Search products</span>
                <input
                  type="text"
                  placeholder="Search products..."
                  className="input input-bordered w-full bg-base-100"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </label>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/products" className="btn btn-primary">
                Explore all products
              </Link>
              <Link to="/contact" className="btn btn-outline border-base-300 text-base-content">
                Talk to a chemist
              </Link>
            </div>
          </div>
        ) : normalizedCategory ? (
          <h2 className="text-3xl font-bold capitalize">{normalizedCategory}</h2>
        ) : null}

        {error && (
          <div className="rounded-2xl border border-base-200 bg-base-100 p-4 text-sm text-base-content/70">
            We couldn&apos;t load the latest products right now. Showing what we have
            available.
          </div>
        )}

        {!categoryData && (
          <div className="flex flex-wrap items-center gap-4">
            <input
              type="text"
              placeholder="Search products..."
              className="input input-bordered w-full max-w-md bg-base-100"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="col-span-full text-center text-base-content/60">
              No products found.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default CategoryProducts;
