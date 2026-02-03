"use client";
import { useEffect } from "react";

export default function Theme() {
  useEffect(() => {
    if (localStorage.theme === "light") {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }
  }, []);

  return <></>;
}
