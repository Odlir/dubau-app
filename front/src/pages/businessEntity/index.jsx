import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import {env} from "@/env.js";
import DataTable from 'react-data-table-component';
import columns from '../../data/businessEntity.jsx';
import Preload from "@/components/preload/preload";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import Add from '../businessEntity/add.jsx'
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
    const [businessEntity_StartDate, setbusinessEntity_StartDate] = useState('');
    const [businessEntity_finalDate, setbusinessEntity_finalDate] = useState('');
    const [businessEntity_ContractNumber, setbusinessEntity_ContractNumber] = useState('');

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
    const [dataxbusinessEntity, setdataxbusinessEntity] = useState('');

    const fetchbusinessEntitys = async page => {

        setLoading(true);
        const endpoint = `${env.apiURL}listBusinessEntity`;
        const response = await axios.get(`${endpoint}?page=${page}&per_page=${perPage}`);
        console.log(response);
        setData(response.data.data);
        setPage_(response.data.page);
        setTotalRows(response.data.total);
        setLoading(false);
    };

    const handlePageChange = page => {
        fetchbusinessEntitys(page);
    };

    const handlePerRowsChange = (rows) => {
        setLoading(true);
        setPerPage(rows);
    };

    useEffect(() => {
        fetchbusinessEntitys(page_);
    }, []);

    useEffect(() => {
        fetchbusinessEntitys(page_);
    }, [perPage]);

    const actionDelete = async (businessEntity_ID) => {
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
                const endpoint = `${env.apiURL}deletebusinessEntity`;
                axios.post(endpoint, {businessEntity_ID: businessEntity_ID, businessEntity_StatusID: 0})
                    .then(function (response) {
                        Swal.fire(
                            'Eliminado!',
                            'Se ha eliminado Correctamente.',
                            'success'
                        ).then((result) => {
                            fetchbusinessEntitys(page_);
                        });
                    })
                    .catch(error => {
                        alert('Operacion no completada')
                    })
            }
        })
    }

    /*    const actionEdit = async (businessEntity_ID) => {
            const endpoint = `${env.apiURL}listXbusinessEntity`;
            const response = await axios.get(`${endpoint}?businessEntity_ID=${businessEntity_ID}`);
            setdataxbusinessEntity(response.data.businessEntity_ID);
            setbusinessEntity_Name(response.data.businessEntity_Name);
            setbusinessEntity_Description(response.data.businessEntity_Description);
            setFormType('edit');
        }
       */
    const actionAdd = async () => {
        setFormType('register');
    }
    const handleOnClickRegister = async (e) => {
        e.preventDefault();
        const endpoint = `${env.apiURL}registerbusinessEntity`
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
            businessEntity_StartDate: businessEntity_StartDate,
            businessEntity_finalDate: businessEntity_finalDate,
            businessEntity_ContractNumber: businessEntity_ContractNumber,

            ubigeous_PlaceBirth: ubigeous_PlaceBirth,
            numberDocument: numberDocument,
            person_Gender: person_Gender,
            statusmarital_ID: statusmarital_ID,
            nationality_ID: nationality_ID,
            ubigeous_Home: ubigeous_Home,
            position_ID: position_ID,
            businessEntity_StatusID: '1',
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
        const endpoint = `${env.apiURL}updatebusinessEntity`
        await axios.post(endpoint, {
            businessEntity_ID: dataxbusinessEntity,
            erson_Name: person_Name,
            person_LastNamePaternal: person_LastNamePaternal,
            person_LastNameMaternal: person_LastNameMaternal,
            person_DateBirth: person_DateBirth,
            person_Direction: person_Direction,
            person_Phone: person_Phone,
            person_CellPhone: person_CellPhone,
            person_Email: person_Email,
            person_WebSite: person_WebSite,
            businessEntity_StartDate: businessEntity_StartDate,
            businessEntity_finalDate: businessEntity_finalDate,
            businessEntity_ContractNumber: businessEntity_ContractNumber,

            ubigeous_PlaceBirth: ubigeous_PlaceBirth,
            numberDocument: numberDocument,
            person_Gender: person_Gender,
            statusmarital_ID: statusmarital_ID,
            nationality_ID: nationality_ID,
            ubigeous_Home: ubigeous_Home,
            position_ID: position_ID,

            businessEntity_StatusID: '1',
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
        setbusinessEntity_ApprovedStatus(e.target.value);
    }

    const handleOnClickSearch = async page => {
        setLoading(true);
        const endpoint = `${env.apiURL}listbusinessEntity`;
        const response = await axios.get(`${endpoint}
        ?page=${page_}
        &per_page=${perPage}
        
        `);
        setData(response.data.data);
        setPage_(response.data.page);
        setTotalRows(response.data.total);
        setLoading(false);
    };

    const handleOnClickClean = async page => {
        setLoading(true);
        // setbusinessEntity_Name('');

       /* setbusinessEntity_ApprovedStatus('');
        setbusinessEntityCreationDate('');*/
        fetchbusinessEntitys(1);
        setLoading(false);
    };

    const handleOnClickModalImage = async (imageName, businessEntityName, branDescription) => {
        Swal.fire({
            title: businessEntityName,
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
                        nameSection={'Persona'}
                        dataType={'text'}
                        dataSearch1={person_Name}
                        setdataSearch1={setPerson_Name}
                        dataType2={'date'}
                        dataSearch2={businessEntity_StartDate}
                        setdataSearch2={businessEntity_finalDate}
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
                             businessEntity_StartDate={businessEntity_StartDate}
                             setbusinessEntity_StartDate={setbusinessEntity_StartDate}
                             businessEntity_finalDate={businessEntity_finalDate}
                             setbusinessEntity_finalDate={setbusinessEntity_finalDate}
                             businessEntity_ContractNumber={businessEntity_ContractNumber}
                             setbusinessEntity_ContractNumber={setbusinessEntity_ContractNumber}

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
                             /*setbusinessEntity_ApprovedStatus={setbusinessEntity_ApprovedStatus}*/
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
                             businessEntity_StartDate={businessEntity_StartDate}
                             businessEntity_finalDate={businessEntity_finalDate}
                             setbusinessEntity_finalDate={setbusinessEntity_finalDate}
                             businessEntity_ContractNumber={businessEntity_ContractNumber}
                             setbusinessEntity_ContractNumber={setbusinessEntity_ContractNumber}

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
                            /* setbusinessEntity_ApprovedStatus={setbusinessEntity_ApprovedStatus}*/
                        />
                    }
                </>
            }
        </div>
    );
}

export default Index