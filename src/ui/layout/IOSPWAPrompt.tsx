"use client";

import { useEffect, useState } from "react";

export default function IOSPWAPrompt() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ua = window.navigator.userAgent;

    const isIOS =
      /iPad|iPhone|iPod/.test(ua) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;

    const dismissed = localStorage.getItem("ios-pwa-dismissed");

    if (isIOS && !isStandalone && !dismissed) {
      setVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem("ios-pwa-dismissed", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/40 backdrop-blur-sm">
      <div className="animate-slide-up w-full rounded-t-3xl bg-white p-6 shadow-xl">
        <div className="mb-4 text-center">
          <div className="mb-8 flex justify-center">
            <img src="logo.png" alt="logo" className="w-32" />
          </div>
          <p className="mt-2 text-sm text-gray-600">
            وب‌اپلیکیشن SRCSX رو به صفحه اصلی موبایل اضافه کن
          </p>
        </div>

        <div className="mb-4 rounded-xl bg-gray-100 p-4 text-sm text-gray-700">
          <ol className="space-y-2">
            <li>
              <svg
                className="ml-2 inline-block"
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 0 24 24"
                width="24"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M16 5l-1.42 1.42-1.59-1.59V16h-1.98V4.83L9.42 6.42 8 5l4-4 4 4zm4 5v11c0 1.1-.9 2-2 2H6c-1.11 0-2-.9-2-2V10c0-1.11.89-2 2-2h3v2H6v11h12V10h-3V8h3c1.1 0 2 .89 2 2z" />
              </svg>
              روی دکمه <span className="font-medium">Share</span> در پایین
              بزنید.
            </li>
            <li>
              <svg
                className="ml-2 inline-block"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M7.007 12a.75.75 0 0 1 .75-.75h3.493V7.757a.75.75 0 0 1 1.5 0v3.493h3.493a.75.75 0 1 1 0 1.5H12.75v3.493a.75.75 0 0 1-1.5 0V12.75H7.757a.75.75 0 0 1-.75-.75" />
                <path
                  fill-rule="evenodd"
                  d="M7.317 3.769a42.5 42.5 0 0 1 9.366 0c1.827.204 3.302 1.643 3.516 3.48c.37 3.157.37 6.346 0 9.503c-.215 1.837-1.69 3.275-3.516 3.48a42.5 42.5 0 0 1-9.366 0c-1.827-.205-3.302-1.643-3.516-3.48a41 41 0 0 1 0-9.503c.214-1.837 1.69-3.276 3.516-3.48m9.2 1.49a41 41 0 0 0-9.034 0A2.486 2.486 0 0 0 5.29 7.424a39.4 39.4 0 0 0 0 9.154a2.486 2.486 0 0 0 2.193 2.164c2.977.332 6.057.332 9.034 0a2.486 2.486 0 0 0 2.192-2.164a39.4 39.4 0 0 0 0-9.154a2.486 2.486 0 0 0-2.192-2.163"
                  clip-rule="evenodd"
                />
              </svg>
              گزینه <span className="font-medium">Add to Home Screen</span> را
              انتخاب کنید.
            </li>
            <li>
              سپس روی <span className="font-medium">Add</span> بزنید.
            </li>
          </ol>
        </div>

        <button
          onClick={handleDismiss}
          className="w-full rounded-xl bg-gray-900 py-3 text-sm font-medium text-white transition hover:bg-black"
        >
          متوجه شدم
        </button>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
