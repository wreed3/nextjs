import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Post, PostMetadata } from '@/types';

const postsDirectory = path.join(process.cwd(), 'posts');

/**
 * Get all post files from the posts directory
 */
export function getPostFiles(): string[] {
  try {
    return fs.readdirSync(postsDirectory);
  } catch (error) {
    console.error('Error reading posts directory:', error);
    return [];
  }
}

/**
 * Extract post metadata from a markdown file
 */
export function getPostData(postIdentifier: string): Post {
  const postSlug = postIdentifier.replace(/\.md$/, '');
  const filePath = path.join(postsDirectory, `${postSlug}.md`);

  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    const postData: Post = {
      slug: postSlug,
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString(),
      image: data.image || '/images/default-post.png',
      excerpt: data.excerpt || '',
      isFeatured: data.isFeatured || false,
      content,
    };

    return postData;
  } catch (error) {
    console.error(`Error reading post file ${postSlug}:`, error);
    throw new Error(`Failed to load post: ${postSlug}`);
  }
}

/**
 * Get all posts sorted by date (newest first)
 */
export function getAllPosts(): Post[] {
  const postFiles = getPostFiles();

  const allPosts = postFiles
    .map((postFile) => {
      try {
        return getPostData(postFile);
      } catch (error) {
        console.error(`Error loading post ${postFile}:`, error);
        return null;
      }
    })
    .filter((post): post is Post => post !== null);

  return allPosts.sort((postA, postB) =>
    postA.date > postB.date ? -1 : 1
  );
}

/**
 * Get only featured posts
 */
export function getFeaturedPosts(): Post[] {
  const allPosts = getAllPosts();
  return allPosts.filter((post) => post.isFeatured);
}

/**
 * Get post metadata without content (for list views)
 */
export function getPostMetadata(postIdentifier: string): PostMetadata {
  const post = getPostData(postIdentifier);
  const { content, ...metadata } = post;
  return metadata;
}

/**
 * Get all post slugs for static path generation
 */
export function getAllPostSlugs(): string[] {
  const postFiles = getPostFiles();
  return postFiles.map((fileName) => fileName.replace(/\.md$/, ''));
}