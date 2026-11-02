import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Regards d’école — Saisie & analyses",
  description: "Saisissez les questionnaires anonymes de votre école en équipe. Analyses en français et export Excel complet.",
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
