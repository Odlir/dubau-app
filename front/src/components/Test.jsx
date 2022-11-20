import React, { useState } from "react";
import Cookies from 'universal-cookie';
import Button from "../components/Button/Button";
import axios from "axios";
import {env} from "../env.js";
const Test = () => {
//Rute Login
    const endpoint = `${env.apiURL}`

    const cookies = new Cookies();
    const token = cookies.get('token');

    const http = axios.create({
        baseURL:endpoint,
        headers:{
            "Content-type" : "application/json",
            "Authorization" : `Bearer ${token}`
        }
    });
    console.log(http);

    http.get('ruta')
            .then(function (response) {
                console.log(response);
                console.log("Successfully Logged in ");
            })
            .catch(error => {
                alert('Usuario o Contraseña incorrectos')
            })


    return (
        <div>
            <p>Hola mundoss - DUB</p>
            <p></p>
            <Button   />
        </div>
)
}
export default Test;