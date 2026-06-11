import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Helmet } from "react-helmet-async";

export const Route = createFileRoute("/mentoria")({
  component: Mentoria,
});

function VideoPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoStarted, setVideoStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0);

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
    };
    video.addEventListener("timeupdate", updateProgress);
    return () => { video.removeEventListener("timeupdate", updateProgress); };
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
  );
}


function Mentoria() {
  const [loading, setLoading] = useState(false);


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


  return (
    <div className="bg-black text-white selection:bg-brand-green selection:text-black">
      <Helmet>
        <title>Mentoria CPA</title>
      </Helmet>
      
      <main className="relative flex min-h-screen flex-col items-center justify-start overflow-hidden pt-10 pb-20">
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
          <h1 className="font-bebas text-[clamp(2.5rem,8vw,5.5rem)] leading-[0.92] tracking-wider text-brand-green uppercase">
            Mentoria CPA
          </h1>
          <p className="mt-6 max-w-2xl mx-auto font-montserrat text-lg leading-relaxed text-white/90">
            Comece a escalar sua operação de <strong className="text-brand-green">CPA</strong> com uma plataforma de grandes players e intuitiva. Abaixo segue o tutorial de como começar.
          </p>

          <section className="mt-16 w-full text-center max-w-4xl mx-auto">
            <h3 className="mb-4 font-bebas text-2xl md:text-3xl tracking-widest text-brand-green uppercase">Criando sua conta na plataforma</h3>
            <VideoPlayer src="/mentoria1.mp4" />
          </section>

          <section className="mt-8 w-full flex flex-col gap-10 max-w-4xl mx-auto">
            {[
              { n: 2, title: "Como funciona a plataforma", src: "/mentoria2.mp4" },
              { n: 3, title: "Como funciona a operação", src: "https://res.cloudinary.com/dvqmvjjd4/video/upload/mentoria3_kbpemr.mp4" },
              { n: 4, title: "Como acessar pelo telefone", src: "/mentoria4.mp4" },
            ].map(({ n, title, src }) => (
              <div key={n} className="w-full text-center">
                <h3 className="mb-4 font-bebas text-2xl md:text-3xl tracking-widest text-brand-green uppercase">{title}</h3>
                <VideoPlayer src={src} />
              </div>
            ))}
          </section>



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