const Profile = ({ nombre = 'Anónimo', role = 'Ninguno' }) => {
  return (
    <section style={{ border: '1px solid red', marginBottom: '8px' }}>
      <h2>Profile</h2>
      <p>Hola {nombre} tu role es {role}</p>
    </section>
  )
}

export default Profile