import Swal from 'sweetalert2';

// Base dark theme configuration for SweetAlert2
const swalDark = Swal.mixin({
  background: '#111726',
  color: '#f8fafc',
  backdrop: `rgba(0, 0, 0, 0.8) backdrop-filter: blur(8px)`,
  customClass: {
    popup: 'border border-slate-800 rounded-3xl shadow-2xl shadow-black/80 font-sans',
    title: 'font-black text-white font-["Outfit"] text-xl sm:text-2xl',
    htmlContainer: 'text-slate-300 text-sm leading-relaxed',
    confirmButton: 'px-5 py-2.5 rounded-xl font-bold text-sm bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/30 transition-all border-0 mx-1.5 focus:outline-none focus:ring-2 focus:ring-red-500',
    cancelButton: 'px-5 py-2.5 rounded-xl font-semibold text-sm bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all border border-slate-700 mx-1.5 focus:outline-none',
    actions: 'gap-2 mt-4',
  },
  buttonsStyling: false,
});

// Toast notification mixin
const Toast = Swal.mixin({
  toast: true,
  position: 'bottom-end',
  iconColor: '#f43f5e',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  background: '#111726',
  color: '#f8fafc',
  customClass: {
    popup: 'border border-slate-800/90 rounded-2xl shadow-2xl shadow-black backdrop-blur-md text-sm',
    title: 'font-semibold text-white text-xs sm:text-sm',
    timerProgressBar: 'bg-red-600',
  },
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  }
});

/**
 * Shows a floating toast notification
 * @param {string} title
 * @param {'success'|'error'|'warning'|'info'} icon
 */
export function showToast(title, icon = 'success') {
  return Toast.fire({
    icon,
    title,
    iconColor: icon === 'success' ? '#10b981' : icon === 'error' ? '#ef4444' : icon === 'warning' ? '#f59e0b' : '#0ea5e9'
  });
}

/**
 * Confirmation dialog before deleting a movie
 * @param {string} movieTitle
 * @param {string} [posterUrl]
 */
export async function confirmDeleteAlert(movieTitle, posterUrl) {
  const result = await swalDark.fire({
    title: '¿Eliminar título?',
    html: `
      <div class="flex flex-col items-center gap-3 my-2">
        ${posterUrl ? `<img src="${posterUrl}" alt="${movieTitle}" class="w-20 h-28 object-cover rounded-xl border border-slate-700 shadow-md mb-1" />` : ''}
        <p class="font-bold text-white text-base">${movieTitle}</p>
        <p class="text-xs text-slate-400">Esta acción no se puede deshacer y se eliminará permanentemente del catálogo.</p>
      </div>
    `,
    icon: 'warning',
    iconColor: '#ef4444',
    showCancelButton: true,
    confirmButtonText: '🗑️ Sí, eliminar',
    cancelButtonText: 'Cancelar',
    reverseButtons: true,
    focusCancel: true,
  });

  return result.isConfirmed;
}

/**
 * Confirmation dialog before restoring default database
 */
export async function confirmResetAlert() {
  const result = await swalDark.fire({
    title: '¿Restablecer datos?',
    text: 'Se restaurará la lista de películas y series originales por defecto de CineVerse.',
    icon: 'question',
    iconColor: '#f59e0b',
    showCancelButton: true,
    confirmButtonText: 'Restablecer Catálogo',
    cancelButtonText: 'Cancelar',
    reverseButtons: true,
  });

  return result.isConfirmed;
}

/**
 * Success modal alert
 */
export function showSuccessAlert(title, text) {
  return swalDark.fire({
    icon: 'success',
    iconColor: '#10b981',
    title,
    text,
    timer: 2500,
    showConfirmButton: false,
  });
}

/**
 * Error modal alert
 */
export function showErrorAlert(title, text) {
  return swalDark.fire({
    icon: 'error',
    iconColor: '#ef4444',
    title,
    text,
    confirmButtonText: 'Entendido',
  });
}
