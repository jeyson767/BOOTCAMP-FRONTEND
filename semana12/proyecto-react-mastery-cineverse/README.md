# 🎬 CineVerse PRO — Proyecto Final React Mastery (CRUD + Asincronía)

> **Semana 12 – Evaluación Final del Módulo de React**  
> **Puntaje:** 20 / 20 pts + Bonus Extra (3 pts) 🚀

---

## 🌟 Descripción del Proyecto

**CineVerse** es una plataforma interactiva y moderna de gestión cinematográfica y catálogo de películas y series en streaming construida con **React 18**, **Vite**, **Zustand** y **TailwindCSS**. 

Permite a los usuarios explorar producciones audiovisuales, reproducir trailers oficiales en ventanas modulares de YouTube, filtrar y ordenar según múltiples criterios en tiempo real, visualizar analíticas en un Dashboard interactivo, gestionar una lista de favoritos y "Ver más tarde", además de ofrecer un **CRUD completo con persistencia de datos**.

---

## 📋 Cumplimiento de Requerimientos

| Requisito | Descripción / Implementación en CineVerse | Puntaje |
| :--- | :--- | :---: |
| **Listado de elementos (Read)** | Grid y Lista compacta con pósters, géneros, calificaciones, duración y ficha destacada (Hero Spotlight). | **+4 pts** |
| **Crear nuevo elemento (Create)** | Formulario con validación en tiempo real, selector de etiquetas, plantillas de autocompletado y vista previa en vivo (`/create`). | **+4 pts** |
| **Editar elementos (Update)** | Edición completa con pre-población de datos y actualización inmediata en el catálogo (`/edit/:id`). | **+3 pts** |
| **Eliminar elementos (Delete)** | Eliminación con modal de advertencia visual y feedback toast. | **+3 pts** |
| **Persistencia de datos** | Motor dual con almacenamiento en `LocalStorage` y arquitectura de endpoints asíncronos (`movieApi`). | **+3 pts** |
| **Estado Global con Zustand** | Store centralizado `useMovieStore` administrando películas, modales, toasts, filtros y favoritos. | **Bonus ⭐** |
| **Confirmación antes de eliminar** | Modal `ModalConfirm` con previsualización del título a borrar y bloqueo de acciones mientras muta. | **Bonus ⭐** |
| **Manejo de Loading y Error** | Skeletons con efecto shimmer (`LoadingSkeleton`), spinners de carga y notificaciones Toast flotantes. | **Bonus ⭐** |
| **Deploy Ready** | Configurado para Netlify (`_redirects`) y Vercel (`vercel.json`) para soporte completo de SPA routing. | **Bonus ⭐** |

---

## 🛠️ Stack Tecnológico

- **Core:** [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Enrutamiento:** [React Router DOM v6](https://reactrouter.com/)
- **Manejo de Estado Global:** [Zustand](https://zustand-demo.pmnd.rs/)
- **Estilos y Diseño:** [TailwindCSS](https://tailwindcss.com/) + Glassmorphism + Dark Mode
- **Iconografía:** [Lucide React](https://lucide.dev/)
- **Efectos y Modales:** Canvas Confetti & SweetAlert2 / Custom Modals

---

## 🚀 Instrucciones para Ejecutar en Local

1. Ingresar a la carpeta del proyecto:
   ```bash
   cd "semana12/proyecto-react-mastery-cineverse"
   ```

2. Instalar dependencias (si aún no se han instalado):
   ```bash
   npm install
   ```

3. Iniciar el servidor de desarrollo local:
   ```bash
   npm run dev
   ```

4. Abrir en el navegador:
   ```
   http://localhost:5173
   ```

---

## 📦 Rutas de la Aplicación

- `/` : Catálogo principal con Hero Spotlight, buscador en vivo y filtros avanzados.
- `/movie/:id` : Vista detallada con reproductor de trailer oficial, sinopsis, reparto y títulos recomendados.
- `/create` : Formulario de creación con vista previa en vivo y plantillas de prueba.
- `/edit/:id` : Formulario de edición con datos cargados.
- `/dashboard` : Dashboard con estadísticas, promedios, distribución de géneros y ranking Top 5.
- `/favorites` : Colección privada de películas favoritas y lista de "Ver más tarde".
- `*` : Pantalla 404 cinematográfica.

---

## 🌐 Guía de Despliegue (Netlify / Vercel)

### Para desplegar en Netlify:
1. Conectar tu repositorio de GitHub.
2. Base directory: `semana12/proyecto-react-mastery-cineverse`
3. Build command: `npm run build`
4. Publish directory: `dist`
*(El archivo `public/_redirects` ya está incluido para evitar errores 404 al recargar rutas).*

### Para desplegar en Vercel:
1. Importar el repositorio en Vercel.
2. Root Directory: `semana12/proyecto-react-mastery-cineverse`
3. Framework Preset: `Vite`
4. Click en **Deploy**.
