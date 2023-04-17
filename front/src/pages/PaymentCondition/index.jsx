import React, {useEffect, useState} from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {env} from "@/env.js";
import DataTable from 'react-data-table-component';
import columns from '../../data/PaymentCondition.jsx';
import Preload from "@/components/preload/preload";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import Add  from '../PaymentCondition/add.jsx'
import List from "../../components/layouts/list/index.jsx";

const Index = () => {
    const navigate = useNavigate()

    const [payment_condition_Name, setPaymentCondition_Name] = useState('');
    const [payment_condition_Description, setPaymentCondition_Description] = useState('');
    const [DescriptionAgain, setDescriptionAgain] = useState('');
    const [payment_condition_CreationDate, setPaymentConditionCreationDate] = useState('');
    const [payment_condition_ApprovedStatus, setPaymentCondition_ApprovedStatus] = useState('1');
    const [formType, setFormType] = useState('list');
    /*Server Side*/
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [page_, setPage_] = useState(1);
    const [dataxPaymentCondition, setdataxPaymentCondition] = useState('');

    const fetchPaymentConditions = async page => {
        setLoading(true);
        const endpoint = `${env.apiURL}listPaymentCondition`;
        const response = await axios.get(`${endpoint}?page=${page}&per_page=${perPage}`);
        setData(response.data.data);
        setPage_(response.data.page);
        setTotalRows(response.data.total);
        setLoading(false);
    };

    const handlePageChange = page => {
        fetchPaymentConditions(page);
    };

    const handlePerRowsChange = (rows) => {
        setLoading(true);
        setPerPage(rows);
    };

    useEffect(() => {
        fetchPaymentConditions(page_);
    }, []);

    useEffect(() => {
        fetchPaymentConditions(page_);
    }, [perPage]);

    const actionDelete = async (payment_condition_ID) => {
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
                const endpoint = `${env.apiURL}deletePaymentCondition`;
                axios.post(endpoint, {payment_condition_ID: payment_condition_ID, payment_condition_StatusID: 0})
                    .then(function (response) {
                        Swal.fire(
                            'Eliminado!',
                            'Se ha eliminado Correctamente.',
                            'success'
                        ).then((result) => {
                            fetchPaymentConditions(page_);
                        });
                    })
                    .catch(error => {
                        alert('Operacion no completada')
                    })

            }
        })
    }

    const actionEdit = async (payment_condition_ID) => {
        const endpoint = `${env.apiURL}listXPaymentCondition`;
        const response = await axios.get(`${endpoint}?payment_condition_ID=${payment_condition_ID}`);
        setdataxPaymentCondition(response.data.payment_condition_ID);
        setPaymentCondition_Name(response.data.payment_condition_Name);
        setPaymentCondition_Description(response.data.payment_condition_Description);
        setFormType('edit');
    }
    const actionAdd = async () => {
        setFormType('register');
    }

    const handleOnClickRegister = async (e) => {
        e.preventDefault();
        const endpoint = `${env.apiURL}registerPaymentCondition`
        await axios.post(endpoint, {payment_condition_Name: payment_condition_Name, payment_condition_Description: payment_condition_Description, payment_condition_StatusID: '1'})
            .then(function (response) {
                window.location.reload();
            })
            .catch(error => {
                alert('Debe completar correctamente sus datos')
            })
    }

    const handleOnClickUpdate = async (e) => {
        e.preventDefault();
        const endpoint = `${env.apiURL}updatePaymentCondition`
        await axios.post(endpoint, {payment_condition_ID:dataxPaymentCondition, payment_condition_Name: payment_condition_Name, payment_condition_Description: payment_condition_Description})
            .then(function (response) {
                window.location.reload();
            })
            .catch(error => {
                alert('Debe completar correctamente sus datos')
            })
    }

    const captureType = (e) => {
        setPaymentCondition_ApprovedStatus(e.target.value);
    }

    const handleOnClickSearch = async page => {
        setLoading(true);
        const endpoint = `${env.apiURL}listPaymentCondition`;
        const response = await axios.get(`${endpoint}?page=${page_}&per_page=${perPage}&payment_condition_Name=${payment_condition_Name}&payment_condition_CreationDate=${payment_condition_CreationDate}`);
        setData(response.data.data);
        setPage_(response.data.page);
        setTotalRows(response.data.total);
        setLoading(false);
    };

    const handleOnClickClean= async page => {
        setLoading(true);
        setPaymentCondition_Name('');
        setPaymentCondition_Description('');
        setPaymentCondition_ApprovedStatus('');
        setPaymentConditionCreationDate('');
        fetchPaymentConditions(1);
        setLoading(false);
    };
    console.log(payment_condition_ApprovedStatus);

    return (
        <div>
            { (formType === 'list') ?
                <>
                <List
                    nameSection={'Condicion de Pago'}
                    dataType={'text'}
                    dataSearch1={payment_condition_Name}
                    setdataSearch1={setPaymentCondition_Name}
                    dataType2={'date'}
                    dataSearch2={payment_condition_CreationDate}
                    setdataSearch2={setPaymentConditionCreationDate}
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
                          payment_condition_Name={payment_condition_Name}
                          setPaymentCondition_Name={setPaymentCondition_Name}
                          payment_condition_Description={payment_condition_Description}
                          setPaymentCondition_Description={setPaymentCondition_Description}
                          DescriptionAgain={DescriptionAgain}
                          setDescriptionAgain={setDescriptionAgain}
                          setFormType={setFormType}
                          setPaymentCondition_ApprovedStatus={setPaymentCondition_ApprovedStatus}
                    />
                    :
                        <Add  handleOnClickRegister={handleOnClickUpdate}
                              payment_condition_Name={payment_condition_Name}
                              setPaymentCondition_Name={setPaymentCondition_Name}
                              payment_condition_Description={payment_condition_Description}
                              setPaymentCondition_Description={setPaymentCondition_Description}
                              DescriptionAgain={DescriptionAgain}
                              setDescriptionAgain={setDescriptionAgain}
                              setFormType={setFormType}
                              setPaymentCondition_ApprovedStatus={setPaymentCondition_ApprovedStatus}
                        />
                    }
                    </>
            }
        </div>
    );
}

export default Index