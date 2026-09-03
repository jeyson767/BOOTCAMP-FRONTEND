const searchInput = document.querySelector('#search-input')
const contactList = document.querySelector('#contact-list')
const contacts = document.querySelectorAll('.contact')

// console.log(searchInput)
// console.log(contactList)

// searchInput.addEventListener(EVENTO, FUNCION)
searchInput.addEventListener('input', function(event) {
  const query = event.target.value.toLowerCase()

  // TODO: Tambien debe fitlrar por el correo del contacto

  contacts.forEach(function(contact) {
    const name = contact.querySelector('.name').textContent.toLowerCase()
    const email = contact.querySelector('.email').textContent.toLowerCase()
    const coincidencias = name.includes(query) || email.includes(query)

    if (coincidencias) {
      contact.classList.remove('hidden')
    } else {
      contact.classList.add('hidden')
    }
  })
})