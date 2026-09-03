# 🐉 Dragon Ball Z - CRUD de Personajes

> **Proyecto Final - Semana 08: JavaScript, DOM y Asincronía (Frontend Interactive)**  
> **Bootcamp Frontend Python G31 JV • Victor Villazón**

---

## 📌 Descripción

Aplicación web interactiva desarrollada con **HTML5, TailwindCSS, CSS3 personalizado y JavaScript Vanilla**. Implementa un CRUD completo de personajes de Dragon Ball conectándose a **APIBox** para la persistencia asíncrona de datos vía `fetch` y `async/await`.

Permite listar, crear, editar y eliminar personajes, con soporte para autocompletado desde la **Dragon Ball API**, filtrado por raza en tiempo real, búsqueda por nombre, paginación dinámica, control de estados de carga con *skeletons*, notificaciones *toast* y diseño *Dark Mode* temático de Dragon Ball.

---

## 🚀 Características Principales

- ✅ **CRUD Completo con APIBox**:
  - `GET`: Lista todos los personajes de la colección.
  - `POST`: Crea nuevos guerreros con campos obligatorios (`name`, `image`, `race`).
  - `PUT` / `PATCH`: Edita información de guerreros existentes.
  - `DELETE`: Elimina personajes con modal de confirmación.
- ✅ **Asincronía & UX**:
  - Manejo de estados de carga mediante tarjetas *skeleton* pulsantes.
  - Manejo de errores con notificaciones visuales emergentes (*Toast*).
  - Estado vacío (*Empty State*) interactivo con botón de acción rápida.
- ✅ **Búsqueda & Filtros**:
  - Buscador de texto en vivo por nombre.
  - Filtro por Raza (Saiyan, Namekian, Human, Android, Frieza Race, Majin, God, etc.) mediante *dropdown* y *pills* de acceso rápido.
  - Ordenación alfabética (A-Z / Z-A) y por raza.
- ✅ **Paginación Dinámica**:
  - Navegación entre páginas (Anterior, Siguiente y números de página).
  - Selector de cantidad de elementos por página (6, 8, 12, 24).
- ✅ **Sugerencias de Dragon Ball API**:
  - Selector de autocompletado en el formulario para cargar datos de personajes oficiales (Goku, Vegeta, Piccolo, Bulma, Freezer, Cell, Gohan, etc.) sin tener que escribir URLs manualmente.
- ✅ **Configuración de Endpoint APIBox**:
  - Modal para cambiar la URL del endpoint en tiempo de ejecución (guardado en `localStorage`).
- ✅ **Estética Visual Premium**:
  - Efectos de aura de Ki, glassmorphism, *badges* estilizados por raza y responsive design para móviles, tablets y desktop.

---

## 📦 Estructura del JSON (APIBox)

Cada personaje se almacena con la siguiente estructura requerida:

```json
{
  "name": "Goku",
  "image": "https://dragonball-api.com/characters/goku_normal.webp",
  "race": "Saiyan"
}
```

### Campos Obligatorios
- `name`: Nombre del personaje (String).
- `image`: URL de la imagen del personaje (String / URL).
- `race`: Raza del personaje (Saiyan, Namekian, Human, Android, Frieza Race, etc.).

---

## 📂 Estructura de Archivos

```
semana08/proyecto-dragonball-crud/
├── index.html           # Estructura semántica, modales, grids y paginación
├── estilos.css          # Estilos personalizados, efectos de aura, badges y toasts
├── main.js              # Lógica del CRUD, Fetch, Async/Await, DOM y filtros
├── dragonball-api.http  # Archivo para pruebas de API con REST Client
└── README.md            # Documentación del proyecto
```

---

## 🌐 Cómo Probar Localmente

1. Abre el archivo `index.html` en tu navegador favorito o usando la extensión **Live Server** de VS Code.
2. Si la colección de APIBox está vacía, haz clic en **"Cargar Guerreros Z"** en la barra superior para importar los personajes iniciales oficiales.
3. Puedes hacer clic en **"API Endpoint"** si deseas conectar tu propia cuenta y colección creada en [apibox.vercel.app](https://apibox.vercel.app/).

---

## ☁️ Instrucciones para Desplegar en Netlify Drop

1. Ve a [Netlify Drop](https://app.netlify.com/drop).
2. Inicia sesión con tu cuenta de Netlify o GitHub.
3. Arrastra la carpeta `proyecto-dragonball-crud` al área indicada en Netlify.
4. ¡Listo! Obtendrás una URL pública inmediata (ejemplo: `https://dragonball-crud-g31.netlify.app`) lista para entregar en Discord en `#semana-08`.

---

## 🛠️ Tecnologías Utilizadas

- **HTML5 Semántico**
- **CSS3 & Tailwind CSS**
- **JavaScript Moderno (ES6+)**: `async/await`, `fetch`, Promesas, Manipulación del DOM, `localStorage`.
- **APIBox**: Backend as a Service para persistencia JSON.
- **Dragon Ball API**: Referencia de personajes e imágenes oficiales.
