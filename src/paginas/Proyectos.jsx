import Alerta from "../components/Alerta";
import PreviewProyecto from "../components/PreviewProyecto";
import useProyectos from "../hooks/useProyectos"

import io from 'socket.io-client'
import { useEffect } from "react";

let socket;

const Proyectos = () => {
  const { proyectos, alerta } = useProyectos()

  useEffect(() => {

  }, [])

  const { msg } = alerta

  // console.log(proyectos);
  return (
    <>
      <h1 className="text-4xl font-black">Proyectos</h1>
      {msg && <Alerta alerta={alerta} />}
      <div className="bg-white shadow mt-10 rounded-lg" >
        {proyectos.length ?

          proyectos.map(proyecto => (
            <PreviewProyecto
              key={proyecto._id}
              proyecto={proyecto} />
          ))
          : <p className="text-center text-gray-600  uppercase p-5">No Hay Proyectos Aún</p>}
      </div>
    </>
  )
}

export default Proyectos
