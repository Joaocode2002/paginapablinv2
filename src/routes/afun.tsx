import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, AlertTriangle, Maximize } from "lucide-react";
import { Helmet } from "react-helmet-async";

export const Route = createFileRoute("/afun")({
  component: Afun,
});

function VideoPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoStarted, setVideoStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0);

  const formatTime = (s: number) => {
    if (!isFinite(s) || s < 0) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setIsPlaying(true); }
    else { v.pause(); setIsPlaying(false); }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
    if (!v.muted && volume === 0) { setVolume(1); v.volume = 1; }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    const v = videoRef.current;
    if (v) { v.volume = val; v.muted = val === 0; setIsMuted(val === 0); }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    const v = videoRef.current;
    if (v) { v.currentTime = (val / 100) * v.duration; setProgress(val); }
  };

  const toggleFullscreen = () => {
    const v = videoRef.current as any;
    if (!v) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else if (v.requestFullscreen) {
      v.requestFullscreen();
    } else if (v.webkitEnterFullscreen) {
      v.webkitEnterFullscreen();
    } else if (v.webkitRequestFullscreen) {
      v.webkitRequestFullscreen();
    }
  };

  const startVideo = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    v.play();
    setIsMuted(false);
    setIsPlaying(true);
    setVideoStarted(true);
    setVolume(1);
    v.volume = 1;
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const updateProgress = () => {
      setProgress((video.currentTime / video.duration) * 100);
      setCurrentTime(video.currentTime);
    };
    const updateDuration = () => setDuration(video.duration);
    
    video.addEventListener("timeupdate", updateProgress);
    video.addEventListener("loadedmetadata", updateDuration);
    video.addEventListener("durationchange", updateDuration);
    
    return () => {
      video.removeEventListener("timeupdate", updateProgress);
      video.removeEventListener("loadedmetadata", updateDuration);
      video.removeEventListener("durationchange", updateDuration);
    };
  }, []);

  return (
    <div className="group relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        playsInline
        preload="metadata"
      >
        <source src={`${src}#t=0.1`} type="video/mp4" />
      </video>

      <div className="absolute inset-x-0 bottom-0 z-30 flex flex-col gap-2 bg-gradient-to-t from-black/90 to-transparent p-4 transition-opacity duration-300 md:p-6 md:opacity-0 md:group-hover:opacity-100">
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
            <span className="font-mono text-xs text-white/90 tabular-nums">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
          <button onClick={toggleFullscreen} className="text-white hover:text-brand-green">
            <Maximize className="h-6 w-6" />
          </button>
        </div>
      </div>

      {(!videoStarted || !isPlaying) && (
        <button 
          onClick={!videoStarted ? startVideo : togglePlay} 
          className="absolute inset-0 z-20 flex items-center justify-center bg-black/20 transition-colors hover:bg-black/30"
        >
          <div className="flex items-center justify-center rounded-full bg-brand-green/90 p-6 text-black shadow-lg transition-transform hover:scale-110">
            <Play className="h-10 w-10 fill-current" />
          </div>
        </button>
      )}
    </div>
  );
}

function Afun() {
  const [loading, setLoading] = useState(false);

  const handleCheckoutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      window.location.href = "https://www.afun.com/register?code=PABLOG";
    }, 1200);
  };

  return (
    <div className="bg-black text-white selection:bg-brand-green selection:text-black">
      <Helmet>
        <title>Pablog - Afun</title>
      </Helmet>
      
      <header className="fixed top-0 left-0 z-50 flex w-full items-center justify-center border-b border-white/10 bg-[#0f7a2e] px-4 py-3 text-center text-xs font-bold tracking-wide text-white">
        <span>ESTE SITE PODE CAIR A QUALQUER MOMENTO</span>
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
            Plataforma Afun
          </h1>
          
          <p className="mt-6 max-w-2xl mx-auto font-montserrat text-lg leading-relaxed text-white/90">
            A plataforma oficial do <strong className="text-brand-green">Pablog</strong>. Siga os tutoriais abaixo para começar sua operação agora mesmo.
          </p>

          <section className="mt-16 w-full text-center max-w-4xl mx-auto">
            <h3 className="mb-4 font-bebas text-2xl md:text-3xl tracking-widest text-brand-green uppercase">
              Como criar sua conta
            </h3>
            <VideoPlayer src="/mentoria1.mp4" />
          </section>

          <div className="mt-12 flex justify-center">
            <button 
              onClick={handleCheckoutClick}
              className="group relative inline-flex min-h-16 w-full max-w-md cursor-pointer items-center justify-center overflow-hidden rounded-full p-[2px] transition-all active:scale-[0.96] shadow-[0_0_20px_rgba(34,197,94,0.3)]"
            >
              <span className="absolute inset-[-200%] animate-border-rotate bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,var(--color-brand-green)_5%,transparent_10%,transparent_50%,var(--color-brand-green)_55%,transparent_60%)]" />
              <span className="relative z-10 flex h-full w-full items-center justify-center gap-3 rounded-full bg-gradient-to-b from-[#00a300] to-[#006400] px-8 py-4 font-outfit text-xl font-bold text-white shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),inset_0_-2px_4px_rgba(0,0,0,0.3)]">
                {loading ? (
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <>
                    <Play className="h-6 w-6" />
                    Criar conta na Afun
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
