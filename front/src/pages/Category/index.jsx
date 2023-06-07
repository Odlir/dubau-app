import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import env from '@/env.js';
import Preload from '@/components/preload/preload.jsx';
import categoryContext from '@/context/categoryContext.jsx';
import columns from '../../data/Category.jsx';
import Add from './add.jsx';
import List from '../../components/layouts/list/index.jsx';

function Index() {
    const [example, setExample] = useState('');
    const [category_Name, setCategory_Name] = useState('');
    const [category_Description, setCategory_Description] = useState('');
    const [DescriptionAgain, setDescriptionAgain] = useState('');
    const [category_CreationDate, setCategoryCreationDate] = useState('');
    const [category_ApprovedStatus, setCategory_ApprovedStatus] = useState('1');
    const [formType, setFormType] = useState('list');
    /* Server Side */
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [page_, setPage_] = useState(1);
    const [dataxCategory, setdataxCategory] = useState('');

    const fetchCategorys = async (page) => {
        setLoading(true);
        const endpoint = `${env.apiURL}listCategory`;
        const response = await axios.get(
            `${endpoint}?page=${page}&per_page=${perPage}`
        );
        setData(response.data.data);
        setPage_(response.data.page);
        setTotalRows(response.data.total);
        setLoading(false);
    };

    const handlePageChange = (page) => {
        fetchCategorys(page);
    };

    const handlePerRowsChange = (rows) => {
        setLoading(true);
        setPerPage(rows);
    };

    useEffect(() => {
        fetchCategorys(page_);
    }, []);

    useEffect(() => {
        fetchCategorys(page_);
    }, [perPage]);

    const actionDelete = async (category_ID) => {
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
                const endpoint = `${env.apiURL}deleteCategory`;
                axios
                    .post(endpoint, { category_ID, category_StatusID: 0 })
                    .then(() => {
                        Swal.fire(
                            'Eliminado!',
                            'Se ha eliminado Correctamente.',
                            'success'
                        ).then(() => {
                            fetchCategorys(page_);
                        });
                    })
                    .catch(() => {
                        alert('Operacion no completada');
                    });
            }
        });
    };

    const actionEdit = async (category_ID) => {
        const endpoint = `${env.apiURL}listXCategory`;
        const response = await axios.get(
            `${endpoint}?category_ID=${category_ID}`
        );
        setdataxCategory(response.data.category_ID);
        setCategory_Name(response.data.category_Name);
        setCategory_Description(response.data.category_Description);
        setFormType('edit');
    };
    const actionAdd = async () => {
        setFormType('register');
    };

    const handleOnClickRegister = async (e) => {
        e.preventDefault();
        const endpoint = `${env.apiURL}registerCategory`;
        await axios
            .post(endpoint, {
                category_Name,
                category_Description,
                category_StatusID: '1',
            })
            .then(() => {
                window.location.reload();
            })
            .catch(() => {
                alert('Debe completar correctamente sus datos');
            });
    };

    const handleOnClickUpdate = async (e) => {
        e.preventDefault();
        const endpoint = `${env.apiURL}updateCategory`;
        await axios
            .post(endpoint, {
                category_ID: dataxCategory,
                category_Name,
                category_Description,
            })
            .then(() => {
                window.location.reload();
            })
            .catch(() => {
                alert('Debe completar correctamente sus datos');
            });
    };

    const captureType = (e) => {
        setCategory_ApprovedStatus(e.target.value);
    };

    const handleOnClickSearch = async () => {
        setLoading(true);
        const endpoint = `${env.apiURL}listCategory`;
        const response = await axios.get(
            `${endpoint}?page=${page_}&per_page=${perPage}&category_Name=${category_Name}&category_CreationDate=${category_CreationDate}`
        );
        setData(response.data.data);
        setPage_(response.data.page);
        setTotalRows(response.data.total);
        setLoading(false);
    };

    const handleOnClickClean = async () => {
        setLoading(true);
        setCategory_Name('');
        setCategory_Description('');
        setCategory_ApprovedStatus('');
        setCategoryCreationDate('');
        fetchCategorys(1);
        setLoading(false);
    };

    return (
        <categoryContext.Provider value={example}>
            <div>
                {formType === 'list' ? (
                    <>
                        <List
                            nameSection="Categoria"
                            dataType="text"
                            dataSearch1={category_Name}
                            setdataSearch1={setCategory_Name}
                            dataType2="date"
                            dataSearch2={category_CreationDate}
                            setdataSearch2={setCategoryCreationDate}
                            captureType={captureType}
                            handleOnClickSearch={handleOnClickSearch}
                            handleOnClickClean={handleOnClickClean}
                            actionAdd={actionAdd}
                        />
                        {data.length !== 0 ? (
                            <DataTable
                                columns={columns(actionDelete, actionEdit)}
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
                                category_Name={category_Name}
                                setCategory_Name={setCategory_Name}
                                category_Description={category_Description}
                                setCategory_Description={
                                    setCategory_Description
                                }
                                DescriptionAgain={DescriptionAgain}
                                setDescriptionAgain={setDescriptionAgain}
                                setFormType={setFormType}
                                setCategory_ApprovedStatus={
                                    setCategory_ApprovedStatus
                                }
                            />
                        ) : (
                            <Add
                                handleOnClickRegister={handleOnClickUpdate}
                                category_Name={category_Name}
                                setCategory_Name={setCategory_Name}
                                category_Description={category_Description}
                                setCategory_Description={
                                    setCategory_Description
                                }
                                DescriptionAgain={DescriptionAgain}
                                setDescriptionAgain={setDescriptionAgain}
                                setFormType={setFormType}
                                setCategory_ApprovedStatus={
                                    setCategory_ApprovedStatus
                                }
                            />
                        )}
                    </>
                )}
            </div>
        </categoryContext.Provider>
    );
}

export default Index;
