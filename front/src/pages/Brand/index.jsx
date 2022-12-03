import React, {useEffect, useState} from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {env} from "@/env.js";
import DataTable from 'react-data-table-component';
import columns from '../../data/Brand.jsx';
import Preload from "@/components/preload/preload";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import Add  from '../Brand/add.jsx'
import List from "../../components/layouts/list/index.jsx";

const Index = () => {
    const navigate = useNavigate()

    const [brand_Name, setBrand_Name] = useState('');
    const [brand_Description, setBrand_Description] = useState('');
    const [DescriptionAgain, setDescriptionAgain] = useState('');
    const [brand_CreationDate, setBrandCreationDate] = useState('');
    const [brand_ApprovedStatus, setBrand_ApprovedStatus] = useState('1');
    const [formType, setFormType] = useState('list');
    /*Server Side*/
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [page_, setPage_] = useState(1);
    const [dataxBrand, setdataxBrand] = useState('');

    const fetchBrands = async page => {
        setLoading(true);
        const endpoint = `${env.apiURL}listBrand`;
        const response = await axios.get(`${endpoint}?page=${page}&per_page=${perPage}`);
        setData(response.data.data);
        setPage_(response.data.page);
        setTotalRows(response.data.total);
        setLoading(false);
    };

    const handlePageChange = page => {
        fetchBrands(page);
    };

    const handlePerRowsChange = (rows) => {
        setLoading(true);
        setPerPage(rows);
    };

    useEffect(() => {
        fetchBrands(page_);
    }, []);

    useEffect(() => {
        fetchBrands(page_);
    }, [perPage]);

    const actionDelete = async (brand_ID) => {
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
                const endpoint = `${env.apiURL}deleteBrand`;
                axios.post(endpoint, {brand_ID: brand_ID, brand_StatusID: 0})
                    .then(function (response) {
                        Swal.fire(
                            'Eliminado!',
                            'Se ha eliminado Correctamente.',
                            'success'
                        ).then((result) => {
                            fetchBrands(page_);
                        });
                    })
                    .catch(error => {
                        alert('Operacion no completada')
                    })

            }
        })
    }

    const actionEdit = async (brand_ID) => {
        const endpoint = `${env.apiURL}listXBrand`;
        const response = await axios.get(`${endpoint}?brand_ID=${brand_ID}`);
        setdataxBrand(response.data.brand_ID);
        setBrand_Name(response.data.brand_Name);
        setBrand_Description(response.data.brand_Description);
        setFormType('edit');
    }
    const actionAdd = async () => {
        setFormType('register');
    }

    const handleOnClickRegister = async (e) => {
        e.preventDefault();
        const endpoint = `${env.apiURL}registerBrand`
        await axios.post(endpoint, {brand_Name: brand_Name, brand_Description: brand_Description, brand_StatusID: '1'})
            .then(function (response) {
                window.location.reload();
            })
            .catch(error => {
                alert('Debe completar correctamente sus datos')
            })
    }

    const handleOnClickUpdate = async (e) => {
        e.preventDefault();
        const endpoint = `${env.apiURL}updateBrand`
        await axios.post(endpoint, {brand_ID:dataxBrand, brand_Name: brand_Name, brand_Description: brand_Description})
            .then(function (response) {
                window.location.reload();
            })
            .catch(error => {
                alert('Debe completar correctamente sus datos')
            })
    }

    const captureType = (e) => {
        setBrand_ApprovedStatus(e.target.value);
    }

    const handleOnClickSearch = async page => {
        setLoading(true);
        const endpoint = `${env.apiURL}listBrand`;
        const response = await axios.get(`${endpoint}?page=${page_}&per_page=${perPage}&brand_Name=${brand_Name}&brand_CreationDate=${brand_CreationDate}`);
        setData(response.data.data);
        setPage_(response.data.page);
        setTotalRows(response.data.total);
        setLoading(false);
    };

    const handleOnClickClean= async page => {
        setLoading(true);
        setBrand_Name('');
        setBrand_Description('');
        setBrand_ApprovedStatus('');
        setBrandCreationDate('');
        fetchBrands(1);
        setLoading(false);
    };
    console.log(brand_ApprovedStatus);

    return (
        <div>
            { (formType === 'list') ?
                <>
                <List
                    nameSection={'Marca'}
                    dataType={'text'}
                    dataSearch1={brand_Name}
                    setdataSearch1={setBrand_Name}
                    dataType2={'date'}
                    dataSearch2={brand_CreationDate}
                    setdataSearch2={setBrandCreationDate}
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
                        <Preload/>
                    }
                </>
                    :
                <>
                    { (formType === 'register') ?
                    <Add  handleOnClickRegister={handleOnClickRegister}
                          brand_Name={brand_Name}
                          setBrand_Name={setBrand_Name}
                          brand_Description={brand_Description}
                          setBrand_Description={setBrand_Description}
                          DescriptionAgain={DescriptionAgain}
                          setDescriptionAgain={setDescriptionAgain}
                          setFormType={setFormType}
                          setBrand_ApprovedStatus={setBrand_ApprovedStatus}
                    />
                    :
                        <Add  handleOnClickRegister={handleOnClickUpdate}
                              brand_Name={brand_Name}
                              setBrand_Name={setBrand_Name}
                              brand_Description={brand_Description}
                              setBrand_Description={setBrand_Description}
                              DescriptionAgain={DescriptionAgain}
                              setDescriptionAgain={setDescriptionAgain}
                              setFormType={setFormType}
                              setBrand_ApprovedStatus={setBrand_ApprovedStatus}
                        />
                    }
                    </>
            }
        </div>
    );
}

export default Index