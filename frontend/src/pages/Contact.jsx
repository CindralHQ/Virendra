import React from "react";
import ContactUs from "../components/ContactUs.jsx";
import Seo from "../components/Seo.jsx";
import {
  buildBreadcrumbSchema,
  buildOrganizationSchema,
} from "../utils/seo.js";

const Contact = () => {
  return (
    <>
      <Seo
        title="Contact Virendra Research Chem LLP"
        description="Contact Virendra Research Chem LLP in Navi Mumbai for aroma chemicals, pheromone intermediates, specialty chemical intermediates, and custom synthesis requirements."
        canonicalPath="/contact"
        keywords={[
          "contact Virendra Research Chem LLP",
          "chemical manufacturer contact Navi Mumbai",
          "specialty chemicals contact Mumbai",
          "custom synthesis enquiry Maharashtra",
        ]}
        jsonLd={[
          buildOrganizationSchema(),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ]}
      />
      <ContactUs />
    </>
  );
};

export default Contact;
