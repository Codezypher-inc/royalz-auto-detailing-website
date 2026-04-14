export const bookingCatalog = [
  {
    id: "ceramic-coating",
    name: "Ceramic Coating",
    shortLabel: "Long-term shine and paint protection",
    packages: [
      {
        id: "brand-new-car",
        name: "Brand New Car",
        price: 499,
        description: "Protection package for new or recently corrected vehicles.",
      },
      {
        id: "first-step-paint-correction",
        name: "First Step Paint Correction",
        price: 650,
        description: "Light correction plus ceramic protection for daily drivers.",
      },
      {
        id: "second-step-paint-correction",
        name: "Second Step Paint Correction",
        price: 850,
        description: "Deeper correction and gloss enhancement before coating.",
      },
    ],
  },
  {
    id: "window-tinting",
    name: "Window Tinting",
    shortLabel: "Heat reduction, privacy, and a sharper exterior finish",
    packages: [
      {
        id: "front-two-windows",
        name: "Front Two Windows",
        price: 199,
        description: "Clean factory-style enhancement for the front doors.",
      },
      {
        id: "full-sedan",
        name: "Full Sedan Tint",
        price: 349,
        description: "Complete tint package for sedans and compact vehicles.",
      },
      {
        id: "full-suv-truck",
        name: "Full SUV / Truck Tint",
        price: 429,
        description: "Full tint coverage for larger vehicles and rear cargo glass.",
      },
    ],
  },
  {
    id: "vehicle-wraps",
    name: "Vehicle Wraps",
    shortLabel: "Color change, branding, and premium wrap finishes",
    packages: [
      {
        id: "roof-wrap",
        name: "Roof Wrap",
        price: 299,
        description: "Accent wrap for a sharper two-tone look.",
      },
      {
        id: "partial-wrap",
        name: "Partial Wrap",
        price: 899,
        description: "Selected panels or branded sections with custom finish.",
      },
      {
        id: "full-color-change-wrap",
        name: "Full Color Change Wrap",
        price: 2499,
        description: "Full transformation package for maximum visual impact.",
      },
    ],
  },
  {
    id: "paint-protection-film",
    name: "Paint Protection Film (PPF)",
    shortLabel: "Chip and scratch protection for high-impact surfaces",
    packages: [
      {
        id: "partial-front",
        name: "Partial Front Protection",
        price: 799,
        description: "Coverage for the highest-impact front paint surfaces.",
      },
      {
        id: "full-front",
        name: "Full Front Protection",
        price: 1499,
        description: "Bumper, hood, fenders, and mirror caps protected.",
      },
      {
        id: "track-pack",
        name: "Track Pack / Extended Coverage",
        price: 1999,
        description: "Expanded protection for premium and performance vehicles.",
      },
    ],
  },
];

export function getCategoryById(categoryId) {
  return bookingCatalog.find((category) => category.id === categoryId) || null;
}

export function getPackageById(categoryId, packageId) {
  const category = getCategoryById(categoryId);

  if (!category) {
    return null;
  }

  return category.packages.find((pkg) => pkg.id === packageId) || null;
}
