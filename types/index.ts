export interface PostMetadata {
  title: string;
  date: string;
  image: string;
  excerpt: string;
  slug: string;
  isFeatured?: boolean;
}

export interface Post extends PostMetadata {
  content: string;
}

export interface ContactFormData {
  email: string;
  name: string;
  message: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export interface NotificationData {
  title: string;
  message: string;
  status: 'success' | 'error' | 'pending';
}

export type Theme = 'light' | 'dark';