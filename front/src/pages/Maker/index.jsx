import React, { useEffect, useState } from 'react';
import axios from 'axios';
import env from '@/env.js';
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import Preload from '@/components/preload/preload.jsx';
import columns from '../../data/Maker.jsx';
import 'sweetalert2/src/sweetalert2.scss';
import Add from './add.jsx';
import List from '../../components/layouts/list/index.jsx';

function Index() {
    const [maker_Name, setMaker_Name] = useState('');
    const [maker_Description, setMaker_Description] = useState('');
    const [DescriptionAgain, setDescriptionAgain] = useState('');
    const [maker_CreationDate, setMakerCreationDate] = useState('');
    const [maker_ApprovedStatus, setMaker_ApprovedStatus] = useState('1');
    const [formType, setFormType] = useState('list');
    const [img, setImg] = useState('');
    /* Server Side */
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [page_, setPage_] = useState(1);
    const [dataxMaker, setdataxMaker] = useState('');

    const fetchMakers = async (page) => {
        setLoading(true);
        const endpoint = `${env.apiURL}listMaker`;
        const response = await axios.get(
            `${endpoint}?page=${page}&per_page=${perPage}`
        );
        setData(response.data.data);
        setPage_(response.data.page);
        setTotalRows(response.data.total);
        setLoading(false);
    };

    const handlePageChange = (page) => {
        fetchMakers(page);
    };

    const handlePerRowsChange = (rows) => {
        setLoading(true);
        setPerPage(rows);
    };

    useEffect(() => {
        fetchMakers(page_);
    }, []);

    useEffect(() => {
        fetchMakers(page_);
    }, [perPage]);

    const actionDelete = async (maker_ID) => {
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
                const endpoint = `${env.apiURL}deleteMaker`;
                axios
                    .post(endpoint, { maker_ID, maker_StatusID: 0 })
                    .then(() => {
                        Swal.fire(
                            'Eliminado!',
                            'Se ha eliminado Correctamente.',
                            'success'
                        ).then(() => {
                            fetchMakers(page_);
                        });
                    })
                    .catch(() => {
                        alert('Operacion no completada');
                    });
            }
        });
    };

    const actionEdit = async (maker_ID) => {
        const endpoint = `${env.apiURL}listXMaker`;
        const response = await axios.get(`${endpoint}?maker_ID=${maker_ID}`);
        setdataxMaker(response.data.maker_ID);
        setMaker_Name(response.data.maker_Name);
        setMaker_Description(response.data.maker_Description);
        setFormType('edit');
    };
    const actionAdd = async () => {
        setFormType('register');
    };

    const handleOnClickRegister = async (e) => {
        e.preventDefault();
        const endpoint = `${env.apiURL}registerMaker`;
        await axios
            .post(
                endpoint,
                {
                    maker_Name,
                    maker_Description,
                    maker_StatusID: '1',
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
        const endpoint = `${env.apiURL}updateMaker`;
        await axios
            .post(
                endpoint,
                {
                    maker_ID: dataxMaker,
                    maker_Name,
                    maker_Description,
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
        setMaker_ApprovedStatus(e.target.value);
    };

    const handleOnClickSearch = async () => {
        setLoading(true);
        const endpoint = `${env.apiURL}listMaker`;
        const response = await axios.get(
            `${endpoint}?page=${page_}&per_page=${perPage}&maker_Name=${maker_Name}&maker_CreationDate=${maker_CreationDate}`
        );
        setData(response.data.data);
        setPage_(response.data.page);
        setTotalRows(response.data.total);
        setLoading(false);
    };

    const handleOnClickClean = async () => {
        setLoading(true);
        setMaker_Name('');
        setMaker_Description('');
        setMaker_ApprovedStatus('');
        setMakerCreationDate('');
        fetchMakers(1);
        setLoading(false);
    };
    console.log(maker_ApprovedStatus);

    const handleOnClickModalImage = async (
        imageName,
        makerName,
        makerDescription
    ) => {
        Swal.fire({
            title: makerName,
            text: makerDescription,
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
                        nameSection="Fabricante"
                        dataType="text"
                        dataSearch1={maker_Name}
                        setdataSearch1={setMaker_Name}
                        dataType2="date"
                        dataSearch2={maker_CreationDate}
                        setdataSearch2={setMakerCreationDate}
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
                            maker_Name={maker_Name}
                            setMaker_Name={setMaker_Name}
                            maker_Description={maker_Description}
                            setMaker_Description={setMaker_Description}
                            DescriptionAgain={DescriptionAgain}
                            setDescriptionAgain={setDescriptionAgain}
                            img={img}
                            setImg={setImg}
                            setFormType={setFormType}
                            setMaker_ApprovedStatus={setMaker_ApprovedStatus}
                        />
                    ) : (
                        <Add
                            handleOnClickRegister={handleOnClickUpdate}
                            maker_Name={maker_Name}
                            setMaker_Name={setMaker_Name}
                            maker_Description={maker_Description}
                            setMaker_Description={setMaker_Description}
                            DescriptionAgain={DescriptionAgain}
                            setDescriptionAgain={setDescriptionAgain}
                            img={img}
                            setImg={setImg}
                            setFormType={setFormType}
                            setMaker_ApprovedStatus={setMaker_ApprovedStatus}
                        />
                    )}
                </>
            )}
        </div>
    );
}

export default Index;
