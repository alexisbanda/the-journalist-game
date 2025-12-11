'use client';

import { useGameStore } from '@/store/gameStore';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import ChatApp from './phone/ChatApp';

export default function PhoneView() {
    const setView = useGameStore((state) => state.setView);

    return (
        <motion.div
            initial={{ y: 500, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 500, opacity: 0, transition: { duration: 0.3 } }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="w-full h-full flex items-center justify-center bg-black/80 backdrop-blur-sm p-0 md:p-4 relative z-50"
        >
            <div className="w-full h-full md:max-w-sm md:h-[85vh] bg-black border-0 md:border-[6px] border-zinc-800 rounded-none md:rounded-[3rem] overflow-hidden relative shadow-none md:shadow-2xl ring-0 md:ring-4 ring-zinc-900">
                {/* Physical Phone Buttons - Hide on mobile */}
                <div className="hidden md:block absolute top-24 -left-2 w-1 h-10 bg-zinc-700 rounded-l" />
                <div className="hidden md:block absolute top-40 -left-2 w-1 h-16 bg-zinc-700 rounded-l" />
                <div className="hidden md:block absolute top-24 -right-2 w-1 h-12 bg-zinc-700 rounded-r" />

                {/* Screen Reflection Specular - Hide on mobile */}
                <div className="hidden md:block absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/10 to-transparent pointer-events-none z-[60] rounded-tr-[2.5rem] rounded-br-[2.5rem]" />

                {/* Dynamic Island / Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-2xl z-[70] flex justify-center items-center">
                    <div className="w-16 h-4 bg-zinc-900 rounded-full flex items-center px-2 gap-1">
                        <div className="w-2 h-2 rounded-full bg-zinc-800 ml-auto" />
                    </div>
                </div>

                {/* Wallpaper */}
                <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-900 via-purple-900/20 to-black" />
                <div className="absolute inset-0 z-0 bg-['https://www.transparenttextures.com/patterns/carbon-fibre.png'] opacity-30 mix-blend-overlay" />

                {/* Status Bar */}
                <div className="h-8 bg-transparent w-full flex items-center justify-between px-8 text-[10px] font-bold text-white relative z-50 pt-2">
                    <span>09:41</span>
                    <div className="flex gap-1">
                        <span>5G</span>
                        <span>100%</span>
                    </div>
                </div>

                {/* Content */}
                <div className="h-full pt-6 pb-20 overflow-hidden relative z-10 flex flex-col">
                    <ChatApp />
                </div>

                {/* Home Indicator / Navigation */}
                <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col items-center justify-end pb-6 z-50">
                    <button
                        onClick={() => setView('hub')}
                        className="w-32 h-1 bg-white/20 rounded-full mb-4 active:bg-white transition-colors"
                    />
                    <button
                        onClick={() => setView('hub')}
                        className="flex items-center gap-2 text-xs text-gray-500 hover:text-white transition-colors pb-1"
                    >
                        <ArrowLeft size={12} />
                        <span className="md:hidden">Volver</span>
                        <span className="hidden md:inline">Deslizar para Cerrar</span>
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
