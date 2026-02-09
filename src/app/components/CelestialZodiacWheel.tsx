"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

// --- 1. Interface & Data ---
interface HoroscopeResult {
  sequence: number;
  name: string;
  category: string;
  description: string;
  targetDegree: number;
}

interface LuckyWheelProps {
  gender?: 'male' | 'female';
  day?: number;
  month?: number;
  year?: number;
}

// *** ตารางมุมเดิมที่คุณกำหนด (ไม่เปลี่ยน) ***
const HOROSCOPE_POSITIONS: HoroscopeResult[] = [
  { sequence: 1, targetDegree: 180,   name: 'เจดีย์', category: 'GOOD', description: 'เป็นคนดี จะได้เป็นที่พึ่งพาแห่ง...' },
  { sequence: 2, targetDegree: 155,  name: 'ฉัตรเงิน', category: 'GOOD', description: 'เป็นคนดี จะได้เป็นที่พึ่งพาแห่ง...' },
  { sequence: 3, targetDegree: 120,  name: 'คนคอขาด', category: 'BAD', description: 'เป็นคนอาภัพ หาที่พึ่งพาไม่ได้...' },
  { sequence: 4, targetDegree: 90,  name: 'เรือนหลวง', category: 'GOOD', description: 'จะประกอบด้วยยศถาบรรดาศักดิ์...' },
  { sequence: 5, targetDegree: 65, name: 'ปราสาท', category: 'GOOD', description: 'จะประกอบด้วยยศถาบรรดาศักดิ์...' },
  { sequence: 6, targetDegree: 30, name: 'ราหู', category: 'GOOD', description: 'น้ำใจไม่แน่นอน บทจะรักก็รัก...' },
  { sequence: 7, targetDegree: 10, name: 'ฉัตรทอง', category: 'GOOD', description: 'เป็นคนดี จะได้เป็นที่พึ่งพาแห่ง...' },
  { sequence: 8, targetDegree: -15, name: 'เทวดาขี่เต่า', category: 'GOOD', description: 'ชอบการเปลี่ยนแปลงโยกย้าย...' },
  { sequence: 9, targetDegree: -150, name: 'นาคราช', category: 'GOOD', description: 'น้ำใจไม่แน่นอน บทจะรักก็รัก...' },
  { sequence: 10, targetDegree: -120, name: 'แม่มด', category: 'GOOD', description: 'ผู้ใหญ่จะให้ความเมตตาปรานี...' },
  { sequence: 11, targetDegree: -90, name: 'พ่อหมอ', category: 'GOOD', description: 'เจ้านายและขุนนางผู้ใหญ่จะเม...' },
  { sequence: 12, targetDegree: -60, name: 'คนต้องขื่อคา', category: 'BAD', description: 'ชะตาไม่คงที่ มักดีตอนต้นและ...' },
];

