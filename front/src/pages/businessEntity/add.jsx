import React, {useEffect, useState} from 'react';
import axios from "axios";
import DataTable from 'react-data-table-component';
import {env} from "@/env.js";
import columns from '../../data/Users.jsx';
import Preload from "@/components/preload/preload";
import Button from "@/components/Button/Button.jsx";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import Input from "../../components/Input/Input.jsx";
import PasswordChecklist from "react-password-checklist";
import Select from 'react-select';

const Add = (props) => {
    const {
        handleOnClickRegister,
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
        nationality_ID,
        ubigeous_Home,
        position_ID,
        formType,

        setHandleOnClickRegister,
        setPerson_Name,
        setPerson_LastNamePaternal,
        setPerson_LastNameMaternal,
        setPerson_DateBirth,
        setPerson_Direction,
        setPerson_Phone,
        setPerson_CellPhone,
        setPerson_Email,
        setPerson_WebSite,
        setStaff_StartDate,
        setStaff_finalDate,
        setStaff_ContractNumber,

        setUbigeous_PlaceBirth,
        setNumberDocument,
        setPerson_Gender,
        setStatusmarital_ID,
        setNationality_ID,
        setUbigeous_Home,
        setPosition_ID,

        setFormType,
        img,
        setImg
    } = props;

    const handleOnClickList = () => {
        setStaff_Name('');
        setStaff_Description('');
        setFormType('list');
    };


    const [selectMultiple, setSelectMultiple] = useState(["1", "3"]);
    const [select, setSelect] = useState("1");
    const [showDiv, setShowDiv] = useState(true);
    const [showDivCliente, setShowDivCliente] = useState(false);
    const [showDivProveedor, setShowDivProveedor] = useState(false);
    const [showDivPersonal, setShowDivPersonal] = useState(false);

    const [showNavCliente, setShowNavCliente] = useState(false);
    const [showNavProveedor, setShowNavProveedor] = useState(false);
    const [showNavPersonal, setShowNavPersonal] = useState(false);

    const general = () => {
        setShowDiv(true);
        setShowDivCliente(false);
        setShowDivProveedor(false);
        setShowDivPersonal(false);
    };
    const cliente = () => {
        setShowDiv(false);
        setShowDivPersonal(false);
        setShowDivProveedor(false);
        setShowDivCliente(true);
    };
    const proveedor = () => {
        setShowDiv(false);
        setShowDivCliente(false);
        setShowDivPersonal(false);
        setShowDivProveedor(true);
    };
    const personal = () => {
        setShowDiv(false);
        setShowDivCliente(false);
        setShowDivProveedor(false);
        setShowDivPersonal(true);
    };

    const options = [
        {value: 'Cliente', label: 'Cliente'},
        {value: 'Proveedor', label: 'Proveedor'},
        {value: 'Personal', label: 'Personal'}
    ]

    const options2 = [
        {value: 'A 15 DIAS', label: 'A 15 DIAS'},
        {value: 'A 30 DIAS', label: 'A 30 DIAS'},
        {value: 'A 50 DIAS', label: 'A 50 DIAS'},
        {value: 'A 90 DIAS', label: 'A 90 DIAS'},
        {value: 'A 120 DIAS', label: 'A 120 DIAS'},
        {value: 'A 150 DIAS', label: 'A 150 DIAS'}

    ]
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [selectedOptions2, setSelectedOptions2] = useState([]);

    const handleChange = (selected) => {
        setSelectedOptions(selected);
        // Lógica para procesar las opciones seleccionadas
        console.log('Opciones seleccionadas:', selected);
    };
    const handleChange2 = (selected) => {
        setSelectedOptions2(selected);
        // Lógica para procesar las opciones seleccionadas
        console.log('Opciones seleccionadas:', selected);
    };


    useEffect(() => {
        /*      const lista = selectedOptions.map((elemento) => {
                    console.log(elemento);
                    if (elemento.label === 'Cliente') {
                        return setShowNavCliente(true);
                    } else if (elemento.label === 'Proveedor') {
                        return setShowNavProveedor(true);
                    } else if (elemento.label === 'Personal') {
                        return setShowNavPersonal(true);
                    }

                });*/
        console.log(selectedOptions);
        const clienteLabel = selectedOptions.some(cliente => cliente.label === 'Cliente');
        if(clienteLabel){
            setShowNavCliente(true);
        }else{
            setShowNavCliente(false);
        }

        const proveedorLabel = selectedOptions.some(proveedor => proveedor.label === 'Proveedor');
        if(proveedorLabel){
            setShowNavProveedor(true);
        }else{
            setShowNavProveedor(false);
        }

        const personalLabel = selectedOptions.some(personal => personal.label === 'Personal');
        if(personalLabel){
            setShowNavPersonal(true);
        }else{
            setShowNavPersonal(false);
        }

    });



    return (

        <div className="">
            <div className="intro-y flex flex-col sm:flex-row items-center mt-8">
                <h2 className="text-lg font-medium mr-auto">
                    Nueva Persona
                </h2>
                <div className="w-full sm:w-auto flex mt-4 sm:mt-0">

                    <div className="flex justify-end flex-col md:flex-row gap-2 mt-5">
                        <Button
                            textName='Cancelar'
                            color='btn-light'
                            onClick={handleOnClickList}
                        />
                        <Button
                            textName='Guardar'
                            onClick={handleOnClickRegister}
                        />
                    </div>

                </div>
            </div>
            <div className="pos intro-y grid grid-cols-12 gap-5 mt-5">
                <div className="intro-y col-span-12 lg:col-span-8">

                    <div className={"flex z-10"}>
                        <p className={"flex w-10"}>Tipo: </p><p></p>
                        <div className="w-2/5">
                            <Select
                                options={options}
                                closeMenuOnSelect={false}
                                value={selectedOptions}
                                onChange={handleChange}
                                isMulti

                                className="w-full"

                            />

                        </div>


                    </div>

                    <div className="post  overflow-hidden box mt-5 z-0">
                        <ul className="post__tabs nav nav-tabs flex-col sm:flex-row bg-slate-200 dark:bg-darkmode-800"
                            role="tablist">
                            <li className="nav-item">
                                <button title=""
                                        className="nav-link tooltip w-full sm:w-40 py-4 active" id="content-tab"
                                        role="tab" aria-controls="content" onClick={general}><i
                                    data-lucide="file-text" className="w-4 h-4 mr-2"></i> General
                                </button>
                            </li>
                            {showNavCliente &&
                                <li className="nav-item">
                                    <button title=""
                                            className="nav-link tooltip w-full sm:w-40 py-4" id="meta-title-tab"
                                            role="tab" aria-hidden="true" onClick={cliente}>
                                        <i data-lucide="code" className="w-4 h-4 mr-2"></i> Cliente
                                    </button>
                                </li>}
                            {showNavProveedor &&
                                <div>
                                    <li className="nav-item">
                                        <button title="Use search keywords" data-toggle="tab" data-target="#keywords"
                                                className="nav-link tooltip w-full sm:w-40 py-4" id="keywords-tab"
                                                role="tab" onClick={proveedor}><i data-lucide="align-left"
                                                                                  className="w-4 h-4 mr-2"></i> Proveedor
                                        </button>
                                    </li>
                                </div>
                            }
                            {showNavPersonal &&
                                <div>
                                    <li className="nav-item">
                                        <button title="Use search keywords" data-toggle="tab" data-target="#keywords"
                                                className="nav-link tooltip w-full sm:w-40 py-4" id="keywords-tab"
                                                role="tab" onClick={personal}><i data-lucide="align-left"
                                                                                 className="w-4 h-4 mr-2"></i> Personal
                                        </button>
                                    </li>
                                </div>
                            }
                        </ul>
                        {showDivProveedor &&
                            <div className="post__content tab-content" id="targetGeneral">
                                <div id="content" className="tab-pane p-5 active" role="tabpanel"
                                     aria-labelledby="content-tab">
                                    <div
                                        className="border border-slate-200/60 dark:border-darkmode-400 rounded-md p-5 w-full ">

                                        <div
                                            className="font-medium flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5">
                                            <i data-lucide="chevron-down" className="w-4 h-4 mr-2"></i> Data
                                        </div>
                                        <div className="flex">
                                            <div className="mt-5 w-2/4">
                                                <div className="mt-3">
                                                    <label className="form-label">Sector Comercial</label>
                                                    <div className="dropdown">
                                                        <select
                                                            className="dropdown-toggle btn w-full btn-outline-secondary dark:bg-darkmode-800 dark:border-darkmode-800 flex items-center justify-start">
                                                            <option>MADERA</option>
                                                            <option>METAL MECANICA</option>
                                                            <option>TRANSPORTE</option>
                                                        </select>
                                                    </div>
                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>}
                        {showDivPersonal &&
                            <div className="post__content tab-content" id="targetGeneral">
                                <div id="content" className="tab-pane p-5 active" role="tabpanel"
                                     aria-labelledby="content-tab">
                                    <div
                                        className="border border-slate-200/60 dark:border-darkmode-400 rounded-md p-5 w-full ">

                                        <div
                                            className="font-medium flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5">
                                            <i data-lucide="chevron-down" className="w-4 h-4 mr-2"></i> Data
                                        </div>
                                        <div className="flex">
                                            <div className="mt-5 w-2/4">
                                                <div className="mt-3">
                                                    <label className="form-label">Fecha Inicio</label>
                                                    <input type="text" className="datepicker form-control"
                                                           id="post-form-2"
                                                           data-single-mode="true" placeholder=" 01-01-23 "/>
                                                </div>
                                                <div className="mt-3">
                                                    <label className="form-label">Cargo</label>
                                                    <div className="dropdown">
                                                        <select
                                                            className="dropdown-toggle btn w-full btn-outline-secondary dark:bg-darkmode-800 dark:border-darkmode-800 flex items-center justify-start">
                                                            <option>ADMINISTRADOR</option>
                                                            <option>ASISTENTE ADMINISTRATIVO</option>
                                                            <option>ASISTENTE PERSONAL</option>
                                                            <option>AYUDANTE</option>
                                                            <option>CONTADOR</option>
                                                            <option>GERENTE COMERCIAL</option>
                                                            <option>GERENTE GENERAL</option>
                                                            <option>JEFE DE VENTA</option>
                                                            <option>LOGISTICA</option>
                                                            <option>MAESTRO</option>
                                                            <option>PRACTICANTES</option>
                                                            <option>SUB GERENTE</option>
                                                            <option>VENDEDOR</option>
                                                            <option>VENDEDOR NORTE</option>
                                                            <option>VENDEDOR SUPERVISOR</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="mt-3">
                                                    <label className="form-label">Lista</label>
                                                    <div className="dropdown">
                                                        <select
                                                            className="dropdown-toggle btn w-full btn-outline-secondary dark:bg-darkmode-800 dark:border-darkmode-800 flex items-center justify-start">
                                                            <option>DUBAU 01</option>
                                                            <option>DUBAU 02</option>
                                                            <option>DUBAU 03</option>
                                                            <option>DUBAU 04</option>
                                                            <option>DUBAU 05</option>
                                                            <option>DUBAU 06</option>
                                                        </select>
                                                    </div>
                                                </div>


                                            </div>
                                            <div className="mt-5 w-1/5">
                                            </div>
                                            <div className="mt-5 w-2/4">
                                                <div className="mt-3">
                                                    <label className="form-label">Fecha Fin</label>
                                                    <input type="text" className="datepicker form-control"
                                                           id="post-form-2"
                                                           data-single-mode="true" placeholder=" 01-01-23 "/>
                                                </div>
                                                <div className="mt-3">
                                                    <label className="form-label">Nro. Contrato</label>
                                                    <input type="text" className="datepicker form-control"
                                                           id="post-form-2"
                                                           data-single-mode="true" placeholder=" 00000 "/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>}
                        {showDivCliente &&
                            <div className="post__content tab-content" id="targetGeneral">
                                <div id="content" className="tab-pane p-5 active" role="tabpanel"
                                     aria-labelledby="content-tab">
                                    <div
                                        className="border border-slate-200/60 dark:border-darkmode-400 rounded-md p-5 w-full ">

                                        <div
                                            className="font-medium flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5">
                                            <i data-lucide="chevron-down" className="w-4 h-4 mr-2"></i> Data
                                        </div>
                                        <div className="flex">
                                            <div className="mt-5 w-2/4">
                                                <div className="mt-3">
                                                    <label className="form-label">Calificacion</label>
                                                    <div className="dropdown">
                                                        <select
                                                            className="dropdown-toggle btn w-full btn-outline-secondary dark:bg-darkmode-800 dark:border-darkmode-800 flex items-center justify-start">
                                                            <option>EXCELENTE</option>
                                                            <option>BUENO</option>
                                                            <option>REGULAR</option>
                                                            <option>MALO</option>
                                                            <option>SIN DESCUENTO</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="mt-3">
                                                    <label className="form-label">Linea de Credito</label>
                                                    <input type="text" className="datepicker form-control"
                                                           id="post-form-2"
                                                           data-single-mode="true" placeholder=" 0.00 "/>
                                                </div>
                                                <div className="mt-3">
                                                    <label className="form-label">Categoria</label>
                                                    <div className="dropdown">
                                                        <select
                                                            className="dropdown-toggle btn w-full btn-outline-secondary dark:bg-darkmode-800 dark:border-darkmode-800 flex items-center justify-start">
                                                            <option>DUBAU 01</option>
                                                            <option>DUBAU 02</option>
                                                            <option>DUBAU 03</option>
                                                            <option>DUBAU 04</option>
                                                            <option>DUBAU 05</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="mt-3">
                                                    <label className="form-label">Forma de Pago</label>
                                                    <div className="dropdown">
                                                        <select
                                                            className="dropdown-toggle btn w-full btn-outline-secondary dark:bg-darkmode-800 dark:border-darkmode-800 flex items-center justify-start">
                                                            <option>CONTADO</option>
                                                            <option>CREDITO</option>
                                                            <option>LETRA</option>
                                                            <option>TRANSFERENCIA</option>
                                                        </select>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="mt-5 w-1/5">
                                            </div>
                                            <div className="mt-5 w-2/4">

                                                <div className="mt-3">
                                                    <label className="form-label">Condiciones</label>
                                                    <div className="dropdown z-40">
                                                        <Select
                                                            options={options2}
                                                            closeMenuOnSelect={false}
                                                            value={selectedOptions2}
                                                            onChange={handleChange2}
                                                            isMulti

                                                            className="w-full"

                                                        />
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>}

                        {showDiv &&
                            <div className="post__content tab-content" id="targetGeneral">
                                <div id="content" className="tab-pane p-5 active" role="tabpanel"
                                     aria-labelledby="content-tab">
                                    <div
                                        className="border border-slate-200/60 dark:border-darkmode-400 rounded-md p-5 w-full ">

                                        <div
                                            className="font-medium flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5">
                                            <i data-lucide="chevron-down" className="w-4 h-4 mr-2"></i> Data
                                        </div>
                                        <div className="flex">
                                            <div className="mt-5 w-2/4">
                                                <div className="mt-3">
                                                    <label className="form-label">Nombres</label>
                                                    <input type="text" className="datepicker form-control"
                                                           id="post-form-2"
                                                           data-single-mode="true" placeholder=" name "/>
                                                </div>
                                                <div className="mt-3">
                                                    <label className="form-label">Apellido Paterno</label>
                                                    <input type="text" className="datepicker form-control"
                                                           id="post-form-2"
                                                           data-single-mode="true" placeholder=" last name"/>
                                                </div>
                                                <div className="mt-3">
                                                    <label className="form-label">Apellido Materno</label>
                                                    <input type="text" className="datepicker form-control"
                                                           id="post-form-2"
                                                           data-single-mode="true" placeholder=" mother's last name"/>
                                                </div>
                                            </div>
                                            <div className="mt-5 w-1/5">
                                            </div>
                                            <div className="mt-5 w-2/4">


                                                <div className="mt-3">
                                                    <label className="form-label">Pais de Origen</label>
                                                    <div className="dropdown">
                                                        <select
                                                            className="dropdown-toggle btn w-full btn-outline-secondary dark:bg-darkmode-800 dark:border-darkmode-800 flex items-center justify-start">
                                                            <option>PERU</option>
                                                            <option>VENEZUELA</option>
                                                            <option>ECUADOR</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="mt-3">
                                                    <label className="form-label">Sexo</label>
                                                    <div className="dropdown">
                                                        <select
                                                            className="dropdown-toggle btn w-full btn-outline-secondary dark:bg-darkmode-800 dark:border-darkmode-800 flex items-center justify-start">
                                                            <option>MASCULINO</option>
                                                            <option>FEMENINO</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="mt-3">
                                                    <label className="form-label">Estado Civil</label>
                                                    <div className="dropdown">
                                                        <select
                                                            className="dropdown-toggle btn w-full btn-outline-secondary dark:bg-darkmode-800 dark:border-darkmode-800 flex items-center justify-start">
                                                            <option>CASADO</option>
                                                            <option>CONVIVIENTE</option>
                                                            <option>DIVORCIADO</option>
                                                            <option>NO REGISTRADO</option>
                                                            <option>SOLTERO</option>
                                                            <option>VIUDO</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div id="content" className="tab-pane p-5 active" role="tabpanel"
                                     aria-labelledby="content-tab">

                                    <div className="border border-slate-200/60 dark:border-darkmode-400 rounded-md p-5">
                                        <div
                                            className="font-medium flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5">
                                            <i data-lucide="chevron-down" className="w-4 h-4 mr-2"></i> Contacto
                                        </div>
                                        <div className="mt-5">
                                            <div className="mt-3">
                                                <label className="form-label">Telefono</label>
                                                <input type="text" className="intro-y form-control py-3 px-4 box pr-10"
                                                       placeholder=" (01) 0000"/>
                                            </div>
                                            <div className="mt-3">
                                                <label className="form-label">Celular</label>
                                                <input type="text" className="intro-y form-control py-3 px-4 box pr-10"
                                                       placeholder="999999999"/>
                                            </div>
                                            <div className="mt-3">
                                                <label className="form-label">Correo</label>
                                                <input type="text" className="intro-y form-control py-3 px-4 box pr-10"
                                                       placeholder="example@gmail.com"/>
                                            </div>
                                            <div className="mt-3">
                                                <label className="form-label">Sitio Web</label>
                                                <input type="text" className="intro-y form-control py-3 px-4 box pr-10"
                                                       placeholder="www.example.com"/>
                                            </div>
                                            <div className="mt-3">
                                                <label className="form-label">Numero de Cuenta S/.</label>
                                                <input type="text" className="intro-y form-control py-3 px-4 box pr-10"
                                                       placeholder="000-00000-000"/>
                                            </div>
                                            <div className="mt-3">
                                                <label className="form-label">Numero de Cuenta $.</label>
                                                <input type="text" className="intro-y form-control py-3 px-4 box pr-10"
                                                       placeholder="000-00000-000"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>}
                    </div>
                </div>

                <div className="col-span-12 lg:col-span-4">
                    <div className="intro-y box p-5">
                        <div className="mt-3">
                            <label className="form-label">Tipo Persona</label>
                            <div className="dropdown">
                                <select
                                    className="dropdown-toggle btn w-full btn-outline-secondary dark:bg-darkmode-800 dark:border-darkmode-800 flex items-center justify-start">
                                    <option>P. Natural</option>
                                    <option>P. Juridica</option>
                                </select>
                            </div>
                        </div>

                        <div className="mt-3">
                            <label className="form-label">Tipo Documento</label>
                            <div className="dropdown">
                                <select
                                    className="dropdown-toggle btn w-full btn-outline-secondary dark:bg-darkmode-800 dark:border-darkmode-800 flex items-center justify-start">
                                    <option>DNI</option>
                                    <option>C.E</option>
                                </select>
                            </div>
                        </div>

                        <div class="mt-3">
                            <label htmlFor="post-form-2" className="form-label">Número de Documento</label>
                            <input type="text" className="datepicker form-control" id="post-form-2"
                                   data-single-mode="true" placeholder=" 00000000"/>
                        </div>
                        <div className="mt-3">
                            <label className="form-label">Departamento</label>


                            <div className="dropdown">
                                <select
                                    className="dropdown-toggle btn w-full btn-outline-secondary dark:bg-darkmode-800 dark:border-darkmode-800 flex items-center justify-start">
                                    <option>LIMA</option>
                                    <option>JUNIN</option>
                                    <option>TACNA</option>
                                </select>
                            </div>
                        </div>

                        <div className="mt-3">
                            <label className="form-label">Provincia</label>


                            <div className="dropdown">
                                <select
                                    className="dropdown-toggle btn w-full btn-outline-secondary dark:bg-darkmode-800 dark:border-darkmode-800 flex items-center justify-start">
                                    <option>LIMA</option>
                                    <option>YAUYOS</option>
                                </select>
                            </div>
                        </div>
                        <div className="mt-3">
                            <label className="form-label">Distrito</label>


                            <div className="dropdown">
                                <select
                                    className="dropdown-toggle btn w-full btn-outline-secondary dark:bg-darkmode-800 dark:border-darkmode-800 flex items-center justify-start">
                                    <option>LIMA</option>
                                    <option>YAUYOS</option>
                                </select>
                            </div>
                        </div>

                        <div class="mt-3">
                            <label htmlFor="post-form-2" className="form-label">Direccion</label>
                            <input type="text" className="datepicker form-control" id="post-form-2"
                                   data-single-mode="true" placeholder=" Av. Los Algarrobos"/>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    );
}

export default Add