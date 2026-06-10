import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/promocao")({
  component: Promocao,
});

function Promocao() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-4">
      <h1 className="text-4xl font-bold text-brand-green mb-4 font-bebas tracking-wider">PROMOÇÃO EXCLUSIVA</h1>
      <p className="text-lg text-center max-w-md font-montserrat text-white/90">
        Aproveite as condições especiais por tempo limitado.
      </p>
      <div className="mt-8 p-6 border-2 border-brand-green rounded-2xl bg-brand-green/5 text-center">
        <span className="text-brand-green font-bold text-2xl font-outfit">OFERTA ATIVA ⚡</span>
      </div>
      <a 
        href="/" 
        className="mt-10 px-8 py-3 bg-brand-green text-black font-bold rounded-full hover:bg-brand-green/90 transition-all active:scale-95 font-outfit"
      >
        VER OFERTAS
      </a>
    </div>
  );
}
