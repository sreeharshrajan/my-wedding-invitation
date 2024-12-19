import Head from 'next/head';

export function Seo() {
  const title = "Sreeharsh & Devipriya's Wedding";
  const description = "You are cordially invited to join us on the auspicious occasion of Sreeharsh and Devipriya's wedding on January 19, 2025.";
  const url = "https://sreeh-weds-devi.vercel.app";
  const imageUrl = `${url}/images/og-image.jpg`;

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={url} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      
      {/* Basic SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
    </Head>
  );
}