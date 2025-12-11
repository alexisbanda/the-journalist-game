'use client';

import { useGameStore } from '@/store/gameStore';
import { Search, FileText, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SearchApp() {
    const activeCase = useGameStore((state) => state.activeCase);
    const collectEvidence = useGameStore((state) => state.collectEvidence);
    const checkTriggers = useGameStore((state) => state.checkTriggers);
    const tutorialFlags = useGameStore((state) => state.tutorialFlags);
    const setTutorialFlag = useGameStore((state) => state.setTutorialFlag);

    const [query, setQuery] = useState('');
    const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
    const [selection, setSelection] = useState<string | null>(null);

    const handleDocSelect = (id: string) => {
        setSelectedDocId(id);
        setSelection(null);
        checkTriggers('onOpenDocument', id);
    };

    const handleTextMouseUp = () => {
        const text = window.getSelection()?.toString().trim();
        if (text && text.length > 0) {
            setSelection(text);
        } else {
            setSelection(null);
        }
    };

    const handleCollect = () => {
        if (selection) {
            collectEvidence(selection);
            setSelection(null);
            // Visual feedback could be added here
            alert(`Evidencia recolectada: "${selection}"`);
        }
    };

    const results = activeCase?.documents.filter(doc => {
        if (!query) return true; // Show all by default
        const lowerQuery = query.toLowerCase();
        return (
            doc.title.toLowerCase().includes(lowerQuery) ||
            doc.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
            doc.content.toLowerCase().includes(lowerQuery)
        );
    }) || [];

    const selectedDoc = activeCase?.documents.find(d => d.id === selectedDocId);
    const gameMode = useGameStore((state) => state.gameMode);

    // Helper: Highlight logic
    const renderContentWithHighlights = (text: string) => {
        if (gameMode !== 'novice' || !activeCase?.variables) return text;

        // Create a regex from all variable values
        const valuesToHighlight = Object.values(activeCase.variables).filter(v => v.length > 3); // Avoid short words
        if (valuesToHighlight.length === 0) return text;

        // Escape regex special chars
        const escapeRegExp = (string: string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const pattern = new RegExp(`(${valuesToHighlight.map(escapeRegExp).join('|')})`, 'gi');

        const parts = text.split(pattern);

        return parts.map((part, i) => {
            if (valuesToHighlight.some(v => v.toLowerCase() === part.toLowerCase())) {
                return (
                    <span key={i} className="bg-yellow-900/40 text-yellow-200 font-bold px-0.5 rounded border-b-2 border-yellow-500/50" title="Pista Clave">
                        {part}
                    </span>
                );
            }
            return part;
        });
    };

    return (
        <div className="flex h-full bg-zinc-950 text-gray-300 font-mono relative">
            {/* Evidence Toast/Fab */}
            <AnimatePresence>
                {selection && (
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 20, opacity: 0 }}
                        className="absolute bottom-8 right-8 z-50"
                    >
                        <button
                            onClick={handleCollect}
                            className="bg-cyber-green text-black font-bold px-6 py-3 rounded-none shadow-[0_0_15px_rgba(16,185,129,0.4)] hover:bg-white hover:text-black flex items-center gap-2 border border-cyber-green transition-all"
                        >
                            <span className="uppercase tracking-widest text-xs">+ Guardar en Evidencia</span>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Sidebar / Results */}
            <div className={`w-full md:w-1/3 border-r border-zinc-800 flex flex-col bg-zinc-900/50 ${selectedDoc && 'hidden md:flex'}`}>
                <div className="p-4 border-b border-zinc-800 bg-zinc-900">
                    <div className="relative group">
                        <Search className="absolute left-3 top-2.5 text-zinc-500 group-focus-within:text-cyber-green transition-colors" size={16} />
                        <input
                            type="text"
                            placeholder="CONSULTAR_BASE_DE_DATOS..."
                            className="w-full pl-9 pr-4 py-2 border border-zinc-700 rounded-none bg-black text-sm text-cyber-green focus:outline-none focus:border-cyber-green placeholder:text-zinc-700 uppercase"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {results.map(doc => (
                        <button
                            key={doc.id}
                            onClick={() => handleDocSelect(doc.id)}
                            className={`w-full text-left p-4 border-b border-zinc-800/50 hover:bg-white/5 transition-colors group relative ${selectedDocId === doc.id ? 'bg-white/5 border-l-2 border-cyber-green' : 'border-l-2 border-transparent'}`}
                        >
                            <div className="flex items-start gap-3">
                                <FileText size={16} className={`mt-1 ${selectedDocId === doc.id ? 'text-cyber-green' : 'text-zinc-600 group-hover:text-zinc-400'}`} />
                                <div className="flex-1 min-w-0">
                                    <p className={`font-bold text-xs uppercase tracking-wider truncate ${selectedDocId === doc.id ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'}`}>{doc.title}</p>
                                    <p className="text-[10px] text-zinc-600 truncate mt-1 font-sans">{doc.content.substring(0, 50)}...</p>
                                </div>
                            </div>
                        </button>
                    ))}
                    {results.length === 0 && (
                        <div className="p-8 text-center text-zinc-700 text-xs font-mono uppercase">
                            [NO_SE_ENCONTRARON_REGISTROS]
                        </div>
                    )}
                </div>
            </div>

            {/* Main Content / Document View */}
            <div className={`flex-1 overflow-y-auto bg-[#0a0a0a] relative selection:bg-cyber-green selection:text-black relative ${!selectedDoc ? 'hidden md:flex items-center justify-center' : 'block'} w-full md:w-auto`} onMouseUp={handleTextMouseUp}>
                {/* Background Grid for Content Area */}
                <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />

                {selectedDoc ? (
                    <motion.div
                        key={selectedDoc.id}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="max-w-3xl mx-auto p-4 md:p-8 relative z-10"
                    >
                        {/* Mobile Back Button */}
                        <button
                            onClick={() => setSelectedDocId(null)}
                            className="md:hidden mb-4 flex items-center gap-2 text-cyber-green text-xs font-mono uppercase tracking-widest border border-zinc-800 px-3 py-2 rounded bg-zinc-900/50"
                        >
                            ← Volver a Búsqueda
                        </button>

                        <div className="mb-6 flex items-end justify-between border-b border-zinc-800 pb-4">
                            <div>
                                <span className="text-[10px] text-zinc-600 uppercase tracking-[0.2em] block mb-1">Documento Confidencial // ID: {selectedDoc.id}</span>
                                <h1 className="text-xl md:text-2xl text-white font-bold uppercase tracking-wide text-glow">
                                    {selectedDoc.title}
                                </h1>
                            </div>
                            <div className="flex gap-2">
                                {selectedDoc.tags.map(tag => (
                                    <span key={tag} className="px-1.5 py-0.5 border border-zinc-700 text-[10px] text-zinc-500 uppercase tracking-wider rounded-sm">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>



                        <div className="prose prose-invert prose-p:font-mono prose-p:text-sm prose-p:text-gray-400 prose-p:leading-loose">
                            <p className="whitespace-pre-wrap">
                                {renderContentWithHighlights(selectedDoc.content)}
                            </p>
                        </div>

                        <div className="mt-12 pt-4 border-t border-zinc-800 text-[10px] text-zinc-700 font-mono text-center">
                            *** FIN DEL ARCHIVO ***
                        </div>

                        {/* Tutorial Hint overlay */}
                        {!tutorialFlags.hasSeenEvidenceTutorial && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="fixed top-32 right-8 w-64 bg-yellow-400 text-black p-3 z-50 shadow-[0_0_20px_rgba(250,204,21,0.4)] border-2 border-black rotate-1"
                            >
                                <div className="absolute -top-2 -left-2 w-4 h-4 bg-black" />

                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-black font-mono uppercase text-sm flex items-center gap-2">
                                        <span className="animate-pulse">●</span> Tutorial
                                    </h4>
                                    <button
                                        onClick={() => setTutorialFlag('hasSeenEvidenceTutorial')}
                                        className="hover:bg-black hover:text-white rounded p-0.5 transition-colors"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>

                                <p className="text-xs font-serif leading-tight">
                                    Selecciona <span className="bg-black text-white px-1">fragmentos de texto</span> con tu mouse para recopilar evidencia.
                                </p>
                                <p className="text-[10px] mt-2 opacity-70 border-t border-black/20 pt-1">
                                    Busca nombres, fechas o lugares clave.
                                </p>
                            </motion.div>
                        )}
                    </motion.div>
                ) : (
                    <div className="text-center space-y-4 opacity-50">
                        <div className="w-20 h-20 border-2 border-zinc-800 rounded-full flex items-center justify-center mx-auto animate-pulse">
                            <Search size={32} className="text-zinc-700" />
                        </div>
                        <p className="text-xs text-zinc-600 uppercase tracking-widest">Selecciona un archivo para descifrar...</p>
                    </div>
                )}
            </div>
        </div>
    );
}
