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
import Select from 'react-select'


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
                        <div>
                            <label>Basic</label>
                            <div className="mt-2 z-10">
                                <Select options={options} />
                            </div>
                        </div>

                    </div>


                        <div className="post intro-y overflow-hidden box mt-5 z-0">
                            <ul className="post__tabs nav nav-tabs flex-col sm:flex-row bg-slate-200 dark:bg-darkmode-800"
                                role="tablist">
                                <li className="nav-item">
                                    <button title="Fill in the article content" data-tw-toggle="tab"
                                            data-tw-target="#content"
                                            className="nav-link tooltip w-full sm:w-40 py-4 active" id="content-tab"
                                            role="tab" aria-controls="content" aria-selected="true"><i
                                        data-lucide="file-text" className="w-4 h-4 mr-2"></i> General
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button title="Adjust the meta title" data-tw-toggle="tab"
                                            data-tw-target="#meta-title"
                                            className="nav-link tooltip w-full sm:w-40 py-4" id="meta-title-tab"
                                            role="tab" aria-selected="false"><i data-lucide="code"
                                                                                className="w-4 h-4 mr-2"></i> Cliente
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button title="Use search keywords" data-tw-toggle="tab" data-tw-target="#keywords"
                                            className="nav-link tooltip w-full sm:w-40 py-4" id="keywords-tab"
                                            role="tab" aria-selected="false"><i data-lucide="align-left"
                                                                                className="w-4 h-4 mr-2"></i> Proveedor
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button title="Use search keywords" data-tw-toggle="tab" data-tw-target="#keywords"
                                            className="nav-link tooltip w-full sm:w-40 py-4" id="keywords-tab"
                                            role="tab" aria-selected="false"><i data-lucide="align-left"
                                                                                className="w-4 h-4 mr-2"></i> Personal
                                    </button>
                                </li>
                            </ul>
                            <div className="post__content tab-content">
                                <div id="content" className="tab-pane p-5 active" role="tabpanel"
                                     aria-labelledby="content-tab">
                                    <div className="border border-slate-200/60 dark:border-darkmode-400 rounded-md p-5">
                                        <div
                                            className="font-medium flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5">
                                            <i data-lucide="chevron-down" className="w-4 h-4 mr-2"></i> Text Content
                                        </div>
                                        <div className="mt-5">
                                            <div className="editor">
                                                <p>Content of the editor.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>

                <div className="col-span-12 lg:col-span-4">
                    <div className="intro-y box p-5">
                        <div>
                            <label className="form-label">Written By</label>


                            <div className="dropdown">
                                <select className="dropdown-toggle btn w-full btn-outline-secondary dark:bg-darkmode-800 dark:border-darkmode-800 flex items-center justify-start">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                </select>
                            </div>
                        </div>
                        <div className="mt-3">
                            <label htmlFor="post-form-2" className="form-label">Post Date</label>
                            <input type="text" className="datepicker form-control" id="post-form-2"
                                   data-single-mode="true" />
                        </div>
                        <div className="mt-3">
                            <label htmlFor="post-form-3" className="form-label">Categories</label>
                            <select data-placeholder="Select categories" className="tom-select w-full" id="post-form-3"
                                    multiple>
                                <option value="1" selected>Horror</option>
                                <option value="2">Sci-fi</option>
                                <option value="3" selected>Action</option>
                                <option value="4">Drama</option>
                                <option value="5">Comedy</option>
                            </select>
                        </div>
                        <div className="mt-3">
                            <label htmlFor="post-form-4" className="form-label">Tags</label>
                            <select data-placeholder="Select your favorite actors" className="tom-select w-full"
                                    id="post-form-4" multiple>
                                <option value="1" selected>Leonardo DiCaprio</option>
                                <option value="2">Johnny Deep</option>
                                <option value="3" selected>Robert Downey, Jr</option>
                                <option value="4">Samuel L. Jackson</option>
                                <option value="5">Morgan Freeman</option>
                            </select>
                        </div>
                        <div className="form-check form-switch flex flex-col items-start mt-3">
                            <label htmlFor="post-form-5" className="form-check-label ml-0 mb-2">Published</label>
                            <input id="post-form-5" className="form-check-input" type="checkbox" />
                        </div>
                        <div className="form-check form-switch flex flex-col items-start mt-3">
                            <label htmlFor="post-form-6" className="form-check-label ml-0 mb-2">Show Author Name</label>
                            <input id="post-form-6" className="form-check-input" type="checkbox" />
                        </div>
                    </div>
                </div>

            </div>
        </div>

    );
}

export default Add