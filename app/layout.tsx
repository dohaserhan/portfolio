import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "../components/Navbar";

const satoshi = localFont({
  src: [
    {
      path: "../public/fonts/Satoshi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
});

export const metadata: Metadata = {
  title: "Doha Serhan | Full Stack Web Developer",
  description:
    "Portfolio of Doha Serhan - Full Stack Web Developer specializing in building scalable backend systems with Laravel & Django, and modern web applications with Next.js & React.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${satoshi.variable} h-full antialiased`}>
      <body className={`${satoshi.className} min-h-full flex flex-col`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}

