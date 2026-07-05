import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import ProtectionScript from "./components/ProtectionScript";
import Navbar from "./components/Navbar";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "MUJ Toppers",
  description:
    "Curated study materials, PYQs, notes, and resources for MUJ students - First Year, BBA, and BTech",
  robots: "index, follow",
  openGraph: {
    type: "website",
    title: "MUJ Toppers",
    description:
      "Curated study materials, PYQs, notes, and resources for MUJ students",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ff6a00",
};

const isDevelopment = process.env.NODE_ENV === "development";

const connectSrc = [
  "'self'",
  "https://www.googleapis.com",
  "https://drive.google.com",
  "https://docs.google.com",
  "https://mujtoppers.in",
  "https://*.mujtoppers.in",
  isDevelopment && "http://localhost:3000",
  "https://vitals.vercel-insights.com",
  "https://mujtoppers.in",
  "https://material.mujtoppers.in",
  "http://mujtoppers.in",
  "http://material.mujtoppers.in"
]
  .filter(Boolean)
  .join(" ");

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          httpEquiv="Content-Security-Policy"
          content={`
            default-src 'self';
            script-src 'self' 'unsafe-inline' 'unsafe-eval';
            style-src 'self' 'unsafe-inline';
            img-src 'self' data: blob:
              https://lh3.googleusercontent.com
              https://drive.google.com
              https://mujtoppers.in
              https://*.mujtoppers.in;
            font-src 'self' data:;
            connect-src ${connectSrc};
            frame-src 'self'
              https://drive.google.com
              https://docs.google.com
              https://mujtoppers.in
              https://*.mujtoppers.in;
            media-src 'self' blob:
              https://drive.google.com
              https://mujtoppers.in
              https://*.mujtoppers.in;
          `}
        />

        <link
          rel="preconnect"
          href="https://lh3.googleusercontent.com"
        />
        <link rel="preconnect" href="https://drive.google.com" />
        <link rel="preconnect" href="https://www.googleapis.com" />
        <link rel="preconnect" href="https://mujtoppers.in" />

        <link
          rel="dns-prefetch"
          href="https://lh3.googleusercontent.com"
        />
        <link rel="dns-prefetch" href="https://drive.google.com" />
        <link rel="dns-prefetch" href="https://www.googleapis.com" />
        <link rel="dns-prefetch" href="https://mujtoppers.in" />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased`}
      >
        <ProtectionScript />
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
