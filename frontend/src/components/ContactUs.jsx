// import React from "react";
// import siteConfig from "../config/siteConfig.js";
// import MaterialIcon from "./MaterialIcon.jsx";

// const contactDetails = [
//   {
//     icon: "call",
//     label: "Chat with us",
//     value: siteConfig.contact.phone,
//     helper: "Dedicated chemical specialists",
//     href: `tel:${siteConfig.contact.phoneHref}`,
//   },
//   {
//     icon: "mail",
//     label: "Mail a brief",
//     value: siteConfig.contact.salesEmail,
//     helper: "Responses within 24 hours",
//     href: `mailto:${siteConfig.contact.salesEmail}`,
//   },
//   {
//     icon: "location_on",
//     label: "Visit our lab",
//     value: siteConfig.contact.address,
//     helper: "Mon - Fri, 9 am to 7 pm",
//   },
// ];

// const ContactUs = () => {
//   return (
//     <section className="bg-base-200 py-16 text-base-content">
//       <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-6 items-start">
//         <div className="rounded-3xl border border-base-200 bg-base-100 p-10 shadow-lg">
//           <h3 className="text-xl font-semibold">
//             Let&apos;s build your next formulation
//           </h3>
//           <p className="mt-2 text-sm text-base-content/70">
//             Share your spec sheet or request a callback. Our chemists love
//             complex challenges.
//           </p>

//           <div className="mt-8 space-y-6">
//             {contactDetails.map(({ icon: Icon, label, value, helper, href }) => (
//               <div key={label} className="flex items-start gap-4">
//                 <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white">
//                   <MaterialIcon name={Icon} className="text-[22px]" />
//                 </div>
//                 <div>
//                   <p className="text-xs uppercase tracking-[0.35em] text-base-content/60">
//                     {label}
//                   </p>
//                   {href ? (
//                     <a
//                       href={href}
//                       className="text-lg font-semibold text-base-content hover:text-primary"
//                     >
//                       {value}
//                     </a>
//                   ) : (
//                     <p className="text-lg font-semibold text-base-content">
//                       {value}
//                     </p>
//                   )}
//                   <p className="text-sm text-base-content/60">{helper}</p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="mt-8 flex gap-4 text-base-content/70">
//             {siteConfig.socialLinks.map((link) => (
//               <a
//                 key={link.label}
//                 href={link.href}
//                 className="flex h-10 w-10 items-center justify-center rounded-full border border-base-200 bg-base-100 hover:border-primary/50"
//                 target="_blank"
//                 rel="noreferrer"
//               >
//                 <MaterialIcon name={link.icon} className="text-lg" />
//               </a>
//             ))}
//           </div>
//         </div>

//         <div className="rounded-3xl border border-base-200 bg-base-100 p-6 sm:p-10 shadow-lg">
//           <p className="text-xs uppercase tracking-[0.4em] text-primary/80">
//             contact {siteConfig.company.name}
//           </p>
//           <h2 className="mt-3 text-3xl font-bold text-base-content">
//             Kick-start a project
//           </h2>
//           <p className="mt-2 text-sm text-base-content/70">
//             Fill the form and we will respond with data sheets, samples or a
//             call—whatever you prefer.
//           </p>

//           <form className="mt-8 space-y-5">
//             <div className="grid gap-4 md:grid-cols-2">
//               <input
//                 className="input input-bordered border-base-200 bg-base-100 text-base-content placeholder:text-base-content/50"
//                 placeholder="Your name"
//               />
//               <input
//                 className="input input-bordered border-base-200 bg-base-100 text-base-content placeholder:text-base-content/50"
//                 placeholder="Email address"
//                 type="email"
//               />
//             </div>

//             <div className="grid gap-4 md:grid-cols-2">
//               <input
//                 className="input input-bordered border-base-200 bg-base-100 text-base-content placeholder:text-base-content/50"
//                 placeholder="Phone"
//                 type="tel"
//               />
//               <input
//                 className="input input-bordered border-base-200 bg-base-100 text-base-content placeholder:text-base-content/50"
//                 placeholder="Company"
//               />
//             </div>

//             <textarea
//               rows={5}
//               className="textarea textarea-bordered w-full border-base-200 bg-base-100 text-base-content placeholder:text-base-content/50"
//               placeholder="Tell us about the molecule or grade you need"
//             />

