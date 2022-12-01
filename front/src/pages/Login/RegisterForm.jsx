import React, {useEffect} from "react";
import logoUrl from "@/assets/images/logo.svg";
import illustrationUrl from "@/assets/images/logo.png";
import illustrationUrl2 from "@/assets/images/illustration.svg";
import Button from "../../components/Button/Button.jsx";
import Input from "../../components/Input/Input.jsx";

const Form = (props) => {
    const {
        handleOnClickRegister,
        setFormType,
        person_Name,
        setPerson_Name,
        person_LastNamePaternal,
        setPerson_LastNamePaternal,
        person_LastNameMaternal,
        setPerson_LastNameMaternal,
        user_Name,
        setUser_Name,
        user_Password,
        setUser_Password
    } = props;

    const handleOnClickViewRegister = () => {
        setFormType('login');
    }

    return (
        <form className="space-y-4 md:space-y-6">
            <div className="login">
                <div className="container sm:px-10">
                    <div className="block xl:grid grid-cols-2 gap-4">

                        {/* BEGIN: Form Info */}
                        <div className="hidden xl:flex flex-col min-h-screen">
                            <a href="" className="-intro-x flex items-center pt-5">
                                <img
                                    alt="Midone Tailwind HTML Admin Template"
                                    className="w-6"
                                    src={logoUrl}
                                />
                                <span className="text-white text-lg ml-3"> DUBAU PERU </span>
                            </a>
                            <div className="my-auto">
                                <img
                                    alt="Midone Tailwind HTML Admin Template"
                                    className="-intro-x w-1/2 -mt-16"
                                    src={illustrationUrl2}
                                />
                                {<div className="-intro-x text-white font-medium text-4xl leading-tight mt-10">
                                    DUBAU PERU DP <br/>
                                </div>}
                                <div
                                    className="-intro-x mt-5 text-lg text-white text-opacity-70 dark:text-slate-400">
                                    Nos dedicamos a la importación, distribución y
                                    <br/>
                                    comercialización de productos de ferretería,
                                    <br/>
                                    metal industria y afines.
                                </div>


                            </div>
                        </div>
                        {/* END: Form Info */}
                        {/* BEGIN: Form Form */}

                        <div className="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
                            <div
                                className="my-auto mx-auto xl:ml-20 bg-white dark:bg-darkmode-600 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto">

                                <div className="grid place-items-center ">
                                    <img
                                        alt="Midone Tailwind HTML Admin Template"
                                        className="-intro-x w-1/2 -mt-16"
                                        src={illustrationUrl}
                                    />
                                </div>

                                <div className="intro-x mt-2 text-slate-400 xl:hidden text-center">
                                    {/*  A few more clicks to sign in to your account. Manage all your
                                        e-commerce accounts in one place*/}
                                </div>
                                <div className="intro-x mt-8">
                                    <Input dataType={'text'} dataName={'emails'} dataId={'emails'}
                                           dataPlaceholder={'Nombres'} dataValue={person_Name}
                                           dataOnchange={setPerson_Name}/>
                                </div>
                                <div className="intro-x mt-8">
                                    <Input dataType={'text'} dataName={'emaila'} dataId={'emailas'}
                                           dataPlaceholder={'Apellido Paterno'} dataValue={person_LastNamePaternal}
                                           dataOnchange={setPerson_LastNamePaternal}/>
                                </div>
                                <div className="intro-x mt-8">
                                    <Input dataType={'text'} dataName={'emailsa'} dataId={'emailsa'}
                                           dataPlaceholder={'Apellido Materno'} dataValue={person_LastNameMaternal}
                                           dataOnchange={setPerson_LastNameMaternal}/>
                                </div>
                                <div className="intro-x mt-8">
                                    <Input dataType={'email'} dataName={'email'} dataId={'email'}
                                           dataPlaceholder={'name@company.com'} dataValue={user_Name}
                                           dataOnchange={setUser_Name}/>
                                </div>
                                <div className="intro-x mt-8">
                                    <Input dataType={'password'} dataName={'password'} dataId={'password'}
                                           dataPlaceholder={'*********'} dataValue={user_Password}
                                           dataOnchange={setUser_Password}/>
                                </div>
                                <div
                                    className="intro-x flex text-slate-600 dark:text-slate-500 text-xs sm:text-sm mt-4">
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
                                            Recuerdame
                                        </label>
                                    </div>
                                    <a href="">Olvido su contraseña?</a>
                                </div>
                                <div className="intro-x mt-5 xl:mt-8 text-center xl:text-left">
                                    <Button
                                        textName='Registrarse'
                                        onClick={handleOnClickRegister}

                                    />
                                    <Button
                                        textName='Ingresar'
                                        onClick={handleOnClickViewRegister}
                                        color='btn-light'
                                    />
                                </div>
                                <div
                                    className="intro-x mt-10 xl:mt-24 text-slate-600 dark:text-slate-500 text-center xl:text-left">
                                    Al registrarse, acepta nuestros
                                    <a className="text-primary dark:text-slate-200" href="">
                                        Términos y condiciones
                                    </a>
                                    &
                                    <a className="text-primary dark:text-slate-200" href="">
                                        Política de privacidad
                                    </a>
                                </div>

                            </div>
                        </div>

                        {/* END: Form Form */}

                    </div>
                </div>
            </div>
        </form>
    )
}
export default Form;