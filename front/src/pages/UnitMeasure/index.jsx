import React, { useEffect, useState } from 'react';
import axios from 'axios';
import env from '@/env.js';
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import Preload from '@/components/preload/preload.jsx';
import columns from '../../data/UnitMeasure.jsx';
import 'sweetalert2/src/sweetalert2.scss';
import Add from './add.jsx';
import List from '../../components/layouts/list/index.jsx';

function Index() {
    const [unitmeasure_Name, setUnitMeasure_Name] = useState('');
    const [unitmeasure_Description, setUnitMeasure_Description] = useState('');
    const [DescriptionAgain, setDescriptionAgain] = useState('');
    const [unitmeasure_CreationDate, setUnitMeasureCreationDate] = useState('');
    const [unitmeasure_ApprovedStatus, setUnitMeasure_ApprovedStatus] =
        useState('1');
    const [formType, setFormType] = useState('list');
    /* Server Side */
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [page_, setPage_] = useState(1);
    const [dataxUnitMeasure, setdataxUnitMeasure] = useState('');

    const fetchUnitMeasures = async (page) => {
        setLoading(true);
        const endpoint = `${env.apiURL}listUnitMeasure`;
        const response = await axios.get(
            `${endpoint}?page=${page}&per_page=${perPage}`
        );
        setData(response.data.data);
        setPage_(response.data.page);
        setTotalRows(response.data.total);
        setLoading(false);
    };

    const handlePageChange = (page) => {
        fetchUnitMeasures(page);
    };

    const handlePerRowsChange = (rows) => {
        setLoading(true);
        setPerPage(rows);
    };

    useEffect(() => {
        fetchUnitMeasures(page_);
    }, []);

    useEffect(() => {
        fetchUnitMeasures(page_);
    }, [perPage]);

    const actionDelete = async (unitmeasure_ID) => {
        Swal.fire({
            title: 'Desea realizar esta accion?',
            text: 'No podra revertir los cambios!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Si, Eliminar!',
        }).then((result) => {
            if (result.isConfirmed) {
                const endpoint = `${env.apiURL}deleteUnitMeasure`;
                axios
                    .post(endpoint, { unitmeasure_ID, unitmeasure_StatusID: 0 })
                    .then(() => {
                        Swal.fire(
                            'Eliminado!',
                            'Se ha eliminado Correctamente.',
                            'success'
                        ).then(() => {
                            fetchUnitMeasures(page_);
                        });
                    })
                    .catch(() => {
                        alert('Operacion no completada');
                    });
            }
        });
    };

    const actionEdit = async (unitmeasure_ID) => {
        const endpoint = `${env.apiURL}listXUnitMeasure`;
        const response = await axios.get(
            `${endpoint}?unitmeasure_ID=${unitmeasure_ID}`
        );
        setdataxUnitMeasure(response.data.unitmeasure_ID);
        setUnitMeasure_Name(response.data.unitmeasure_Name);
        setUnitMeasure_Description(response.data.unitmeasure_Description);
        setFormType('edit');
    };
    const actionAdd = async () => {
        setFormType('register');
    };

    const handleOnClickRegister = async (e) => {
        e.preventDefault();
        const endpoint = `${env.apiURL}registerUnitMeasure`;
        await axios
            .post(
                endpoint,
                {
                    unitmeasure_Name,
                    unitmeasure_Description,
                    unitmeasure_StatusID: '1',
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

    const handleOnClickUpdate = async (e) => {
        e.preventDefault();
        const endpoint = `${env.apiURL}updateUnitMeasure`;
        await axios
            .post(
                endpoint,
                {
                    unitmeasure_ID: dataxUnitMeasure,
                    unitmeasure_Name,
                    unitmeasure_Description,
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

    const captureType = (e) => {
        setUnitMeasure_ApprovedStatus(e.target.value);
    };

    const handleOnClickSearch = async () => {
        setLoading(true);
        const endpoint = `${env.apiURL}listUnitMeasure`;
        const response = await axios.get(
            `${endpoint}?page=${page_}&per_page=${perPage}&unitmeasure_Name=${unitmeasure_Name}&unitmeasure_CreationDate=${unitmeasure_CreationDate}`
        );
        setData(response.data.data);
        setPage_(response.data.page);
        setTotalRows(response.data.total);
        setLoading(false);
    };

    const handleOnClickClean = async () => {
        setLoading(true);
        setUnitMeasure_Name('');
        setUnitMeasure_Description('');
        setUnitMeasure_ApprovedStatus('');
        setUnitMeasureCreationDate('');
        fetchUnitMeasures(1);
        setLoading(false);
    };

    const handleOnClickModalImage = async (
        imageName,
        unitmeasureName,
        unitmeasureDescription
    ) => {
        Swal.fire({
            title: unitmeasureName,
            text: unitmeasureDescription,
            imageUrl: env.URL + imageName,
            imageWidth: 500,
            imageHeight: 300,
        });
    };

    return (
        <div>
            {formType === 'list' ? (
                <>
                    <List
                        nameSection="Unidad de Medida"
                        dataType="text"
                        dataSearch1={unitmeasure_Name}
                        setdataSearch1={setUnitMeasure_Name}
                        dataType2="date"
                        dataSearch2={unitmeasure_CreationDate}
                        setdataSearch2={setUnitMeasureCreationDate}
                        captureType={captureType}
                        handleOnClickSearch={handleOnClickSearch}
                        handleOnClickClean={handleOnClickClean}
                        actionAdd={actionAdd}
                    />
                    {data.length !== 0 ? (
                        <DataTable
                            columns={columns(
                                actionDelete,
                                actionEdit,
                                handleOnClickModalImage
                            )}
                            data={data}
                            progressPending={loading}
                            progressComponent={<Preload />}
                            pagination
                            paginationServer
                            paginationTotalRows={totalRows}
                            onChangeRowsPerPage={handlePerRowsChange}
                            onChangePage={handlePageChange}
                        />
                    ) : (
                        <DataTable
                            columns={columns(
                                actionDelete,
                                actionEdit,
                                handleOnClickModalImage
                            )}
                            data={data}
                            progressPending={loading}
                            progressComponent={<Preload />}
                            noDataComponent="No existen registros en esta tabla"
                            pagination
                            paginationServer
                            paginationTotalRows={totalRows}
                            onChangeRowsPerPage={handlePerRowsChange}
                            onChangePage={handlePageChange}
                        />
                    )}
                </>
            ) : (
                // eslint-disable-next-line react/jsx-no-useless-fragment
                <>
                    {formType === 'register' ? (
                        <Add
                            handleOnClickRegister={handleOnClickRegister}
                            unitmeasure_Name={unitmeasure_Name}
                            setUnitMeasure_Name={setUnitMeasure_Name}
                            unitmeasure_Description={unitmeasure_Description}
                            setUnitMeasure_Description={
                                setUnitMeasure_Description
                            }
                            DescriptionAgain={DescriptionAgain}
                            setDescriptionAgain={setDescriptionAgain}
                            setFormType={setFormType}
                            setUnitMeasure_ApprovedStatus={
                                setUnitMeasure_ApprovedStatus
                            }
                        />
                    ) : (
                        <Add
                            handleOnClickRegister={handleOnClickUpdate}
                            unitmeasure_Name={unitmeasure_Name}
                            setUnitMeasure_Name={setUnitMeasure_Name}
                            unitmeasure_Description={unitmeasure_Description}
                            setUnitMeasure_Description={
                                setUnitMeasure_Description
                            }
                            DescriptionAgain={DescriptionAgain}
                            setDescriptionAgain={setDescriptionAgain}
                            setFormType={setFormType}
                            setUnitMeasure_ApprovedStatus={
                                setUnitMeasure_ApprovedStatus
                            }
                        />
                    )}
                </>
            )}
        </div>
    );
}

export default Index;
