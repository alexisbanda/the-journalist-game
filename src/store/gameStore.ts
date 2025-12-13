import { create } from 'zustand';
import { ActiveCaseState, InventoryItem, ViewState } from '@/types/game';
import { replaceVariables } from '@/lib/gameEngine';
import { CASES } from '@/data/cases';

interface PlayerStats {
    totalScore: number;
    casesSolved: number;
    averageAccuracy: number;
    currentTitle: string;
}



interface GameState {
    currentView: ViewState;
    activeCase: ActiveCaseState | null;
    inventory: InventoryItem[];
    gameTime: Date;
    gameMode: 'novice' | 'expert';
    maxUnlockedCaseIndex: number; // 0 = Only first case (tutorial), 1 = First two, etc.
    playerStats: PlayerStats;


    // Tutorial Flags
    tutorialFlags: {
        hasSeenEvidenceTutorial: boolean;
        hasSeenEditorTutorial: boolean;
    };

    // Actions
    setView: (view: ViewState) => void;
    setActiveCase: (caseState: ActiveCaseState) => void;
    clearActiveCase: () => void;
    returnToHub: () => void;
    addToInventory: (item: InventoryItem) => void;
    setTutorialFlag: (flag: 'hasSeenEvidenceTutorial' | 'hasSeenEditorTutorial') => void;
    setGameMode: (mode: 'novice' | 'expert') => void;
    completeCase: (caseId: string, score: number) => void;


    // Gameplay Actions
    addMessageToThread: (threadId: string, message: any) => void;
    markThreadComplete: (threadId: string) => void;
    chooseOption: (threadId: string, option: any) => void;

    // Evidence Actions
    collectEvidence: (text: string) => void;
    checkTriggers: (type: 'onOpenDocument', id: string) => void;
}

