import React from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import { blogPosts, getAllBlogKeywords, getBlogPath } from "../data/blogPosts.js";
import {
  buildBlogCollectionSchema,
  buildBreadcrumbSchema,
  truncateText,
} from "../utils/seo.js";

const writingSteps = [
  {
    title: "Start with one clear topic",
    body:
      "Keep each article focused on one buyer problem, sourcing question, or manufacturing topic so the piece stays useful and easy to read.",
  },
  {
    title: "Write for procurement and technical teams",
    body:
      "Open with a direct explanation of the issue, then add practical context, evaluation points, and operational detail without filler.",
  },
  {
    title: "Connect readers to the next step",
    body:
      "Guide readers toward the relevant product category or contact page when they want specifications, documents, or commercial discussion.",
  },
];

const Blogs = () => {
  const pageKeywords = Array.from(
    new Set(blogPosts.flatMap((post) => getAllBlogKeywords(post)))
  );

  return (
    <div className="bg-base-100 pb-16 text-base-content">
      <Seo
        title="Chemical Industry Blog for Aroma, Pheromone and Custom Synthesis Insights"
        description="Read articles from Virendra Research Chem LLP on aroma chemicals, pheromone intermediates, specialty intermediates, and custom synthesis sourcing in India."
        canonicalPath="/blogs"
        keywords={pageKeywords}
        jsonLd={[
          buildBlogCollectionSchema(blogPosts),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blogs", path: "/blogs" },
          ]),
        ]}
      />

      <section className="border-b border-base-200 bg-gradient-to-br from-base-200 via-base-100 to-base-100 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary/75">
            Company Articles
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
            Articles for buyers, formulators, and industrial sourcing teams
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-base-content/72">
            Explore practical perspectives on aroma chemicals, pheromone
            intermediates, specialty molecules, and custom synthesis from a
            manufacturing and sourcing point of view.
          </p>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary/70">
                Latest Articles
              </p>
              <h2 className="mt-3 text-3xl font-bold">Recent reads</h2>
            </div>
            <div className="hidden rounded-2xl border border-base-200 bg-base-100 px-5 py-4 text-sm text-base-content/70 md:block">
              Fresh notes on sourcing, quality, process planning, and manufacturing.
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="flex h-full flex-col rounded-3xl border border-base-200 bg-base-100 shadow-sm"
              >
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="h-56 w-full rounded-t-3xl object-cover"
                />
                <div className="flex flex-1 flex-col p-7">
                  <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-primary/75">
                    <span>{post.heroLabel}</span>
                    <span className="text-base-content/40">{post.readingTime}</span>
                  </div>
                  <h2 className="mt-4 text-2xl font-bold leading-tight">
                    <Link to={getBlogPath(post.slug)}>{post.title}</Link>
                  </h2>
                  <p className="mt-4 flex-1 leading-relaxed text-base-content/70">
                    {truncateText(post.excerpt, 155)}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2 text-xs text-base-content/65">
                    <span className="rounded-full border border-base-300 px-3 py-1.5">
                      {post.category}
                    </span>
                    <span className="rounded-full border border-base-300 px-3 py-1.5">
                      {post.readingTime}
                    </span>
                  </div>
                  <Link
                    to={getBlogPath(post.slug)}
                    className="mt-6 inline-flex items-center gap-2 font-semibold text-primary"
                  >
                    Read article
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-8">
        <div className="mx-auto grid max-w-6xl gap-6 rounded-3xl border border-base-200 bg-base-200/45 p-8 lg:grid-cols-3">
          {writingSteps.map((step) => (
            <article key={step.title} className="rounded-2xl bg-base-100 p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/75">
                Writing Approach
              </p>
              <h3 className="mt-3 text-xl font-bold">{step.title}</h3>
              <p className="mt-3 leading-relaxed text-base-content/70">{step.body}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Blogs;
