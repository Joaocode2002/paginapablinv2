import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Helmet } from "react-helmet-async";

export const Route = createFileRoute("/mentoria")({
  component: Mentoria,
});

function Mentoria() {
  const [loading, setLoading] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleCheckoutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setLoading(true);


    let fbp = "";
    let fbc = "";

    try {
      fbp = document.cookie.split('; ').find(row => row.startsWith('_fbp='))?.split('=')[1] || "";
      fbc = document.cookie.split('; ').find(row => row.startsWith('_fbc='))?.split('=')[1] || "";
      
      if (!fbc) {
        const urlParams = new URLSearchParams(window.location.search);
        const fbclid = urlParams.get('fbclid');
        if (fbclid) {
          fbc = `fb.1.${Date.now()}.${fbclid}`;
        }
      }
    } catch (err) {
      console.error("Erro ao capturar dados de rastreamento:", err);
    }

    setTimeout(() => {
      setLoading(false);
      const baseUrl = "https://leadmaxaffiliates.com/";
      const params = new URLSearchParams();
      
      if (fbp) {
        params.set('fbp', fbp);
        params.set('utm_fbp', fbp);
      }
      if (fbc) {
        params.set('fbc', fbc);
        params.set('utm_fbc', fbc);
        
        const fbclidMatch = fbc.match(/fb\.1\.\d+\.(.+)/);
        if (fbclidMatch) {
          params.set('fbclid', fbclidMatch[1]);
        }
      }
      
      const finalUrl = params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;
      window.location.href = finalUrl;
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

  return (
    <div className="bg-black text-white selection:bg-brand-green selection:text-black">
      <Helmet>
        <title>Pablog - Mentoria CPA</title>
      </Helmet>
      
      <header className="fixed top-0 left-0 z-50 flex w-full items-center justify-center border-b border-white/10 bg-[#0f7a2e] px-4 py-3 text-center text-xs font-bold tracking-wide text-white">
        <span>VAGAS LIMITADAS PARA A MENTORIA CPA</span>
        <AlertTriangle className="ml-2 h-4 w-4 text-yellow-400 stroke-[3px]" />
      </header>

      <main className="relative flex min-h-screen flex-col items-center justify-start overflow-hidden pt-24 pb-20">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-60 brightness-[0.7] contrast-[1.1]" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1511193311914-0346f16efe90?q=80&w=2073&auto=format&fit=crop')" }}
        />
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-screen brightness-[1.2]" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/70" />

        <div className="relative z-10 flex w-full max-w-5xl flex-col items-center px-4 text-center">
          <h2 className="mb-4 font-bebas text-4xl italic tracking-[0.2em]">
            PABLO<span className="text-brand-green">G</span>
          </h2>

          <h1 className="font-bebas text-[clamp(2.5rem,8vw,5.5rem)] leading-[0.92] tracking-wider text-brand-green uppercase">
            Mentoria CPA
          </h1>


          <section className="mt-16 w-full text-center">
            <div className="group relative aspect-video w-full max-w-4xl mx-auto overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
              <video 
                ref={videoRef}
                className="h-full w-full object-cover"
                playsInline
                poster="/video-poster.png"
              >
                <source src="/video1.mp4" type="video/mp4" />
              </video>

              <div className="absolute inset-x-0 bottom-0 z-30 flex flex-col gap-3 bg-gradient-to-t from-black/90 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:p-6">
                <input 
                  type="range" min="0" max="100" value={progress}
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
                        type="range" min="0" max="1" step="0.1" value={volume}
                        onChange={handleVolumeChange}
                        className="h-1 w-20 cursor-pointer appearance-none rounded-lg bg-white/30 accent-brand-green"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {!videoStarted && (
                <button onClick={startVideo} className="absolute inset-0 z-20 flex items-center justify-center bg-black/20">
                  <div className="flex items-center justify-center rounded-full bg-brand-green/90 p-6 text-black shadow-lg transition-transform hover:scale-110">
                    <Play className="h-10 w-10 fill-current" />
                  </div>
                </button>
              )}
            </div>
          </section>

          <section className="mt-8 w-full flex flex-col gap-6 max-w-4xl mx-auto">
            {[2, 3, 4].map((n) => (
              <div key={n} className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black shadow-xl">
                <video
                  className="h-full w-full object-cover"
                  playsInline
                  controls
                  preload="metadata"
                  poster="/video-poster.png"
                >
                  <source src={`/video${n}.mp4`} type="video/mp4" />
                </video>
              </div>
            ))}
          </section>


          <div className="mt-16 w-full max-w-md flex flex-col items-center rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
            <h3 className="mb-6 font-bebas text-2xl tracking-widest text-white uppercase">O que você vai receber:</h3>
            <ul className="mb-8 flex flex-col gap-4 text-left w-full">
              <li className="flex items-center gap-3 font-montserrat text-sm text-white/90">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-brand-green" />
                <span>Acesso vitalício ao conteúdo base</span>
              </li>
              <li className="flex items-center gap-3 font-montserrat text-sm text-white/90">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-brand-green" />
                <span>Lives semanais de acompanhamento</span>
              </li>
              <li className="flex items-center gap-3 font-montserrat text-sm text-white/90">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-brand-green" />
                <span>Grupo de networking no Telegram</span>
              </li>
              <li className="flex items-center gap-3 font-montserrat text-sm text-white/90">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-brand-green" />
                <span>Planilhas de gestão de banca</span>
              </li>
            </ul>
          </div>

          <button 
            onClick={handleCheckoutClick}
            className="group relative mt-10 inline-flex min-h-16 w-full max-w-md cursor-pointer items-center justify-center overflow-hidden rounded-full p-[2px] transition-all active:scale-[0.96] shadow-[0_0_20px_rgba(34,197,94,0.3)]"
          >
            <span className="absolute inset-[-200%] animate-border-rotate bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,var(--color-brand-green)_5%,transparent_10%,transparent_50%,var(--color-brand-green)_55%,transparent_60%)]" />
            <span className="relative z-10 flex h-full w-full items-center justify-center gap-3 rounded-full bg-gradient-to-b from-[#00a300] to-[#006400] px-8 py-4 font-outfit text-xl font-bold text-white shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),inset_0_-2px_4px_rgba(0,0,0,0.3)]">
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  <span>Carregando...</span>
                </div>
              ) : (
                <>
                  <Play className="h-6 w-6" />
                  Criar minha conta
                </>
              )}
            </span>
          </button>
        </div>
      </main>
      
      <footer className="relative z-50 w-full bg-black py-10 px-4 flex flex-col items-center gap-4">
        <a href="https://www.instagram.com/pablog_metodos/" target="_blank" rel="noopener noreferrer" className="text-foreground/45 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
        </a>
        <p className="text-[0.56rem] md:text-[0.7rem] uppercase tracking-[0.25em] text-foreground/45 text-center">
          @PABLOG MÉTODOS<br />© 2026 TODOS OS DIREITOS RESERVADOS.
        </p>
      </footer>
    </div>
  );
}