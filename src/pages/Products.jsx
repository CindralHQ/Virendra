import React from "react";
import ProductCatalogue from "../components/Product/ProductCatalogue/ProductCatalogue.jsx";

const stats = [
  { label: "Molecules", value: "120+" },
  { label: "Industries Served", value: "08" },
  { label: "Avg. Lead Time", value: "10 Days" },
];

const Products = () => {
  return (
    <div className="space-y-12 pb-16 bg-base-100 text-base-content">
      <section className="bg-base-200">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <p className="uppercase tracking-[0.4em] text-xs text-primary/70 font-semibold">
            product library
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold mt-4">
            Aroma chemicals, pheromone intermediates, and specialty molecules
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-base-content/70 leading-relaxed">
            Discover high-purity intermediates for flavour &amp; fragrance houses,
            agro-solution partners, and specialty chemical users—supported by
            scalable manufacturing and compliance-ready documentation.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-base-200 bg-base-100 px-6 py-5 text-center shadow-sm"
              >
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="mt-2 text-sm uppercase tracking-wide text-base-content/60">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProductCatalogue />
    </div>
  );
};

export default Products;
