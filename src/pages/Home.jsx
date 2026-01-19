import React from "react";
import { Link } from "react-router-dom";
import Hero from "../components/HeroSection/Hero.jsx";
import FeaturedCategories from "../components/HeroSection/FeaturedCategories.jsx";
import ContactUs from "../components/ContactUs.jsx";

const highlights = [
  {
    title: "Regulatory ready",
    body: "Compliance support for REACH, EPA and BIS submissions.",
  },
  {
    title: "Formulation lab",
    body: "Pilot batches and custom blends delivered in under 4 weeks.",
  },
  {
    title: "Transparent data",
    body: "Real-time QC dashboards and document vault for every client.",
  },
];

const partnerTags = [
  "Flavour & fragrance houses",
  "Agro-solution manufacturers",
  "Specialty chemical users",
  "Cosmetic & home care brands",
];

const Home = () => {
  return (
    <div className="space-y-16 pb-16 bg-base-100 text-base-content">
      <Hero />

      <section className="px-6">
        <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-3">
          {highlights.map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-base-200 bg-base-100 p-8 shadow-sm"
            >
              <p className="text-sm uppercase tracking-[0.3em] text-primary/70 font-semibold">
                {item.title}
              </p>
              <p className="mt-3 text-base-content/70">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <FeaturedCategories />

      <section className="px-6">
        <div className="max-w-6xl mx-auto rounded-3xl border border-base-200 bg-gradient-to-r from-base-200 via-base-100 to-base-200 p-10 md:p-16 shadow-lg">
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.4em] text-primary font-semibold">
                virendra enterprises
              </p>
              <h2 className="text-4xl font-bold leading-tight">
                Aroma, pheromone, and specialty intermediates built for scale
              </h2>
              <p className="text-base-content/70 text-lg">
                From green and floral notes to pheromone intermediates and
                specialty molecules, we deliver precision synthesis, consistent
                quality, and reliable scale-up.
              </p>
              <div className="flex flex-wrap gap-2 text-sm font-semibold">
                {partnerTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-base-300 px-4 py-2 text-base-content/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4 max-w-lg">
              <Link to="/products" className="btn btn-primary btn-lg">
                Browse product library
              </Link>
              <Link
                to="/contact"
                className="btn btn-outline btn-lg border-base-300 text-base-content"
              >
                Consult a chemist
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ContactUs />
    </div>
  );
};

export default Home;
