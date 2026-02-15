"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const COOKIE_CONSENT_KEY = "solceller-cookie-consent";

type ConsentStatus = "accepted" | "rejected" | null;

function getStoredConsent(): ConsentStatus {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (stored === "accepted" || stored === "rejected") return stored;
    return null;
  } catch {
    return null;
  }
}

function setStoredConsent(value: "accepted" | "rejected"): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(COOKIE_CONSENT_KEY, value);
  } catch {
    // ignore
  }
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const consent = getStoredConsent();
    setVisible(consent === null);
  }, [mounted]);

  const accept = () => {
    setStoredConsent("accepted");
    setVisible(false);
  };

  const reject = () => {
    setStoredConsent("rejected");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie-meddelande"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-stone-200 bg-white p-4 shadow-lg sm:left-4 sm:right-auto sm:bottom-4 sm:max-w-md sm:rounded-xl sm:border"
    >
      <p className="text-sm text-stone-700">
        Vi använder cookies för att förbättra webbplatsen och för analys av
        trafik och användning. Genom att klicka &quot;Acceptera&quot; godkänner du
        att vi använder cookies. Läs mer i vår{" "}
        <Link
          href="/integritet"
          className="font-medium text-yellow-600 underline hover:text-yellow-700"
        >
          integritetspolicy
        </Link>
        .
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={accept}
          className="rounded-lg bg-yellow-500 px-4 py-2 text-sm font-semibold text-stone-900 transition hover:bg-yellow-600"
        >
          Acceptera
        </button>
        <button
          type="button"
          onClick={reject}
          className="rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
        >
          Avvisa
        </button>
      </div>
    </div>
  );
}