export default function CelestialZodiacWheel({ 
  gender = 'female', 
  day = 16, 
  month = 4, 
  year = 1995 
}: LuckyWheelProps) {

  const [rotation, setRotation] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [result, setResult] = useState<HoroscopeResult | null>(null);

  // Default ให้เลือกตัวแรกไว้ก่อน
  const [testTargetName, setTestTargetName] = useState<string>('เจดีย์'); 

  // ปุ่ม Reset ค่าทั้งหมด
  const handleReload = () => {
    setResult(null);
    setRotation(0); 
    setIsSpinning(false);
  };

  // ---------------------------------------------------------
  // 🟢 FUNCTION: TEST SPIN 
  // (Logic: หมุนทบให้ครบวงก่อน + แล้วค่อยบวกมุมเป้าหมาย)
  // ---------------------------------------------------------
  const spinWheelTest = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setResult(null);

    // 1. หา Data จากชื่อที่เลือก
    const targetData = HOROSCOPE_POSITIONS.find(item => item.name === testTargetName) || HOROSCOPE_POSITIONS[0];

    // 2. เตรียมค่ามุมเป้าหมาย (Normalize ให้เป็น 0-360 เพื่อคำนวณง่าย)
    let rawTarget = targetData.targetDegree % 360;
    if (rawTarget < 0) rawTarget += 360;

    // 3. ตั้งค่าพื้นฐาน
    const baseSpins = 360 * 5; // หมุน 5 รอบ
    const OFFSET_FIX = 0;      // ปรับจูนตำแหน่งถ้าภาพไม่ตรงกลาง
    let nextRotation = 0;

    if (gender === 'female') {
      // --- ผู้หญิง (หมุนตามเข็ม +) ---

      // A. "หมุนมุมเพิ่มไป = 0" (Compensate to Complete Circle)
      // หาว่าตอนนี้เกินมาเท่าไหร่ แล้วบวกเพิ่มเพื่อให้ครบ 360 พอดี
      const currentMod = rotation % 360;
      let distanceToCompleteCircle = 360 - currentMod;
      if (distanceToCompleteCircle === 360) distanceToCompleteCircle = 0;

      // B. "จากนั้นบวกค่าเดิมต่อ" (Move to Target)
      // เพื่อให้ภาพที่ตำแหน่ง rawTarget มาอยู่ที่ 0 (Top) ต้องหมุนไป (360 - rawTarget)
      const distanceToTarget = (360 - rawTarget) % 360;

      // ผลรวม: (ค่าเดิม) + (ส่วนที่ทำให้ครบวง) + (5 รอบ) + (ระยะไปหาเป้าหมาย)
      nextRotation = rotation + distanceToCompleteCircle + baseSpins + distanceToTarget + OFFSET_FIX;

    } else {
      // --- ผู้ชาย (หมุนทวนเข็ม -) ---

      // A. "หมุนมุมเพิ่มไป = 0" (ทางลบ)
      const currentMod = Math.abs(rotation % 360); 
      let distanceToCompleteCircle = 360 - currentMod;
      if (distanceToCompleteCircle === 360) distanceToCompleteCircle = 0;

      // B. "จากนั้นบวกค่าเดิมต่อ" (ทางลบ)
      // การหมุนทวนเข็ม เพื่อพารูป rawTarget มาที่ 0 ต้องหมุนลบไปเท่ากับ rawTarget เลย
      const distanceToTarget = rawTarget;

      // ผลรวม: (ค่าเดิม) - (ส่วนที่ทำให้ครบวง) - (5 รอบ) - (ระยะไปหาเป้าหมาย)
      nextRotation = rotation - distanceToCompleteCircle - baseSpins - distanceToTarget + OFFSET_FIX;
    }
    
    setRotation(nextRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setResult(targetData);
    }, 4000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900 via-slate-900 to-black gap-8 overflow-hidden relative">
      
      {/* Background Effects */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-pink-500 rounded-full blur-[100px] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-yellow-500 rounded-full blur-[100px] opacity-20 animate-pulse delay-700"></div>

      {/* --- Title --- */}
      <div className="z-10 text-center mt-10">
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-500 drop-shadow-[0_0_10px_rgba(234,179,8,0.8)] tracking-wider">
          Mu Digital
        </h1>
        <p className="text-slate-400 text-xs mt-4 font-mono opacity-60">
           {gender === 'male' ? '♂ MALE (CCW)' : '♀ FEMALE (CW)'} • MODE: TESTING
        </p>
      </div>

      {/* --- ส่วนตั้งค่าสำหรับโหมด Test --- */}
      {!isSpinning && !result && (
        <div className="z-20 bg-black/60 p-4 rounded-xl border border-yellow-600/50 backdrop-blur-md flex flex-col items-center gap-2 mt-[-10px]">
          <label className="text-yellow-400 text-sm font-bold uppercase tracking-widest">
            เลือกเป้าหมายที่ต้องการเทส
          </label>
          <select 
            value={testTargetName}
            onChange={(e) => setTestTargetName(e.target.value)}
            className="bg-slate-800 text-white border border-yellow-600 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            {HOROSCOPE_POSITIONS.map((pos) => (
              <option key={pos.sequence} value={pos.name}>
                {pos.sequence}. {pos.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* --- Wheel Container --- */}
      <div className="relative w-80 h-80 md:w-[500px] md:h-[500px] z-10">
        
        {/* Pointer */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)]">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-yellow-100 to-yellow-600 border-2 border-yellow-800 shadow-inner mb-[-5px] z-20"></div>
            <div className="w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-t-[60px] border-t-yellow-500 filter drop-shadow-lg"></div>
        </div>

        {/* Wheel Decorations */}
        <div className="absolute -inset-4 rounded-full border-4 border-dashed border-pink-500/30 animate-[spin_10s_linear_infinite]"></div>
        <div className="absolute -inset-1 bg-gradient-to-b from-yellow-400 to-yellow-700 rounded-full blur-md opacity-50"></div>

        {/* --- SPINNING WHEEL --- */}
        <motion.div
          animate={{ rotate: rotation }}
          transition={{ duration: 4, ease: [0.25, 1, 0.5, 1] }}
          className="relative w-full h-full rounded-full cursor-pointer shadow-[0_0_50px_rgba(234,179,8,0.3)] bg-slate-800 border-4 border-yellow-600"
        >
          {/* กรอบทอง */}
          <div className="absolute inset-0 rounded-full border-[12px] border-yellow-500/80 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] z-20 pointer-events-none box-border ring-2 ring-yellow-200/50"></div>
          
          {/* แกนกลาง */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-yellow-300 to-yellow-700 rounded-full z-30 shadow-[0_0_15px_rgba(0,0,0,0.8)] border-4 border-yellow-800 flex items-center justify-center">
             <div className="w-8 h-8 bg-yellow-100 rounded-full opacity-50 blur-sm"></div>
          </div>

          {/* Image */}
          <img 
            src="/mu.png" 
            alt="Wheel" 
            className="w-full h-full object-cover rounded-full"
            style={{ clipPath: 'circle(50%)' }}
          />
        </motion.div>
      </div>

      {/* --- Action Area / Result --- */}
      <div className="z-10 pb-10 flex flex-col items-center min-h-[150px]">
        {result ? (
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center bg-black/80 p-8 rounded-xl border border-yellow-500/50 backdrop-blur-md shadow-2xl max-w-sm"
            >
                <h2 className={`text-4xl font-bold mb-3 drop-shadow-lg ${result.category === 'BAD' ? 'text-red-500' : 'text-green-400'}`}>
                    {result.name}
                </h2>
                <div className="w-16 h-1 bg-yellow-500/50 mx-auto mb-4 rounded-full"></div>
                <p className="text-yellow-100/90 text-lg font-light leading-relaxed mb-6">
                    {result.description}
                </p>
                <button 
                    onClick={handleReload}
                    className="group relative inline-flex items-center justify-center px-8 py-3 font-bold text-white transition-all duration-200 bg-red-600 font-lg rounded-full hover:bg-red-700 focus:outline-none ring-offset-2 focus:ring-2 ring-red-400"
                >
                    <span className="mr-2">↻</span> หมุนใหม่
                </button>
            </motion.div>
        ) : (
            <button
            onClick={spinWheelTest}
            disabled={isSpinning}
            className={`
                relative group px-12 py-5 rounded-2xl font-black text-2xl uppercase tracking-widest transition-all duration-100
                ${isSpinning ? 'opacity-50 cursor-not-allowed translate-y-2' : 'hover:scale-105'}
            `}
            >
            <div className={`absolute inset-0 bg-red-900 rounded-2xl transform translate-y-3 transition-transform duration-100 ${!isSpinning && 'group-active:translate-y-1'}`}></div>
            <div className={`
                absolute inset-0 bg-gradient-to-b from-red-500 to-red-700 rounded-2xl border-2 border-yellow-400/50 
                shadow-[inset_0_2px_10px_rgba(255,255,255,0.3),0_0_20px_rgba(239,68,68,0.6)]
                flex items-center justify-center
                transform transition-transform duration-100
                ${!isSpinning && 'group-active:translate-y-2'} 
            `}></div>
            <span className={`relative text-white drop-shadow-md ${!isSpinning && 'group-active:translate-y-2'}`}>
                {isSpinning ? '...กำลังทำนาย...' : 'กดเทสเสี่ยงทาย'}
            </span>
            </button>
        )}
      </div>
    </div>
  );
}