import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { HiringPopup } from "@/components/hiring-popup";
import { WhatsAppButton } from "@/components/whatsapp-button";

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
    <>
      <Navigation />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <HiringPopup />
      <WhatsAppButton />
    </>
  );
}


