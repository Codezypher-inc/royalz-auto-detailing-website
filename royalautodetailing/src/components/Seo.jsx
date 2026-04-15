import { useEffect } from "react";

const DEFAULT_TITLE = "Royalz Auto Detailing | Premium Auto Detailing in Halifax";
const DEFAULT_DESCRIPTION =
  "Royalz Auto Detailing provides premium detailing, ceramic coating, tint, wraps, and vehicle protection services in Halifax, Nova Scotia.";
const DEFAULT_SITE_NAME = "Royalz Auto Detailing";
const DEFAULT_IMAGE = "/img/royallogo.png";

function ensureMetaTag(selector, createAttributes) {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement("meta");
    Object.entries(createAttributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
    document.head.appendChild(element);
  }

  return element;
}

function ensureLinkTag(selector, createAttributes) {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement("link");
    Object.entries(createAttributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
    document.head.appendChild(element);
  }

  return element;
}

function updateMetaByName(name, content) {
  const element = ensureMetaTag(`meta[name="${name}"]`, { name });
  element.setAttribute("content", content);
}

function updateMetaByProperty(property, content) {
  const element = ensureMetaTag(`meta[property="${property}"]`, { property });
  element.setAttribute("content", content);
}

export default function Seo({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  image = DEFAULT_IMAGE,
  type = "website",
  schema,
}) {
  useEffect(() => {
    const resolvedTitle = title ? `${title} | ${DEFAULT_SITE_NAME}` : DEFAULT_TITLE;
    const canonicalUrl = new URL(path, window.location.origin).toString();
    const imageUrl = new URL(image, window.location.origin).toString();

    document.title = resolvedTitle;
    updateMetaByName("description", description);
    updateMetaByProperty("og:title", resolvedTitle);
    updateMetaByProperty("og:description", description);
    updateMetaByProperty("og:type", type);
    updateMetaByProperty("og:url", canonicalUrl);
    updateMetaByProperty("og:image", imageUrl);
    updateMetaByProperty("og:site_name", DEFAULT_SITE_NAME);
    updateMetaByName("twitter:card", "summary_large_image");
    updateMetaByName("twitter:title", resolvedTitle);
    updateMetaByName("twitter:description", description);
    updateMetaByName("twitter:image", imageUrl);

    const canonical = ensureLinkTag('link[rel="canonical"]', { rel: "canonical" });
    canonical.setAttribute("href", canonicalUrl);

    let schemaTag = document.head.querySelector('script[data-seo-schema="page"]');

    if (schema) {
      if (!schemaTag) {
        schemaTag = document.createElement("script");
        schemaTag.type = "application/ld+json";
        schemaTag.setAttribute("data-seo-schema", "page");
        document.head.appendChild(schemaTag);
      }

      schemaTag.textContent = JSON.stringify(schema);
    } else if (schemaTag) {
      schemaTag.remove();
    }

    return () => {
      if (schemaTag && !schema) {
        schemaTag.remove();
      }
    };
  }, [description, image, path, schema, title, type]);

  return null;
}
