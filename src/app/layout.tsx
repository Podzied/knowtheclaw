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
