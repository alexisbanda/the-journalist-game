export type Difficulty = 'easy' | 'medium' | 'hard';

export interface GameVariables {
    [key: string]: string[];
}

export interface CaseTemplate {
    id: string;
    difficulty: Difficulty;
    headline_template: string;
    variables_pool: GameVariables;
    solution_logic: {
        [key: string]: string; // e.g. "q1_target": "CULPABLE"
    };
    documents_templates: {
        id: string;
        title_template: string;
        content_template: string;
        tags_template: string[];
    }[];
    chat_templates: {
        id: string;
        contactName: string;
        initial_messages: {
            sender: 'player' | 'contact';
            content_template: string;
            delay: number; // seconds
        }[];
        initial_node_id?: string; // Entry point for this character's dialogue tree
    }[];
    dialogue_script?: {
        [nodeId: string]: {
            text: string; // NPC text
            unlocks_clue?: string; // ID of clue logic
            choices: {
                text: string;
                next_node: string;
                stats?: { [key: string]: number };
            }[];
        };
    };
    triggers?: {
        onOpenDocument?: { [docId: string]: string };
    };
}

export interface ActiveCaseState {
    templateId: string;
    headline: string;
    variables: { [key: string]: string }; // Resolved variables (e.g. "CULPABLE": "Dra. Gomez")
    solution: { [key: string]: string }; // Correct answers for the quiz
    possibleValues: GameVariables; // Added back for dropdowns
    documents: GameDocument[];
    chats: ChatThread[];
    dialogueScript?: any; // Avoiding complex type recursion for now

    // New Mechanics
    collectedEvidence: string[]; // Strings explicitly collected by user
    triggers?: {
        onOpenDocument?: { [docId: string]: string }; // docId -> message text
    };
}

export interface InventoryItem {
    id: string;
    type: 'text' | 'image' | 'audio';
    content: string;
    label: string;
}

export type ViewState = 'intro' | 'hub' | 'phone' | 'computer';

export interface GameDocument {
    id: string;
    title: string;
    content: string; // HTML-like string or plaintext
    tags: string[]; // Keywords to match search
}

export interface Message {
    id: string;
    sender: 'player' | 'contact';
    content: string;
    timestamp: string; // Display time "09:41"
}

export interface ChatThread {
    id: string;
    contactName: string;
    messages: Message[];
    isCompleted: boolean;
    activeNodeId?: string; // Current step in the dialogue tree
    currentOptions?: {
        id: string;
        text: string;
        nextStepId?: string;
        unlocksClueId?: string;
        statsEffect?: { [key: string]: number }; // e.g. { credibility: 5 }
    }[];
}
