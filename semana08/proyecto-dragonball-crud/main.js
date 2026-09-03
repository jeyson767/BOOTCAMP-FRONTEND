/**
 * ====================================================================
 * Dragon Ball CRUD - JavaScript Vanilla (Maratón G31 - 2026)
 * Bootcamp Frontend Python G31 JV • Victor Villazón
 * ====================================================================
 */

// --------------------------------------------------------------------
// 1. CONFIGURACIÓN Y CONSTANTES
// --------------------------------------------------------------------
const STORAGE_ENDPOINT_KEY = 'DBZ_APIBOX_ENDPOINT_URL'
const STORAGE_PERSONAJES_KEY = 'DBZ_PERSONAJES_LOCAL_STORAGE'
const DEFAULT_API_URL = 'https://apibox.vercel.app/2aSCD2Sbz4kg4AcacfeJLMmalhKR3Xgs/api/personajes'

// 12 Personajes Oficiales idénticos a la referencia para precarga y autocompletado
const PERSONAJES_OFICIALES = [
  {
    id: 'db-1',
    name: 'Goku',
    image: 'https://dragonball-api.com/characters/goku_normal.webp',
    race: 'Saiyan',
    gender: 'Male'
  },
  {
    id: 'db-2',
    name: 'Vegeta',
    image: 'https://dragonball-api.com/characters/vegeta_normal.webp',
    race: 'Saiyan',
    gender: 'Male'
  },
  {
    id: 'db-3',
    name: 'Piccolo',
    image: 'https://dragonball-api.com/characters/picolo_normal.webp',
    race: 'Namekian',
    gender: 'Male'
  },
  {
    id: 'db-4',
    name: 'Bulma',
    image: 'https://dragonball-api.com/characters/bulma.webp',
    race: 'Human',
    gender: 'Female'
  },
  {
    id: 'db-5',
    name: 'Gohan',
    image: 'https://dragonball-api.com/characters/gohan.webp',
    race: 'Saiyan',
    gender: 'Male'
  },
  {
    id: 'db-6',
    name: 'Trunks',
    image: 'https://dragonball-api.com/characters/trunks_normal.webp',
    race: 'Saiyan',
    gender: 'Male'
  },
  {
    id: 'db-7',
    name: 'Krillin',
    image: 'https://dragonball-api.com/characters/krillin.webp',
    race: 'Human',
    gender: 'Male'
  },
  {
    id: 'db-8',
    name: 'Freezer',
    image: 'https://dragonball-api.com/characters/Freezer.webp',
    race: 'Frieza Race',
    gender: 'Male'
  },
  {
    id: 'db-9',
    name: 'Cell',
    image: 'https://dragonball-api.com/characters/celula.webp',
    race: 'Android',
    gender: 'Male'
  },
  {
    id: 'db-10',
    name: 'Majin Buu',
    image: 'https://dragonball-api.com/characters/buu_gordo.webp',
    race: 'Majin',
    gender: 'Male'
  },
  {
    id: 'db-11',
    name: 'Android 18',
    image: 'https://dragonball-api.com/characters/androide_18.webp',
    race: 'Android',
    gender: 'Female'
  },
  {
    id: 'db-12',
    name: 'Videl',
    image: 'https://dragonball-api.com/characters/videl.webp',
    race: 'Human',
    gender: 'Female'
  }
]

// --------------------------------------------------------------------
// 2. ESTADO GLOBAL
// --------------------------------------------------------------------
const estado = {
  personajes: [],
  personajesFiltrados: [],
  paginaActual: 1,
  porPagina: 5, // 5 personajes por página (como en la referencia)
  busqueda: '',
  filtroRaza: 'todos',
  editandoId: null,
  cargando: false,
  modoOffline: false,
  apiUrl: localStorage.getItem(STORAGE_ENDPOINT_KEY) || DEFAULT_API_URL
}

