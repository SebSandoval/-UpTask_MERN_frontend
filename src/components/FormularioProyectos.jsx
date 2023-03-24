import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import useProyectos from "../hooks/useProyectos"
import Alerta from "./Alerta"
const FormularioProyectos = () => {
  const [id, setId] = useState(null)
  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [fechaEntrega, setFechaEntrega] = useState('')
  const [cliente, setCliente] = useState('')

  const params = useParams()

  const { mostrarAlerta, alerta, submitProyecto, proyecto } = useProyectos()

  useEffect(() => {
    if (params.id) {
      setId(proyecto._id)
      setNombre(proyecto.nombre)
      setCliente(proyecto.cliente)
      setFechaEntrega(proyecto.fechaEntrega?.split('T')[0])
      setDescripcion(proyecto.descripcion)
    }

  }, [params])

  const handleSubmit = async e => {
    e.preventDefault()
    if ([nombre, descripcion, fechaEntrega, cliente].includes('')) {
      mostrarAlerta({
        msg: 'Todos los campos son Obligatorios',
        error: true
      })
      return
    }
    //pasar los datos al provider
    await submitProyecto({ id, nombre, descripcion, fechaEntrega, cliente })
    setId(null)
    setNombre('')
    setCliente('')
    setFechaEntrega('')
    setDescripcion('')
  }



  const { msg } = alerta

  return (
    <form
      onSubmit={handleSubmit}
      className='bg-white py-5 px-5 md:w-1/2 rounded-lg shadow'>

      {msg && <Alerta alerta={alerta} />}


      <div className="mb-5">
        <label htmlFor="nombre" className="text-gray-700 font-bold text-sm ">
          Nombre Proyecto
        </label>
        <input type="text"
          id='nombre'
          className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
          placeholder='Nombre del Proyecto'
          value={nombre}
          onChange={e => setNombre(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <label htmlFor="descripcion" className="text-gray-700 font-bold text-sm ">
          Descripcion
        </label>
        <textarea
          id='descripcion'
          className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
          placeholder='Descripcion del Proyecto'
          value={descripcion}
          onChange={e => setDescripcion(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <label htmlFor="fecha-entrega" className="text-gray-700 font-bold text-sm ">
          Fecha de Entrega
        </label>
        <input type="date"
          id='fecha-entrega'
          className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'

          value={fechaEntrega}
          onChange={e => setFechaEntrega(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <label htmlFor="cliente" className="text-gray-700 font-bold text-sm ">
          Nombre Cliente
        </label>
        <input type="text"
          id='cliente'
          className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
          placeholder='Nombre del Cliente'
          value={cliente}
          onChange={e => setCliente(e.target.value)}
        />
      </div>
      <input type="submit"
        value={id ? 'Actualizar Proyecto' : 'Crear Proyecto'}
        className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded 
       cursor-pointer hover:bg-sky-800 transition-colors"/>
    </form>
  )
}

export default FormularioProyectos
