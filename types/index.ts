export interface PostMetadata {
  title: string;
  date: string;
  image: string;
  excerpt: string;
  isFeatured: boolean;
  slug?: string;
}

export interface Post extends PostMetadata {
  slug: string;
  content: string;
  readingTime?: string;
}

export interface ContactFormData {
  email: string;
  name: string;
  message: string;
}

export interface ContactFormResponse {
  message: string;
  success?: boolean;
}

export interface NotificationData {
  title: string;
  message: string;
  status: 'success' | 'error' | 'pending';
}

export interface SiteConfig {
  siteName: string;
  siteUrl: string;
  siteDescription: string;
  author: {
    name: string;
    email: string;
    image: string;
  };
  social: {
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
}