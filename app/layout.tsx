import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/dom/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Surya | Full-Stack Developer & Digital Craftsman",
  description: "Full-Stack Developer crafting high-performance web solutions. National Finalist at Viksit Bharat 2026. Specializing in Next.js, WebGL, and AI-powered applications.",
  keywords: ["Full-Stack Developer", "Next.js", "WebGL", "React", "Portfolio"],
  authors: [{ name: "Surya" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
      >
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
