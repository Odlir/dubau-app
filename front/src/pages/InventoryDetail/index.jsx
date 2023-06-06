import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import env from '@/env.js';
import Preload from '@/components/preload/preload.jsx';
import columns from '../../data/Inventory.jsx';
import 'sweetalert2/src/sweetalert2.scss';
import Add from './add.jsx';
import List from '../../components/layouts/list/index.jsx';

function Index({ showModalFather }) {
    const [showModal, setShowModal] = React.useState(showModalFather);
    const [name, setName] = useState('');
    const [start_date, setStart_date] = useState('');
    const [final_date, setFinal_date] = useState('');
    const [created_in, setCreated_in] = useState('');
    const [category_ApprovedStatus, setInventory_ApprovedStatus] =
        useState('1');
    const [formType, setFormType] = useState('list');
    /* Server Side */
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [page_, setPage_] = useState(1);
    const [dataxInventory, setdataxInventory] = useState('');

    const fetchInventorys = async (page) => {
        setLoading(true);
        const endpoint = `${env.apiURL}listInventory`;
        const response = await axios.get(
            `${endpoint}?page=${page}&per_page=${perPage}`
        );
        setData(response.data.data);
        setPage_(response.data.page);
        setTotalRows(response.data.total);
        setLoading(false);
    };

    const handlePageChange = (page) => {
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
            text: 'No podra revertir los cambios!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Si, Eliminar!',
        }).then((result) => {
            if (result.isConfirmed) {
                const endpoint = `${env.apiURL}deleteInventory`;
                axios
                    .post(endpoint, { inventory_id, status: 0 })
                    .then(() => {
                        Swal.fire(
                            'Eliminado!',
                            'Se ha eliminado Correctamente.',
                            'success'
                        ).then(() => {
                            fetchInventorys(page_);
                        });
                    })
                    .catch(() => {
                        alert('Operacion no completada');
                    });
            }
        });
    };

    const actionEdit = async (inventory_id) => {
        const endpoint = `${env.apiURL}listXInventory`;
        const response = await axios.get(
            `${endpoint}?inventory_id=${inventory_id}`
        );
        setdataxInventory(response.data.inventory_id);
        setName(response.data.name);
        setStart_date(response.data.start_date);
        setFinal_date(response.data.final_date);

        setFormType('edit');
    };
    const actionAdd = async () => {
        setFormType('register');
    };

    const handleOnClickRegister = async (e) => {
        e.preventDefault();
        const endpoint = `${env.apiURL}registerInventory`;
        await axios
            .post(endpoint, { name, start_date, final_date, status: '1' })
            .then(() => {
                window.location.reload();
            })
            .catch(() => {
                alert('Debe completar correctamente sus datos');
            });
    };

    const handleOnClickUpdate = async (e) => {
        e.preventDefault();
        const endpoint = `${env.apiURL}updateInventory`;
        await axios
            .post(endpoint, {
                inventory_id: dataxInventory,
                name,
                start_date,
                final_date,
            })
            .then(() => {
                window.location.reload();
            })
            .catch(() => {
                alert('Debe completar correctamente sus datos');
            });
    };

    const captureType = (e) => {
        setInventory_ApprovedStatus(e.target.value);
    };

    const handleOnClickSearch = async () => {
        setLoading(true);
        const endpoint = `${env.apiURL}listInventory`;
        const response = await axios.get(
            `${endpoint}?page=${page_}&per_page=${perPage}&name=${name}&created_in=${created_in}`
        );
        setData(response.data.data);
        setPage_(response.data.page);
        setTotalRows(response.data.total);
        setLoading(false);
    };

    const handleOnClickClean = async () => {
        setLoading(true);
        setName('');
        setInventory_ApprovedStatus('');
        setCreated_in('');
        fetchInventorys(1);
        setLoading(false);
    };

    const actionViewDetail = async () => {
        setShowModal(true);
        setFormType('viewDetail');
    };

    return (
        <div>
            {formType === 'list' ? (
                <div>
                    <div className="z-10">
                        {showModal ? (
                            <>
                                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                                <h3 className="text-3xl font-semibold">
                                                    Modal Title
                                                </h3>
                                                <button
                                                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                    onClick={() =>
                                                        setShowModal(false)
                                                    }
                                                >
                                                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                        ×
                                                    </span>
                                                </button>
                                            </div>

                                            <div className="relative p-6 flex-auto">
                                                <p className="my-4 text-slate-500 text-lg leading-relaxed">
                                                    I always felt like I could
                                                    do anything. That’s the main
                                                    thing people are controlled
                                                    by! Thoughts- their
                                                    perception of themselves!
                                                    They're slowed down by their
                                                    perception of themselves. If
                                                    you're taught you can’t do
                                                    anything, you won’t do
                                                    anything. I was taught I
                                                    could do everything.
                                                </p>
                                            </div>

                                            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                                <button
                                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                    type="button"
                                                    onClick={() =>
                                                        setShowModal(false)
                                                    }
                                                >
                                                    Close
                                                </button>
                                                <button
                                                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                    type="button"
                                                    onClick={() =>
                                                        setShowModal(false)
                                                    }
                                                >
                                                    Save Changes
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="opacity-25 fixed inset-0 z-40 bg-black" />
                            </>
                        ) : null}
                    </div>

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
                    {data.length !== 0 ? (
                        <DataTable
                            columns={columns(
                                actionDelete,
                                actionViewDetail,
                                actionEdit
                            )}
                            data={data}
                            progressPending={loading}
                            progressComponent={<Preload />}
                            pagination
                            paginationServer
                            paginationTotalRows={totalRows}
                            onChangeRowsPerPage={handlePerRowsChange}
                            onChangePage={handlePageChange}
                        />
                    ) : (
                        <DataTable
                            columns={columns(
                                actionDelete,
                                actionViewDetail,
                                actionEdit
                            )}
                            data={data}
                            progressPending={loading}
                            progressComponent={<Preload />}
                            noDataComponent="No existen registros en esta tabla"
                            pagination
                            paginationServer
                            paginationTotalRows={totalRows}
                            onChangeRowsPerPage={handlePerRowsChange}
                            onChangePage={handlePageChange}
                        />
                    )}
                </div>
            ) : (
                // eslint-disable-next-line react/jsx-no-useless-fragment
                <>
                    {formType === 'register' ? (
                        <Add
                            handleOnClickRegister={handleOnClickRegister}
                            name={name}
                            setName={setName}
                            start_date={start_date}
                            final_date={final_date}
                            setStart_date={setStart_date}
                            setFinal_date={setFinal_date}
                            setFormType={setFormType}
                        />
                    ) : (
                        <Add
                            handleOnClickRegister={handleOnClickUpdate}
                            name={name}
                            setName={setName}
                            start_date={start_date}
                            final_date={final_date}
                            setStart_date={setStart_date}
                            setFinal_date={setFinal_date}
                            setFormType={setFormType}
                        />
                    )}
                </>
            )}
        </div>
    );
}

export default Index;
