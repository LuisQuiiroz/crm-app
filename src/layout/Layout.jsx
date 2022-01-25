import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';


const Layout = () => {

    const location = useLocation();
    const urlActual = location.pathname;

    return (
        <div className="md:flex md:min-h-screen">
            <div className="md:w-1/5 bg-sky-900 px-5 py-10">
                <h2 className="text-2xl font-black text-center text-white">CRM Clientes</h2>
                <nav className="mt-10">
                    <Link 
                        className={`${urlActual === '/clientes' ? 'text-sky-300' : 'text-white'} block mt-2 hover:text-sky-300`} 
                        to="/clientes">
                            Clientes
                    </Link>
                    <Link 
                        className={`${urlActual === '/clientes/nuevo' ? 'text-sky-300' : 'text-white'} block mt-2 hover:text-sky-300`}
                        to="/clientes/nuevo">
                            Nuevo Cliente
                    </Link>
                </nav>
            </div>
            <div className="md:w-4/5 md:p-10 md:h-screen overflow-y-scroll">
            <Outlet/>
            </div>
        </div>
    )
};

export default Layout;
