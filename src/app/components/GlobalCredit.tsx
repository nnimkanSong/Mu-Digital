"use client";
import { motion } from "framer-motion";
import { Cpu } from "lucide-react";

export default function GlobalCredit() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
      // ✅ แก้ตรงนี้: รวม className เป็นบรรทัดเดียว (ลบ Enter ออกให้หมด)
      className="fixed bottom-3 left-0 w-full z-50 pointer-events-none flex justify-center pb-safe"
    >
      <a
        href="https://www.facebook.com/ComEngKMITLPCC"
        target="_blank"
        rel="noopener noreferrer"
        // ✅ แก้ตรงนี้: รวม className เป็นบรรทัดเดียวเหมือนกัน
        className="pointer-events-auto flex items-center gap-2 px-5 py-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-[10px] md:text-xs text-white/60 transition-all duration-300 group hover:scale-105 hover:bg-[#20549E]/30 hover:border-[#3C7ED0]/60 hover:shadow-[0_0_20px_rgba(60,126,208,0.25)]"
      >
        <Cpu 
          size={14} 
          className="transition-all duration-500 group-hover:rotate-180 group-hover:text-[#FF8324]" 
        />
        
        <span className="tracking-widest uppercase font-light flex gap-1">
          Crafted by 
          <span className="font-bold text-[#3C7ED0] group-hover:text-[#FF8324] transition-colors duration-300">
            Computer Engineering
          </span>
          <span className="hidden sm:inline opacity-70 group-hover:opacity-100 group-hover:text-[#3C7ED0] transition-colors duration-300">
             | KMITL PCC
          </span>
        </span>
      </a>
    </motion.div>
  );
}