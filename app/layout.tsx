import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from './auth-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Spurring Ventures India - AI Development Company',
  description: 'Leading AI development and consulting services in India. We specialize in generative AI, data mining, and AI integration solutions.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <main className="min-h-screen">{children}</main>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}


