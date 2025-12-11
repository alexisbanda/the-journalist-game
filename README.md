# The Editor
> **Juego de Investigación Procedural**

Bienvenido a **The Editor**, una experiencia narrativa inmersiva donde asumes el papel de un investigador periodístico. Desde tu estación de trabajo digital, deberás resolver casos complejos, gestionar fuentes y descubrir la verdad oculta entre líneas.

## 🕵️‍♂️ Sobre el Juego

El juego simula un entorno de sistema operativo donde el jugador interactúa con diferentes herramientas para avanzar en la historia. No es un RPG tradicional de movimiento, sino un simulador de interfaz (UI Simulation) centrado en la narrativa y la deducción.

### Mecánicas Principales

#### 🖥️ El Hub (Centro de Mando)
Tu punto de partida. Desde aquí tienes acceso a las diferentes "pantallas" o dispositivos que utilizas para tu investigación.

#### 📱 El Teléfono (The Phone)
Tu línea directa con el mundo exterior.
- **Sistema de Chat Realista**: Interactúa con contactos clave (testigos, informantes, editores).
- **Diálogos Ramificados**: Tus respuestas importan. Elige cuidadosamente tus palabras para ganar confianza o presionar por información.
- **Gestión de Hilos**: Mantén múltiples conversaciones activas simultáneamente.

#### 💻 La Computadora (The Computer)
Tu herramienta de análisis forense y documental.
- **Sistema de Archivos**: Navega por carpetas y documentos recuperados.
- **Análisis de Pistas**: Examina textos en busca de inconsistencias o datos ocultos.
- **Descifrado**: (Próximamente) Herramientas para desbloquear archivos protegidos.

#### 🗂️ Sistema de Casos (Case Logic)
El corazón del juego.
- **Recolección de Evidencia**: Marca y guarda fragmentos de texto o imágenes que consideres relevantes.
- **Triggers Dinámicos**: Ciertas acciones (abrir un archivo específico, encontrar una palabra clave) pueden desbloquear nuevas opciones de diálogo o eventos en tiempo real.

## 📁 Casos Reales (Ecuador)
El juego incluye escenarios basados en hechos reales de la historia reciente de Ecuador, adaptados con lógica procedimental (nombres y variables cambian en cada partida):

1.  **Caso PROGEN (Crisis Energética)**
    *   **Contexto:** Los misteriosos contratos de emergencia para generadores eléctricos.
    *   **Misión:** Descubrir si los motores son nuevos o chatarra remanufacturada.
    *   **Mecánica Clave:** Interroga al **Ex-Asistente Ministerial** para obtener documentos filtrados.

2.  **Caso Sinohydro (Ina Papers)**
    *   **Contexto:** La trama de corrupción detrás de la hidroeléctrica más grande del país.
    *   **Misión:** Seguir la ruta del dinero desde cuentas offshore en Panamá hasta compras de lujo en Europa.
    *   **Mecánica Clave:** Presiona al **Banquero Privado** para obtener registros de transferencias.

3.  **Los 4 de Las Malvinas (Crimen de Estado)**
    *   **Contexto:** La desaparición de cuatro jóvenes detenidos por fuerzas militares.
    *   **Misión:** Contrastar el parte militar oficial con un reporte forense oculto.
    *   **Mecánica Clave:** Gana la confianza del **Soldado Conscripto** para romper el silencio.

4.  **Caso Juliana (Femicidio/Desaparición)**
    *   **Contexto:** La lucha de una madre por encontrar a su hija, desaparecida tras asistir a una iglesia.
    *   **Misión:** Enfrentar al **Pastor** sospechoso y descubrir la manipulación religiosa detrás del silencio.
    *   **Mecánica Clave:** (Caso Tutorial) Introduce las mecánicas de empatía y recolección de evidencia digital.

## 🛠️ Tecnologías y Mecánicas
Este proyecto utiliza un motor narrativo personalizado sobre Next.js:

- **Sistema de Chat Interactivo**: Ya no es solo leer. Elige tus respuestas para desbloquear pistas o perder fuentes.
- **Narrativa Procedimental**: Los nombres de empresas, sospechosos y montos varían (e.g. `{CULPABLE}`, `{MONTO}`) haciendo cada investigación única.
- **Validación Lógica**: El juego entiende si la evidencia que presentas (texto seleccionado) realmente responde a las preguntas del editor, usando coincidencia flexible (Levenshtein).

---

## 🚀 Instalación y Ejecución

Sigue estos pasos para levantar el proyecto en tu entorno local:

1.  **Clonar el repositorio** (si aún no lo tienes):
    ```bash
    git clone <url-del-repo>
    cd game
    ```

2.  **Instalar dependencias**:
    ```bash
    npm install
    # o si usas yarn/pnpm/bun
    yarn install / pnpm install / bun install
    ```

3.  **Iniciar el servidor de desarrollo**:
    ```bash
    npm run dev
    ```

4.  **Jugar**:
    Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 📂 Estructura del Proyecto

- `src/app`: Rutas y layouts de Next.js.
- `src/components/game`: Vistas de UI (Phone, Computer, Hub).
- `src/data/cases.ts`: **Base de datos de casos**. Aquí se definen los templates, variables y guiones de diálogo.
- `src/lib/gameEngine.ts`: Lógica de generación de casos y sustitución de variables.
- `src/store/gameStore.ts`: Estado global (Zustand).

---

_Creado con ❤️ por el equipo de desarrollo de The Editor._
