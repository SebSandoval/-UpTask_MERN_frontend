import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/clienteAxios"
import useAuth from "../hooks/useAuth"
const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alerta, setAlerta] = useState({})


    const { setAuth, cargando } = useAuth()
    console.log(cargando);
    const navigate = useNavigate()
    const handleSubmit = async e => {
        e.preventDefault()

        if ([email, password].includes('')) {
            setAlerta({
                msg: 'Todos los Campos son Obligatorios',
                error: true
            })
            return
        }

        try {
            const { data } = await clienteAxios.post('/usuarios/login', { email, password })
            setAlerta({})


            localStorage.setItem('token', data.token)
            setAuth(data);

            navigate('/proyectos')
        } catch (error) {
            console.log(error);
            /*  setAlerta({
                 msg: error.response.data.msg,
                 error: true
             }) */
        }
    }

    const { msg } = alerta
    return (
        <>
            <h1 className="text-sky-600 font-black text-6xl capitalize">Inicia Sesión y administra tus {' '}
                <span className="text-slate-700"> proyectos</span>
            </h1>
            {msg && <Alerta alerta={alerta} />}
            <form
                onSubmit={handleSubmit}
                action="" className="my-10 bg-white shadow rounded-lg p-10">

                <div className="py-5">
                    <label
                        htmlFor="email"
                        className="uppercase text-gray-600 block text-xl font-bold">Email</label>
                    <input type="email"
                        id="email"
                        placeholder="Email de registro"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="py-5">
                    <label
                        htmlFor="password"
                        className="uppercase text-gray-600 block text-xl font-bold">Password</label>
                    <input type="password"
                        id="password"
                        placeholder="Password de registro"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        value={password}
                        onChange={e => setPassword(e.target.value)} />
                </div>
                <input
                    type="submit"
                    value="Iniciar Sesión"
                    className="bg-sky-700 mb-5  w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors" />
            </form>

            <nav className="lg:flex lg:justify-between">

                <Link
                    to="registrar"
                    className="block text-center my-5 text-slate-500 uppercase text-s,"
                >
                    ¿No tiene una cuenta? Regístrate
                </Link>
                <Link
                    to="olvide-password"
                    className="block text-center my-5 text-slate-500 uppercase text-s,"
                >
                    Olvidé Mi Password
                </Link>
            </nav>
        </>
    )
}

export default Login