// --------------------------------------------------------------------
// 3. ELEMENTOS DEL DOM
// --------------------------------------------------------------------
const DOM = {
  contadorPersonajes: document.querySelector('#contadorPersonajes'),
  loading: document.querySelector('#loading'),
  listaPersonajes: document.querySelector('#listaPersonajes'),
  estadoVacio: document.querySelector('#estadoVacio'),
  btnPoblarIniciales: document.querySelector('#btnPoblarIniciales'),

  // Filtros y Búsqueda
  inputBuscar: document.querySelector('#inputBuscar'),
  filtroRaza: document.querySelector('#filtroRaza'),

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
  selectSugerencia: document.querySelector('#selectSugerencia'),
  imgPreview: document.querySelector('#imgPreview'),
  btnSubmit: document.querySelector('#btnSubmit'),
  btnSubmitTexto: document.querySelector('#btnSubmitTexto'),
  btnSubmitIcon: document.querySelector('#btnSubmitIcon'),
  btnCancelarEdicion: document.querySelector('#btnCancelarEdicion'),
  errorNombre: document.querySelector('#errorNombre'),
  errorImagen: document.querySelector('#errorImagen'),
  errorRaza: document.querySelector('#errorRaza'),

  // Botones de Cabecera
  btnRecargar: document.querySelector('#btnRecargar'),
  iconRecargar: document.querySelector('#iconRecargar'),
  btnConfigApi: document.querySelector('#btnConfigApi'),

  // Modal Config API
  modalConfigApi: document.querySelector('#modalConfigApi'),
  inputEndpointUrl: document.querySelector('#inputEndpointUrl'),
  btnCerrarConfigApi: document.querySelector('#btnCerrarConfigApi'),
  btnGuardarEndpoint: document.querySelector('#btnGuardarEndpoint'),
  btnRestablecerEndpoint: document.querySelector('#btnRestablecerEndpoint'),

  // Toasts
  toastContainer: document.querySelector('#toastContainer')
}

// --------------------------------------------------------------------
// 4. CONTROL DE DATOS Y ASINCRONÍA (API + LOCAL STORAGE PERSISTENCE)
// --------------------------------------------------------------------

/**
 * Obtiene los personajes intentando con APIBox y aplicando fallback inteligente a localStorage
 */
async function cargarPersonajes() {
  mostrarCargando(true)

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 6000)

    const respuesta = await fetch(estado.apiUrl, {
      signal: controller.signal
    })
    clearTimeout(timeoutId)

    if (!respuesta.ok) {
      throw new Error(`Estado ${respuesta.status}: Recurso no disponible en este endpoint.`)
    }

    const data = await respuesta.json()

    if (data && data.error) {
      throw new Error(data.error)
    }

    const lista = Array.isArray(data) ? data : (data.items || [])
    
    // Mapear los datos de APIBox
    estado.personajes = lista.map((p, index) => ({
      id: p.id || p._id || `db-${index}`,
      name: p.name || 'Sin Nombre',
      image: p.image || 'https://dragonball-api.com/characters/goku_normal.webp',
      race: p.race || 'Saiyan',
      gender: p.gender || 'Male'
    }))

    estado.modoOffline = false

    // Si la colección remota está vacía, sembrar los 12 personajes oficiales
    if (estado.personajes.length === 0) {
      await sembrarPersonajesRemotos()
      return
    }

    guardarEnLocalStorage(estado.personajes)
    aplicarFiltros()
    actualizarContador()

  } catch (error) {
    console.warn('APIBox no disponible o recurso no creado aún en apibox.vercel.app:', error.message)
    estado.modoOffline = true

    // Cargar desde LocalStorage o inicializar con los 12 personajes oficiales
    const guardados = localStorage.getItem(STORAGE_PERSONAJES_KEY)
    if (guardados) {
      estado.personajes = JSON.parse(guardados)
    } else {
      estado.personajes = [...PERSONAJES_OFICIALES]
      guardarEnLocalStorage(estado.personajes)
    }

    aplicarFiltros()
    actualizarContador()
  } finally {
    mostrarCargando(false)
  }
}

/**
 * Guarda un nuevo personaje (POST a APIBox o persistencia local)
 */
async function crearPersonaje(personaje) {
  const nuevo = {
    ...personaje,
    id: `db-${Date.now()}`
  }

  if (!estado.modoOffline) {
    try {
      const opciones = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(personaje)
      }
      const res = await fetch(estado.apiUrl, opciones)
      if (res.ok) {
        const creado = await res.json()
        nuevo.id = creado.id || creado._id || nuevo.id
      }
    } catch (e) {
      console.warn('No se pudo enviar POST a APIBox, guardando localmente:', e)
    }
  }

  // Insertar al inicio de la lista
  estado.personajes.unshift(nuevo)
  guardarEnLocalStorage(estado.personajes)
  aplicarFiltros()
  actualizarContador()
}

