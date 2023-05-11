import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import env from '../../env.js';
import Form from './Form.jsx';
import RegisterForm from './RegisterForm.jsx';
import 'sweetalert2/src/sweetalert2.scss';

function Index() {
    const [person_Name, setPerson_Name] = useState('');
    const [person_LastNamePaternal, setPerson_LastNamePaternal] = useState('');
    const [person_LastNameMaternal, setPerson_LastNameMaternal] = useState('');
    const [user_Name, setUser_Name] = useState('');
    const [user_Password, setUser_Password] = useState('');
    const [formType, setFormType] = useState('login');

    const [user_ApprovedStatus, setUser_ApprovedStatus] = useState('0');
    const [user_StatusID, setUser_StatusID] = useState('1');
    const navigate = useNavigate();

    const handleOnClickLogin = async (e) => {
        e.preventDefault();
        let token = '';
        const endpoint = `${env.apiURL}login`;
        await axios
            .post(endpoint, { user_Name, user_Password })
            .then((response) => {
                token = response.data.authorisation.token;
                const cookies = new Cookies();
                cookies.set('token', token, { path: '/' });
                console.log('Successfully Logged in ');
                navigate('/dashboard');
            })
            .catch((error) => {
                alert('Usuario o Contraseña incorrectos');
            });
    };

    const handleOnClickRegister = async (e) => {
        e.preventDefault();
        const endpoint = `${env.apiURL}register`;
        await axios
            .post(endpoint, {
                user_Name,
                user_Password,
                person_Name,
                person_LastNamePaternal,
                person_LastNameMaternal,
                user_ApprovedStatus: '0',
                user_StatusID: '1',
            })
            .then((response) => {
                Swal.fire(
                    'Sucess!',
                    'Usuario creado correctamente.',
                    'success'
                ).then((result) => {
                    window.location.reload();
                });
            })
            .catch((error) => {
                alert('Debe completar correctamente sus datos');
            });
    };

    return (
        <div>
            {formType === 'login' ? (
                <Form
                    handleOnClickLogin={handleOnClickLogin}
                    user_Name={user_Name}
                    setUser_Name={setUser_Name}
                    user_Password={user_Password}
                    setUser_Password={setUser_Password}
                    setFormType={setFormType}
                />
            ) : (
                <RegisterForm
                    handleOnClickRegister={handleOnClickRegister}
                    person_Name={person_Name}
                    setPerson_Name={setPerson_Name}
                    person_LastNamePaternal={person_LastNamePaternal}
                    setPerson_LastNamePaternal={setPerson_LastNamePaternal}
                    person_LastNameMaternal={person_LastNameMaternal}
                    setPerson_LastNameMaternal={setPerson_LastNameMaternal}
                    user_Name={user_Name}
                    setUser_Name={setUser_Name}
                    user_Password={user_Password}
                    setUser_Password={setUser_Password}
                    setFormType={setFormType}
                />
            )}
        </div>
    );
}

export default Index;
