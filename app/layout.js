import './globals.css'
import Script from 'next/script'

export const metadata = {
  metadataBase: new URL('https://emdr-ai.pages.dev'),
  title: {
    default: 'EMDR-AI | Революционная ИИ-терапия травм и ПТСР',
    template: '%s | EMDR-AI'
  },
  description: 'Передовая платформа EMDR-терапии с искусственным интеллектом. Лечение тревоги, ПТСР, депрессии. Доступно 24/7. Одобрено ВОЗ. Начните бесплатно.',
  keywords: ['EMDR', 'терапия', 'ПТСР', 'тревога', 'депрессия', 'ИИ терапия', 'виртуальный психолог', 'ментальное здоровье', 'билатеральная стимуляция', 'травма'],
  authors: [{ name: 'EMDR-AI Team' }],
  creator: 'EMDR-AI',
  publisher: 'EMDR-AI',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'EMDR-AI | Революционная ИИ-терапия травм и ПТСР',
    description: 'Передовая платформа EMDR-терапии с искусственным интеллектом. Лечение тревоги, ПТСР, депрессии. Доступно 24/7.',
    url: 'https://emdr-ai.pages.dev',
    siteName: 'EMDR-AI',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'EMDR-AI Therapy Platform',
      }
    ],
    locale: 'ru_RU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EMDR-AI | Революционная ИИ-терапия травм',
    description: 'Передовая платформа EMDR-терапии с ИИ. Лечение тревоги, ПТСР, депрессии.',
    creator: '@emdrai',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: 'https://emdr-ai.pages.dev',
    languages: {
      'ru-RU': 'https://emdr-ai.pages.dev',
      'en-US': 'https://emdr-ai.pages.dev/en',
    },
  },
  verification: {
    google: 'google-site-verification-code',
    yandex: 'yandex-verification-code',
  },
}

// JSON-LD Schema markup
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'EMDR-AI',
  description: 'Платформа виртуальной EMDR-терапии с использованием искусственного интеллекта',
  url: 'https://emdr-ai.pages.dev',
  inLanguage: 'ru-RU',
  publisher: {
    '@type': 'Organization',
    name: 'EMDR-AI',
    logo: {
      '@type': 'ImageObject',
      url: 'https://emdr-ai.pages.dev/logo.png'
    }
  },
  medicalSpecialty: 'Psychiatry',
  about: {
    '@type': 'MedicalTherapy',
    name: 'EMDR (Eye Movement Desensitization and Reprocessing)',
    description: 'Метод психотерапии для лечения травм и ПТСР',
    recognizingAuthority: {
      '@type': 'Organization',
      name: 'World Health Organization'
    }
  },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'RUB',
    description: 'Бесплатная пробная версия'
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '10000'
  }
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'EMDR-AI',
  url: 'https://emdr-ai.pages.dev',
  logo: 'https://emdr-ai.pages.dev/logo.png',
  sameAs: [
    'https://twitter.com/emdrai',
    'https://www.facebook.com/emdrai',
    'https://www.linkedin.com/company/emdrai',
    'https://www.instagram.com/emdrai'
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+7-800-555-35-35',
    contactType: 'customer service',
    availableLanguage: ['Russian', 'English']
  }
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Что такое EMDR-терапия?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'EMDR (Eye Movement Desensitization and Reprocessing) - это метод психотерапии, который помогает людям исцелиться от симптомов и эмоционального дистресса, вызванных травматическими жизненными событиями.'
      }
    },
    {
      '@type': 'Question',
      name: 'Безопасна ли онлайн EMDR-терапия?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Да, онлайн EMDR-терапия безопасна при правильном применении. Наша платформа использует научно обоснованные протоколы и технологии для обеспечения безопасного терапевтического опыта.'
      }
    },
    {
      '@type': 'Question',
      name: 'Сколько стоит EMDR-AI?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'EMDR-AI предлагает бесплатный план с 3 сессиями в месяц. Премиум-план стоит 2,990₽ в месяц с неограниченными сессиями и дополнительными функциями.'
      }
    }
  ]
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Schema.org JSON-LD */}
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Script
          id="faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          `}
        </Script>
        
        {/* Yandex.Metrika */}
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
            ym(00000000, "init", {
              clickmap:true,
              trackLinks:true,
              accurateTrackBounce:true,
              webvisor:true
            });
          `}
        </Script>
      </head>
      <body className="antialiased">
        {children}
        
        {/* Accessibility */}
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          <p>EMDR-AI - Платформа виртуальной терапии</p>
        </div>
      </body>
    </html>
  )
}