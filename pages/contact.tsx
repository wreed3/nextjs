import { Fragment } from 'react';
import Head from 'next/head';
import ContactForm from '@/components/contact/contact-form';
import { SITE_CONFIG } from '@/lib/constants';

export default function ContactPage() {
  return (
    <Fragment>
      <Head>
        <title>Contact - {SITE_CONFIG.name}</title>
        <meta
          name="description"
          content="Get in touch with us. Send us a message and we'll get back to you."
        />
        <meta property="og:title" content={`Contact - ${SITE_CONFIG.name}`} />
        <meta
          property="og:description"
          content="Get in touch with us. Send us a message and we'll get back to you."
        />
        <meta property="og:url" content={`${SITE_CONFIG.url}/contact`} />
      </Head>
      <ContactForm />
    </Fragment>
  );
}