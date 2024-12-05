import type { Metadata } from "next";
import "./assets/css/globals.css";

export const metadata: Metadata = {
  title: "Devipriya & Sreeharsh's Wedding",
  description: "Devipriya Weds Sreeharsh - January 19, 2025",
};

const name = '[Your Name]'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
