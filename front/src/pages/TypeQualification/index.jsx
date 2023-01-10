import React, {useEffect, useState} from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {env} from "@/env.js";
import DataTable from 'react-data-table-component';
import columns from '../../data/TypeQualification.jsx';
import Preload from "@/components/preload/preload";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import Add  from '../TypeQualification/add.jsx'
import List from "../../components/layouts/list/index.jsx";

const Index = () => {
    const navigate = useNavigate()

    const [typequalification_Name, setTypeQualification_Name] = useState('');
    const [typequalification_Description, setTypeQualification_Description] = useState('');
    const [DescriptionAgain, setDescriptionAgain] = useState('');
    const [typequalification_CreationDate, setTypeQualificationCreationDate] = useState('');
    const [typequalification_ApprovedStatus, setTypeQualification_ApprovedStatus] = useState('1');
    const [formType, setFormType] = useState('list');
    /*Server Side*/
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [page_, setPage_] = useState(1);
    const [dataxTypeQualification, setdataxTypeQualification] = useState('');

    const fetchTypeQualifications = async page => {
        setLoading(true);
        const endpoint = `${env.apiURL}listTypeQualification`;
        const response = await axios.get(`${endpoint}?page=${page}&per_page=${perPage}`);
        setData(response.data.data);
        setPage_(response.data.page);
        setTotalRows(response.data.total);
        setLoading(false);
    };

    const handlePageChange = page => {
        fetchTypeQualifications(page);
    };

    const handlePerRowsChange = (rows) => {
        setLoading(true);
        setPerPage(rows);
    };

    useEffect(() => {
        fetchTypeQualifications(page_);
    }, []);

    useEffect(() => {
        fetchTypeQualifications(page_);
    }, [perPage]);

    const actionDelete = async (typequalification_ID) => {
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
                const endpoint = `${env.apiURL}deleteTypeQualification`;
                axios.post(endpoint, {typequalification_ID: typequalification_ID, typequalification_StatusID: 0})
                    .then(function (response) {
                        Swal.fire(
                            'Eliminado!',
                            'Se ha eliminado Correctamente.',
                            'success'
                        ).then((result) => {
                            fetchTypeQualifications(page_);
                        });
                    })
                    .catch(error => {
                        alert('Operacion no completada')
                    })

            }
        })
    }

    const actionEdit = async (typequalification_ID) => {
        const endpoint = `${env.apiURL}listXTypeQualification`;
        const response = await axios.get(`${endpoint}?typequalification_ID=${typequalification_ID}`);
        setdataxTypeQualification(response.data.typequalification_ID);
        setTypeQualification_Name(response.data.typequalification_Name);
        setTypeQualification_Description(response.data.typequalification_Description);
        setFormType('edit');
    }
    const actionAdd = async () => {
        setFormType('register');
    }

    const handleOnClickRegister = async (e) => {
        e.preventDefault();
        const endpoint = `${env.apiURL}registerTypeQualification`
        await axios.post(endpoint, {typequalification_Name: typequalification_Name, typequalification_Description: typequalification_Description, typequalification_StatusID: '1'},{
            headers: {
                'Content-Type': 'multipart/form-data',
            },}
        )
            .then(function (response) {
                window.location.reload();
            })
            .catch(error => {
                alert('Debe completar correctamente sus datos')
            })
    }

    const handleOnClickUpdate = async (e) => {
        e.preventDefault();
        const endpoint = `${env.apiURL}updateTypeQualification`
        await axios.post(endpoint, {typequalification_ID:dataxTypeQualification, typequalification_Name: typequalification_Name, typequalification_Description: typequalification_Description},{
            headers: {
                'Content-Type': 'multipart/form-data',
            },}
        )
            .then(function (response) {
                window.location.reload();
            })
            .catch(error => {
                alert('Debe completar correctamente sus datos')
            })
    }

    const captureType = (e) => {
        setTypeQualification_ApprovedStatus(e.target.value);
    }

    const handleOnClickSearch = async page => {
        setLoading(true);
        const endpoint = `${env.apiURL}listTypeQualification`;
        const response = await axios.get(`${endpoint}?page=${page_}&per_page=${perPage}&typequalification_Name=${typequalification_Name}&typequalification_CreationDate=${typequalification_CreationDate}`);
        setData(response.data.data);
        setPage_(response.data.page);
        setTotalRows(response.data.total);
        setLoading(false);
    };

    const handleOnClickClean= async page => {
        setLoading(true);
        setTypeQualification_Name('');
        setTypeQualification_Description('');
        setTypeQualification_ApprovedStatus('');
        setTypeQualificationCreationDate('');
        fetchTypeQualifications(1);
        setLoading(false);
    };
    console.log(typequalification_ApprovedStatus);

    const handleOnClickModalImage = async (imageName,typequalificationName,typequalificationDescription) => {
        Swal.fire({
            title: typequalificationName,
            text: typequalificationDescription,
            /* imageAlt: 'Custom image',*/
            imageUrl: env.URL + imageName,
            imageWidth: 500,
            imageHeight: 300,
        })
    }

    return (
        <div>
            { (formType === 'list') ?
                <>
                <List
                    nameSection={'Tipo Calificacion'}
                    dataType={'text'}
                    dataSearch1={typequalification_Name}
                    setdataSearch1={setTypeQualification_Name}
                    dataType2={'date'}
                    dataSearch2={typequalification_CreationDate}
                    setdataSearch2={setTypeQualificationCreationDate}
                    captureType={captureType}
                    handleOnClickSearch={handleOnClickSearch}
                    handleOnClickClean={handleOnClickClean}
                    actionAdd={actionAdd}
                />
                    {data.length != 0 ?
                        <>
                            <DataTable
                                columns={columns(actionDelete,actionEdit,handleOnClickModalImage)}
                                data={data}
                                progressPending={loading}
                                progressComponent={<Preload/>}
                                pagination
                                paginationServer
                                paginationTotalRows={totalRows}
                                onChangeRowsPerPage={handlePerRowsChange}
                                onChangePage={handlePageChange}
                            />
                        </>
                        :
                        <>
                            <DataTable
                                columns={columns(actionDelete,actionEdit,handleOnClickModalImage)}
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
                          typequalification_Name={typequalification_Name}
                          setTypeQualification_Name={setTypeQualification_Name}
                          typequalification_Description={typequalification_Description}
                          setTypeQualification_Description={setTypeQualification_Description}
                          DescriptionAgain={DescriptionAgain}
                          setDescriptionAgain={setDescriptionAgain}
                          setFormType={setFormType}
                          setTypeQualification_ApprovedStatus={setTypeQualification_ApprovedStatus}
                    />
                    :
                        <Add  handleOnClickRegister={handleOnClickUpdate}
                              typequalification_Name={typequalification_Name}
                              setTypeQualification_Name={setTypeQualification_Name}
                              typequalification_Description={typequalification_Description}
                              setTypeQualification_Description={setTypeQualification_Description}
                              DescriptionAgain={DescriptionAgain}
                              setDescriptionAgain={setDescriptionAgain}
                              setFormType={setFormType}
                              setTypeQualification_ApprovedStatus={setTypeQualification_ApprovedStatus}
                        />
                    }
                    </>
            }
        </div>
    );
}

export default Index