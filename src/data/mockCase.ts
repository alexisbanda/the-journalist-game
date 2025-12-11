import { CaseTemplate } from "@/types/game";

export const MOCK_CASE: CaseTemplate = {
    id: "case_001",
    difficulty: "easy",
    headline_template: "FRAUDE EN {INSTITUCION}",
    variables_pool: {
        INSTITUCION: ["Hospital General", "Escuela Nº5", "Ayuntamiento"],
        CULPABLE: ["Director Pérez", "Dra. Gomez", "Concejal Ruiz"],
        MONTO: ["$50k", "$1M", "$500"],
        EVIDENCIA_CLAVE: ["Factura #99", "Audio filtrado", "Foto borrosa"]
    },
    solution_logic: {
        q1_target: "CULPABLE",
        q2_target: "MONTO"
    },
    documents_templates: [
        {
            id: "doc_1",
            title_template: "Informe de Gastos - {INSTITUCION}",
            content_template: "Se hallaron irregularidades por un total de {MONTO} en la cuenta administrada por {CULPABLE}.",
            tags_template: ["{CULPABLE}", "Finanzas", "Fraude"]
        }
    ],
    chat_templates: [
        {
            id: "chat_1",
            contactName: "Informante X",
            initial_messages: [
                { sender: 'contact', content_template: "Tengo info sobre {INSTITUCION}.", delay: 0 },
                { sender: 'contact', content_template: "¿Sabes quién es {CULPABLE}?", delay: 2 }
            ]
        }
    ]
};
