import React from "react";

import loginImg from "../../assets/fondo_login.png";

// import Login from "./pages/logeo/Login";

export default function Registro() {

    const handleClick = (e) => {
        e.preventDefault();
        console.log('hola 1');
      }


    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
                <div className='hidden sm:block' >
                    <img className='w-full h-full object-cover' src={loginImg} alt="" />
                </div>
        
                <div className='bg-amber-400 flex flex-col justify-center'>
                        
                        <form className='max-w-[400px] w-full mx-auto rounded-lg bg-black p-8 px-8'>
                                    <div class="grid grid-cols-2 divide-x">
                                        <div className="text-left">
                                            
                                            <button type="button" className='text-2xl text-amber-700 font-bold '  onClick={handleClick}>
                                            REGISTRO
                                            </button>

                                        </div>
                                        <div className="text-right" onClick="">
                                            
                                            <button type="button" className='text-2xl text-amber-700 font-bold '  onClick={handleClick}>
                                            LOGIN
                                            </button>

                                            
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1">

                                            <div className='flex flex-col text-gray-400 py-2'>
                                                <label>Usuario</label>
                                                <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="text" />
                                            </div>
                                            <div className='flex flex-col text-gray-400 py-2'>
                                                <label>Email</label>
                                                <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="text" />
                                            </div>
                                            <div className='flex flex-col text-gray-400 py-2'>
                                                <label>Contraseña</label>
                                                <input className='p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="password" />
                                            </div>
                                            <div className='flex justify-between text-gray-400 py-2'>
                                                <p className='flex items-center'><input className='mr-2' type="checkbox" /> Recuérdame</p>
                                                <p className="indent-0.5" >Has olvidado tu contraseña</p>
                                            </div>
                                            <button className='w-full my-5 py-2 bg-red-700 shadow-lg shadow-bg-red-700/50 hover:shadow-bg-red-700/40 text-white font-semibold rounded-lg'>REGISTRARSE</button>  

                                    </div>
                        </form>
                </div>
        </div>
    );
  }
