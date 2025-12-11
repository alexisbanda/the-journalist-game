'use client';

import { useGameStore } from '@/store/gameStore';
import { motion } from 'framer-motion';
import { generateCase } from '@/lib/gameEngine';
import { CASES } from '@/data/cases';

import { useShallow } from 'zustand/react/shallow';

export default function HubView() {
    // Use separate selectors or useShallow to prevent infinite loop errors with new object references
    const setView = useGameStore((state) => state.setView);
    const activeCase = useGameStore((state) => state.activeCase);
    const setActiveCase = useGameStore((state) => state.setActiveCase);
    const clearActiveCase = useGameStore((state) => state.clearActiveCase);
    const gameMode = useGameStore((state) => state.gameMode);
    const setGameMode = useGameStore((state) => state.setGameMode);

    const handleStartCase = (template: any) => {
        setActiveCase(generateCase(template));
    };

    if (!activeCase) {
        return (
            <div className="w-full h-full bg-noir-black flex flex-col items-center justify-center space-y-12 p-8 relative z-20 overflow-hidden">
                {/* Background Ambience */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(50,50,50,0.2)_0%,rgba(0,0,0,1)_100%)]" />
                <div className="absolute inset-0 scanlines opacity-50 pointer-events-none" />

                <div className="text-center z-10 space-y-4">
                    <h1 className="text-6xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600 tracking-widest drop-shadow-lg">LA REDACCIÓN</h1>
                    <p className="text-xl text-noir-gold font-serif italic tracking-wider opacity-80">
                        "La verdad está en los archivos eliminados."
                    </p>

                    {/* Mode Selector */}
                    <div className="flex justify-center gap-4 mt-6">
                        <button
                            onClick={() => setGameMode('novice')}
                            className={`px-4 py-2 font-mono text-xs uppercase tracking-widest border transition-all ${gameMode === 'novice'
                                    ? 'bg-yellow-500 text-black border-yellow-500 font-bold shadow-[0_0_15px_rgba(234,179,8,0.5)]'
                                    : 'bg-transparent text-gray-500 border-gray-700 hover:border-gray-500'
                                }`}
                        >
                            Periodista Novato
                        </button>
                        <button
                            onClick={() => setGameMode('expert')}
                            className={`px-4 py-2 font-mono text-xs uppercase tracking-widest border transition-all ${gameMode === 'expert'
                                    ? 'bg-red-900 text-white border-red-800 font-bold shadow-[0_0_15px_rgba(127,29,29,0.5)]'
                                    : 'bg-transparent text-gray-500 border-gray-700 hover:border-gray-500'
                                }`}
                        >
                            Periodista Experto
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl z-10">
                    {CASES.map((template, idx) => (
                        <motion.button
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            key={template.id}
                            onClick={() => handleStartCase(template)}
                            className={`group relative h-64 bg-noir-paper text-black p-6 shadow-xl transform transition-all duration-300 hover:-translate-y-4 hover:rotate-1 rotate-0 border-t-2 ${template.id === 'case_juliana_01' ? 'scale-105 border-yellow-400 ring-4 ring-yellow-400/20 z-20' : 'border-white/20'}`}
                            style={{ clipPath: 'polygon(0 0, 40% 0, 45% 10%, 100% 10%, 100% 100%, 0 100%)' }} // Folder tab shape
                        >
                            {/* Folder Tab Label */}
                            <div className="absolute top-2 left-4 text-xs font-bold uppercase opacity-50">CONFIDENCIAL</div>

                            {/* Tutorial Badge */}
                            {template.id === 'case_juliana_01' && (
                                <div className="absolute top-0 right-0 bg-yellow-400 text-black text-[10px] font-bold px-2 py-1 uppercase tracking-widest z-20 shadow-lg animate-pulse">
                                    Tutorial / Iniciar Aquí
                                </div>
                            )}

                            {/* Case Content */}
                            <div className={`mt-8 space-y-4 border-l-2 pl-4 ${template.id === 'case_juliana_01' ? 'border-yellow-400' : 'border-red-900/20'}`}>
                                <span className="block text-xs font-mono text-gray-600 mb-1">EXPEDIENTE #00{idx + 1}</span>
                                <h3 className={`text-2xl font-bold font-serif group-hover:text-red-900 transition-colors uppercase leading-tight ${template.id === 'case_juliana_01' ? 'text-black drop-shadow-md' : 'text-black'}`}>
                                    {template.id.split('_').slice(1).join(' ')}
                                </h3>
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${template.difficulty === 'hard' ? 'bg-red-600' : 'bg-green-600'}`} />
                                    <p className="text-xs font-bold uppercase tracking-wider">
                                        {template.difficulty === 'hard' ? 'DIFÍCIL' : template.difficulty === 'medium' ? 'MEDIO' : 'FÁCIL'}
                                    </p>
                                </div>
                            </div>

                            {/* Stamp */}
                            <div className="absolute bottom-4 right-4 border-4 border-red-800 text-red-800 font-bold px-2 py-1 -rotate-12 opacity-0 group-hover:opacity-80 transition-opacity text-sm uppercase">
                                INVESTIGAR
                            </div>
                        </motion.button>
                    ))}
                </div>

                <p className="absolute bottom-8 right-8 text-xs text-gray-700 font-mono">Build v2.1.0 // NEXUS_OS_LISTO</p>
            </div>
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full relative bg-noir-black flex items-center justify-center overflow-hidden font-serif"
        >
            {/* Background: Noir Desk Atmosphere (CSS Gradient Fallback) */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(197,160,89,0.15)_0%,rgba(0,0,0,0)_60%),linear-gradient(to_bottom,#0a0a0a_0%,#1a1a1a_100%)] pointer-events-none" />
            <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] mix-blend-overlay pointer-events-none" />

            {/* Vignette & Noise */}
            <div className="absolute inset-0 vignette pointer-events-none z-10" />

            {/* Reset / Quit Button - Moved to Top Right outside container */}
            <button
                onClick={clearActiveCase}
                className="absolute top-8 right-8 z-50 px-6 py-2 border border-noir-red/30 text-noir-red text-sm tracking-widest hover:bg-noir-red/10 hover:border-noir-red transition-all font-mono uppercase"
            >
                Abandonar Caso
            </button>

            <div className="relative z-20 text-center space-y-12 w-full max-w-5xl">
                <div className="flex flex-col items-center justify-center gap-2">
                    <h1 className="text-5xl font-bold text-noir-gold tracking-widest uppercase text-glow font-mono">EVIDENCIAS</h1>
                    <div className="w-32 h-1 bg-noir-red opacity-50" />
                </div>



                <div className="flex flex-col md:flex-row gap-8 md:gap-16 mt-8 md:mt-16 justify-center items-center md:items-end w-full px-4">
                    {/* Phone Hotspot */}
                    <button
                        onClick={() => setView('phone')}
                        className="group relative w-32 h-64 md:w-40 md:h-72 bg-gradient-to-b from-gray-800 to-black border-4 border-gray-700 rounded-[2rem] hover:border-noir-gold transition-all duration-300 transform hover:-translate-y-2 shadow-2xl flex items-center justify-center shrink-0 order-2 md:order-1"
                    >
                        {/* Screen Reflection */}
                        <div className="absolute inset-2 bg-gray-900 rounded-[1.5rem] overflow-hidden border border-gray-600">
                            <div className="w-full h-full bg-gradient-to-tr from-black via-gray-900 to-gray-800 opacity-80" />
                            {/* Notification Pulse */}
                            <div className="absolute inset-0 bg-noir-gold/10 animate-pulse" />
                        </div>

                        <span className="relative z-10 text-white font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity">DESBLOQUEAR</span>

                        {/* Notification Dot */}
                        <div className="absolute -top-3 -right-3 w-8 h-8 bg-noir-red rounded-full animate-bounce shadow-[0_0_15px_rgba(138,28,28,0.6)] flex items-center justify-center border-2 border-black z-30">
                            <span className="text-xs text-white font-bold font-mono">1</span>
                        </div>
                    </button>

                    {/* Computer Hotspot */}
                    <button
                        onClick={() => setView('computer')}
                        className="group relative w-full md:w-[32rem] h-48 md:h-[20rem] bg-gray-800 border-b-8 border-r-8 border-gray-900 rounded-lg hover:border-noir-blue transition-all duration-300 transform hover:-translate-y-1 shadow-2xl flex flex-col p-4 gap-2 order-1 md:order-2"
                    >
                        {/* Monitor Stand - Hidden on mobile to save space/reduce complexity */}
                        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-32 h-12 bg-gray-900 rounded-b-lg shadow-lg -z-10 hidden md:block" />

                        {/* Screen */}
                        <div className="flex-1 bg-black rounded border-4 border-gray-700 relative overflow-hidden group-hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-shadow">
                            <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(59,130,246,0.1)_25%,transparent_25%,transparent_50%,rgba(59,130,246,0.1)_50%,rgba(59,130,246,0.1)_75%,transparent_75%,transparent)] bg-[length:4px_4px]" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-noir-gold text-xs font-mono animate-pulse">SISTEMA EN ESPERA...</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center px-2">
                            <div className="flex gap-1">
                                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                <div className="w-2 h-2 rounded-full bg-green-500 opacity-20" />
                            </div>
                            <span className="text-[10px] text-gray-500 font-mono tracking-widest">NECROS 9000</span>
                        </div>
                    </button>

                    {/* Case Folder (Visual Only, represents Active Case) */}
                    {/* On mobile, we position it relative or sticky? For now let's make it small and fixed or just part of the flow if needed. 
                        Let's keep it absolute but check overlap. */}
                    <div className="absolute top-20 left-4 md:top-auto md:left-auto md:bottom-10 md:right-10 w-48 md:w-64 h-32 md:h-48 bg-noir-paper rotate-3 shadow-xl border border-yellow-900/20 p-4 transform transition-transform hover:rotate-0 hover:-translate-y-4 cursor-pointer z-0 md:z-auto opacity-50 md:opacity-100 hover:opacity-100">
                        <div className="absolute -top-3 left-0 w-24 h-4 bg-noir-paper rounded-t-lg border-t border-l border-r border-yellow-900/20" />
                        <h3 className="font-mono text-sm md:text-xl text-black font-bold uppercase border-b-2 border-black/50 pb-2 mb-2 truncate">
                            CASO: {activeCase?.templateId.split('_')[1] || 'DESCONOCIDO'}
                        </h3>
                        <div className="text-[10px] md:text-xs text-black/70 font-serif leading-relaxed">
                            <p>CONFIDENCIAL</p>
                            <p>NO DISTRIBUIR</p>
                        </div>
                        <div className="absolute bottom-4 right-4 stamp text-red-800 font-bold border-4 border-red-800 rounded px-2 opacity-70 -rotate-12 uppercase text-xs md:text-sm">
                            ABIERTO
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
