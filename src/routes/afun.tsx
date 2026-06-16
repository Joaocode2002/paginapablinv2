import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AlertTriangle, ArrowRight, Lock } from "lucide-react";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413Z"/>
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
            
            <p className="max-w-xl mx-auto font-montserrat text-lg text-white/80">
              Após realizar o cadastro na plataforma e fazer toda a verificação, volte nesta página que o botão de contato estará ativo!
            </p>
          </div>

          <div className="flex flex-col w-full max-w-md gap-4">
            {/* Botão Afun */}
            <button 
              onClick={handleAfunClick}
              className="group relative inline-flex min-h-16 w-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl p-[2px] transition-all active:scale-[0.98] shadow-lg"
            >
              <span className="absolute inset-[-200%] animate-border-rotate bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,var(--color-brand-green)_5%,transparent_10%,transparent_50%,var(--color-brand-green)_55%,transparent_60%)]" />
              <span className="relative z-10 flex h-full w-full items-center justify-center gap-3 rounded-2xl bg-zinc-900 px-8 py-4 font-outfit text-xl font-bold text-white border border-white/10 hover:bg-zinc-800 transition-colors">
                {loadingAfun ? (
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <>
                    Cadastrar na plataforma
                    <ArrowRight className="h-5 w-5 text-brand-green" />
                  </>
                )}
              </span>
            </button>

            {unlocked ? (
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
                      <WhatsAppIcon className="h-6 w-6" />
                      Receber banca
                    </>
                  )}
                </span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setShowLockedMsg(true)}
                aria-disabled="true"
                className="relative inline-flex min-h-16 w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-b from-[#00a300]/60 to-[#006400]/60 px-8 py-4 font-outfit text-xl font-bold text-white/80 border border-white/10 shadow-[inset_0_2px_4px_rgba(255,255,255,0.15),inset_0_-2px_4px_rgba(0,0,0,0.3)] cursor-not-allowed grayscale-[0.3]"
              >
                <WhatsAppIcon className="h-6 w-6 opacity-70" />
                Receber banca
                <Lock className="h-5 w-5 text-yellow-300" />
              </button>
            )}

            {showLockedMsg && !unlocked && (
              <div
                role="alert"
                className="rounded-xl border border-yellow-400/40 bg-yellow-400/10 px-4 py-3 text-sm font-medium text-yellow-200 text-center animate-in fade-in"
              >
                Cadastre-se na plataforma e complete a verificação para liberar sua banca.
              </div>
            )}
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
