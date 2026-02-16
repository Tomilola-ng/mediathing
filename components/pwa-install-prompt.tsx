"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { DownloadIcon, XIcon } from "lucide-react";

const PWA_DISMISSED_KEY = "pwa-install-dismissed";

export function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Already installed or previously dismissed
    const isStandalone =
      typeof window !== "undefined" &&
      (window.matchMedia("(display-mode: standalone)").matches ||
        (window.navigator as Navigator & { standalone?: boolean }).standalone);

    const dismissed = typeof window !== "undefined" && localStorage.getItem(PWA_DISMISSED_KEY);

    if (isStandalone || dismissed) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setIsVisible(false);
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    setDeferredPrompt(null);
    if (typeof window !== "undefined") {
      localStorage.setItem(PWA_DISMISSED_KEY, Date.now().toString());
    }
  };

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-label="Install MediaThing"
      className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-lg rounded-lg border border-border bg-background p-4 shadow-lg sm:left-auto sm:right-4"
    >
      <div className="flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary/10">
          <img
            src="/favicon_io/android-chrome-192x192.png"
            alt=""
            className="size-8"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium">Install MediaThing</p>
          <p className="text-muted-foreground mt-0.5 text-xs">
            Add to your home screen for quick access and offline use.
          </p>
          <div className="mt-3 flex gap-2">
            <Button size="sm" onClick={handleInstall}>
              <DownloadIcon className="size-3.5" />
              Install
            </Button>
            <Button size="sm" variant="ghost" onClick={handleDismiss}>
              Not now
            </Button>
          </div>
        </div>
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Close"
          className="text-muted-foreground hover:text-foreground -m-1 rounded p-1 transition-colors"
        >
          <XIcon className="size-4" />
        </button>
      </div>
    </div>
  );
}
