import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';



const VerCliente = () => {
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
      Object.keys(cliente).length === 0 ? <p>No hay resultados</p> : (
        <div>
                <h1 className="font-black text-4xl text-sky-900">Cliente: {cliente.nombre}</h1>
                
                <p className="text-3xl text-gray-600 mt-4">
                    <span className="text-gray-800  font-bold">Correo: </span>
                    {cliente.email}
                </p>
                <p className="text-3xl text-gray-600 mt-4">
                    <span className="text-gray-800  font-bold">Teléfono: </span>
                    {cliente.telefono}
                </p>
                <p className="text-3xl text-gray-600 mt-4">
                    <span className="text-gray-800  font-bold">Empresa: </span>
                    {cliente.empresa}
                </p>
                { cliente.notas && (
                    <p className="text-3xl text-gray-600 mt-4">
                        <span className="text-gray-800  font-bold">Notas: </span>
                        {cliente.notas}
                    </p>
                )}
        </div>
      )
  )
};

export default VerCliente;
