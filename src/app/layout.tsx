import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chat App",
  description: "A simple chat app using Alby",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <div
          id="main-grid"
          className="grid grid-cols-4 gap-4 md:grid-cols-6 lg:grid-cols-12"
        >
          {children}
        </div>
      </body>
    </html>
  );
}
