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
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 bg-neo-yellow text-black border-[3px] border-black font-black uppercase text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 active:translate-y-0 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer fuel-pulse"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, type: "spring", damping: 15 }}
        whileHover={{ scale: 1.05 }}
      >
        <Rocket size={18} strokeWidth={2.5} className="animate-bounce" />
        <span className="hidden sm:inline">Fuel This Platform</span>
        <span className="sm:hidden">Fuel</span>
      </motion.button>

      {/* Modal */}
      <TipModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
