import "./globals.css";
import { Suspense } from "react";
import type { Metadata } from "next";
import { Flip, ToastContainer } from "react-toastify";
import ProgressBar from "@/ui/layout/ProgressBar";
import SRCSXSimpleNav from "@/ui/layout/SRCSXSimpleNavigation";
import { PageTourRenderer } from "@/ui/layout/PageTourRenderer";
import Theme from "@/ui/layout/Theme";
import IOSPWAPrompt from "@/ui/layout/IOSPWAPrompt";

export const metadata: Metadata = {
  title: "SRCSX - پلتفرم جامع",
  description: "SRCSX - پلتفرم جامع",
  icons: {
    icon: [
      { url: "/icons/icon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/icons/icon-72.png", sizes: "72x72", type: "image/png" },
      { url: "/icons/icon-96.png", sizes: "96x96", type: "image/png" },
      { url: "/icons/icon-144.png", sizes: "144x144", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-256.png", sizes: "256x256", type: "image/png" },
      { url: "/icons/icon-384.png", sizes: "384x384", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/icons/apple-touch-icon.png",
  },

  manifest: "/manifest.json",

  applicationName: "SRCSX",

  appleWebApp: {
    capable: true,
    title: "SRCSX",
    statusBarStyle: "default",
  },

  other: { "apple-mobile-web-app-capable": "yes" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" className="dark">
      <head>
        <link
          rel="apple-touch-startup-image"
          href="/splash/iphone-se.png"
          media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)"
        />

        <link
          rel="apple-touch-startup-image"
          href="/splash/iphone-14.png"
          media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3)"
        />

        <link
          rel="apple-touch-startup-image"
          href="/splash/iphone-14-pro-max.png"
          media="(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3)"
        />

        <link
          rel="apple-touch-startup-image"
          href="/splash/ipad.png"
          media="(device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2)"
        />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
      </head>

      <body
        dir="rtl"
        className={`bg-white px-4 pb-20 pt-8 font-main dark:bg-myBlack md:px-8`}
      >
        <Suspense>
          {children}
          <ProgressBar />
          <SRCSXSimpleNav />
          <PageTourRenderer />
          <ToastContainer
            rtl
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            closeOnClick={false}
            pauseOnHover={true}
            draggable={true}
            transition={Flip}
          />
          <Theme />
          <IOSPWAPrompt />
        </Suspense>

        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 hidden bg-gradient-to-br from-[#0f1115] via-[#1a1c23] to-[#2c2f3a] dark:block"></div>
        </div>
      </body>
    </html>
  );
}