export const useGameStore = create<GameState>((set) => ({
    currentView: 'intro',
    activeCase: null,
    inventory: [],
    gameTime: new Date(),
    gameMode: 'novice', // Default to Novice
    maxUnlockedCaseIndex: 0,
    playerStats: {
        totalScore: 0,
        casesSolved: 0,
        averageAccuracy: 0,
        currentTitle: 'Pasante'
    },


    tutorialFlags: {
        hasSeenEvidenceTutorial: false,
        hasSeenEditorTutorial: false,
    },

    setView: (view) => set({ currentView: view }),
    setActiveCase: (caseState) => set({ activeCase: caseState }),
    clearActiveCase: () => set({ activeCase: null }),
    returnToHub: () => set({ activeCase: null, currentView: 'hub' }),
    addToInventory: (item) => set((state) => ({
        inventory: [...state.inventory, item]
    })),
    setTutorialFlag: (flag) => set((state) => ({
        tutorialFlags: { ...state.tutorialFlags, [flag]: true }
    })),
    setGameMode: (mode) => set({ gameMode: mode }),

    completeCase: (caseId, score) => set((state) => {
        // Update Stats
        const newCasesSolved = state.playerStats.casesSolved + 1;
        const newTotalScore = state.playerStats.totalScore + score;
        const newAverage = Math.round(((state.playerStats.averageAccuracy * state.playerStats.casesSolved) + score) / newCasesSolved);

        let newTitle = 'Pasante';
        if (newTotalScore >= 1000) newTitle = 'Leyenda del Periodismo';
        else if (newTotalScore >= 600) newTitle = 'Editor Jefe';
        else if (newTotalScore >= 300) newTitle = 'Investigador Senior';
        else if (newTotalScore >= 100) newTitle = 'Reportero Junior';

        const updatedStats = {
            totalScore: newTotalScore,
            casesSolved: newCasesSolved,
            averageAccuracy: newAverage,
            currentTitle: newTitle
        };

        const caseIndex = CASES.findIndex(c => c.id === caseId);
        let nextIndex = state.maxUnlockedCaseIndex;
        if (caseIndex !== -1 && caseIndex === state.maxUnlockedCaseIndex) {
            // Unlock next case if this was the latest one
            nextIndex = Math.min(state.maxUnlockedCaseIndex + 1, CASES.length - 1);
        }

        return {
            maxUnlockedCaseIndex: nextIndex,
            playerStats: updatedStats
        };
    }),

    chooseOption: (threadId, option) => set((state) => {
        if (!state.activeCase) return state;

        const chatIndex = state.activeCase.chats.findIndex(c => c.id === threadId);
        if (chatIndex === -1) return state;

        const chat = state.activeCase.chats[chatIndex];

        // 1. Add Player Message
        const playerMsg: any = {
            id: `msg_p_${Date.now()}`,
            sender: 'player',
            content: option.text,
            timestamp: '09:05'
        };

        let updatedChat = {
            ...chat,
            messages: [...chat.messages, playerMsg],
            currentOptions: [] // Clear options while "thinking"
        };

        const nextNodeId = option.nextStepId;
        const script = state.activeCase.dialogueScript;

        // 2. Process Next Node (if script exists)
        if (script && nextNodeId && script[nextNodeId]) {
            const nextNode = script[nextNodeId];

            // Simulating a response (in a real app, uses timeout, here immediate for sync state update complexity)
            const npcMsg: any = {
                id: `msg_npc_${Date.now()}`,
                sender: 'contact',
                content: replaceVariables(nextNode.text, state.activeCase!.variables),
                timestamp: '09:06'
            };

            updatedChat.messages.push(npcMsg);

            // Check unlocks
            if (nextNode.unlocks_clue) {
                // Logic to unlock clue? For now just notification or similar.
                // We might need an 'inventory' update here too, but let's stick to chat flow.
            }

            // Set next options
            if (nextNode.choices && nextNode.choices.length > 0) {
                updatedChat.currentOptions = nextNode.choices.map((c: any, i: number) => ({
                    id: `opt_${nextNodeId}_${i}`,
                    text: replaceVariables(c.text, state.activeCase!.variables),
                    nextStepId: c.next_node,
                    statsEffect: c.stats
                }));
            } else {
                updatedChat.isCompleted = true;
            }
        } else {
            // No script or end of script
            // If it was valid but no node, keep it empty.
        }

        const newChats = [...state.activeCase.chats];
        newChats[chatIndex] = updatedChat;

        return { activeCase: { ...state.activeCase, chats: newChats } };
    }),

    addMessageToThread: (threadId, message) => set((state) => {
        // ... previous impl ...
        if (!state.activeCase) return state;
        // ...
        return state; // Placeholder to avoid breaking if not used
    }),

    markThreadComplete: (threadId) => set((state) => {
        // ... previous impl ...
        return state;
    }),

    collectEvidence: (text) => set((state) => {
        if (!state.activeCase) return state;
        const current = state.activeCase.collectedEvidence || [];
        if (current.includes(text)) return state; // No duplicates

        return {
            activeCase: {
                ...state.activeCase,
                collectedEvidence: [...current, text]
            },
            tutorialFlags: { ...state.tutorialFlags, hasSeenEvidenceTutorial: true } // Auto-mark as seen if they successfully collected
        };
    }),

    checkTriggers: (type, id) => set((state) => {
        if (!state.activeCase || !state.activeCase.triggers) return state;

        if (type === 'onOpenDocument') {
            const triggerMsg = state.activeCase.triggers.onOpenDocument?.[id];
            if (triggerMsg) {
                // Send message to FIRST chat
                const chats = state.activeCase.chats.map((chat, idx) => {
                    if (idx === 0) { // Should check ID or role
                        // Don't duplicate if already sent? For now allow spam or check id
                        return {
                            ...chat,
                            messages: [...chat.messages, {
                                id: `msg_trig_${Date.now()}`,
                                sender: 'contact' as const,
                                content: triggerMsg,
                                timestamp: 'NOW'
                            }]
                        };
                    }
                    return chat;
                });
                return { activeCase: { ...state.activeCase, chats } };
            }
        }
        return state;
    }),
}));
