import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import {
  Montserrat,
  Chango,
  Anton,
  Antic_Didone,
  Archivo_Black,
  Rowdies,
  Alfa_Slab_One,
  Luckiest_Guy,
} from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "@/components/theme-provider";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "800"],
  display: "swap",
  variable: "--font-montserrat",
});

const siteConfig = {
  title: process.env.NEXT_PUBLIC_TITLE,
  description: process.env.NEXT_PUBLIC_DESCRIPTION,
  generator: process.env.NEXT_PUBLIC_GENERATOR,
  name: "Ganamos.io",
  url: "https://ganamos.io/home", // URL de producción
  ogImage: "https://ganamos.io/icons/safari-pinned-tab.svg",
  favicon: "https://ganamos.io/favicon.ico",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title || "Ganamos",
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,

  // Favicons y icons (usando los públicos de Ganamos.io)
  icons: {
    icon: [
      { url: "https://ganamos.io/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "https://ganamos.io/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "https://ganamos.io/icons/favicon.ico",
    apple: [
      { url: "https://ganamos.io/icons/apple-touch-icon-57x57.png", sizes: "57x57" },
      { url: "https://ganamos.io/icons/apple-touch-icon-60x60.png", sizes: "60x60" },
      { url: "https://ganamos.io/icons/apple-touch-icon-72x72.png", sizes: "72x72" },
      { url: "https://ganamos.io/icons/apple-touch-icon-76x76.png", sizes: "76x76" },
      { url: "https://ganamos.io/icons/apple-touch-icon-114x114.png", sizes: "114x114" },
      { url: "https://ganamos.io/icons/apple-touch-icon-120x120.png", sizes: "120x120" },
      { url: "https://ganamos.io/icons/apple-touch-icon-144x144.png", sizes: "144x144" },
      { url: "https://ganamos.io/icons/apple-touch-icon-152x152.png", sizes: "152x152" },
      { url: "https://ganamos.io/icons/apple-touch-icon-180x180.png", sizes: "180x180" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "https://ganamos.io/icons/safari-pinned-tab.svg",
        color: "#000000",
      },
    ],
  },

  // Open Graph
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
    locale: "es_AR",
    type: "website",
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${montserrat.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={montserrat.className}>
        <Script
          id="fb-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !(function (f, b, e, v, n, t, s) {
                if (f.fbq) return;
                n = f.fbq = function () {
                  n.callMethod
                    ? n.callMethod.apply(n, arguments)
                    : n.queue.push(arguments);
                };
                if (!f._fbq) f._fbq = n;
                n.push = n;
                n.loaded = !0;
                n.version = "2.0";
                n.queue = [];
                t = b.createElement(e);
                t.async = !0;
                t.src = v;
                s = b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t, s);
              })(
                window,
                document,
                "script",
                "https://connect.facebook.net/en_US/fbevents.js"
              );
              fbq("init", "${process.env.NEXT_PUBLIC_META_PIXEL_ID}");
              fbq("track", "PageView");
            `,
          }}
        />
        <Script
          id="lead-event"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('DOMContentLoaded', function() {
                const button = document.getElementById("cta-button");
                if (button) {
                  console.log("Botón CTA encontrado");
                  button.addEventListener("click", function () {
                    if (typeof window.fbq === 'function') {
                      window.fbq("track", "StartTrial", {
                        content_name: "Botón CTA",
                        value: 0,
                        currency: "USD",
                      });
                    }
                  });
                } else {
                  console.log("No se encontró el botón CTA");
                }
              });
            `,
          }}
        />
        {children}
      </body>
    </html>
  );
}
