import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import NavBar from './NavBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Crystal - Intelligent Software Estimation',
  description: 'Empower your team with accurate project estimates and data-driven insights.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <UserProvider>
      <body className={inter.className}>
        <NavBar />
        {children}
      </body>
      </UserProvider>
    </html>
  );
}