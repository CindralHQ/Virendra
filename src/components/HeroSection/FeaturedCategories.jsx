import React from "react";
import MaterialIcon from "../MaterialIcon.jsx";
import { Link } from "react-router-dom";
import featuredCategories from "../../data/featuredCategories.js";

const FeaturedCategories = () => {
  return (
    <section className="w-full bg-base-100 py-20">
      <div className="max-w-6xl mx-auto px-6 space-y-16">
        <div className="text-center space-y-4">
          <p className="uppercase tracking-[0.4em] text-xs font-bold text-primary">
            Key Products & Services
          </p>
          <h2 className="text-4xl font-extrabold text-base-content tracking-tight">
            Excellence in Chemistry
          </h2>
          <p className="text-base-content/70 max-w-2xl mx-auto text-lg">
            From specialized aroma molecules to advanced contract research, we
            deliver precision and quality across industries.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {featuredCategories.map((item) => (
            <article
              key={item.title}
              className="group flex h-full flex-col rounded-3xl border border-base-200/50 bg-base-100 p-8 shadow-sm hover:shadow-2xl hover:border-primary/20 hover:-translate-y-2 transition-all duration-300 ease-out"
            >
              <div
                className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${item.gradient} text-white font-bold flex items-center justify-center text-lg shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                <MaterialIcon name={item.icon} className="text-3xl" />
              </div>

              <h3 className="mt-6 text-xl font-bold text-base-content group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="mt-3 text-sm text-base-content/70 leading-relaxed min-h-[80px]">
                {item.description}
              </p>

              <div className="mt-4 pt-4 border-t border-base-200">
                <ul className="space-y-3 text-sm text-base-content/80">
                  {item.points.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <span className="mt-0.5 h-5 w-5 rounded-full bg-base-200 text-primary flex items-center justify-center text-[10px] font-bold shrink-0">
                        <MaterialIcon name="check" className="text-sm" />
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                to={`/products/${item.slug}`}
                className="mt-auto pt-5 text-sm font-semibold text-primary hover:text-primary-focus"
              >
                Learn More →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
