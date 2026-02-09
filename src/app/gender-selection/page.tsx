"use client";
import { useRouter } from 'next/navigation';

export default function SelectionPage() {
  const router = useRouter();

  // ฟังก์ชันส่งค่าไปหน้า 2 ผ่าน URL เช่น /result-page?gender=Male
  const selectGender = (gender: string) => {
    router.push(`/date_month_year?gender=${gender}`);
  };

  return (
    <div className="min-h-screen bg-[#0f0c29] bg-gradient-to-b from-[#0f0c29] via-[#1a1a2e] to-[#0f0c29] flex flex-col items-center justify-center px-4 py-10 relative overflow-hidden">
      
      {/* Background Decor - แสงฟุ้งขนาดใหญ่กลางจอ */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[800px] max-h-[800px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="z-10 w-full max-w-7xl">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-4xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 drop-shadow-[0_0_15px_rgba(251,191,36,0.3)] mb-4">
            โชคชะตากำลังรอคุณอยู่
          </h2>
          <p className="text-purple-300/60 tracking-[0.4em] text-xs md:text-sm uppercase">
            — สัมผัสตัวตนเพื่อเปิดประตูแห่งคำทำนาย —
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 md:gap-12 justify-center items-stretch">
          
          {/* ปุ่มเพศชาย - ขยายขนาดใหญ่พิเศษ */}
          <button 
            onClick={() => selectGender('ชาย')} 
            className="group relative flex-1 flex flex-col items-center justify-between p-6 md:p-10 rounded-[2.5rem] border border-white/5 bg-white/[0.02] backdrop-blur-2xl transition-all duration-700 hover:bg-blue-900/10 hover:border-blue-500/40 hover:-translate-y-4 hover:shadow-[0_20px_80px_rgba(59,130,246,0.2)]"
          >
            <div className="relative w-full aspect-[3/4] max-h-[50vh] flex items-center justify-center overflow-visible">
              {/* Aura Behind Image */}
              <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full scale-75 group-hover:bg-blue-500/20 transition-all duration-700"></div>
              
              <img 
                src="/male.png" 
                alt="Male" 
                className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.7)] group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
              />
            </div>
            
            <div className="mt-8 text-center">
              <span className="text-3xl md:text-4xl font-light tracking-widest text-blue-200 group-hover:text-blue-400 group-hover:drop-shadow-[0_0_10px_rgba(96,165,250,0.5)] transition-all">
                ชาย
              </span>
              <div className="h-[1px] w-12 bg-blue-500/30 mx-auto mt-4 group-hover:w-24 group-hover:bg-blue-400 transition-all duration-500"></div>
            </div>
          </button>

          {/* ปุ่มเพศหญิง - ขยายขนาดใหญ่พิเศษ */}
          <button 
            onClick={() => selectGender('หญิง')} 
            className="group relative flex-1 flex flex-col items-center justify-between p-6 md:p-10 rounded-[2.5rem] border border-white/5 bg-white/[0.02] backdrop-blur-2xl transition-all duration-700 hover:bg-pink-900/10 hover:border-pink-500/40 hover:-translate-y-4 hover:shadow-[0_20px_80px_rgba(236,72,153,0.2)]"
          >
            <div className="relative w-full aspect-[3/4] max-h-[50vh] flex items-center justify-center overflow-visible">
              {/* Aura Behind Image */}
              <div className="absolute inset-0 bg-pink-500/5 blur-3xl rounded-full scale-75 group-hover:bg-pink-500/20 transition-all duration-700"></div>

              <img 
                src="/female.png" 
                alt="Female" 
                className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.7)] group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
              />
            </div>

            <div className="mt-8 text-center">
              <span className="text-3xl md:text-4xl font-light tracking-widest text-pink-200 group-hover:text-pink-400 group-hover:drop-shadow-[0_0_10px_rgba(244,114,182,0.5)] transition-all">
                หญิง
              </span>
              <div className="h-[1px] w-12 bg-pink-500/30 mx-auto mt-4 group-hover:w-24 group-hover:bg-pink-400 transition-all duration-500"></div>
            </div>
          </button>

        </div>
      </div>

      {/* Star Particles - ดวงดาวระยิบระยับ */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <div 
            key={i}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              animationDuration: `${Math.random() * 4 + 2}s`,
              opacity: Math.random() * 0.4
            }}
          />
        ))}
      </div>
    </div>
  );
}
