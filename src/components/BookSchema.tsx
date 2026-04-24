import { FAQ_ITEMS } from './FAQ';

interface BookSchemaProps {
  siteUrl: string;
}

export function BookSchema({ siteUrl }: BookSchemaProps) {
  const bookSchema = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    '@id': `${siteUrl}#book`,
    name: "The Developer's Guide to AI: From Prompts to Agents",
    alternateName: "The Developer's Guide to AI",
    url: siteUrl,
    image: `${siteUrl}/book-cover.png`,
    description:
      'A hands-on field guide for developers building real AI systems. Covers LLMs, prompt engineering, vector databases, retrieval-augmented generation, fine-tuning, and autonomous agents.',
    author: [
      {
        '@type': 'Person',
        name: 'Jacob Orshalick',
        url: 'https://focus.dev',
        sameAs: ['https://www.linkedin.com/in/jorshalick/'],
      },
      {
        '@type': 'Person',
        name: 'Jerry M. Reghunadh',
        url: 'https://jerrymannel.me',
        sameAs: ['https://twitter.com/jerrymannel'],
      },
      {
        '@type': 'Person',
        name: 'Danny Thompson',
        url: 'https://dthompsondev.com',
        sameAs: [
          'https://twitter.com/DThompsonDev',
          'https://www.linkedin.com/in/dannythompson901/',
          'https://github.com/DThompsonDev'
        ],
      },
    ],
    publisher: {
      '@type': 'Organization',
      name: 'No Starch Press',
      url: 'https://nostarch.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://nostarch.com/sites/default/files/logo.png',
      },
    },
    inLanguage: 'en',
    datePublished: '2026',
    numberOfPages: 304,
    bookFormat: 'https://schema.org/Paperback',
    isbn: '978-1-7185-0476-9',
    workExample: [
      {
        '@type': 'Book',
        '@id': `${siteUrl}#paperback`,
        bookFormat: 'https://schema.org/Paperback',
        isbn: '978-1-7185-0476-9',
        potentialAction: {
          '@type': 'ReadAction',
          target: `${siteUrl}#retailers`,
        },
      },
      {
        '@type': 'Book',
        '@id': `${siteUrl}#ebook`,
        bookFormat: 'https://schema.org/EBook',
        isbn: '978-1-7185-0477-6',
        potentialAction: {
          '@type': 'ReadAction',
          target: `${siteUrl}#retailers`,
        },
      },
    ],
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: '39.99',
      highPrice: '49.95',
      priceCurrency: 'USD',
      offerCount: 3,
      offers: [
        {
          '@type': 'Offer',
          url: 'https://nostarch.com',
          price: '49.95',
          priceCurrency: 'USD',
          seller: { '@type': 'Organization', name: 'No Starch Press' }
        },
        {
          '@type': 'Offer',
          url: 'https://amazon.com',
          price: '39.99',
          priceCurrency: 'USD',
          seller: { '@type': 'Organization', name: 'Amazon' }
        }
      ]
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '128',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
    ],
  };

  const webpageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: "The Developer's Guide to AI: From Prompts to Agents",
    url: siteUrl,
    about: [
      { '@type': 'Thing', name: 'Large Language Models' },
      { '@type': 'Thing', name: 'Prompt Engineering' },
      { '@type': 'Thing', name: 'Vector Databases' },
      { '@type': 'Thing', name: 'Retrieval-Augmented Generation' },
      { '@type': 'Thing', name: 'Autonomous Agents' }
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bookSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
