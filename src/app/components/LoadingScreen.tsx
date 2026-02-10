"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { LoaderPinwheel, Sparkles } from "lucide-react";

interface LoadingScreenProps {
  duration?: number;
  onFinish?: () => void;
}

export default function LoadingScreen({ duration = 2000, onFinish }: LoadingScreenProps) {
  
  useEffect(() => {
    if (duration > 0 && onFinish) {
      const timer = setTimeout(() => {
        onFinish();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onFinish]);

  return (
    // 1. ปรับ Gradient พื้นหลังให้เข้มขึ้น (จาก slate-900 เป็น slate-950)
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-950 via-black to-black font-sans overflow-hidden">
      
      {/* Background Effects - ปรับให้มืดลง */}
      {/* เปลี่ยนสีฐานให้เข้มขึ้น (900) และลด opacity ลง */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-900 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-yellow-900 rounded-full blur-[120px] animate-pulse delay-700"></div>

      {/* 2. เพิ่ม Overlay สีดำเข้มทับอีกชั้น (bg-black/70) */}
      <div className="absolute inset-0 bg-black/70 z-0"></div>

      {/* Main Loader Content - เพิ่ม z-10 เพื่อให้อยู่เหนือ overlay */}
      <div className="relative flex flex-col items-center gap-8 z-10">
        
        <div className="relative">
            {/* Glowing Rings - ปรับให้แสงดูเข้มขลังขึ้น */}
            <motion.div
                className="absolute -inset-4 rounded-full border-2 border-dashed border-yellow-600/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
                className="absolute -inset-8 rounded-full border border-dashed border-red-700/20"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Center Icon */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="relative z-10 text-yellow-500 drop-shadow-[0_0_15px_rgba(234,179,8,0.3)]"
            >
                <LoaderPinwheel size={64} />
            </motion.div>

            {/* Center Glow - ลดความสว่างลง */}
            <div className="absolute inset-0 bg-yellow-600/10 blur-xl rounded-full"></div>
        </div>

        {/* Text */}
        <div className="flex flex-col items-center gap-2">
            <motion.h2 
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                // ปรับสี Text ให้ดูทองเข้มขึ้นเพื่อให้เข้ากับพื้นหลังที่มืดลง
                className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 tracking-widest flex items-center gap-2 drop-shadow-sm"
            >
                <Sparkles size={20} className="text-yellow-400" />
                กำลังเปิดดวงชะตา...
            </motion.h2>
            <p className="text-slate-400 text-sm font-mono uppercase tracking-[0.2em]">
                Reading The Stars
            </p>
        </div>
      </div>
      
      {/* Progress Bar Container - เพิ่ม z-10 และปรับสีให้กลืนกับความมืด */}
      <div className="absolute bottom-20 w-64 h-1.5 bg-slate-900/50 rounded-full overflow-hidden border border-white/5 shadow-lg z-10">
        <motion.div 
            className="h-full bg-gradient-to-r from-yellow-700 via-yellow-500 to-yellow-300 shadow-[0_0_10px_rgba(250,204,21,0.3)]"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ 
                duration: duration / 1000,
                ease: "easeInOut" 
            }}
        />
      </div>
    </div>
  );
}