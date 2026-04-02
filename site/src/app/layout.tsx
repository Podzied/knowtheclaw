import type { Metadata } from "next";
import { Source_Sans_3, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
  weight: "400",
  style: "italic",
});

export const metadata: Metadata = {
  title: "KnowTheClaw — OpenClaw, Explained",
  description:
    "KnowTheClaw explains what OpenClaw is and how it works — in plain English. The open-source AI agent that runs locally and handles real work through the apps you already use.",
  metadataBase: new URL("https://knowtheclaw.com"),
  openGraph: {
    title: "KnowTheClaw — OpenClaw, Explained",
    description:
      "AI that acts, not just chats. The open-source agent that runs on your machine — explained with demos, architecture, and security guidance.",
    siteName: "KnowTheClaw",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KnowTheClaw — OpenClaw, Explained",
    description:
      "AI that acts, not just chats. The open-source agent that runs on your machine — explained.",
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sourceSans.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
