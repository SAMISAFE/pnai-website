import './globals.css'
import Script from 'next/script'

export const metadata = {
  title: 'PNAI | AI Consulting — הזמן שלך יקר לנו',
  description: 'אנחנו עוזרים לעסקים קטנים ובינוניים בישראל לחסוך זמן בעזרת AI. ייעוץ, אוטומציה, צ׳אטבוטים ועוד.',
  keywords: 'AI, consulting, Israel, automation, chatbot, WhatsApp, ייעוץ, אוטומציה, בינה מלאכותית',
  openGraph: {
    title: 'PNAI | AI Consulting',
    description: 'הזמן שלך יקר לנו — ייעוץ והטמעת AI לעסקים',
    locale: 'he_IL',
    type: 'website',
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
      </head>
      <body>
        {children}
        <Script
          id="voiceflow-widget"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(d, t) {
                var v = d.createElement(t), s = d.getElementsByTagName(t)[0];
                v.onload = function() {
                  window.voiceflow.chat.load({
                    verify: { projectID: '69c4f33d1c4b150d1e9a8ed1' },
                    url: 'https://general-runtime.voiceflow.com',
                    versionID: 'production',
                    voice: {
                      url: "https://runtime-api.voiceflow.com"
                    }
                  });
                }
                v.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";
                v.type = "text/javascript";
                s.parentNode.insertBefore(v, s);
              })(document, 'script');
            `,
          }}
        />
      </body>
    </html>
  )
}