/**
 * Actualiza un personaje existente (PUT a APIBox o persistencia local)
 */
async function actualizarPersonaje(id, datos) {
  if (!estado.modoOffline) {
    try {
      const opciones = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
      }
      await fetch(`${estado.apiUrl}/${id}`, opciones)
    } catch (e) {
      console.warn('No se pudo enviar PUT a APIBox, actualizando localmente:', e)
    }
  }

  // Actualizar en el estado local
  const index = estado.personajes.findIndex(p => String(p.id) === String(id))
  if (index !== -1) {
    estado.personajes[index] = {
      ...estado.personajes[index],
      ...datos
    }
    guardarEnLocalStorage(estado.personajes)
    aplicarFiltros()
    actualizarContador()
  }
}

/**
 * Elimina un personaje (DELETE a APIBox o persistencia local)
 */
async function eliminarPersonaje(id) {
  if (!estado.modoOffline) {
    try {
      await fetch(`${estado.apiUrl}/${id}`, { method: 'DELETE' })
    } catch (e) {
      console.warn('No se pudo enviar DELETE a APIBox, eliminando localmente:', e)
    }
  }

  // Eliminar del estado local
  estado.personajes = estado.personajes.filter(p => String(p.id) !== String(id))
  guardarEnLocalStorage(estado.personajes)
  aplicarFiltros()
  actualizarContador()
}

/**
 * Sembrar los 12 personajes oficiales en APIBox remoto
 */
async function sembrarPersonajesRemotos() {
  for (const p of PERSONAJES_OFICIALES) {
    try {
      await fetch(estado.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: p.name,
          image: p.image,
          race: p.race,
          gender: p.gender
        })
      })
    } catch (e) {
      console.warn('Fallo al sembrar en remoto:', e)
    }
  }
  await cargarPersonajes()
}

/**
 * Guarda la lista en LocalStorage
 */
function guardarEnLocalStorage(lista) {
  try {
    localStorage.setItem(STORAGE_PERSONAJES_KEY, JSON.stringify(lista))
  } catch (e) {
    console.warn('Error al guardar en localStorage:', e)
  }
}

// --------------------------------------------------------------------
// 5. RENDERIZADO Y CONTROL DEL DOM
// --------------------------------------------------------------------

/**
 * Muestra el estado de carga
 */
function mostrarCargando(activo) {
  estado.cargando = activo
  if (activo) {
    DOM.loading.classList.remove('hidden')
    DOM.listaPersonajes.classList.add('hidden')
    DOM.estadoVacio.classList.add('hidden')
    DOM.iconRecargar.classList.add('rotate-anim')
  } else {
    DOM.loading.classList.add('hidden')
    DOM.iconRecargar.classList.remove('rotate-anim')
  }
}

/**
 * Aplica los filtros de búsqueda y raza
 */
function aplicarFiltros() {
  let filtrados = [...estado.personajes]

  // Búsqueda por nombre
  if (estado.busqueda.trim() !== '') {
    const q = estado.busqueda.toLowerCase().trim()
    filtrados = filtrados.filter(p => p.name.toLowerCase().includes(q))
  }

  // Filtro por raza
  if (estado.filtroRaza !== 'todos') {
    filtrados = filtrados.filter(p => p.race.toLowerCase() === estado.filtroRaza.toLowerCase())
  }

  estado.personajesFiltrados = filtrados

  // Ajustar página actual si supera el máximo
  const maxPags = Math.ceil(filtrados.length / estado.porPagina) || 1
  if (estado.paginaActual > maxPags) {
    estado.paginaActual = 1
  }

  renderizarLista()
  renderizarPaginacion()
}

/**
 * Renderiza las tarjetas de personajes en la lista
 */
