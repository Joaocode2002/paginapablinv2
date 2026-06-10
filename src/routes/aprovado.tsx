import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/aprovado")({
  component: Aprovado,
});

function Aprovado() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-4">
      <h1 className="text-4xl font-bold text-brand-green mb-4 font-bebas tracking-wider">PÁGINA APROVADA</h1>
      <p className="text-lg text-center max-w-md font-montserrat">
        Sua solicitação foi processada com sucesso.
      </p>
      <a 
        href="/" 
        className="mt-8 px-8 py-3 bg-brand-green text-black font-bold rounded-full hover:bg-brand-green/90 transition-all active:scale-95 font-outfit"
      >
        VOLTAR PARA INÍCIO
      </a>
    </div>
  );
}
