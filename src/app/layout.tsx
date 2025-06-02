import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"], // On peut choisir différents poids si nécessaire
  variable: "--font-poppins", // Optionnel, pour utiliser via CSS variables
});

export const metadata: Metadata = {
  title: "Portfolio Développeur Créatif",
  description: "Portfolio créatif d'un développeur utilisant Three.js et Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <body className={`${poppins.className} bg-black text-white min-h-screen`}>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
