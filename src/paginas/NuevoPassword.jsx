import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import clienteAxios from "../config/clienteAxios"
import Alerta from "../components/Alerta"
function NuevoPassword() {

    const [tokenValido, setTokenValido] = useState(false)
    const [alerta, setAlerta] = useState({})
    const [password, setPassword] = useState('')
    const [passwordModificado, setPasswordModificado] = useState(false)

    const params = useParams()

    const { token } = params


    useEffect(() => {
        const comprobarToken = async () => {

            try {
                await clienteAxios(`/usuarios/olvide-password/${token}`)
                setTokenValido(true)

            } catch (error) {
                console.log(error.response);
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                })
            }
        }
        comprobarToken()

    }, [])



    const handleSubmit = async e => {
        e.preventDefault()

        if (password.length < 6) {
            setAlerta({
                msg: 'El Password Debe Ser de al Menos 6 Caracteres',
                error: true
            })
            return
        }
        try {
            const url = ` /usuarios/olvide-password/${token}`
            const { data } = await clienteAxios.post(url, { password })

            setAlerta({
                msg: data.msg,
                error: false
            })
            setPassword('')
            setPasswordModificado(true)
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }

    }
    const { msg } = alerta



    return (
        <>
            <h1 className="text-sky-600 font-black text-6xl capitalize">Reestablece tu password y no pierdas acceso a tus {' '}
                <span className="text-slate-700"> proyectos</span>
            </h1>

            {msg && <Alerta alerta={alerta} />}
            {tokenValido && (
                <form action=""
                    onSubmit={handleSubmit}
                    className="my-10 bg-white shadow rounded-lg p-10">


                    <div className="py-5">
                        <label
                            htmlFor="password"
                            className="uppercase text-gray-600 block text-xl font-bold">Nuevo Password</label>
                        <input type="password"
                            id="password"
                            placeholder="Escribe Tu Nuevo Password"
                            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>

                    <input
                        type="submit"
                        value="Guardar Nuevo Password"
                        className="bg-sky-700 mb-5  w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors" />
                </form>
            )}
            {passwordModificado && (
                <Link
                    to="/"
                    className="block text-center my-5 text-slate-500 uppercase text-s,"
                >
                    Inicia Sesión
                </Link>
            )}

        </>
    )
}

export default NuevoPassword
