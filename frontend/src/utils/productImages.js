const imageMappings = [
  {
    keywords: ["cucumber", "green", "leaf"],
    url: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?q=80&w=900&auto=format&fit=crop",
  },
  {
    keywords: ["melon", "watermelon"],
    url: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?q=80&w=900&auto=format&fit=crop",
  },
  {
    keywords: ["jasmine", "floral", "flower"],
    url: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=900&auto=format&fit=crop",
  },
  {
    keywords: ["coffee", "caramel"],
    url: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=900&auto=format&fit=crop",
  },
  {
    keywords: ["coconut"],
    url: "https://images.unsplash.com/photo-1502741338009-8d5a4e7f02d6?q=80&w=900&auto=format&fit=crop",
  },
  {
    keywords: ["pheromone", "pest", "agro"],
    url: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=900&auto=format&fit=crop",
  },
  {
    keywords: ["polymer", "resin"],
    url: "https://images.unsplash.com/photo-1581093806997-124204d9fa9d?q=80&w=900&auto=format&fit=crop",
  },
  {
    keywords: ["specialty", "intermediate"],
    url: "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?q=80&w=900&auto=format&fit=crop",
  },
];

export const getProductImage = (product) => {
  if (!product) return "";

  const content = [
    product.title,
    product.description,
    product.relatedProducts,
    product.category,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  const match = imageMappings.find(({ keywords }) =>
    keywords.some((keyword) => content.includes(keyword))
  );

  return match ? match.url : "";
};
