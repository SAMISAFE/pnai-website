import './globals.css'

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
      <body>{children}</body>
    </html>
  )
}
