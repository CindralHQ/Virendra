import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import useProducts from "../../../hooks/useProducts.js";
import siteConfig from "../../../config/siteConfig.js";
import MaterialIcon from "../../MaterialIcon.jsx";
import demoProducts from "../../../data/demoProducts.js";
import featuredCategories from "../../../data/featuredCategories.js";
import QuickNavigation from "../ProductCatalogue/QuickNavigation.jsx";
import {
  getProductImage,
  normalizeDriveImageUrl,
} from "../../../utils/productImages.js";
import { formatCasNumber } from "../../../utils/productFormatting.js";
import Seo from "../../Seo.jsx";
import {
  buildBreadcrumbSchema,
  buildProductSchema,
  getCategoryPath,
  getProductPath,
} from "../../../utils/seo.js";
import { useEnquiryCart } from "../../../context/EnquiryCartContext.jsx";

const ProductInfo = () => {
  const { id } = useParams();
  const numericId = Number(id);
  const { products, isLoading, error, reload } = useProducts();
  const { addItem, hasItem, openCart } = useEnquiryCart();

  const productSource = useMemo(
    () => (products.length ? products : demoProducts),
    [products]
  );
  const product = useMemo(
    () => productSource.find((item) => Number(item.id) === numericId),
    [productSource, numericId]
  );
  const activeCategory = useMemo(() => {
    const normalizedProductCategory = normalizeCategoryLabel(product?.category);

    return featuredCategories.find(
      (category) => normalizeCategoryLabel(category.title) === normalizedProductCategory
    );
  }, [product]);

  if (!product && isLoading) {
    return (
      <PageState title="Loading product details..." subtitle="Fetching fresh specs from the lab." />
    );
  }

  if (!product && error) {
    return (
      <PageState
        title="We hit a snag"
        subtitle={error}
        actionLabel="Retry"
        action={reload}
      />
    );
  }

  if (!product) {
    return (
      <PageState
        title="Product not found"
        subtitle="Try browsing the catalogue or contact us for curated recommendations."
        actionLabel="Back to catalogue"
        actionHref="/products"
      />
    );
  }

  const quickFacts = [
    { label: "CAS Number", value: formatCasNumber(product.casNo) },
    { label: "Category", value: product.category || "Not tagged yet" },
  ];

  const documents = [
    {
      label: "TDS (Technical Data Sheet)",
      url: product.tdsLink,
    },
    {
      label: "SDS (Safety Data Sheet)",
      url: product.msdsLink,
    },
  ].filter((doc) => doc.url);

  const productImageUrl =
    normalizeDriveImageUrl(product.image) || getProductImage(product);
  const bondImageUrl = normalizeDriveImageUrl(product.bondImage);
  const heroImageUrl = bondImageUrl || productImageUrl;
  const referenceImageUrl = bondImageUrl || productImageUrl;
  const referenceImageAlt = bondImageUrl
    ? `${product.title} chemical bond diagram`
    : `${product.title} reference`;
  const referenceImageClass = bondImageUrl ? "object-contain" : "object-cover";

  return (
    <div className="bg-base-100 text-base-content">
      <Seo
        title={product.seoTitle || product.title}
        description={product.seoDescription || product.description}
        canonicalPath={getProductPath(product)}
        keywords={product.seoKeywords || product.keywords || product.title}
        image={heroImageUrl || "/Logo.png"}
        type="product"
        jsonLd={[
          buildBreadcrumbSchema(
            [
              { name: "Home", path: "/" },
              { name: "Products", path: "/products" },
              activeCategory
                ? {
                    name: activeCategory.title,
                    path: getCategoryPath(activeCategory.slug),
                  }
                : null,
              { name: product.title, path: getProductPath(product) },
            ].filter(Boolean)
          ),
          buildProductSchema({
            ...product,
            image: productImageUrl,
            bondImage: bondImageUrl,
          }),
        ]}
      />
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-12">
        <QuickNavigation activeCategorySlug={activeCategory?.slug} />

        <ProductHero
          product={product}
          hasDocuments={documents.length > 0}
          imageUrl={heroImageUrl}
          onAddToEnquiry={() => {
            addItem(product);
            openCart();
          }}
          isInCart={hasItem(product.id)}
        />

        <section className="grid gap-6 md:grid-cols-2">
          {quickFacts.map((item) => (
            <SectionCard key={item.label} title={item.label}>
              <p className="text-xl font-semibold">{item.value}</p>
            </SectionCard>
          ))}
        </section>

        <section className="grid gap-8 md:grid-cols-5">
            <SectionCard className="md:col-span-3" title="About this molecule">
              <p className="text-base-content/70 leading-relaxed text-lg">
                {product.description ||
                  "We are preparing a detailed description for this molecule. Contact our team for specifications meanwhile."}
              </p>
            </SectionCard>

          <SectionCard className="md:col-span-2" title="">
            {referenceImageUrl ? (
              <div className="rounded-2xl border border-base-200 bg-base-100 p-4">
                <img
                  src={referenceImageUrl}
                  alt={referenceImageAlt}
                  className={`h-48 w-full rounded-2xl ${referenceImageClass}`}
                />
              </div>
            ) : (
              <p className="text-base-content/60 text-sm">
                Visual reference coming soon.
              </p>
            )}
          </SectionCard>
        </section>

        <section id="documents" className="grid gap-6 md:grid-cols-2">
          <SectionCard title="Technical documents">
            {documents.length ? (
              <ul className="space-y-3">
                {documents.map((doc) => (
                  <li key={doc.label}>
                    <DocumentLink label={doc.label} url={doc.url} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-base-content/60 text-sm">
                Documentation upload in progress. Drop us a note if you need it
                urgently.
              </p>
            )}
          </SectionCard>

          <SectionCard title="Need tailored specs?">
            <p className="text-base-content/70">
              Custom grades, different solvent systems or private-label
              packaging—we can configure it for you.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/products" className="btn btn-primary btn-sm">
                Compare other molecules
              </Link>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="btn btn-ghost btn-sm text-base-content"
              >
                Talk to a chemist
              </a>
            </div>
          </SectionCard>
        </section>
      </div>
    </div>
  );
};

const normalizeCategoryLabel = (value) =>
  (value || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

const ProductHero = ({ product, hasDocuments, imageUrl, onAddToEnquiry, isInCart }) => {
  return (
    <section className="relative isolate overflow-hidden rounded-3xl border border-base-200 bg-base-100 p-10 shadow-xl">
      {imageUrl && (
        <div className="absolute inset-y-0 right-0 hidden h-full w-1/2 lg:block">
          <img
            src={imageUrl}
            alt={product.title}
            className="h-full w-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-base-100/90 to-base-100/20" />
        </div>
      )}
      <div className="relative z-10 space-y-6">
        <p className="text-xs uppercase tracking-[0.45em] text-primary/80">
          {product.category || "Molecule overview"}
        </p>
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-base-content">
          {product.title}
        </h1>
        <p className="max-w-3xl text-lg text-base-content/70 leading-relaxed">
          {product.description ||
            "High-performance chemical intermediate trusted across healthcare and specialty manufacturing."}
        </p>

        <div className="flex flex-wrap gap-4 text-sm font-semibold">
          <span className="rounded-full bg-base-200 px-4 py-2 text-base-content/70 whitespace-nowrap font-mono tracking-[0.12em] tabular-nums">
            CAS: {formatCasNumber(product.casNo)}
          </span>
          {product.category && (
            <span className="rounded-full border border-base-300 bg-base-100 px-4 py-2 text-base-content/70">
              {product.category}
            </span>
          )}
          {hasDocuments && (
            <span className="rounded-full border border-success/25 bg-success/12 px-4 py-2 text-success whitespace-nowrap">
              Docs ready
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-4 pt-4">
          <Link className="btn btn-primary" to="/products">
            Back to catalogue
          </Link>
          <button
            type="button"
            onClick={onAddToEnquiry}
            className={`btn ${
              isInCart
                ? "btn-outline border-base-300 text-base-content"
                : "border-primary bg-primary text-white hover:border-primary hover:bg-primary/90"
            }`}
          >
            {isInCart ? "Added to enquiry cart" : "Add to enquiry cart"}
          </button>
          {hasDocuments && (
            <a
              href="#documents"
              className="btn btn-outline border-base-300 text-base-content"
            >
              View documents
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

const SectionCard = ({ title, children, className = "" }) => (
  <div
    className={`rounded-3xl border border-base-200 bg-base-100 p-6 shadow-sm ${className}`}
  >
    <h2 className="text-sm uppercase tracking-[0.35em] text-base-content/60 mb-4">
      {title}
    </h2>
    {children}
  </div>
);

const DocumentLink = ({ label, url }) => (
  <a
    href={url}
    target="_blank"
    rel="noreferrer"
    className="flex items-center justify-between rounded-2xl border border-base-200 bg-base-100 px-4 py-3 text-base-content transition hover:border-primary/40 hover:bg-base-200"
  >
    <div>
      <p className="font-semibold">{label}</p>
      <p className="text-xs text-base-content/60">Opens in new tab</p>
    </div>
    <MaterialIcon name="open_in_new" className="text-lg" />
  </a>
);

const PageState = ({ title, subtitle, actionLabel, action, actionHref }) => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-base-100 px-6 text-center text-base-content">
    <h1 className="text-3xl font-bold">{title}</h1>
    {subtitle && (
      <p className="mt-4 max-w-xl text-base-content/70 leading-relaxed">
        {subtitle}
      </p>
    )}
    {actionLabel && (
      <>
        {actionHref ? (
          <Link className="btn btn-primary mt-6" to={actionHref}>
            {actionLabel}
          </Link>
        ) : (
          <button className="btn btn-primary mt-6" onClick={action}>
            {actionLabel}
          </button>
        )}
      </>
    )}
  </div>
);

export default ProductInfo;
