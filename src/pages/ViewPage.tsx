import React from "react";
import { Play, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { EngineSelector } from "../components/EngineSelector";
import { AIModelId, ViewMode } from "../services/falApi";

interface ViewPageProps {
  title: string;
  subtitle: string;
  accentColor: string;
  viewMode: ViewMode;
  engine: AIModelId;
  onSelectEngine: (id: AIModelId) => void;
  isLoading: boolean;
  onGenerate: () => void;
  canGenerate: boolean;
  progressMsg: string;
}

export const ViewPage: React.FC<ViewPageProps> = ({
  title,
  subtitle,
  accentColor,
  viewMode,
  engine,
  onSelectEngine,
  isLoading,
  onGenerate,
  canGenerate,
  progressMsg,
}) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 relative z-10">
      <motion.div
        key={viewMode}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
        className="w-full max-w-xl space-y-8"
      >
        {/* Hero Title */}
        <div className="text-center space-y-3">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h2 className="font-display text-4xl font-extrabold tracking-tight leading-tight"
              style={{
                background: `linear-gradient(135deg, #ffffff 0%, ${accentColor}80 50%, ${accentColor} 100%)`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {title}
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-4"
          >
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent" style={{ backgroundImage: `linear-gradient(to right, transparent, ${accentColor}50)` }} />
            <p className="text-[10px] text-white/25 font-semibold uppercase tracking-[0.5em]">{subtitle}</p>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent" style={{ backgroundImage: `linear-gradient(to left, transparent, ${accentColor}50)` }} />
          </motion.div>

          {/* View Mode Badge */}
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center"
          >
            <div
              className="px-4 py-1.5 rounded-full text-[8px] font-bold uppercase tracking-[0.3em] border"
              style={{
                borderColor: `${accentColor}30`,
                background: `${accentColor}08`,
                color: `${accentColor}`,
              }}
            >
              {viewMode === "front" ? "📸 Ön Çekim Modu" : viewMode === "back" ? "🔄 Arka Çekim Modu" : viewMode === "location" ? "📍 Mekan Çekim Modu" : "🔍 Yakın Plan Modu"}
            </div>
          </motion.div>
        </div>

        {/* Engine & Generate */}
        <div className="space-y-6">
          <EngineSelector selected={engine} onSelect={onSelectEngine} isLoading={isLoading} viewMode={viewMode} />

          <div className="space-y-4">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={onGenerate}
              disabled={isLoading || !canGenerate}
              className="w-full btn-primary disabled:opacity-20 disabled:grayscale disabled:cursor-not-allowed disabled:transform-none group text-sm"
            >
              <div className="flex items-center justify-center gap-4">
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                    <span>Podyum İşleniyor...</span>
                  </>
                ) : (
                  <>
                    <Play size={16} fill="currentColor" strokeWidth={0} className="group-hover:translate-x-0.5 transition-transform duration-300" />
                    <span>Üretimi Başlat</span>
                    <ArrowRight size={14} className="opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                  </>
                )}
              </div>
            </motion.button>

            {/* Progress Indicator */}
            <AnimatePresence>
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <div className="loader-strip">
                    <div className="loader-strip-fill" />
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest px-1">
                    <span className="text-[#c5a059]/70">{progressMsg}</span>
                    <span className="text-[#c5a059]/40 animate-pulse">Aktif_Görev</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Ready State */}
            {!isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex justify-center pt-2 opacity-15 hover:opacity-40 transition-opacity duration-700"
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="w-[1px] h-6 bg-gradient-to-b from-white/40 to-transparent" />
                  <p className="text-[8px] font-bold uppercase tracking-[0.4em]">Giriş İçin Hazır</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
