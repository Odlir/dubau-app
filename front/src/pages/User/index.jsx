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


const Index = () => {
    const navigate = useNavigate()
    const endpoint = `${env.apiURL}list`;
    const [USUA_usuario, setUSUA_usuario] = useState('');
    const [USUA_Password, setUSUA_Password] = useState('');
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

    const actionVerify = async (USUA_Codigo) => {
        Swal.fire({
            title: 'Que accion desea realizar?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Aprobar',
            denyButtonText: `Desaprobar`,
        }).then((result) => {
            if (result.isConfirmed) {
                const endpoint = `${env.apiURL}verifyUser`;
                 axios.post(endpoint, {USUA_Codigo: USUA_Codigo, cji_usuario_estadoVerificado: 1})
                    .then(function (response) {
                        fetchUsers(page_);
                    })
                    .catch(error => {
                        alert('Operacion no completada')
                    })
                Swal.fire('Usuario Verificado!', ' ', 'success')
            } else if (result.isDenied) {
                const endpoint = `${env.apiURL}verifyUser`;
                axios.post(endpoint, {USUA_Codigo: USUA_Codigo, cji_usuario_estadoVerificado: 0})
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

    const actionDelete = async (USUA_Codigo) => {
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
                axios.post(endpoint, {USUA_Codigo: USUA_Codigo, cji_usuario_estadoID: 0})
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
    const actionEdit = async (USUA_Codigo) => {
        const endpoint = `${env.apiURL}listXUser`;
        const response = await axios.get(`${endpoint}?USUA_Codigo=${USUA_Codigo}`);
        setdataxUser(response.data.USUA_Codigo);
        setUSUA_usuario(response.data.USUA_usuario);

        setUSUA_Password(response.data.USUA_Password);
        setFormType('edit');
    }
    console.log(dataxUser);
    const actionAdd = async () => {
        setFormType('register');
       /* navigate('/addUser')*/
    }

    const handleOnClickRegister = async (e) => {
        e.preventDefault();
        const endpoint = `${env.apiURL}register`
        await axios.post(endpoint, {USUA_usuario: USUA_usuario, USUA_Password: USUA_Password, cji_usuario_estadoVerificado: '0',cji_usuario_estadoID: '1'})
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
        await axios.post(endpoint, {USUA_Codigo:dataxUser, USUA_usuario: USUA_usuario, USUA_Password: USUA_Password})
            .then(function (response) {
                window.location.reload();
            })
            .catch(error => {
                alert('Debe completar correctamente sus datos')
            })
    }

    return (
        <div>
            { (formType === 'list') ?
                <>
                    <h2 className="intro-y text-lg font-medium mt-10">
                        Listado de Usuarios
                    </h2>
                    <div className="grid grid-cols-12 gap-6 mt-5">
                        <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">
                            <button className="btn btn-primary shadow-md mr-2" onClick={actionAdd}>Nuevo Usuario
                            </button>
                            <div className="hidden md:block mx-auto text-slate-500"></div>
                            <div className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
                                <div className="w-56 relative text-slate-500">
                                    <input type="text" className="form-control w-56 box pr-10" placeholder="Search..."/>
                                    <i className="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0 btn-primary"
                                       data-lucide="search"></i>
                                </div>
                            </div>
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
                          USUA_usuario={USUA_usuario}
                          setUSUA_usuario={setUSUA_usuario}
                          USUA_Password={USUA_Password}
                          setUSUA_Password={setUSUA_Password}
                          setFormType={setFormType}
                    />
                    :
                        <Add  handleOnClickRegister={handleOnClickUpdate}
                              USUA_usuario={USUA_usuario}
                              setUSUA_usuario={setUSUA_usuario}
                              USUA_Password={USUA_Password}
                              setUSUA_Password={setUSUA_Password}
                              setFormType={setFormType}
                        />
                    }
                    </>
            }
        </div>
    );
}

export default Index