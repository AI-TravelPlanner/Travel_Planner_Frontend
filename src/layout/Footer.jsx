import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

// -----------------------------
// Default Data (fallback props)
// -----------------------------
const defaultSections = [
  {
    title: "Company",
    links: [
      { name: "About Us", href: "#" },
      { name: "Contact Us", href: "#" },
      { name: "FAQs", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Privacy Policy", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Help Center", href: "#" },
      { name: "Security & Data Protection", href: "#" },
      { name: "Support", href: "#" },
    ],
  },
];

const defaultSocialLinks = [
  { icon: <FaInstagram className="size-5" />, href: "#", label: "Instagram" },
  { icon: <FaFacebook className="size-5" />, href: "#", label: "Facebook" },
  { icon: <FaTwitter className="size-5" />, href: "#", label: "Twitter" },
  { icon: <FaLinkedin className="size-5" />, href: "#", label: "LinkedIn" },
];

const defaultLegalLinks = [
  { name: "Privacy Policy", href: "#" },
  { name: "Terms of Service", href: "#" },
  { name: "Cookie Settings", href: "#" },
];

// -----------------------------
// Footer Component
// -----------------------------
const Footer7 = ({
  logo = {
    url: "#",
    src: "https://thumb.ac-illust.com/ba/baad12c3820b87c451c20d3b57fc5968_t.jpeg",
    alt: "logo",
    title: "Nomadic",
  },
  sections = defaultSections,
  description = "Let’s stay connected - visit our social pages for the latest updates.",
  socialLinks = defaultSocialLinks,
  copyright = "©2025 Nomadic. All Rights Reserved.",
  legalLinks = defaultLegalLinks,
}) => {
  return (
    <section className="py-8">
      <div className="w-full px-6 md:px-12 lg:px-10">
        {/* -----------------------------
            TOP SECTION (Logo + Links + Newsletter)
        ----------------------------- */}
        <div className="flex w-full flex-col gap-10 lg:gap-50 lg:flex-row lg:items-start lg:text-left">
          {/* Left + Middle share 50% */}
          <div className="flex w-full lg:w-1/2 flex-col lg:flex-row gap-10">
            {/* 1. Left column (Logo, description, and social icons) */}
            <div className="flex w-full lg:w-1/2 flex-col gap-6">
              <div className="flex items-center gap-1">
                <a href={logo.url}>
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    title={logo.title}
                    className="h-9"
                  />
                </a>
                <h2 className="text-2xl font-bold">{logo.title}</h2>
              </div>
              <p className="text-gray-700 max-w-[90%] text-sm font-medium">
                {description}
              </p>
              <ul className="text-black flex items-center space-x-5">
                {socialLinks.map((social, sicon) => (
                  <li key={sicon} className="hover:text-[#4A1919]">
                    <a href={social.href} aria-label={social.label}>
                      {social.icon}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* 2. Middle columns (Company + Support) */}
            <div className="grid w-full lg:w-1/1 gap-6 md:grid-cols-2">
              {sections.map((section, sectionIdx) => (
                <div key={sectionIdx}>
                  <h3 className="mb-4 text-base font-bold">{section.title}</h3>
                  <ul className="text-gray-700 space-y-3">
                    {section.links.map((link, linkIdx) => (
                      <li
                        key={linkIdx}
                        className="hover:text-[#4A1919] text-sm font-medium"
                      >
                        <a href={link.href}>{link.name}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Right column (Newsletter - takes 50%) */}
          <div className="w-full lg:w-105">
            <h3 className="mb-4 text-base font-semibold">
              Join Our Community and receive updates
            </h3>
            <form className="flex gap-5 mb-3">
              <input
                type="email"
                placeholder="Enter Email"
                className="flex-1 rounded-full px-4 py-2 text-sm border border-gray-300 focus:outline-none bg-gray-100 text-gray-500 focus:text-[#4A1919]"
              />
              <button
                type="submit"
                className="bg-[#4A1919] text-white rounded-full px-5 py-2 shadow hover:bg-[#6B2C2C] cursor-pointer"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs text-gray-500">
              By subscribing you agree to our{" "}
              <a href="#" className="underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>

        {/* -----------------------------
            BOTTOM SECTION (Copyright + Legal links)
        ----------------------------- */}
        <div className="text-gray-700 mt-8 flex flex-col justify-between gap-4 border-t py-8 text-xs font-medium md:flex-row md:items-center md:text-left">
          <p className="order-2 lg:order-1">{copyright}</p>
          <ul className="order-1 flex flex-col gap-5 md:order-2 md:flex-row">
            {legalLinks.map((link, idx) => (
              <li key={idx} className="hover:text-[#4A1919] underline">
                <a href={link.href}>{link.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export { Footer7 };
