/**
 * ====================================================================
 * Dragon Ball CRUD - JavaScript Vanilla (Maratón G31 - 2026)
 * Bootcamp Frontend Python G31 JV • Victor Villazón
 * Consumo directo de Dragon Ball API: https://dragonball-api.com/api/characters
 * ====================================================================
 */

// --------------------------------------------------------------------
// 1. CONSTANTES Y ENDPOINT DE LA API
// --------------------------------------------------------------------
const API_URL = 'https://dragonball-api.com/api/characters?limit=50'
const STORAGE_KEY = 'DRAGON_BALL_CHARACTERS_DATA'

// --------------------------------------------------------------------
// 2. ESTADO GLOBAL
// --------------------------------------------------------------------
const estado = {
  personajes: [],
  paginaActual: 1,
  porPagina: 5, // 5 personajes por página (como en la referencia)
  editandoId: null,
  cargando: false
}

// --------------------------------------------------------------------
// 3. REFERENCIAS DEL DOM
// --------------------------------------------------------------------
const DOM = {
  contadorPersonajes: document.querySelector('#contadorPersonajes'),
  loading: document.querySelector('#loading'),
  listaPersonajes: document.querySelector('#listaPersonajes'),
  estadoVacio: document.querySelector('#estadoVacio'),

  // Paginación
  paginacionContenedor: document.querySelector('#paginacionContenedor'),
  btnPrimera: document.querySelector('#btnPrimera'),
  btnAnterior: document.querySelector('#btnAnterior'),
  btnSiguiente: document.querySelector('#btnSiguiente'),
  btnUltima: document.querySelector('#btnUltima'),
  paginasNumeros: document.querySelector('#paginasNumeros'),

  // Formulario
  formPersonaje: document.querySelector('#formPersonaje'),
  tituloForm: document.querySelector('#tituloForm'),
  badgeModoEdicion: document.querySelector('#badgeModoEdicion'),
  iconForm: document.querySelector('#iconForm'),
  inputId: document.querySelector('#inputId'),
  inputNombre: document.querySelector('#inputNombre'),
  inputImagen: document.querySelector('#inputImagen'),
  inputRaza: document.querySelector('#inputRaza'),
  selectGenero: document.querySelector('#selectGenero'),
  imgPreview: document.querySelector('#imgPreview'),
  btnSubmit: document.querySelector('#btnSubmit'),
  btnSubmitTexto: document.querySelector('#btnSubmitTexto'),
  btnSubmitIcon: document.querySelector('#btnSubmitIcon'),
  btnCancelarEdicion: document.querySelector('#btnCancelarEdicion'),
  errorNombre: document.querySelector('#errorNombre'),
  errorImagen: document.querySelector('#errorImagen'),
  errorRaza: document.querySelector('#errorRaza'),

  // Toasts
  toastContainer: document.querySelector('#toastContainer')
}

// --------------------------------------------------------------------
// 4. CONSUMO DE API Y PERSISTENCIA
// --------------------------------------------------------------------

/**
 * Carga los personajes directamente desde https://dragonball-api.com/api/characters
 */
async function cargarPersonajes() {
  // 1. Si ya tenemos datos guardados en LocalStorage (por ediciones/agregados previos), usarlos
  const guardados = localStorage.getItem(STORAGE_KEY)
  if (guardados) {
    try {
      const data = JSON.parse(guardados)
      if (Array.isArray(data) && data.length > 0) {
        estado.personajes = data
        renderizarLista()
        renderizarPaginacion()
        actualizarContador()
        return
      }
    } catch (e) {
      console.warn('Error al leer caché local:', e)
    }
  }

  // 2. Si es la primera vez, consultar la API oficial de Dragon Ball
  mostrarCargando(true)

  try {
    const respuesta = await fetch(API_URL)

    if (!respuesta.ok) {
      throw new Error(`Error ${respuesta.status}: No se pudo obtener la lista de personajes`)
    }

    const data = await respuesta.json()
    const lista = data.items || data || []

    // Mapear los campos requeridos
    estado.personajes = lista.map((p, index) => ({
      id: p.id || `char-${index + 1}`,
      name: p.name || 'Sin Nombre',
      image: p.image || 'https://dragonball-api.com/characters/goku_normal.webp',
      race: p.race || 'Saiyan',
      gender: p.gender || 'Male'
    }))

    guardarEnLocalStorage(estado.personajes)
    renderizarLista()
    renderizarPaginacion()
    actualizarContador()

  } catch (error) {
    console.error('Error al cargar personajes desde Dragon Ball API:', error)
    mostrarToast(`Error al cargar datos: ${error.message}`, 'error')
  } finally {
    mostrarCargando(false)
  }
}

