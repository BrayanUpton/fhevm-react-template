import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { FhevmProvider } from '@/components/fhe/FHEProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FHEVM App - Privacy-Preserving dApp',
  description: 'Build confidential applications with FHEVM SDK',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FhevmProvider>
          {children}
        </FhevmProvider>
      </body>
    </html>
  );
}
