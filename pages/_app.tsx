import type { AppProps } from 'next/app';
import Head from 'next/head';
import Layout from '@/components/layout/layout';
import { SITE_CONFIG } from '@/lib/constants';
import '@/styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={SITE_CONFIG.description} />
        <meta name="author" content={SITE_CONFIG.author.name} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}