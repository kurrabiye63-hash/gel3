import React from "react";
import { Wand2, Check, Zap, Camera, Microscope, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AIModelId, ViewMode } from "../services/falApi";

interface Props {
  selected: AIModelId;
  onSelect: (id: AIModelId) => void;
  isLoading?: boolean;
  viewMode?: ViewMode;
}

export const EngineSelector: React.FC<Props> = ({ selected, onSelect, isLoading, viewMode = "front" }) => {
  const engines = [
    {
      id: "fal-ai/nano-banana-pro/edit",
      name: "ANA PROTOKOL v.01",
      tag: "HASSASİYET",
      description: "Editoryal 4K Stüdyo Giysi Aktarım Motoru",
      icon: <Microscope size={18} strokeWidth={1.8} />,
      quality: "4K HDR",
      speed: "Kararlı",
      color: "#c5a059",
      supportsAllViews: true,
    },
    {
      id: "fal-ai/fashn/tryon/v1.5",
      name: "FASHN ÇEKİRDEK 1.5",
      tag: "SADAKAT",
      description: "Kumaş-Model Sentetik Etkileşim İşleme",
      icon: <Camera size={18} strokeWidth={1.8} />,
      quality: "Ultra Sadakat",
      speed: "Hızlı",
      color: "#59a0c5",
      supportsAllViews: false,
    },
    {
      id: "fal-ai/idm-vton",
      name: "IDM HİBRİT",
      tag: "STİL",
      description: "Nöral Doku Eşleme ile Poz Adaptasyonu",
      icon: <Wand2 size={18} strokeWidth={1.8} />,
      quality: "HD Esnek",
      speed: "Turbo",
      color: "#a059c5",
      supportsAllViews: false,
    }
  ];

  const isNonFrontView = viewMode !== "front";

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <div className="h-[1px] w-3 bg-[#c5a059]/30" />
          <h3 className="font-display text-[9px] font-bold tracking-[0.3em] text-white/25 uppercase">AI İşlem Düğümleri</h3>
          <div className="h-[1px] flex-1 bg-white/[0.03]" />
        </div>
        <AnimatePresence>
          {isLoading && (
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
              <Zap size={10} className="text-[#c5a059] animate-pulse" />
              <span className="text-[9px] font-bold text-[#c5a059]/40 uppercase tracking-widest">İşleniyor</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {engines.map((engine, index) => {
          const isSelected = selected === engine.id;
          const isDisabled = isNonFrontView && !engine.supportsAllViews;
          return (
            <motion.button
              key={engine.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              whileHover={!isDisabled ? { scale: 1.008 } : {}}
              whileTap={!isDisabled ? { scale: 0.995 } : {}}
              onClick={() => !isLoading && !isDisabled && onSelect(engine.id as AIModelId)}
              disabled={isLoading || isDisabled}
              className={`card-glass p-3.5 text-left relative overflow-hidden group transition-all duration-500
                ${isDisabled
                  ? 'opacity-30 cursor-not-allowed grayscale'
                  : isSelected
                    ? 'border-[#c5a059]/25 bg-[#c5a059]/[0.03]'
                    : 'border-white/[0.03] hover:bg-white/[0.02] hover:border-white/[0.08]'
                }`}
            >
              {/* Selection indicator bar */}
              {isSelected && !isDisabled && (
                <motion.div
                  layoutId="engine-active-bar"
                  className="absolute left-0 top-3 bottom-3 w-[2px] rounded-full"
                  style={{ background: engine.color }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                />
              )}

              {/* Subtle hover glow */}
              {!isDisabled && (
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 0% 50%, ${engine.color}08 0%, transparent 50%)`,
                  }}
                />
              )}

              <div className="flex items-center gap-3 relative z-10">
                <motion.div
                  animate={isSelected && !isDisabled ? { scale: 1 } : { scale: 0.95 }}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-500 flex-shrink-0
                    ${isSelected && !isDisabled
                      ? 'text-black shadow-lg'
                      : 'bg-white/[0.03] text-white/15 group-hover:text-white/30 group-hover:bg-white/[0.05]'
                    }`}
                  style={isSelected && !isDisabled ? {
                    background: `linear-gradient(135deg, ${engine.color}, ${engine.color}cc)`,
                    boxShadow: `0 8px 20px ${engine.color}30`,
                  } : {}}
                >
                  {engine.icon}
                </motion.div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1.5">
                    <h4 className={`text-[11px] font-bold tracking-wider transition-colors duration-300
                      ${isSelected && !isDisabled ? 'text-white' : 'text-white/35 group-hover:text-white/60'}`}>
                      {engine.name}
                    </h4>
                    <span className={`text-[7px] font-bold px-1.5 py-0.5 rounded-md tracking-wide uppercase transition-all duration-300
                      ${isSelected && !isDisabled
                        ? 'text-[#c5a059]'
                        : 'bg-white/[0.03] text-white/10'
                      }`}
                      style={isSelected && !isDisabled ? { background: `${engine.color}15`, color: engine.color } : {}}
                    >
                      {engine.tag}
                    </span>

                    {/* Incompatibility warning */}
                    {isDisabled && (
                      <span className="flex items-center gap-1 text-[7px] font-bold text-amber-400/60 uppercase tracking-wider">
                        <AlertTriangle size={9} />
                        Sadece Ön
                      </span>
                    )}
                  </div>
                  <p className={`text-[9px] leading-relaxed transition-colors duration-300 font-medium tracking-wide
                    ${isSelected && !isDisabled ? 'text-white/45' : 'text-white/15 group-hover:text-white/25'}`}>
                    {isDisabled
                      ? "Bu motor yalnızca Ön Görünüm modunu destekler"
                      : engine.description
                    }
                  </p>
                </div>

                <div className="flex items-center gap-4 flex-shrink-0">
                  <div className="flex flex-col items-end gap-1.5">
                    <span className={`text-[8px] font-bold tracking-wider transition-colors duration-300
                      ${isSelected && !isDisabled ? '' : 'text-white/8 group-hover:text-white/12'}`}
                      style={isSelected && !isDisabled ? { color: engine.color } : {}}
                    >
                      {engine.quality}
                    </span>
                    <div className="flex gap-0.5">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className={`w-3 h-[2px] rounded-full transition-all duration-500
                            ${isSelected && !isDisabled ? 'opacity-80' : 'bg-white/5 opacity-30 group-hover:opacity-50'}`}
                          style={isSelected && !isDisabled ? { background: engine.color } : {}}
                        />
                      ))}
                    </div>
                  </div>

                  <motion.div
                    animate={isSelected && !isDisabled ? { scale: 1 } : { scale: 0.7 }}
                    className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-300
                      ${isSelected && !isDisabled ? 'text-black' : 'bg-white/[0.03] text-transparent'}`}
                    style={isSelected && !isDisabled ? { background: engine.color } : {}}
                  >
                    <Check size={12} strokeWidth={3} />
                  </motion.div>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* View mode compatibility note */}
      {isNonFrontView && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 px-4 py-3 rounded-xl bg-amber-500/5 border border-amber-500/10"
        >
          <AlertTriangle size={12} className="text-amber-400/60 flex-shrink-0" />
          <p className="text-[9px] text-amber-400/50 font-medium leading-relaxed">
            {viewMode === "back" ? "Arka Görünüm" : viewMode === "location" ? "Mekan Çekimi" : "Yakın Plan"} modu yalnızca <strong className="text-amber-400/80">ANA PROTOKOL</strong> motoru ile çalışır. Diğer motorlar metin prompt'u desteklemez.
          </p>
        </motion.div>
      )}
    </div>
  );
};
