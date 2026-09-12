import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fydnex",
  description: "A full-funnel campaign marketplace for brands and creators",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
