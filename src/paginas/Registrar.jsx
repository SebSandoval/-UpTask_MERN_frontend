import { useState } from "react"

import { Link } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/clienteAxios"


const Registrar = () => {
    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repetirPassword, setRepetirPassword] = useState('')
    const [alerta, setAlerta] = useState({})
    const handleSubmit = async e => {
        e.preventDefault()
        if ([nombre, email, password, repetirPassword].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }

        if (password !== repetirPassword) {
            setAlerta({
                msg: 'Las contraseñas deben ser iguales',
                error: true
            })
            return

        }
        if (password.length < 6) {
            setAlerta({
                msg: 'La contraseña debe ser de mínimo 6 caracteres',
                error: true
            })
            return

        }
        setAlerta({})

        //crear usuario en la api 

        try {
            const { data } = await clienteAxios.post(`/usuarios`, { nombre, password, email });
            setAlerta({
                msg: data.msg,
                error: false
            })
            setNombre('')
            setPassword('')
            setEmail('')
            setRepetirPassword('')
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

            <h1 className="text-sky-600 font-black text-6xl capitalize">Inicia Sesión y administra tus {' '}
                <span className="text-slate-700"> proyectos</span>
            </h1>
            {msg && <Alerta alerta={alerta} />}
            <form action="" className="my-10 bg-white shadow rounded-lg p-10"
                onSubmit={handleSubmit}
            >

                <div className="py-5">
                    <label
                        htmlFor="nombre"
                        className="uppercase text-gray-600 block text-xl font-bold">Nombre</label>
                    <input type="nombre"
                        id="nombre"
                        placeholder="Tu nombre"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"

                        value={nombre}
                        onChange={e => setNombre(e.target.value)} />
                </div>
                <div className="py-5">
                    <label
                        htmlFor="email"
                        className="uppercase text-gray-600 block text-xl font-bold">Email</label>
                    <input type="email"
                        id="email"
                        placeholder="Email de registro"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        value={email}
                        onChange={e => setEmail(e.target.value)} />
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
                <div className="py-5">
                    <label
                        htmlFor="password2"
                        className="uppercase text-gray-600 block text-xl font-bold">Repetir Password</label>
                    <input type="password"
                        id="password2"
                        placeholder="Repetir tu Password"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        value={repetirPassword}
                        onChange={e => setRepetirPassword(e.target.value)} />
                </div>
                <input
                    type="submit"
                    value="Crear Cuenta"
                    className="bg-sky-700 mb-5  w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors" />
            </form>

            <nav className="lg:flex lg:justify-between">

                <Link
                    to="/"
                    className="block text-center my-5 text-slate-500 uppercase text-s,"
                >
                    ¿Ya Tiene una cuenta? Inicia Sesión
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

export default Registrar
