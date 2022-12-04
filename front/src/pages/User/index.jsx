import React, {useEffect, useState} from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {env} from "@/env.js";
import DataTable from 'react-data-table-component';
import columns from '../../data/Users.jsx';
import Preload from "@/components/preload/preload";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import Add  from '../User/add.jsx'
import List from "../../components/layouts/list/index.jsx";

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
                <List
                    nameSection={'Usuario'}
                    dataType={'text'}
                    dataSearch1={user_Name}
                    setdataSearch1={setUser_Name}
                    dataType2={'date'}
                    dataSearch2={user_CreationDate}
                    setdataSearch2={setUserCreationDate}
                    captureType={captureType}
                    handleOnClickSearch={handleOnClickSearch}
                    handleOnClickClean={handleOnClickClean}
                    actionAdd={actionAdd}
                />
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