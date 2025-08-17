import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";
import Background from "@/components/Background";

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: 'swap', // Better font loading performance
});

export const metadata: Metadata = {
  title: "Kongpop's Cosmic Portfolio",
  description: "A serene command-line interface inspired by the vastness of the cosmos.",
  keywords: ["terminal", "cosmic", "space", "command-line", "interface"],
  authors: [{ name: "Kongpop Pipatpusit" }],
  viewport: "width=device-width, initial-scale=1.0", // บังคับ desktop view
  themeColor: "#6B5B95", // Cosmic purple
  openGraph: {
    title: "Cosmic Terminal - Explore the Universe",
    description: "Experience the vastness of the cosmos through your terminal interface.",
    type: "website",
    locale: "en_US",
    images: '/image.png', // <-- path ไปยังรูปในโฟลเดอร์ public
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preload critical fonts */}
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        
        {/* Ocean-themed favicon and icons */}
        <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%234ECDC4'/%3E%3Cpath d='M20,60 Q30,50 40,60 T60,60 Q70,50 80,60 v20 Q70,70 60,80 T40,80 Q30,70 20,80 Z' fill='%23fff' opacity='0.8'/%3E%3C/svg%3E" />
        
        {/* Performance optimizations */}
        <meta name="color-scheme" content="dark light" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body 
        className={`${robotoMono.variable} font-mono antialiased min-h-screen overflow-x-hidden`}
        style={{
          // Prevent flash of unstyled content
          background: 'linear-gradient(135deg, #0B1426 0%, #1B2951 50%, #2C3E50 100%)',
        }}
      >
        {/* Ocean Background with all animated elements */}
        <Background />
        
        {/* Main content with ocean-themed wrapper */}
        <div className="relative z-10 min-h-screen">
          {/* Ambient ocean sounds trigger (could be enhanced with audio) */}
          <div 
            className="fixed top-4 right-4 w-3 h-3 bg-primary rounded-full animate-breathe opacity-60 z-50"
            title="Ocean ambience indicator"
            role="status"
            aria-label="Ocean theme active"
          />
          
        {/* Content wrapper - removed blur for clear beach view */}
        <div className="min-h-screen">
          <main className="relative">
            {children}
          </main>
        </div>
          
          {/* Subtle bottom wave indicator */}
          <div className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-shimmer opacity-30 pointer-events-none" />
        </div>
        
        {/* Accessibility enhancements */}
        <div className="sr-only" role="status" aria-live="polite">
          Ocean Terminal loaded. A peaceful command-line interface awaits.
        </div>
      </body>
    </html>
  );
}