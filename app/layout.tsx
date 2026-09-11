import type { Metadata, Viewport } from "next";
import { Space_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-body",
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Saviour Bassey — Systems & Product",
  description:
    "First-Class CS graduate with real infrastructure experience and a track record of shaping technical work — from network operations to product interfaces — into something usable.",
  keywords: [
    "Saviour Bassey",
    "Systems Engineer",
    "Product Designer",
    "Infrastructure",
    "BayesVest",
    "TotalEnergies",
    "Lagos",
    "Nigeria",
  ],
  authors: [{ name: "Saviour Bassey" }],
  openGraph: {
    title: "Saviour Bassey — Systems & Product",
    description:
      "I build systems, then make them make sense. First-Class CS graduate with real infrastructure experience and a track record of shaping technical work into usable products.",
    type: "website",
    locale: "en_NG",
  },
};

export const viewport: Viewport = {
  themeColor: "#1C1712",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable} scroll-smooth`}
    >
      <body className="bg-[#1C1712] text-[#F2E9DC] font-body min-h-screen antialiased selection:bg-[#E8963C]/20 selection:text-[#E8963C]">
        {children}
      </body>
    </html>
  );
}
