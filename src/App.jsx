import { useState } from 'react'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// import IniciarSesion from './layout/IniciarSesion';
import Layout from './layout/Layout';
import EditarCliente from './pages/EditarCliente';

import Inicio from './pages/Inicio';
// import LoginForm from './pages/LoginForm';
import NuevoCliente from './pages/NuevoCliente';
import VerCliente from './pages/VerCliente';



function App() {
    console.log(import.meta.env.VITE_API_URL);
    return (
        <BrowserRouter>
            <Routes>

                {/* <Route path="/" element={<IniciarSesion/>}>
                    <Route index element={<LoginForm/>}/>
                </Route> */}
                <Route>
                <Route path="*" element={<Navigate to="/clientes" />} />
                </Route>

                <Route path="/clientes" element={<Layout/>}>
                    <Route index element={<Inicio/>}/>
                    <Route path="nuevo" element={<NuevoCliente/>}/>
                    <Route path="editar/:id" element={<EditarCliente/>}/>
                    <Route path="ver/:id" element={<VerCliente/>}/>
                    <Route path="*" element={<Navigate to="/clientes" />} />
                </Route>

            </Routes>
        </BrowserRouter>
    )
}

export default App
