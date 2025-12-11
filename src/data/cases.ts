import { CaseTemplate } from "@/types/game";

export const CASES: CaseTemplate[] = [
    // CASE 1: POLITICS (Caso PROGEN - Crisis Energética)
    {
        id: "case_progen_01",
        difficulty: "easy",
        headline_template: "APAGONES: LA ESTAFA DE LOS {EQUIPO} FANTASMA",
        variables_pool: {
            INSTITUCION: ["CELEC EP", "Min. Energía", "La Presidencia"],
            CULPABLE: ["Ministro R. Luque", "Asesor F. Wong", "Gerente CELEC"],
            EQUIPO: ["generadores", "motores", "turbinas"],
            EMPRESA: ["Progen Ind.", "TurboEnergy", "GeneraCorp"],
            MONTO: ["$149 Millones", "$50 Millones", "$200 Millones"],
            FALLA: ["motores viejos", "equipos remanufacturados", "sobreprecio"],
            EVIDENCIA: ["contrato filtrado", "informe técnico", "audio de soborno"]
        },
        solution_logic: {
            "Culpable": "CULPABLE",
            "Falla Oculta": "FALLA",
            "Empresa Fantasma": "EMPRESA"
        },
        documents_templates: [
            {
                id: "doc_contrato",
                title_template: "Contrato de Emergencia - {EMPRESA}",
                content_template: "CONFIDENCIAL\n\nSe autoriza el pago de un anticipo del 70% ({MONTO}) a {EMPRESA} sin garantías de ejecución.\nFirma autorizante: {CULPABLE}.",
                tags_template: ["Finanzas", "{CULPABLE}", "Corrupción"]
            },
            {
                id: "doc_tecnico",
                title_template: "Informe Técnico de Arribo",
                content_template: "ALERTA: Los {EQUIPO} recibidos no son nuevos. Las placas de fabricación datan de 2015 y son {FALLA}. No pueden sincronizarse con la red nacional.",
                tags_template: ["Técnico", "Fraude", "{EQUIPO}"]
            }
        ],
        chat_templates: [
            {
                id: "chat_ingeniero",
                contactName: "Ingeniero de Planta",
                initial_messages: [
                    { sender: 'contact', content_template: "No podemos encender los equipos.", delay: 1 },
                    { sender: 'contact', content_template: "Esos {EQUIPO} son chatarra pintada.", delay: 3 },
                    { sender: 'contact', content_template: "{CULPABLE} nos ordenó callar y firmar el acta de entrega.", delay: 6 }
                ]
            },
            {
                id: "chat_periodista",
                contactName: "Periodista Energético",
                initial_messages: [
                    { sender: 'contact', content_template: "Tengo los pliegos del contrato.", delay: 1 },
                    { sender: 'contact', content_template: "El anticipo se pagó en cuentas de paraísos fiscales.", delay: 4 },
                    { sender: 'contact', content_template: "¿Por qué contratan a {EMPRESA} si no tienen experiencia?", delay: 7 }
                ]
            },
            {
                id: "chat_asistente",
                contactName: "Ex-Asistente Ministerial",
                initial_messages: [],
                initial_node_id: "asistente_start"
            }
        ],
        dialogue_script: {
            "asistente_start": {
                text: "No debería estar escribiendo esto. Si saben que hablé, mi carrera termina.",
                choices: [
                    { text: "Entiendo el riesgo. Tu fuente es anónima con nosotros.", next_node: "asistente_trust" },
                    { text: "Necesito las actas de esa reunión con {EMPRESA}.", next_node: "asistente_scared" }
                ]
            },
            "asistente_scared": {
                text: "No puedo darte documentos... es demasiado peligroso. Olvida que escribí.",
                choices: [] // Dead end
            },
            "asistente_trust": {
                text: "Gracias. La presión era insoportable. {CULPABLE} gritaba que 'tenía que salir hoy' sin revisar los informes.",
                choices: [
                    { text: "¿Quién más estaba en esa reunión?", next_node: "asistente_reveal" }
                ]
            },
            "asistente_reveal": {
                text: "Solo ellos y los lobistas de {EMPRESA}. No hubo testigos técnicos. Por eso el Informe Técnico posterior es falso.",
                unlocks_clue: "doc_tecnico",
                choices: [
                    { text: "Eso explica todo. Gracias.", next_node: "asistente_end" }
                ]
            },
            "asistente_end": { text: "Ten cuidado.", choices: [] }
        }
    },

    // CASE 2: CORPORATE (Caso Sinohydro - Ina Papers)
    {
        id: "case_sinohydro_01",
        difficulty: "medium",
        headline_template: "INA PAPERS: LA RUTA DEL SOBORNO EN {OBRA}",
        variables_pool: {
            PERSONAJE: ["Lenin M.", "El Licenciado", "Cai Runguo"],
            OFFSHORE: ["Ina Investment", "Recor Sa", "Spirit Ltd"],
            OBRA: ["Coca Codo Sinclair", "Toachi Pilatón", "Sopladora"],
            OBJETO: ["Muebles Suizos", "Departamento en España", "Colección de Arte"],
            EMPRESA: ["Sinohydro", "China Corp", "HydroGlobal"]
        },
        solution_logic: {
            "Beneficiario Final": "PERSONAJE",
            "Empresa Offshore": "OFFSHORE",
            "Objeto de Lujo": "OBJETO"
        },
        documents_templates: [
            {
                id: "doc_bank",
                title_template: "Transferencia Internacional - Panamá",
                content_template: "Origen: {EMPRESA}.\nDestino: {OFFSHORE} (Cuenta cifrada).\nConcepto: 'Consultorías Varias'.\nMonto: $100,000 USD.",
                tags_template: ["Banco", "{OFFSHORE}", "Lavado"]
            },
            {
                id: "doc_factura",
                title_template: "Factura de Compra - Europa",
                content_template: "Cliente: {OFFSHORE}\nDetalle: Compra de {OBJETO} con entrega en domicilio de la hija de {PERSONAJE}.",
                tags_template: ["Compras", "{PERSONAJE}", "Lujos"]
            }
        ],
        chat_templates: [
            {
                id: "chat_activista",
                contactName: "F. Villavicencio (Archivo)",
                initial_messages: [
                    { sender: 'contact', content_template: "Sigue la ruta del dinero.", delay: 1 },
                    { sender: 'contact', content_template: "{EMPRESA} pagó a {OFFSHORE}, no a los contratistas.", delay: 3 },
                    { sender: 'contact', content_template: "¿De dónde sacó {PERSONAJE} dinero para {OBJETO}?", delay: 6 }
                ]
            },
            {
                id: "chat_banquero",
                contactName: "Banquero Privado",
                initial_messages: [],
                initial_node_id: "banquero_start"
            },
            {
                id: "chat_vendedora",
                contactName: "Vendedora de Arte",
                initial_messages: [
                    { sender: 'contact', content_template: "Vendí una colección completa la semana pasada.", delay: 1 },
                    { sender: 'contact', content_template: "El pago vino de una empresa rara, {OFFSHORE}.", delay: 4 },
                    { sender: 'contact', content_template: "Enviamos todo a la casa de {PERSONAJE}.", delay: 6 }
                ]
            }
        ],
        dialogue_script: {
            "banquero_start": {
                text: "Sr. Periodista. La confidencialidad es la base de nuestro negocio.",
                choices: [
                    { text: "No si el dinero viene de sobornos. La justicia podría incautar todo.", next_node: "banquero_fear" },
                    { text: "Solo quiero confirmar una transacción de {OFFSHORE}.", next_node: "banquero_deny" }
                ]
            },
            "banquero_deny": {
                text: "No puedo confirmar ni negar la existencia de clientes. Buenos días.",
                choices: []
            },
            "banquero_fear": {
                text: "Mire.. no quiero problemas. Esas cuentas de {OFFSHORE} siempre me parecieron irregulares.",
                choices: [
                    { text: "¿A dónde fue el dinero?", next_node: "banquero_info" }
                ]
            },
            "banquero_info": {
                text: "Hubo transferencias grandes a Suiza y compras de arte... pero lo más descarado fue la factura de {OBJETO}.",
                unlocks_clue: "doc_bank",
                choices: [
                    { text: "¿Tiene el registro?", next_node: "banquero_end" }
                ]
            },
            "banquero_end": { text: "Le enviaré la copia de la transferencia. Borre mi número.", choices: [] }
        }
    },

    // CASE 3: CRIME (Los 4 de las Malvinas - Crimen de Estado)
    {
        id: "case_malvinas_01",
        difficulty: "hard",
        headline_template: "LOS 4 DE LAS MALVINAS: ¿DÓNDE ESTÁN LOS CHICOS?",
        variables_pool: {
            VICTIMAS: ["Los 4 de Malvinas", "Jóvenes de Guasmo", "Hermanos Arroyo"],
            FUERZA: ["Comando Naval", "Fuerza de Tarea", "Policía"],
            LUGAR: ["Base Naval", "Hacienda Taura", "Estero Salado"],
            EVIDENCIA: ["bitácora borrada", "video de seguridad", "testimonio de soldado"],
            OFICIAL: ["Capitán 'Sombra'", "Teniente A.", "Comandante Zona 8"]
        },
        solution_logic: {
            "Responsable": "FUERZA",
            "Lugar del Hallazgo": "LUGAR",
            "Prueba Clave": "EVIDENCIA"
        },
        documents_templates: [
            {
                id: "doc_parte",
                title_template: "Parte Militar Oficial",
                content_template: "Operativo en el sector Malvinas finalizado sin novedades.\nLos detenidos fueron liberados tras verificación de antecedentes.\nFirma: {OFICIAL}.",
                tags_template: ["Militar", "Oficial", "Mentira"]
            },
            {
                id: "doc_forense",
                title_template: "Reporte de Autopsia Reservado",
                content_template: "Cuerpos hallados en {LUGAR}.\nSignos de tortura severa y quemaduras post-mortem.\nNo coinciden con un ajuste de cuentas de bandas, hay indicios de botas militares.",
                tags_template: ["Forense", "{LUGAR}", "Tortura"]
            }
        ],
        chat_templates: [
            {
                id: "chat_madre",
                contactName: "Madre Desesperada",
                initial_messages: [
                    { sender: 'contact', content_template: "Se los llevaron vivos, los queremos vivos.", delay: 1 },
                    { sender: 'contact', content_template: "Los vecinos vieron al camión de {FUERZA} llevárselos.", delay: 3 },
                    { sender: 'contact', content_template: "Dicen que los soltaron, pero apareció una {EVIDENCIA}.", delay: 6 }
                ]
            },
            {
                id: "chat_soldado",
                contactName: "Soldado Conscripto",
                initial_messages: [],
                initial_node_id: "soldado_start"
            },
            {
                id: "chat_fiscal",
                contactName: "Fiscal de DDHH",
                initial_messages: [
                    { sender: 'contact', content_template: "No me dejan entrar a la base.", delay: 1 },
                    { sender: 'contact', content_template: "Hay una orden de silencio desde el mando.", delay: 4 },
                    { sender: 'contact', content_template: "Ese reporte forense sobre {EVIDENCIA} es clave.", delay: 7 }
                ]
            }
        ],
        dialogue_script: {
            "soldado_start": {
                text: "No puedo dormir. Cierro los ojos y los veo ahí... en el camión.",
                choices: [
                    { text: "Lo que viste no es tu culpa. Ayúdanos a encontrar a los responsables.", next_node: "soldado_empathy" },
                    { text: "Dime nombres. ¡Ahora!", next_node: "soldado_panic" }
                ]
            },
            "soldado_panic": {
                text: "¡No! Ellos saben dónde vivo. ¡No me vuelva a escribir!",
                choices: []
            },
            "soldado_empathy": {
                text: "El {OFICIAL} dijo que eran terroristas... pero eran niños. Solo niños del barrio.",
                choices: [
                    { text: "¿Qué pasó en {LUGAR}?", next_node: "soldado_truth" }
                ]
            },
            "soldado_truth": {
                text: "No los soltaron. Los llevaron a la zona de tiro. El parte oficial miente. Esa {EVIDENCIA} que encontraron... es real.",
                unlocks_clue: "doc_forense",
                choices: [
                    { text: "Tu testimonio hará justicia.", next_node: "soldado_end" }
                ]
            },
            "soldado_end": { text: "Que Dios me perdone por no hacer nada.", choices: [] }
        }
    },

    // CASE 4: JULIANA (Narrative Tutorial)
    {
        id: "case_juliana_01",
        difficulty: "medium",
        headline_template: "DESAPARICIÓN EN LA BILOXI: EL CASO JULIANA",
        variables_pool: {
            VICTIMA: ["Juliana Campoverde"],
            LUGAR: ["Gasolinera La Biloxi"],
            SOSPECHOSO: ["Pastor Jonathan Carrillo"],
            FECHA: ["7 de julio de 2012"],
            ORGANIZACION: ["Luz del Mundo"],
            FRASE_CLAVE: ["Dios te está probando"],
            PISTA_CLAVE: ["Expediente Fiscal"]
        },
        solution_logic: {
            "Principal Sospechoso": "SOSPECHOSO",
            "Lugar de Desaparición": "LUGAR",
            "Fecha del Suceso": "FECHA",
            "Organización / Secta": "ORGANIZACION",
            "Mensaje de Manipulación": "FRASE_CLAVE"
        },
        documents_templates: [
            {
                id: "doc_expediente",
                title_template: "Expediente Fiscal #2012-099",
                content_template: "DENUNCIA DE DESAPARICIÓN\nFecha del Reporte: 8 de Julio 2012.\nFecha de Desaparición: {FECHA}.\nLugar señalado: {LUGAR}.\nInconsistencias: El {SOSPECHOSO} afirmó no haberla visto, pero registros telefónicos lo ubican en la zona.",
                tags_template: ["Expediente", "{SOSPECHOSO}", "{LUGAR}"]
            },
            {
                id: "doc_mensajes",
                title_template: "Log Mensajes Facebook (Recuperado)",
                content_template: "Usuario 'Jonathan': 'Borra todo. Crea un perfil nuevo con otro nombre. Dios te está probando'.\nUsuario 'Juliana': 'Tengo miedo, pastor. No quiero mentirle a mi mamá'.\n(Fecha del log: Semanas antes de la desaparición).",
                tags_template: ["Facebook", "Cibercrimen", "{SOSPECHOSO}"]
            },
            {
                id: "doc_iglesia",
                title_template: "Boletín Iglesia 'Luz del Mundo'",
                content_template: "El {SOSPECHOSO} invita a los jóvenes a un retiro espiritual secreto. 'Dejad todo y seguidme'.\nSe requiere discreción absoluta.",
                tags_template: ["Iglesia", "Secta", "Jóvenes"]
            }
        ],
        chat_templates: [
            {
                id: "chat_elizabeth",
                contactName: "Elizabeth R. (Madre)",
                initial_messages: [],
                initial_node_id: "elizabeth_start"
            },
            {
                id: "chat_fiscalia",
                contactName: "Fiscalía General",
                initial_messages: [],
                initial_node_id: "fiscal_start"
            },
            {
                id: "chat_testigo",
                contactName: "Testigo Anónimo",
                initial_messages: [],
                initial_node_id: "testigo_start"
            }
        ],
        dialogue_script: {
            // --- ELIZABETH THREAD ---
            "elizabeth_start": {
                text: "Nuevo contacto: Elizabeth R. (Madre)",
                choices: [
                    { text: "Sra. Elizabeth, soy del diario. Queremos contar la verdad.", next_node: "eliz_1_empathy", stats: { access: 10 } },
                    { text: "Hola, necesito confirmar datos para una nota.", next_node: "eliz_1_direct", stats: { access: -5 } }
                ]
            },
            "eliz_1_empathy": {
                text: "Han pasado años y todavía no sé nada de mi hija Juliana. Tenía solo 18 años cuando se la llevaron...",
                choices: [
                    { text: "¿Recuerda exactamente dónde fue la última vez que la vio?", next_node: "eliz_2_location" },
                    { text: "¿Qué opina de la investigación policial?", next_node: "eliz_2_police" }
                ]
            },
            "eliz_1_direct": {
                text: "Han venido muchos periodistas y se han ido. Solo quiero encontrar a mi hija. Tenía 18 años.",
                choices: [
                    { text: "¿Dónde la vio por última vez?", next_node: "eliz_2_location" },
                    { text: "¿Algún sospechoso en mente?", next_node: "eliz_3_suspect" }
                ]
            },
            "eliz_2_location": {
                text: "Fue el 7 de julio de 2012. En la gasolinera de La Biloxi. Ella dijo 'Te veo en la noche'. Nunca regresó.",
                choices: [
                    { text: "¿Había alguien acosándola?", next_node: "eliz_3_reveal" },
                    { text: "¿Algún comportamiento extraño?", next_node: "eliz_3_facebook" }
                ]
            },
            "eliz_2_police": {
                text: "Dijeron que se fue con el novio. ¡Mentira! Ella era una chica de casa. Perdieron tiempo valioso.",
                choices: [
                    { text: "¿Quién cree que es el responsable?", next_node: "eliz_3_reveal" }
                ]
            },
            "eliz_3_reveal": {
                text: "Fue el Pastor Jonathan Carrillo. Él la presionaba en la iglesia 'Luz del Mundo'. La Fiscalía tiene el expediente pero no hacen nada.",
                choices: [
                    { text: "Hablaré con la Fiscalía. ¿Tiene el número de caso?", next_node: "eliz_4_done" }
                ]
            },
            "eliz_3_facebook": {
                text: "El pastor la obligaba a borrar sus mensajes. Decía que era 'por Dios'.",
                unlocks_clue: "doc_mensajes",
                choices: [
                    { text: "Esto es coerción. Lo añadiré a la evidencia.", next_node: "eliz_4_done" }
                ]
            },
            "eliz_3_suspect": {
                text: "El Pastor Jonathan Carrillo. Él es el culpable.",
                choices: [{ text: "Entendido.", next_node: "eliz_4_done" }]
            },
            "eliz_4_done": {
                text: "Por favor, que no quede impune. Busque al Testigo Anónimo también, él sabe cosas de la iglesia.",
                choices: []
            },

            // --- FISCALIA THREAD (Hard/Cold) ---
            "fiscal_start": {
                text: "Sistema Automático de Fiscalía General. Identifíquese.",
                choices: [
                    { text: "Soy periodista de The Morning Chronicle.", next_node: "fiscal_1_id" },
                    { text: "Quiero reportar un crimen.", next_node: "fiscal_1_wrong" }
                ]
            },
            "fiscal_1_wrong": {
                text: "Esta línea es para consultas administrativas. Llame al 911.",
                choices: []
            },
            "fiscal_1_id": {
                text: "Credenciales verificadas. ¿Qué solicita?",
                choices: [
                    { text: "Acceso al Caso Campoverde.", next_node: "fiscal_2_denied" },
                    { text: "Expediente Fiscal #2012-099.", next_node: "fiscal_2_grant" } // Needs info from Elizabeth
                ]
            },
            "fiscal_2_denied": {
                text: "Solicitud denegada. Necesita el número de expediente específico.",
                choices: []
            },
            "fiscal_2_grant": {
                text: "Expediente #2012-099 localizado. Estado: Abierto. Enviando copia digital...",
                unlocks_clue: "doc_expediente",
                choices: [
                    { text: "Recibido.", next_node: "fiscal_end" }
                ]
            },
            "fiscal_end": { text: "Transmisión finalizada.", choices: [] },

            // --- TESTIGO THREAD (Scared) ---
            "testigo_start": {
                text: "No debería estar hablando contigo. Si el Pastor se entera...",
                choices: [
                    { text: "Tu identidad está protegida. Solo quiero la verdad sobre 'Luz del Mundo'.", next_node: "testigo_1_trust" },
                    { text: "¿Qué sabes de Jonathan Carrillo?", next_node: "testigo_1_scare" }
                ]
            },
            "testigo_1_scare": {
                text: "No... no puedo. Él lo ve todo.",
                choices: [] // Blocked
            },
            "testigo_1_trust": {
                text: "Ese lugar no es una iglesia. Es una cárcel. Hacen 'retiros' donde te quitan el celular.",
                choices: [
                    { text: "¿Tienes pruebas?", next_node: "testigo_2_proof" }
                ]
            },
            "testigo_2_proof": {
                text: "Tengo un boletín viejo. Lo guardé antes de salir. Te lo paso, pero no digas quién te lo dio.",
                unlocks_clue: "doc_iglesia",
                choices: [
                    { text: "Gracias. Lo usaré con cuidado.", next_node: "testigo_end" }
                ]
            },
            "testigo_end": { text: "Cuídate.", choices: [] }

        },
        triggers: {
            onOpenDocument: {
                "doc_expediente": "¡Ese es! Fíjate en la fecha del reporte... y quién firma. Te dije que Jonathan estaba ahí.",
                "doc_mensajes": "Esos mensajes me parten el alma. 'Dios te está probando'... así la manipulaba para que no me contara nada."
            }
        }
    }
];
