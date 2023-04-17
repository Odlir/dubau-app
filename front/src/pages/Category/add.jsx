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
import PasswordChecklist from "react-password-checklist"

const Add =  (props) => {
    const {
        handleOnClickRegister,
        setFormType,
        category_Name,
        setCategory_Name,
        category_Description,
        setCategory_Description
    } = props;

    const handleOnClickList = () => {
        setCategory_Name('');
        setCategory_Description('');
        setFormType('list');
    }

    return (
        <div>
            <h2 className="intro-y text-lg font-medium mt-10">
                Añadir Categoria
            </h2>
            <div className="intro-y box p-5 mt-5">
                <div className={"flex"} >
                    <div className=" w-6/12">
                        <div  className="border w-full border-slate-200/60 dark:border-darkmode-400 rounded-md p-5">
                            <div
                                className="font-medium text-base flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5">
                                <Lucide icon="ChevronDown" className="w-4 h-4 mr-2"/> Categoria
                                Info
                            </div>
                            <div className="mt-5">
                                <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                                    <div className="form-label xl:w-64 xl:!mr-10">
                                        <div className="text-left">
                                            <div className="flex items-center">
                                                <div className="font-medium">Nombre Categoria</div>
                                                <div
                                                    className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                                    Required
                                                </div>
                                            </div>
                                            <div className="leading-relaxed text-slate-500 text-xs mt-3">
                                                Por favor ingrese el nombre completo
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full mt-3 xl:mt-0 flex-1">
                                        <Input dataType={'text'} dataName={'email'} dataId={'email'} className={'form-control'}
                                               dataPlaceholder={'Name Categoria'} dataValue={category_Name}
                                               dataOnchange={setCategory_Name}/>
                                        <div className="form-help text-right">
                                            Maximum character 0/50
                                        </div>
                                    </div>
                                </div>
                                <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                                    <div className="form-label xl:w-64 xl:!mr-10">
                                        <div className="text-left">
                                            <div className="flex items-center">
                                                <div className="font-medium">Descripcion</div>
                                                <div
                                                    className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                                    Required
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full mt-3 xl:mt-0 flex-1">
                                        <Input dataType={'text'} dataName={'emailll'} dataId={'emailll'} className={'form-control'}
                                               dataPlaceholder={'Este Categoria es exclusivo para ....'} dataValue={category_Description}
                                               dataOnchange={setCategory_Description}/>
                                        <div className="form-help text-right">
                                            Maximum character 0/50
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div width="4%"><p>&nbsp;</p></div>
                    <div className="border w-6/12 border-slate-200/60 dark:border-darkmode-400 rounded-md p-5">
                        <div
                            className="font-medium text-base flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5">
                            <Lucide icon="ChevronDown" className="w-4 h-4 mr-2"/> Categoria
                            Config
                        </div>
                        {/*<div className="mt-5">
                            <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                                <div className="form-label xl:w-64 xl:!mr-10">
                                    <div className="text-left">
                                        <div className="flex items-center">
                                            <div className="font-medium">Acceso</div>
                                            <div
                                                className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                                Required
                                            </div>
                                        </div>
                                        <div className="leading-relaxed text-slate-500 text-xs mt-3">
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full mt-3 xl:mt-0 flex-1">
                                    <div className="w-full">
                                        <select className="form-select w-full">
                                            <option value="Gram (g)">Principal</option>
                                            <option value="Kilogram (kg)">Almacen</option>
                                            <option value="Kilogram (kg)">Ventas</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>*/}
                    </div>
                </div>

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
            <br/>
        </div>
    );
}

export default Add