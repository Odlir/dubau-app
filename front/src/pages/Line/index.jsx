import React, { useEffect, useState } from 'react';
import axios from 'axios';
import env from '@/env.js';
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import Preload from '@/components/preload/preload.jsx';
import columns from '../../data/Line.jsx';
import 'sweetalert2/src/sweetalert2.scss';
import Add from './add.jsx';
import List from '../../components/layouts/list/index.jsx';

function Index() {
    const [line_Name, setLine_Name] = useState('');
    const [line_Description, setLine_Description] = useState('');
    const [DescriptionAgain, setDescriptionAgain] = useState('');
    const [line_CreationDate, setLineCreationDate] = useState('');
    const [line_ApprovedStatus, setLine_ApprovedStatus] = useState('1');
    const [formType, setFormType] = useState('list');
    const [img, setImg] = useState('');
    /* Server Side */
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [page_, setPage_] = useState(1);
    const [dataxLine, setdataxLine] = useState('');

    const fetchLines = async (page) => {
        setLoading(true);
        const endpoint = `${env.apiURL}listLine`;
        const response = await axios.get(
            `${endpoint}?page=${page}&per_page=${perPage}`
        );
        setData(response.data.data);
        setPage_(response.data.page);
        setTotalRows(response.data.total);
        setLoading(false);
    };

    const handlePageChange = (page) => {
        fetchLines(page);
    };

    const handlePerRowsChange = (rows) => {
        setLoading(true);
        setPerPage(rows);
    };

    useEffect(() => {
        fetchLines(page_);
    }, []);

    useEffect(() => {
        fetchLines(page_);
    }, [perPage]);

    const actionDelete = async (line_ID) => {
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
                const endpoint = `${env.apiURL}deleteLine`;
                axios
                    .post(endpoint, { line_ID, line_StatusID: 0 })
                    .then(() => {
                        Swal.fire(
                            'Eliminado!',
                            'Se ha eliminado Correctamente.',
                            'success'
                        ).then(() => {
                            fetchLines(page_);
                        });
                    })
                    .catch(() => {
                        alert('Operacion no completada');
                    });
            }
        });
    };

    const actionEdit = async (line_ID) => {
        const endpoint = `${env.apiURL}listXLine`;
        const response = await axios.get(`${endpoint}?line_ID=${line_ID}`);
        setdataxLine(response.data.line_ID);
        setLine_Name(response.data.line_Name);
        setLine_Description(response.data.line_Description);
        setFormType('edit');
    };
    const actionAdd = async () => {
        setFormType('register');
    };

    const handleOnClickRegister = async (e) => {
        e.preventDefault();
        const endpoint = `${env.apiURL}registerLine`;
        await axios
            .post(
                endpoint,
                {
                    line_Name,
                    line_Description,
                    line_StatusID: '1',
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
        const endpoint = `${env.apiURL}updateLine`;
        await axios
            .post(
                endpoint,
                {
                    line_ID: dataxLine,
                    line_Name,
                    line_Description,
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
        setLine_ApprovedStatus(e.target.value);
    };

    const handleOnClickSearch = async () => {
        setLoading(true);
        const endpoint = `${env.apiURL}listLine`;
        const response = await axios.get(
            `${endpoint}?page=${page_}&per_page=${perPage}&line_Name=${line_Name}&line_CreationDate=${line_CreationDate}`
        );
        setData(response.data.data);
        setPage_(response.data.page);
        setTotalRows(response.data.total);
        setLoading(false);
    };

    const handleOnClickClean = async () => {
        setLoading(true);
        setLine_Name('');
        setLine_Description('');
        setLine_ApprovedStatus('');
        setLineCreationDate('');
        fetchLines(1);
        setLoading(false);
    };

    const handleOnClickModalImage = async (
        imageName,
        lineName,
        lineDescription
    ) => {
        Swal.fire({
            title: lineName,
            text: lineDescription,
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
                        nameSection="Lineas"
                        dataType="text"
                        dataSearch1={line_Name}
                        setdataSearch1={setLine_Name}
                        dataType2="date"
                        dataSearch2={line_CreationDate}
                        setdataSearch2={setLineCreationDate}
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
                            columns={columns(actionDelete, actionEdit)}
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
                            line_Name={line_Name}
                            setLine_Name={setLine_Name}
                            line_Description={line_Description}
                            setLine_Description={setLine_Description}
                            DescriptionAgain={DescriptionAgain}
                            setDescriptionAgain={setDescriptionAgain}
                            img={img}
                            setImg={setImg}
                            setFormType={setFormType}
                            setLine_ApprovedStatus={setLine_ApprovedStatus}
                        />
                    ) : (
                        <Add
                            handleOnClickRegister={handleOnClickUpdate}
                            line_Name={line_Name}
                            setLine_Name={setLine_Name}
                            line_Description={line_Description}
                            setLine_Description={setLine_Description}
                            DescriptionAgain={DescriptionAgain}
                            setDescriptionAgain={setDescriptionAgain}
                            img={img}
                            setImg={setImg}
                            setFormType={setFormType}
                            setLine_ApprovedStatus={setLine_ApprovedStatus}
                        />
                    )}
                </>
            )}
        </div>
    );
}

export default Index;
