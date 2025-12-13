# The Editor
> **"La verdad está en los archivos eliminados."**

Bienvenido a **The Editor**, un simulador de periodismo de investigación con estética *noir* y ciberpunk. Asume el papel de un editor en una redacción asediada, donde tu única arma es la información y tu única defensa es la precisión.

![Game Banner](public/assets/banner_placeholder.png)

## 📖 Manual del Investigador

### El Objetivo
Tu misión es simple: **Encontrar la verdad y publicarla antes del cierre**. 
Navega por una interfaz de sistema operativo simulado para recopilar evidencia, interrogar fuentes y redactar la noticia de portada. Pero ten cuidado: la precisión lo es todo. Publicar rumores te costará tu reputación.

### Tu Escritorio (The Hub)
El centro de mando de tu operación.
- **Credencial de Prensa**: En la esquina superior izquierda verás tu progreso. Comienzas como *Pasante* y ganas experiencia (Reputación) resolviendo casos.
- **Selección de Casos**: Los expedientes disponibles aparecen como carpetas en tu escritorio. Debes resolverlos en orden para desbloquear investigaciones de mayor perfil.
- **Nivel de Dificultad**: Puedes elegir entre modo *Novato* (guías activadas) y *Experto* (sin ayudas).

### Herramientas de Trabajo

#### 📱 El Teléfono (The Phone)
Tu conexión con las fuentes humanas.
- **Chats Interactivos**: Habla con testigos, informantes y oficiales.
- **Gestión de Relaciones**: Tus respuestas afectan la disposición de tus contactos. Sé agresivo y se cerrarán; sé demasiado amable y te mentirán.
- **Notificaciones**: Mantente atento a nuevos mensajes que pueden cambiar el curso de la investigación.

#### 💻 La Computadora (The Computer)
El cerebro de la operación.
- **Base de Datos (SearchApp)**: Busca antecedentes, contratos y registros financieros.
- **Editor de Noticias (EditorApp)**: Aquí se ensambla la historia.
    - **Drafting**: Selecciona la evidencia recolectada para responder las preguntas clave (Quién, Qué, Dónde).
    - **Verificación**: Antes de publicar, el sistema evaluará la veracidad de tus fuentes.
    - **Publicación**: Envía la noticia a imprenta. Tu precisión determinará la calidad del reportaje (desde *Fake News* hasta *Periodismo de Excelencia*).

### Sistema de Progresión
Tu carrera avanza con cada éxito:
1.  **Pasante (0 XP)**: Tu punto de partida.
2.  **Reportero Junior (100 XP)**: Has demostrado que puedes encontrar una historia.
3.  **Investigador Senior (300 XP)**: Manejas fuentes complejas y datos duros.
4.  **Editor Jefe (600 XP)**: Tienes el control total de la narrativa.
5.  **Leyenda del Periodismo (1000+ XP)**: Tu nombre es sinónimo de verdad.

---

## 📁 Archivos del Caso (Escenarios)

El juego presenta escenarios inspirados en hechos reales, adaptados con narrativa procedimental. Los nombres, montos y lugares específicos cambian en cada partida (RNG), asegurando que nunca resuelvas el mismo misterio dos veces.

1.  **Caso Juliana (Tutorial)**
    *   *Desaparición / Femicidio*: Una joven desaparece tras un servicio religioso. ¿Fuga voluntaria o crimen oculto?
    *   **Objetivo**: Aprender las mecánicas básicas de recolección de evidencia y empatía con fuentes.

2.  **Caso PROGEN (Crisis Energética)**
    *   *Corrupción Pública*: Motores eléctricos comprados como nuevos resultan ser chatarra vieja.
    *   **Objetivo**: Conectar al Ministro de Energía con la empresa fantasma proveedora.

3.  **Caso Sinohydro (Ina Papers)**
    *   *Lavado de Activos / Sobornos*: Una hidroeléctrica gigante y cuentas secretas en paraísos fiscales.
    *   **Objetivo**: Seguir la ruta del dinero a través de empresas offshore.

4.  **Los 4 de Las Malvinas**
    *   *Crimen de Estado / DDHH*: Cuatro jóvenes detenidos por una unidad de élite nunca llegaron a la estación de policía.
    *   **Objetivo**: Romper el pacto de silencio institucional.

---

## 🛠️ Especificaciones Técnicas

Este proyecto es una **Simulación de UI (User Interface)** construida con tecnologías web modernas. No utiliza un motor de videojuegos tradicional, sino que emula un sistema operativo dentro del navegador.

### Stack Tecnológico
- **Framework**: [Next.js 14](https://nextjs.org/) (React)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS (para la composición rápida de UI compleja)
- **Animaciones**: Framer Motion (transiciones de ventanas y efectos de interfaz)
- **Estado Global**: Zustand (Manejo de inventario, progreso y chats)
- **Lógica de Juego**: Sistema propio de *templates* y *triggers* para la narrativa procedimental.

### Arquitectura
- `/src/data/cases.ts`: El "cerebro" narrativo. Contiene todos los guiones, variables y lógica de solución en una estructura JSON tipada.
- `/src/lib/gameEngine.ts`: El motor que procesa los templates, sustituye variables (e.g., `{CULPABLE}` -> "Carlos Pérez") e inicializa el estado de cada caso.
- `/src/components/game`: Componentes modulares que actúan como "aplicaciones" dentro del juego (`SearchApp`, `ChatApp`, `EditorApp`).

---

## 🚀 Instalación y Desarrollo

### Requisitos
- Node.js 18+
- npm / yarn / pnpm

### Pasos
1.  **Clonar**: `git clone <repo-url>`
2.  **Instalar**: `npm install`
3.  **Ejecutar**: `npm run dev`
4.  **Abrir**: Visita `http://localhost:3000`

---

## � Licencia
Este proyecto es un prototipo educativo/narrativo.
&copy; 2025 The Editor Team.
