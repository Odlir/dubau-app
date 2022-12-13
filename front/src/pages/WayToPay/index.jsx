import React, {useEffect, useState} from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {env} from "@/env.js";
import DataTable from 'react-data-table-component';
import columns from '../../data/WaytoPay.jsx';
import Preload from "@/components/preload/preload";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import Add  from '../WaytoPay/add.jsx'
import List from "../../components/layouts/list/index.jsx";

const Index = () => {
    const navigate = useNavigate()

    const [waytopay_Name, setWaytoPay_Name] = useState('');
    const [waytopay_Description, setWaytoPay_Description] = useState('');
    const [DescriptionAgain, setDescriptionAgain] = useState('');
    const [waytopay_CreationDate, setWaytoPayCreationDate] = useState('');
    const [waytopay_ApprovedStatus, setWaytoPay_ApprovedStatus] = useState('1');
    const [formType, setFormType] = useState('list');
    /*Server Side*/
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [page_, setPage_] = useState(1);
    const [dataxWaytoPay, setdataxWaytoPay] = useState('');

    const fetchWaytoPays = async page => {
        setLoading(true);
        const endpoint = `${env.apiURL}listWaytoPay`;
        const response = await axios.get(`${endpoint}?page=${page}&per_page=${perPage}`);
        setData(response.data.data);
        setPage_(response.data.page);
        setTotalRows(response.data.total);
        setLoading(false);
    };

    const handlePageChange = page => {
        fetchWaytoPays(page);
    };

    const handlePerRowsChange = (rows) => {
        setLoading(true);
        setPerPage(rows);
    };

    useEffect(() => {
        fetchWaytoPays(page_);
    }, []);

    useEffect(() => {
        fetchWaytoPays(page_);
    }, [perPage]);

    const actionDelete = async (waytopay_ID) => {
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
                const endpoint = `${env.apiURL}deleteWaytoPay`;
                axios.post(endpoint, {waytopay_ID: waytopay_ID, waytopay_StatusID: 0})
                    .then(function (response) {
                        Swal.fire(
                            'Eliminado!',
                            'Se ha eliminado Correctamente.',
                            'success'
                        ).then((result) => {
                            fetchWaytoPays(page_);
                        });
                    })
                    .catch(error => {
                        alert('Operacion no completada')
                    })

            }
        })
    }

    const actionEdit = async (waytopay_ID) => {
        const endpoint = `${env.apiURL}listXWaytoPay`;
        const response = await axios.get(`${endpoint}?waytopay_ID=${waytopay_ID}`);
        setdataxWaytoPay(response.data.waytopay_ID);
        setWaytoPay_Name(response.data.waytopay_Name);
        setWaytoPay_Description(response.data.waytopay_Description);
        setFormType('edit');
    }
    const actionAdd = async () => {
        setFormType('register');
    }

    const handleOnClickRegister = async (e) => {
        e.preventDefault();
        const endpoint = `${env.apiURL}registerWaytoPay`
        await axios.post(endpoint, {waytopay_Name: waytopay_Name, waytopay_Description: waytopay_Description, waytopay_StatusID: '1'},{
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
        const endpoint = `${env.apiURL}updateWaytoPay`
        await axios.post(endpoint, {waytopay_ID:dataxWaytoPay, waytopay_Name: waytopay_Name, waytopay_Description: waytopay_Description},{
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
        setWaytoPay_ApprovedStatus(e.target.value);
    }

    const handleOnClickSearch = async page => {
        setLoading(true);
        const endpoint = `${env.apiURL}listWaytoPay`;
        const response = await axios.get(`${endpoint}?page=${page_}&per_page=${perPage}&waytopay_Name=${waytopay_Name}&waytopay_CreationDate=${waytopay_CreationDate}`);
        setData(response.data.data);
        setPage_(response.data.page);
        setTotalRows(response.data.total);
        setLoading(false);
    };

    const handleOnClickClean= async page => {
        setLoading(true);
        setWaytoPay_Name('');
        setWaytoPay_Description('');
        setWaytoPay_ApprovedStatus('');
        setWaytoPayCreationDate('');
        fetchWaytoPays(1);
        setLoading(false);
    };
    console.log(waytopay_ApprovedStatus);

    const handleOnClickModalImage = async (imageName,waytopayName,waytopayDescription) => {
        Swal.fire({
            title: waytopayName,
            text: waytopayDescription,
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
                    nameSection={'Forma de Pago'}
                    dataType={'text'}
                    dataSearch1={waytopay_Name}
                    setdataSearch1={setWaytoPay_Name}
                    dataType2={'date'}
                    dataSearch2={waytopay_CreationDate}
                    setdataSearch2={setWaytoPayCreationDate}
                    captureType={captureType}
                    handleOnClickSearch={handleOnClickSearch}
                    handleOnClickClean={handleOnClickClean}
                    actionAdd={actionAdd}
                />
                    {data.length != 0 ?
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
                          waytopay_Name={waytopay_Name}
                          setWaytoPay_Name={setWaytoPay_Name}
                          waytopay_Description={waytopay_Description}
                          setWaytoPay_Description={setWaytoPay_Description}
                          DescriptionAgain={DescriptionAgain}
                          setDescriptionAgain={setDescriptionAgain}
                          setFormType={setFormType}
                          setWaytoPay_ApprovedStatus={setWaytoPay_ApprovedStatus}
                    />
                    :
                        <Add  handleOnClickRegister={handleOnClickUpdate}
                              waytopay_Name={waytopay_Name}
                              setWaytoPay_Name={setWaytoPay_Name}
                              waytopay_Description={waytopay_Description}
                              setWaytoPay_Description={setWaytoPay_Description}
                              DescriptionAgain={DescriptionAgain}
                              setDescriptionAgain={setDescriptionAgain}

                              setFormType={setFormType}
                              setWaytoPay_ApprovedStatus={setWaytoPay_ApprovedStatus}
                        />
                    }
                    </>
            }
        </div>
    );
}

export default Index