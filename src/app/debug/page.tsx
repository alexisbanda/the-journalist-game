'use client';

import { useState } from 'react';
import { MOCK_CASE } from '@/data/mockCase';
import { CASES } from '@/data/cases';
import { generateCase } from '@/lib/gameEngine';
import { ActiveCaseState, CaseTemplate } from '@/types/game';

export default function DebugPage() {
    const [generatedCase, setGeneratedCase] = useState<ActiveCaseState | null>(null);

    const handleGenerate = (template: CaseTemplate = MOCK_CASE) => {
        const result = generateCase(template);
        setGeneratedCase(result);
    };

    return (
        <div className="p-8 font-mono text-sm">
            <h1 className="text-xl mb-4 font-bold text-accent-gold">DEBUG: Case Generation</h1>

            <div className="flex gap-2 mb-4">
                <button
                    onClick={() => handleGenerate(CASES[0])}
                    className="px-4 py-2 bg-blue-600 text-white font-bold hover:bg-blue-500 rounded"
                >
                    Case 1: Politics
                </button>
                <button
                    onClick={() => handleGenerate(CASES[1])}
                    className="px-4 py-2 bg-green-600 text-white font-bold hover:bg-green-500 rounded"
                >
                    Case 2: Corp
                </button>
                <button
                    onClick={() => handleGenerate(CASES[2])}
                    className="px-4 py-2 bg-red-600 text-white font-bold hover:bg-red-500 rounded"
                >
                    Case 3: Crime
                </button>
                <button
                    onClick={() => handleGenerate(MOCK_CASE)}
                    className="px-4 py-2 bg-gray-600 text-white font-bold hover:bg-gray-500 rounded"
                >
                    Mock Case
                </button>
            </div>

            {generatedCase && (
                <div className="mt-8 border border-white/20 p-4 rounded">
                    <h2 className="text-lg mb-2 underline">Result:</h2>

                    <div className="mb-4">
                        <span className="text-gray-400">Headline:</span>
                        <p className="text-xl text-red-500 font-bold">{generatedCase.headline}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h3 className="text-accent-gold mb-2">Variables Selected:</h3>
                            <pre className="text-xs bg-gray-900 p-2 rounded">
                                {JSON.stringify(generatedCase.variables, null, 2)}
                            </pre>
                        </div>

                        <div>
                            <h3 className="text-accent-gold mb-2">Solution Logic:</h3>
                            <pre className="text-xs bg-gray-900 p-2 rounded">
                                {JSON.stringify(generatedCase.solution, null, 2)}
                            </pre>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
