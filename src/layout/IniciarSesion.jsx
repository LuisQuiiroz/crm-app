import React from 'react';
import { Outlet } from 'react-router-dom';

const IniciarSesion = () => {
    return (
        <div>
            <h1>iniciarsesion</h1>
            <Outlet/>
        </div>
    )
};

export default IniciarSesion;
