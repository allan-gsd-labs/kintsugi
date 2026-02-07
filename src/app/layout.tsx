import './globals.css';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Inter, Space_Grotesk } from 'next/font/google';

const heading = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-heading',
});

const body = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://kintsugiband.com'),
  title: {
    default: 'Kintsugi | Modern Metalcore from Glasgow',
    template: '%s | Kintsugi',
  },
  description: 'Official site for Kintsugi. New music, tour dates, merch, and an electronic press kit.',
  keywords: ['Kintsugi', 'metalcore', 'Glasgow', 'band', 'heavy music', 'EPK'],
  openGraph: {
    title: 'Kintsugi | Official Site',
    description: 'Modern metalcore from Glasgow. New music, tour dates, merch, and EPK.',
    type: 'website',
    images: [
      {
        url: '/assets/main1-v2.jpg',
        width: 1200,
        height: 1200,
        alt: 'Kintsugi band photo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kintsugi | Official Site',
    description: 'Modern metalcore from Glasgow.',
    images: ['/assets/main1-v2.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body className="min-h-dvh bg-kbg text-kfg antialiased">{children}</body>
    </html>
  );
}
