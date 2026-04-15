import React, { useMemo } from "react";
import ProductCatalogue from "../components/Product/ProductCatalogue/ProductCatalogue.jsx";
import useProducts from "../hooks/useProducts.js";
import Seo from "../components/Seo.jsx";
import {
  buildBreadcrumbSchema,
  buildItemListSchema,
  getProductPath,
} from "../utils/seo.js";

const Products = () => {
  const { products, isLoading } = useProducts();

  const stats = useMemo(() => {
    const total = products.length;
    const formatValue = (value) =>
      !total && isLoading ? "…" : String(value);

    return [
      { label: "Molecules", value: formatValue(total) },
      { label: "Industries served", value: "04+" },
      { label: "Avg. delivery time", value: "30-60 days" },
    ];
  }, [products, isLoading]);

  return (
    <div className="space-y-12 pb-16 bg-base-100 text-base-content">
      <Seo
        title="Product Catalogue for Aroma Chemicals, Pheromone Intermediates and Specialty Molecules"
        description="Browse Virendra Research Chem LLP's product catalogue of aroma chemicals, pheromone intermediates, and specialty chemical molecules manufactured in Navi Mumbai, Maharashtra."
        canonicalPath="/products"
        keywords={[
          "chemical product catalogue India",
          "aroma chemicals catalogue",
          "pheromone intermediates supplier",
          "specialty chemical intermediates Navi Mumbai",
          "Virendra Research Chem products",
        ]}
        jsonLd={[
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Products", path: "/products" },
          ]),
          buildItemListSchema(products.slice(0, 30), getProductPath),
        ]}
      />
      <section className="bg-base-200">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <p className="uppercase tracking-[0.4em] text-md text-primary/70 font-semibold">
            product library
          </p>
          <h1 className="text-3xl md:text-3xl font-extrabold mt-4">
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
