import "./globals.css";
import { Suspense } from "react";
import type { Metadata } from "next";
import ProgressBar from "@/components/layout/ProgressBar";
import SRCSXSimpleNav from "@/components/layout/SRCSXSimpleNavigation";
import { PageTourRenderer } from "@/components/layout/PageTourRenderer";
import { Flip, ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "SRCSX - پلتفرم جامع",
  description: "SRCSX - پلتفرم جامع",
  icons: [
    {
      url: "/icon.svg",
      rel: "icon",
      type: "image/svg",
    },
    {
      rel: "apple-touch-icon",
      url: "/icon.png",
    },
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    startupImage: [
      {
        url: "/icon.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa">
      <body
        dir="rtl"
        className={`bg-white px-4 py-8 pb-12 font-main dark:bg-myBlack md:px-8`}
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
        </Suspense>
      </body>
    </html>
  );
}
