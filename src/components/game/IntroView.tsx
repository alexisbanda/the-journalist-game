'use client';

import { useGameStore } from '@/store/gameStore';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const headlines = [
    "CORRUPCIÓN EN EL PUERTO",
    "¿DÓNDE ESTÁ EL DINERO?",
    "EL SILENCIO MATA",
    "ESCÁNDALO FINANCIERO",
    "LA VERDAD OCULTA"
];

export default function IntroView() {
    const setView = useGameStore((state) => state.setView);
    const [currentHeadline, setCurrentHeadline] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentHeadline((prev) => (prev + 1) % headlines.length);
        }, 2500); // Slower interval
        return () => clearInterval(interval);
    }, []);

    const handleStart = () => {
        // Here we could play a sound effect
        setView('hub');
    };

    return (
        <div className="relative w-full h-full bg-black overflow-hidden flex flex-col items-center justify-center font-mono">
            {/* 1. Dramatic Background - Messy Desk */}
            <motion.div
                className="absolute inset-0 z-0"
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1.0, opacity: 0.4 }}
                transition={{ duration: 3, ease: 'easeOut' }}
            >
                <img
                    src="/assets/intro_desk_bg.png"
                    alt="Messy Desk"
                    className="w-full h-full object-cover opacity-60 grayscale contrast-125 brightness-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-90"></div>
            </motion.div>

            {/* 2. Spinning Newspaper Montage Effect */}
            <AnimatePresence>
                <motion.div
                    key={currentHeadline}
                    className="absolute z-10 flex flex-col items-center justify-center pointer-events-none"
                    initial={{ scale: 0.8, rotate: -10, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 0.9 }} // Added transparency
                    exit={{ scale: 1.2, opacity: 0, filter: "blur(10px)" }} // Reduced zoom intensity and added blur
                    transition={{ duration: 2, ease: "easeInOut" }} // Slower, smoother transition
                >
                    {/* Newspaper Image Overlay */}
                    <div className="relative w-[300px] h-[400px] md:w-[500px] md:h-[600px] bg-white shadow-2xl overflow-hidden brightness-90 sepia-[.3]">
                        <img
                            src="/assets/newspaper_spin.png"
                            className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-multiply"
                            alt="Newspaper"
                        />
                        <div className="absolute top-1/4 left-0 w-full text-center px-4 mix-blend-multiply">
                            <h2 className="text-4xl md:text-6xl font-black uppercase text-black leading-tight tracking-tighter transform -rotate-2">
                                {headlines[currentHeadline]}
                            </h2>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* 3. Camera Flash Overlay */}
            <motion.div
                key={`flash-${currentHeadline}`}
                className="absolute inset-0 bg-white z-20 pointer-events-none"
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            />

            {/* 4. Main Title Interface (Appears after montage?) - Let's keep it overlaying */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3, duration: 1 }}
                className="z-30 absolute bottom-12 flex flex-col items-center gap-6"
            >
                <div className="bg-black/80 backdrop-blur-sm p-6 border border-red-900 shadow-2xl text-center rounded-sm">
                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white drop-shadow-[0_0_10px_rgba(255,0,0,0.5)]">
                        DEADLINE
                    </h1>
                    <p className="text-red-500 tracking-[0.5em] text-sm uppercase mt-2">Sala de Redacción</p>
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleStart}
                    className="group relative px-10 py-4 bg-red-700 hover:bg-red-600 text-white font-bold text-xl tracking-wider uppercase transition-all shadow-[0_0_30px_rgba(220,38,38,0.4)] hover:shadow-[0_0_50px_rgba(220,38,38,0.6)] border-2 border-red-500"
                >
                    <span className="relative z-10 flex items-center gap-3">
                        <span className="animate-pulse">●</span>
                        <span>Iniciar Turno</span>
                    </span>
                    <div className="absolute inset-0 w-full h-full bg-red-500 blur-lg opacity-0 group-hover:opacity-30 transition-opacity"></div>
                </motion.button>
            </motion.div>

            {/* Noise Overlay */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-40 mix-blend-overlay"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />
        </div>
    );
}
