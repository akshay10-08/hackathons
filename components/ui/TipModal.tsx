"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check, Heart } from "lucide-react";
import Image from "next/image";
import {
  MONTHLY_GOAL,
  addSupporter,
  getTotalCount,
  getMonthlyRaised,
} from "@/lib/tipping";

const PRESETS = [5, 10, 25];

// ─── Crypto Wallets ─────────────────────────────────────────────────────────
type CryptoWallet = {
  id: string;
  name: string;
  symbol: string;
  address: string;
  qr: string;
  color: string;
  icon: string;
};

const WALLETS: CryptoWallet[] = [
  {
    id: "eth",
    name: "Ethereum",
    symbol: "ETH",
    address: "0x7d32C501BA6C98A5AC1B6696275Ed8516B7779A3",
    qr: "/qr-ethereum.jpg",
    color: "#627EEA",
    icon: "💎"
  },
  {
    id: "btc",
    name: "Bitcoin",
    symbol: "BTC",
    address: "bc1qdxqjvy4elna4p3ngkhq3mxvwr4mn88r95pdeqm",
    qr: "/qr-bitcoin.jpg",
    color: "#F7931A",
    icon: "₿"
  },
  {
    id: "sol",
    name: "Solana",
    symbol: "SOL",
    address: "DrNTMrmbG7SvuorjutVarcsFqBW8JdKV1NhNvosQgG4",
    qr: "/qr-solana.jpg",
    color: "#14F195",
    icon: "◎"
  },
  {
    id: "matic",
    name: "Polygon",
    symbol: "MATIC",
    address: "0x7d32C501BA6C98A5AC1B6696275Ed8516B7779A3",
    qr: "/qr-polygon.jpg",
    color: "#8247E5",
    icon: "⬡"
  }
];

// ─── Animated Counter ───────────────────────────────────────────────────────
function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(value);
  const prevRef = useRef(value);

  useEffect(() => {
    const prev = prevRef.current;
    if (prev === value) return;

    const diff = value - prev;
    const steps = Math.min(Math.abs(diff), 30);
    const stepSize = diff / steps;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplay(Math.round(prev + stepSize * step));
      if (step >= steps) {
        clearInterval(interval);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setDisplay(value);
      }
    }, 30);

    prevRef.current = value;
    return () => clearInterval(interval);
  }, [value]);

  return <span>{display.toLocaleString()}</span>;
}

