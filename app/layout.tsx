import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'VIEW-MEDIA | Professional LED & AV Solutions in Seoul, Korea',
  description: 'Trusted by global brands for conferences, concerts & events. LED screen rental, event production, AV equipment, and long-term rental services in Seoul, Korea.',
  keywords: 'LED rental Seoul, event production Korea, AV rental Seoul, conference equipment Korea, LED screen rental, K-pop concert production, MICE Korea, Seoul event company',
  authors: [{ name: 'VIEW-MEDIA' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://view-media.kr',
    title: 'VIEW-MEDIA | Professional LED & AV Solutions',
    description: 'Leading LED rental and event production company in Seoul, Korea',
    siteName: 'VIEW-MEDIA',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'VIEW-MEDIA - LED & Event Production',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VIEW-MEDIA | Professional LED & AV Solutions',
    description: 'Leading LED rental and event production company in Seoul, Korea',
    images: ['/og-image.jpg'],
  },
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Google Ads Tag */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17925811977"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17925811977');
            `,
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
