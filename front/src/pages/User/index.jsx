import React, {useEffect, useState} from 'react';
import axios from "axios";
import DataTable from 'react-data-table-component';
import {env} from "@/env.js";
import columns from '../../data/Users.jsx';
import Preload from "@/components/preload/preload";
import Button from "@/components/Button/Button.jsx";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

const Index = () => {
    const endpoint = `${env.apiURL}list`;
    /*Server Side*/
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [page_, setPage_] = useState(1);

    const fetchUsers = async page => {
        setLoading(true);
        const response = await axios.get(`${endpoint}?page=${page}&per_page=${perPage}`);
        setData(response.data.data);
        setPage_(response.data.page);
        setTotalRows(response.data.total);
        setLoading(false);
    };

    const handlePageChange = page => {
        fetchUsers(page);
    };

    const handlePerRowsChange = (rows) => {
        setLoading(true);
        setPerPage(rows);
    };

    useEffect(() => {
        fetchUsers(page_);
    }, []);

    useEffect(() => {
        fetchUsers(page_);
    }, [perPage]);

    const actionVerify = async (PERSP_Codigo) => {
        Swal.fire({
            title: 'Que accion desea realizar?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Aprobar',
            denyButtonText: `Desaprobar`,
        }).then((result) => {
            if (result.isConfirmed) {
                const endpoint = `${env.apiURL}verifyUser`;
                 axios.post(endpoint, {PERSP_Codigo: PERSP_Codigo, cji_usuario_estadoVerificado: 1})
                    .then(function (response) {
                        fetchUsers(page_);
                    })
                    .catch(error => {
                        alert('Operacion no completada')
                    })
                Swal.fire('Usuario Verificado!', ' ', 'success')
            } else if (result.isDenied) {
                const endpoint = `${env.apiURL}verifyUser`;
                axios.post(endpoint, {PERSP_Codigo: PERSP_Codigo, cji_usuario_estadoVerificado: 0})
                    .then(function (response) {
                        fetchUsers(page_);
                    })
                    .catch(error => {
                        alert('Operacion no completada')
                    })
                Swal.fire('Usuario desaprobado', '', 'error')
            }
        })

    }
    return (
        <div>
            <h2 className="intro-y text-lg font-medium mt-10">
                Listado de Usuarios
            </h2>
            <div className="grid grid-cols-12 gap-6 mt-5">
                <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">
                    <button className="btn btn-primary shadow-md mr-2">Nuevo Usuario</button>
                    <div className="hidden md:block mx-auto text-slate-500"></div>
                    <div className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
                        <div className="w-56 relative text-slate-500">
                            <input type="text" className="form-control w-56 box pr-10" placeholder="Search..."/>
                            <i className="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0 btn-primary"
                               data-lucide="search"></i>
                        </div>
                    </div>
                </div>
            </div>
            <br/>
            {data.length != 0 ?
                <DataTable
                    columns={columns(actionVerify)}
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

        </div>
    );
}

export default Index