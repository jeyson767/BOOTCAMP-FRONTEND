import { useEffect, useState } from "react"

const Form = ({ onSubmit, studentToEdit }) => {
  const [form, setForm] = useState({
    id: '',
    name: '',
    city: ''
  })

  useEffect(() => {
    if(studentToEdit) {
      setForm({
        id: studentToEdit.id,
        name: studentToEdit.name,
        city: studentToEdit.city
      })
    }
  }, [studentToEdit])

  const handleChange = (event) => {
    const { name, value } = event.target

    setForm({ ...form, [name]: value })
  }

  const handleClear = () => {
    setForm({
      id: '',
      name: '',
      city: ''
    })
  }

  const handleSave = (event) => {
    event.preventDefault()

    console.log('Guardando...')

    // TODO: Implementar el guardado del estudiante cuando este ya existe

    if (form.id) { // Actualizar un estudiante
      const student = {
        name: form.name,
        city: form.city,
      }

      onSubmit(student, form.id)

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

    onSubmit(newStudent)
    
    setForm({
      id: '',
      name: '',
      city: ''
    })
  }

  return (
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

      <pre>{JSON.stringify(form, null, 2)}</pre>
    </form>
  )
}

export default Form