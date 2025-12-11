'use client';

import { useGameStore } from '@/store/gameStore';
import { AnimatePresence } from 'framer-motion';
import HubView from './HubView';
import PhoneView from './PhoneView';
import ComputerView from './ComputerView';
import IntroView from './IntroView';

export default function GameRoot() {
    // Use a selector to subscribe only to currentView changes
    const currentView = useGameStore((state) => state.currentView);

    return (
        <main className="w-screen h-screen overflow-hidden bg-black text-white font-sans">
            <AnimatePresence mode="wait">
                {currentView === 'intro' && <IntroView key="intro" />}
                {currentView === 'hub' && <HubView key="hub" />}
                {currentView === 'phone' && <PhoneView key="phone" />}
                {currentView === 'computer' && <ComputerView key="computer" />}
            </AnimatePresence>
        </main>
    );
}
