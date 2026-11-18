import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CartProvider } from '@/context/CartContext';

export const metadata: Metadata = {
  title: 'Chocolate Shop | Luxury Artisan Chocolatier in Dubai (AED)',
  description: 'Handcrafted luxury chocolate truffles, pistachio kunafa bonbons, and 24K gold confections. Express delivery across the United Arab Emirates.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#140905] text-[#FDF8F0] antialiased selection:bg-[#D4AF37] selection:text-[#140905]">
        <CartProvider>
          <div className="flex min-h-screen flex-col justify-between">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
