import Swal from 'sweetalert2';

// Light theme configuration for SweetAlert2
const swalLight = Swal.mixin({
  background: '#ffffff',
  color: '#0f172a',
  backdrop: `rgba(15, 23, 42, 0.4) backdrop-filter: blur(4px)`,
  customClass: {
    popup: 'border border-slate-200 rounded-2xl shadow-xl shadow-slate-900/10 font-sans p-6',
    title: 'font-bold text-slate-900 font-["Outfit"] text-xl',
    htmlContainer: 'text-slate-600 text-sm leading-relaxed',
    confirmButton: 'px-5 py-2.5 rounded-xl font-medium text-sm bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all border-0 mx-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500',
    cancelButton: 'px-5 py-2.5 rounded-xl font-medium text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all border border-slate-200 mx-1.5 focus:outline-none',
    actions: 'gap-2 mt-4',
  },
  buttonsStyling: false,
});

// Toast notification mixin in light mode
const Toast = Swal.mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 2800,
  timerProgressBar: true,
  background: '#ffffff',
  color: '#0f172a',
  customClass: {
    popup: 'border border-slate-200 rounded-xl shadow-lg shadow-slate-900/5 text-sm p-3.5',
    title: 'font-medium text-slate-800 text-xs sm:text-sm',
    timerProgressBar: 'bg-indigo-600',
  },
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  }
});

/**
 * Shows a floating toast notification
 */
export function showToast(title, icon = 'success') {
  return Toast.fire({
    icon,
    title,
    iconColor: icon === 'success' ? '#10b981' : icon === 'error' ? '#ef4444' : icon === 'warning' ? '#f59e0b' : '#6366f1'
  });
}

/**
 * Confirmation dialog before deleting a movie
 */
export async function confirmDeleteAlert(movieTitle, posterUrl) {
  const result = await swalLight.fire({
    title: '¿Eliminar película?',
    html: `
      <div class="flex flex-col items-center gap-2 my-2">
        ${posterUrl ? `<img src="${posterUrl}" alt="${movieTitle}" class="w-16 h-24 object-cover rounded-lg border border-slate-200 shadow-sm mb-1" />` : ''}
        <p class="font-semibold text-slate-900 text-base">${movieTitle}</p>
        <p class="text-xs text-slate-500">Esta acción eliminará el título de tu lista.</p>
      </div>
    `,
    icon: 'warning',
    iconColor: '#f59e0b',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
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
  const result = await swalLight.fire({
    title: '¿Restablecer datos?',
    text: 'Se restaurará la lista de películas iniciales.',
    icon: 'question',
    iconColor: '#6366f1',
    showCancelButton: true,
    confirmButtonText: 'Restablecer',
    cancelButtonText: 'Cancelar',
    reverseButtons: true,
  });

  return result.isConfirmed;
}

/**
 * Success modal alert
 */
export function showSuccessAlert(title, text) {
  return swalLight.fire({
    icon: 'success',
    iconColor: '#10b981',
    title,
    text,
    timer: 2000,
    showConfirmButton: false,
  });
}

/**
 * Error modal alert
 */
export function showErrorAlert(title, text) {
  return swalLight.fire({
    icon: 'error',
    iconColor: '#ef4444',
    title,
    text,
    confirmButtonText: 'Entendido',
  });
}