//             <button type="submit" className="btn btn-primary w-full">
//               Send a message
//             </button>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ContactUs;

import React, { useRef, useState } from "react";
import siteConfig from "../config/siteConfig.js";
import MaterialIcon from "./MaterialIcon.jsx";
import emailjs from "@emailjs/browser";

const contactDetails = [
  {
    icon: "call",
    label: "Chat with us",
    value: siteConfig.contact.phone,
    helper: "Dedicated chemical specialists",
    href: `tel:${siteConfig.contact.phoneHref}`,
  },
  {
    icon: "mail",
    label: "Mail a brief",
    value: siteConfig.contact.salesEmail,
    helper: "Responses within 24 hours",
    href: `mailto:${siteConfig.contact.salesEmail}`,
  },
  {
    icon: "location_on",
    label: "Visit our lab",
    value: siteConfig.contact.address,
    helper: "Mon - Fri, 9 am to 7 pm",
  },
];

const ContactUs = () => {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "service_cklj7nc",
        "template_mg4xpvh",
        formRef.current,
        "iBuEYxOQzvARGMBUd"
      )
      .then(
        () => {
          setLoading(false);
          alert("Message sent successfully!");
          formRef.current.reset();
        },
        () => {
          setLoading(false);
          alert("Something went wrong. Please try again.");
        }
      );
  };

  return (
    <section className="py-16 text-base-content">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-6 items-start">
        
        {/* LEFT PANEL */}
        <div className="rounded-3xl border border-base-200 bg-base-100 p-10 shadow-lg">
          <h3 className="text-xl font-semibold">
            Let&apos;s build your next intermediate
          </h3>
          <p className="mt-2 text-sm text-base-content/70">
            Share your spec sheet or project brief. Our chemists support aroma,
            pheromone, and specialty programs end-to-end.
          </p>

          <div className="mt-8 grid gap-4">
            {contactDetails.map(({ icon, label, value, helper, href }) => (
              <div
                key={label}
                className="flex items-start gap-4 rounded-2xl border border-base-200 bg-base-100/70 p-4"
              >
                <div className="h-12 w-12 shrink-0 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                  <MaterialIcon name={icon} className="text-[22px] leading-none" />
                </div>
                <div className="space-y-1">
                  <p className="text-[11px] uppercase tracking-[0.35em] text-base-content/60 font-semibold">
                    {label}
                  </p>

                  {href ? (
                    <a
                      href={href}
                      className="text-lg font-semibold text-base-content hover:text-primary"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-lg font-semibold text-base-content">
                      {value}
                    </p>
                  )}
                  <p className="text-sm text-base-content/60">{helper}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* RIGHT PANEL */}
        <div className="rounded-3xl border border-base-200 bg-base-100 p-6 sm:p-10 shadow-lg">
          <p className="text-xs uppercase tracking-[0.4em] text-primary/80 font-semibold">
            contact {siteConfig.company.name}
          </p>
          <h2 className="mt-3 text-3xl font-bold text-base-content">
            Kick-start a collaboration
          </h2>
          <p className="mt-2 text-sm text-base-content/70">
            Share your requirements and we will respond with data sheets,
            samples, or pilot timelines—whatever you prefer.
          </p>

          {/* CONTACT FORM WITH EMAILJS */}
          <form ref={formRef} onSubmit={sendEmail} className="mt-8 space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <input
                name="name"
                className="input input-bordered border-base-200 bg-base-100 text-base-content placeholder:text-base-content/50"
                placeholder="Your name"
                required
              />
              <input
                name="email"
                className="input input-bordered border-base-200 bg-base-100 text-base-content placeholder:text-base-content/50"
                placeholder="Email address"
                type="email"
                required
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <input
                name="phone"
                className="input input-bordered border-base-200 bg-base-100 text-base-content placeholder:text-base-content/50"
                placeholder="Phone"
                type="tel"
              />
              <input
                name="company"
                className="input input-bordered border-base-200 bg-base-100 text-base-content placeholder:text-base-content/50"
                placeholder="Company"
              />
            </div>

            <textarea
              rows={5}
              name="message"
              className="textarea textarea-bordered w-full border-base-200 bg-base-100 text-base-content placeholder:text-base-content/50"
              placeholder="Tell us about the molecule or grade you need"
              required
            />

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send a message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
