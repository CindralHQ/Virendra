import React from "react";
import siteConfig from "../config/siteConfig.js";
import MaterialIcon from "./MaterialIcon.jsx";

const AboutUs = () => {
  return (
    <div className="bg-base-100 text-base-content font-sans">
      {/* 1. HERO BANNER */}
      <section className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden bg-base-200">
        <div className="relative z-10 text-center space-y-4 px-4 animated fade-in-up">
          <p className="text-primary tracking-[0.3em] uppercase text-sm font-semibold">
            Innovation • Quality • Sustainability
          </p>
          <h1 className="text-5xl md:text-7xl font-extrabold text-base-content tracking-tight">
            {siteConfig.company.name}
          </h1>
          <p className="text-base-content/70 text-lg md:text-xl max-w-2xl mx-auto font-light">
            {siteConfig.company.tagline}
          </p>
        </div>
      </section>

      {/* 2. COMPANY OVERVIEW */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-base-content leading-tight">
              We are a fast-growing <span className="text-primary">chemical intermediate</span> manufacturing company.
            </h2>
            <p className="text-lg text-base-content/80 leading-relaxed">
              Specializing in high-purity aroma chemicals, pheromone intermediates, specialty molecules, and custom research solutions. With a strong foundation in chemical synthesis, process optimization, and quality compliance, we support global flavour &amp; fragrance houses, agro-solution manufacturers, and specialty chemical users with reliable, scalable intermediates.
            </p>
            <p className="text-lg text-base-content/80 leading-relaxed">
              Our commitment to sustainability, safety, and scientific excellence drives consistent quality across all product categories.
            </p>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-3xl blur-xl" />
            <img
              src="/Virendra_Logo.png"
              alt={`${siteConfig.company.name} logo`}
              className="relative rounded-3xl shadow-2xl border border-white/20 w-full object-contain h-[500px] bg-white/80 p-10"
            />
          </div>
        </div>
      </section>

      {/* 3. VISION & MISSION */}
      <section className="py-20 bg-base-200/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Vision */}
            <div className="bg-base-100 p-10 rounded-3xl shadow-lg border-l-8 border-primary hover:-translate-y-2 transition-transform duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <MaterialIcon name="visibility" className="text-3xl" />
                </div>
                <h3 className="text-3xl font-bold">Our Vision</h3>
              </div>
              <p className="text-lg text-base-content/80 leading-relaxed">
                To be a leading global supplier of innovative aroma chemicals, pheromone intermediates, and specialty molecules while ensuring environmentally responsible and safe chemistry.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-base-100 p-10 rounded-3xl shadow-lg border-l-8 border-secondary hover:-translate-y-2 transition-transform duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                  <MaterialIcon name="rocket_launch" className="text-3xl" />
                </div>
                <h3 className="text-3xl font-bold">Our Mission</h3>
              </div>
              <ul className="space-y-3 text-base-content/80">
                <li className="flex gap-3">
                  <MaterialIcon name="check_circle" className="text-secondary text-sm mt-1" />
                  Deliver high-purity, high-performance chemical intermediates.
                </li>
                <li className="flex gap-3">
                  <MaterialIcon name="check_circle" className="text-secondary text-sm mt-1" />
                  Support industries with custom R&D and contract research.
                </li>
                <li className="flex gap-3">
                  <MaterialIcon name="check_circle" className="text-secondary text-sm mt-1" />
                  Contribute to environmentally safe pest management via pheromones.
                </li>
                <li className="flex gap-3">
                  <MaterialIcon name="check_circle" className="text-secondary text-sm mt-1" />
                  Maintain strict quality standards and ensure ethical operations.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SUSTAINABILITY (SDGs) */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-bold">Sustainability Commitment</h2>
          <p className="text-xl text-base-content/60 max-w-3xl mx-auto">
            Aligned with United Nations Sustainable Development Goals (SDGs)
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              sdg: "SDG 9",
              title: "Industry & Innovation",
              desc: "Continuous innovation, advanced research, and modern manufacturing.",
              color: "bg-orange-500",
              icon: "factory"
            },
            {
              sdg: "SDG 12",
              title: "Responsible Consumption",
              desc: "Reducing waste and promoting environmentally responsible chemical processes.",
              color: "bg-yellow-600",
              icon: "recycling"
            },
            {
              sdg: "SDG 13",
              title: "Climate Action",
              desc: "Supporting low-toxicity agro-solutions to reduce ecological damage.",
              color: "bg-green-600",
              icon: "eco"
            },
            {
              sdg: "SDG 3",
              title: "Good Health",
              desc: "Supplying safer alternatives to harsh agrochemicals & safe fragrance materials.",
              color: "bg-emerald-500",
              icon: "health_and_safety"
            },
            {
              sdg: "SDG 15",
              title: "Life on Land",
              desc: "Biodiversity protection through pheromone-based insect control.",
              color: "bg-lime-600",
              icon: "forest"
            }

          ].map((item, i) => (
            <div key={i} className="group relative overflow-hidden rounded-2xl bg-base-100 shadow-xl border border-base-200">
              <div className={`absolute top-0 left-0 w-2 h-full ${item.color}`} />
              <div className="p-8">
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white mb-4 ${item.color}`}>
                  {item.sdg}
                </div>
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <MaterialIcon name={item.icon} className="text-base-content/70" />
                  {item.title}
                </h3>
                <p className="text-base-content/70 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. MANUFACTURING & INFRASTRUCTURE */}
      <section className="py-24 bg-neutral text-neutral-content relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row gap-16">
            <div className="flex-1 space-y-8">
              <h2 className="text-4xl font-bold">Manufacturing & Infrastructure</h2>
              <p className="text-lg opacity-90">
                Our state-of-the-art facilities are designed for flexibility and precision, supporting everything from lab-scale pilots to bulk production.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Dedicated synthesis units",
                  "Custom reactor capacities",
                  "Temp & pressure systems",
                  "In-house R&D lab",
                  "Analytical lab (GC, GC-MS)",
                  "Export-ready packaging"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                    <MaterialIcon name="precision_manufacturing" className="text-secondary" />
                    <span className="font-semibold">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <div className="bg-base-100/10 p-8 rounded-3xl border border-white/10 backdrop-blur-md">
                <h3 className="text-2xl font-bold mb-6 text-white">Quality Assurance</h3>
                <ul className="space-y-4">
                  {[
                    "Purity verification via GC/GC-MS",
                    "Controlled reaction environments",
                    "Environmentally responsible waste handling",
                    "Batch traceability",
                    "Worker & plant safety protocols"
                  ].map((q, i) => (
                    <li key={i} className="flex items-center gap-4 border-b border-white/10 pb-3 last:border-0">
                      <span className="bg-green-500/20 text-green-400 rounded-full p-1 flex">
                        <MaterialIcon name="verified_user" className="text-sm" />
                      </span>
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. VALUE PROPOSITION */}
      <section className="py-24 px-6 max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-16">Why Choose Virendra?</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: "Unique Range", desc: "Trending accords like Cucumber, Watermelon.", icon: "category" },
            { title: "Strong QA", desc: "High purity & consistency via GC-MS.", icon: "science" },
            { title: "Eco-Friendly", desc: "Pheromone-based pest control intermediates.", icon: "eco" },
            { title: "Dual Capability", desc: "Flexible manufacturing: Small batches + Bulk.", icon: "factory" }
          ].map((val, i) => (
            <div key={i} className="flex flex-col items-center p-6 rounded-2xl bg-base-100 hover:shadow-xl transition-shadow border border-base-200">
              <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                <MaterialIcon name={val.icon} className="text-4xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">{val.title}</h3>
              <p className="text-base-content/70">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. CTA / FOOTER ALT */}
      <section className="py-20 bg-primary/5 text-center">
        <div className="max-w-3xl mx-auto px-6 space-y-8">
          <h2 className="text-3xl font-bold text-primary">Need a Custom Solution?</h2>
          <p className="text-lg text-base-content/80">
            Whether you need a specific aroma molecule, a custom synthesis project, or a pheromone intermediate, our R&D team is ready to assist.
          </p>
          <button className="btn btn-primary btn-lg rounded-full px-10 shadow-lg shadow-primary/30 hover:scale-105 transition-transform">
            Contact Us
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
