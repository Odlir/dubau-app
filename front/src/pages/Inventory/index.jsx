import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {useDebounce} from "use-debounce";
import Select from 'react-select';
import debounce from 'lodash.debounce';
import ExpandableTable from "react-exp-table";
import {env} from "@/env.js";
import columns from '../../data/Inventory.jsx';
import columnsDetail from '../../data/InventoryDetail';
import Preload from "@/components/preload/preload";
import 'sweetalert2/src/sweetalert2.scss';
import Add from "./add.jsx";
import List from "../../components/layouts/list/index.jsx";
import Input from "@/components/Input/Input";

function Index() {
    const navigate = useNavigate();
    const [showModal, setShowModal] = React.useState(false);
    const [inputValue, setInputValue] = React.useState("");
    const [productName, setProductName] = useState('');
    const [debouncedValue] = useDebounce(inputValue, 500);
    const [id, setId] = useState('');
    const [inventoryXDetail, setIventoryXDetail] = useState('');
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');

    const [productId, setProductId] = useState('');
    const [price, setPrice] = useState('');
    const [start_date, setStart_date] = useState('');
    const [defaultProduct, setDefaultproduct] = useState('');
    const [final_date, setFinal_date] = useState('');
    const [created_in, setCreated_in] = useState('');
    const [dataInventoryId, setDataInventoryId] = useState('');
    const [category_ApprovedStatus, setInventory_ApprovedStatus] = useState('1');
    const [formType, setFormType] = useState('list');
    /* Server Side */
    const [data, setData] = useState([]);
    const [dataDetail, setDataDetail] = useState([]);
    const [dataFamilyDetail, setDataFamilyDetail] = useState([]);
    const [dataProduct, setDataProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalRowsDetail, setTotalRowsDetail] = useState(0);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [perPageDetail, setPerPageDetail] = useState(10);
    const [page_, setPage_] = useState(1);
    const [pageDetail, setPageDetail] = useState(1);
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

    const handlePerRowsChangeDetail = (rows) => {
        setLoading(true);
        setPerPageDetail(rows);
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
                axios.post(endpoint, {inventory_id, status: 0})
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
        setStart_date(response.data.start_date);
        setFinal_date(response.data.final_date);

        setFormType('edit');
    };
    const actionAdd = async () => {
        setFormType('register');
    };

    const actionViewDetail = async (inventory_id) => {
        setId(id);
        const endpoint = `${env.apiURL}listXInventory`;
        const response = await axios.get(`${endpoint}?inventory_id=${inventory_id}`);
        setdataxInventory(response.data.inventory_id);
        setName(response.data.name);
        setStart_date(response.data.start_date);
        setFinal_date(response.data.final_date);
        const endpoint2 = `${env.apiURL}listInventoryDetail`;
        const response2 = await axios.get(`${endpoint2}?page=${1}&per_page=${perPage}&inventory_id=${inventory_id}`);
        setDataDetail(response2.data.data);
        setPageDetail(response2.data.page);
        setTotalRowsDetail(response2.data.total);
        const endpoint3 = `${env.apiURL}listInventoryFamilyDetail`;
        const response3 = await axios.get(`${endpoint3}?page=${1}&per_page=${perPage}&inventory_id=${inventory_id}`);
        setDataFamilyDetail(response3.data.data);
        setIventoryXDetail(inventory_id);

        setShowModal(true);
    };

    const handleOnClickRegister = async (e) => {
        e.preventDefault();
        const endpoint = `${env.apiURL}registerInventory`;
        await axios.post(endpoint, {name, start_date, final_date, status: '1'})
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
        await axios.post(endpoint, {inventory_id: dataxInventory, name, start_date, final_date})
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


    const handleInputChange = async (event) => {
        const {value} = event.target;
        setInputValue(value);
        const endpoint = `${env.apiURL}listProducts`;
        const response = await axios.get(`${endpoint}?productName=${value}`);
        setDataProduct(response.data.data);

    };

    const [options, setOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const debouncedLoadOptions2 = '';

    const [selectedOption, setSelectedOption] = useState(null);
    const loadOptions = async (inputValue) => {
        if (!inputValue) {
            setOptions([]);
            return;
        }

        setIsLoading(true);

        try {
            const endpoint = `${env.apiURL}listProducts`;
            const response = await axios.get(`${endpoint}?productName=${inputValue}`);
            const datas = response.data;

            // Formate os dados de resposta para o formato esperado pelo react-select
            const formattedOptions = datas.map((item) => ({
                value: item.product_id,
                label: item.name
            }));


            setOptions(formattedOptions);
        } catch (error) {
            console.error('Error:', error);
        }
        setIsLoading(false);
    };


    const handleSelectChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        setProductId(selectedOption.value);
    };

    const debouncedLoadOptions = debounce(loadOptions, 500);

    const customStyles = {
        control: (provided, state) => ({
            ...provided,

        }),

    };

    const actionDeleteDetail = async (inventory_detail_id) => {
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
                const endpoint = `${env.apiURL}deleteInventoryDetail`;
                axios.post(endpoint, {inventory_detail_id, status: 0})
                    .then((response) => {
                        Swal.fire(
                            'Eliminado!',
                            'Se ha eliminado Correctamente.',
                            'success'
                        ).then((result) => {
                            actionViewDetail(inventoryXDetail);
                        });
                    })
                    .catch(error => {
                        alert('Operacion no completada');
                    });

            }
        });
    };

    const actionEditDetail = async (dataInventoryId) => {
        const endpoint = `${env.apiURL}listXInventoryDetail`;
        const response = await axios.get(`${endpoint}?inventory_detail_id=${dataInventoryId}`);
        setDataInventoryId(response.data.inventory_id);
        setProductId(response.data.product_id);

        // Formate os dados de resposta para o formato esperado pelo react-select
        const defaultSelectedOptionsInventoryDetail = {
            value: response.data.product_id,
            label: response.data.name
        };

        setSelectedOption(defaultSelectedOptionsInventoryDetail);
        setQuantity(response.data.amount);
        setPrice(response.data.cost);

    };
    const handleOnClickCleanDetail = async page => {
        setShowModal(false);
        setLoading(true);
        setProductName('');
        setSelectedOption('');
        setQuantity('');
        setPrice('');
        setLoading(false);
    };

    const handleOnClickCancelDetail = async page => {
        setProductName('');
        setSelectedOption('');
        setQuantity('');
        setPrice('');
    };

    const handleOnClickRegisterDetail = async (e) => {
        e.preventDefault();
        const endpoint = `${env.apiURL}registerInventoryDetail`;
        await axios.post(endpoint, {inventoryXDetail, productId, quantity, price, status: '1'})
            .then((response) => {
                handleOnClickCancelDetail();
                actionViewDetail(inventoryXDetail);
            })
            .catch(error => {
                alert('Debe completar correctamente sus datos');
            });

    };


    const actionActiveDetail = async (dataInventoryId) => {
        const endpoint = `${env.apiURL}activeInventoryDetail`;
        await axios.post(endpoint, {dataInventoryId, status: '1'})
            .then((response) => {
                actionViewDetail(inventoryXDetail);
            })
            .catch(error => {
                alert('Debe completar correctamente sus datos');
            });
    };
    const customStyless = {
        rows: {
            style: {
                minHeight: '1px', // override the row height
                height: '55px',
                maxHeight: '30px',
                fontSize: '13px'
            },
        },
        headCells: {
            style: {
                fontSize: '13ppx'
            },
        },
        cells: {
            style: {
                fontSize: '13px'
            },
        },
    };
    const [showDiv, setShowDiv] = useState(true);
    const [showDivFamily, setShowDivFamily] = useState(false);
    const general = () => {
        setShowDiv(true);
        setShowDivFamily(false);
    };

    const family = () => {
        setShowDiv(false);
        setShowDivFamily(true);
    };
    // const [familyContainer, setFamilyContainer] = useState([]);

    let familyContainer = [];
    const accordionItems = dataDetail.map((item) => {
        familyContainer += [item.family_name];
        return ({
            title: item.family_name,
            content: item.name
        });
    });

    // const dataFamilyItems = dataFamilyDetail.map((item, key) => (key));
    const ala = Object.entries(dataFamilyDetail).map(([key, value]) => (
        Object.entries(value).map(([keyy, valuey]) => (
            {
                location: "Prueba con Profit",
                population: "",
                party: "",
                child: [
                    {
                        location: valuey.name,
                        population: valuey.amount,
                        party: valuey.cost
                    }
                ]
            }
        ))
    ));
    console.log(ala);

    const columnsa = [
        {
            title: "Articulo",
            key: "location"
        },
        {
            title: "Cantidad",
            key: "population"
        },
        {
            title: "Precio",
            key: "party"
        }
    ];

    const datass = [
        {
            location: "Prueba con Profit",
            population: "",
            party: "",
            child: [
                {
                    location: "ZAPAPICO PUNTA Y PALA ANCHA - 5 LB SIN MANGO - OJO 70X45MM (TRAMONTINA)\n",
                    population: "11",
                    party: "2"
                },
                {
                    location: "12w21w12",
                    population: "10",
                    party: "22"
                }
            ]
        },
        {
            location: "familia0",
            population: "",
            party: "",
            child: [
                {
                    location: "Nuevo producto",
                    population: "1",
                    party: "2"
                },
                {
                    location: "NProducto prueba 2",
                    population: "2",
                    party: "2"
                }
            ]
        }
    ];

    return (
        <div>
            <div className="z-10  ">
                {showModal ? (
                    <>
                        <div
                            className="modal-detail justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 index-absolute outline-none focus:outline-none"
                        >
                            <div className="relative w-auto my-6 mx-auto">

                                <div
                                    className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                    <div
                                        className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0 w-full justify-end">
                                        <button className="btn btn-danger shadow-md close"
                                                onClick={handleOnClickCleanDetail}>X
                                        </button>
                                    </div>

                                    <div
                                        className="flex items-start justify-between h-12  border-b border-solid border-slate-200 rounded-t">

                                        <div
                                            className="form-inline items-start p-5 flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0 w-full">

                                            <div className="text-lg font-semibold">Inventario: {name}</div>
                                            <div className="ml-auto  flex ">
                                                <div className="form-label xl:w-15 ">
                                                    <div className="text-left">
                                                        <div className="flex items-center justify-center h-10">
                                                            <div className="font-medium">Fecha Inicial</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-full mt-3 xl:mt-0 flex-1 xl:!mr-5 ">
                                                    <Input dataType="date" dataName="0-0-2023" dataId="emailll"
                                                           className="form-control"
                                                           dataPlaceholder="0-0-2023"
                                                           dataValue={start_date}
                                                           dataOnchange={false}/>
                                                    <div className="form-help text-right"/>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="">
                                        <div className=" p-5 ">
                                            <div className="relative flex">
                                                <div>
                                                    <div
                                                        className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                                                        <div className=" xl:w-10">
                                                            <div className="text-left">
                                                                <div className="flex items-center justify-center h-10">
                                                                    <div className="">Articulo</div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="w-2">&nbsp;</div>
                                                        <div className=" width-28em mt-3 xl:mt-0 flex-1 ">

                                                            <Select
                                                                styles={customStyles}
                                                                options={options}
                                                                isLoading={isLoading}
                                                                onInputChange={debouncedLoadOptions}
                                                                onChange={handleSelectChange}
                                                                value={selectedOption}
                                                                isClearable
                                                            />

                                                        </div>
                                                    </div>
                                                </div>
                                                <div className=" w-1 mt-3 xl:mt-0 flex-1 "/>
                                                <div className="w-2">&nbsp;</div>
                                                <div>
                                                    <div
                                                        className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                                                        <div className="xl:w-12 ">
                                                            <div className="text-left">
                                                                <div className="flex items-center justify-center h-10">
                                                                    <div className="">Cantidad</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="w-2">&nbsp;</div>
                                                        <div className="w-16 mt-4 xl:mt-0 flex-1">
                                                            <Input dataType="text" dataName="email" dataId="email"
                                                                   className="form-control h-9  font-size-8px "
                                                                   dataPlaceholder="0.0" dataValue={quantity}
                                                                   dataOnchange={setQuantity}/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className=" w-1 mt-3 xl:mt-0 flex-1 "/>
                                                <div>
                                                    <div
                                                        className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                                                        <div className=" xl:w-12  ">
                                                            <div className="text-left">
                                                                <div className="flex items-center justify-center h-10">
                                                                    <div className="">Precio</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="w-2">&nbsp;</div>
                                                        <div className="w-16 mt-4 xl:mt-0 flex-1">
                                                            <Input dataType="text" dataName="email" dataId="email"
                                                                   className="form-control h-9 font-size-8px "
                                                                   dataPlaceholder="0.00" dataValue={price}
                                                                   dataOnchange={setPrice}/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className=" w-1 mt-3 xl:mt-0 flex-1 h-2"/>
                                            <div
                                                className="hidden md:block mx-auto text-slate-500 ">
                                                <div className="h-6 flex justify-end">
                                                    <button className="btn btn-primary shadow-md mr-2"
                                                            onClick={handleOnClickRegisterDetail}>Agregar
                                                    </button>
                                                    <button className="btn btn-danger shadow-md mr-2"
                                                            onClick={handleOnClickCancelDetail}>Cancelar
                                                    </button>
                                                    <button className="btn btn-success shadow-md mr-2 color-white"
                                                            onClick={handleOnClickCancelDetail}>Aceptar
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="post  overflow-hidden box mt-5 z-0">
                                                <ul className="post__tabs nav nav-tabs flex-col sm:flex-row bg-slate-100 dark:bg-darkmode-800"
                                                    role="tablist">
                                                    <li className="nav-item">
                                                        <button title=""
                                                                className="nav-link tooltip w-full sm:w-40 py-4 active"
                                                                id="content-tab"
                                                                role="tab" aria-controls="content" onClick={general}><i
                                                            data-lucide="file-text" className="w-4 h-4 mr-2"/> General
                                                        </button>
                                                    </li>

                                                    <li className="nav-item">
                                                        <button title=""
                                                                className="nav-link tooltip w-full sm:w-40 py-4"
                                                                id="meta-title-tab"
                                                                role="tab" aria-hidden="true" onClick={family}>
                                                            <i data-lucide="code" className="w-4 h-4 mr-2"/> Familia
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>

                                            {showDiv &&
                                                <div className="relative flex-auto">
                                                    {dataDetail.length !== 0 ?
                                                        <DataTable
                                                            columns={columnsDetail(actionActiveDetail, actionDeleteDetail, actionEditDetail)}
                                                            customStyles={customStyless}
                                                            data={dataDetail}
                                                            progressPending={loading}
                                                            progressComponent={<Preload/>}
                                                            pagination
                                                            paginationServer
                                                            paginationTotalRows={totalRowsDetail}
                                                            onChangeRowsPerPage={handlePerRowsChangeDetail}
                                                            onChangePage={handlePageChange}

                                                        />
                                                        :
                                                        <DataTable
                                                            columns={columnsDetail(actionActiveDetail, actionDeleteDetail, actionEditDetail)}
                                                            customStyles={customStyless}
                                                            data={dataDetail}
                                                            progressPending={loading}
                                                            progressComponent={<Preload/>}
                                                            noDataComponent="No existen registros en esta tabla"
                                                            pagination
                                                            paginationServer
                                                            paginationTotalRows={totalRowsDetail}
                                                            onChangeRowsPerPage={handlePerRowsChangeDetail}
                                                            onChangePage={handlePageChange}
                                                        />}
                                                </div>
                                            }
                                            {showDivFamily &&

                                                <div className="tableContainer">
                                                    <ExpandableTable columns={columnsa} data={datass}
                                                                     hideCollapseExpandButtons/>
                                                </div>

                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"/>
                    </>
                ) : null}</div>


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
                            columns={columns(actionDelete, actionViewDetail, actionEdit)}
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
                            columns={columns(actionDelete, actionViewDetail, actionEdit)}
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
                             final_date={final_date}
                             setStart_date={setStart_date}
                             setFinal_date={setFinal_date}
                             setFormType={setFormType}

                        />
                        :
                        <Add handleOnClickRegister={handleOnClickUpdate}
                             name={name}
                             setName={setName}
                             start_date={start_date}
                             final_date={final_date}
                             setStart_date={setStart_date}
                             setFinal_date={setFinal_date}
                             setFormType={setFormType}

                        />
                    }
                </>
            }
        </div>
    );
}

export default Index;