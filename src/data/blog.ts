export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Future of Real Estate Automation: What to Expect in 2025",
    excerpt: "AI agents, predictive analytics, and self-healing pipelines are reshaping how agencies operate.",
    category: "Industry Trends",
    readTime: "5 min read",
    date: "Oct 12, 2024",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Sarah Chen",
      avatar: "https://i.pravatar.cc/150?img=32"
    }
  },
  {
    id: 2,
    title: "How Ross Realty Scaled to $50M GCI Without Hiring More Staff",
    excerpt: "A deep dive into the operational playbook that allowed a boutique agency to compete with the giants.",
    category: "Case Study",
    readTime: "8 min read",
    date: "Sep 28, 2024",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "David Ross",
      avatar: "https://i.pravatar.cc/150?img=11"
    }
  },
  {
    id: 3,
    title: "5 CRM Workflows That Are Leaking Your Revenue (And How to Fix Them)",
    excerpt: "Most agencies lose leads at the hand-off. Here is the exact automation logic to stop the bleeding.",
    category: "Guides",
    readTime: "6 min read",
    date: "Sep 15, 2024",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "James Wilson",
      avatar: "https://i.pravatar.cc/150?img=59"
    }
  }
];
