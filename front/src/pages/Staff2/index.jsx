import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import {env} from "@/env.js";
import DataTable from 'react-data-table-component';
import columns from '../../data/Staff2.jsx';
import Preload from "@/components/preload/preload";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import Add from '../Staff2/add.jsx'
import List from "../../components/layouts/list/index.jsx";

const Index = () => {
    const navigate = useNavigate()

    const [person_Name, setPerson_Name] = useState('');
    const [person_LastNamePaternal, setPerson_LastNamePaternal] = useState('');
    const [person_LastNameMaternal, setPerson_LastNameMaternal] = useState('');
    const [person_DateBirth, setPerson_DateBirth] = useState('');
    const [person_Direction, setPerson_Direction] = useState('');
    const [person_Phone, setPerson_Phone] = useState('');
    const [person_CellPhone, setPerson_CellPhone] = useState('');
    const [person_Email, setPerson_Email] = useState('');
    const [person_WebSite, setPerson_WebSite] = useState('');
    const [staff2_StartDate, setStaff2_StartDate] = useState('');
    const [staff2_finalDate, setStaff2_finalDate] = useState('');
    const [staff2_ContractNumber, setStaff2_ContractNumber] = useState('');

    const [ubigeous_PlaceBirth, setUbigeous_PlaceBirth] = useState('');
    const [numberDocument, setNumberDocument] = useState('');
    const [person_Gender, setPerson_Gender] = useState('');
    const [statusmarital_ID, setStatusmarital_ID] = useState('');
    const [nationality_ID, setNationality_ID] = useState('');
    const [ubigeous_Home, setUbigeous_Home] = useState('');
    const [position_ID, setPosition_ID] = useState('');

    const [formType, setFormType] = useState('list');
    const [img, setImg] = useState('');
    /*Server Side*/
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [page_, setPage_] = useState(1);
    const [dataxStaff2, setdataxStaff2] = useState('');

    const fetchStaff2s = async page => {
        setLoading(true);
        const endpoint = `${env.apiURL}listStaff2`;
        const response = await axios.get(`${endpoint}?page=${page}&per_page=${perPage}`);
        setData(response.data.data);
        setPage_(response.data.page);
        setTotalRows(response.data.total);
        setLoading(false);
    };

    const handlePageChange = page => {
        fetchStaff2s(page);
    };

    const handlePerRowsChange = (rows) => {
        setLoading(true);
        setPerPage(rows);
    };

    useEffect(() => {
        fetchStaff2s(page_);
    }, []);

    useEffect(() => {
        fetchStaff2s(page_);
    }, [perPage]);

    const actionDelete = async (staff2_ID) => {
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
                const endpoint = `${env.apiURL}deleteStaff2`;
                axios.post(endpoint, {staff2_ID: staff2_ID, staff2_StatusID: 0})
                    .then(function (response) {
                        Swal.fire(
                            'Eliminado!',
                            'Se ha eliminado Correctamente.',
                            'success'
                        ).then((result) => {
                            fetchStaff2s(page_);
                        });
                    })
                    .catch(error => {
                        alert('Operacion no completada')
                    })
            }
        })
    }

    /*    const actionEdit = async (staff2_ID) => {
            const endpoint = `${env.apiURL}listXStaff2`;
            const response = await axios.get(`${endpoint}?staff2_ID=${staff2_ID}`);
            setdataxStaff2(response.data.staff2_ID);
            setStaff2_Name(response.data.staff2_Name);
            setStaff2_Description(response.data.staff2_Description);
            setFormType('edit');
        }
       */
    const actionAdd = async () => {
        setFormType('register');
    }
    const handleOnClickRegister = async (e) => {
        e.preventDefault();
        const endpoint = `${env.apiURL}registerStaff2`
        await axios.post(endpoint, {
            person_Name: person_Name,
            person_LastNamePaternal: person_LastNamePaternal,
            person_LastNameMaternal: person_LastNameMaternal,
            person_DateBirth: person_DateBirth,
            person_Direction: person_Direction,
            person_Phone: person_Phone,
            person_CellPhone: person_CellPhone,
            person_Email: person_Email,
            person_WebSite: person_WebSite,
            staff2_StartDate: staff2_StartDate,
            staff2_finalDate: staff2_finalDate,
            staff2_ContractNumber: staff2_ContractNumber,

            ubigeous_PlaceBirth: ubigeous_PlaceBirth,
            numberDocument: numberDocument,
            person_Gender: person_Gender,
            statusmarital_ID: statusmarital_ID,
            nationality_ID: nationality_ID,
            ubigeous_Home: ubigeous_Home,
            position_ID: position_ID,
            staff2_StatusID: '1',
            img: img
        }, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(function (response) {
                window.location.reload();
            })
            .catch(error => {
                alert('Debe completar correctamente sus datos')
            })
    }

    const handleOnClickUpdate = async (e) => {
        e.preventDefault();
        const endpoint = `${env.apiURL}updateStaff2`
        await axios.post(endpoint, {
            staff2_ID: dataxStaff2,
            erson_Name: person_Name,
            person_LastNamePaternal: person_LastNamePaternal,
            person_LastNameMaternal: person_LastNameMaternal,
            person_DateBirth: person_DateBirth,
            person_Direction: person_Direction,
            person_Phone: person_Phone,
            person_CellPhone: person_CellPhone,
            person_Email: person_Email,
            person_WebSite: person_WebSite,
            staff2_StartDate: staff2_StartDate,
            staff2_finalDate: staff2_finalDate,
            staff2_ContractNumber: staff2_ContractNumber,

            ubigeous_PlaceBirth: ubigeous_PlaceBirth,
            numberDocument: numberDocument,
            person_Gender: person_Gender,
            statusmarital_ID: statusmarital_ID,
            nationality_ID: nationality_ID,
            ubigeous_Home: ubigeous_Home,
            position_ID: position_ID,

            staff2_StatusID: '1',
            img: img
        }, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(function (response) {
                window.location.reload();
            })
            .catch(error => {
                alert('Debe completar correctamente sus datos')
            })
    }

    const captureType = (e) => {
        setStaff2_ApprovedStatus(e.target.value);
    }

    const handleOnClickSearch = async page => {
        setLoading(true);
        const endpoint = `${env.apiURL}listStaff2`;
        const response = await axios.get(`${endpoint}
        ?page=${page_}
        &per_page=${perPage}
        &person_Name=${person_Name}
        
        `);
        setData(response.data.data);
        setPage_(response.data.page);
        setTotalRows(response.data.total);
        setLoading(false);
    };

    const handleOnClickClean = async page => {
        setLoading(true);
        // setStaff2_Name('');

       /* setStaff2_ApprovedStatus('');
        setStaff2CreationDate('');*/
        fetchStaff2s(1);
        setLoading(false);
    };

    const handleOnClickModalImage = async (imageName, staff2Name, branDescription) => {
        Swal.fire({
            title: staff2Name,
            text: branDescription,
            /* imageAlt: 'Custom image',*/
            imageUrl: env.URL + imageName,
            imageWidth: 500,
            imageHeight: 300,
        })
    }

    return (
        <div>
            {(formType === 'list') ?
                <>
                    {<List
                        nameSection={'Cliente'}
                        dataType={'text'}
                        dataSearch1={person_Name}
                        setdataSearch1={setPerson_Name}
                        dataType2={'date'}
                        dataSearch2={staff2_StartDate}
                        setdataSearch2={staff2_finalDate}
                        captureType={captureType}
                        handleOnClickSearch={handleOnClickSearch}
                        handleOnClickClean={handleOnClickClean}
                        actionAdd={actionAdd}
                    />}
                    {data.length != 0 ?
                       <DataTable
                          columns={columns(actionDelete/*,actionEdit*/, handleOnClickModalImage)}
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

                           {/* <DataTable
                                columns={columns(actionDelete, actionEdit, handleOnClickModalImage)}
                                data={data}
                                progressPending={loading}
                                progressComponent={<Preload/>}
                                noDataComponent={'No existen registros en esta tabla'}
                                pagination
                                paginationServer
                                paginationTotalRows={totalRows}
                                onChangeRowsPerPage={handlePerRowsChange}
                                onChangePage={handlePageChange}
                            />*/}
                        </>
                    }
                </>
                :
                <>
                    {(formType === 'register') ?
                        <Add handleOnClickRegister={handleOnClickRegister}
                             person_Name={person_Name}
                             setPerson_Name={setPerson_Name}
                             person_LastNamePaternal={person_LastNamePaternal}
                             setPerson_LastNamePaternal={setPerson_LastNamePaternal}
                             person_LastNameMaternal={person_LastNameMaternal}
                             setPerson_LastNameMaternal={setPerson_LastNameMaternal}
                             person_DateBirth={person_DateBirth}
                             setPerson_DateBirth={setPerson_DateBirth}
                             person_Direction={person_Direction}
                             setPerson_Direction={setPerson_Direction}
                             person_Phone={person_Phone}
                             setPerson_Phone={setPerson_Phone}
                             person_CellPhone={person_CellPhone}
                             setPerson_CellPhone={setPerson_CellPhone}
                             person_Email={person_Email}
                             setPerson_Email={setPerson_Email}
                             person_WebSite={person_WebSite}
                             setPerson_WebSite={setPerson_WebSite}
                             staff2_StartDate={staff2_StartDate}
                             setStaff2_StartDate={setStaff2_StartDate}
                             staff2_finalDate={staff2_finalDate}
                             setStaff2_finalDate={setStaff2_finalDate}
                             staff2_ContractNumber={staff2_ContractNumber}
                             setStaff2_ContractNumber={setStaff2_ContractNumber}

                             ubigeous_PlaceBirth={ubigeous_PlaceBirth}
                             setUbigeous_PlaceBirth={setUbigeous_PlaceBirth}
                             numberDocument={numberDocument}
                             setNumberDocument={setNumberDocument}
                             person_Gender={person_Gender}
                             setPerson_Gender={setPerson_Gender}
                             statusmarital_ID={statusmarital_ID}
                             setStatusmarital_ID={setStatusmarital_ID}
                             nationality_ID={nationality_ID}
                             setNationality_ID={setNationality_ID}
                             ubigeous_Home={ubigeous_Home}
                             setUbigeous_Home={setUbigeous_Home}
                             position_ID={position_ID}
                             setPosition_ID={setPosition_ID}

                             img={img}
                             setImg={setImg}
                             setFormType={setFormType}
                             /*setStaff2_ApprovedStatus={setStaff2_ApprovedStatus}*/
                        />
                        :
                        <Add handleOnClickRegister={handleOnClickUpdate}
                             person_Name={person_Name}
                             setPerson_Name={setPerson_Name}
                             person_LastNamePaternal={person_LastNamePaternal}
                             setPerson_LastNamePaternal={setPerson_LastNamePaternal}
                             person_LastNameMaternal={person_LastNameMaternal}
                             setPerson_LastNameMaternal={setPerson_LastNameMaternal}
                             person_DateBirth={person_DateBirth}
                             setPerson_DateBirth={setPerson_DateBirth}
                             person_Direction={person_Direction}
                             setPerson_Direction={setPerson_Direction}
                             person_Phone={person_Phone}
                             setPerson_Phone={setPerson_Phone}
                             person_CellPhone={person_CellPhone}
                             setPerson_CellPhone={setPerson_CellPhone}
                             person_Email={person_Email}
                             setPerson_Email={setPerson_Email}
                             person_WebSite={person_WebSite}
                             setPerson_WebSite={setPerson_WebSite}
                             staff2_StartDate={staff2_StartDate}
                             staff2_finalDate={staff2_finalDate}
                             setStaff2_finalDate={setStaff2_finalDate}
                             staff2_ContractNumber={staff2_ContractNumber}
                             setStaff2_ContractNumber={setStaff2_ContractNumber}

                             ubigeous_PlaceBirth={ubigeous_PlaceBirth}
                             setUbigeous_PlaceBirth={setUbigeous_PlaceBirth}
                             numberDocument={numberDocument}
                             setNumberDocument={setNumberDocument}
                             person_Gender={person_Gender}
                             setPerson_Gender={setPerson_Gender}
                             statusmarital_ID={statusmarital_ID}
                             setStatusmarital_ID={setStatusmarital_ID}
                             nationality_ID={nationality_ID}
                             setNationality_ID={setNationality_ID}
                             ubigeous_Home={ubigeous_Home}
                             setUbigeous_Home={setUbigeous_Home}
                             position_ID={position_ID}
                             setPosition_ID={setPosition_ID}
                             img={img}
                             setImg={setImg}
                             setFormType={setFormType}
                            /* setStaff2_ApprovedStatus={setStaff2_ApprovedStatus}*/
                        />
                    }
                </>
            }
        </div>
    );
}

export default Index