import './globals.css'
import Script from 'next/script'

export const metadata = {
  metadataBase: new URL('https://pnai.ai'),
  title: 'PNAI — ייעוץ והטמעת AI לעסקים קטנים ובינוניים בישראל',
  description: 'חוסכים לעסקים קטנים ובינוניים בישראל שעות עבודה בשבוע עם אוטומציה, צ׳אטבוטים ל-WhatsApp, וייעוץ AI מותאם אישית. שיחת היכרות בחינם.',
  alternates: {
    canonical: 'https://pnai.ai',
  },
  openGraph: {
    title: 'PNAI — ייעוץ והטמעת AI לעסקים בישראל',
    description: 'אוטומציה, צ׳אטבוטים ל-WhatsApp, וייעוץ AI מותאם אישית לעסקים קטנים ובינוניים. חוסכים לך זמן כדי שתוכל לצמוח.',
    url: 'https://pnai.ai',
    siteName: 'PNAI',
    locale: 'he_IL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PNAI — ייעוץ והטמעת AI לעסקים בישראל',
    description: 'אוטומציה, צ׳אטבוטים ל-WhatsApp, וייעוץ AI מותאם אישית לעסקים קטנים ובינוניים.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;700&display=swap" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0A0F0E" />
        <Script
          id="respondio__widget"
          src="https://cdn.respond.io/webchat/widget/widget.js?cId=056ce2f03cb36ea4198c7438a284b33"
          strategy="afterInteractive"
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://pnai.ai/#organization",
                  "name": "PNAI",
                  "url": "https://pnai.ai",
                  "description": "ייעוץ והטמעת AI לעסקים קטנים ובינוניים בישראל",
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "contactType": "customer service",
                    "availableLanguage": ["Hebrew", "Arabic", "English"],
                  },
                },
                {
                  "@type": "WebSite",
                  "@id": "https://pnai.ai/#website",
                  "url": "https://pnai.ai",
                  "name": "PNAI",
                  "publisher": { "@id": "https://pnai.ai/#organization" },
                  "inLanguage": "he-IL",
                },
                {
                  "@type": "WebPage",
                  "@id": "https://pnai.ai/#webpage",
                  "url": "https://pnai.ai",
                  "name": "PNAI — ייעוץ והטמעת AI לעסקים קטנים ובינוניים בישראל",
                  "isPartOf": { "@id": "https://pnai.ai/#website" },
                  "about": { "@id": "https://pnai.ai/#organization" },
                  "inLanguage": "he-IL",
                },
                {
                  "@type": "Service",
                  "serviceType": "AI Consulting & Automation",
                  "provider": { "@id": "https://pnai.ai/#organization" },
                  "areaServed": {
                    "@type": "Country",
                    "name": "Israel",
                  },
                  "description": "אבחון AI, אוטומציה של תהליכים עסקיים, צ׳אטבוטים ל-WhatsApp, והטמעת פתרונות AI מותאמים אישית לעסקים קטנים ובינוניים",
                },
                {
                  "@type": "FAQPage",
                  "mainEntity": [
                    {
                      "@type": "Question",
                      "name": "אני לא מבין בטכנולוגיה. זה מתאים לי?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "בהחלט. אנחנו מטפלים בכל החלק הטכני. אתה רק צריך להסביר לנו איך העסק שלך עובד — ואנחנו נעשה את השאר.",
                      },
                    },
                    {
                      "@type": "Question",
                      "name": "כמה זמן לוקח להטמיע פתרון AI?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "תלוי במורכבות, אבל רוב הפתרונות שלנו עובדים תוך 1-3 שבועות. פתרונות פשוטים כמו צ׳אטבוט יכולים לעבוד תוך ימים.",
                      },
                    },
                    {
                      "@type": "Question",
                      "name": "מה קורה אם זה לא עובד?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "אנחנו לא נעלמים אחרי ההטמעה. יש תמיכה שוטפת, ואם משהו לא עובד — מתקנים עד שזה מושלם.",
                      },
                    },
                    {
                      "@type": "Question",
                      "name": "אתם עובדים עם כל סוגי העסקים?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "אנחנו מתמחים בעסקים קטנים ובינוניים בישראל — חנויות, נותני שירות, סוכנויות, קליניקות, ועוד. אם יש לך עסק ואתה מרגיש שאתה טובע בעבודה ידנית — אנחנו בשבילך.",
                      },
                    },
                  ],
                },
              ],
            }),
          }}
        />
        {children}
      </body>
    </html>
  )
}
