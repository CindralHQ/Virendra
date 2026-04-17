import React from "react";
import { Link } from "react-router-dom";
import Hero from "../components/HeroSection/Hero.jsx";
import FeaturedCategories from "../components/HeroSection/FeaturedCategories.jsx";
import ContactUs from "../components/ContactUs.jsx";
import Seo from "../components/Seo.jsx";
import { blogPosts, getBlogPath } from "../data/blogPosts.js";
import {
  buildOrganizationSchema,
  buildWebsiteSchema,
} from "../utils/seo.js";

const highlights = [
  {
    title: "Quality Compliance Ready",
    body: "Inhouse Quality Compliance Department.",
  },
  {
    title: "R&D lab",
    body: "Pilot batches and custom synthesis delivered in under 4 weeks.",
  },
  {
    title: "Transparent data",
    body: "Real-time QC dashboards and document vault for every client.",
  },
];

const partnerTags = [
  "Flavour & fragrance houses",
  "Agro-solution Integrated Pest Management (IPM) provider",
  "Specialty chemical users",
  "Cosmetic & home care brands",
];

const localSearchAnswers = [
  {
    question: "Where is Virendra Research Chem LLP located?",
    answer:
      "Virendra Research Chem LLP, headquartered in Navi Mumbai, Maharashtra, India, is a globally oriented chemical manufacturer serving clients across India and US, Europe, New Zealand, and other international markets.",
  },
  {
    question: "What products does Virendra Research Chem LLP manufacture?",
    answer:
      "The company manufactures aroma chemicals, pheromone intermediates, specialty chemical intermediates, and supports custom synthesis and process scale-up programs.",
  },
  {
    question: "Does Virendra support custom synthesis and pilot batches?",
    answer:
      "Yes. The team supports custom synthesis, pilot batches, process optimization, and compliance-ready documentation for specialty chemical programs.",
  },
  {
    question: "Which industries does Virendra serve?",
    answer:
      "Virendra supplies fragrance and flavour manufacturers, agro-solution and IPM programs, specialty chemical users, and custom R&D-led manufacturing requirements.",
  },
];

const Home = () => {
  return (
    <div className="space-y-16 pb-16 bg-base-100 text-base-content">
      <Seo
        title="Chemical Manufacturer in Navi Mumbai for Aroma, Pheromone and Specialty Intermediates"
        description="Virendra Research Chem LLP is a chemical manufacturer in Navi Mumbai, Maharashtra offering aroma chemicals, pheromone intermediates, specialty molecules, and custom synthesis support for industrial buyers."
        canonicalPath="/"
        keywords={[
          "Virendra Research Chem LLP",
          "chemical manufacturer Navi Mumbai",
          "chemical manufacturer Mumbai",
          "chemical manufacturer Maharashtra",
          "aroma chemicals manufacturer India",
          "pheromone intermediates manufacturer India",
          "specialty chemical manufacturer Navi Mumbai",
        ]}
        jsonLd={[
          buildOrganizationSchema(),
          buildWebsiteSchema(),
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: localSearchAnswers.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          },
        ]}
      />
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
        <div className="max-w-6xl mx-auto rounded-3xl border border-base-200 bg-base-100 p-8 md:p-10 shadow-sm">
          <div className="space-y-5">
            <p className="text-sm uppercase tracking-[0.35em] text-primary/70 font-semibold">
              Global Manufacturing Support
            </p>
            <h2 className="text-3xl font-bold leading-tight">
              Specialty chemical manufacturing for industrial buyers across markets
            </h2>
            <p className="text-base-content/70 text-lg leading-relaxed">
              Virendra Research Chem LLP manufactures aroma chemicals,
              pheromone intermediates, specialty chemical intermediates, and
              custom synthesis programs for buyers who need reliable quality,
              responsive technical support, and steady scale-up capability. Our
              team supports industrial sourcing, pilot batches, process
              development, and documentation-led supply for regulated and
              performance-focused workflows.
            </p>
            <div className="flex flex-wrap gap-3 text-sm">
              {[
                "Aroma chemicals for fragrance houses",
                "Pheromone intermediates for IPM programs",
                "Specialty intermediates for industrial applications",
                "Custom synthesis and scale-up support",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-base-300 px-4 py-2 text-base-content/70"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6">
        <div className="max-w-6xl mx-auto rounded-3xl border border-base-200 bg-gradient-to-r from-base-200 via-base-100 to-base-200 p-10 md:p-16 shadow-lg">
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-md uppercase tracking-[0.4em] text-primary font-semibold">
                Virendra Research Chem LLP
              </p>
              <h2 className="text-3xl font-bold leading-tight">
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

      <section className="px-6">
        <div className="max-w-6xl mx-auto space-y-8">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-primary/70 font-semibold">
              Frequently Asked Questions
            </p>
            <h2 className="mt-3 text-3xl font-bold">
              Common questions from buyers and technical teams
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {localSearchAnswers.map((item) => (
              <article
                key={item.question}
                className="rounded-3xl border border-base-200 bg-base-100 p-6 shadow-sm"
              >
                <h3 className="text-xl font-semibold">{item.question}</h3>
                <p className="mt-3 text-base-content/70 leading-relaxed">
                  {item.answer}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-primary/70 font-semibold">
                Insights & Updates
              </p>
              <h2 className="mt-3 text-3xl font-bold">
                Practical reads for sourcing, scale-up, and manufacturing
              </h2>
            </div>
            <Link to="/blogs" className="btn btn-outline border-base-300 text-base-content">
              View all blogs
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {blogPosts.slice(0, 3).map((post) => (
              <article
                key={post.slug}
                className="rounded-3xl border border-base-200 bg-base-100 shadow-sm"
              >
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="h-52 w-full rounded-t-3xl object-cover"
                />
                <div className="p-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-primary/70 font-semibold">
                    {post.targetKeyword}
                  </p>
                  <h3 className="mt-3 text-2xl font-bold leading-tight">
                    <Link to={getBlogPath(post.slug)}>{post.title}</Link>
                  </h3>
                  <p className="mt-3 text-base-content/70 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <Link
                    to={getBlogPath(post.slug)}
                    className="mt-5 inline-flex items-center gap-2 font-semibold text-primary"
                  >
                    Read more
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ContactUs />
    </div>
  );
};

export default Home;
