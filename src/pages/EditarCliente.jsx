import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Formulario from '../components/Formulario';
import Spinner from '../components/Spinner';

const EditarCliente = () => {

    const [cliente, setCliente] = useState({});
    const [cargando, setCargando] = useState(false);

    const { id } = useParams();

    useEffect( () => {
        const obtenerClienteAPI = async () => {
            setCargando(true);
            try {
                const url = `${ import.meta.env.VITE_API_URL }/${id}`;
                const respuesta = await fetch(url);
                const resultado = await respuesta.json();
                setCliente(resultado);

            } catch (error) {
                console.log(error);
            }
            
            setCargando(false);
        }
        obtenerClienteAPI();
    }, [])

    return (
        cargando ? <Spinner/> : 
        Object.keys(cliente).length === 0 ? 
            <h1 className="font-black text-3xl text-sky-900 text-center mb-5">No existe un cliente con el id "{id}"</h1>: 
            (<div>
                <h1 className="font-black text-3xl text-sky-900 text-center mb-5">Editando a {cliente.nombre}</h1>

                <Formulario
                    cliente={cliente}
                />

            </div>)
    )
};

export default EditarCliente;
