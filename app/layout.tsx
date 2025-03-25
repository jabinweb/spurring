import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { HiringPopup } from "@/components/hiring-popup";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Spurring Ventures India - AI Development Services',
  description: 'Leading AI development and consulting services in India. We specialize in generative AI, smart assistants, data mining, and AI integration solutions.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navigation />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <HiringPopup />
        </ThemeProvider>
      </body>
    </html>
  );
}


