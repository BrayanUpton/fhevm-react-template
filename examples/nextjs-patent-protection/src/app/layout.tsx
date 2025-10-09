import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { FhevmContextProvider } from '@/components/FhevmProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Patent Protection System - FHEVM SDK Example',
  description: 'Privacy-preserving patent application system built with FHEVM SDK',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FhevmContextProvider>
          {children}
        </FhevmContextProvider>
      </body>
    </html>
  );
}
