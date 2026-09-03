const url = 'https://jsonplaceholder.typicode.com/users'

// fetch(url)
//   .then(respuesta => respuesta.json())
//   .then(data => {
//     console.log(data)
//   })
//   .catch(error => {
//     console.log(error)
//   })

const fetchUserSinRetorno = async () => {
  const response = await fetch(url)

  const data = await response.json()

  console.log(data)
}

// fetchUserSinRetorno()

const fetchUsersConRetorno = async () => {
  const response = await fetch(url)

  return await response.json()
}

// fetchUsersConRetorno() // Retorna una promesa
//   .then(users => console.log(users))

const renderUsers = (users = []) => {

  const divApp = document.querySelector('#app')

  let userLists = ''

  users.forEach(user => {
    userLists += `
      <div>
        <h2>${user.id} - ${user.name}</h2>
        <p>Company: ${user.company.name}</p>
      </div>
    `
  })

  divApp.innerHTML = userLists
}

const fetchUsersConManejoDeErrores = async () => {
  try {

    const response = await fetch(url)

    console.log(response.status) // 200

    if (response.status === 404) {
      console.log('Tuvimos problemas para cargar el recurso users')
      // return
      throw new Error('ERROR HTTP: ' + response.status)
    }

    return await response.json()

  } catch (error) {  // Menejamos errores inesperados como por ejemplo ausencia de internet
    console.log(error)
  }
}

fetchUsersConManejoDeErrores()
  .then(users => {
    console.log(users)
    renderUsers(users)
  })

  
// TODO: Resolver estos ejercicios
// Mostrar un mensaje de cargando
// Mostrar solo usuarios de una ciudad, la ciudad es a su elección
// Mostrar cuántos usuarios hay en el listado de users