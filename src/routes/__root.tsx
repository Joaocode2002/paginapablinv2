import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
} from "@tanstack/react-router";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { ProtectContent } from "@/components/ProtectContent";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4 text-white">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-white">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-white uppercase tracking-wider font-bebas">Página não encontrada</h2>
        <p className="mt-2 text-sm text-white/60 font-montserrat">
          A página que você está procurando não existe ou foi movida.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-brand-green px-6 py-2 text-sm font-bold text-black transition-all hover:scale-105 active:scale-95"
          >
            Voltar ao Início
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

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
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <Helmet>
          <html lang="pt-BR" />
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>PabloG - Grupo Free Liberado</title>
          <meta name="description" content="Grupo grátis de métodos com acesso imediato." />
          <meta name="author" content="PabloG" />
          <meta property="og:title" content="PabloG - Grupo Free Liberado" />
          <meta property="og:description" content="Grupo grátis de métodos com acesso imediato." />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@PABLOG" />
          <meta name="twitter:title" content="PabloG - Grupo Free Liberado" />
          <meta name="twitter:description" content="Grupo grátis de métodos com acesso imediato." />
          <meta property="og:image" content="https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/c06094d5-a810-4a43-9a14-974333cff28e/id-preview-bbaf4409--bd0e0fc8-7750-459e-9ed8-9623f9e6aa39.lovable.app-1778453862184.png" />
          <meta name="twitter:image" content="https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/c06094d5-a810-4a43-9a14-974333cff28e/id-preview-bbaf4409--bd0e0fc8-7750-459e-9ed8-9623f9e6aa39.lovable.app-1778453862184.png" />
          
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@400;700&family=Outfit:wght@400;700;900&display=swap" rel="stylesheet" />
        </Helmet>

        <ProtectContent />
        <Outlet />
      </QueryClientProvider>
    </HelmetProvider>
  );
}