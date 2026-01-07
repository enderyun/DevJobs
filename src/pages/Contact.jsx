/*
  Este es un jsx que solo sirve como practica. Probablemente se cambien muchas de las cosas
  que se veran a continuacion en el futuro. 
*/

export function ContactPage() {

  // Logica temporal aca

  return (
    <div>
      <h1>Contacto</h1>
      <p>¿Tienes alguna pregunta? Contáctanos.</p>

      <form>
        <label htmlFor="name">Nombre</label>
        <input type="text" id="name" name="name" />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />

        <label htmlFor="number">Numero de telefono</label>
        <input type="number" id="number" name="number" />

        <button type="submit">Enviar</button>

      </form>
    </div>
  )
}