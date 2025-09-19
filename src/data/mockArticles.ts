// Temporary mock data - will be replaced by RSS feed data
import { Article } from "@/hooks/useArticles";

export const mockArticles: Article[] = [
  {
    id: "1",
    title: "Dubai announces revolutionary new visa policy for international tourists",
    slug: "dubai-announces-revolutionary-new-visa-policy-international-tourists",
    excerpt: "The emirate introduces streamlined visa procedures and extended validity periods to boost tourism sector and strengthen economic ties with key markets worldwide.",
    content: "Dubai has announced a comprehensive new visa policy that will revolutionize how international tourists visit the emirate...",
    image_url: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop",
    published_at: "2024-01-15T10:30:00Z",
    updated_at: new Date().toISOString(),
    created_at: "2024-01-15T10:30:00Z",
    author: "Ahmed Al-Rashid",
    category: "Dubai",
    source_url: "https://dubaivartha.com/example1",
    is_breaking: true,
    read_time: 4,
    views: 15420,
    cached_at: new Date().toISOString(),
  },
  {
    id: "2", 
    title: "UAE National Day celebrations draw millions across Emirates",
    slug: "uae-national-day-celebrations-draw-millions-across-emirates",
    excerpt: "Spectacular fireworks, cultural performances, and patriotic displays mark the 52nd UAE National Day with unprecedented public participation across all seven emirates.",
    content: "The UAE celebrated its 52nd National Day with spectacular displays across all seven emirates...",
    image_url: "https://images.unsplash.com/photo-1539650116574-75c0c6d0e9e1?w=800&h=600&fit=crop",
    published_at: "2024-01-15T08:15:00Z",
    updated_at: new Date().toISOString(),
    created_at: "2024-01-15T08:15:00Z",
    author: "Fatima Al-Zahra",
    category: "UAE",
    source_url: "https://dubaivartha.com/example2",
    is_breaking: false,
    read_time: 6,
    views: 28900,
    cached_at: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Kerala Chief Minister's Dubai visit strengthens investment partnerships",
    slug: "kerala-chief-minister-dubai-visit-strengthens-investment-partnerships",
    excerpt: "High-level meetings focus on technology transfer, renewable energy projects, and expanding trade relations between Kerala and UAE business communities.",
    content: "Kerala Chief Minister's visit to Dubai has resulted in strengthened investment partnerships...",
    image_url: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=800&h=600&fit=crop",
    published_at: "2024-01-15T06:45:00Z",
    updated_at: new Date().toISOString(),
    created_at: "2024-01-15T06:45:00Z",
    author: "Priya Nair",
    category: "Kerala",
    source_url: "https://dubaivartha.com/example3",
    is_breaking: false,
    read_time: 5,
    views: 12340,
    cached_at: new Date().toISOString(),
  },
  {
    id: "4",
    title: "Dubai Metro expansion project reaches major milestone",
    slug: "dubai-metro-expansion-project-reaches-major-milestone",
    excerpt: "The Blue and Purple lines construction progresses ahead of schedule, promising to revolutionize public transportation across the emirate by 2030.",
    content: "Dubai's metro expansion project has reached a significant milestone...",
    image_url: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=600&fit=crop",
    published_at: "2024-01-14T16:20:00Z",
    updated_at: new Date().toISOString(),
    created_at: "2024-01-14T16:20:00Z",
    author: "Mohammed Al-Maktoum",
    category: "Dubai",
    source_url: "https://dubaivartha.com/example4",
    is_breaking: false,
    read_time: 3,
    views: 8750,
    cached_at: new Date().toISOString(),
  },
  {
    id: "5",
    title: "GCC countries strengthen economic cooperation at Abu Dhabi summit",
    slug: "gcc-countries-strengthen-economic-cooperation-abu-dhabi-summit",
    excerpt: "Leaders discuss regional trade integration, joint infrastructure projects, and coordinated responses to global economic challenges.",
    content: "GCC leaders gathered in Abu Dhabi to discuss strengthening economic cooperation...",
    image_url: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
    published_at: "2024-01-14T14:10:00Z",
    updated_at: new Date().toISOString(),
    created_at: "2024-01-14T14:10:00Z",
    author: "Sarah Al-Qasimi",
    category: "GCC",
    source_url: "https://dubaivartha.com/example5",
    is_breaking: false,
    read_time: 7,
    views: 19850,
    cached_at: new Date().toISOString(),
  },
];

export const getArticlesByCategory = (category: string): Article[] => {
  if (category === "home") return mockArticles;
  return mockArticles.filter(article => 
    article.category?.toLowerCase() === category.toLowerCase()
  );
};

export const getArticleById = (id: string): Article | undefined => {
  return mockArticles.find(article => article.id === id);
};