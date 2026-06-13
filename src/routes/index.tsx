import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [loading, setLoading] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0);
  const [controlsVisible, setControlsVisible] = useState(true);
  const controlsTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const showControls = () => {
    setControlsVisible(true);
    if (controlsTimerRef.current) clearTimeout(controlsTimerRef.current);
    controlsTimerRef.current = setTimeout(() => setControlsVisible(false), 2500);
  };

  useEffect(() => {
    const fbq = (window as any).fbq;
    if (typeof fbq === "function" && window.location.hostname === 'pablinmetodos.com.br') {
      fbq("init", "1906227756853653");
      fbq("track", "PageView");
    }
  }, []);

  const WHATSAPP_LINK = "https://chat.whatsapp.com/G9cvZl5llb36eMDeAjelwh?mode=gi_t";

  const handleWppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setLoading(true);


    // Track Lead if fbq is defined and on the correct domain
    const fbq = (window as any).fbq;
    if (typeof fbq === "function" && window.location.hostname === 'pablinmetodos.com.br') {
      fbq("track", "Lead");
    }

    setTimeout(() => {
      window.location.href = WHATSAPP_LINK;
    }, 1200);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
      if (!videoRef.current.muted && volume === 0) {
        setVolume(1);
        videoRef.current.volume = 1;
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
      setIsMuted(val === 0);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (videoRef.current) {
      const time = (val / 100) * videoRef.current.duration;
      videoRef.current.currentTime = time;
      setProgress(val);
    }
  };

  const startVideo = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play();
      setIsMuted(false);
      setIsPlaying(true);
      setVideoStarted(true);
      setVolume(1);
      videoRef.current.volume = 1;
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Auto-play muted on load
    video.muted = true;
    video.play().catch(error => {
      console.log("Auto-play was prevented:", error);
    });

    const updateProgress = () => {
      const p = (video.currentTime / video.duration) * 100;
      setProgress(p);
    };

    const handleInteraction = () => {
      if (videoRef.current && videoRef.current.muted) {
        videoRef.current.muted = false;
        setIsMuted(false);
        setVideoStarted(true);
        setIsPlaying(true);
        setVolume(1);
        videoRef.current.volume = 1;
        // Remove listeners after first successful unmute interaction
        document.removeEventListener("touchstart", handleInteraction);
        document.removeEventListener("click", handleInteraction);
      }
    };

    document.addEventListener("touchstart", handleInteraction);
    document.addEventListener("click", handleInteraction);

    video.addEventListener("timeupdate", updateProgress);
    return () => {
      video.removeEventListener("timeupdate", updateProgress);
      document.removeEventListener("touchstart", handleInteraction);
      document.removeEventListener("click", handleInteraction);
    };
  }, []);

  // Infinite Carousel Logic
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let animationId: number;
    const scroll = () => {
      carousel.scrollLeft += 1;
      if (carousel.scrollLeft >= (carousel.scrollWidth / 3)) {
        carousel.scrollLeft = 0;
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Carrega automaticamente /resultados/1.png, 2.png, ... até 50.png
  // Basta enviar arquivos com nome numérico (1.png, 2.png, 3.png...) na pasta public/resultados
  const MAX_RESULTS = 50;
  const results: string[] = Array.from({ length: MAX_RESULTS }, (_, i) => `/resultados/${i + 1}.png`);

  const [shuffledResults] = useState(() => {
    return [...results].sort(() => Math.random() - 0.5);
  });

  // Triplicar para o loop infinito suave
  const carouselItems = [...shuffledResults, ...shuffledResults, ...shuffledResults];

  return (
    <div className="bg-black text-white selection:bg-brand-green selection:text-black">
      {/* Alert Banner */}
      <header className="fixed top-0 left-0 z-50 flex w-full items-center justify-center border-b border-white/10 bg-[#0f7a2e] px-4 py-3 text-center text-xs font-bold tracking-wide text-white">
        <span>
          ESTE SITE PODE CAIR A QUALQUER MOMENTO
        </span>
        <AlertTriangle className="ml-2 h-4 w-4 text-yellow-400 stroke-[3px]" />
      </header>

      <main className="relative flex min-h-screen flex-col items-center justify-start overflow-hidden pt-24 pb-20">
        {/* Background Layers */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-60 brightness-[0.7] contrast-[1.1]" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1511193311914-0346f16efe90?q=80&w=2073&auto=format&fit=crop')" }}
        />
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-screen brightness-[1.2]" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=2070&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/70" />

        <div className="relative z-10 flex w-full max-w-5xl flex-col items-center px-4 text-center">
          {/* Logo */}
          <h2 className="mb-4 font-bebas text-4xl italic tracking-[0.2em]">
            PABLO<span className="text-brand-green">G</span>
          </h2>

          {/* Main Title */}
          <h1 className="font-bebas text-[clamp(3rem,10vw,6.5rem)] leading-[0.92] tracking-wider text-brand-green uppercase">
            Grupo Free Liberado!
          </h1>

          {/* Subtitle */}
          <p className="mt-6 max-w-3xl font-montserrat text-[clamp(1rem,2.5vw,1.35rem)] leading-relaxed text-white/90">
            Você foi selecionado para o maior grupo de <strong className="font-bold text-brand-green">métodos grátis</strong> do Brasil.
            Zero custo. <strong className="font-bold">Lucro 100% seu.</strong> Resultados reais, <strong className="font-bold">todos os dias.</strong>
          </p>

          {/* Primary CTA Button */}
          <button 
            onClick={handleWppClick}
            className="group relative mt-10 inline-flex min-h-16 w-full max-w-md cursor-pointer items-center justify-center overflow-hidden rounded-full p-[2px] transition-all active:scale-[0.96] shadow-[0_0_20px_rgba(34,197,94,0.3)]"
          >
            <span className="absolute inset-[-200%] animate-border-rotate bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,var(--color-brand-green)_5%,transparent_10%,transparent_50%,var(--color-brand-green)_55%,transparent_60%)]" />
            <span className="relative z-10 flex h-full w-full items-center justify-center gap-3 rounded-full bg-gradient-to-b from-[#00a300] to-[#006400] px-8 py-4 font-outfit text-xl font-bold text-white shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),inset_0_-2px_4px_rgba(0,0,0,0.3)]">
              {loading ? (
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <>
                  <svg className="h-6 w-6" viewBox="0 0 448 512" fill="currentColor">
                    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                  </svg>
                  Garantir minha vaga
                </>
              )}
            </span>
          </button>

          {/* Delay Esportivo Section */}
          <section className="mt-20 w-full text-center">
            <h2 className="mb-8 font-bebas text-[clamp(2rem,6vw,3.5rem)] tracking-widest text-brand-green uppercase">
              Delay Esportivo
            </h2>
            
            <div
              className="group relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl"
              onMouseMove={showControls}
              onTouchStart={showControls}
              onClick={showControls}
            >
              <video 
                ref={videoRef}
                className="h-full w-full object-cover"
                playsInline
                autoPlay
                muted
                loop
                poster="https://qtbkvshbmqlszncxlcuc.supabase.co/storage/v1/object/public/dsl-uploads/vrDSpkSwV6bqfLCUPP56OMBdVOz2/2ef67223-f436-4dbd-a93f-a2afcceeb95a.png"
              >
                {/* Fallback to original site video URL if possible, otherwise use a high quality gambling/sports background */}
                <source src="/video1.mp4" type="video/mp4" />
              </video>

              {/* Video Controls Overlay */}
              <div className={`absolute inset-x-0 bottom-0 z-30 flex flex-col gap-3 bg-gradient-to-t from-black/90 to-transparent p-4 transition-opacity duration-300 md:p-6 ${controlsVisible || !isPlaying ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={progress}
                  onChange={handleProgressChange}
                  className="h-1 w-full cursor-pointer appearance-none rounded-lg bg-white/30 accent-brand-green"
                />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button onClick={togglePlay} className="text-white hover:text-brand-green">
                      {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                    </button>
                    <div className="flex items-center gap-2">
                      <button onClick={toggleMute} className="text-white hover:text-brand-green">
                        {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
                      </button>
                      <input 
                        type="range" 
                        min="0" 
                        max="1" 
                        step="0.1" 
                        value={volume}
                        onChange={handleVolumeChange}
                        className="h-1 w-20 cursor-pointer appearance-none rounded-lg bg-white/30 accent-brand-green"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Initial Unmute Overlay */}
              {!videoStarted && (
                <button 
                  onClick={startVideo}
                  className="absolute inset-0 z-20 flex items-center justify-center bg-black/20"
                >
                  <div className="flex items-center justify-center rounded-full bg-brand-green/90 p-6 text-black shadow-lg transition-transform hover:scale-110">
                    <Play className="h-10 w-10 fill-current" />
                  </div>
                </button>
              )}

              {/* Play overlay quando pausado (após iniciar) */}
              {videoStarted && !isPlaying && (
                <button
                  onClick={togglePlay}
                  className="absolute inset-0 z-20 flex items-center justify-center bg-black/30"
                  aria-label="Reproduzir"
                >
                  <div className="flex items-center justify-center rounded-full bg-brand-green/90 p-6 text-black shadow-lg transition-transform hover:scale-110">
                    <Play className="h-10 w-10 fill-current" />
                  </div>
                </button>
              )}
            </div>
          </section>

          {/* Student Results Section */}
          <section className="mt-20 w-full overflow-hidden">
            <h2 className="mb-10 font-bebas text-[clamp(2rem,6vw,3.5rem)] tracking-widest text-brand-green uppercase">
              Resultados dos Alunos
            </h2>
            
            <div className="relative">
              <div 
                ref={carouselRef}
                className="flex gap-0 overflow-x-hidden scroll-smooth pb-4 scrollbar-hide"
              >
                {carouselItems.map((src, idx) => (
                  <div 
                    key={idx} 
                    className="min-w-[calc(40.5%-8px)] shrink-0 md:min-w-[calc(26.66%-11px)]"
                  >
                    <div className="aspect-[9/16] w-[88.2%] md:w-[95%] max-w-[270px] md:max-w-[320px] overflow-hidden rounded-lg border border-white/10 bg-zinc-900 shadow-lg mx-auto">
                      <img 
                        src={src} 
                        alt={`Resultado ${(idx % results.length) + 1}`} 
                        className="h-full w-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          // Esconde o card se a imagem não existir na pasta
                          const parent = (e.currentTarget.closest('.shrink-0') as HTMLElement);
                          if (parent) parent.style.display = 'none';
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="mt-16 flex justify-center">
              <button 
                onClick={handleWppClick}
                className="group relative inline-flex min-h-16 w-full max-w-md cursor-pointer items-center justify-center overflow-hidden rounded-full p-[2px] transition-all active:scale-[0.96] shadow-[0_0_20px_rgba(34,197,94,0.3)]"
              >
                <span className="absolute inset-[-200%] animate-border-rotate bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,var(--color-brand-green)_5%,transparent_10%,transparent_50%,var(--color-brand-green)_55%,transparent_60%)]" />
                <span className="relative z-10 flex h-full w-full items-center justify-center gap-3 rounded-full bg-gradient-to-b from-[#00a300] to-[#006400] px-8 py-4 font-outfit text-xl font-bold text-white shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),inset_0_-2px_4px_rgba(0,0,0,0.3)]">
                  {loading ? (
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    <>
                      <svg className="h-6 w-6" viewBox="0 0 448 512" fill="currentColor">
                        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                      </svg>
                      Entrar no grupo agora
                    </>
                  )}
                </span>
              </button>
            </div>
          </section>
          
          <p 
            className="mt-4 text-center uppercase font-montserrat font-bold tracking-[3px]"
            style={{ 
              color: 'oklch(1 0 0 / 0.6)',
              fontSize: '8px',
              lineHeight: '12px'
            }}
          >
            NÃO FIQUE DE FORA CLIQUE NO <span style={{ color: 'oklch(0.866 0.284 142.495)' }}>BOTÃO ACIMA</span>
          </p>

        </div>

      </main>
      
      {/* Footer */}
      <footer className="relative z-50 w-full bg-black py-10 px-4 flex flex-col items-center gap-4">
        <a 
          href="https://www.instagram.com/pablog_metodos/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-foreground/45 hover:text-white transition-colors"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="lucide lucide-instagram"
          >
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
          </svg>
        </a>
        <p className="text-[0.56rem] md:text-[0.7rem] uppercase tracking-[0.25em] text-foreground/45 text-center">
          @PABLOG MÉTODOS<br />© 2026 TODOS OS DIREITOS RESERVADOS.
        </p>
      </footer>

    </div>
  );
}
