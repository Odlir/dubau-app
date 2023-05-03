import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {env} from "@/env.js";
import columns from '../../data/Inventory.jsx';
import Preload from "@/components/preload/preload";
import 'sweetalert2/src/sweetalert2.scss';
import Add from "./add.jsx";
import List from "../../components/layouts/list/index.jsx";

function Index() {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [start_date, setStart_date] = useState('');
    const [final_date, setFinal_date] = useState('');
    const [created_in, setCreated_in] = useState('');
    const [category_ApprovedStatus, setInventory_ApprovedStatus] = useState('1');
    const [formType, setFormType] = useState('list');
    /* Server Side */
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [page_, setPage_] = useState(1);
    const [dataxInventory, setdataxInventory] = useState('');

    const fetchInventorys = async page => {
        setLoading(true);
        const endpoint = `${env.apiURL}listInventory`;
        const response = await axios.get(`${endpoint}?page=${page}&per_page=${perPage}`);
        setData(response.data.data);
        setPage_(response.data.page);
        setTotalRows(response.data.total);
        setLoading(false);
    };

    const handlePageChange = page => {
        fetchInventorys(page);
    };

    const handlePerRowsChange = (rows) => {
        setLoading(true);
        setPerPage(rows);
    };

    useEffect(() => {
        fetchInventorys(page_);
    }, []);

    useEffect(() => {
        fetchInventorys(page_);
    }, [perPage]);

    const actionDelete = async (inventory_id) => {
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
                const endpoint = `${env.apiURL}deleteInventory`;
                axios.post(endpoint, {inventory_id, category_StatusID: 0})
                    .then((response) => {
                        Swal.fire(
                            'Eliminado!',
                            'Se ha eliminado Correctamente.',
                            'success'
                        ).then((result) => {
                            fetchInventorys(page_);
                        });
                    })
                    .catch(error => {
                        alert('Operacion no completada');
                    });

            }
        });
    };

    const actionEdit = async (inventory_id) => {
        const endpoint = `${env.apiURL}listXInventory`;
        const response = await axios.get(`${endpoint}?inventory_id=${inventory_id}`);
        setdataxInventory(response.data.inventory_id);
        setName(response.data.name);

        setFormType('edit');
    };
    const actionAdd = async () => {
        setFormType('register');
    };

    const handleOnClickRegister = async (e) => {
        e.preventDefault();
        const endpoint = `${env.apiURL}registerInventory`;
        await axios.post(endpoint, {name, category_StatusID: '1'})
            .then((response) => {
                window.location.reload();
            })
            .catch(error => {
                alert('Debe completar correctamente sus datos');
            });
    };

    const handleOnClickUpdate = async (e) => {
        e.preventDefault();
        const endpoint = `${env.apiURL}updateInventory`;
        await axios.post(endpoint, {inventory_id: dataxInventory, name})
            .then((response) => {
                window.location.reload();
            })
            .catch(error => {
                alert('Debe completar correctamente sus datos');
            });
    };

    const captureType = (e) => {
        setInventory_ApprovedStatus(e.target.value);
    };

    const handleOnClickSearch = async page => {
        setLoading(true);
        const endpoint = `${env.apiURL}listInventory`;
        const response = await axios.get(`${endpoint}?page=${page_}&per_page=${perPage}&name=${name}&created_in=${created_in}`);
        setData(response.data.data);
        setPage_(response.data.page);
        setTotalRows(response.data.total);
        setLoading(false);
    };

    const handleOnClickClean = async page => {
        setLoading(true);
        setName('');
        setInventory_ApprovedStatus('');
        setCreated_in('');
        fetchInventorys(1);
        setLoading(false);
    };
    console.log(category_ApprovedStatus);

    return (
        <div>
            {(formType === 'list') ?
                <>
                    <List
                        nameSection="Inventario"
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

                             start_date={start_date}
                             setStart_date={setStart_date}
                             setFormType={setFormType}

                        />
                        :
                        <Add handleOnClickRegister={handleOnClickUpdate}
                             name={name}
                             setName={setName}

                             start_date={start_date}
                             setStart_date={setStart_date}
                             setFormType={setFormType}

                        />
                    }
                </>
            }
        </div>
    );
}

export default Index;