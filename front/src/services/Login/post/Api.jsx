import axios from 'axios'
import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { env } from '../../../env.js';
import Login from "../../../pages/Login/Form.jsx";
import Cookies from "universal-cookie";

//Rute Form
const endpoint = `${env.apiURL}login`

const Api = () => {
    const [user_Name, setUser_Name] = useState('')
    const [user_Password, setUser_Password] = useState('')

    const navigate = useNavigate()
    let token = '';
    const store = async (e) => {
        e.preventDefault()
        await axios.post(endpoint, {user_Name: user_Name, user_Password: user_Password})
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
            <Login store={store} user_Name={user_Name} setUser_Name={setUser_Name}   user_Password={user_Password} setUser_Password={setUser_Password}  />
        </div>
    )
}

export default Api