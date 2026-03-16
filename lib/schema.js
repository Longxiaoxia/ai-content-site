// Helper function for website schema
export function getWebsiteSchema(lang) {
  const names = {
    en: 'Algarve Travel Guide',
    pt: 'Guia de Viagem do Algarve'
  };
  const descriptions = {
    en: 'Your complete guide to the Algarve, Portugal with beaches, attractions, food, and travel tips.',
    pt: 'O seu guia completo do Algarve, Portugal com praias, atrações, gastronomia e dicas de viagem.'
  };
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: names[lang] || names.en,
    description: descriptions[lang] || descriptions.en,
    url: 'https://algarveguide.com',
    inLanguage: lang === 'pt' ? 'pt-PT' : 'en-US',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://algarveguide.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };
}

// Helper function for article schema
export function getArticleSchema(post, lang, url) {
  const langData = post[lang] || post.en;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: langData.title,
    description: langData.excerpt,
    image: post.cover,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: 'Algarve Travel Guide'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Algarve Travel Guide',
      logo: {
        '@type': 'ImageObject',
        url: 'https://algarveguide.com/icon.svg'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url
    },
    inLanguage: lang === 'pt' ? 'pt-PT' : 'en-US',
    keywords: post.tags?.join(', ') || '',
    articleSection: post.category
  };
}

// Helper function for breadcrumb schema
export function getBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}
