import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { Post, PostMetadata } from '@/types';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getPostsFiles(): string[] {
  return fs.readdirSync(postsDirectory);
}

export function getPostData(postIdentifier: string): Post {
  const postSlug = postIdentifier.replace(/\.md$/, '');
  const filePath = path.join(postsDirectory, `${postSlug}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  const stats = readingTime(content);

  const postData: Post = {
    slug: postSlug,
    title: data.title,
    date: data.date,
    image: data.image,
    excerpt: data.excerpt,
    isFeatured: data.isFeatured || false,
    content,
    readingTime: stats.text,
  };

  return postData;
}

export function getAllPosts(): Post[] {
  const postFiles = getPostsFiles();

  const allPosts = postFiles.map((postFile) => {
    return getPostData(postFile);
  });

  const sortedPosts = allPosts.sort((postA, postB) =>
    postA.date > postB.date ? -1 : 1
  );

  return sortedPosts;
}

export function getFeaturedPosts(): Post[] {
  const allPosts = getAllPosts();
  const featuredPosts = allPosts.filter((post) => post.isFeatured);
  return featuredPosts;
}

export function getPostSlugs(): string[] {
  const postFiles = getPostsFiles();
  return postFiles.map((file) => file.replace(/\.md$/, ''));
}

export function getPostMetadata(slug: string): PostMetadata {
  const post = getPostData(slug);
  return {
    title: post.title,
    date: post.date,
    image: post.image,
    excerpt: post.excerpt,
    isFeatured: post.isFeatured,
    slug: post.slug,
  };
}