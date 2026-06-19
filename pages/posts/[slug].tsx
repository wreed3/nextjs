import { Fragment } from 'react';
import Head from 'next/head';
import { GetStaticProps, GetStaticPaths } from 'next';
import PostContent from '@/components/posts/post-detail/post-content';
import { getPostData, getAllPostSlugs } from '@/lib/posts-util';
import { SITE_CONFIG } from '@/lib/constants';
import type { Post } from '@/types';

interface PostDetailPageProps {
  post: Post;
}

export default function PostDetailPage({ post }: PostDetailPageProps) {
  const pageUrl = `${SITE_CONFIG.url}/posts/${post.slug}`;
  const imageUrl = post.image.startsWith('http')
    ? post.image
    : `${SITE_CONFIG.url}${post.image}`;

  return (
    <Fragment>
      <Head>
        <title>{post.title} - {SITE_CONFIG.name}</title>
        <meta name="description" content={post.excerpt} />
        
        {/* Open Graph */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.date} />
        
        {/* Twitter Card */}
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={imageUrl} />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              headline: post.title,
              description: post.excerpt,
              image: imageUrl,
              datePublished: post.date,
              author: {
                '@type': 'Person',
                name: SITE_CONFIG.author.name,
              },
              publisher: {
                '@type': 'Organization',
                name: SITE_CONFIG.name,
                logo: {
                  '@type': 'ImageObject',
                  url: `${SITE_CONFIG.url}/images/site/max.png`,
                },
              },
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': pageUrl,
              },
            }),
          }}
        />
      </Head>
      <PostContent post={post} />
    </Fragment>
  );
}

export const getStaticProps: GetStaticProps<
  PostDetailPageProps,
  { slug: string }
> = async (context) => {
  const { slug } = context.params!;

  try {
    const postData = getPostData(slug);

    return {
      props: {
        post: postData,
      },
      revalidate: 3600,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getAllPostSlugs();
  const paths = slugs.map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: 'blocking',
  };
};