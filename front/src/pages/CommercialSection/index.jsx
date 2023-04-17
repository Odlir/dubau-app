import React, {useEffect, useState} from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {env} from "@/env.js";
import DataTable from 'react-data-table-component';
import columns from '../../data/CommercialSection.jsx';
import Preload from "@/components/preload/preload";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import Add  from '../CommercialSection/add.jsx'
import List from "../../components/layouts/list/index.jsx";

const Index = () => {
    const navigate = useNavigate()

    const [commercial_section_Name, setCommercialSection_Name] = useState('');
    const [commercial_section_Description, setCommercialSection_Description] = useState('');
    const [DescriptionAgain, setDescriptionAgain] = useState('');
    const [commercial_section_CreationDate, setCommercialSectionCreationDate] = useState('');
    const [commercial_section_ApprovedStatus, setCommercialSection_ApprovedStatus] = useState('1');
    const [formType, setFormType] = useState('list');
    /*Server Side*/
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [page_, setPage_] = useState(1);
    const [dataxCommercialSection, setdataxCommercialSection] = useState('');

    const fetchCommercialSections = async page => {
        setLoading(true);
        const endpoint = `${env.apiURL}listCommercialSection`;
        const response = await axios.get(`${endpoint}?page=${page}&per_page=${perPage}`);
        setData(response.data.data);
        setPage_(response.data.page);
        setTotalRows(response.data.total);
        setLoading(false);
    };

    const handlePageChange = page => {
        fetchCommercialSections(page);
    };

    const handlePerRowsChange = (rows) => {
        setLoading(true);
        setPerPage(rows);
    };

    useEffect(() => {
        fetchCommercialSections(page_);
    }, []);

    useEffect(() => {
        fetchCommercialSections(page_);
    }, [perPage]);

    const actionDelete = async (commercial_section_ID) => {
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
                const endpoint = `${env.apiURL}deleteCommercialSection`;
                axios.post(endpoint, {commercial_section_ID: commercial_section_ID, commercial_section_StatusID: 0})
                    .then(function (response) {
                        Swal.fire(
                            'Eliminado!',
                            'Se ha eliminado Correctamente.',
                            'success'
                        ).then((result) => {
                            fetchCommercialSections(page_);
                        });
                    })
                    .catch(error => {
                        alert('Operacion no completada')
                    })

            }
        })
    }

    const actionEdit = async (commercial_section_ID) => {
        const endpoint = `${env.apiURL}listXCommercialSection`;
        const response = await axios.get(`${endpoint}?commercial_section_ID=${commercial_section_ID}`);
        setdataxCommercialSection(response.data.commercial_section_ID);
        setCommercialSection_Name(response.data.commercial_section_Name);
        setCommercialSection_Description(response.data.commercial_section_Description);
        setFormType('edit');
    }
    const actionAdd = async () => {
        setFormType('register');
    }

    const handleOnClickRegister = async (e) => {
        e.preventDefault();
        const endpoint = `${env.apiURL}registerCommercialSection`
        await axios.post(endpoint, {commercial_section_Name: commercial_section_Name, commercial_section_Description: commercial_section_Description, commercial_section_StatusID: '1'})
            .then(function (response) {
                window.location.reload();
            })
            .catch(error => {
                alert('Debe completar correctamente sus datos')
            })
    }

    const handleOnClickUpdate = async (e) => {
        e.preventDefault();
        const endpoint = `${env.apiURL}updateCommercialSection`
        await axios.post(endpoint, {commercial_section_ID:dataxCommercialSection, commercial_section_Name: commercial_section_Name, commercial_section_Description: commercial_section_Description})
            .then(function (response) {
                window.location.reload();
            })
            .catch(error => {
                alert('Debe completar correctamente sus datos')
            })
    }

    const captureType = (e) => {
        setCommercialSection_ApprovedStatus(e.target.value);
    }

    const handleOnClickSearch = async page => {
        setLoading(true);
        const endpoint = `${env.apiURL}listCommercialSection`;
        const response = await axios.get(`${endpoint}?page=${page_}&per_page=${perPage}&commercial_section_Name=${commercial_section_Name}&commercial_section_CreationDate=${commercial_section_CreationDate}`);
        setData(response.data.data);
        setPage_(response.data.page);
        setTotalRows(response.data.total);
        setLoading(false);
    };

    const handleOnClickClean= async page => {
        setLoading(true);
        setCommercialSection_Name('');
        setCommercialSection_Description('');
        setCommercialSection_ApprovedStatus('');
        setCommercialSectionCreationDate('');
        fetchCommercialSections(1);
        setLoading(false);
    };
    console.log(commercial_section_ApprovedStatus);

    return (
        <div>
            { (formType === 'list') ?
                <>
                <List
                    nameSection={'Sector'}
                    dataType={'text'}
                    dataSearch1={commercial_section_Name}
                    setdataSearch1={setCommercialSection_Name}
                    dataType2={'date'}
                    dataSearch2={commercial_section_CreationDate}
                    setdataSearch2={setCommercialSectionCreationDate}
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
                          commercial_section_Name={commercial_section_Name}
                          setCommercialSection_Name={setCommercialSection_Name}
                          commercial_section_Description={commercial_section_Description}
                          setCommercialSection_Description={setCommercialSection_Description}
                          DescriptionAgain={DescriptionAgain}
                          setDescriptionAgain={setDescriptionAgain}
                          setFormType={setFormType}
                          setCommercialSection_ApprovedStatus={setCommercialSection_ApprovedStatus}
                    />
                    :
                        <Add  handleOnClickRegister={handleOnClickUpdate}
                              commercial_section_Name={commercial_section_Name}
                              setCommercialSection_Name={setCommercialSection_Name}
                              commercial_section_Description={commercial_section_Description}
                              setCommercialSection_Description={setCommercialSection_Description}
                              DescriptionAgain={DescriptionAgain}
                              setDescriptionAgain={setDescriptionAgain}
                              setFormType={setFormType}
                              setCommercialSection_ApprovedStatus={setCommercialSection_ApprovedStatus}
                        />
                    }
                    </>
            }
        </div>
    );
}

export default Index