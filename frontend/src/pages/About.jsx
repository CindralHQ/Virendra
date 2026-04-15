import React from "react";
import AboutUs from "../components/AboutUs.jsx";
import Seo from "../components/Seo.jsx";
import {
  buildBreadcrumbSchema,
  buildOrganizationSchema,
} from "../utils/seo.js";

const About = () => {
  return (
    <>
      <Seo
        title="About Virendra Research Chem LLP in Navi Mumbai"
        description="Learn about Virendra Research Chem LLP, a Navi Mumbai chemical manufacturer focused on aroma chemicals, pheromone intermediates, specialty molecules, and custom synthesis programs."
        canonicalPath="/about"
        keywords={[
          "about Virendra Research Chem LLP",
          "Navi Mumbai chemical manufacturer",
          "specialty chemical company Maharashtra",
          "custom synthesis company Mumbai",
        ]}
        jsonLd={[
          buildOrganizationSchema(),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        ]}
      />
      <AboutUs />
    </>
  );
};

export default About;
