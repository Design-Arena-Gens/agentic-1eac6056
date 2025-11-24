import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Norway Stocker Jobs | Agentic Logistics Careers",
  description:
    "Curated warehouse, retail, and automation stocker jobs across Norway with salary insights, shift transparency, and relocation support.",
  metadataBase: new URL("https://agentic-1eac6056.vercel.app"),
  openGraph: {
    title: "Norway Stocker Jobs | Agentic Logistics Careers",
    description:
      "Explore vetted stocker openings in Oslo, Bergen, Stavanger, Trondheim, and beyond with relocation resources tailored to international talent.",
    url: "https://agentic-1eac6056.vercel.app",
    siteName: "Agentic Logistics Careers",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Norway Stocker Jobs | Agentic Logistics Careers",
    description:
      "Discover high-demand stocker roles in Norway plus relocation and interview guidance.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
