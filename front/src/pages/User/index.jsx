import React, {useEffect, useState} from 'react';
import axios from "axios";
import DataTable from 'react-data-table-component';
import {env} from "@/env.js";
import columns from '../../data/Users.jsx';
import Preload from "@/components/preload/preload";
import Button from "@/components/Button/Button.jsx";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { useNavigate } from 'react-router-dom';
import Add  from '../User/add.jsx'
import Input from "@/components/Input/Input";


const Index = () => {
    const navigate = useNavigate()

    const [user_Name, setUser_Name] = useState('');
    const [user_Password, setUser_Password] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');
    const [user_CreationDate, setUserCreationDate] = useState('');
    const [user_ApprovedStatus, setUser_ApprovedStatus] = useState('1');
    const [formType, setFormType] = useState('list');
    /*Server Side*/
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [page_, setPage_] = useState(1);
    const [dataxUser, setdataxUser] = useState('');

    const fetchUsers = async page => {
        setLoading(true);
        const endpoint = `${env.apiURL}list`;
        const response = await axios.get(`${endpoint}?page=${page}&per_page=${perPage}`);
        setData(response.data.data);
        setPage_(response.data.page);
        setTotalRows(response.data.total);
        setLoading(false);
    };

    const handlePageChange = page => {
        fetchUsers(page);
    };

    const handlePerRowsChange = (rows) => {
        setLoading(true);
        setPerPage(rows);
    };

    useEffect(() => {
        fetchUsers(page_);
    }, []);

    useEffect(() => {
        fetchUsers(page_);
    }, [perPage]);

    const actionVerify = async (user_ID) => {
        Swal.fire({
            title: 'Que accion desea realizar?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Aprobar',
            denyButtonText: `Desaprobar`,
        }).then((result) => {
            if (result.isConfirmed) {
                const endpoint = `${env.apiURL}verifyUser`;
                 axios.post(endpoint, {user_ID: user_ID, user_ApprovedStatus: 1})
                    .then(function (response) {
                        fetchUsers(page_);
                    })
                    .catch(error => {
                        alert('Operacion no completada')
                    })
                Swal.fire('Usuario Verificado!', ' ', 'success')
            } else if (result.isDenied) {
                const endpoint = `${env.apiURL}verifyUser`;
                axios.post(endpoint, {user_ID: user_ID, user_ApprovedStatus: 0})
                    .then(function (response) {
                        fetchUsers(page_);
                    })
                    .catch(error => {
                        alert('Operacion no completada')
                    })
                Swal.fire('Usuario desaprobado', '', 'error')
            }
        })
    }

    const actionDelete = async (user_ID) => {
        Swal.fire({
            title: 'Desea realizar esta accion?',
            text: "No podra revertir los cambios!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Si, Eliminar!'
        }).then((result) => {
            if (result.isConfirmed) {
                const endpoint = `${env.apiURL}deleteUser`;
                axios.post(endpoint, {user_ID: user_ID, user_StatusID: 0})
                    .then(function (response) {
                        fetchUsers(page_);
                    })
                    .catch(error => {
                        alert('Operacion no completada')
                    })
                Swal.fire(
                    'Eliminado!',
                    'Se ha eliminado Correctamente.',
                    'success'
                )
            }
        })
    }
    const actionEdit = async (user_ID) => {
        const endpoint = `${env.apiURL}listXUser`;
        const response = await axios.get(`${endpoint}?user_ID=${user_ID}`);
        setdataxUser(response.data.user_ID);
        setUser_Name(response.data.user_Name);
        setFormType('edit');
    }
    const actionAdd = async () => {
        setFormType('register');
       /* navigate('/addUser')*/
    }

    const handleOnClickRegister = async (e) => {
        e.preventDefault();
        const endpoint = `${env.apiURL}register`
        await axios.post(endpoint, {user_Name: user_Name, user_Password: user_Password, user_ApprovedStatus: user_ApprovedStatus,user_StatusID: '1'})
            .then(function (response) {
                window.location.reload();
            })
            .catch(error => {
                alert('Debe completar correctamente sus datos')
            })
    }

    const handleOnClickUpdate = async (e) => {
        e.preventDefault();
        const endpoint = `${env.apiURL}updateUser`
        await axios.post(endpoint, {user_ID:dataxUser, user_Name: user_Name, user_Password: user_Password, user_ApprovedStatus: user_ApprovedStatus})
            .then(function (response) {
                window.location.reload();
            })
            .catch(error => {
                alert('Debe completar correctamente sus datos')
            })
    }

    const captureType = (e) => {
        setUser_ApprovedStatus(e.target.value);
    }

    const handleOnClickSearch = async page => {
        setLoading(true);

        const endpoint = `${env.apiURL}list`;
        const response = await axios.get(`${endpoint}?page=${page_}&per_page=${perPage}&user_Name=${user_Name}&user_CreationDate=${user_CreationDate}&user_ApprovedStatus=${user_ApprovedStatus}`);
        setData(response.data.data);
        setPage_(response.data.page);
        setTotalRows(response.data.total);
        setLoading(false);
    };

    const handleOnClickClean= async page => {
        setLoading(true);
        setUser_Name('');
        setUser_Password('');
        setUser_ApprovedStatus('');
        setUserCreationDate('');
        fetchUsers(1);
        setLoading(false);
    };
    console.log(user_ApprovedStatus);

    return (
        <div>
            { (formType === 'list') ?
                <>
                    <h2 className="intro-y text-lg font-medium mt-10">
                        Listado de Usuarios
                    </h2>
                    <div className="grid grid-cols-12 gap-6 mt-5">
                        <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2 ">
                            <div className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
                                <div className="w-56 relative text-slate-500">
                                    <Input dataType={'email'} dataName={'email'} dataId={'email'} className={'form-control w-56 box pr-10'}
                                           dataPlaceholder={'name@company.com'} dataValue={user_Name}
                                           dataOnchange={setUser_Name}/>
                                    <i className="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0 btn-primary"
                                       data-lucide="search"></i>
                                </div>
                            </div>
                            <div className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0 p-1">
                                <div className="w-56 relative text-slate-500 p-1">
                                    <Input dataType={'date'} dataName={'email'} dataId={'email'} className={'form-control w-56 box pr-10'}
                                           dataPlaceholder={'2022-11-08'} dataValue={user_CreationDate}
                                           dataOnchange={setUserCreationDate}/>
                                    <i className="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0 btn-primary"
                                       data-lucide="search"></i>
                                </div>
                            </div>
                            <div className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0 p-1">
                                <div className="w-56 relative text-slate-500 p-1">
                                    <div className="w-full mt-3 xl:mt-0 flex-1">
                                        <div className="w-full">
                                            <select className="form-select w-full" onChange={captureType}>
                                                <option value="1">Aprobado</option>
                                                <option value="0">En Espera</option>
                                            </select>
                                        </div>
                                    </div>
                                    <i className="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0 btn-primary"
                                       data-lucide="search"></i>
                                </div>
                            </div>
                            <div className="hidden md:block mx-auto text-slate-500"></div>
                            <button className="btn btn-facebook shadow-md mr-2" onClick={handleOnClickSearch}>Buscar
                            </button>
                            <button className="btn btn-close shadow-md mr-2" onClick={handleOnClickClean}>X Limpiar
                            </button>
                            <button className="btn btn-primary shadow-md mr-2" onClick={actionAdd}>Nuevo Usuario
                            </button>
                        </div>
                    </div>
                    <br/>
                    {data.length != 0 ?
                        <DataTable
                            columns={columns(actionVerify,actionDelete,actionEdit)}
                            data={data}
                            progressPending={loading}
                            progressComponent={<Preload/>}
                            pagination
                            paginationServer
                            paginationTotalRows={totalRows}
                            onChangeRowsPerPage={handlePerRowsChange}
                            onChangePage={handlePageChange}
                        />
                        :
                        <Preload/>
                    }
                </>
                    :
                <>
                    { (formType === 'register') ?
                    <Add  handleOnClickRegister={handleOnClickRegister}
                          user_Name={user_Name}
                          setUser_Name={setUser_Name}
                          user_Password={user_Password}
                          setUser_Password={setUser_Password}
                          passwordAgain={passwordAgain}
                          setPasswordAgain={setPasswordAgain}
                          setFormType={setFormType}
                          setUser_ApprovedStatus={setUser_ApprovedStatus}
                    />
                    :
                        <Add  handleOnClickRegister={handleOnClickUpdate}
                              user_Name={user_Name}
                              setUser_Name={setUser_Name}
                              user_Password={user_Password}
                              setUser_Password={setUser_Password}
                              passwordAgain={passwordAgain}
                              setPasswordAgain={setPasswordAgain}
                              setFormType={setFormType}
                              setUser_ApprovedStatus={setUser_ApprovedStatus}
                        />
                    }
                    </>
            }
        </div>
    );
}

export default Index