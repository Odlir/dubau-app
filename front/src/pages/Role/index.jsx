import React, {useEffect, useState} from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {env} from "@/env.js";
import DataTable from 'react-data-table-component';
import columns from '../../data/Role.jsx';
import Preload from "@/components/preload/preload";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import Add  from '../Role/add.jsx'
import List from "../../components/layouts/list/index.jsx";

const Index = () => {
    const navigate = useNavigate()

    const [role_Name, setRole_Name] = useState('');
    const [role_Description, setRole_Description] = useState('');
    const [DescriptionAgain, setDescriptionAgain] = useState('');
    const [role_CreationDate, setRoleCreationDate] = useState('');
    const [role_ApprovedStatus, setRole_ApprovedStatus] = useState('1');
    const [formType, setFormType] = useState('list');
    /*Server Side*/
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [page_, setPage_] = useState(1);
    const [dataxRole, setdataxRole] = useState('');

    const fetchRoles = async page => {
        setLoading(true);
        const endpoint = `${env.apiURL}listRole`;
        const response = await axios.get(`${endpoint}?page=${page}&per_page=${perPage}`);
        setData(response.data.data);
        setPage_(response.data.page);
        setTotalRows(response.data.total);
        setLoading(false);
    };

    const handlePageChange = page => {
        fetchRoles(page);
    };

    const handlePerRowsChange = (rows) => {
        setLoading(true);
        setPerPage(rows);
    };

    useEffect(() => {
        fetchRoles(page_);
    }, []);

    useEffect(() => {
        fetchRoles(page_);
    }, [perPage]);

    const actionDelete = async (role_ID) => {
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
                const endpoint = `${env.apiURL}deleteRole`;
                axios.post(endpoint, {role_ID: role_ID, role_StatusID: 0})
                    .then(function (response) {
                        Swal.fire(
                            'Eliminado!',
                            'Se ha eliminado Correctamente.',
                            'success'
                        ).then((result) => {
                            fetchRoles(page_);
                        });
                    })
                    .catch(error => {
                        alert('Operacion no completada')
                    })

            }
        })
    }

    const actionEdit = async (role_ID) => {
        const endpoint = `${env.apiURL}listXRole`;
        const response = await axios.get(`${endpoint}?role_ID=${role_ID}`);
        setdataxRole(response.data.role_ID);
        setRole_Name(response.data.role_Name);
        setRole_Description(response.data.role_Description);
        setFormType('edit');
    }
    const actionAdd = async () => {
        setFormType('register');
    }

    const handleOnClickRegister = async (e) => {
        e.preventDefault();
        const endpoint = `${env.apiURL}registerRole`
        await axios.post(endpoint, {role_Name: role_Name, role_Description: role_Description, role_StatusID: '1'})
            .then(function (response) {
                window.location.reload();
            })
            .catch(error => {
                alert('Debe completar correctamente sus datos')
            })
    }

    const handleOnClickUpdate = async (e) => {
        e.preventDefault();
        const endpoint = `${env.apiURL}updateRole`
        await axios.post(endpoint, {role_ID:dataxRole, role_Name: role_Name, role_Description: role_Description})
            .then(function (response) {
                window.location.reload();
            })
            .catch(error => {
                alert('Debe completar correctamente sus datos')
            })
    }

    const captureType = (e) => {
        setRole_ApprovedStatus(e.target.value);
    }

    const handleOnClickSearch = async page => {
        setLoading(true);
        const endpoint = `${env.apiURL}listRole`;
        const response = await axios.get(`${endpoint}?page=${page_}&per_page=${perPage}&role_Name=${role_Name}&role_CreationDate=${role_CreationDate}`);
        setData(response.data.data);
        setPage_(response.data.page);
        setTotalRows(response.data.total);
        setLoading(false);
    };

    const handleOnClickClean= async page => {
        setLoading(true);
        setRole_Name('');
        setRole_Description('');
        setRole_ApprovedStatus('');
        setRoleCreationDate('');
        fetchRoles(1);
        setLoading(false);
    };
    console.log(role_ApprovedStatus);

    return (
        <div>
            { (formType === 'list') ?
                <>
                <List
                    nameSection={'Rol'}
                    dataType={'text'}
                    dataSearch1={role_Name}
                    setdataSearch1={setRole_Name}
                    dataType2={'date'}
                    dataSearch2={role_CreationDate}
                    setdataSearch2={setRoleCreationDate}
                    captureType={captureType}
                    handleOnClickSearch={handleOnClickSearch}
                    handleOnClickClean={handleOnClickClean}
                    actionAdd={actionAdd}
                />
                    {data.length != 0 ?
                        <DataTable
                            columns={columns(actionDelete,actionEdit)}
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
                        <>
                            <DataTable
                                columns={columns(actionDelete,actionEdit)}
                                data={data}
                                progressPending={loading}
                                progressComponent={<Preload/>}
                                noDataComponent={'No existen registros en esta tabla'}
                                pagination
                                paginationServer
                                paginationTotalRows={totalRows}
                                onChangeRowsPerPage={handlePerRowsChange}
                                onChangePage={handlePageChange}
                            />
                        </>
                    }
                </>
                    :
                <>
                    { (formType === 'register') ?
                    <Add  handleOnClickRegister={handleOnClickRegister}
                          role_Name={role_Name}
                          setRole_Name={setRole_Name}
                          role_Description={role_Description}
                          setRole_Description={setRole_Description}
                          DescriptionAgain={DescriptionAgain}
                          setDescriptionAgain={setDescriptionAgain}
                          setFormType={setFormType}
                          setRole_ApprovedStatus={setRole_ApprovedStatus}
                    />
                    :
                        <Add  handleOnClickRegister={handleOnClickUpdate}
                              role_Name={role_Name}
                              setRole_Name={setRole_Name}
                              role_Description={role_Description}
                              setRole_Description={setRole_Description}
                              DescriptionAgain={DescriptionAgain}
                              setDescriptionAgain={setDescriptionAgain}
                              setFormType={setFormType}
                              setRole_ApprovedStatus={setRole_ApprovedStatus}
                        />
                    }
                    </>
            }
        </div>
    );
}

export default Index