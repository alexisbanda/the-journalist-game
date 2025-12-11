'use client';

import { useGameStore } from '@/store/gameStore';
import { useState } from 'react';
import { Check, AlertTriangle, Loader2 } from 'lucide-react';
import NewspaperView from './NewspaperView';

// --- Validation Helpers ---

const normalize = (str: string) => {
    return str
        .toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Remove accents
        .replace(/[^\w\s]/g, '') // Remove punctuation
        .replace(/\s+/g, ' ') // Collapse spaces
        .trim();
};

const levenshtein = (a: string, b: string) => {
    const matrix = [];
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }
    return matrix[b.length][a.length];
};

const checkMatch = (selection: string, answer: string) => {
    if (!selection || !answer) return false;
    const s = normalize(selection);
    const a = normalize(answer);

    // 1. Direct Inclusion (Flexible)
    if (s.includes(a) || a.includes(s)) return true;

    // 2. Levenshtein Distance (Allow small errors/typos)
    const dist = levenshtein(s, a);
    const maxLength = Math.max(s.length, a.length);
    // Allow up to 20% difference or 3 characters, whichever is stricter for short words
    const allowedErrors = Math.min(3, Math.floor(maxLength * 0.3));

    return dist <= allowedErrors;
};

export default function EditorApp() {
    const activeCase = useGameStore((state) => state.activeCase);
    const clearActiveCase = useGameStore((state) => state.clearActiveCase);
    const [selections, setSelections] = useState<{ [key: string]: string }>({});
    const [status, setStatus] = useState<'editing' | 'validating' | 'success' | 'failure'>('editing');

    if (!activeCase) return null;

    if (status === 'success') {
        return (
            <NewspaperView
                activeCase={activeCase}
                selections={selections}
                onClose={() => {
                    clearActiveCase();
                    // Maybe route to Hub or just close
                }}
            />
        );
    }
    // ... rest of component

    // Derive questions from solution_logic keys
    // Assuming keys are like q1_target (not very descriptive), 
    // in a real app we'd want descriptive labels map.
    // For now, let's just iterate the keys of the solution.
    const questions = Object.keys(activeCase.solution);

    // We need the "pool" of options for each question.
    // Since we don't have a direct mapping of Question -> Variable Key here easily available 
    // without passing it from the engine or storing it differently,
    // I will cheat slightly and assume I can find the variable key by looking at the template?
    // Actually, activeCase.solution is just { q1: "Value", q2: "Value" }.
    // I need to know WHICH variable pool to show for Q1.

    // FIX: I need to pass the "Schema" to the ActiveCase or store it.
    // For this MVP, let's just show ALL unique values from the variables found in the mock?
    // Or better, let's grab the `variables` from activeCase (which are the *selected* ones).
    // Wait, I need the *options*, not just the selected ones.
    // The client doesn't have the full `CaseTemplate` with `variables_pool` in `activeCase`.
    // I should add `variables_pool` to `activeCase` or `GameStore` to allow the dropdowns to work properly.

    // HOTFIX: For this step, I will hardcode the logic to just "Type in the answer" or 
    // re-architect slightly to pass the pools. 
    // Let's assume for now we just show a simple input or dropdown with "Correct" and "Incorrect" options if I had them.
    // Actually, I can allow the user to dragging/dropping clues? No, PRD says "Dropdowns".

    // REAL FIX: I will update `ActiveCaseState` to include `possibleValues` for the dropdowns.
    // ALLOWANCE: For this specific file, I will just render a "Select..." with the Correct Answer + 2 Random fake ones?
    // No, that reveals the answer.

    // PLAN B: I will assume the user has to TYPE the answer found (Search implementation).
    // PRD says: "Dropdowns (listas desplegables)".
    // I will render the `variables` values from the `activeCase`? No, that's just the answer.

    // Okay, I will pause this file creation to update the Type/Engine first to include `variableOpts`.

    return (
        <div className="p-4 md:p-8 bg-gray-100 h-full active:bg-gray-100 text-black font-serif overflow-y-auto">
            <h1 className="text-4xl font-bold mb-8 text-center border-b-4 border-black pb-4">
                La Crónica Matutina
            </h1>

            {status === 'validating' && (
                <div className="bg-blue-100 border border-blue-500 text-blue-700 p-6 mb-4 rounded flex flex-col items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Loader2 className="animate-spin" /> Verificando fuentes...
                    </div>
                    <div className="w-full bg-blue-200 h-2 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 animate-progressBar w-full origin-left transition-transform duration-[2000ms] ease-linear"></div>
                    </div>
                </div>
            )}



            {status === 'failure' && (
                <div className="bg-red-100 border border-red-500 text-red-700 p-4 mb-4 rounded">
                    <div className="flex items-center gap-2 font-bold">
                        <AlertTriangle /> Verificación de hechos fallida.
                    </div>
                    <ul className="list-disc list-inside text-sm mt-2 font-mono">
                        {questions.map(q => {
                            const sel = selections[q] || "";
                            const ans = activeCase.solution[q] || "";
                            const match = checkMatch(sel, ans);

                            if (!match) {
                                return (
                                    <li key={q}>
                                        Error en {q.toUpperCase()}: La evidencia "{sel}" no respalda los hechos.
                                        {/* Hint for dev/testing: Expected approx "{ans}" */}
                                    </li>
                                );
                            }
                            return null;
                        })}
                    </ul>
                </div>
            )}

            <div className="bg-white p-4 md:p-8 shadow-2xl max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">

                {/* LEFT COLUMN: CONTROLS */}
                <div>
                    <h2 className="text-xl font-bold mb-6 bg-gray-200 inline-block px-2 uppercase tracking-wider">
                        Configuración Editorial
                    </h2>

                    {(!activeCase.collectedEvidence || activeCase.collectedEvidence.length === 0) && (
                        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6">
                            <p className="font-bold text-yellow-700 text-sm uppercase">Falta Información</p>
                            <p className="text-xs text-yellow-800 mt-1">
                                No puedes publicar sin fuentes. <br />
                                Ve a la aplicación <strong>BASE_DE_DATOS</strong> o <strong>TELÉFONO</strong> y busca evidencia relevante.
                            </p>
                        </div>
                    )}

                    <div className="space-y-6">
                        {questions.map((qKey) => (
                            <div key={qKey} className="flex flex-col group">
                                <label className="font-bold uppercase text-xs text-gray-500 mb-1 flex items-center gap-2 group-focus-within:text-black transition-colors">
                                    <div className="w-2 h-2 bg-black rounded-full"></div> {qKey}
                                </label>
                                <select
                                    className="border-b-2 border-gray-300 bg-gray-50 p-3 focus:outline-none focus:border-black focus:bg-white transition-all font-sans text-sm"
                                    onChange={(e) => setSelections(prev => ({ ...prev, [qKey]: e.target.value }))}
                                >
                                    <option value="">Seleccionar...</option>
                                    {activeCase.collectedEvidence && activeCase.collectedEvidence.length > 0 ? (
                                        activeCase.collectedEvidence.map(ev => (
                                            <option key={ev} value={ev}>{ev}</option>
                                        ))
                                    ) : (
                                        <option disabled>NO HAY EVIDENCIA RECOLECTADA (Usar Navegador)</option>
                                    )}
                                </select>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => {
                            setStatus('validating');

                            setTimeout(() => {
                                const isWin = questions.every(q => {
                                    const sel = selections[q] || "";
                                    const ans = activeCase.solution[q] || "";
                                    return checkMatch(sel, ans);
                                });
                                setStatus(isWin ? 'success' : 'failure');
                            }, 2000);
                        }}
                        disabled={status === 'validating'}
                        className={`mt-12 px-8 py-4 font-bold transition-all w-full uppercase tracking-widest text-sm border-2 ${status === 'validating'
                            ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                            : 'bg-black text-white border-black hover:bg-white hover:text-black'
                            }`}
                    >
                        {status === 'validating' ? 'Verificando Fuentes...' : 'Publicar Noticia'}
                    </button>
                </div>

                {/* RIGHT COLUMN: PREVIEW */}
                <div className="border border-gray-200 bg-gray-50 p-8 relative grayscale">
                    <div className="absolute top-0 right-0 bg-gray-200 text-[10px] font-bold px-2 py-1 uppercase text-gray-500">
                        Vista Previa
                    </div>

                    <div className="text-center mb-8 border-b-2 border-black pb-4">
                        <h1 className="font-serif text-4xl font-black uppercase mb-2">La Crónica</h1>
                        <p className="text-xs uppercase tracking-widest border-t border-black pt-1">
                            {new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} | Edición Ciudad
                        </p>
                    </div>

                    <div className="text-center font-serif">
                        <h2 className="text-3xl font-bold leading-tight mb-4">
                            {activeCase.headline}
                        </h2>
                        {/* Dynamic Subhead using selection logic if possible, or just placeholders */}
                        <div className="text-left text-sm leading-relaxed text-gray-600 column-count-2 gap-4" style={{ columnCount: 2 }}>
                            <p className="mb-4 first-letter:text-3xl first-letter:font-bold first-letter:float-left first-letter:mr-1">
                                Las autoridades confirmaron hoy que <span className="bg-yellow-200 font-bold px-1">{selections[questions[0]] || "________"}</span> es el principal sospechoso en la investigación en curso.
                            </p>
                            <p>
                                Fuentes cercanas a la investigación revelaron que se encontró evidencia vital cerca de <span className="bg-yellow-200 font-bold px-1">{selections[questions[1]] || "________"}</span>.
                            </p>
                            <p className="mt-4">
                                "Estamos haciendo todo lo posible," declaró el Jefe de Policía. Se aconseja al público permanecer vigilante.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
