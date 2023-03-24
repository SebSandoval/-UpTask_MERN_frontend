import FormularioProyectos from "../components/FormularioProyectos"


const NuevoProyecto = () => {
  return (
    <>
      <h1 className="text-4xl font-black">Crear Proyecto</h1>
      <div>
        <div className="mt-5 flex justify-center">

          <FormularioProyectos />


        </div>
      </div>
    </>
  )
}

export default NuevoProyecto
