import React, { useEffect, useState } from 'react';
import axios from 'axios';
import env from '@/env.js';
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import Preload from '@/components/preload/preload.jsx';
import columns from '../../data/Establishment.jsx';
import 'sweetalert2/src/sweetalert2.scss';
import Add from './add.jsx';
import List from '../../components/layouts/list/index.jsx';

function Index() {
    const [establishment_Name, setEstablishment_Name] = useState('');
    const [establishment_Description, setEstablishment_Description] =
        useState('');
    const [DescriptionAgain, setDescriptionAgain] = useState('');
    const [establishment_CreationDate, setEstablishmentCreationDate] =
        useState('');
    const [establishment_ApprovedStatus, setEstablishment_ApprovedStatus] =
        useState('1');
    const [formType, setFormType] = useState('list');
    const [img, setImg] = useState('');
    /* Server Side */
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [page_, setPage_] = useState(1);
    const [dataxEstablishment, setdataxEstablishment] = useState('');

    const fetchEstablishments = async (page) => {
        setLoading(true);
        const endpoint = `${env.apiURL}listEstablishment`;
        const response = await axios.get(
            `${endpoint}?page=${page}&per_page=${perPage}`
        );
        setData(response.data.data);
        setPage_(response.data.page);
        setTotalRows(response.data.total);
        setLoading(false);
    };

    const handlePageChange = (page) => {
        fetchEstablishments(page);
    };

    const handlePerRowsChange = (rows) => {
        setLoading(true);
        setPerPage(rows);
    };

    useEffect(() => {
        fetchEstablishments(page_);
    }, []);

    useEffect(() => {
        fetchEstablishments(page_);
    }, [perPage]);

    const actionDelete = async (establishment_ID) => {
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
                const endpoint = `${env.apiURL}deleteEstablishment`;
                axios
                    .post(endpoint, {
                        establishment_ID,
                        establishment_StatusID: 0,
                    })
                    .then(() => {
                        Swal.fire(
                            'Eliminado!',
                            'Se ha eliminado Correctamente.',
                            'success'
                        ).then(() => {
                            fetchEstablishments(page_);
                        });
                    })
                    .catch(() => {
                        alert('Operacion no completada');
                    });
            }
        });
    };

    const actionEdit = async (establishment_ID) => {
        const endpoint = `${env.apiURL}listXEstablishment`;
        const response = await axios.get(
            `${endpoint}?establishment_ID=${establishment_ID}`
        );
        setdataxEstablishment(response.data.establishment_ID);
        setEstablishment_Name(response.data.establishment_Name);
        setEstablishment_Description(response.data.establishment_Description);
        setFormType('edit');
    };
    const actionAdd = async () => {
        setFormType('register');
    };

    const handleOnClickRegister = async (e) => {
        e.preventDefault();
        const endpoint = `${env.apiURL}registerEstablishment`;
        await axios
            .post(
                endpoint,
                {
                    establishment_Name,
                    establishment_Description,
                    establishment_StatusID: '1',
                    img,
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
        const endpoint = `${env.apiURL}updateEstablishment`;
        await axios
            .post(
                endpoint,
                {
                    establishment_ID: dataxEstablishment,
                    establishment_Name,
                    establishment_Description,
                    img,
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
        setEstablishment_ApprovedStatus(e.target.value);
    };

    const handleOnClickSearch = async () => {
        setLoading(true);
        const endpoint = `${env.apiURL}listEstablishment`;
        const response = await axios.get(
            `${endpoint}?page=${page_}&per_page=${perPage}&establishment_Name=${establishment_Name}&establishment_CreationDate=${establishment_CreationDate}`
        );
        setData(response.data.data);
        setPage_(response.data.page);
        setTotalRows(response.data.total);
        setLoading(false);
    };

    const handleOnClickClean = async () => {
        setLoading(true);
        setEstablishment_Name('');
        setEstablishment_Description('');
        setEstablishment_ApprovedStatus('');
        setEstablishmentCreationDate('');
        fetchEstablishments(1);
        setLoading(false);
    };

    const handleOnClickModalImage = async (
        imageName,
        establishmentName,
        establishmentDescription
    ) => {
        Swal.fire({
            title: establishmentName,
            text: establishmentDescription,
            /* imageAlt: 'Custom image', */
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
                        nameSection="Establecimiento"
                        dataType="text"
                        dataSearch1={establishment_Name}
                        setdataSearch1={setEstablishment_Name}
                        dataType2="date"
                        dataSearch2={establishment_CreationDate}
                        setdataSearch2={setEstablishmentCreationDate}
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
                            establishment_Name={establishment_Name}
                            setEstablishment_Name={setEstablishment_Name}
                            establishment_Description={
                                establishment_Description
                            }
                            setEstablishment_Description={
                                setEstablishment_Description
                            }
                            DescriptionAgain={DescriptionAgain}
                            setDescriptionAgain={setDescriptionAgain}
                            img={img}
                            setImg={setImg}
                            setFormType={setFormType}
                            setEstablishment_ApprovedStatus={
                                setEstablishment_ApprovedStatus
                            }
                        />
                    ) : (
                        <Add
                            handleOnClickRegister={handleOnClickUpdate}
                            establishment_Name={establishment_Name}
                            setEstablishment_Name={setEstablishment_Name}
                            establishment_Description={
                                establishment_Description
                            }
                            setEstablishment_Description={
                                setEstablishment_Description
                            }
                            DescriptionAgain={DescriptionAgain}
                            setDescriptionAgain={setDescriptionAgain}
                            img={img}
                            setImg={setImg}
                            setFormType={setFormType}
                            setEstablishment_ApprovedStatus={
                                setEstablishment_ApprovedStatus
                            }
                        />
                    )}
                </>
            )}
        </div>
    );
}

export default Index;
