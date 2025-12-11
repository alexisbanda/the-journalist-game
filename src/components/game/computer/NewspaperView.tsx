'use client';

import { motion } from 'framer-motion';
import { ActiveCaseState } from '@/types/game';

interface NewspaperViewProps {
    activeCase: ActiveCaseState;
    selections: { [key: string]: string };
    onClose: () => void;
}

export default function NewspaperView({ activeCase, selections, onClose }: NewspaperViewProps) {
    const date = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });

    // Helper to format body text
    const getBodyText = () => {
        // Simple template Logic: replace known keys or just dump facts
        return `
        (CIUDAD) - En un sorprendente giro de los acontecimientos, la verdad detrás de "${activeCase.headline}" finalmente ha sido revelada. 
        
        Fuentes de la investigación confirmaron que ${selections['q1_who'] || activeCase.solution['q1_who'] || 'el sospechoso'} fue de hecho el responsable. 
        Evidencia clave recolectada en la escena en ${selections['q2_where'] || activeCase.solution['q2_where'] || 'la ubicación'} resultó crucial para resolver el misterio que ha asolado a la ciudad desde ${selections['q3_when'] || activeCase.solution['q3_when'] || 'el incidente'}.

        "Fue un caso difícil," dijo el Jefe de Policía. "Pero gracias al diligente trabajo del equipo de investigación de La Crónica Matutina, se hará justicia."

        Las autoridades ahora se mueven para cerrar el expediente definitivamente.
        `;
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-8"
        >
            <div className="bg-[#f0e6d2] text-black w-full max-w-4xl h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col items-center p-8 border-r-4 border-b-4 border-gray-400">
                {/* Header */}
                <div className="w-full border-b-4 border-black mb-4 pb-2 text-center">
                    <h1 className="font-serif text-6xl font-black uppercase tracking-tighter mb-2">La Crónica Matutina</h1>
                    <div className="flex justify-between border-t-2 border-dashed border-black pt-1 text-sm font-bold font-mono">
                        <span>VOL. XCIII No. 14,203</span>
                        <span>{date}</span>
                        <span>PRECIO: $1.50</span>
                    </div>
                </div>

                {/* Headline */}
                <div className="w-full text-center mb-8">
                    <h2 className="font-serif text-5xl font-bold leading-tight uppercase">
                        {activeCase.headline}
                    </h2>
                </div>

                {/* Content Layout */}
                <div className="flex gap-8 w-full">
                    {/* Main Column */}
                    <div className="flex-1">
                        {/* Placeholder Image */}
                        <div className="w-full h-64 bg-gray-400 mb-4 grayscale flex items-center justify-center border-2 border-black">
                            <span className="font-mono text-white text-xl bg-black px-2">FOTO DE EVIDENCIA</span>
                        </div>

                        {/* Body Text */}
                        <div className="font-serif text-lg leading-relaxed text-justify whitespace-pre-line columns-2 gap-8">
                            <span className="float-left text-5xl font-black mr-2 mt-[-6px]">T</span>
                            {getBodyText()}
                        </div>
                    </div>

                    {/* Side Column */}
                    <div className="w-1/4 border-l-2 border-black pl-4 flex flex-col gap-4">
                        <div className="bg-black text-white p-2 font-bold text-center uppercase">Edición Tardía</div>
                        <p className="font-serif text-sm">Usa la aplicación Navegador para encontrar más pistas.</p>
                        <hr className="border-black my-4" />
                        <p className="font-bold text-center uppercase text-xl">Clima</p>
                        <p className="font-serif text-center">Lluvioso, típico Noir.</p>
                    </div>
                </div>

                {/* Footer Controls */}
                <div className="mt-auto pt-8 w-full flex justify-center">
                    <button
                        onClick={onClose}
                        className="bg-black text-white px-12 py-4 font-bold text-xl uppercase tracking-widest hover:bg-gray-800 transition-transform hover:scale-105 shadow-xl border-2 border-gray-600"
                    >
                        TERMINAR INVESTIGACIÓN
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
