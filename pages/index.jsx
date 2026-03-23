import React from 'react';

export default function IndiaJerseyLanding() {
  return (
    <div className="min-h-screen bg-[#0A1F44] text-white font-sans selection:bg-[#FF9933] selection:text-[#0A1F44]">
      
      {/* Navigation */}
      <nav className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
        <div className="text-2xl font-black tracking-tighter">
          TEAM<span className="text-[#00D4FF]">BLUE</span>
        </div>
        <div className="hidden md:flex space-x-8 text-sm font-medium uppercase tracking-widest text-gray-300">
          <a href="#" className="hover:text-[#00D4FF] transition">Performance</a>
          <a href="#" className="hover:text-[#00D4FF] transition">Stats</a>
          <a href="#" className="hover:text-[#00D4FF] transition">Heritage</a>
        </div>
        <button className="border border-[#00D4FF] px-5 py-2 text-xs font-bold uppercase tracking-widest hover:bg-[#00D4FF] hover:text-[#00D4FF] transition duration-300">
          Join the Squad
        </button>
      </nav>

      {/* Hero Section */}
      <main className="relative max-w-7xl mx-auto px-8 pt-20 pb-32 flex flex-col md:flex-row items-center overflow-hidden">
        
        {/* Background Glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#123A73] rounded-full blur-[120px] opacity-40 -z-10"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#00D4FF] rounded-full blur-[100px] opacity-10 -z-10"></div>

        {/* Text Content */}
        <div className="md:w-1/2 z-10">
          <div className="flex items-center space-x-2 mb-6">
            <div className="h-[2px] w-12 bg-[#FF9933]"></div>
            <span className="text-[#FF9933] uppercase text-xs font-bold tracking-[0.3em]">Built for Champions</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black leading-none mb-6 italic uppercase">
            BLEED <br/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#00D4FF]">
              BLUE.
            </span>
          </h1>
          
          <p className="text-gray-400 text-lg md:text-xl max-w-md mb-10 leading-relaxed">
            Unleashing the spirit of the game with a design language rooted in heritage and engineered for the future.
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="bg-[#FF9933] text-[#0A1F44] px-10 py-4 font-black uppercase text-sm tracking-tighter hover:bg-white transition-all transform hover:-translate-y-1 shadow-xl">
              Pre-Order Jersey
            </button>
            <button className="bg-transparent border-2 border-white/20 px-10 py-4 font-black uppercase text-sm tracking-tighter hover:border-[#00D4FF] transition-all">
              Watch Film
            </button>
          </div>
        </div>

        {/* Visual Element (The "Jersey" Card) */}
        <div className="md:w-1/2 mt-20 md:mt-0 flex justify-center relative">
          <div className="relative w-72 h-[450px] bg-[#123A73] rounded-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden transform rotate-3 hover:rotate-0 transition duration-500 group">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F44] to-transparent opacity-60"></div>
            
            {/* Texture Overlay (Jersey Mesh Effect) */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" 
                 style={{ backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`, backgroundSize: '10px 10px' }}>
            </div>

            <div className="absolute bottom-8 left-8">
              <p className="text-[#00D4FF] font-mono text-xs mb-2">VER 2024.01</p>
              <h3 className="text-2xl font-bold uppercase italic">ELITE MESH</h3>
            </div>
            
            {/* Saffron Accent Strip */}
            <div className="absolute top-0 right-10 w-4 h-24 bg-[#FF9933] shadow-[0_0_15px_rgba(255,153,51,0.5)]"></div>
          </div>
          
          {/* Decorative Text */}
          <div className="absolute -bottom-10 -right-5 text-[150px] font-black text-white/5 pointer-events-none select-none">
            77
          </div>
        </div>
      </main>

      {/* Stats / Features Bar */}
      <section className="bg-white/5 border-y border-white/10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Breathability', val: '98%' },
            { label: 'Weight', val: '120g' },
            { label: 'Recycled', val: '100%' },
            { label: 'Performance', val: 'MAX' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-[#00D4FF] text-3xl font-black mb-1">{stat.val}</div>
              <div className="text-gray-500 uppercase text-[10px] font-bold tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
