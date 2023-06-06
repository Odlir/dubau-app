import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import env from '@/env.js';
import Preload from '@/components/preload/preload.jsx';
import columns from '../../data/ProductServiceType.jsx';
import 'sweetalert2/src/sweetalert2.scss';
import Add from './add.jsx';
import List from '../../components/layouts/list/index.jsx';

function Index() {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [DescriptionAgain, setDescriptionAgain] = useState('');
    const [created_in, setCreated_in] = useState('');
    const [status, setStatus] = useState('1');
    const [formType, setFormType] = useState('list');
    /* Server Side */
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [page_, setPage_] = useState(1);
    const [dataxProductServiceType, setdataxProductServiceType] = useState('');

    const fetchProductServiceTypes = async (page) => {
        setLoading(true);
        const endpoint = `${env.apiURL}listProductServiceType`;
        const response = await axios.get(
            `${endpoint}?page=${page}&per_page=${perPage}`
        );
        setData(response.data.data);
        setPage_(response.data.page);
        setTotalRows(response.data.total);
        setLoading(false);
    };

    const handlePageChange = (page) => {
        fetchProductServiceTypes(page);
    };

    const handlePerRowsChange = (rows) => {
        setLoading(true);
        setPerPage(rows);
    };

    useEffect(() => {
        fetchProductServiceTypes(page_);
    }, []);

    useEffect(() => {
        fetchProductServiceTypes(page_);
    }, [perPage]);

    const actionDelete = async (product_service_type_id) => {
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
                const endpoint = `${env.apiURL}deleteProductServiceType`;
                axios
                    .post(endpoint, { product_service_type_id, status: 0 })
                    .then(() => {
                        Swal.fire(
                            'Eliminado!',
                            'Se ha eliminado Correctamente.',
                            'success'
                        ).then(() => {
                            fetchProductServiceTypes(page_);
                        });
                    })
                    .catch(() => {
                        alert('Operacion no completada');
                    });
            }
        });
    };

    const actionEdit = async (product_service_type_id) => {
        const endpoint = `${env.apiURL}listXProductServiceType`;
        const response = await axios.get(
            `${endpoint}?product_service_type_id=${product_service_type_id}`
        );
        setdataxProductServiceType(response.data.product_service_type_id);
        setName(response.data.name);
        setType(response.data.type);
        setFormType('edit');
    };
    const actionAdd = async () => {
        setFormType('register');
    };

    const handleOnClickRegister = async (e) => {
        e.preventDefault();
        const endpoint = `${env.apiURL}registerProductServiceType`;
        await axios
            .post(endpoint, { name, type, status: '1' })
            .then(() => {
                window.location.reload();
            })
            .catch(() => {
                alert('Debe completar correctamente sus datos');
            });
    };

    const handleOnClickUpdate = async (e) => {
        e.preventDefault();
        const endpoint = `${env.apiURL}updateProductServiceType`;
        await axios
            .post(endpoint, {
                product_service_type_id: dataxProductServiceType,
                name,
                type,
            })
            .then(() => {
                window.location.reload();
            })
            .catch(() => {
                alert('Debe completar correctamente sus datos');
            });
    };

    const captureType = (e) => {
        setStatus(e.target.value);
    };

    const handleOnClickSearch = async () => {
        setLoading(true);
        const endpoint = `${env.apiURL}listProductServiceType`;
        const response = await axios.get(
            `${endpoint}?page=${page_}&per_page=${perPage}&name=${name}&created_in=${created_in}`
        );
        setData(response.data.data);
        setPage_(response.data.page);
        setTotalRows(response.data.total);
        setLoading(false);
    };

    const handleOnClickClean = async () => {
        setLoading(true);
        setName('');
        setType('');
        setStatus('');
        setCreated_in('');
        fetchProductServiceTypes(1);
        setLoading(false);
    };

    return (
        <div>
            {formType === 'list' ? (
                <>
                    <List
                        nameSection="Tipo de Producto / Servicio"
                        dataType="text"
                        dataSearch1={name}
                        setdataSearch1={setName}
                        dataType2="date"
                        dataSearch2={created_in}
                        setdataSearch2={setCreated_in}
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
                            name={name}
                            setName={setName}
                            type={type}
                            setType={setType}
                            DescriptionAgain={DescriptionAgain}
                            setDescriptionAgain={setDescriptionAgain}
                            setFormType={setFormType}
                        />
                    ) : (
                        <Add
                            handleOnClickRegister={handleOnClickUpdate}
                            name={name}
                            setName={setName}
                            type={type}
                            setType={setType}
                            DescriptionAgain={DescriptionAgain}
                            setDescriptionAgain={setDescriptionAgain}
                            setFormType={setFormType}
                        />
                    )}
                </>
            )}
        </div>
    );
}

export default Index;
