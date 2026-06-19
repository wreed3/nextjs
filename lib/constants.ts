export const SITE_CONFIG = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Next.js Blog',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  description: 'A modern blog built with Next.js',
  author: {
    name: 'Your Name',
    email: 'your-email@example.com',
    image: '/images/site/max.png',
  },
  social: {
    twitter: '@yourusername',
    github: 'yourusername',
  },
} as const;

export const POSTS_PER_PAGE = 10;
export const FEATURED_POSTS_COUNT = 3;

export const ROUTES = {
  home: '/',
  posts: '/posts',
  contact: '/contact',
  post: (slug: string) => `/posts/${slug}`,
} as const;