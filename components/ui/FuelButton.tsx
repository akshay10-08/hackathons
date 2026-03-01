"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Rocket } from "lucide-react";
import { TipModal } from "./TipModal";

export function FuelButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-6 py-3.5 text-white font-black uppercase text-sm border-[3px] border-black hover:-translate-y-1 active:translate-y-0 transition-all cursor-pointer fuel-pulse"
        style={{
          background: "linear-gradient(135deg, #FF2D7B 0%, #FF6B35 50%, #FFD500 100%)",
          boxShadow: "4px 4px 0px 0px rgba(0,0,0,1), 0 0 20px rgba(255,45,123,0.4)",
        }}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, type: "spring", damping: 15 }}
        whileHover={{ scale: 1.08 }}
      >
        <Rocket size={20} strokeWidth={2.5} className="animate-bounce drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
        <span className="hidden sm:inline drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">Fuel This Platform</span>
        <span className="sm:hidden drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">Fuel</span>
      </motion.button>

      {/* Modal */}
      <TipModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
