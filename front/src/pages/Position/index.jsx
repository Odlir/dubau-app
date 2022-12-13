import React, {useEffect, useState} from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {env} from "@/env.js";
import DataTable from 'react-data-table-component';
import columns from '../../data/Position.jsx';
import Preload from "@/components/preload/preload";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import Add  from '../Position/add.jsx'
import List from "../../components/layouts/list/index.jsx";

const Index = () => {
    const navigate = useNavigate()

    const [position_Name, setPosition_Name] = useState('');
    const [position_Description, setPosition_Description] = useState('');
    const [DescriptionAgain, setDescriptionAgain] = useState('');
    const [position_CreationDate, setPositionCreationDate] = useState('');
    const [position_ApprovedStatus, setPosition_ApprovedStatus] = useState('1');
    const [formType, setFormType] = useState('list');
    /*Server Side*/
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [page_, setPage_] = useState(1);
    const [dataxPosition, setdataxPosition] = useState('');

    const fetchPositions = async page => {
        setLoading(true);
        const endpoint = `${env.apiURL}listPosition`;
        const response = await axios.get(`${endpoint}?page=${page}&per_page=${perPage}`);
        setData(response.data.data);
        setPage_(response.data.page);
        setTotalRows(response.data.total);
        setLoading(false);
    };

    const handlePageChange = page => {
        fetchPositions(page);
    };

    const handlePerRowsChange = (rows) => {
        setLoading(true);
        setPerPage(rows);
    };

    useEffect(() => {
        fetchPositions(page_);
    }, []);

    useEffect(() => {
        fetchPositions(page_);
    }, [perPage]);

    const actionDelete = async (position_ID) => {
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
                const endpoint = `${env.apiURL}deletePosition`;
                axios.post(endpoint, {position_ID: position_ID, position_StatusID: 0})
                    .then(function (response) {
                        Swal.fire(
                            'Eliminado!',
                            'Se ha eliminado Correctamente.',
                            'success'
                        ).then((result) => {
                            fetchPositions(page_);
                        });
                    })
                    .catch(error => {
                        alert('Operacion no completada')
                    })

            }
        })
    }

    const actionEdit = async (position_ID) => {
        const endpoint = `${env.apiURL}listXPosition`;
        const response = await axios.get(`${endpoint}?position_ID=${position_ID}`);
        setdataxPosition(response.data.position_ID);
        setPosition_Name(response.data.position_Name);
        setPosition_Description(response.data.position_Description);
        setFormType('edit');
    }
    const actionAdd = async () => {
        setFormType('register');
    }

    const handleOnClickRegister = async (e) => {
        e.preventDefault();
        const endpoint = `${env.apiURL}registerPosition`
        await axios.post(endpoint, {position_Name: position_Name, position_Description: position_Description, position_StatusID: '1'},{
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
        const endpoint = `${env.apiURL}updatePosition`
        await axios.post(endpoint, {position_ID:dataxPosition, position_Name: position_Name, position_Description: position_Description},{
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
        setPosition_ApprovedStatus(e.target.value);
    }

    const handleOnClickSearch = async page => {
        setLoading(true);
        const endpoint = `${env.apiURL}listPosition`;
        const response = await axios.get(`${endpoint}?page=${page_}&per_page=${perPage}&position_Name=${position_Name}&position_CreationDate=${position_CreationDate}`);
        setData(response.data.data);
        setPage_(response.data.page);
        setTotalRows(response.data.total);
        setLoading(false);
    };

    const handleOnClickClean= async page => {
        setLoading(true);
        setPosition_Name('');
        setPosition_Description('');
        setPosition_ApprovedStatus('');
        setPositionCreationDate('');
        fetchPositions(1);
        setLoading(false);
    };
    console.log(position_ApprovedStatus);

    const handleOnClickModalImage = async (imageName,positionName,positionDescription) => {
        Swal.fire({
            title: positionName,
            text: positionDescription,
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
                    nameSection={'Cargo'}
                    dataType={'text'}
                    dataSearch1={position_Name}
                    setdataSearch1={setPosition_Name}
                    dataType2={'date'}
                    dataSearch2={position_CreationDate}
                    setdataSearch2={setPositionCreationDate}
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
                          position_Name={position_Name}
                          setPosition_Name={setPosition_Name}
                          position_Description={position_Description}
                          setPosition_Description={setPosition_Description}
                          DescriptionAgain={DescriptionAgain}
                          setDescriptionAgain={setDescriptionAgain}
                          setFormType={setFormType}
                          setPosition_ApprovedStatus={setPosition_ApprovedStatus}
                    />
                    :
                        <Add  handleOnClickRegister={handleOnClickUpdate}
                              position_Name={position_Name}
                              setPosition_Name={setPosition_Name}
                              position_Description={position_Description}
                              setPosition_Description={setPosition_Description}
                              DescriptionAgain={DescriptionAgain}
                              setDescriptionAgain={setDescriptionAgain}
                              setFormType={setFormType}
                              setPosition_ApprovedStatus={setPosition_ApprovedStatus}
                        />
                    }
                    </>
            }
        </div>
    );
}

export default Index