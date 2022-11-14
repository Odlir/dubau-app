import React, { useState } from "react";

import Input from "../../componentes/Input/Input";
import Boton from "../../componentes/Button/Button";

import logoUrl from "@/assets/images/logo.svg";
import illustrationUrl from "@/assets/images/illustration.svg";

const Login = (props) => {
    const {store, USUA_usuario, setUSUA_usuario, USUA_Password, setUSUA_Password} = props;

    const handleChange = (e) => {
      console.log(e.target.value);

      const { USUA_usuario, value } = e.target;
      setUSUA_usuario((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    return (
        <div>

        <div className="container sm:px-10">
          <div className="block xl:grid grid-cols-2 gap-4">
            {/* BEGIN: Login Info */}
            <div className="hidden xl:flex flex-col min-h-screen">
              <a href="" className="-intro-x flex items-center pt-5">
                <img
                  alt="Midone Tailwind HTML Admin Template"
                  className="w-6"
                  src={logoUrl}
                />
                <span className="text-white text-lg ml-3"> Dubau </span>
              </a>
              <div className="my-auto">
                <img
                  alt="Midone Tailwind HTML Admin Template"
                  className="-intro-x w-1/2 -mt-16"
                  src={illustrationUrl}
                />
                <div className="-intro-x text-white font-medium text-4xl leading-tight mt-10">
                Unos clics más para <br />
                Iniciar sesión en su cuenta.
                </div>
                <div className="-intro-x mt-5 text-lg text-white text-opacity-70 dark:text-slate-400">
                Administre todas sus cuentas de comercio electrónico en un solo lugar
                </div>
              </div>
            </div>
            {/* END: Login Info */}
            {/* BEGIN: Login Form */}
            <div className="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
              <div className="my-auto mx-auto xl:ml-20 bg-white dark:bg-darkmode-600 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto">
                    <h2 className="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">
                    Iniciar
                    </h2>
                    <div className="intro-x mt-2 text-slate-400 xl:hidden text-center">
                    Unos pocos clics más para iniciar sesión en su cuenta. Gestiona todos tus
                    cuentas de comercio electrónico en un solo lugar
                    </div>
                <form onSubmit={store}>

                    <div className="intro-x mt-8">
                                <input
                                    type="text"
                                    className="intro-x login__input form-control py-3 px-4 block"
                                    placeholder="USUARIO"
                                    value={USUA_usuario}
                                    onChange={ (e)=> setUSUA_usuario(e.target.value)}
                                />
                                    
                                    {/* <Input
                                      type="text"
                                      value={USUA_usuario}
                                      placeholder="Usuario"
                                      name={USUA_usuario}
                                      onChange={handleChange}
                                    /> */}
                            
                            <input
                                type="password"
                                className="intro-x login__input form-control py-3 px-4 block mt-4"
                                placeholder="CONTRASEÑA"
                                value={USUA_Password}
                                onChange={ (e)=> setUSUA_Password(e.target.value)}
                            />
                    </div>
                    <div className="intro-x flex text-slate-600 dark:text-slate-500 text-xs sm:text-sm mt-4">
                        <div className="flex items-center mr-auto">
                            <input
                            id="remember-me"
                            type="checkbox"
                            className="form-check-input border mr-2"
                            />
                            <label
                            className="cursor-pointer select-none"
                            htmlFor="remember-me"
                            >
                            Recordar
                            </label>
                        </div>
                        <a href="">¿Olvidaste tu contraseña?</a>
                    </div>
                    <div className="intro-x mt-5 xl:mt-8 text-center xl:text-left">
                          <Boton
                          type='submit'
                          titulo='iniciar sesión'
                            className="btn btn-primary py-3 px-4 w-full xl:w-32 xl:mr-3 align-top"
                          />
                          {/* <Boton
                            titulo='Registrarte'
                            className="btn btn-outline-secondary py-3 px-4 w-full xl:w-32 mt-3 xl:mt-0 align-top"
                          /> */}
                    </div>
                 </form>

                    <div className="intro-x mt-10 xl:mt-24 text-slate-600 dark:text-slate-500 text-center xl:text-left">
                    Al registrarse, usted acepta nuestros
                    <a className="text-primary dark:text-slate-200" href="">
                        Terminos and Condiciones &nbsp;
                    </a>
                    & 
                    <a className="text-primary dark:text-slate-200" href="">
                    &nbsp; Politica de Privacidad
                    </a>
                    </div>
              </div>
            </div>
            {/* END: Login Form */}
          </div>
        </div>


        </div>
    )
}
export default Login;

    // <section className="bg-gray-50 dark:bg-gray-900">
    //     <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    //         <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
    //             <img className="mr-2" style={{ height: '9rem' , width: '12rem' }} src="http://www.dubaumetalindustria.com/dubau/assets/media/logos/logo-light.png?1"
    //                 alt="logo"/>

    //         </a>
    //         <div
    //             className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
    //             <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
    //                 <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
    //                     Sign in to your account
    //                 </h1>
    //                 <form className="space-y-4 md:space-y-6" onSubmit={store}>
    //                     <div>
    //                         <label htmlFor="email"
    //                             className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
    //                             username</label>
    //                         {/*    <input type="text" name="email" id="email"
    //                             className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //                             placeholder="name@company.com"
    //                             value={USUA_usuario}
    //                             onChange={ (e)=> setUSUA_usuario(e.target.value)}
    //                             required=""/>
    //                         */}
    //                         <Input 
    //                             type='text' 
    //                             className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
    //                             placeholder='ingresa tu correo'
    //                             value={USUA_usuario}
    //                             id='input_correo'
    //                         />
    //                     </div>
    //                     <div>
    //                         <label htmlFor="password"
    //                             className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
    //                         {/* <input type="password" name="password" id="password" placeholder="••••••••"
    //                             className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //                             value={USUA_Password}
    //                             onChange={ (e)=> setUSUA_Password(e.target.value)}
    //                             required=""/> */}
    //                         <Input 
    //                             type='password' 
    //                             className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
    //                             placeholder='ingresa tu contraseña'
    //                             value={USUA_Password}
    //                             id='input_password'
    //                         />



    //                     </div>
    //                     <div className="flex items-center justify-between">
    //                         <a href="#"
    //                         className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot
    //                             password?</a>
    //                     </div>


    //                     <Boton 
    //                         type='submit'
    //                         className='w-full text-white btn-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
    //                         titulo='registrate'   
    //                     />
    //                 </form>
    //             </div>
    //         </div>
    //     </div>
    // </section>