import React from "react";
import { Eye, RotateCcw, Focus, Camera, MapPin } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

type ShootMode = "studio" | "location";

interface ViewTab {
  key: string;
  path: string;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
  color: string;
}

const studioTabs: ViewTab[] = [
  {
    key: "front",
    path: "/",
    label: "Ön Görünüm",
    sublabel: "Editoryal Çekim",
    icon: <Eye size={16} strokeWidth={1.8} />,
    color: "#c5a059",
  },
  {
    key: "back",
    path: "/back",
    label: "Arka Görünüm",
    sublabel: "Arka Çekim",
    icon: <RotateCcw size={16} strokeWidth={1.8} />,
    color: "#59a0c5",
  },
  {
    key: "closeup",
    path: "/closeup",
    label: "Yakın Plan",
    sublabel: "Detay Çekim",
    icon: <Focus size={16} strokeWidth={1.8} />,
    color: "#a059c5",
  },
];

interface Props {
  shootMode: ShootMode;
  onShootModeChange: (mode: ShootMode) => void;
}

export const ViewModeNav: React.FC<Props> = ({ shootMode, onShootModeChange }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveKey = () => {
    if (location.pathname === "/back") return "back";
    if (location.pathname === "/closeup") return "closeup";
    if (location.pathname === "/location") return "location";
    return "front";
  };

  const activeKey = getActiveKey();

  const handleShootModeChange = (mode: ShootMode) => {
    onShootModeChange(mode);
    if (mode === "location") {
      navigate("/location");
    } else {
      if (location.pathname === "/location") {
        navigate("/");
      }
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* ─── Stüdyo / Mekan Toggle ─── */}
      <div className="grid grid-cols-2 gap-2">
        {/* Stüdyo Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => handleShootModeChange("studio")}
          className={`relative flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl transition-all duration-400 overflow-hidden border
            ${shootMode === "studio"
              ? "bg-[#c5a059]/[0.06] border-[#c5a059]/25"
              : "bg-white/[0.01] border-white/[0.05] hover:bg-white/[0.03] hover:border-white/[0.08]"
            }`}
        >
          {/* Active glow */}
          {shootMode === "studio" && (
            <motion.div
              layoutId="shoot-mode-glow"
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(circle at 50% 30%, rgba(197, 160, 89, 0.08) 0%, transparent 70%)",
              }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            />
          )}

          <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-400
            ${shootMode === "studio"
              ? "bg-gradient-to-br from-[#c5a059] to-[#b8860b] text-black shadow-lg shadow-[#c5a059]/20"
              : "bg-white/[0.04] text-white/20"
            }`}
          >
            <Camera size={15} strokeWidth={1.8} />
          </div>

          <div className="text-center relative z-10">
            <p className={`text-[10px] font-bold tracking-wider transition-colors duration-300
              ${shootMode === "studio" ? "text-white" : "text-white/25"}`}>
              Stüdyo
            </p>
            <p className={`text-[6px] font-bold uppercase tracking-[0.2em] mt-0.5 transition-colors duration-300
              ${shootMode === "studio" ? "text-[#c5a059]/60" : "text-white/10"}`}>
              İç Mekan
            </p>
          </div>

          {/* Bottom accent */}
          {shootMode === "studio" && (
            <motion.div
              layoutId="shoot-mode-bar"
              className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full bg-[#c5a059]/50"
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            />
          )}
        </motion.button>

        {/* Mekan Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => handleShootModeChange("location")}
          className={`relative flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl transition-all duration-400 overflow-hidden border
            ${shootMode === "location"
              ? "bg-[#59c5a0]/[0.06] border-[#59c5a0]/25"
              : "bg-white/[0.01] border-white/[0.05] hover:bg-white/[0.03] hover:border-white/[0.08]"
            }`}
        >
          {/* Active glow */}
          {shootMode === "location" && (
            <motion.div
              layoutId="shoot-mode-glow"
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(circle at 50% 30%, rgba(89, 197, 160, 0.08) 0%, transparent 70%)",
              }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            />
          )}

          <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-400
            ${shootMode === "location"
              ? "bg-gradient-to-br from-[#59c5a0] to-[#3a9e7a] text-black shadow-lg shadow-[#59c5a0]/20"
              : "bg-white/[0.04] text-white/20"
            }`}
          >
            <MapPin size={15} strokeWidth={1.8} />
          </div>

          <div className="text-center relative z-10">
            <p className={`text-[10px] font-bold tracking-wider transition-colors duration-300
              ${shootMode === "location" ? "text-white" : "text-white/25"}`}>
              Mekan
            </p>
            <p className={`text-[6px] font-bold uppercase tracking-[0.2em] mt-0.5 transition-colors duration-300
              ${shootMode === "location" ? "text-[#59c5a0]/60" : "text-white/10"}`}>
              Dış Mekan
            </p>
          </div>

          {/* Bottom accent */}
          {shootMode === "location" && (
            <motion.div
              layoutId="shoot-mode-bar"
              className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full bg-[#59c5a0]/50"
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            />
          )}
        </motion.button>
      </div>

      {/* ─── Studio Sub-Tabs ─── */}
      <AnimatePresence mode="wait">
        {shootMode === "studio" && (
          <motion.div
            key="studio-tabs"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-1.5"
          >
            {studioTabs.map((tab) => {
              const isActive = activeKey === tab.key;
              return (
                <motion.button
                  key={tab.key}
                  whileHover={{ x: 3 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(tab.path)}
                  className={`relative flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-all duration-300 overflow-hidden
                    ${isActive
                      ? "bg-white/[0.04] border border-white/[0.08]"
                      : "bg-transparent border border-transparent hover:bg-white/[0.02] hover:border-white/[0.04]"
                    }`}
                >
                  {/* Active indicator bar */}
                  {isActive && (
                    <motion.div
                      layoutId="view-nav-active"
                      className="absolute left-0 top-2 bottom-2 w-[2px] rounded-full"
                      style={{ background: tab.color }}
                      transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    />
                  )}

                  {/* Icon */}
                  <div
                    className={`w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 transition-all duration-300
                      ${isActive ? "text-black" : "bg-white/[0.03] text-white/20"}`}
                    style={
                      isActive
                        ? {
                            background: `linear-gradient(135deg, ${tab.color}, ${tab.color}cc)`,
                            boxShadow: `0 4px 12px ${tab.color}30`,
                          }
                        : {}
                    }
                  >
                    {tab.icon}
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-[10px] font-bold tracking-wider transition-colors duration-300
                        ${isActive ? "text-white" : "text-white/30"}`}
                    >
                      {tab.label}
                    </p>
                    <p
                      className={`text-[8px] font-bold uppercase tracking-[0.2em] transition-colors duration-300
                        ${isActive ? "" : "text-white/10"}`}
                      style={isActive ? { color: `${tab.color}99` } : {}}
                    >
                      {tab.sublabel}
                    </p>
                  </div>

                  {/* Active dot */}
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: tab.color }}
                    />
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        )}

        {/* ─── Location Info ─── */}
        {shootMode === "location" && (
          <motion.div
            key="location-info"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#59c5a0]/[0.04] border border-[#59c5a0]/10"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#59c5a0] flex-shrink-0 animate-pulse" />
            <p className="text-[9px] text-[#59c5a0]/50 font-medium leading-relaxed">
              Mekan fotoğrafı ile dış mekan editoryal çekimi
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
