// OBJETIVO: Consultar información en formato JSON desde un servicio web y su URL

console.log(fetch('https://jsonplaceholder.typicode.com/posts')) // Promise {<pending>} -> DEvuelve una promesa (Promise)

// Estados de una promesa -> pending, fulfilled(OK), rejected (Falló)

// fetch('https://jsonplaceholder.typicode.com/posts')
//   .then(response => response.json())  // Se ejecuta cuando la respuesta llegó correctamente y además convertimos la respuesta a un objeto JS
//   .then(data => {
//     console.log(data)
//     console.log(data[0])
//     console.log(data[0].title)
//   })

// TODO: Renderizar la lista de posts del servicio jsonplaceholder con sus campos título, id y body

const renderPosts = (posts = []) => {
  const divApp = document.querySelector('#app')

  let postsList = ''

  posts.forEach(post => {
    postsList = postsList + `
    <div>
      <h2>${post.id} - ${post.title}</h2>
      <p>${post.body}</p>
    </div>
    `
  })

  divApp.innerHTML = postsList
}

fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())  // Se ejecuta cuando la respuesta llegó correctamente y además convertimos la respuesta a un objeto JS
  .then(data => {
    console.log(data)
    renderPosts(data)
  })
  
// TODO: Renderizar la lista de todos del servicio jsonplaceholder con su titulo, id
// URL: https://jsonplaceholder.typicode.com/todos