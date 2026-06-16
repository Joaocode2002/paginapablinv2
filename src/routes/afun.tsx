import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AlertTriangle } from "lucide-react";

const TelegramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);
import { Helmet } from "react-helmet-async";

const AFUN_PIXEL_ID = "2541286106305644";

export const Route = createFileRoute("/afun")({
  component: Afun,
});

function Afun() {
  const [loadingWpp, setLoadingWpp] = useState(false);

  useEffect(() => {
    const fbq = (window as any).fbq;
    if (typeof fbq === "function") {
      fbq("init", AFUN_PIXEL_ID);
      fbq("trackSingle", AFUN_PIXEL_ID, "PageView");
    }
  }, []);

  const handleWppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setLoadingWpp(true);

    const fbq = (window as any).fbq;
    if (typeof fbq === "function") {
      fbq("trackSingle", AFUN_PIXEL_ID, "Lead");
    }

    setTimeout(() => {
      setLoadingWpp(false);
      window.location.href = "https://t.me/bancasgratuitasbot";
    }, 800);
  };

  return (
    <div className="bg-black text-white selection:bg-brand-green selection:text-black">
      <Helmet>
        <title>Pablog - Banca Afun</title>
      </Helmet>
      
      <header className="fixed top-0 left-0 z-50 flex w-full items-center justify-center border-b border-white/10 bg-[#0f7a2e] px-4 py-3 text-center text-xs font-bold tracking-wide text-white">
        <span>ESTE SITE PODE CAIR A QUALQUER MOMENTO</span>
        <AlertTriangle className="ml-2 h-4 w-4 text-yellow-400 stroke-[3px]" />
      </header>

      <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-24 pb-20">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 brightness-[0.5] contrast-[1.1]" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1511193311914-0346f16efe90?q=80&w=2073&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/80" />

        <div className="relative z-10 flex w-full max-w-3xl flex-col items-center px-6 text-center">
          
          <div className="mb-10 space-y-6">
            <h1 className="font-bebas text-[clamp(2.5rem,8vw,5.5rem)] leading-[1] tracking-wider text-brand-green uppercase">
              Receba sua Banca
            </h1>
            
            <p className="max-w-xl mx-auto font-montserrat text-xl md:text-2xl leading-relaxed text-white font-medium">
              Para receber a banca, preciso que você <strong className="text-brand-green">crie a conta</strong> na plataforma abaixo e <strong className="text-brand-green">verifique sua conta</strong>.
            </p>
            
          </div>

          <div className="flex flex-col w-full max-w-md gap-4">
            <button
              onClick={handleWppClick}
              className="group relative inline-flex min-h-16 w-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl p-[2px] transition-all active:scale-[0.98] shadow-[0_0_20px_rgba(34,197,94,0.3)]"
            >
              <span className="absolute inset-[-200%] animate-border-rotate bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#22c55e_5%,transparent_10%,transparent_50%,#22c55e_55%,transparent_60%)]" />
              <span className="relative z-10 flex h-full w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-b from-[#00a300] to-[#006400] px-8 py-4 font-outfit text-xl font-bold text-white shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),inset_0_-2px_4px_rgba(0,0,0,0.3)]">
                {loadingWpp ? (
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <>
                    <TelegramIcon className="h-6 w-6" />
                    Receber banca
                  </>
                )}
              </span>
            </button>
          </div>
        </div>
      </main>
      
      <footer className="relative z-50 w-full bg-black py-10 px-4 flex flex-col items-center gap-4">
        <p className="text-[0.56rem] md:text-[0.7rem] uppercase tracking-[0.25em] text-foreground/45 text-center">
          © 2026 TODOS OS DIREITOS RESERVADOS.
        </p>
      </footer>
    </div>
  );
}
