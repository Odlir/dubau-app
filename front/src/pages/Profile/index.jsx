import React, { useState } from 'react';
import axios from 'axios';
import env from '@/env.js';
import 'sweetalert2/src/sweetalert2.scss';
import Cookies from 'universal-cookie';
import { Lucide, TabGroup } from '@/components/base-components/index.js';
import profileimg from '@/assets/images/profile-8.jpg';
import Edit from './edit.jsx';

function Index() {
    /* TOken */
    const cookies = new Cookies();

    const [user_ID, setUser_ID] = useState('');
    const [user_Name, setUser_Name] = useState('');
    const [person_ID, setPerson_ID] = useState('');
    const [person_Name, setPerson_Name] = useState('');
    const [person_LastNamePaternal, setPerson_LastNamePaternal] = useState('');
    const [person_LastNameMaternal, setPerson_LastNameMaternal] = useState('');
    const [person_Email, setPerson_Email] = useState('');
    const [person_Phone, setPerson_Phone] = useState('');
    const [person_CellPhone, setPerson_CellPhone] = useState('');
    const [person_Direction, setPerson_Direction] = useState('');
    /* Const Person */

    /* Const Type form */
    const [formType, setFormType] = useState('profile');
    /* Const Type form */

    const handleOnClickMe = async () => {
        const token = cookies.get('token');
        const endpoint = `${env.apiURL}me`;
        await axios
            .get(endpoint, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setUser_ID(response.data.user.user_ID);
                setUser_Name(response.data.user.user_Name);
                setPerson_ID(response.data.person.person_ID);
                setPerson_Name(response.data.person.person_Name);
                setPerson_LastNamePaternal(
                    response.data.person.person_LastNamePaternal
                );
                setPerson_LastNameMaternal(
                    response.data.person.person_LastNameMaternal
                );
                setPerson_Email(response.data.person.person_Email);
                setPerson_Phone(response.data.person.person_Phone);
                setPerson_CellPhone(response.data.person.person_CellPhone);
                setPerson_Direction(response.data.person.person_Direction);
            })
            .catch(() => {
                alert('La conection ha fallado');
            });
    };

    const verifyFormType = async () => {
        if (formType === 'profile') {
            handleOnClickMe();
        }
    };
    verifyFormType();

    const handleOnClickAccount = () => {
        setFormType('editAccount');
    };

    const handleOnClickProfile = () => {
        setFormType('profile');
    };

    const handleOnClickUpdate = async (e) => {
        e.preventDefault();
        const endpoint = `${env.apiURL}updatePersonAndUser`;
        await axios
            .post(
                endpoint,
                {
                    user_ID,
                    user_Name,
                    person_ID,
                    person_Name,
                    person_LastNamePaternal,
                    person_LastNameMaternal,
                    person_Email,
                    person_Direction,
                    person_Phone,
                    person_CellPhone,
                },
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            )
            .then(() => {
                window.location.reload();
            })
            .catch(() => {
                alert('Debe completar correctamente sus datos');
            });
    };

    return (
        <>
            <div className="intro-y flex items-center mt-8">
                <h2 className="text-lg font-medium mr-auto">Mi perfil</h2>
            </div>
            <TabGroup>
                {/* BEGIN: Profile Info */}
                <div className="intro-y box px-5 pt-5 mt-5">
                    <div className="flex flex-col lg:flex-row border-b border-slate-200/60 dark:border-darkmode-400 pb-5 -mx-5">
                        <div className="flex flex-1 px-5 items-center justify-center lg:justify-start">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 flex-none lg:w-32 lg:h-32 image-fit relative">
                                <img
                                    alt="Midone Tailwind HTML Admin Template"
                                    className="rounded-full"
                                    src={profileimg}
                                />
                            </div>
                            <div className="ml-5">
                                <div className="w-24 sm:w-40 truncate sm:whitespace-normal font-medium text-lg">
                                    {user_Name}
                                </div>
                                <div className="text-slate-500">{`${person_LastNamePaternal}  ${person_LastNameMaternal} , ${person_Name}`}</div>
                            </div>
                        </div>
                        <div className="mt-6 lg:mt-0 flex-1 px-5 border-l border-r border-slate-200/60 dark:border-darkmode-400 border-t lg:border-t-0 pt-5 lg:pt-0">
                            <div className="font-medium text-center lg:text-left lg:mt-3">
                                Detalles de Contacto
                            </div>
                            <div className="flex flex-col justify-center items-center lg:items-start mt-4">
                                <div className="truncate sm:whitespace-normal flex items-center">
                                    <Lucide
                                        icon="Mail"
                                        className="w-4 h-4 mr-2"
                                    />
                                    {person_Email}
                                </div>
                                <div className="truncate sm:whitespace-normal flex items-center mt-3">
                                    <Lucide
                                        icon="Home"
                                        className="w-4 h-4 mr-2"
                                    />{' '}
                                    {person_Direction}
                                </div>
                                <div className="truncate sm:whitespace-normal flex items-center mt-3">
                                    <Lucide
                                        icon="Phone"
                                        className="w-4 h-4 mr-2"
                                    />
                                    {person_Phone} | {person_CellPhone}
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 lg:mt-0 flex-1 flex items-center justify-center px-5 border-t lg:border-0 border-slate-200/60 dark:border-darkmode-400 pt-5 lg:pt-0">
                            <div className="text-center rounded-md w-20 py-3">
                                <div className="font-medium text-primary text-xl">
                                    0
                                </div>
                                <div className="text-slate-500">
                                    Valoraciones
                                </div>
                            </div>
                        </div>
                    </div>
                    <ul
                        className="nav nav-link-tabs flex-col sm:flex-row justify-center lg:justify-start text-center"
                        role="tablist"
                    >
                        <li
                            id="profile-tab"
                            className="nav-item"
                            role="presentation"
                            onClick={handleOnClickProfile}
                        >
                            <button
                                className="nav-link py-4 flex items-center "
                                data-tw-target="#profile"
                                aria-controls="profile"
                                aria-selected="true"
                                role="tab"
                            >
                                <Lucide icon="User" className="w-4 h-4 mr-2" />{' '}
                                Perfil
                            </button>
                        </li>
                        <li
                            id="profile-tab"
                            className="nav-item"
                            role="presentation"
                            onClick={handleOnClickAccount}
                        >
                            <button
                                className="nav-link py-4 flex items-center "
                                data-tw-target="#profile"
                                aria-controls="profile"
                                aria-selected="true"
                                role="tab"
                            >
                                <Lucide
                                    icon="Shield"
                                    className="w-4 h-4 mr-2"
                                />{' '}
                                Account
                            </button>
                        </li>
                        <li
                            id="profile-tab"
                            className="nav-item"
                            role="presentation"
                            onClick={handleOnClickMe}
                        >
                            <button
                                className="nav-link py-4 flex items-center "
                                data-tw-target="#profile"
                                aria-controls="profile"
                                aria-selected="true"
                                role="tab"
                            >
                                <Lucide icon="Lock" className="w-4 h-4 mr-2" />{' '}
                                Change Password
                            </button>
                        </li>
                        <li
                            id="profile-tab"
                            className="nav-item"
                            role="presentation"
                            onClick={handleOnClickMe}
                        >
                            <button
                                className="nav-link py-4 flex items-center "
                                data-tw-target="#profile"
                                aria-controls="profile"
                                aria-selected="true"
                                role="tab"
                            >
                                <Lucide
                                    icon="Settings"
                                    className="w-4 h-4 mr-2"
                                />{' '}
                                Settings
                            </button>
                        </li>
                    </ul>
                </div>
                {/* END: Profile Info */}
            </TabGroup>
            {formType === 'editAccount' ? (
                <Edit
                    user_Name={user_Name}
                    setUser_Name={setUser_Name}
                    person_Name={person_Name}
                    setPerson_Name={setPerson_Name}
                    person_LastNamePaternal={person_LastNamePaternal}
                    setPerson_LastNamePaternal={setPerson_LastNamePaternal}
                    person_LastNameMaternal={person_LastNameMaternal}
                    setPerson_LastNameMaternal={setPerson_LastNameMaternal}
                    person_Email={person_Email}
                    setPerson_Email={setPerson_Email}
                    person_Phone={person_Phone}
                    setPerson_Phone={setPerson_Phone}
                    person_CellPhone={person_CellPhone}
                    setPerson_CellPhone={setPerson_CellPhone}
                    person_Direction={person_Direction}
                    setPerson_Direction={setPerson_Direction}
                    handleOnClickProfile={handleOnClickProfile}
                    handleOnClickUpdate={handleOnClickUpdate}
                />
            ) : (
                <p />
            )}
        </>
    );
}

export default Index;
