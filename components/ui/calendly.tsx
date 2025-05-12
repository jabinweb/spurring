"use client"

import { useEffect } from "react"
import Script from "next/script"

declare global {
  interface Window {
    Calendly: any;
  }
}

interface CalendlyProps {
  url: string;
}

export function Calendly({ url }: CalendlyProps) {
  useEffect(() => {
    // Initialize Calendly when the component mounts
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url });
    }
  }, [url]);

  return (
    <>
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
      <link
        href="https://assets.calendly.com/assets/external/widget.css"
        rel="stylesheet"
      />
    </>
  );
}

export function openCalendly(url: string) {
  if (typeof window !== 'undefined' && window.Calendly) {
    window.Calendly.initPopupWidget({ url });
  }
}