/**
 * Agrega un nuevo personaje al inicio de la lista
 */
function agregarPersonaje(datos) {
  const nuevo = {
    id: `db-${Date.now()}`,
    name: datos.name,
    image: datos.image,
    race: datos.race,
    gender: datos.gender || 'Male'
  }

  estado.personajes.unshift(nuevo)
  guardarEnLocalStorage(estado.personajes)
  estado.paginaActual = 1
  renderizarLista()
  renderizarPaginacion()
  actualizarContador()
  mostrarToast(`"${nuevo.name}" agregado con éxito.`, 'success')
}

/**
 * Actualiza un personaje existente
 */
function modificarPersonaje(id, datos) {
  const index = estado.personajes.findIndex(p => String(p.id) === String(id))
  if (index !== -1) {
    estado.personajes[index] = {
      ...estado.personajes[index],
      name: datos.name,
      image: datos.image,
      race: datos.race,
      gender: datos.gender || 'Male'
    }

    guardarEnLocalStorage(estado.personajes)
    renderizarLista()
    renderizarPaginacion()
    actualizarContador()
    mostrarToast(`"${datos.name}" actualizado correctamente.`, 'success')
  }
}

/**
 * Elimina un personaje por su ID
 */
function borrarPersonaje(id) {
  estado.personajes = estado.personajes.filter(p => String(p.id) !== String(id))
  guardarEnLocalStorage(estado.personajes)

  // Ajustar página si la última quedó vacía
  const totalPags = Math.ceil(estado.personajes.length / estado.porPagina) || 1
  if (estado.paginaActual > totalPags) {
    estado.paginaActual = totalPags
  }

  renderizarLista()
  renderizarPaginacion()
  actualizarContador()
  mostrarToast('Personaje eliminado.', 'success')
}

function guardarEnLocalStorage(lista) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lista))
  } catch (e) {
    console.warn('No se pudo guardar en LocalStorage:', e)
  }
}

// --------------------------------------------------------------------
// 5. RENDERIZADO DEL DOM Y PAGINACIÓN
// --------------------------------------------------------------------

function mostrarCargando(activo) {
  estado.cargando = activo
  if (activo) {
    DOM.loading.classList.remove('hidden')
    DOM.listaPersonajes.classList.add('hidden')
    DOM.estadoVacio.classList.add('hidden')
  } else {
    DOM.loading.classList.add('hidden')
  }
}

function renderizarLista() {
  DOM.listaPersonajes.innerHTML = ''

  if (estado.personajes.length === 0) {
    DOM.listaPersonajes.classList.add('hidden')
    DOM.estadoVacio.classList.remove('hidden')
    return
  }

  DOM.estadoVacio.classList.add('hidden')
  DOM.listaPersonajes.classList.remove('hidden')

  // Obtener los 5 personajes de la página actual
  const inicio = (estado.paginaActual - 1) * estado.porPagina
  const fin = inicio + estado.porPagina
  const itemsPagina = estado.personajes.slice(inicio, fin)

  itemsPagina.forEach(personaje => {
    const card = document.createElement('article')
    card.className = 'card-personaje'
    card.setAttribute('data-id', personaje.id)

    const razaSanitizada = (personaje.race || 'default').replace(/\s+/g, '')

    card.innerHTML = `
      <!-- Lado Izquierdo: Avatar e Información -->
      <div class="flex items-center gap-4 min-w-0">
        <img 
          src="${personaje.image}" 
          alt="${personaje.name}" 
          class="avatar-personaje"
          loading="lazy"
          onerror="this.onerror=null; this.src='https://placehold.co/100x100/f8fafc/ea580c?text=${encodeURIComponent(personaje.name)}';"
        >
        <div class="min-w-0">
          <h3 class="text-base sm:text-lg font-bold text-neutral-900 truncate">
            ${personaje.name}
          </h3>
          <div class="flex flex-wrap items-center gap-2 mt-1.5">
            <span class="badge-raza ${razaSanitizada}">
              ${personaje.race}
            </span>
            <span class="badge-genero ${personaje.gender || 'Male'}">
              ${personaje.gender || 'Male'}
            </span>
          </div>
        </div>
      </div>

      <!-- Lado Derecho: Botones de Acción (Editar y Eliminar) -->
      <div class="flex items-center gap-2 shrink-0">
        <button 
          data-action="editar" 
          data-id="${personaje.id}"
          class="btn-accion-editar"
          title="Editar personaje"
        >
          <i class="fa-regular fa-pen-to-square"></i>
          <span>Editar</span>
        </button>

        <button 
          data-action="eliminar" 
          data-id="${personaje.id}"
          class="btn-accion-eliminar"
          title="Eliminar personaje"
        >
          <i class="fa-regular fa-trash-can"></i>
          <span>Eliminar</span>
        </button>
      </div>
    `

    DOM.listaPersonajes.appendChild(card)
  })
}

