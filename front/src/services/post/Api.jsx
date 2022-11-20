import axios from 'axios'
import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { env } from '../../env.js';
import Login from "../../pages/Login/Login.jsx";
import Cookies from "universal-cookie";

//Rute Login
const endpoint = `${env.apiURL}login`

const Api = () => {
    const [USUA_usuario, setUSUA_usuario] = useState('')
    const [USUA_Password, setUSUA_Password] = useState('')

    const navigate = useNavigate()
    let token = '';
    const store = async (e) => {
        e.preventDefault()
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



    return (
        <div>
            {/*Mando data a mi hijo*/}
            <Login store={store} USUA_usuario={USUA_usuario} setUSUA_usuario={setUSUA_usuario}   USUA_Password={USUA_Password} setUSUA_Password={setUSUA_Password}  />
        </div>
    )
}

export default Api