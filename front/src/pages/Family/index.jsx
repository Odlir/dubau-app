import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {env} from "@/env.js";
import columns from '../../data/Family.jsx';
import Preload from "@/components/preload/preload";
import 'sweetalert2/src/sweetalert2.scss';
import Add from "./add.jsx";
import List from "../../components/layouts/list/index.jsx";

function Index() {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [internal_code, setInternalCode] = useState('');
    const [user_code, setUserCode] = useState('');
    const [percentage, setPercentage] = useState('');
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
    const [dataxFamily, setdataxFamily] = useState('');
    const [category_id, setCategory_id] = useState('');
    const [categoryContainer, setCategoryContainer] = useState('');
    const [profitByFamilyContainer, setProfitByFamilyContainer] = useState('');
    const [coin_id, setCoin_id] = useState('');
    const [profit_by_family_percentage, setProfit_by_family_percentage] = useState('');

    const [inputFields, setInputFields] = useState([
        {
            id: '',
            name: '',
            profit_by_family_id_sol: '',
            coinSol: '',
            profit_by_family_id_dollar: '',
            coinDollar: ''
        }
    ]);
    const fetchFamilys = async page => {
        setLoading(true);
        const endpoint = `${env.apiURL}listFamily`;
        const response = await axios.get(`${endpoint}?page=${page}&per_page=${perPage}`);
        setData(response.data.data);
        setPage_(response.data.page);
        setTotalRows(response.data.total);
        setLoading(false);
    };

    const handlePageChange = page => {
        fetchFamilys(page);
    };

    const handlePerRowsChange = (rows) => {
        setLoading(true);
        setPerPage(rows);
    };

    useEffect(() => {
        fetchFamilys(page_);
    }, []);

    useEffect(() => {
        fetchFamilys(page_);
    }, [perPage]);

    const actionDelete = async (family_id) => {
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
                const endpoint = `${env.apiURL}deleteFamily`;
                axios.post(endpoint, {family_id, status: 0})
                    .then((response) => {
                        Swal.fire(
                            'Eliminado!',
                            'Se ha eliminado Correctamente.',
                            'success'
                        ).then((result) => {
                            fetchFamilys(page_);
                        });
                    })
                    .catch(error => {
                        alert('Operacion no completada');
                    });

            }
        });
    };

    const actionEdit = async (family_id) => {
        const endpoint = `${env.apiURL}listXFamily`;
        const response = await axios.get(`${endpoint}?family_id=${family_id}`);
        setdataxFamily(response.data.family_id);
        setName(response.data.name);
        setInternalCode(response.data.internal_code);
        setUserCode(response.data.user_code);
        setPercentage(response.data.percentage);
        setType(response.data.type);

        const endpoint5 = `${env.apiURL}listCategorys`;
        const response5 = await axios.get(`${endpoint5}`);
        setCategoryContainer(response5.data);

        const endpoint2 = `${env.apiURL}listXProfitByFamily`;
        const response2 = await axios.get(`${endpoint2}?family_id=${family_id}`);
        setProfitByFamilyContainer(response2.data);

        setFormType('edit');
    };
    const actionAdd = async () => {

        const endpoint5 = `${env.apiURL}listCategorys`;
        const response5 = await axios.get(`${endpoint5}`);
        setCategoryContainer(response5.data);

        setFormType('register');
    };

    const handleOnClickRegister = async (e) => {
        e.preventDefault();

        const endpoint = `${env.apiURL}registerFamily`;
        await axios.post(endpoint, {
            name,
            internal_code,
            user_code,
            percentage,
            profitByFamilyData: inputFields,
            type,
            status: '1'
        })
            .then((response) => {
                window.location.reload();
            })
            .catch(error => {
                alert('Debe completar correctamente sus datos');
            });
    };

    const handleOnClickUpdate = async (e) => {
        e.preventDefault();

        const endpoint = `${env.apiURL}updateFamily`;
        await axios.post(endpoint, {
            family_id: dataxFamily,
            name,
            internal_code,
            user_code,
            percentage,
            profitByFamilyData: inputFields,
            type
        })
            .then((response) => {
                window.location.reload();
            })
            .catch(error => {
                alert('Debe completar correctamente sus datos');
            });
    };

    const captureType = (e) => {
        setStatus(e.target.value);
    };

    const handleOnClickSearch = async page => {
        setLoading(true);
        const endpoint = `${env.apiURL}listFamily`;
        const response = await axios.get(`${endpoint}?page=${page_}&per_page=${perPage}&name=${name}&created_in=${created_in}`);
        setData(response.data.data);
        setPage_(response.data.page);
        setTotalRows(response.data.total);
        setLoading(false);
    };

    const handleOnClickClean = async page => {
        setLoading(true);
        setName('');
        setType('');
        setStatus('');
        setCreated_in('');
        fetchFamilys(1);
        setLoading(false);
    };

    return (
        <div>
            {(formType === 'list') ?
                <>
                    <List
                        nameSection="Familia"
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
                    {data.length != 0 ?
                        <DataTable
                            columns={columns(actionDelete, actionEdit)}
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
                        <DataTable
                            columns={columns(actionDelete, actionEdit)}
                            data={data}
                            progressPending={loading}
                            progressComponent={<Preload/>}
                            noDataComponent="No existen registros en esta tabla"
                            pagination
                            paginationServer
                            paginationTotalRows={totalRows}
                            onChangeRowsPerPage={handlePerRowsChange}
                            onChangePage={handlePageChange}
                        />
                    }
                </>
                :
                <>
                    {(formType === 'register') ?
                        <Add handleOnClickRegister={handleOnClickRegister}
                             name={name}
                             setName={setName}
                             internal_code={internal_code}
                             setInternalCode={setInternalCode}
                             user_code={user_code}
                             setUserCode={setUserCode}
                             percentage={percentage}
                             setPercentage={setPercentage}
                             type={type}
                             setType={setType}
                             DescriptionAgain={DescriptionAgain}
                             setDescriptionAgain={setDescriptionAgain}
                             categoryContainer={categoryContainer}
                             setCategoryContainer={setCategoryContainer}
                             profitByFamilyContainer={profitByFamilyContainer}
                             setProfitByFamilyContainer={setProfitByFamilyContainer}
                             formType={formType}
                             setFormType={setFormType}
                             inputFields={inputFields}
                             setInputFields={setInputFields}
                        />
                        :
                        <Add handleOnClickRegister={handleOnClickUpdate}
                             name={name}
                             setName={setName}
                             internal_code={internal_code}
                             setInternalCode={setInternalCode}
                             user_code={user_code}
                             setUserCode={setUserCode}
                             percentage={percentage}
                             setPercentage={setPercentage}
                             type={type}
                             setType={setType}
                             DescriptionAgain={DescriptionAgain}
                             setDescriptionAgain={setDescriptionAgain}
                             categoryContainer={categoryContainer}
                             setCategoryContainer={setCategoryContainer}
                             profitByFamilyContainer={profitByFamilyContainer}
                             setProfitByFamilyContainer={setProfitByFamilyContainer}
                             formType={formType}
                             setFormType={setFormType}
                             inputFields={inputFields}
                             setInputFields={setInputFields}
                        />
                    }
                </>
            }
        </div>
    );
}

export default Index;