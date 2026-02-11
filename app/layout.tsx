import type { Metadata } from 'next';
import { Fraunces, Inter } from 'next/font/google';

import { Footer, Header } from '../components';
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
      <body className={`${fraunces.variable} ${inter.variable} bg-[#0F1115] font-body text-[#E8ECF3] antialiased`}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="page-enter flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
