import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  useLocation,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportHiggsfieldError } from "../lib/higgsfield-error-reporting";

declare global {
  interface Window {
    fbq?: (
      event: string,
      action?: string,
      params?: { value?: number; currency?: string } & Record<string, unknown>,
    ) => void;
  }
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportHiggsfieldError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Higgsfield App" },
      { name: "description", content: "Higgsfield Generated Project" },
      { name: "author", content: "Higgsfield" },
      { property: "og:title", content: "Higgsfield App" },
      { property: "og:description", content: "Higgsfield Generated Project" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Higgsfield" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function initializeMetaPixel() {
  if (typeof window === "undefined") return;
  if (window.fbq) return;

  /* eslint-disable */
  // @ts-ignore
  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
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
  })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
  /* eslint-enable */

  if (window.fbq) {
    window.fbq("init", "894010667065255");
  }
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const location = useLocation();

  const [consent, setConsent] = useState<string | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [showLearnMore, setShowLearnMore] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedConsent = localStorage.getItem("cookie-consent");
      setConsent(savedConsent);
      if (!savedConsent) {
        setShowBanner(true);
      } else if (savedConsent === "granted") {
        initializeMetaPixel();
      }
    }
  }, []);

  useEffect(() => {
    if (
      consent === "granted" &&
      typeof window !== "undefined" &&
      typeof window.fbq === "function"
    ) {
      window.fbq("track", "PageView");
    }
  }, [location.pathname, consent]);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "granted");
    setConsent("granted");
    setShowBanner(false);
    initializeMetaPixel();
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "denied");
    setConsent("denied");
    setShowBanner(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      {showBanner && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 max-w-lg w-[calc(100%-2rem)] z-50 bg-[#121214]/95 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl animate-fade-in flex flex-col gap-4 text-white font-sans antialiased">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 w-5 h-5 flex-shrink-0 flex items-center justify-center rounded-full bg-[#00D8FF]/10 border border-[#00D8FF]/30 text-[#00D8FF] text-xs font-bold font-mono">
              i
            </div>
            <div className="flex-1 flex flex-col gap-1.5 text-left">
              <h4 className="text-sm font-black uppercase tracking-wider text-white">
                Използване на бисквитки
              </h4>
              <p className="text-xs text-white/70 leading-relaxed font-medium">
                Ние използваме бисквитки, за да подобрим вашето изживяване на нашия сайт.
                Разрешаването им ни помага да анализираме трафика чрез Meta Pixel.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-2.5 mt-2">
            <button
              onClick={() => setShowLearnMore(!showLearnMore)}
              className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-white/60 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 transition-all cursor-pointer"
            >
              {showLearnMore ? "Скрий" : "Научи повече"}
            </button>
            <button
              onClick={handleAccept}
              className="px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-[#FF0F6A] to-[#8000FF] hover:from-[#ff2a7f] hover:to-[#9622ff] shadow-lg shadow-[#FF0F6A]/20 transition-all active:scale-95 cursor-pointer"
            >
              Разрешавам
            </button>
          </div>

          {showLearnMore && (
            <div className="mt-4 pt-4 border-t border-white/5 flex flex-col gap-3">
              <p className="text-[11px] text-white/50 leading-relaxed font-semibold text-left">
                Запознайте се с нашите политики:
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-bold text-white/80">
                <Link
                  to="/cookies"
                  className="hover:text-[#00D8FF] transition-colors underline"
                  onClick={() => setShowBanner(false)}
                >
                  Политика за бисквитки
                </Link>
                <Link
                  to="/privacy"
                  className="hover:text-[#00D8FF] transition-colors underline"
                  onClick={() => setShowBanner(false)}
                >
                  Поверителност
                </Link>
                <Link
                  to="/terms"
                  className="hover:text-[#00D8FF] transition-colors underline"
                  onClick={() => setShowBanner(false)}
                >
                  Общи условия
                </Link>
              </div>
              <button
                onClick={handleDecline}
                className="mt-2 w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/20 py-2.5 rounded-xl font-bold text-xs tracking-wider uppercase transition-all cursor-pointer text-center"
              >
                Отказвам бисквитките
              </button>
            </div>
          )}
        </div>
      )}
    </QueryClientProvider>
  );
}
