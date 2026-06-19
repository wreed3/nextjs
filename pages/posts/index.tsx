import { Fragment } from 'react';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import AllPosts from '@/components/posts/all-posts';
import { getAllPosts } from '@/lib/posts-util';
import { SITE_CONFIG } from '@/lib/constants';
import type { Post } from '@/types';

interface AllPostsPageProps {
  posts: Post[];
}

export default function AllPostsPage({ posts }: AllPostsPageProps) {
  return (
    <Fragment>
      <Head>
        <title>All Posts - {SITE_CONFIG.name}</title>
        <meta
          name="description"
          content="Browse all blog posts about web development, JavaScript, React, and more."
        />
        <meta property="og:title" content={`All Posts - ${SITE_CONFIG.name}`} />
        <meta
          property="og:description"
          content="Browse all blog posts about web development, JavaScript, React, and more."
        />
        <meta property="og:url" content={`${SITE_CONFIG.url}/posts`} />
      </Head>
      <AllPosts posts={posts} />
    </Fragment>
  );
}

export const getStaticProps: GetStaticProps<AllPostsPageProps> = async () => {
  const allPosts = getAllPosts();

  return {
    props: {
      posts: allPosts,
    },
    revalidate: 3600,
  };
};