// ─── Main Modal ─────────────────────────────────────────────────────────────
export function TipModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [selectedAmount, setSelectedAmount] = useState<number>(10);
  const [customAmount, setCustomAmount] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoWallet>(WALLETS[0]);
  const [copied, setCopied] = useState(false);
  const [step, setStep] = useState<"select" | "confirm" | "done">("select");
  const [displayName, setDisplayName] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [message, setMessage] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [monthlyRaised, setMonthlyRaised] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setTotalCount(getTotalCount());
      setMonthlyRaised(getMonthlyRaised());
      setStep("select");
      setCopied(false);
    }
  }, [isOpen]);

  const currentAmount = isCustom ? (Number(customAmount) || 0) : selectedAmount;

  const copyAddress = async () => {
    await navigator.clipboard.writeText(selectedCrypto.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirmTip = () => {
    if (currentAmount < 1) return;
    addSupporter({
      displayName: anonymous ? "Anonymous" : (displayName || "Anonymous"),
      amount: currentAmount,
      anonymous,
      message: message || undefined,
    });
    setTotalCount(getTotalCount());
    setMonthlyRaised(getMonthlyRaised());
    setStep("done");
  };

  const progressPercent = Math.min((monthlyRaised / MONTHLY_GOAL) * 100, 100);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto border-[3px] border-black dark:border-white/30 bg-cream/95 dark:bg-[#141414]/95 backdrop-blur-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)]"
            initial={{ scale: 0.9, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 30, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-1.5 border-2 border-black dark:border-white/30 bg-cream dark:bg-dark-bg text-black dark:text-white hover:bg-neo-pink hover:text-black transition-all cursor-pointer z-10"
            >
              <X size={16} strokeWidth={3} />
            </button>

            {/* Header */}
            <div className="px-6 pt-6 pb-4 border-b-[3px] border-black dark:border-white/20">
              <h2 className="text-2xl font-black uppercase tracking-tight text-black dark:text-white">
                🚀 Fuel This Platform
              </h2>
              <p className="text-sm font-medium text-black/60 dark:text-white/60 mt-1">
                If this platform helped you discover hackathons, consider supporting it.
              </p>
            </div>

            <div className="px-6 py-5 space-y-5">
              {/* ─── Step 1: Select Amount ─── */}
              {step === "select" && (
                <>
                  {/* Preset Amounts */}
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-black/50 dark:text-white/50 mb-2 block">
                      Select Tip Amount
                    </label>
                    <div className="flex gap-2">
                      {PRESETS.map((amt) => (
                        <button
                          key={amt}
                          onClick={() => { setSelectedAmount(amt); setIsCustom(false); }}
                          className={`flex-1 py-3 font-black text-lg border-[3px] transition-all cursor-pointer ${
                            !isCustom && selectedAmount === amt
                              ? "bg-neo-yellow text-black border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] -translate-y-0.5"
                              : "bg-cream dark:bg-dark-bg text-black dark:text-white border-black dark:border-white/30 hover:border-black hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5"
                          }`}
                        >
                          ${amt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom */}
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-black/50 dark:text-white/50 mb-2 block">
                      Or Custom Amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 font-black text-black/40 dark:text-white/40">$</span>
                      <input
                        type="number"
                        min={1}
                        placeholder="Enter amount"
                        value={customAmount}
                        onFocus={() => setIsCustom(true)}
                        onChange={(e) => { setCustomAmount(e.target.value); setIsCustom(true); }}
                        className="w-full pl-8 pr-4 py-2.5 border-[3px] border-black dark:border-white/30 bg-cream dark:bg-dark-bg text-black dark:text-white font-bold focus:outline-none focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] focus:-translate-y-0.5 transition-all"
                      />
                    </div>
                  </div>

                  {/* Crypto Selector */}
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-black/50 dark:text-white/50 mb-2 block">
                      💳 Select Payment Method
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {WALLETS.map((wallet) => (
                        <button
                          key={wallet.id}
                          onClick={() => { setSelectedCrypto(wallet); setCopied(false); }}
                          className={`p-3 border-[3px] transition-all cursor-pointer flex flex-col items-center gap-1 ${
                            selectedCrypto.id === wallet.id
                              ? "border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] -translate-y-0.5"
                              : "border-black/20 dark:border-white/20 hover:border-black hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] hover:-translate-y-0.5"
                          }`}
                          style={{
                            backgroundColor: selectedCrypto.id === wallet.id ? wallet.color + "20" : "transparent"
                          }}
                        >
                          <span className="text-2xl">{wallet.icon}</span>
                          <span className="text-[9px] font-black uppercase text-black dark:text-white">{wallet.symbol}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Wallet */}
                  <div className="border-[3px] border-black dark:border-white/20 p-4 bg-black/[0.03] dark:bg-white/[0.03]">
                    <label className="text-[10px] font-black uppercase tracking-widest text-black/50 dark:text-white/50 mb-3 block">
                      {selectedCrypto.name} ({selectedCrypto.symbol})
                    </label>
                    <div className="flex items-center gap-3 mb-3">
                      {/* QR Code */}
                      <div className="border-2 border-black bg-white p-1">
                        <Image
                          src={selectedCrypto.qr}
                          alt={`${selectedCrypto.name} QR Code`}
                          width={80}
                          height={80}
                          className="w-20 h-20"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-mono font-bold text-black/70 dark:text-white/70 break-all leading-relaxed">
                          {selectedCrypto.address}
                        </p>
                        <button
                          onClick={copyAddress}
                          className="mt-2 flex items-center gap-1 text-xs font-bold uppercase px-3 py-1.5 border-2 border-black dark:border-white/30 bg-cream dark:bg-dark-bg hover:bg-neo-yellow hover:text-black hover:border-black transition-all cursor-pointer"
                        >
                          {copied ? <><Check size={12} /> Copied!</> : <><Copy size={12} /> Copy Address</>}
                        </button>
                      </div>
                    </div>
                    <p className="text-[10px] font-medium text-black/40 dark:text-white/40">
                      Send the selected amount in {selectedCrypto.symbol} to the wallet above. After payment, click the confirm button below.
                    </p>
                  </div>

                  {/* Confirm Button */}
                  <button
                    onClick={() => currentAmount >= 1 && setStep("confirm")}
                    disabled={currentAmount < 1}
                    className={`w-full py-3 font-black uppercase text-sm border-[3px] transition-all cursor-pointer ${
                      currentAmount >= 1
                        ? "bg-neo-green text-black border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                        : "bg-black/10 text-black/30 border-black/20 cursor-not-allowed"
                    }`}
                  >
                    I Have Sent ${currentAmount} Tip →
                  </button>
                </>
              )}

              {/* ─── Step 2: Confirm Details ─── */}
              {step === "confirm" && (
                <>
                  <div className="text-center mb-2">
                    <div className="inline-block bg-neo-yellow text-black font-black text-xl px-4 py-2 border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                      ${currentAmount}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-black/50 dark:text-white/50 mb-2 block">
                      Display Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your name"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      disabled={anonymous}
                      className="w-full px-4 py-2.5 border-[3px] border-black dark:border-white/30 bg-cream dark:bg-dark-bg text-black dark:text-white font-bold focus:outline-none focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-40"
                    />
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={anonymous}
                      onChange={(e) => setAnonymous(e.target.checked)}
                      className="w-4 h-4 accent-neo-pink cursor-pointer"
                    />
                    <span className="text-xs font-bold text-black dark:text-white uppercase">Stay Anonymous</span>
                  </label>

                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-black/50 dark:text-white/50 mb-2 block">
                      Short Message (Optional)
                    </label>
                    <textarea
                      placeholder="Love this platform!"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      maxLength={100}
                      rows={2}
                      className="w-full px-4 py-2.5 border-[3px] border-black dark:border-white/30 bg-cream dark:bg-dark-bg text-black dark:text-white font-bold text-sm focus:outline-none focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all resize-none"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setStep("select")}
                      className="flex-1 py-3 font-black uppercase text-sm border-[3px] border-black dark:border-white/30 bg-cream dark:bg-dark-bg text-black dark:text-white hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
                    >
                      ← Back
                    </button>
                    <button
                      onClick={handleConfirmTip}
                      className="flex-[2] py-3 font-black uppercase text-sm border-[3px] border-black bg-neo-green text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
                    >
                      Confirm Tip 🎉
                    </button>
                  </div>
                </>
              )}

              {/* ─── Step 3: Thank You ─── */}
              {step === "done" && (
                <motion.div
                  className="text-center py-8"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", damping: 15 }}
                >
                  <motion.div
                    className="text-6xl mb-4"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6 }}
                  >
                    🎉
                  </motion.div>
                  <h3 className="text-3xl font-black uppercase text-black dark:text-white mb-3">
                    Thank You!
                  </h3>
                  <p className="text-base font-bold text-black/70 dark:text-white/70 mb-2 leading-relaxed">
                    Your contribution means a lot to this 16-year-old guy working on tech.
                  </p>
                  <p className="text-sm font-medium text-black/50 dark:text-white/50 mb-6">
                    It helps keep this platform running and improving.
                  </p>

                  <button
                    onClick={onClose}
                    className="w-full py-3 font-black uppercase text-sm border-[3px] border-black bg-neo-yellow text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all cursor-pointer"
                  >
                    Close
                  </button>
                </motion.div>
              )}

              {/* ─── Social Proof + Progress ─── */}
              {step !== "done" && (
                <div className="space-y-3 pt-2 border-t-[3px] border-black/10 dark:border-white/10">
                  {/* Social proof */}
                  <div className="flex items-center justify-center gap-2">
                    <Heart size={14} className="text-neo-pink" fill="#FF4081" />
                    <span className="text-xs font-bold text-black/60 dark:text-white/60">
                      <span className="text-black dark:text-white font-black">
                        <AnimatedNumber value={totalCount} />
                      </span>{" "}
                      Hackers Have Supported This Platform
                    </span>
                  </div>

                  {/* Monthly goal */}
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-black/50 dark:text-white/50 mb-1">
                      <span>🎯 Monthly Goal: ${MONTHLY_GOAL}</span>
                      <span>Raised: ${monthlyRaised}</span>
                    </div>
                    <div className="h-3 bg-black/10 dark:bg-white/10 border-2 border-black dark:border-white/20 overflow-hidden">
                      <motion.div
                        className="h-full bg-neo-green"
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercent}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
