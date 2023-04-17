import React, {useEffect, useState} from 'react';
import axios from "axios";
import DataTable from 'react-data-table-component';
import {env} from "@/env.js";
import columns from '../../data/Users.jsx';
import Preload from "@/components/preload/preload";
import Button from "@/components/Button/Button.jsx";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import {Lucide} from "@/components/base-components/index.js";
import Input from "../../components/Input/Input.jsx";
import PasswordChecklist from "react-password-checklist";


const Add =  (props) => {
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
    }

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]

    const [selectMultiple, setSelectMultiple] = useState(["1", "3"]);
    const [select, setSelect] = useState("1");
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

                    <div className={"flex"}>
                        <p className={"flex w-10"}>Tipo: </p><p></p>
                        <select className="dropdown-toggle btn w-40 btn-outline-secondary dark:bg-darkmode-800 dark:border-darkmode-800 flex " >
                            <option>Proveedor</option>
                            <option>Cliente</option>
                            <option>Personal</option>
                        </select>


                    </div>


                        <div className="post intro-y overflow-hidden box mt-5 z-0">
                            <ul className="post__tabs nav nav-tabs flex-col sm:flex-row bg-slate-200 dark:bg-darkmode-800"
                                role="tablist">
                                <li className="nav-item">
                                    <button title="Fill in the article content" data-toggle="tab"
                                            data-target="#targetGeneral"
                                            className="nav-link tooltip w-full sm:w-40 py-4 active" id="content-tab"
                                            role="tab" aria-controls="content" ><i
                                        data-lucide="file-text" className="w-4 h-4 mr-2"></i> General
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button title="Adjust the meta title" data-toggle="tab"
                                            data-target="#targetCliente"
                                            className="nav-link tooltip w-full sm:w-40 py-4" id="meta-title-tab"
                                            role="tab"   aria-hidden="true" >
                                        <i data-lucide="code" className="w-4 h-4 mr-2"></i> Cliente
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button title="Use search keywords" data-tw-toggle="tab" data-tw-target="#keywords"
                                            className="nav-link tooltip w-full sm:w-40 py-4" id="keywords-tab"
                                            role="tab" ><i data-lucide="align-left"
                                                                                className="w-4 h-4 mr-2"></i> Proveedor
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button title="Use search keywords" data-tw-toggle="tab" data-tw-target="#keywords"
                                            className="nav-link tooltip w-full sm:w-40 py-4" id="keywords-tab"
                                            role="tab" ><i data-lucide="align-left"
                                                                                className="w-4 h-4 mr-2"></i> Personal
                                    </button>
                                </li>
                            </ul>
                            <div className="post__content tab-content"  id="targetGeneral">
                                <div id="content" className="tab-pane p-5 active" role="tabpanel"
                                     aria-labelledby="content-tab">
                                    <div className="border border-slate-200/60 dark:border-darkmode-400 rounded-md p-5 w-full ">

                                        <div
                                            className="font-medium flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5">
                                            <i data-lucide="chevron-down" className="w-4 h-4 mr-2"></i> Data
                                        </div>
                                        <div className="flex">
                                            <div className="mt-5 w-2/4">
                                                <div className="mt-3">
                                                    <label className="form-label">Nombres</label>
                                                    <input type="text" className="datepicker form-control" id="post-form-2"
                                                           data-single-mode="true" placeholder=" name " />
                                                </div>
                                                <div className="mt-3">
                                                    <label className="form-label">Apellido Paterno</label>
                                                    <input type="text" className="datepicker form-control" id="post-form-2"
                                                           data-single-mode="true" placeholder=" 00000000" />
                                                </div>
                                                <div className="mt-3">
                                                    <label className="form-label">Apellido Materno</label>
                                                    <input type="text" className="datepicker form-control" id="post-form-2"
                                                           data-single-mode="true" placeholder=" 00000000" />
                                                </div>
                                            </div>
                                            <div className="mt-5 w-1/5">
                                            </div>
                                            <div className="mt-5 w-2/4">


                                                <div className="mt-3">
                                                    <label className="form-label">Nacionalidad</label>
                                                    <div className="dropdown">
                                                        <select className="dropdown-toggle btn w-full btn-outline-secondary dark:bg-darkmode-800 dark:border-darkmode-800 flex items-center justify-start">
                                                            <option>PERU</option>
                                                            <option>VENEZUELA</option>
                                                            <option>ECUADOR</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="mt-3">
                                                    <label className="form-label">Sexo</label>
                                                    <div className="dropdown">
                                                        <select className="dropdown-toggle btn w-full btn-outline-secondary dark:bg-darkmode-800 dark:border-darkmode-800 flex items-center justify-start">
                                                            <option>MASCULINO</option>
                                                            <option>FEMENINO</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="mt-3">
                                                    <label className="form-label">Estado Civil</label>
                                                    <div className="dropdown">
                                                        <select className="dropdown-toggle btn w-full btn-outline-secondary dark:bg-darkmode-800 dark:border-darkmode-800 flex items-center justify-start">
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
                                                <input type="text" className="intro-y form-control py-3 px-4 box pr-10" placeholder=" (01) 0000" />
                                            </div>
                                            <div className="mt-3">
                                                <label className="form-label">Celular</label>
                                                <input type="text" className="intro-y form-control py-3 px-4 box pr-10" placeholder="999999999" />
                                            </div>
                                            <div className="mt-3">
                                                <label className="form-label">Correo</label>
                                                <input type="text" className="intro-y form-control py-3 px-4 box pr-10" placeholder="example@gmail.com" />
                                            </div>
                                            <div className="mt-3">
                                                <label className="form-label">Sitio Web</label>
                                                <input type="text" className="intro-y form-control py-3 px-4 box pr-10" placeholder="www.example.com" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>

                <div className="col-span-12 lg:col-span-4">
                    <div className="intro-y box p-5">
                        <div className="mt-3">
                            <label className="form-label">Tipo Persona</label>
                            <div className="dropdown">
                                <select className="dropdown-toggle btn w-full btn-outline-secondary dark:bg-darkmode-800 dark:border-darkmode-800 flex items-center justify-start">
                                    <option>P. Natural</option>
                                    <option>P. Juridica</option>
                                </select>
                            </div>
                        </div>

                        <div className="mt-3">
                            <label className="form-label">Tipo Documento</label>
                            <div className="dropdown">
                                <select className="dropdown-toggle btn w-full btn-outline-secondary dark:bg-darkmode-800 dark:border-darkmode-800 flex items-center justify-start">
                                    <option>DNI</option>
                                    <option>C.E</option>
                                </select>
                            </div>
                        </div>

                        <div class="mt-3">
                            <label htmlFor="post-form-2" className="form-label">Número de Documento</label>
                            <input type="text" className="datepicker form-control" id="post-form-2"
                                   data-single-mode="true" placeholder=" 00000000" />
                        </div>
                        <div className="mt-3">
                            <label className="form-label">Departamento</label>


                            <div className="dropdown">
                                <select className="dropdown-toggle btn w-full btn-outline-secondary dark:bg-darkmode-800 dark:border-darkmode-800 flex items-center justify-start">
                                    <option>LIMA</option>
                                    <option>JUNIN</option>
                                    <option>TACNA</option>
                                </select>
                            </div>
                        </div>

                        <div className="mt-3">
                            <label className="form-label">Provincia</label>


                            <div className="dropdown">
                                <select className="dropdown-toggle btn w-full btn-outline-secondary dark:bg-darkmode-800 dark:border-darkmode-800 flex items-center justify-start">
                                    <option>LIMA</option>
                                    <option>YAUYOS</option>
                                </select>
                            </div>
                        </div>
                        <div className="mt-3">
                            <label className="form-label">Distrito</label>


                            <div className="dropdown">
                                <select className="dropdown-toggle btn w-full btn-outline-secondary dark:bg-darkmode-800 dark:border-darkmode-800 flex items-center justify-start">
                                    <option>LIMA</option>
                                    <option>YAUYOS</option>
                                </select>
                            </div>
                        </div>

                        <div class="mt-3">
                            <label htmlFor="post-form-2" className="form-label">Direccion</label>
                            <input type="text" className="datepicker form-control" id="post-form-2"
                                   data-single-mode="true" placeholder=" Av. Los Algarrobos" />
                        </div>
                    </div>
                </div>

            </div>
        </div>

    );
}

export default Add