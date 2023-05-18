import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {env} from "@/env.js";
import columns from '../../data/Product.jsx';
import Preload from "@/components/preload/preload";
import 'sweetalert2/src/sweetalert2.scss';
import Add from "./add.jsx";
import List from "../../components/layouts/list/index.jsx";

function Index() {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [DescriptionAgain, setDescriptionAgain] = useState('');
    const [line_CreationDate, setProductCreationDate] = useState('');
    const [line_ApprovedStatus, setProduct_ApprovedStatus] = useState('1');
    const [formType, setFormType] = useState('list');
    const [img, setImg] = useState('');
    /* Server Side */
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [page_, setPage_] = useState(1);
    const [dataxProduct, setdataxProduct] = useState('');
    const [type, setType] = useState('');
    const [comment, setComment] = useState('');
    const [model, setModel] = useState('');
    const [image, setImage] = useState('');
    const [minimun_stock, setMinimun_stock] = useState('');
    const [maximun_stock, setMaximun_stock] = useState('');
    const [internal_code, setInternal_code] = useState('');
    const [original_code, setOriginal_code] = useState('');
    const [user_code, setUser_code] = useState('');
    const [cost, setCost] = useState('');


    const [familyContainer, setFamilyContainer] = useState([]);
    const [product_service_type_Container, setProduct_service_type_Container] = useState([]);
    const [brandContainer, setBrandContainer] = useState([]);
    const [lineContainer, setLineContainer] = useState([]);
    const [makerContainer, setMakerContainer] = useState([]);
    const [unit_of_measurement_Container, setUnit_of_measurement_Container] = useState([]);


    const [family, setFamily] = useState('');
    const [productServiceType, setProductServiceType] = useState('');
    const [brand, setBrand] = useState('');
    const [line, setLine] = useState('');
    const [familyName, setFamilyName] = useState('');
    const [maker, setMaker] = useState('');
    const [unitMeasure, setUnitMeasure] = useState('');

    const [statusDinamic, setStatusDinamic] = useState('');


    const fetchProducts = async page => {
        setLoading(true);
        const endpoint = `${env.apiURL}listProduct`;
        const response = await axios.get(`${endpoint}?page=${page}&per_page=${perPage}&type=P`);
        setData(response.data.data);
        setPage_(response.data.page);
        setTotalRows(response.data.total);
        setLoading(false);
    };

    const handlePageChange = page => {
        fetchProducts(page);
    };

    const handlePerRowsChange = (rows) => {
        setLoading(true);
        setPerPage(rows);
    };

    useEffect(() => {
        fetchProducts(page_);
    }, []);

    const actionDelete = async (product_id) => {
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
                const endpoint = `${env.apiURL}deleteProduct`;
                axios.post(endpoint, {product_id, status: 0})
                    .then((response) => {
                        Swal.fire(
                            'Eliminado!',
                            'Se ha eliminado Correctamente.',
                            'success'
                        ).then((result) => {
                            fetchProducts(page_);
                        });
                    })
                    .catch(error => {
                        alert('Operacion no completada');
                    });

            }
        });
    };

    const actionEdit = async (product_id) => {
        const endpoint = `${env.apiURL}listXProduct`;
        const response = await axios.get(`${endpoint}?product_id=${product_id}`);
        setdataxProduct(response.data.product_id);
        setName(response.data.name);
        setDescription(response.data.description);
        setFamily(response.data.family_id);
        setProductServiceType(response.data.product_service_type_id);
        setBrand(response.data.brand_id);
        setLine(response.data.line_id);
        setMaker(response.data.maker_id);
        setUnitMeasure(response.data.unit_of_measurement_id);
        setType(response.data.type);
        setComment(response.data.comment);
        setModel(response.data.model);
        setImage(response.data.image);
        setMinimun_stock(response.data.minimun_stock);
        setMaximun_stock(response.data.maximun_stock);
        setInternal_code(response.data.internal_code);
        setOriginal_code(response.data.original_code);
        setUser_code(response.data.user_code);
        setCost(response.data.cost);
        setStatusDinamic(response.data.status_dinamic);
        const endpoint1 = `${env.apiURL}listFamilys`;
        const response1 = await axios.get(`${endpoint1}`);
        setFamilyContainer(response1.data);

        const endpoint2 = `${env.apiURL}listProductServiceTypes`;
        const response2 = await axios.get(`${endpoint2}?type=P`);
        setProduct_service_type_Container(response2.data);

        const endpoint3 = `${env.apiURL}listBrands`;
        const response3 = await axios.get(`${endpoint3}`);
        setBrandContainer(response3.data);

        const endpoint4 = `${env.apiURL}listLines`;
        const response4 = await axios.get(`${endpoint4}`);
        setLineContainer(response4.data);

        const endpoint5 = `${env.apiURL}listMakers`;
        const response5 = await axios.get(`${endpoint5}`);
        setMakerContainer(response5.data);

        const endpoint6 = `${env.apiURL}listUnitOfMeasurement`;
        const response6 = await axios.get(`${endpoint6}`);
        setUnit_of_measurement_Container(response6.data);

        setFormType('edit');
    };
    const actionAdd = async () => {
        const endpoint = `${env.apiURL}listFamilys`;
        const response = await axios.get(`${endpoint}`);
        setFamilyContainer(response.data);

        const endpoint2 = `${env.apiURL}listProductServiceTypes`;
        const response2 = await axios.get(`${endpoint2}?type=P`);
        setProduct_service_type_Container(response2.data);

        const endpoint3 = `${env.apiURL}listBrands`;
        const response3 = await axios.get(`${endpoint3}`);
        setBrandContainer(response3.data);

        const endpoint4 = `${env.apiURL}listLines`;
        const response4 = await axios.get(`${endpoint4}`);
        setLineContainer(response4.data);

        const endpoint5 = `${env.apiURL}listMakers`;
        const response5 = await axios.get(`${endpoint5}`);
        setMakerContainer(response5.data);

        const endpoint6 = `${env.apiURL}listUnitOfMeasurement`;
        const response6 = await axios.get(`${endpoint6}`);
        setUnit_of_measurement_Container(response6.data);
        console.log(response6);
        setFormType('register');
    };

    const handleOnClickRegister = async (e) => {
        e.preventDefault();
        const endpoint = `${env.apiURL}registerProduct`;
        console.log(family);
        console.log('family');
        await axios.post(endpoint, {
                name,
                description,
                family_id: family,
                product_service_type_id: productServiceType,
                brand_id: brand,
                line_id: line,
                unit_of_measurement_id: unitMeasure,
                maker_id: maker,
                type: 'P',
                comment,
                model,
                minimun_stock,
                maximun_stock,
                internal_code,
                original_code,
                user_code,
                cost,
                status_dinamic: statusDinamic,
                status: '1',
                img
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
            .then((response) => {
                window.location.reload();
            })
            .catch(error => {
                alert('Debe completar correctamente sus datos');
            });
    };

    const handleOnClickUpdate = async (e) => {
        e.preventDefault();
        const endpoint = `${env.apiURL}updateProduct`;
        await axios.post(endpoint, {
                product_id: dataxProduct,
                name,
                description,
                family_id: family,
                product_service_type_id: productServiceType,
                brand_id: brand,
                line_id: line,
                unit_of_measurement_id: unitMeasure,
                maker_id: maker,
                type: 'P',
                comment,
                model,
                minimun_stock,
                maximun_stock,
                internal_code,
                original_code,
                user_code,
                cost,
                status_dinamic: statusDinamic,
                status: '1',
                img
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
            .then((response) => {
                window.location.reload();
            })
            .catch(error => {
                alert('Debe completar correctamente sus datos');
            });
    };

    const captureType = (e) => {
        setProduct_ApprovedStatus(e.target.value);
    };

    const handleOnClickSearch = async page => {
        setLoading(true);
        const endpoint = `${env.apiURL}listProduct`;
        const response = await axios.get(`${endpoint}?page=${page_}&per_page=${perPage}&name=${name}&line_CreationDate=${line_CreationDate}`);
        setData(response.data.data);
        setPage_(response.data.page);
        setTotalRows(response.data.total);
        setLoading(false);
    };

    const handleOnClickClean = async page => {
        setLoading(true);
        setName('');
        setDescription('');
        setProduct_ApprovedStatus('');
        setProductCreationDate('');
        fetchProducts(1);
        setLoading(false);
    };
    console.log(line_ApprovedStatus);

    const handleOnClickModalImage = async (imageName, lineName, lineDescription) => {
        Swal.fire({
            title: lineName,
            text: lineDescription,
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
                        nameSection="Articulos"
                        dataType="text"
                        dataSearch1={name}
                        setdataSearch1={setName}
                        dataType2="date"
                        dataSearch2={line_CreationDate}
                        setdataSearch2={setProductCreationDate}
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
                             description={description}
                             setDescription={setDescription}
                             DescriptionAgain={DescriptionAgain}
                             setDescriptionAgain={setDescriptionAgain}
                             img={img}
                             setImg={setImg}
                             setFormType={setFormType}
                             setProduct_ApprovedStatus={setProduct_ApprovedStatus}
                             familyContainer={familyContainer}
                             setFamilyContainer={setFamilyContainer}
                             product_service_type_Container={product_service_type_Container}
                             setProduct_service_type_Container={setProduct_service_type_Container}
                             brandContainer={brandContainer}
                             setBrandContainer={setBrandContainer}
                             lineContainer={lineContainer}
                             setLineContainer={setLineContainer}
                             makerContainer={makerContainer}
                             setMakerContainer={setMakerContainer}
                             unit_of_measurement_Container={unit_of_measurement_Container}
                             setUnit_of_measurement_Container={setUnit_of_measurement_Container}
                             type={type}
                             setType={setType}
                             comment={comment}
                             setComment={setComment}
                             model={model}
                             setModel={setModel}
                             minimun_stock={minimun_stock}
                             setMinimun_stock={setMinimun_stock}
                             maximun_stock={maximun_stock}
                             setMaximun_stock={setMaximun_stock}
                             internal_code={internal_code}
                             setInternal_code={setInternal_code}
                             original_code={original_code}
                             setOriginal_code={setOriginal_code}
                             user_code={user_code}
                             setUser_code={setUser_code}
                             cost={cost}
                             setCost={setCost}

                             family={family}
                             setFamily={setFamily}
                             productServiceType={productServiceType}
                             setProductServiceType={setProductServiceType}
                             brand={brand}
                             setBrand={setBrand}
                             line={line}
                             setLine={setLine}
                             maker={maker}
                             setMaker={setMaker}
                             unitMeasure={unitMeasure}
                             setUnitMeasure={setUnitMeasure}
                             statusDinamic={statusDinamic}
                             setStatusDinamic={setStatusDinamic}

                        />
                        :
                        <Add handleOnClickRegister={handleOnClickUpdate}
                             name={name}
                             setName={setName}
                             description={description}
                             setDescription={setDescription}
                             DescriptionAgain={DescriptionAgain}
                             setDescriptionAgain={setDescriptionAgain}
                             img={img}
                             setImg={setImg}
                             setFormType={setFormType}
                             setProduct_ApprovedStatus={setProduct_ApprovedStatus}
                             familyContainer={familyContainer}
                             setFamilyContainer={setFamilyContainer}
                             product_service_type_Container={product_service_type_Container}
                             setProduct_service_type_Container={setProduct_service_type_Container}
                             brandContainer={brandContainer}
                             setBrandContainer={setBrandContainer}
                             lineContainer={lineContainer}
                             setLineContainer={setLineContainer}
                             makerContainer={makerContainer}
                             setMakerContainer={setMakerContainer}
                             unit_of_measurement_Container={unit_of_measurement_Container}
                             setUnit_of_measurement_Container={setUnit_of_measurement_Container}
                             type={type}
                             setType={setType}
                             comment={comment}
                             setComment={setComment}
                             model={model}
                             setModel={setModel}
                             minimun_stock={minimun_stock}
                             setMinimun_stock={setMinimun_stock}
                             maximun_stock={maximun_stock}
                             setMaximun_stock={setMaximun_stock}
                             internal_code={internal_code}
                             setInternal_code={setInternal_code}
                             original_code={original_code}
                             setOriginal_code={setOriginal_code}
                             user_code={user_code}
                             setUser_code={setUser_code}
                             cost={cost}

                             family={family}
                             setFamily={setFamily}
                             productServiceType={productServiceType}
                             setProductServiceType={setProductServiceType}
                             brand={brand}
                             setBrand={setBrand}
                             line={line}
                             setLine={setLine}
                             maker={maker}
                             setMaker={setMaker}
                             unitMeasure={unitMeasure}
                             setUnitMeasure={setUnitMeasure}
                             statusDinamic={statusDinamic}
                             setStatusDinamic={setStatusDinamic}
                             setCost={setCost}
                        />
                    }
                </>
            }
        </div>
    );
}

export default Index;
