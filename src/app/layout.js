import "./globals.css";
import { Suspense } from "react";
import { Aleo } from "next/font/google";
import Loader from "@/components/ui/Loader";
import { LoaderProvider } from "@/providers/LoaderProvider";
import { NavigationLoader } from "@/components/ui/NavigationLoader";

const aleo = Aleo({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-aleo",
});

export const metadata = {
  title: "Sreeharsh & Devipriya's Wedding",
  description: "You are cordially invited to join us on the auspicious occasion of Sreeharsh and Devipriya's wedding on January 19, 2025.",
  icons: {
    icon: "/images/favicon.jpg",
  },
  openGraph: {
    title: "Sreeharsh & Devipriya's Wedding",
    description: "You are cordially invited to join us on the auspicious occasion of Sreeharsh and Devipriya's wedding on January 19, 2025.",
    url: "https://sreeh-weds-devi.vercel.app/",
    siteName: "Sreeharsh & Devipriya's Wedding",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sreeharsh & Devipriya's Wedding",
        type: "image/jpeg",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${aleo.variable}  antialiased`}
      >
        <LoaderProvider>
          <Suspense fallback={<Loader />}>
            <NavigationLoader />
            {children}
          </Suspense>
        </LoaderProvider>
      </body>
    </html >
  );
}

