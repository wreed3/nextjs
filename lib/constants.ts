import { SiteConfig } from '@/types';

export const SITE_CONFIG: SiteConfig = {
  siteName: 'Next.js Blog',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  siteDescription:
    'A modern blog built with Next.js, featuring articles about web development, JavaScript, and more.',
  author: {
    name: 'Your Name',
    email: 'your.email@example.com',
    image: '/images/site/max.png',
  },
  social: {
    twitter: 'https://twitter.com/yourusername',
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
  },
};

export const POSTS_PER_PAGE = 9;
export const FEATURED_POSTS_COUNT = 3;

export const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'contact@example.com';

export const MONGODB_URI = process.env.MONGODB_URI || '';
export const MONGODB_DB = process.env.MONGODB_DB || 'blog';