import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Enquête école — Saisie et analyse",
  description: "Saisie synchronisée des questionnaires anonymes CEE, analyse des données et exports Excel.",
  robots: {index:false,follow:false},
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">{children}</body>
    </html>
  );
}
