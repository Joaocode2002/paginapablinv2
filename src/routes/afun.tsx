import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AlertTriangle, MessageCircle, ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet-async";

export const Route = createFileRoute("/afun")({
  component: Afun,
});

function Afun() {
  const [loadingAfun, setLoadingAfun] = useState(false);
  const [loadingWpp, setLoadingWpp] = useState(false);

  const handleAfunClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setLoadingAfun(true);
    setTimeout(() => {
      setLoadingAfun(false);
      window.location.href = "https://afun.bet.br/?ad_type=207&ch=1330001&ic=5700043&ad_extra=1781229453";
    }, 800);
  };

  const handleWppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setLoadingWpp(true);

    const fbq = (window as any).fbq;
    if (typeof fbq === "function") {
      fbq("track", "Lead");
    }

    setTimeout(() => {
      setLoadingWpp(false);
      const message = encodeURIComponent("Acabei de me cadastrar como faço para resgatar minha banca!");
      window.location.href = `https://wa.me/5531991950946?text=${message}`;
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
          <h2 className="mb-6 font-bebas text-4xl italic tracking-[0.2em]">
            PABLO<span className="text-brand-green">G</span>
          </h2>
          
          <div className="mb-10 space-y-6">
            <h1 className="font-bebas text-[clamp(2.5rem,8vw,5.5rem)] leading-[1] tracking-wider text-brand-green uppercase">
              Receba sua Banca
            </h1>
            
            <p className="max-w-xl mx-auto font-montserrat text-xl md:text-2xl leading-relaxed text-white font-medium">
              Para receber a banca, preciso que você <strong className="text-brand-green">crie a conta</strong> na plataforma abaixo e <strong className="text-brand-green">verifique</strong>.
            </p>
            
            <p className="max-w-xl mx-auto font-montserrat text-lg text-white/80">
              Após isso, me chame no WhatsApp clicando no botão abaixo.
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
                    Criar conta na Afun
                    <ArrowRight className="h-5 w-5 text-brand-green" />
                  </>
                )}
              </span>
            </button>

            {/* Botão WhatsApp */}
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
                    <MessageCircle className="h-6 w-6" />
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
