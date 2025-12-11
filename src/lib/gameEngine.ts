import { CaseTemplate, ActiveCaseState, GameVariables } from '@/types/game';

// Helper to replace placeholders like {CULPABLE} in a string
export function replaceVariables(text: string, variables: { [key: string]: string }): string {
    let result = text;
    Object.entries(variables).forEach(([key, value]) => {
        // Replace all occurrences of {KEY}
        const regex = new RegExp(`{${key}}`, 'g');
        result = result.replace(regex, value);
    });
    return result;
}

export function generateCase(template: CaseTemplate): ActiveCaseState {
    const selectedVariables: { [key: string]: string } = {};

    // 1. Select random values for each variable
    Object.entries(template.variables_pool).forEach(([key, pool]) => {
        if (pool.length > 0) {
            const randomIndex = Math.floor(Math.random() * pool.length);
            selectedVariables[key] = pool[randomIndex];
        } else {
            selectedVariables[key] = "ERROR_MISSING_VALUE";
        }
    });

    // 2. Resolve headline
    const solvedHeadline = replaceVariables(template.headline_template, selectedVariables);

    // 3. Resolve solution Logic
    // template.solution_logic maps QuestionID -> VariableKey (e.g. q1 -> "CULPABLE")
    // We need to map QuestionID -> SelectedValue (e.g. q1 -> "Dra. Gomez")
    const solution: { [key: string]: string } = {};
    Object.entries(template.solution_logic).forEach(([questionId, variableKey]) => {
        solution[questionId] = selectedVariables[variableKey] || "UNKNOWN_VAR";
    });

    // 4. Generate Documents
    const documents = (template.documents_templates || []).map(docTmpl => ({
        id: docTmpl.id,
        title: replaceVariables(docTmpl.title_template, selectedVariables),
        content: replaceVariables(docTmpl.content_template, selectedVariables),
        tags: docTmpl.tags_template.map(tag => replaceVariables(tag, selectedVariables))
    }));

    // 5. Generate Chats
    const chats = (template.chat_templates || []).map(chatTmpl => ({
        id: chatTmpl.id,
        contactName: replaceVariables(chatTmpl.contactName, selectedVariables),
        messages: chatTmpl.initial_messages.map((msg, idx) => ({
            id: `${chatTmpl.id}_msg_${idx}`,
            sender: msg.sender,
            content: replaceVariables(msg.content_template, selectedVariables),
            timestamp: "09:00" // Static start time for now
        })),
        isCompleted: false
    }));


    // FIX: If there's a dialogue script, we need to initialize the chat with the "start" node options.
    // We'll attach the script to the state so the store can read it.

    const initialState: ActiveCaseState = {
        templateId: template.id,
        headline: solvedHeadline,
        variables: selectedVariables,
        solution: solution,
        possibleValues: template.variables_pool,
        documents: documents,
        chats: chats,
        collectedEvidence: []
    };

    if (template.dialogue_script) {
        // Initialize ALL chat threads that have an initial_node_id
        initialState.chats.forEach(chat => {
            const chatTmpl = template.chat_templates.find(t => t.id === chat.id);
            if (chatTmpl && chatTmpl.initial_node_id) {
                const startNode = template.dialogue_script![chatTmpl.initial_node_id];
                if (startNode) {
                    // Add initial NPC message
                    chat.messages.push({
                        id: `msg_init_${chat.id}`,
                        sender: "contact",
                        content: replaceVariables(startNode.text, selectedVariables),
                        timestamp: "09:00"
                    });
                    // Set initial options
                    chat.currentOptions = startNode.choices.map((c, i) => ({
                        id: `opt_${chat.id}_${i}`,
                        text: replaceVariables(c.text, selectedVariables),
                        nextStepId: c.next_node,
                        statsEffect: c.stats
                    }));
                    // Set active node
                    chat.activeNodeId = chatTmpl.initial_node_id;
                }
            }
        });
    }

    return { ...initialState, dialogueScript: template.dialogue_script };
}
