import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { CheckCircle2, MessageCircle, Instagram } from "lucide-react";
import { Helmet } from "react-helmet-async";

export const Route = createFileRoute("/aprovado")({
  component: Aprovado,
});

function Aprovado() {
  useEffect(() => {
    // Corrigir a URL malformada enviada pela InfinitePay (com múltiplos ?)
    const currentUrl = window.location.href;
    if (currentUrl.includes('?') && (currentUrl.match(/\?/g) || []).length > 1) {
      console.log("Corrigindo URL malformada...");
      
      // Substituir todos os '?' após o primeiro por '&'
      const firstQuestionMarkIndex = currentUrl.indexOf('?');
      const baseUrl = currentUrl.substring(0, firstQuestionMarkIndex + 1);
      const queryString = currentUrl.substring(firstQuestionMarkIndex + 1).replace(/\?/g, '&');
      
      const newUrl = baseUrl + queryString;
      
      // Atualizar a URL sem recarregar a página para o usuário não perceber
      window.history.replaceState({}, '', newUrl);
    }
  }, []);

  const handleWppClick = () => {
    const message = encodeURIComponent("Quero receber meu acesso ao grupo vip!\n\nNome :");
    window.location.href = `https://wa.me/5531991950946?text=${message}`;
  };

  return (
    <div className="bg-black text-white selection:bg-[#22c55e] selection:text-black min-h-screen flex flex-col items-center justify-center p-4 overflow-x-hidden">
      <Helmet>
        <title>Pablog - Compra Aprovada</title>
      </Helmet>
      {/* Background Decorativo */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#22c55e]/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#22c55e]/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 flex w-full max-w-2xl flex-col items-center text-center space-y-8">
        {/* Ícone de Sucesso */}
        <div className="bg-[#22c55e]/20 p-4 rounded-full">
          <CheckCircle2 className="h-16 w-16 text-[#22c55e]" />
        </div>

        {/* Título Principal */}
        <div className="space-y-2">
          <h1 className="text-2xl md:text-4xl tracking-wider text-[#22c55e] uppercase font-black">
            Parabéns! Sua compra foi aprovada
          </h1>
        </div>

        {/* Card de Conteúdo */}
        <div className="w-full rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm space-y-6">
          <p className="text-base leading-relaxed text-white/90">
            Entre em contato pelo WhatsApp para acelerar a ativação do seu acesso. 
            Clique no botão abaixo:
          </p>

          {/* Botão WhatsApp Animado */}
          <button 
            onClick={handleWppClick}
            className="group relative inline-flex min-h-16 w-full cursor-pointer items-center justify-center overflow-hidden rounded-full p-[2px] transition-all active:scale-[0.96] shadow-[0_0_20px_rgba(34,197,94,0.3)]"
          >
            {/* Animação de Borda Giratória */}
            <span className="absolute inset-[-200%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#22c55e_5%,transparent_10%,transparent_50%,#22c55e_55%,transparent_60%)]" />
            
            <span className="relative z-10 flex h-full w-full items-center justify-center gap-3 rounded-full bg-gradient-to-b from-[#00a300] to-[#006400] px-8 py-4 text-xl font-bold text-white shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),inset_0_-2px_4px_rgba(0,0,0,0.3)]">
              <MessageCircle className="h-6 w-6" />
              Chamar no WhatsApp
            </span>
          </button>
        </div>

        {/* Rodapé e Redes Sociais */}
        <div className="flex flex-col items-center gap-4 pt-4">
          <a 
            href="https://www.instagram.com/pablog_metodos/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white/45 hover:text-white transition-colors"
          >
            <Instagram className="h-6 w-6" />
          </a>
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 text-center">
            @PABLOG MÉTODOS • © 2026 TODOS OS DIREITOS RESERVADOS.
          </p>
        </div>
      </div>
    </div>
  );
}
