import React from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import { findBlogPostBySlug, getAllBlogKeywords } from "../data/blogPosts.js";
import {
  buildBlogPostingSchema,
  buildBreadcrumbSchema,
  truncateText,
} from "../utils/seo.js";

const BlogPost = () => {
  const { slug } = useParams();
  const post = findBlogPostBySlug(slug);

  if (!post) {
    return <Navigate to="/blogs" replace />;
  }

  const faqSchema =
    post.faq?.length
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null;

  return (
    <div className="bg-base-100 pb-16 text-base-content">
      <Seo
        title={post.title}
        description={post.description}
        canonicalPath={`/blogs/${post.slug}`}
        image={post.coverImage}
        type="article"
        keywords={getAllBlogKeywords(post)}
        jsonLd={[
          buildBlogPostingSchema(post),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blogs", path: "/blogs" },
            { name: post.title, path: `/blogs/${post.slug}` },
          ]),
          faqSchema,
        ]}
      />

      <section className="border-b border-base-200 bg-gradient-to-br from-base-200 via-base-100 to-base-100 px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <Link
            to="/blogs"
            className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/75"
          >
            Blog index
          </Link>
          <div className="mt-5 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-base-content/55">
            <span>{post.heroLabel}</span>
            <span>{post.category}</span>
            <span>{post.readingTime}</span>
            <span>{post.datePublished}</span>
          </div>
          <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-base-content/72">
            {post.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-2 text-sm text-base-content/65">
            <span className="rounded-full border border-base-300 px-4 py-2">
              {post.category}
            </span>
            <span className="rounded-full border border-base-300 px-4 py-2">
              Published {post.datePublished}
            </span>
          </div>
        </div>
      </section>

      <article className="px-6 py-14">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="min-w-0 space-y-8">
            <img
              src={post.coverImage}
              alt={post.title}
              className="h-[22rem] w-full rounded-3xl border border-base-200 object-cover shadow-sm"
            />

            <div className="rounded-3xl border border-base-200 bg-base-100 p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/70">
                Quick Summary
              </p>
              <p className="mt-4 text-lg leading-relaxed text-base-content/75">
                {truncateText(post.excerpt, 240)}
              </p>
            </div>

            {post.sections.map((section) => (
              <section
                key={section.heading}
                id={section.heading.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
                className="rounded-3xl border border-base-200 bg-base-100 p-8 shadow-sm"
              >
                <h2 className="text-2xl font-bold">{section.heading}</h2>
                <div className="mt-5 space-y-4 text-base leading-relaxed text-base-content/75">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                {section.bullets?.length ? (
                  <ul className="mt-5 space-y-3 text-base-content/75">
                    {section.bullets.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-2 h-2 w-2 rounded-full bg-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}

            {post.faq?.length ? (
              <section className="rounded-3xl border border-base-200 bg-base-100 p-8 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/70">
                  FAQ
                </p>
                <div className="mt-5 space-y-5">
                  {post.faq.map((item) => (
                    <article key={item.question}>
                      <h2 className="text-xl font-bold">{item.question}</h2>
                      <p className="mt-2 leading-relaxed text-base-content/75">
                        {item.answer}
                      </p>
                    </article>
                  ))}
                </div>
              </section>
            ) : null}
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-base-200 bg-base-100 p-6 shadow-sm lg:sticky lg:top-28">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/70">
                In this article
              </p>
              <ul className="mt-5 space-y-3 text-sm text-base-content/70">
                {post.sections.map((section) => {
                  const anchor = section.heading
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-");

                  return (
                    <li key={section.heading}>
                      <a href={`#${anchor}`} className="hover:text-primary">
                        {section.heading}
                      </a>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-8 border-t border-base-200 pt-6">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/70">
                  Related actions
                </p>
                <div className="mt-4 flex flex-col gap-3">
                  {post.relatedLinks?.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="rounded-2xl border border-base-300 px-4 py-3 text-sm font-semibold text-base-content transition hover:border-primary hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