function renderizarPaginacion() {
  const totalItems = estado.personajes.length
  const totalPaginas = Math.ceil(totalItems / estado.porPagina) || 1

  DOM.btnPrimera.disabled = estado.paginaActual <= 1
  DOM.btnAnterior.disabled = estado.paginaActual <= 1
  DOM.btnSiguiente.disabled = estado.paginaActual >= totalPaginas
  DOM.btnUltima.disabled = estado.paginaActual >= totalPaginas

  DOM.paginasNumeros.innerHTML = ''

  for (let i = 1; i <= totalPaginas; i++) {
    if (totalPaginas > 5 && Math.abs(estado.paginaActual - i) > 1 && i !== 1 && i !== totalPaginas) {
      if (i === 2 || i === totalPaginas - 1) {
        const dots = document.createElement('span')
        dots.className = 'btn-pag-dots'
        dots.textContent = '...'
        DOM.paginasNumeros.appendChild(dots)
      }
      continue
    }

    const btn = document.createElement('button')
    const isActive = i === estado.paginaActual
    btn.className = `btn-pag-num ${isActive ? 'active' : ''}`
    btn.textContent = i
    btn.addEventListener('click', () => {
      estado.paginaActual = i
      renderizarLista()
      renderizarPaginacion()
    })

    DOM.paginasNumeros.appendChild(btn)
  }
}

function actualizarContador() {
  DOM.contadorPersonajes.textContent = estado.personajes.length
}

// --------------------------------------------------------------------
// 6. FORMULARIO (CREAR, EDITAR, CANCELAR)
// --------------------------------------------------------------------

function iniciarEdicion(id) {
  const personaje = estado.personajes.find(p => String(p.id) === String(id))
  if (!personaje) return

  estado.editandoId = id
  DOM.inputId.value = personaje.id
  DOM.inputNombre.value = personaje.name
  DOM.inputImagen.value = personaje.image
  DOM.inputRaza.value = personaje.race
  DOM.selectGenero.value = personaje.gender || 'Male'
  DOM.imgPreview.src = personaje.image

  DOM.tituloForm.textContent = 'EDITAR PERSONAJE'
  DOM.iconForm.className = 'fa-solid fa-pen-to-square text-sm'
  DOM.badgeModoEdicion.classList.remove('hidden')
  DOM.btnSubmitTexto.textContent = 'Actualizar Personaje'
  DOM.btnSubmitIcon.className = 'fa-solid fa-check font-bold'
  DOM.btnCancelarEdicion.classList.remove('hidden')

  limpiarErrores()
  DOM.formPersonaje.scrollIntoView({ behavior: 'smooth', block: 'center' })
  DOM.inputNombre.focus()
}

function cancelarEdicion() {
  estado.editandoId = null
  DOM.formPersonaje.reset()
  DOM.inputId.value = ''
  DOM.imgPreview.src = 'https://dragonball-api.com/characters/goku_normal.webp'

  DOM.tituloForm.textContent = 'NUEVO PERSONAJE'
  DOM.iconForm.className = 'fa-regular fa-user text-sm'
  DOM.badgeModoEdicion.classList.add('hidden')
  DOM.btnSubmitTexto.textContent = 'Agregar Personaje'
  DOM.btnSubmitIcon.className = 'fa-solid fa-plus font-bold'
  DOM.btnCancelarEdicion.classList.add('hidden')
  limpiarErrores()
}

