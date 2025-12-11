'use client';

import { useGameStore } from '@/store/gameStore';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Edit3 } from 'lucide-react'; // Changed icon
import { useState } from 'react';
import SearchApp from './computer/SearchApp';
import EditorApp from './computer/EditorApp';

export default function ComputerView() {
    const setView = useGameStore((state) => state.setView);
    const [openApp, setOpenApp] = useState<'search' | 'editor' | null>(null);

    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full flex items-center justify-center bg-black p-4 perspective-1000 overflow-hidden"
        >
            <div className="w-full h-full max-w-7xl aspect-video bg-[#09090b] rounded-lg border-[10px] border-zinc-800 shadow-[0_0_50px_rgba(124,58,237,0.1)] overflow-hidden flex flex-col relative">

                {/* SCREEN LAYERS */}

                {/* 1. CRT Scanlines & Flicker Overlay */}
                <div className="absolute inset-0 z-[100] pointer-events-none mix-blend-overlay opacity-20 bg-[url('https://www.transparenttextures.com/patterns/tv-scanlines.png')]" />
                <div className="absolute inset-0 z-[100] pointer-events-none bg-gradient-to-b from-transparent to-black/10 animate-pulse" />

                {/* 2. Glass Reflection */}
                <div className="absolute inset-0 z-[90] pointer-events-none bg-gradient-to-tr from-white/5 via-transparent to-transparent rounded-lg" />

                {/* 3. Wallpaper (Synthwave Grid) */}
                <div className="absolute inset-0 z-0 bg-cyber-dark overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(124,58,237,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(124,58,237,0.1)_1px,transparent_1px)] bg-[size:40px_40px] [perspective:500px] [transform-style:preserve-3d] [transform:rotateX(20deg)_scale(1.5)] origin-bottom" />
                    <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-cyber-purple/20 to-transparent" />
                    <div className="absolute -top-32 right-32 w-64 h-64 bg-pink-500 rounded-full blur-[100px] opacity-20" />
                    <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent" />
                </div>

                {/* OS TOP BAR */}
                <div className="h-8 bg-zinc-900/90 backdrop-blur border-b border-zinc-700 flex items-center justify-between px-3 z-50">
                    <div className="flex items-center gap-4">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
                            <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                        </div>
                        <span className="text-[10px] font-mono text-cyber-blue tracking-widest uppercase text-glow">
                            NEXUS OS <span className="text-white/50">v3.0.1</span>
                        </span>
                    </div>

                    <div className="flex items-center gap-4 text-[10px] font-mono text-gray-400">
                        <span className="animate-pulse text-green-400">● EN LÍNEA</span>
                        <span>{new Date().toLocaleTimeString('es-ES')}</span>
                    </div>
                </div>

                {/* MAIN DESKTOP AREA */}
                <div className="flex-1 flex overflow-hidden relative z-10 p-6">

                    {/* Desktop Icons Grid */}
                    <div className="flex flex-col gap-8">
                        {/* Database Icon */}
                        <button
                            onClick={() => setOpenApp('search')}
                            className="group flex flex-col items-center gap-2 w-24 text-center active:scale-95 transition-transform"
                        >
                            <div className={`w-16 h-16 rounded-xl flex items-center justify-center border-2 transition-all duration-300 ${openApp === 'search' ? 'bg-cyber-blue/20 border-cyber-blue shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'bg-zinc-800/80 border-zinc-600 group-hover:border-white'}`}>
                                <Search className={`${openApp === 'search' ? 'text-cyber-blue' : 'text-gray-300 group-hover:text-white'}`} size={32} />
                            </div>
                            <span className="text-xs font-mono font-bold text-white bg-black/50 px-2 rounded group-hover:bg-cyber-blue group-hover:text-black transition-colors">
                                BASE_DE_DATOS.exe
                            </span>
                        </button>

                        {/* Editor Icon */}
                        <button
                            onClick={() => setOpenApp('editor')}
                            className="group flex flex-col items-center gap-2 w-24 text-center active:scale-95 transition-transform"
                        >
                            <div className={`w-16 h-16 rounded-xl flex items-center justify-center border-2 transition-all duration-300 ${openApp === 'editor' ? 'bg-cyber-green/20 border-cyber-green shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'bg-zinc-800/80 border-zinc-600 group-hover:border-white'}`}>
                                <Edit3 className={`${openApp === 'editor' ? 'text-cyber-green' : 'text-gray-300 group-hover:text-white'}`} size={32} />
                            </div>
                            <span className="text-xs font-mono font-bold text-white bg-black/50 px-2 rounded group-hover:bg-cyber-green group-hover:text-black transition-colors">
                                NOTAS.txt
                            </span>
                        </button>
                    </div>

                    {/* Window Layer */}
                    <AnimatePresence>
                        {openApp && (
                            <div className="absolute inset-0 z-30 flex items-center justify-center p-12 pointer-events-none">
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                                    animate={{ scale: 1, opacity: 1, y: 0 }}
                                    exit={{ scale: 0.95, opacity: 0, transition: { duration: 0.1 } }}
                                    className="w-full h-full bg-[#1e1e1e] rounded-lg shadow-2xl overflow-hidden flex flex-col border border-zinc-700 pointer-events-auto ring-1 ring-white/10"
                                >
                                    {/* Active Window Title Bar */}
                                    <div className="h-10 bg-zinc-800 border-b border-zinc-700 flex items-center justify-between px-4 select-none">
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 rounded bg-zinc-700 flex items-center justify-center">
                                                {openApp === 'search' ? <Search size={10} className="text-blue-400" /> : <Edit3 size={10} className="text-green-400" />}
                                            </div>
                                            <span className="text-xs font-bold text-gray-300 uppercase tracking-wider font-mono">
                                                {openApp === 'search' ? 'Base_De_Datos_Global' : 'Notas_del_Investigador'}
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => setOpenApp(null)}
                                            className="hover:bg-red-500 hover:text-white p-1 rounded transition-colors group"
                                        >
                                            <X size={16} className="text-gray-500 group-hover:text-white" />
                                        </button>
                                    </div>
                                    {/* Window Content */}
                                    <div className="flex-1 overflow-hidden bg-[#121212] relative">
                                        {/* Scanline overlay inside window for extra retro-ness */}
                                        <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(transparent_50%,black_50%)] bg-[size:100%_4px]" />
                                        <div className="relative z-10 w-full h-full">
                                            {openApp === 'search' && <SearchApp />}
                                            {openApp === 'editor' && <EditorApp />}
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Bottom Taskbar */}
                <div className="h-10 bg-zinc-900/90 border-t border-zinc-700 flex items-center px-4 justify-between z-50">
                    <button
                        onClick={() => setView('hub')}
                        className="flex items-center gap-2 px-3 py-1 rounded hover:bg-white/10 text-red-400 transition-colors"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path><line x1="12" y1="2" x2="12" y2="12"></line></svg>
                        <span className="text-xs font-bold uppercase tracking-wider font-mono">Cerrar Sesión</span>
                    </button>
                    <div className="text-[10px] text-gray-600 font-mono">STOP: 0x0000001E</div>
                </div>
            </div>
        </motion.div>
    );
}
