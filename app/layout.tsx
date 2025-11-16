// File: app/layout.tsx
import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css'; // Memuat CSS Anda
import { Header } from './components/Header'; // Impor Header baru
import { Footer } from './components/Footer'; // Impor Footer baru

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Website Resmi SMA Pasundan Majalaya',
  description: 'Terwujudnya Profil Murid Yang Berkarakter Nyantri, Nyakola, Dan Nyunda Menuju Gapura Panca Waluya',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} font-sans antialiased`}>
        <div className="flex flex-col min-h-screen">
          <Header />
          {/* Main content akan otomatis mengisi ruang */}
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}