function validarFormulario() {
  limpiarErrores()
  let valido = true

  const nombre = DOM.inputNombre.value.trim()
  const imagen = DOM.inputImagen.value.trim()
  const raza = DOM.inputRaza.value.trim()

  if (!nombre) {
    DOM.errorNombre.classList.remove('hidden')
    valido = false
  }

  if (!imagen || (!imagen.startsWith('http://') && !imagen.startsWith('https://'))) {
    DOM.errorImagen.classList.remove('hidden')
    valido = false
  }

  if (!raza) {
    DOM.errorRaza.classList.remove('hidden')
    valido = false
  }

  return valido
}

function limpiarErrores() {
  DOM.errorNombre.classList.add('hidden')
  DOM.errorImagen.classList.add('hidden')
  DOM.errorRaza.classList.add('hidden')
}

// --------------------------------------------------------------------
// 7. NOTIFICACIONES TOAST
// --------------------------------------------------------------------
function mostrarToast(mensaje, tipo = 'info') {
  const toast = document.createElement('div')
  toast.className = `toast-msg toast-${tipo}`

  let icon = 'fa-circle-info'
  if (tipo === 'success') icon = 'fa-circle-check'
  if (tipo === 'error') icon = 'fa-circle-exclamation'

  toast.innerHTML = `
    <i class="fa-solid ${icon} text-base shrink-0"></i>
    <span class="flex-1">${mensaje}</span>
  `

  DOM.toastContainer.appendChild(toast)

  setTimeout(() => {
    toast.style.animation = 'toastOut 0.25s ease forwards'
    setTimeout(() => toast.remove(), 250)
  }, 3500)
}

// --------------------------------------------------------------------
// 8. EVENT LISTENERS
// --------------------------------------------------------------------
function inicializarEventos() {

  DOM.formPersonaje.addEventListener('submit', (e) => {
    e.preventDefault()

    if (!validarFormulario()) return

    const datos = {
      name: DOM.inputNombre.value.trim(),
      image: DOM.inputImagen.value.trim(),
      race: DOM.inputRaza.value.trim(),
      gender: DOM.selectGenero.value
    }

    if (estado.editandoId) {
      modificarPersonaje(estado.editandoId, datos)
    } else {
      agregarPersonaje(datos)
    }

    cancelarEdicion()
  })

  DOM.btnCancelarEdicion.addEventListener('click', cancelarEdicion)

  DOM.listaPersonajes.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-action]')
    if (!btn) return

    const { action, id } = btn.dataset
    const personaje = estado.personajes.find(p => String(p.id) === String(id))

    if (action === 'editar') {
      iniciarEdicion(id)
    } else if (action === 'eliminar') {
      const confirmado = confirm(`¿Estás seguro de eliminar a "${personaje ? personaje.name : 'este personaje'}"?`)
      if (!confirmado) return

      borrarPersonaje(id)
      if (estado.editandoId === id) {
        cancelarEdicion()
      }
    }
  })

  DOM.inputImagen.addEventListener('input', (e) => {
    const url = e.target.value.trim()
    if (url) {
      DOM.imgPreview.src = url
    }
  })

  DOM.btnPrimera.addEventListener('click', () => {
    if (estado.paginaActual > 1) {
      estado.paginaActual = 1
      renderizarLista()
      renderizarPaginacion()
    }
  })

  DOM.btnAnterior.addEventListener('click', () => {
    if (estado.paginaActual > 1) {
      estado.paginaActual--
      renderizarLista()
      renderizarPaginacion()
    }
  })

  DOM.btnSiguiente.addEventListener('click', () => {
    const totalPags = Math.ceil(estado.personajes.length / estado.porPagina)
    if (estado.paginaActual < totalPags) {
      estado.paginaActual++
      renderizarLista()
      renderizarPaginacion()
    }
  })

  DOM.btnUltima.addEventListener('click', () => {
    const totalPags = Math.ceil(estado.personajes.length / estado.porPagina)
    if (estado.paginaActual < totalPags) {
      estado.paginaActual = totalPags
      renderizarLista()
      renderizarPaginacion()
    }
  })
}

// --------------------------------------------------------------------
// 9. INICIALIZACIÓN
// --------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  inicializarEventos()
  cargarPersonajes()
})
