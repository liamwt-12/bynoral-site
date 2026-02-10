import type { Metadata } from 'next';
import { Fraunces, Inter } from 'next/font/google';

import { Footer, Header, NoiseOverlay } from '../components';
import './globals.css';

const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  display: 'swap'
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Bynoral',
  description: 'Bynoral design system foundations'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${inter.variable} bg-background font-body text-text-primary antialiased`}>
        <div className="relative flex min-h-screen flex-col overflow-x-clip">
          <NoiseOverlay className="fixed inset-0 z-0" />
          <div className="relative z-10 flex min-h-screen flex-col">
            <Header />
            <main className="page-enter flex-1">{children}</main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
