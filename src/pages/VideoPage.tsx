import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Download, Play, Film, Sparkles, Upload, Image as ImageIcon, X, AlertTriangle, Zap } from "lucide-react";
import { fal } from "@fal-ai/client";
import { generateVideoFromImage, VIDEO_LOCKED_PROMPT } from "../services/videoApi";
import { uploadFile } from "../services/falApi";
import { useAuth } from "../context/AuthContext";
import { PricingModal } from "../components/PricingModal";
import { AuthModal } from "../components/AuthModal";
import logoUrl from "../logo.jpg";

interface LocationState {
  imageUrl?: string;
  autoGenerate?: boolean;
  viewMode?: string;
}

export const VideoPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = (location.state || {}) as LocationState;

  const [imageUrl, setImageUrl] = useState<string>(state.imageUrl || "");
  const [previewUrl, setPreviewUrl] = useState<string>(state.imageUrl || "");
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progressMsg, setProgressMsg] = useState("Veo 3.1 Pro Başlatılıyor...");
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  
  const { user, credits, deductCredits } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Auto-generate if we came from the gallery with an image
  useEffect(() => {
    if (state.imageUrl && state.autoGenerate) {
      handleGenerate(state.imageUrl);
    }
  }, []);

  const handleFile = async (file: File) => {
    try {
      const localUrl = URL.createObjectURL(file);
      setPreviewUrl(localUrl);
      setVideoUrl(null);
      setError(null);
      const falUrl = await uploadFile(file);
      setImageUrl(falUrl);
    } catch (err) {
      setError("Görsel yüklenirken hata oluştu.");
    }
  };

  const handleGenerate = async (urlOverride?: string) => {
    const targetUrl = urlOverride || imageUrl;

    if (!user) {
      setShowAuth(true);
      return;
    }

    if ((credits ?? 0) < 10) {
      navigate("/pricing");
      return;
    }

    if (!targetUrl) {
      setError("Lütfen önce bir görsel yükleyin.");
      return;
    }

    const falKey = localStorage.getItem("FAL_KEY") || import.meta.env.VITE_FAL_KEY;
    if (!falKey) {
      setError("Fal.ai API anahtarı bulunamadı. Stüdyo'ya gidip anahtarı girin.");
      return;
    }

    fal.config({ credentials: falKey });
    setIsGenerating(true);
    setVideoUrl(null);
    setError(null);
    setProgressMsg("Kontürler Doğrulanıyor...");

    try {
      // Deduct 10 credits for video
      const success = await deductCredits(10);
      if (!success) {
        setError("Kontür düşülemedi. Bakiyenizi kontrol edin.");
        setIsGenerating(false);
        return;
      }

      setProgressMsg("Veo 3.1 Pro Başlatılıyor...");
      const url = await generateVideoFromImage(
        { imageUrl: targetUrl, duration: 8 },
        (msg) => setProgressMsg(msg)
      );
      setVideoUrl(url);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Video üretilirken hata oluştu. API anahtarınızı ve Veo 3.1 Pro erişiminizi kontrol edin.");
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadVideo = async () => {
    if (!videoUrl) return;
    try {
      const res = await fetch(videoUrl, { mode: "cors" });
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `fashionmaster-video-${Date.now()}.mp4`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      window.open(videoUrl, "_blank");
    }
  };

  return (
    <div className="fixed inset-0 bg-[#0a0a0a] flex flex-col overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[300px] rounded-full bg-[#c27ba0]/[0.04] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] rounded-full bg-[#D4AF37]/[0.03] blur-[100px] pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 h-14 flex items-center justify-between px-6 border-b border-white/[0.05] bg-black/30 backdrop-blur-md flex-shrink-0">
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05, x: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/30 hover:text-white transition-colors duration-200"
          >
            <ArrowLeft size={16} strokeWidth={1.5} />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Geri</span>
          </motion.button>

          <div className="w-[1px] h-5 bg-white/[0.06]" />

          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#c27ba0]/15 border border-[#c27ba0]/25 flex items-center justify-center">
              <Film size={13} className="text-[#c27ba0]" strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="text-[11px] font-bold text-white/80 tracking-wider">Video Stüdyosu</h1>
              <p className="text-[8px] text-white/25 uppercase tracking-[0.2em]">Görsel → Sinematik Video</p>
            </div>
          </div>
        </div>

        {/* User / Credits / Auth */}
        <div className="flex items-center gap-4">
          {user && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-full cursor-pointer hover:bg-[#D4AF37]/20 transition-all" onClick={() => navigate("/pricing")}>
              <Zap size={10} className="text-[#D4AF37] fill-[#D4AF37]" />
              <span className="text-[10px] font-bold text-[#D4AF37]">{credits ?? 0} Kontür</span>
            </div>
          )}

          {user ? (
            <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] text-xs font-bold uppercase">
              {user.email?.substring(0, 2)}
            </div>
          ) : (
            <button 
              onClick={() => setShowAuth(true)}
              className="px-4 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-[10px] font-bold text-white transition-all"
            >
              Giriş Yap
            </button>
          )}

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#c27ba0]/10 border border-[#c27ba0]/20">
            <Sparkles size={10} className="text-[#c27ba0]/80" />
            <span className="text-[9px] font-bold text-[#c27ba0]/80 uppercase tracking-[0.15em]">Veo 3.1 Pro</span>
            <span className="text-[8px] text-white/20">·</span>
            <span className="text-[9px] text-white/30 font-medium">8 Saniye</span>
          </div>
        </div>
      </header>

      {/* Main layout */}
      <main className="flex flex-1 overflow-hidden relative z-10">

        {/* Left: Image Input Panel */}
        <div className="w-[380px] flex-shrink-0 border-r border-white/[0.05] bg-black/20 flex flex-col p-5 gap-4 overflow-y-auto">

          {/* Section label */}
          <div className="flex items-center gap-2">
            <div className="w-[2px] h-4 rounded-full bg-[#c27ba0]/50" />
            <span className="text-[9px] font-bold text-white/35 uppercase tracking-[0.2em]">Kaynak Görsel</span>
          </div>

          {/* Upload / Preview area */}
          <div
            className={`relative rounded-xl border-2 border-dashed overflow-hidden transition-all duration-400 cursor-pointer
              ${previewUrl ? "border-white/[0.06] border-solid" : "border-white/[0.08] hover:border-[#c27ba0]/30"}
              ${isDragging ? "border-[#c27ba0]/50 bg-[#c27ba0]/[0.03] scale-[1.01]" : ""}
            `}
            style={{ aspectRatio: "9/16", maxHeight: "420px" }}
            onClick={() => !previewUrl && fileInputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault(); setIsDragging(false);
              if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
            }}
          >
            <input
              type="file"
              className="hidden"
              ref={fileInputRef}
              accept="image/*"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            />

            <AnimatePresence mode="wait">
              {previewUrl ? (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="relative w-full h-full"
                >
                  <img src={previewUrl} alt="Kaynak" className="w-full h-full object-cover" />
                  <button
                    onClick={(e) => { e.stopPropagation(); setPreviewUrl(""); setImageUrl(""); setVideoUrl(null); }}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/70 border border-white/20 flex items-center justify-center text-white/60 hover:text-white transition-colors z-10"
                  >
                    <X size={12} />
                  </button>
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="text-[7px] font-bold text-white/40 uppercase tracking-widest">Kaynak Kilitli</span>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-full h-full flex flex-col items-center justify-center gap-3 p-6"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#c27ba0]/10 border border-[#c27ba0]/20 flex items-center justify-center">
                    <ImageIcon size={22} className="text-[#c27ba0]/60" strokeWidth={1.5} />
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-1">Görsel Seç</p>
                    <p className="text-[8px] text-white/15">veya sürükle-bırak</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Upload different image button */}
          {previewUrl && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center justify-center gap-2 py-2.5 rounded-lg border border-white/[0.06] bg-white/[0.02] text-white/30 hover:text-white/60 hover:border-white/[0.1] transition-all duration-300"
            >
              <Upload size={12} />
              <span className="text-[9px] font-semibold uppercase tracking-[0.15em]">Farklı Görsel Yükle</span>
            </motion.button>
          )}

          {/* Locked prompt info */}
          <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#c27ba0]/60" />
              <span className="text-[8px] font-bold text-white/30 uppercase tracking-[0.2em]">Video Protokolü</span>
            </div>
            <div className="space-y-1.5">
              {[
                "Tüm kumaş detayları kilitli",
                "Model kimliği korunur",
                "Yavaş sinematik hareket",
                "Süre: 8 saniye sabit",
                "Veo 3.1 Pro motoru",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-[#c27ba0]/40 flex-shrink-0" />
                  <span className="text-[8px] text-white/20">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <motion.button
            whileHover={!isGenerating && !!previewUrl ? { scale: 1.02, y: -2 } : {}}
            whileTap={!isGenerating && !!previewUrl ? { scale: 0.97 } : {}}
            onClick={() => handleGenerate()}
            disabled={isGenerating || !previewUrl}
            className={`relative w-full py-4 rounded-xl font-bold text-[11px] uppercase tracking-[0.25em] transition-all duration-400 overflow-hidden
              ${previewUrl && !isGenerating
                ? "bg-gradient-to-r from-[#c27ba0] to-[#a0607f] text-white shadow-[0_4px_20px_rgba(194,123,160,0.25)] hover:shadow-[0_6px_28px_rgba(194,123,160,0.35)]"
                : "bg-white/[0.04] text-white/20 cursor-not-allowed border border-white/[0.04]"
              }
            `}
          >
            {isGenerating ? (
              <span className="flex items-center justify-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                  className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full"
                />
                Üretiliyor...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <Film size={14} />
                Video Üret
              </span>
            )}
          </motion.button>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-start gap-2.5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20"
              >
                <AlertTriangle size={13} className="text-red-400/80 flex-shrink-0 mt-0.5" />
                <p className="text-[9px] text-red-300/70 leading-relaxed">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Center: Video Output */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 gap-6 overflow-hidden">
          <AnimatePresence mode="wait">
            {isGenerating ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-8"
              >
                {/* Animated film frame */}
                <div className="relative w-56 h-56">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                    className="absolute inset-0 rounded-full border border-dashed border-[#c27ba0]/15"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
                    className="absolute inset-4 rounded-full border border-dashed border-[#c27ba0]/20"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <Film size={32} className="text-[#c27ba0]/70" strokeWidth={1} />
                    </motion.div>
                    <div className="w-16 h-[1px] bg-white/[0.04] relative overflow-hidden rounded-full">
                      <motion.div
                        animate={{ x: [-64, 64] }}
                        transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-[#c27ba0] to-transparent"
                      />
                    </div>
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <p className="text-[11px] font-bold text-white/50 uppercase tracking-[0.3em]">Video Sentezleniyor</p>
                  <motion.p
                    key={progressMsg}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[9px] text-white/20 max-w-xs text-center leading-relaxed"
                  >
                    {progressMsg}
                  </motion.p>
                  <p className="text-[8px] text-[#c27ba0]/30 uppercase tracking-[0.2em]">Veo 3.1 Pro · 8 Saniye</p>
                </div>
              </motion.div>
            ) : videoUrl ? (
              <motion.div
                key="video"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", damping: 20 }}
                className="flex flex-col items-center gap-6 w-full max-w-md"
              >
                {/* Success label */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-400/10 border border-emerald-400/20"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]" />
                  <span className="text-[9px] font-bold text-emerald-400/80 uppercase tracking-[0.2em]">Video Hazır</span>
                </motion.div>

                {/* Video player */}
                <div className="relative w-full rounded-2xl overflow-hidden border border-white/[0.06] bg-black shadow-2xl">
                  <video
                    ref={videoRef}
                    src={videoUrl}
                    className="w-full"
                    controls
                    autoPlay
                    loop
                    playsInline
                    style={{ maxHeight: "60vh", objectFit: "contain" }}
                  />
                </div>

                {/* Action buttons */}
                <div className="flex gap-3 w-full">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={downloadVideo}
                    className="flex-1 flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-gradient-to-r from-[#c27ba0] to-[#a0607f] text-white font-bold text-[11px] uppercase tracking-[0.2em] shadow-[0_4px_20px_rgba(194,123,160,0.25)] hover:shadow-[0_6px_28px_rgba(194,123,160,0.35)] transition-shadow duration-300"
                  >
                    <Download size={14} />
                    Videoyu İndir
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleGenerate()}
                    className="px-5 py-3.5 rounded-xl border border-white/[0.08] bg-white/[0.03] text-white/40 hover:text-white/70 hover:border-white/[0.15] transition-all duration-300 text-[10px] font-bold uppercase tracking-[0.15em]"
                  >
                    Yeniden Üret
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center gap-6 text-center"
              >
                <div className="relative">
                  <div className="w-28 h-28 rounded-3xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-center">
                    <Film size={36} className="text-white/[0.06]" strokeWidth={1} />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-[#c27ba0]/10 border border-[#c27ba0]/20 flex items-center justify-center">
                    <Sparkles size={12} className="text-[#c27ba0]/60" />
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-[11px] font-bold text-white/20 uppercase tracking-[0.3em]">Video Bekleniyor</p>
                  <p className="text-[9px] text-white/10 max-w-xs leading-relaxed">
                    {previewUrl
                      ? "Sol taraftaki \"Video Üret\" butonuna basın"
                      : "Önce sol taraftan bir kaynak görsel yükleyin"}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      
      <PricingModal isOpen={showPricing} onClose={() => setShowPricing(false)} />
      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
    </div>
  );
};
