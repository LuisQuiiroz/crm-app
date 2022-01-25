import React from 'react';

import { useNavigate } from 'react-router-dom';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import Alerta from './Alerta';


const Formulario = ({ cliente }) => {

    const navigate = useNavigate();

    const nuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string()
                    .min(3, 'El nombre es muy corto')
                    .max(20, 'El nombre es muy largo')
                    .required('El nombre del cliente es obligatorio'),
        empresa: Yup.string()
                    .required('El nombre de la empresa es obligatorio'),
        email: Yup.string()
                    .email('Correo no válido')
                    .required('El correo es obligatorio'),
        telefono: Yup.number()
                    .positive('Número no válido')
                    .integer('Número no válido')
                    .typeError('Número no válido')
    });

    const handleSubmit = async ( valores ) => {
        try {
            let respuesta;
            if (cliente?.id) {
                // Editando
                const url = `${ import.meta.env.VITE_API_URL }/${cliente.id}`;
                respuesta = await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(valores),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            } else {
                // Nuevo registro
                const url = import.meta.env.VITE_API_URL;
                respuesta = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(valores),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            }
            const resultado = await respuesta.json();
            navigate('/clientes');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="bg-white px-5 py-10 rounded-md shadow-md md:w-4/5 mx-auto">
            <h1 className="text-gray-600 font-bold text-lg uppercase text-center">
                {cliente ? 'Editar cliente' : 'Agregar cliente'}
            </h1>
            <Formik
                initialValues={{
                    nombre: cliente?.nombre || '',
                    empresa: cliente?.empresa || '',
                    email: cliente?.email || '',
                    telefono: cliente?.telefono || '',
                    notas: cliente?.notas || ''
                }}
                enableReinitialize={true}
                onSubmit={ async (valores, {resetForm}) => {
                    await handleSubmit( valores );
                    resetForm();
                }}
                validationSchema={nuevoClienteSchema}
                >
                { ({ errors, touched }) => {
                    return ( 
                    <Form className="mt-10" autoComplete="off">
                        <div className="mb-4">
                            <label className="text-gray-800" htmlFor="nombre">Nombre:</label>
                            <Field
                                id="nombre"
                                type="text"
                                className="mt-2 block w-full p-3 bg-gray-50"
                                placeholder="Nombre del Cliente"
                                name="nombre"
                            />
                            {errors.nombre && touched.nombre ? (
                                <Alerta>
                                    {errors.nombre}
                                </Alerta>
                            ) : null }
                        </div>
                        <div className="mb-4">
                            <label className="text-gray-800" htmlFor="empresa">Empresa:</label>
                            <Field
                                id="empresa"
                                type="text"
                                className="mt-2 block w-full p-3 bg-gray-50"
                                placeholder="Empresa del Cliente"
                                name="empresa"
                            />
                            {errors.empresa && touched.empresa ? (
                                <Alerta>
                                    {errors.empresa}
                                </Alerta>
                            ) : null }
                        </div>
                        <div className="mb-4">
                            <label className="text-gray-800" htmlFor="email">Correo:</label>
                            <Field
                                id="email"
                                type="email"
                                className="mt-2 block w-full p-3 bg-gray-50"
                                placeholder="Correo del Cliente"
                                name="email"
                            />
                            {errors.email && touched.email ? (
                                <Alerta>
                                    {errors.email}
                                </Alerta>
                            ) : null }
                        </div>
                        <div className="mb-4">
                            <label className="text-gray-800" htmlFor="telefono">Télefono:</label>
                            <Field
                                id="telefono"
                                type="number"
                                className="mt-2 block w-full p-3 bg-gray-50"
                                placeholder="Número de 10 digitos"
                                name="telefono"
                            />
                            {errors.telefono && touched.telefono ? (
                                <Alerta>
                                    {errors.telefono}
                                </Alerta>
                            ) : null }
                        </div>
                        <div className="mb-4">
                            <label className="text-gray-800" htmlFor="notas">Notas:</label>
                            <Field
                                as="textarea"
                                id="notas"
                                type="text"
                                className="mt-2 block w-full p-3 bg-gray-50 h-40"
                                placeholder="Notas del Cliente"
                                name="notas"
                            />
                        </div>
                        <input 
                            type="submit" 
                            value={cliente ? 'Editar cliente' : 'Agregar cliente'}

                            className="mt-5 w-full bg-sky-800 p-3 text-white uppercase font-bold "
                            />
                    </Form>
                )}}
            </Formik>
        </div>
    )
};

export default Formulario;
