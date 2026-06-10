import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/metodos")({
  component: Metodos,
});

function Metodos() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-4">
      <h1 className="text-4xl font-bold text-brand-green mb-4">Página de Métodos</h1>
      <p className="text-lg text-center max-w-md">
        Esta é uma nova página acessível via /metodos no seu projeto.
      </p>
      <a 
        href="/" 
        className="mt-8 px-6 py-2 bg-brand-green text-black font-bold rounded-full hover:bg-brand-green/90 transition-colors"
      >
        Voltar para Home
      </a>
    </div>
  );
}
