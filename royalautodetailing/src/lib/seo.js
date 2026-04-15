export const businessInfo = {
  name: "Royalz Auto Detailing",
  url: "https://www.royalzautodetailing.com",
  image: "/img/royallogo.png",
  telephone: "+1-782-882-0667",
  alternateTelephone: "+1-902-412-2913",
  address: {
    streetAddress: "90 Horseshoe Lake Drive",
    addressLocality: "Halifax",
    addressRegion: "NS",
    postalCode: "B3S 0B4",
    addressCountry: "CA",
  },
  openingHours: [
    "Mo-Fr 09:00-21:00",
    "Sa-Su 09:00-12:00",
  ],
  sameAs: [
    "https://www.google.com/maps/search/?api=1&query=90+Horseshoe+Lake+Drive+Halifax+NS+B3S+0B4",
  ],
};

export function buildLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AutoDetailing",
    name: businessInfo.name,
    url: businessInfo.url,
    image: new URL(businessInfo.image, businessInfo.url).toString(),
    telephone: businessInfo.telephone,
    address: {
      "@type": "PostalAddress",
      ...businessInfo.address,
    },
    openingHours: businessInfo.openingHours,
    sameAs: businessInfo.sameAs,
  };
}

export function buildWebPageSchema({ title, description, path }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: new URL(path, businessInfo.url).toString(),
    isPartOf: {
      "@type": "WebSite",
      name: businessInfo.name,
      url: businessInfo.url,
    },
    about: {
      "@type": "AutoDetailing",
      name: businessInfo.name,
    },
  };
}
