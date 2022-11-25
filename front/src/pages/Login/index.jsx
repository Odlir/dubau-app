import axios from 'axios'
import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { env } from '../../env.js';
import Form from "./Form.jsx";
import RegisterForm from "./RegisterForm.jsx";
import Cookies from "universal-cookie";



const Index = () => {
    const [USUA_usuario, setUSUA_usuario] = useState('');
    const [USUA_Password, setUSUA_Password] = useState('');
    const [formType, setFormType] = useState('login');

    const navigate = useNavigate()
    let token = '';

    const handleOnClickLogin = async (e) => {
        e.preventDefault();
        const endpoint = `${env.apiURL}login`
        await axios.post(endpoint, {USUA_usuario: USUA_usuario, USUA_Password: USUA_Password})
            .then(function (response) {
                token = response.data.authorisation.token;
                const cookies = new Cookies();
                cookies.set('token', token, { path: '/' });
                console.log("Successfully Logged in ");
                navigate('/test')
            })
            .catch(error => {
                alert('Usuario o Contraseña incorrectos')
            })
    }

    const handleOnClickRegister = async (e) => {
        e.preventDefault();
        const endpoint = `${env.apiURL}register`
        await axios.post(endpoint, {USUA_usuario: USUA_usuario, USUA_Password: USUA_Password})
            .then(function (response) {
                window.location.reload();
            })
            .catch(error => {
                alert('Debe completar correctamente sus datos')
            })
    }

    return (
        <div>
            {
                (formType === 'login') ?
                    <Form
                        handleOnClickLogin={handleOnClickLogin}
                        USUA_usuario={USUA_usuario}
                        setUSUA_usuario={setUSUA_usuario}
                        USUA_Password={USUA_Password}
                        setUSUA_Password={setUSUA_Password}
                        setFormType={setFormType}
                    /> :
                    <RegisterForm
                        handleOnClickRegister={handleOnClickRegister}
                        USUA_usuario={USUA_usuario}
                        setUSUA_usuario={setUSUA_usuario}
                        USUA_Password={USUA_Password}
                        setUSUA_Password={setUSUA_Password}
                        setFormType={setFormType}
                    />
            }
        </div>
    )
}

export default Index