const List = ({ students, onEdit, onDelete }) => {
  return (
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
              <button onClick={() => onEdit(student)}>✏</button>
              <button onClick={() => onDelete(student.id)}>❌</button>
            </div>
          </div>
        )
      })}

      <pre>{JSON.stringify(students, null, 2)}</pre>
    </section>
  )
}

export default List