import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { Metadata } from "next";
import { LoaderProvider } from "@/components/LoaderProvider";
import { NavigationLoader } from "@/components/NavigationLoader";

import Loading from "@/components/Loading";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "Sreeharsh & Devipriya's Wedding";
const description =
  "You are cordially invited to join us on the auspicious occasion of Sreeharsh and Devipriya's wedding on January 19, 2025.";
const url = "https://sreeh-weds-devi.vercel.app";
const imageUrl = `${url}/prewed-5.jpg`;

export const metadata = {
  title: title,
  description: description,
  metadataBase: new URL(url),
  openGraph: {
    title: title,
    description: description,
    url: url,
    siteName: title,
    images: [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: title,
    description: description,
    images: [imageUrl],
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  icons: {
    icon: "/favicon.ico",
  },
  alternates: {
    canonical: url,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LoaderProvider>
          <NavigationLoader />
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </LoaderProvider>
      </body>
    </html>
  );
}
