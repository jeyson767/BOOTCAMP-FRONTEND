import { useEffect, useState } from "react"

import Swal from 'sweetalert2'
import { createStudent, fetchStudents, removeStudent, updateStudent } from "./services/students"

const App = () => {
  const [students, setStudents] = useState([])
  const [form, setForm] = useState({
    id: '',
    name: '',
    city: ''
  })

  useEffect(() => {
    console.log('Cargando students...')
    fetchStudents()
      .then(data => setStudents(data))
  }, []) // Este useEffect se ejecuta la primera vez que el componente se crea

  const handleSave = (event) => {
    event.preventDefault()

    console.log('Guardando...')

    // TODO: Implementar el guardado del estudiante cuando este ya existe

    if (form.id) { // Actualizar un estudiante
      const student = {
        name: form.name,
        city: form.city,
      }

      updateStudent(student, form.id)
        .then(() => {
          fetchStudents()
            .then(data => setStudents(data))
        })

      setForm({
        id: '',
        name: '',
        city: ''
      })

      return
    }
    
    // Creando un nuevo estudiante

    // TODO: Crear un registro en el recurso students y posteriormente actualizar el listado de estudiantes

    const newStudent = {
      name: form.name,
      city: form.city
    }

    createStudent(newStudent)
      .then(() => {
        fetchStudents()
          .then(data => setStudents(data))
      })
    
    setForm({
      id: '',
      name: '',
      city: ''
    })
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setForm({ ...form, [name]: value })
  }

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
    setForm({
      id: student.id,
      name: student.name,
      city: student.city
    })
  }

  const handleClear = () => {
    setForm({
      id: '',
      name: '',
      city: ''
    })
  }

  return (
    <main className="w-96 mx-auto border border-slate-400 rounded-lg mt-6 p-4">
      <h1 className="text-2xl text-center text-slate-700 font-bold mb-4">Student CRUD</h1>

      <form
        className="flex flex-col gap-4 bg-slate-100 p-3 rounded-lg border"
        onSubmit={handleSave}
      >
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-900">Name</span>
          <input
            className="bg-slate-50 border border-slate-300 text-slate-90 text-sm rounded-lg w-full px-4 py-2"
            type="text"
            name="name"
            placeholder="Ex. Victor Villazón"
            required
            onChange={handleChange}
            value={form.name}
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-900">City</span>
          <input
            className="bg-slate-50 border border-slate-300 text-slate-90 text-sm rounded-lg w-full px-4 py-2"
            type="text"
            name="city"
            placeholder="Ex. Chiclayo"
            required
            onChange={handleChange}
            value={form.city}
          />
        </label>

        <div className="flex gap-4">
          <input
            className="bg-blue-700 text-white hover:bg-blue-800 font-medium rounded-lg text-sm w-full px-4 py-2 text-center cursor-pointer"
            type="submit"
            value="Save"
          />
          <input
            className="bg-slate-500 text-white hover:bg-slate-600 font-medium rounded-lg text-sm w-full px-4 py-2 text-center cursor-pointer"
            type="button"
            value="Clear"
            onClick={handleClear}
          />
        </div>
      </form>

      <h2 className="text-center text-slate-700 font-bold my-4">Student list</h2>

      <section className="mt-4 flex flex-col gap-2">
        <div className="flex justify-between items-center gap-2 bg-slate-300 px-4 py-2 rounded-lg ">
          <div className="text-left">Name</div>
          <div className="text-left">City</div>
          <div className="flex gap-2">Actions</div>
        </div>

        {students.map((student, index) => {
          return (
            <div className="flex justify-between items-center gap-2 bg-slate-100 px-4 py-2 rounded-lg" key={student.id}>
              <div className="text-left">{student.name}</div>
              <div className="text-left">{student.city}</div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(student)}>✏</button>
                <button onClick={() => handleDelete(student.id)}>❌</button>
              </div>
            </div>
          )
        })}

        <pre>{JSON.stringify(form, null, 2)}</pre>
        <pre>{JSON.stringify(students, null, 2)}</pre>
      </section>
    </main>
  )
}

export default App