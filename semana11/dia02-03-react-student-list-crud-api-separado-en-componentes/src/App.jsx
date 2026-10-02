import { useEffect, useState } from "react"

import Swal from 'sweetalert2'
import { createStudent, fetchStudents, removeStudent, updateStudent } from "./services/students"
import Form from "./components/Form"
import List from "./components/List"

const App = () => {
  const [students, setStudents] = useState([])
  const [studentToEdit, setStudentToEdit] = useState(null)

  useEffect(() => {
    console.log('Cargando students...')
    fetchStudents()
      .then(data => setStudents(data))
  }, []) // Este useEffect se ejecuta la primera vez que el componente se crea

  const handleDelete = (id) => {
    // TODO: Implementar el botón eliminar de cada estudiante para eliminarlo en el apibox

    console.log('Eliminando', id)

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        removeStudent(id)
          .then(() => {
            fetchStudents()
              .then(data => setStudents(data))
          })
      }
    });
  }

  // TODO: Implementar el boton editar y el boton save del formulario

  const handleEdit = (student) => {
    console.log('Actualizando', student)
    setStudentToEdit({
      id: student.id,
      name: student.name,
      city: student.city
    })
  }

  const handleSubmit = (student, id) => {
    console.log('Hola Submit', student)

    if (id) {
      updateStudent(student, id)
        .then(() => {
          fetchStudents()
            .then(data => setStudents(data))
        })
      
      return // IMportante para que ya no se cree un nuevo estudiante en la siguiente línea
    }

    createStudent(student)
      .then(() => {
        fetchStudents()
          .then(data => setStudents(data))
      })
  }

  return (
    <main className="w-96 mx-auto border border-slate-400 rounded-lg mt-6 p-4">
      <h1 className="text-2xl text-center text-slate-700 font-bold mb-4">Student CRUD</h1>

      <Form onSubmit={handleSubmit} studentToEdit={studentToEdit} />

      <h2 className="text-center text-slate-700 font-bold my-4">Student list</h2>

      <List students={students} onEdit={handleEdit} onDelete={handleDelete} />
    </main>
  )
}

export default App