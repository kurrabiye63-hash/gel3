import React, { useState, useEffect } from "react";
import { Key, Settings2, X, Zap, LayoutGrid, Shield, Gem, ArrowRight, Layers, Upload, SlidersHorizontal, Sparkles, Grid3X3, Menu, Home } from "lucide-react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ImageUploader } from "./components/ImageUploader";
import { ShootModeToggle, ViewSubTabs } from "./components/ViewModeNav";
import { ViewPage } from "./pages/ViewPage";
import { ResultGallery } from "./components/ResultGallery";
import { LandingPage } from "./pages/LandingPage";
import { fal } from "@fal-ai/client";
import { generateBridalImage, AIModelId, ViewMode } from "./services/falApi";
import { useAuth } from "./context/AuthContext";
import { PricingModal } from "./components/PricingModal";
import { AuthModal } from "./components/AuthModal";
import logoUrl from "./logo.jpg";
import { CreditCard, LogOut, User as UserIcon } from "lucide-react";

interface GenerationResult {
  id: string;
  url: string;
  timestamp: string;
  engine: string;
  seed: number;
  viewMode: string;
}

const MainHeader: React.FC<{ 
  onToggleSidebar: () => void; 
  onToggleArchive: () => void; 
  onGoHome: () => void;
  onOpenPricing: () => void;
  onOpenAuth: () => void;
}> = ({ onToggleSidebar, onToggleArchive, onGoHome, onOpenPricing, onOpenAuth }) => {
  const { user, credits, signOut } = useAuth();
  
  return (
    <header className="h-16 border-b border-white/10 flex items-center justify-between px-4 md:px-6 bg-black/40 backdrop-blur-md z-[100]">
      <div className="flex items-center space-x-3">
        <button 
          onClick={onToggleSidebar}
          className="md:hidden text-white/70 hover:text-[#D4AF37] transition-colors"
        >
          <Menu size={20} />
        </button>
        <div 
          onClick={onGoHome}
          className="flex flex-col cursor-pointer group"
        >
          <div className="flex items-center space-x-2">
            <h1 className="font-serif text-lg md:text-2xl tracking-widest text-[#D4AF37] uppercase leading-none group-hover:text-white transition-colors">Fashion Master</h1>
          </div>
          <span className="text-[8px] md:text-[10px] tracking-[0.3em] text-gray-400 font-light mt-1 uppercase">Haute Couture Studio</span>
        </div>
      </div>
      <div className="flex items-center space-x-3 md:space-x-6">
        {/* Credits Display */}
        {user && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-full cursor-pointer hover:bg-[#D4AF37]/20 transition-all" onClick={onOpenPricing}>
            <Zap size={14} className="text-[#D4AF37] fill-[#D4AF37]" />
            <span className="text-[11px] font-bold text-[#D4AF37]">{credits ?? 0} Kontür</span>
            <div className="w-[1px] h-3 bg-[#D4AF37]/30 mx-1"></div>
            <span className="text-[10px] text-[#D4AF37]/80 uppercase font-black">+ Yükle</span>
          </div>
        )}

        <div className="flex items-center space-x-2 md:space-x-4">
          <button 
            onClick={onGoHome}
            className="text-gray-400 hover:text-[#D4AF37] transition-colors p-1"
            title="Giriş Sayfası"
          >
            <Home size={20} strokeWidth={1.5} />
          </button>
          <button 
            onClick={onToggleArchive}
            className="md:hidden text-white/70 hover:text-[#D4AF37] transition-colors p-1"
          >
            <Sparkles size={18} />
          </button>
          
          {user ? (
            <div className="flex items-center gap-3">
              <button 
                onClick={() => signOut()}
                className="text-gray-400 hover:text-red-400 transition-colors p-1"
                title="Çıkış Yap"
              >
                <LogOut size={18} strokeWidth={1.5} />
              </button>
              <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] text-xs font-bold uppercase">
                {user.email?.substring(0, 2)}
              </div>
            </div>
          ) : (
            <button 
              onClick={onOpenAuth}
              className="px-4 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-[11px] font-bold text-white transition-all flex items-center gap-2"
            >
              <UserIcon size={14} /> Giriş Yap
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

const BottomStatus: React.FC<{ shootMode: string; engine: string; setShowSettings: (show: boolean) => void }> = ({ shootMode, engine, setShowSettings }) => (
  <footer className="h-8 bg-black border-t border-white/5 flex items-center px-4 justify-between z-[100]">
    <div className="flex items-center space-x-2 md:space-x-4 overflow-hidden">
      <button 
        onClick={() => setShowSettings(true)}
        className="text-[9px] md:text-[10px] text-gray-500 hover:text-white flex items-center transition-colors flex-shrink-0"
      >
        <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full mr-2"></span>
        <span className="hidden xs:inline">Sistem Erişimi</span>
        <span className="xs:hidden">Erişim</span>
      </button>
      <span className="text-[10px] text-gray-700">|</span>
      <span className="text-[9px] md:text-[10px] text-gray-500 truncate whitespace-nowrap">Mod: {shootMode.toUpperCase()}</span>
      <span className="hidden sm:inline text-[10px] text-gray-700">|</span>
      <span className="hidden sm:inline text-[10px] text-gray-500 truncate whitespace-nowrap">Düğüm: {engine.split('/').pop()?.toUpperCase()}</span>
    </div>
    <div className="flex items-center space-x-3 md:space-x-6 text-[9px] md:text-[10px] text-gray-500">
      <span className="hidden xs:inline">Latans: 42ms</span>
      <span className="truncate whitespace-nowrap">ID: FM_{new Date().getTime().toString().slice(-5)}</span>
    </div>
  </footer>
);

const FloatingParticles: React.FC = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 15,
    duration: 10 + Math.random() * 20,
    size: 1 + Math.random() * 2,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            bottom: '-10px',
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
};

const App: React.FC = () => {
  const [dressUrl, setDressUrl] = useState<string>("");
  const [modelUrl, setModelUrl] = useState<string>("");
  const [locationUrl, setLocationUrl] = useState<string>("");
  const [engine, setEngine] = useState<AIModelId>("fal-ai/nano-banana-pro/edit");
  const [results, setResults] = useState<GenerationResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const quality = "quality" as const;
  const [seed, setSeed] = useState<number | undefined>(undefined);
  const [falKey, setFalKey] = useState<string>(localStorage.getItem("FAL_KEY") || import.meta.env.VITE_FAL_KEY || "");
  const [showSettings, setShowSettings] = useState<boolean>(!localStorage.getItem("FAL_KEY") && !import.meta.env.VITE_FAL_KEY);
  const [progressMsg, setProgressMsg] = useState<string>("");
  const [shootMode, setShootMode] = useState<"studio" | "location">("studio");
  const [showLanding, setShowLanding] = useState<boolean>(!sessionStorage.getItem("studio_visited"));
  const [showMobileSidebar, setShowMobileSidebar] = useState<boolean>(false);
  const [showMobileArchive, setShowMobileArchive] = useState<boolean>(false);
  const [showPricing, setShowPricing] = useState<boolean>(false);
  const [showAuth, setShowAuth] = useState<boolean>(false);

  const { user, credits, deductCredits, signOut, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const getCurrentViewMode = (): ViewMode => {
    if (location.pathname === "/back") return "back";
    if (location.pathname === "/closeup") return "closeup";
    if (location.pathname === "/location") return "location";
    if (location.pathname === "/location-closeup") return "location-closeup";
    return "front";
  };

  useEffect(() => {
    if (falKey) {
      localStorage.setItem("FAL_KEY", falKey);
      fal.config({ credentials: falKey });
    }
  }, [falKey]);

  // Sync shootMode with route
  useEffect(() => {
    if (location.pathname === "/location" || location.pathname === "/location-closeup") {
      setShootMode("location");
    } else if (shootMode === "location" && location.pathname !== "/location" && location.pathname !== "/location-closeup") {
      setShootMode("studio");
    }
  }, [location.pathname]);

  // Auto-switch to Nano Banana Pro for back/closeup/location views
  useEffect(() => {
    const viewMode = getCurrentViewMode();
    if (viewMode !== "front" && engine !== "fal-ai/nano-banana-pro/edit") {
      setEngine("fal-ai/nano-banana-pro/edit");
    }
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#0a0a0a] flex flex-col items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-10 h-10 border-2 border-[#D4AF37]/10 border-t-[#D4AF37] rounded-full mb-6"
        />
        <p className="text-[9px] text-white/20 uppercase tracking-[0.4em] font-bold">Protokol Yükleniyor</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="fixed inset-0 bg-[#0a0a0a] flex items-center justify-center p-6 overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/[0.03] blur-[120px] pointer-events-none" />
        
        <div className="flex flex-col items-center text-center relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <img src={logoUrl} alt="FashionMaster" className="w-40 md:w-56 mx-auto mb-4 opacity-90 mix-blend-screen" />
            <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent mx-auto" />
          </motion.div>
          <AuthModal isOpen={true} onClose={() => {}} />
        </div>
      </div>
    );
  }

  const handleGenerate = async () => {
    const viewMode = getCurrentViewMode();

    if (!user) {
      setShowAuth(true);
      return;
    }

    if ((credits ?? 0) < 4) {
      handleOpenPricing();
      return;
    }

    if (!dressUrl || !modelUrl) {
      alert("Lütfen hem tasarım hem de model görselini yükleyin.");
      return;
    }

    if ((viewMode === "location" || viewMode === "location-closeup") && !locationUrl) {
      alert("Lütfen mekan fotoğrafını yükleyin.");
      return;
    }

    if (!falKey) {
      alert("Lütfen Fal.ai API anahtarınızı girin.");
      setShowSettings(true);
      return;
    }

    try {
      setIsLoading(true);
      setProgressMsg("Kontürler Doğrulanıyor...");

      // Deduct 4 credits for image
      const success = await deductCredits(4);
      if (!success) {
        alert("Kontür düşülemedi. Lütfen tekrar deneyin.");
        setIsLoading(false);
        return;
      }

      setProgressMsg("Editoryal Veriler Senkronize Ediliyor...");

      const currentSeed = seed || Math.floor(Math.random() * 1000000);

      const response = await generateBridalImage({
        modelId: engine,
        garmentImageUrl: dressUrl,
        modelImageUrl: modelUrl,
        seed: currentSeed,
        quality: quality,
        viewMode: viewMode,
        locationImageUrl: (viewMode === "location" || viewMode === "location-closeup") ? locationUrl : undefined,
      }, (update) => {
        if (update.status === "IN_PROGRESS") {
          const lastLog = update.logs?.[update.logs.length - 1]?.message || "Sanal Couture İşleniyor...";
          setProgressMsg(lastLog);
        }
      });

      const newImageUrl = engine === "fal-ai/fashn/tryon/v1.5"
        ? response.data.images[0].url
        : engine === "fal-ai/idm-vton"
          ? response.data.image.url
          : response.data.images[0].url;

      const viewLabels: Record<string, string> = {
        front: "Ön",
        back: "Arka",
        closeup: "Yakın",
        location: "Mekan",
        "location-closeup": "Dış Yakın",
      };

      const newResult: GenerationResult = {
        id: Math.random().toString(36).substring(7),
        url: newImageUrl,
        timestamp: new Date().toLocaleTimeString(),
        engine: `${viewLabels[viewMode] || "Ön"} · ${engine.split("/").pop() || engine}`,
        seed: currentSeed,
        viewMode: viewMode,
      };

      setResults([newResult, ...results]);
    } catch (error) {
      console.error("Generation error:", error);
      alert("İşlem sırasında bir hata oluştu. Lütfen API anahtarınızı kontrol edin.");
    } finally {
      setIsLoading(false);
      setProgressMsg("");
    }
  };

  const isLocationMode = shootMode === "location";

  const handleGenerateVideo = (result: GenerationResult) => {
    navigate("/video", {
      state: { imageUrl: result.url, autoGenerate: true, viewMode: result.viewMode },
    });
  };

  const handleOpenPricing = () => {
    navigate("/pricing");
  };

  // Show landing page on first visit
  if (showLanding) {
    return (
      <>
        <LandingPage
          user={user}
          onOpenAuth={() => setShowAuth(true)}
          onSignOut={() => signOut()}
          onOpenPricing={handleOpenPricing}
          onSelectPhoto={() => {
            sessionStorage.setItem("studio_visited", "1");
            setShowLanding(false);
          }}
          onSelectVideo={() => {
            sessionStorage.setItem("studio_visited", "1");
            setShowLanding(false);
            navigate("/video");
          }}
        />
        <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
      </>
    );
  }

  return (
    <div className="app-container flex flex-col h-screen overflow-hidden bg-[#121212] selection:bg-[#D4AF37]/30">
      <MainHeader 
        onToggleSidebar={() => setShowMobileSidebar(!showMobileSidebar)} 
        onToggleArchive={() => setShowMobileArchive(!showMobileArchive)} 
        onGoHome={() => {
          sessionStorage.removeItem("studio_visited");
          setShowLanding(true);
        }}
        onOpenPricing={handleOpenPricing}
        onOpenAuth={() => setShowAuth(true)}
      />
      
      <main className="flex flex-row flex-1 overflow-hidden relative">
        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {showMobileSidebar && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileSidebar(false)}
              className="fixed inset-0 bg-black/60 z-[60] md:hidden backdrop-blur-sm"
            />
          )}
        </AnimatePresence>

        {/* LeftSidebar */}
        <aside className={`
          sidebar glass-panel overflow-y-auto p-4 flex flex-col space-y-6
          fixed md:relative inset-y-0 left-0 w-64 z-[70] md:z-0
          transform transition-transform duration-300 md:transform-none
          ${showMobileSidebar ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
          <div className="flex md:hidden items-center justify-between mb-2">
            <h3 className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-widest">AYARLAR</h3>
            <button onClick={() => setShowMobileSidebar(false)} className="text-gray-500 p-1">
              <X size={16} />
            </button>
          </div>
          {/* Section: Çekim Modu */}
          <section>
            <h3 className="text-[10px] uppercase tracking-widest text-[#D4AF37] mb-3 font-semibold">Çekim Modu</h3>
            <ShootModeToggle shootMode={shootMode} onShootModeChange={(mode) => {
              setShootMode(mode);
              if (window.innerWidth < 768) setShowMobileSidebar(false);
            }} />
          </section>

          {/* Section: Görünüm Seçimi */}
          <section>
            <h3 className="text-[10px] uppercase tracking-widest text-[#D4AF37] mb-3 font-semibold">Görünüm Seçimi</h3>
            <div onClick={() => window.innerWidth < 768 && setShowMobileSidebar(false)}>
              <ViewSubTabs shootMode={shootMode} />
            </div>
          </section>

          {/* Section: İşlem Düğümü */}
          <section>
            <h3 className="text-[10px] uppercase tracking-widest text-[#D4AF37] mb-3 font-semibold">İşlem Düğümü</h3>
            <div className="glass-panel p-2 rounded-sm border-white/5 bg-black/20">
              <select 
                value={engine}
                onChange={(e) => setEngine(e.target.value as AIModelId)}
                className="w-full bg-transparent text-[11px] font-medium text-gray-300 outline-none cursor-pointer"
              >
                <option value="fal-ai/nano-banana-pro/edit" className="bg-[#121212]">ANA PROTOKOL v.01 (FAL)</option>
                <option value="fal-ai/fashn/tryon/v1.5" className="bg-[#121212]">FASHN ÇEKİRDEK 1.5</option>
                <option value="fal-ai/idm-vton" className="bg-[#121212]">IDM HİBRİT</option>
              </select>
            </div>
            <p className="text-[9px] text-gray-500 mt-2 italic leading-relaxed">
              * Görünüm moduna göre otomatik optimize edilir.
            </p>
          </section>

          {/* Section: Parametreler */}
          <section className="flex-1">
            <h3 className="text-[10px] uppercase tracking-widest text-[#D4AF37] mb-3 font-semibold">Parametreler</h3>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] text-gray-400 block mb-1">Çıktı Kalitesi</label>
                <div className="flex items-center justify-between glass-panel p-2 rounded-sm text-[11px] bg-black/20 border-white/5">
                  <span className="text-[#D4AF37]">✨ 4K Ultra</span>
                  <span className="text-gray-500">Sabit</span>
                </div>
              </div>

              <div>
                <label className="text-[10px] text-gray-400 block mb-1">Sabit Tohum (Seed)</label>
                <div className="flex space-x-2">
                  <input 
                    type="number"
                    placeholder="Rastgele Seçim"
                    value={seed || ""}
                    onChange={(e) => setSeed(e.target.value ? parseInt(e.target.value) : undefined)}
                    className="flex-1 bg-black/40 border border-white/10 rounded-sm text-[11px] p-2 focus:ring-1 focus:ring-[#D4AF37] outline-none text-white"
                  />
                  <button className="glass-panel px-2 rounded-sm text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors">
                    <Zap size={14} />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Sidebar Footer Info */}
          <div className="pt-4 border-t border-white/5">
            <div className="flex items-center justify-between text-[9px] text-gray-500 font-bold tracking-widest">
              <span>HIZ: 2.4S/IT</span>
              <span>SÜRÜM: V4.2.0</span>
            </div>
          </div>
        </aside>

        {/* CenterWorkspace */}
        <main className="main-stage overflow-y-auto p-4 md:p-8 relative flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <ViewPage
                  title="Ön Görünüm"
                  subtitle="Editoryal Ön Çekim Modu"
                  accentColor="#D4AF37"
                  viewMode="front"
                  onDressUrlChange={setDressUrl}
                  onModelUrlChange={setModelUrl}
                  isLoading={isLoading}
                  onGenerate={handleGenerate}
                  canGenerate={!!dressUrl && !!modelUrl}
                  progressMsg={progressMsg}
                />
              }
            />
            <Route
              path="/back"
              element={
                <ViewPage
                  title="Arka Görünüm"
                  subtitle="Kilitli Arka Çekim Modu"
                  accentColor="#D4AF37"
                  viewMode="back"
                  onDressUrlChange={setDressUrl}
                  onModelUrlChange={setModelUrl}
                  isLoading={isLoading}
                  onGenerate={handleGenerate}
                  canGenerate={!!dressUrl && !!modelUrl}
                  progressMsg={progressMsg}
                />
              }
            />
            <Route
              path="/closeup"
              element={
                <ViewPage
                  title="Yakın Plan"
                  subtitle="Makro Detay Çekim Modu"
                  accentColor="#D4AF37"
                  viewMode="closeup"
                  onDressUrlChange={setDressUrl}
                  onModelUrlChange={setModelUrl}
                  isLoading={isLoading}
                  onGenerate={handleGenerate}
                  canGenerate={!!dressUrl && !!modelUrl}
                  progressMsg={progressMsg}
                />
              }
            />
            <Route
              path="/location"
              element={
                <ViewPage
                  title="Mekan Çekimi"
                  subtitle="Dış Mekan Editoryal Modu"
                  accentColor="#D4AF37"
                  viewMode="location"
                  onDressUrlChange={setDressUrl}
                  onModelUrlChange={setModelUrl}
                  onLocationUrlChange={setLocationUrl}
                  isLoading={isLoading}
                  onGenerate={handleGenerate}
                  canGenerate={!!dressUrl && !!modelUrl && !!locationUrl}
                  progressMsg={progressMsg}
                />
              }
            />
            <Route
              path="/location-closeup"
              element={
                <ViewPage
                  title="Dış Mekan Yakın Plan"
                  subtitle="Outdoor Arka Plan Üretici"
                  accentColor="#D4AF37"
                  viewMode="location-closeup"
                  onDressUrlChange={setDressUrl}
                  onModelUrlChange={setModelUrl}
                  onLocationUrlChange={setLocationUrl}
                  isLoading={isLoading}
                  onGenerate={handleGenerate}
                  canGenerate={!!dressUrl && !!modelUrl && !!locationUrl}
                  progressMsg={progressMsg}
                />
              }
            />
          </Routes>
        </main>

        {/* RightSidebar (Archive) Overlay for Mobile */}
        <AnimatePresence>
          {showMobileArchive && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileArchive(false)}
              className="fixed inset-0 bg-black/60 z-[60] md:hidden backdrop-blur-sm"
            />
          )}
        </AnimatePresence>

        {/* RightSidebar (Archive) */}
        <aside className={`
          gallery-panel p-4 flex flex-col overflow-hidden bg-black/40
          fixed md:relative inset-y-0 right-0 w-80 z-[70] md:z-0
          transform transition-transform duration-300 md:transform-none
          ${showMobileArchive ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
        `}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Sparkles size={16} className="text-[#D4AF37]" />
              <h3 className="text-[12px] uppercase tracking-widest font-bold text-white">Arşiv</h3>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-[10px] text-gray-500 font-bold">{results.length} ÇIKTI</span>
              <button 
                onClick={() => setShowMobileArchive(false)}
                className="md:hidden text-white/50 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto pr-1">
            <ResultGallery results={results} isLoading={isLoading} onGenerateVideo={handleGenerateVideo} />
          </div>
        </aside>
      </main>

      <BottomStatus shootMode={shootMode} engine={engine} setShowSettings={setShowSettings} />
      
      <PricingModal isOpen={showPricing} onClose={() => setShowPricing(false)} />
      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />

      {/* ─── Enhanced Settings Modal ─── */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/90 z-[1000] flex items-center justify-center p-12 backdrop-blur-2xl"
          >
            <motion.div
              initial={{ y: 40, scale: 0.96, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 20, scale: 0.98, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="max-w-lg w-full card-glass p-10 relative overflow-hidden"
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#c5a059] to-transparent opacity-40" />

              {/* Subtle corner glow */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#c5a059]/5 rounded-full blur-[60px] pointer-events-none" />

              <div className="flex justify-between items-start mb-10">
                <div className="space-y-2">
                  <h2 className="font-display text-3xl font-bold tracking-tight">
                    Sistem <span className="text-[#c5a059]">Merkezi</span>
                  </h2>
                  <p className="text-[10px] text-white/25 uppercase tracking-[0.2em] font-bold">Editoryal Erişim Protokolü</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowSettings(false)}
                  className="w-10 h-10 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-white/20 hover:text-white flex items-center justify-center transition-all"
                >
                  <X size={20} strokeWidth={1.5} />
                </motion.button>
              </div>

              <div className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-[#c5a059] uppercase tracking-[0.3em] block pl-1">Fal.ai API Kimlik Bilgileri</label>
                  <div className="relative">
                    <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-white/10" size={15} />
                    <input
                      type="password"
                      value={falKey}
                      onChange={(e) => setFalKey(e.target.value)}
                      placeholder="API ANAHTARINIZI BURAYA YAPIŞTIRIN"
                      className="input-modern pl-12 pr-12 focus:border-[#c5a059]/50"
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setShowSettings(false)}
                  className="w-full btn-primary"
                >
                  Yetkilendir ve Senkronize Et
                </motion.button>

                <div className="flex items-start gap-4 p-5 rounded-xl bg-white/[0.015] border border-white/[0.04]">
                  <div className="p-2 bg-[#c5a059]/8 rounded-lg flex-shrink-0">
                    <Shield size={13} className="text-[#c5a059]/60" />
                  </div>
                  <p className="text-[10px] text-white/25 leading-relaxed font-medium">
                    Kimlik bilgileriniz yerel tarayıcı önbelleğinizde saklanır ve asla sunucularımıza gönderilmez. Yüksek moda güvenlik kuralları uygulanmaktadır.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
