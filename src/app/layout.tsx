import type { Metadata } from "next";
import "./globals.css";
import "./default_theme.css";

export const metadata: Metadata = {
  title: "Bastien Agullo — Portfolio",
  description: "UX Designer based in Montreal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}