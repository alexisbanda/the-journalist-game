'use client';

import { useGameStore } from '@/store/gameStore';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Smartphone, ArrowLeft, AlertTriangle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function ChatApp() {
    const activeCase = useGameStore((state) => state.activeCase);
    const chooseOption = useGameStore((state) => state.chooseOption);
    const collectEvidence = useGameStore((state) => state.collectEvidence);

    // State for navigation
    const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
    const [selection, setSelection] = useState<string | null>(null);

    const activeThread = activeCase?.chats.find(c => c.id === selectedThreadId);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const handleOptionClick = (option: any) => {
        if (activeThread && activeCase) {
            chooseOption(activeThread.id, option);
        }
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
            alert(`Evidencia recolectada: "${selection}"`);
        }
    };

    // Auto-scroll to bottom
    useEffect(() => {
        if (activeThread) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [activeThread?.messages]);

    if (!activeCase || !activeCase.chats || activeCase.chats.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <Smartphone size={48} className="mb-4 opacity-50" />
                <p>No hay chats activos</p>
            </div>
        );
    }

    // CONTACT LIST VIEW
    if (!selectedThreadId) {
        return (
            <div className="flex flex-col h-full bg-black text-white">
                <div className="bg-gray-800 p-4 border-b border-gray-700">
                    <h2 className="font-bold text-lg">Chats</h2>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {activeCase.chats.map(chat => {
                        const lastMsg = chat.messages[chat.messages.length - 1];
                        return (
                            <button
                                key={chat.id}
                                onClick={() => setSelectedThreadId(chat.id)}
                                className="w-full p-4 border-b border-gray-800 flex items-center gap-4 hover:bg-gray-900 transition-colors"
                            >
                                <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center font-bold text-lg">
                                    {chat.contactName.charAt(0)}
                                </div>
                                <div className="flex-1 text-left">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <span className="font-bold">{chat.contactName}</span>
                                        {lastMsg && <span className="text-xs text-gray-500">{lastMsg.timestamp}</span>}
                                    </div>
                                    <p className="text-sm text-gray-400 truncate w-48">
                                        {lastMsg ? lastMsg.content : "Iniciar conversación..."}
                                    </p>
                                </div>
                                {chat.currentOptions && chat.currentOptions.length > 0 && (
                                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    }

    // DETAIL VIEW (Existing Logic wrapped)
    // DETAIL VIEW
    return (
        <div className="flex flex-col h-full bg-[#050505] relative font-sans" onMouseUp={handleTextMouseUp}>
            {/* EVIDENCE BUTTON - FLOATING ACTION BUTTON */}
            <AnimatePresence>
                {selection && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="absolute bottom-24 right-4 z-[9999]"
                    >
                        <button
                            onClick={handleCollect}
                            className="bg-cyber-green text-black font-bold text-xs px-4 py-3 rounded-full shadow-[0_4px_15px_rgba(16,185,129,0.5)] active:scale-95 transition-transform flex items-center gap-2 border-2 border-white/20"
                        >
                            <span className="text-lg">+</span>
                            <span className="uppercase tracking-wider">Evidencia</span>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header with Back Button */}
            <div className="h-16 bg-black/80 backdrop-blur-md border-b border-zinc-800 flex items-center gap-3 px-4 shadow-sm z-50 sticky top-0">
                <button
                    onClick={() => { setSelectedThreadId(null); setSelection(null); }}
                    className="mr-1 text-zinc-400 hover:text-white p-2"
                >
                    <ArrowLeft size={20} />
                </button>
                <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-zinc-700 to-zinc-900 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-inner border border-zinc-700">
                        {activeThread?.contactName.charAt(0)}
                    </div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></div>
                </div>
                <div className="flex-1">
                    <h3 className="text-white font-bold text-sm leading-tight flex items-center gap-2">
                        {activeThread?.contactName}
                        {activeThread?.contactName === 'Unknown' && <AlertTriangle size={12} className="text-yellow-500" />}
                    </h3>
                    <span className="text-[10px] text-green-500 uppercase tracking-wider font-bold">Conexión Cifrada</span>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 selection:bg-cyber-green selection:text-black scroll-smooth bg-gradient-to-b from-black to-[#0a0a0a]">
                {/* Chat Encryption Notice */}
                <div className="text-center my-4">
                    <span className="text-[10px] bg-zinc-900/80 text-zinc-500 px-3 py-1 rounded-full border border-zinc-800">
                        🔒 Mensajes cifrados de extremo a extremo
                    </span>
                </div>

                {activeThread?.messages.map((msg, idx) => (
                    <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.2 }}
                        className={`flex ${msg.sender === 'player' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[85%] relative group ${msg.sender === 'player' ? 'items-end' : 'items-start'}`}
                        >
                            <div
                                className={`p-3 text-sm shadow-sm relative z-10 ${msg.sender === 'player'
                                    ? 'bg-cyber-blue text-white rounded-2xl rounded-tr-sm'
                                    : 'bg-zinc-800 text-gray-200 rounded-2xl rounded-tl-sm border border-zinc-700'
                                    }`}
                            >
                                <p className="leading-relaxed">{msg.content}</p>
                            </div>
                            <div className={`text-[10px] text-zinc-600 mt-1 flex gap-1 ${msg.sender === 'player' ? 'justify-end' : 'justify-start'}`}>
                                <span>{msg.timestamp}</span>
                                {msg.sender === 'player' && <span>✓✓</span>}
                            </div>
                        </div>
                    </motion.div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area (Options) */}
            <div className="p-4 bg-black/80 backdrop-blur border-t border-zinc-800 min-h-[80px]">
                {activeThread?.isCompleted ? (
                    <div className="flex flex-col items-center justify-center p-4 text-zinc-600 gap-2">
                        <div className="w-8 h-1 bg-zinc-800 rounded-full" />
                        <p className="text-xs italic">El usuario se desconectó.</p>
                    </div>
                ) : activeThread?.currentOptions && activeThread.currentOptions.length > 0 ? (
                    <div className="space-y-2">
                        {activeThread.currentOptions.map((opt, i) => (
                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                key={opt.id}
                                onClick={() => handleOptionClick(opt)}
                                className="w-full p-3.5 bg-zinc-900/50 text-white rounded-xl text-sm border border-zinc-700 hover:bg-zinc-800 hover:border-cyber-blue transition-all active:scale-98 text-left group flex items-center justify-between shadow-lg"
                            >
                                <span>{opt.text}</span>
                                <span className="opacity-0 group-hover:opacity-100 text-cyber-blue transition-opacity">→</span>
                            </motion.button>
                        ))}
                    </div>
                ) : (
                    <div className="flex items-center gap-2 justify-center p-4">
                        <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-bounce"></span>
                    </div>
                )}
            </div>
        </div>
    );
}
