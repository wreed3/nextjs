import { Fragment } from 'react';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import Hero from '@/components/home-page/hero';
import FeaturedPosts from '@/components/home-page/featured-posts';
import { getFeaturedPosts } from '@/lib/posts-util';
import { SITE_CONFIG } from '@/lib/constants';
import type { Post } from '@/types';

interface HomePageProps {
  posts: Post[];
}

export default function HomePage({ posts }: HomePageProps) {
  return (
    <Fragment>
      <Head>
        <title>{SITE_CONFIG.name}</title>
        <meta name="description" content={SITE_CONFIG.description} />
        <meta property="og:title" content={SITE_CONFIG.name} />
        <meta property="og:description" content={SITE_CONFIG.description} />
        <meta property="og:url" content={SITE_CONFIG.url} />
      </Head>
      <Hero />
      <FeaturedPosts posts={posts} />
    </Fragment>
  );
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const featuredPosts = getFeaturedPosts();

  return {
    props: {
      posts: featuredPosts,
    },
    revalidate: 3600, // Revalidate every hour
  };
};