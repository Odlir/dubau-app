import React, {useEffect, useState} from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {env} from "@/env.js";
import DataTable from 'react-data-table-component';
import columns from '../../data/Area.jsx';
import Preload from "@/components/preload/preload";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import Add  from '../Area/add.jsx'
import List from "../../components/layouts/list/index.jsx";

const Index = () => {
    const navigate = useNavigate()

    const [area_Name, setArea_Name] = useState('');
    const [area_Description, setArea_Description] = useState('');
    const [DescriptionAgain, setDescriptionAgain] = useState('');
    const [area_CreationDate, setAreaCreationDate] = useState('');
    const [area_ApprovedStatus, setArea_ApprovedStatus] = useState('1');
    const [formType, setFormType] = useState('list');
    /*Server Side*/
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [page_, setPage_] = useState(1);
    const [dataxArea, setdataxArea] = useState('');

    const fetchAreas = async page => {
        setLoading(true);
        const endpoint = `${env.apiURL}listArea`;
        const response = await axios.get(`${endpoint}?page=${page}&per_page=${perPage}`);
        setData(response.data.data);
        setPage_(response.data.page);
        setTotalRows(response.data.total);
        setLoading(false);
    };

    const handlePageChange = page => {
        fetchAreas(page);
    };

    const handlePerRowsChange = (rows) => {
        setLoading(true);
        setPerPage(rows);
    };

    useEffect(() => {
        fetchAreas(page_);
    }, []);

    useEffect(() => {
        fetchAreas(page_);
    }, [perPage]);

    const actionDelete = async (area_ID) => {
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
                const endpoint = `${env.apiURL}deleteArea`;
                axios.post(endpoint, {area_ID: area_ID, area_StatusID: 0})
                    .then(function (response) {
                        Swal.fire(
                            'Eliminado!',
                            'Se ha eliminado Correctamente.',
                            'success'
                        ).then((result) => {
                            fetchAreas(page_);
                        });
                    })
                    .catch(error => {
                        alert('Operacion no completada')
                    })

            }
        })
    }

    const actionEdit = async (area_ID) => {
        const endpoint = `${env.apiURL}listXArea`;
        const response = await axios.get(`${endpoint}?area_ID=${area_ID}`);
        setdataxArea(response.data.area_ID);
        setArea_Name(response.data.area_Name);
        setArea_Description(response.data.area_Description);
        setFormType('edit');
    }
    const actionAdd = async () => {
        setFormType('register');
    }

    const handleOnClickRegister = async (e) => {
        e.preventDefault();
        const endpoint = `${env.apiURL}registerArea`
        await axios.post(endpoint, {area_Name: area_Name, area_Description: area_Description, area_StatusID: '1'})
            .then(function (response) {
                window.location.reload();
            })
            .catch(error => {
                alert('Debe completar correctamente sus datos')
            })
    }

    const handleOnClickUpdate = async (e) => {
        e.preventDefault();
        const endpoint = `${env.apiURL}updateArea`
        await axios.post(endpoint, {area_ID:dataxArea, area_Name: area_Name, area_Description: area_Description})
            .then(function (response) {
                window.location.reload();
            })
            .catch(error => {
                alert('Debe completar correctamente sus datos')
            })
    }

    const captureType = (e) => {
        setArea_ApprovedStatus(e.target.value);
    }

    const handleOnClickSearch = async page => {
        setLoading(true);
        const endpoint = `${env.apiURL}listArea`;
        const response = await axios.get(`${endpoint}?page=${page_}&per_page=${perPage}&area_Name=${area_Name}&area_CreationDate=${area_CreationDate}`);
        setData(response.data.data);
        setPage_(response.data.page);
        setTotalRows(response.data.total);
        setLoading(false);
    };

    const handleOnClickClean= async page => {
        setLoading(true);
        setArea_Name('');
        setArea_Description('');
        setArea_ApprovedStatus('');
        setAreaCreationDate('');
        fetchAreas(1);
        setLoading(false);
    };
    console.log(area_ApprovedStatus);

    return (
        <div>
            { (formType === 'list') ?
                <>
                <List
                    nameSection={'Area'}
                    dataType={'text'}
                    dataSearch1={area_Name}
                    setdataSearch1={setArea_Name}
                    dataType2={'date'}
                    dataSearch2={area_CreationDate}
                    setdataSearch2={setAreaCreationDate}
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
                          area_Name={area_Name}
                          setArea_Name={setArea_Name}
                          area_Description={area_Description}
                          setArea_Description={setArea_Description}
                          DescriptionAgain={DescriptionAgain}
                          setDescriptionAgain={setDescriptionAgain}
                          setFormType={setFormType}
                          setArea_ApprovedStatus={setArea_ApprovedStatus}
                    />
                    :
                        <Add  handleOnClickRegister={handleOnClickUpdate}
                              area_Name={area_Name}
                              setArea_Name={setArea_Name}
                              area_Description={area_Description}
                              setArea_Description={setArea_Description}
                              DescriptionAgain={DescriptionAgain}
                              setDescriptionAgain={setDescriptionAgain}
                              setFormType={setFormType}
                              setArea_ApprovedStatus={setArea_ApprovedStatus}
                        />
                    }
                    </>
            }
        </div>
    );
}

export default Index