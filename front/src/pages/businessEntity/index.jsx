import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {env} from "@/env.js";
import columns from '../../data/businessEntity.jsx';
import Preload from "@/components/preload/preload";
import 'sweetalert2/src/sweetalert2.scss';
import Add from "./add.jsx";
import List from "../../components/layouts/list/index.jsx";

function Index() {
    const navigate = useNavigate();

    const [person_Name, setPerson_Name] = useState('');
    const [person_LastNamePaternal, setPerson_LastNamePaternal] = useState('');
    const [person_LastNameMaternal, setPerson_LastNameMaternal] = useState('');
    const [person_DateBirth, setPerson_DateBirth] = useState('');
    const [person_Direction, setPerson_Direction] = useState('');
    const [person_Phone, setPerson_Phone] = useState('');
    const [person_CellPhone, setPerson_CellPhone] = useState('');
    const [person_Email, setPerson_Email] = useState('');
    const [person_WebSite, setPerson_WebSite] = useState('');
    const [staff_StartDate, setStaff_StartDate] = useState('');
    const [staff_finalDate, setStaff_finalDate] = useState('');
    const [staff_ContractNumber, setStaff_ContractNumber] = useState('');

    const [ubigeous_PlaceBirth, setUbigeous_PlaceBirth] = useState('');
    const [numberDocument, setNumberDocument] = useState('');
    const [person_Gender, setPerson_Gender] = useState('');
    const [statusmarital_ID, setStatusmarital_ID] = useState('');
    const [nationality_ID, setNationality_ID] = useState('');
    const [ubigeous_Home, setUbigeous_Home] = useState('');
    const [position_ID, setPosition_ID] = useState('');
    const [business_entity_id, setBusiness_entity_id] = useState('');

    const [customer_id, setCustomer_id] = useState('');
    const [supplier_id, setSupplier_id] = useState('');
    const [staff_id, setStaff_id] = useState('');
    const [person_ID, setPerson_ID] = useState('');
    const [type_person_id, setType_person_id] = useState('');
    const [typedocument_ID, setTypedocument_ID] = useState('');
    const [person_DNI, setPerson_DNI] = useState('');
    const [person_RUC, setPerson_RUC] = useState('');
    const [creditLine, setCreditLine] = useState('');

    const [formType, setFormType] = useState('list');

    /* Server Side */
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [page_, setPage_] = useState(1);
    const [dataxbusinessEntity, setdataxbusinessEntity] = useState('');
    const [selectedOptionsNaturality, setSelectedOptionsNaturality] = useState('');
    const [selectedOptionsNaturalitys, setSelectedOptionsNaturalitys] = useState('');

    const [typeQualification, setTypeQualification] = useState('');
    const [category, setCategory] = useState('');
    const [waytopay, setWaytopay] = useState('');
    const [paymentCondition, setPaymentCondition] = useState('');

    const fetchbusinessEntitys = async page => {

        setLoading(true);
        const endpoint = `${env.apiURL}listBusinessEntity`;
        const response = await axios.get(`${endpoint}?page=${page}&per_page=${perPage}`);
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

    const actionDelete = async (businessEntity_id) => {
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
                const endpoint = `${env.apiURL}deleteBusinessEntity`;
                axios.post(endpoint, {business_entity_id: businessEntity_id})
                    .then((response) => {
                        Swal.fire(
                            'Eliminado!',
                            'Se ha eliminado Correctamente.',
                            'success'
                        ).then((result) => {
                            fetchbusinessEntitys(page_);
                        });
                    })
                    .catch(error => {
                        alert('Operacion no completada');
                    });
            }
        });
    };
    const [nationalityContainer, setNationalityContainer] = useState([]);
    const [typeDocumentContainer, setTypeDocumentContainer] = useState([]);
    const [typeQualificationContainer, setTypeQualificationContainer] = useState([]);
    const [categoryContainer, setCategoryContainer] = useState([]);
    const [waytopayContainer, setWaytopayContainer] = useState([]);
    const [paymentConditionContainer, setPaymentConditionContainer] = useState([]);
    const actionEdit = async (business_entity_idd) => {
        const endpoint = `${env.apiURL}listXBusinessEntity`;
        const response = await axios.get(`${endpoint}?business_entity_id=${business_entity_idd}`);

        setBusiness_entity_id(business_entity_idd);
        setdataxbusinessEntity(response.data.business_entity_idd);
        setPerson_Name(response.data.person_Name);
        setCreditLine(response.data.credit_line_id);
        setPerson_LastNamePaternal(response.data.person_LastNamePaternal);
        setPerson_LastNameMaternal(response.data.person_LastNameMaternal);
        setPerson_DateBirth(response.data.person_DateBirth);
        setPerson_Direction(response.data.person_Direction);
        setPerson_Phone(response.data.person_Phone);
        setPerson_CellPhone(response.data.person_CellPhone);
        setPerson_Email(response.data.person_Email);
        setPerson_WebSite(response.data.person_WebSite);
        /*  setStaff_StartDate(response.data.staff_StartDate);
          setStaff_FinalDate(response.data.staff_FinalDate);
          setStaff_ContractNumber(response.data.staff_ContractNumber); */
        setUbigeous_PlaceBirth(response.data.ubigeous_PlaceBirth);
        setNumberDocument(response.data.person_NumberDocumentID);
        setPerson_Gender(response.data.person_Gender);
        setStatusmarital_ID(response.data.statusmarital_ID);
        setNationality_ID(response.data.nationality_ID);
        setUbigeous_Home(response.data.ubigeous_Home);
        setPosition_ID(response.data.position_ID);
        setPerson_ID(response.data.person_id);
        setPerson_DNI(response.data.person_DNI);
        setPerson_RUC(response.data.person_RUC);

        setCustomer_id(response.data.customer_id);
        setSupplier_id(response.data.supplier_id);
        setStaff_id(response.data.staff_id);
        setSelectedOptionsNaturality(response.data.nationality_ID);
        setSelectedOptionsNaturalitys(response.data.nationality_ID);

        setTypeQualification(response.data.typequalification_id);
        setCategory(response.data.category_id);
        setWaytopay(response.data.waytopay_id);
        setPaymentCondition(response.data.payment_condition_id);

        setTypedocument_ID(response.data.typedocument_ID);
        setPerson_DNI(response.data.person_DNI);
        setPerson_RUC(response.data.person_RUC);
        const endpoint2 = `${env.apiURL}listNationality`;
        const response2 = await axios.get(`${endpoint2}`);
        setNationalityContainer(response2.data);

        const endpoint3 = `${env.apiURL}listTypeDocument`;
        const response3 = await axios.get(`${endpoint3}`);
        setTypeDocumentContainer(response3.data);

        const endpoint4 = `${env.apiURL}listTypeQualifications`;
        const response4 = await axios.get(`${endpoint4}`);
        setTypeQualificationContainer(response4.data);

        const endpoint5 = `${env.apiURL}listCategorys`;
        const response5 = await axios.get(`${endpoint5}`);
        setCategoryContainer(response5.data);

        const endpoint6 = `${env.apiURL}listWaytoPays`;
        const response6 = await axios.get(`${endpoint6}`);
        setWaytopayContainer(response6.data);

        const endpoint7 = `${env.apiURL}listPaymentConditions`;
        const response7 = await axios.get(`${endpoint7}`);
        setPaymentConditionContainer(response7.data);
        setFormType('edit');
    };


    const actionAdd = async () => {
        setFormType('register');
        const endpoint = `${env.apiURL}listNationality`;
        const response = await axios.get(`${endpoint}`);
        setNationalityContainer(response.data);
        const endpoint2 = `${env.apiURL}listTypeDocument`;
        const response2 = await axios.get(`${endpoint2}`);
        setTypeDocumentContainer(response2.data);


        const endpoint4 = `${env.apiURL}listTypeQualification`;
        const response4 = await axios.get(`${endpoint4}`);
        setTypeQualificationContainer(response4.data);

        const endpoint5 = `${env.apiURL}listCategory`;
        const response5 = await axios.get(`${endpoint5}`);
        setCategoryContainer(response5.data);

        const endpoint6 = `${env.apiURL}listWaytoPay`;
        const response6 = await axios.get(`${endpoint6}`);
        setWaytopayContainer(response6.data);

        const endpoint7 = `${env.apiURL}listPaymentCondition`;
        const response7 = await axios.get(`${endpoint7}`);
        setPaymentConditionContainer(response7.data);
        setFormType('edit');
    };

    const handleOnClickRegister = async (e) => {

        e.preventDefault();

        const endpoint = `${env.apiURL}registerBusinessEntity`;
        await axios.post(endpoint, {
            person_Name,
            person_LastNamePaternal,
            person_LastNameMaternal,
            person_DateBirth,
            person_Direction,
            person_Phone,
            person_CellPhone,
            person_Email,
            person_WebSite,
            staff_StartDate,
            staff_finalDate,
            staff_ContractNumber,

            ubigeous_PlaceBirth,
            numberDocument,
            person_Gender,
            statusmarital_ID,
            nationality_ID: selectedOptionsNaturality,
            person_DNI,
            person_RUC,
            ubigeous_Home,
            position_ID,
            typedocument_ID,
            creditLine,
            typeQualification,
            nationality_ID: paymentCondition,
            nationality_ID: waytopay,
            businessEntity_StatusID: '1',
        }, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((response) => {
                //  window.location.reload();
            })
            .catch(error => {
                alert('Debe completar correctamente sus datos');
            });
    };

    const handleOnClickUpdate = async (e) => {
        e.preventDefault();

        const endpoint = `${env.apiURL}updateBusinessEntity`;
        await axios.post(endpoint, {
            businessEntity_ID: dataxbusinessEntity,
            business_entity_id,
            staff_ID: staff_id,
            customer_id,
            supplier_id,
            person_Name,
            person_LastNamePaternal,
            person_LastNameMaternal,
            person_DateBirth,
            person_Direction,
            person_Phone,
            person_CellPhone,
            person_Email,
            person_WebSite,
            staff_StartDate,
            staff_finalDate,
            staff_ContractNumber,
            ubigeous_PlaceBirth,
            numberDocument,
            person_Gender,
            statusmarital_ID,
            nationality_ID: selectedOptionsNaturality,
            ubigeous_Home,
            position_ID,
            person_ID,
            person_DNI,
            person_RUC,
            typedocument_ID,

            businessEntity_StatusID: '1',

        }, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((response) => {
                window.location.reload();
            })
            .catch(error => {
                alert('Debe completar correctamente sus datos');
            });
    };

    const captureType = (e) => {
        setbusinessEntity_ApprovedStatus(e.target.value);
    };

    const handleOnClickSearch = async page => {
        setLoading(true);
        const endpoint = `${env.apiURL}listBusinessEntity`;
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
         setbusinessEntityCreationDate(''); */
        fetchbusinessEntitys(1);
        setLoading(false);
    };

    const handleOnClickModalImage = async (imageName, businessEntityName, branDescription) => {
        Swal.fire({
            title: businessEntityName,
            text: branDescription,
            /* imageAlt: 'Custom image', */
            imageUrl: env.URL + imageName,
            imageWidth: 500,
            imageHeight: 300,
        });
    };

    return (
        <div>
            {(formType === 'list') ?
                <>
                    <List
                        nameSection="Persona"
                        dataType="text"
                        dataSearch1={person_Name}
                        setdataSearch1={setPerson_Name}
                        dataType2="date"
                        dataSearch2={staff_StartDate}
                        setdataSearch2={staff_finalDate}
                        captureType={captureType}
                        handleOnClickSearch={handleOnClickSearch}
                        handleOnClickClean={handleOnClickClean}
                        actionAdd={actionAdd}
                    />
                    {data.length != 0 ?
                        <DataTable
                            columns={columns(actionDelete, actionEdit, handleOnClickModalImage)}
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
                            /> */}
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
                             staff_StartDate={staff_StartDate}
                             setStaff_StartDate={setStaff_StartDate}
                             staff_finalDate={staff_finalDate}
                             setStaff_finalDate={setStaff_finalDate}
                             staff_ContractNumber={staff_ContractNumber}
                             setStaff_ContractNumber={setStaff_ContractNumber}

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
                             formType={formType}
                             setFormType={setFormType}

                             customer_id={customer_id}
                             setCustomer_id={setCustomer_id}
                             supplier_id={supplier_id}
                             setSupplier_id={setSupplier_id}
                             staff_id={staff_id}
                             setStaff_id={setStaff_id}

                             typedocument_ID={typedocument_ID}
                             setTypedocument_ID={setTypedocument_ID}

                             nationalityContainer={nationalityContainer}
                             setNationalityContainer={setNationalityContainer}
                             selectedOptionsNaturality={selectedOptionsNaturality}
                             setSelectedOptionsNaturality={setSelectedOptionsNaturality}

                             selectedOptionsNaturalitys={selectedOptionsNaturalitys}
                             setSelectedOptionsNaturalitys={setSelectedOptionsNaturalitys}

                             setTypeQualification={setTypeQualification}
                             setCategory={setCategory}
                             setWaytopay={setWaytopay}
                             setPaymentCondition={setPaymentCondition}

                             typeQualification={typeQualification}
                             category={category}
                             waytopay={waytopay}
                             paymentCondition={paymentCondition}

                             typeDocumentContainer={typeDocumentContainer}
                             setTypeDocumentContainer={setTypeDocumentContainer}

                             setContainer={setTypeDocumentContainer}

                             person_DNI={person_DNI}
                             setPerson_DNI={setPerson_DNI}
                             person_RUC={person_RUC}
                             setPerson_RUC={setPerson_RUC}

                             setTypeQualificationContainer={setTypeQualificationContainer}
                             setCategoryContainer={setCategoryContainer}
                             setWaytopayContainer={setWaytopayContainer}
                             setPaymentConditionContainer={setPaymentConditionContainer}

                             typeQualificationContainer={typeQualificationContainer}
                             categoryContainer={categoryContainer}
                             waytopayContainer={waytopayContainer}
                             paymentConditionContainer={paymentConditionContainer}

                             creditLine={creditLine}
                             setCreditLine={setCreditLine}

                            /* setbusinessEntity_ApprovedStatus={setbusinessEntity_ApprovedStatus} */
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
                             staff_StartDate={staff_StartDate}
                             setStaff_StartDate={setStaff_StartDate}
                             staff_finalDate={staff_finalDate}
                             setStaff_finalDate={setStaff_finalDate}
                             staff_ContractNumber={staff_ContractNumber}
                             setStaff_ContractNumber={setStaff_ContractNumber}
                             person_DNI={person_DNI}
                             setPerson_DNI={setPerson_DNI}
                             person_RUC={person_RUC}
                             setPerson_RUC={setPerson_RUC}
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
                             formType={formType}
                             setFormType={setFormType}

                             customer_id={customer_id}
                             setCustomer_id={setCustomer_id}
                             supplier_id={supplier_id}
                             setSupplier_id={setSupplier_id}
                             staff_id={staff_id}
                             setStaff_id={setStaff_id}

                             typedocument_ID={typedocument_ID}
                             setTypedocument_ID={setTypedocument_ID}

                             nationalityContainer={nationalityContainer}
                             setNationalityContainer={setNationalityContainer}
                             selectedOptionsNaturality={selectedOptionsNaturality}
                             setSelectedOptionsNaturality={setSelectedOptionsNaturality}
                             selectedOptionsNaturalitys={selectedOptionsNaturalitys}
                             setSelectedOptionsNaturalitys={setSelectedOptionsNaturalitys}
                             typeDocumentContainer={typeDocumentContainer}
                             setTypeDocumentContainer={setTypeDocumentContainer}


                             setTypeQualificationContainer={setTypeQualificationContainer}
                             setCategoryContainer={setCategoryContainer}
                             setWaytopayContainer={setWaytopayContainer}
                             setPaymentConditionContainer={setPaymentConditionContainer}

                             typeQualificationContainer={typeQualificationContainer}
                             categoryContainer={categoryContainer}
                             waytopayContainer={waytopayContainer}
                             paymentConditionContainer={paymentConditionContainer}
                             creditLine={creditLine}
                             setCreditLine={setCreditLine}


                             setTypeQualification={setTypeQualification}
                             setCategory={setCategory}
                             setWaytopay={setWaytopay}
                             setPaymentCondition={setPaymentCondition}

                             typeQualification={typeQualification}
                             category={category}
                             waytopay={waytopay}
                             paymentCondition={paymentCondition}

                            /* setbusinessEntity_ApprovedStatus={setbusinessEntity_ApprovedStatus} */
                        />
                    }
                </>
            }
        </div>
    )
        ;
}

export default Index;
