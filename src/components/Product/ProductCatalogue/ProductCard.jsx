import React from "react";
import { Link } from "react-router-dom";
import MaterialIcon from "../../MaterialIcon.jsx";
import { getProductImage } from "../../../utils/productImages.js";

const ProductCard = ({ product }) => {
  const { title, casNo, category, description, image, id } = product;
  const displayImage = image || getProductImage(product);

  return (
    <Link
      to={`/product/${id}`}
      className="group block rounded-3xl border border-base-200 bg-base-100 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <article className="flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <p className="text-[11px] uppercase tracking-[0.35em] text-base-content/60">
            {category || "Uncategorized"}
          </p>
          <span className="rounded-full bg-base-200 px-3 py-1 text-xs font-semibold text-base-content">
            {casNo || "N/A"}
          </span>
        </div>

        <h3 className="mt-4 text-2xl font-semibold text-base-content">
          {title}
        </h3>

        <p className="mt-2 text-sm text-base-content/70 leading-relaxed">
          {description || "Detailed description coming soon."}
        </p>

        {displayImage ? (
          <figure className="mt-6 rounded-2xl bg-base-100 p-4 border border-base-200">
            <img
              src={displayImage}
              alt={title}
              className="h-48 w-full rounded-2xl object-cover"
            />
          </figure>
        ) : (
          <div className="mt-6 h-48 rounded-2xl border border-dashed border-base-300 bg-base-200 flex items-center justify-center text-base-content/50 text-sm">
            Visual coming soon
          </div>
        )}

        <div className="mt-auto pt-6">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
            View specification
            <MaterialIcon
              name="arrow_forward"
              className="text-lg transition-transform group-hover:translate-x-1"
            />
          </span>
        </div>
      </article>
    </Link>
  );
};

export default ProductCard;