function renderizarLista() {
  DOM.listaPersonajes.innerHTML = ''

  if (estado.personajesFiltrados.length === 0) {
    DOM.listaPersonajes.classList.add('hidden')
    DOM.estadoVacio.classList.remove('hidden')
    return
  }

  DOM.estadoVacio.classList.add('hidden')
  DOM.listaPersonajes.classList.remove('hidden')

  // Obtener elementos para la página actual (5 por página)
  const inicio = (estado.paginaActual - 1) * estado.porPagina
  const fin = inicio + estado.porPagina
  const itemsPagina = estado.personajesFiltrados.slice(inicio, fin)

  itemsPagina.forEach(personaje => {
    const card = document.createElement('article')
    card.className = 'card-personaje'
    card.setAttribute('data-id', personaje.id)

    // Clase CSS del badge de raza
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

/**
 * Renderiza la barra de paginación exactamente como en la referencia
 */
function renderizarPaginacion() {
  const totalItems = estado.personajesFiltrados.length
  const totalPaginas = Math.ceil(totalItems / estado.porPagina) || 1

  DOM.btnPrimera.disabled = estado.paginaActual <= 1
  DOM.btnAnterior.disabled = estado.paginaActual <= 1
  DOM.btnSiguiente.disabled = estado.paginaActual >= totalPaginas
  DOM.btnUltima.disabled = estado.paginaActual >= totalPaginas

  DOM.paginasNumeros.innerHTML = ''

  // Generación de botones numéricos con elipsis (...)
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

/**
 * Actualiza el contador superior derecho
 */
function actualizarContador() {
  DOM.contadorPersonajes.textContent = estado.personajes.length
}

// --------------------------------------------------------------------
// 6. FORMULARIO (CREAR, EDITAR, CANCELAR)
// --------------------------------------------------------------------

/**
 * Inicia el modo de edición cargando datos en el formulario
 */
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

  // Modificar interfaz para modo edición
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

/**
 * Cancela el modo de edición y resetea el formulario
 */
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
  DOM.selectSugerencia.value = ''
  limpiarErrores()
}

/**
 * Valida los campos requeridos
 */
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

  // --- Envío del Formulario (Crear / Actualizar) ---
  DOM.formPersonaje.addEventListener('submit', async (e) => {
    e.preventDefault()

    if (!validarFormulario()) return

    const datosPersonaje = {
      name: DOM.inputNombre.value.trim(),
      image: DOM.inputImagen.value.trim(),
      race: DOM.inputRaza.value.trim(),
      gender: DOM.selectGenero.value
    }

    DOM.btnSubmit.disabled = true
    DOM.btnSubmitTexto.textContent = 'Guardando...'

    try {
      if (estado.editandoId) {
        await actualizarPersonaje(estado.editandoId, datosPersonaje)
        mostrarToast(`"${datosPersonaje.name}" actualizado correctamente.`, 'success')
      } else {
        await crearPersonaje(datosPersonaje)
        mostrarToast(`"${datosPersonaje.name}" agregado con éxito.`, 'success')
      }

      cancelarEdicion()
    } catch (error) {
      console.error('Error al guardar:', error)
      mostrarToast(`Error: ${error.message}`, 'error')
    } finally {
      DOM.btnSubmit.disabled = false
      DOM.btnSubmitTexto.textContent = estado.editandoId ? 'Actualizar Personaje' : 'Agregar Personaje'
    }
  })

  // --- Cancelar Edición ---
  DOM.btnCancelarEdicion.addEventListener('click', cancelarEdicion)

  // --- Delegación de Eventos en Lista (Editar / Eliminar) ---
  DOM.listaPersonajes.addEventListener('click', async (e) => {
    const btn = e.target.closest('button[data-action]')
    if (!btn) return

    const { action, id } = btn.dataset
    const personaje = estado.personajes.find(p => String(p.id) === String(id))

    if (action === 'editar') {
      iniciarEdicion(id)
    } else if (action === 'eliminar') {
      const confirmado = confirm(`¿Estás seguro de eliminar a "${personaje ? personaje.name : 'este personaje'}"?`)
      if (!confirmado) return

      try {
        await eliminarPersonaje(id)
        mostrarToast('Personaje eliminado.', 'success')
        if (estado.editandoId === id) {
          cancelarEdicion()
        }
      } catch (error) {
        mostrarToast(`Error al eliminar: ${error.message}`, 'error')
      }
    }
  })

  // --- Previsualización de Imagen en vivo ---
  DOM.inputImagen.addEventListener('input', (e) => {
    const url = e.target.value.trim()
    if (url) {
      DOM.imgPreview.src = url
    }
  })

  // --- Autocompletar con Personaje Oficial ---
  DOM.selectSugerencia.addEventListener('change', (e) => {
    const nombre = e.target.value
    if (!nombre) return

    const guerrero = PERSONAJES_OFICIALES.find(g => g.name === nombre)
    if (guerrero) {
      DOM.inputNombre.value = guerrero.name
      DOM.inputImagen.value = guerrero.image
      DOM.inputRaza.value = guerrero.race
      DOM.selectGenero.value = guerrero.gender
      DOM.imgPreview.src = guerrero.image
      limpiarErrores()
    }
  })

  // --- Búsqueda y Filtros ---
  DOM.inputBuscar.addEventListener('input', (e) => {
    estado.busqueda = e.target.value
    estado.paginaActual = 1
    aplicarFiltros()
  })

  DOM.filtroRaza.addEventListener('change', (e) => {
    estado.filtroRaza = e.target.value
    estado.paginaActual = 1
    aplicarFiltros()
  })

  // --- Paginación: Primera, Anterior, Siguiente, Última ---
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
    const totalPags = Math.ceil(estado.personajesFiltrados.length / estado.porPagina)
    if (estado.paginaActual < totalPags) {
      estado.paginaActual++
      renderizarLista()
      renderizarPaginacion()
    }
  })

  DOM.btnUltima.addEventListener('click', () => {
    const totalPags = Math.ceil(estado.personajesFiltrados.length / estado.porPagina)
    if (estado.paginaActual < totalPags) {
      estado.paginaActual = totalPags
      renderizarLista()
      renderizarPaginacion()
    }
  })

  // --- Recargar ---
  DOM.btnRecargar.addEventListener('click', () => {
    mostrarToast('Actualizando lista...', 'info')
    cargarPersonajes()
  })

  // --- Poblar Iniciales ---
  DOM.btnPoblarIniciales.addEventListener('click', () => {
    estado.personajes = [...PERSONAJES_OFICIALES]
    guardarEnLocalStorage(estado.personajes)
    aplicarFiltros()
    actualizarContador()
    mostrarToast('12 Guerreros Z cargados con éxito.', 'success')
  })

  // --- Modal Configuración API ---
  DOM.btnConfigApi.addEventListener('click', () => {
    DOM.inputEndpointUrl.value = estado.apiUrl
    DOM.modalConfigApi.classList.add('modal-visible')
  })

  DOM.btnCerrarConfigApi.addEventListener('click', () => {
    DOM.modalConfigApi.classList.remove('modal-visible')
  })

  DOM.modalConfigApi.addEventListener('click', (e) => {
    if (e.target === DOM.modalConfigApi) {
      DOM.modalConfigApi.classList.remove('modal-visible')
    }
  })

  DOM.btnGuardarEndpoint.addEventListener('click', () => {
    const url = DOM.inputEndpointUrl.value.trim()
    if (!url || (!url.startsWith('http://') && !url.startsWith('https://'))) {
      mostrarToast('Ingresa una URL válida.', 'error')
      return
    }

    estado.apiUrl = url
    localStorage.setItem(STORAGE_ENDPOINT_KEY, url)
    DOM.modalConfigApi.classList.remove('modal-visible')
    mostrarToast('Endpoint de APIBox actualizado.', 'success')
    cargarPersonajes()
  })

  DOM.btnRestablecerEndpoint.addEventListener('click', () => {
    estado.apiUrl = DEFAULT_API_URL
    localStorage.removeItem(STORAGE_ENDPOINT_KEY)
    DOM.inputEndpointUrl.value = DEFAULT_API_URL
    DOM.modalConfigApi.classList.remove('modal-visible')
    mostrarToast('Endpoint restablecido al valor por defecto.', 'info')
    cargarPersonajes()
  })
}

// --------------------------------------------------------------------
// 9. INICIALIZACIÓN
// --------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  inicializarEventos()
  cargarPersonajes()
})
