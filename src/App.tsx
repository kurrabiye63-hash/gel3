import React, { useState, useEffect } from "react";
import { Key, Settings2, X, Zap, LayoutGrid, Shield, Gem, ArrowRight } from "lucide-react";
import { Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ImageUploader } from "./components/ImageUploader";
import { ViewModeNav } from "./components/ViewModeNav";
import { ViewPage } from "./pages/ViewPage";
import { ResultGallery } from "./components/ResultGallery";
import { generateBridalImage, AIModelId, ViewMode } from "./services/falApi";

interface GenerationResult {
  id: string;
  url: string;
  timestamp: string;
  engine: string;
  seed: number;
  viewMode: string;
}

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

  const location = useLocation();

  const getCurrentViewMode = (): ViewMode => {
    if (location.pathname === "/back") return "back";
    if (location.pathname === "/closeup") return "closeup";
    if (location.pathname === "/location") return "location";
    return "front";
  };

  useEffect(() => {
    if (falKey) {
      localStorage.setItem("FAL_KEY", falKey);
      (window as any).process = { env: { FAL_KEY: falKey } };
    }
  }, [falKey]);

  // Sync shootMode with route
  useEffect(() => {
    if (location.pathname === "/location") {
      setShootMode("location");
    } else if (shootMode === "location" && location.pathname !== "/location") {
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

  const handleGenerate = async () => {
    const viewMode = getCurrentViewMode();

    if (!dressUrl || !modelUrl) {
      alert("Lütfen hem tasarım hem de model görselini yükleyin.");
      return;
    }

    if (viewMode === "location" && !locationUrl) {
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
      setProgressMsg("Editoryal Veriler Senkronize Ediliyor...");

      const currentSeed = seed || Math.floor(Math.random() * 1000000);

      const response = await generateBridalImage({
        modelId: engine,
        garmentImageUrl: dressUrl,
        modelImageUrl: modelUrl,
        seed: currentSeed,
        quality: quality,
        viewMode: viewMode,
        locationImageUrl: viewMode === "location" ? locationUrl : undefined,
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

  return (
    <div className="app-container">
      <FloatingParticles />

      {/* ─── Sidebar Control Panel ─── */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <motion.div
            whileHover={{ rotate: 5, scale: 1.05 }}
            className="w-11 h-11 bg-gradient-to-br from-[#c5a059] to-[#b8860b] rounded-xl flex items-center justify-center text-black shadow-lg shadow-[#c5a059]/20"
          >
            <Gem size={20} strokeWidth={2.5} />
          </motion.div>
          <div>
            <h1 className="font-display text-xl font-bold tracking-tight">
              Fashion<span className="text-[#c5a059]">Master</span>
            </h1>
            <p className="text-[10px] text-white/25 font-bold uppercase tracking-[0.25em]">Haute Couture Stüdyo</p>
          </div>
        </div>

        <div className="sidebar-content scroll-area space-y-4">
          {/* View Mode Navigation */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-4 h-4 rounded-md bg-[#c5a059]/10 flex items-center justify-center">
                <ArrowRight size={10} className="text-[#c5a059]" />
              </div>
              <h2 className="font-display text-[9px] font-bold text-white/35 uppercase tracking-[0.25em]">Çekim Modu</h2>
            </div>
            <ViewModeNav shootMode={shootMode} onShootModeChange={setShootMode} />
          </section>

          <div className="section-divider" />

          {/* Creative Assets Section */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-4 h-4 rounded-md bg-[#c5a059]/10 flex items-center justify-center">
                <LayoutGrid size={10} className="text-[#c5a059]" />
              </div>
              <h2 className="font-display text-[9px] font-bold text-white/35 uppercase tracking-[0.25em]">Yaratıcı Varlıklar</h2>
            </div>
            <div className="space-y-4">
              <ImageUploader label="Giysi Referansı" onUpload={setDressUrl} isLoading={isLoading} />
              <ImageUploader label="Model Konsepti" onUpload={setModelUrl} isLoading={isLoading} />

              {/* Location Image Uploader - only in location mode */}
              <AnimatePresence>
                {isLocationMode && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
                  >
                    <div className="relative">
                      {/* Accent border */}
                      <div className="absolute -left-[1px] top-2 bottom-2 w-[2px] rounded-full bg-[#59c5a0]/30" />
                      <div className="pl-3">
                        <ImageUploader label="Mekan Fotoğrafı" onUpload={setLocationUrl} isLoading={isLoading} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>

          <div className="section-divider" />

          {/* Parameters Section */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-4 h-4 rounded-md bg-[#c5a059]/10 flex items-center justify-center">
                <Settings2 size={10} className="text-[#c5a059]" />
              </div>
              <h2 className="font-display text-[9px] font-bold text-white/35 uppercase tracking-[0.25em]">Parametreler</h2>
            </div>
            <div className="space-y-4">
              {/* Quality Badge */}
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-white/25 uppercase tracking-widest pl-1">Çıktı Kalitesi</label>
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#c5a059]/[0.04] border border-[#c5a059]/15">
                  <div className="w-2 h-2 rounded-full bg-[#c5a059]" />
                  <span className="text-[10px] font-bold text-[#c5a059] uppercase tracking-widest">4K Ultra</span>
                  <span className="text-[8px] text-white/20 font-medium ml-auto">Sabit</span>
                </div>
              </div>

              {/* Seed Input */}
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-white/25 uppercase tracking-widest pl-1">Sabit Tohum (Seed)</label>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="Rastgele Seçim"
                    value={seed || ""}
                    onChange={(e) => setSeed(e.target.value ? parseInt(e.target.value) : undefined)}
                    className="input-modern pr-10"
                  />
                  <Zap size={13} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/10" />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* System Access Button */}
        <div className="p-4 border-t border-white/[0.04]">
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => setShowSettings(true)}
            className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-[10px] font-bold text-white/25 uppercase tracking-widest hover:bg-white/[0.04] hover:text-[#c5a059] hover:border-[#c5a059]/20 transition-all duration-300"
          >
            <Shield size={13} /> Sistem Erişimi
          </motion.button>
        </div>
      </aside>

      {/* ─── Main Production Stage ─── */}
      <main className="main-stage">
        <Routes>
          <Route
            path="/"
            element={
              <ViewPage
                title="Ön Görünüm"
                subtitle="Editoryal Ön Çekim Modu"
                accentColor="#c5a059"
                viewMode="front"
                engine={engine}
                onSelectEngine={setEngine}
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
                accentColor="#59a0c5"
                viewMode="back"
                engine={engine}
                onSelectEngine={setEngine}
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
                accentColor="#a059c5"
                viewMode="closeup"
                engine={engine}
                onSelectEngine={setEngine}
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
                accentColor="#59c5a0"
                viewMode="location"
                engine={engine}
                onSelectEngine={setEngine}
                isLoading={isLoading}
                onGenerate={handleGenerate}
                canGenerate={!!dressUrl && !!modelUrl && !!locationUrl}
                progressMsg={progressMsg}
              />
            }
          />
        </Routes>

        {/* System Dock */}
        <div className="h-10 border-t border-white/[0.04] flex items-center justify-between px-6 bg-black/30 backdrop-blur-xl relative z-10">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 text-[9px] font-bold text-white/20 uppercase tracking-widest">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 status-dot" />
              Sunucu: <span className="text-emerald-400/60 ml-1">Optimal</span>
            </div>
            <div className="h-3 w-[1px] bg-white/[0.06]" />
            <div className="flex items-center gap-2 text-[9px] font-bold text-white/20 uppercase tracking-widest">
              Mod: <span className="ml-1" style={{ color: isLocationMode ? "#59c5a0aa" : "#c5a059aa" }}>
                {getCurrentViewMode().toUpperCase()}
              </span>
            </div>
            <div className="h-3 w-[1px] bg-white/[0.06]" />
            <div className="flex items-center gap-2 text-[9px] font-bold text-white/20 uppercase tracking-widest">
              Düğüm: <span className="text-[#c5a059]/70 ml-1">{engine.split('/').pop()?.toUpperCase()}</span>
            </div>
          </div>
          <div className="text-[9px] font-mono text-white/8 uppercase font-bold tracking-wider">
            FM_{new Date().toISOString().slice(0,10).replace(/-/g,'')}
          </div>
        </div>
      </main>

      {/* ─── Results History Panel ─── */}
      <aside className="gallery-panel p-5 overflow-hidden">
        <ResultGallery results={results} isLoading={isLoading} />
      </aside>

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
