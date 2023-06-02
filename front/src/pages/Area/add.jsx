import React from 'react';
import Button from "@/components/Button/Button.jsx";
import 'sweetalert2/src/sweetalert2.scss';
import {Lucide} from "@/components/base-components/index.js";
import Input from "../../components/Input/Input.jsx";

function Add(props) {
    const {
        handleOnClickRegister,
        setFormType,
        area_Name,
        setArea_Name,
        area_Description,
        setArea_Description
    } = props;

    const handleOnClickList = () => {
        setArea_Name('');
        setArea_Description('');
        setFormType('list');
    };

    return (
        <div>
            <h2 className="intro-y text-lg font-medium mt-10">
                Añadir Areas
            </h2>
            <div className="intro-y box p-5 mt-5">
                <div className="flex">
                    <div className=" w-6/12">
                        <div className="border w-full border-slate-200/60 dark:border-darkmode-400 rounded-md p-5">
                            <div
                                className="font-medium text-base flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5">
                                <Lucide icon="ChevronDown" className="w-4 h-4 mr-2"/> Area
                                Info
                            </div>
                            <div className="mt-5">
                                <div
                                    className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                                    <div className="form-label xl:w-64 xl:!mr-10">
                                        <div className="text-left">
                                            <div className="flex items-center">
                                                <div className="font-medium">Nombre Area</div>
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
                                        <Input dataType="text" dataName="emaidasl" dataId="emadsil"
                                               className="form-control"
                                               dataPlaceholder="Name Area" dataValue={area_Name}
                                               dataOnchange={setArea_Name}/>
                                        <div className="form-help text-right">
                                            Maximum character 0/50
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
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
                                        <Input dataType="text" dataName="emailldsal" dataId="emdsailll"
                                               className="form-control"
                                               dataPlaceholder="Este Area es exclusivo para ...."
                                               dataValue={area_Description}
                                               dataOnchange={setArea_Description}/>
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
                            <Lucide icon="ChevronDown" className="w-4 h-4 mr-2"/> Area
                            Config
                        </div>
                        <div className="mt-5" />
                    </div>
                </div>

                <div className="flex justify-end flex-col md:flex-row gap-2 mt-5">
                    <Button
                        textName="Cancelar"
                        color="btn-light"
                        onClick={handleOnClickList}
                    />
                    <Button
                        textName="Guardar"
                        onClick={handleOnClickRegister}
                    />
                </div>
            </div>
            <br/>
        </div>
    );
}

export default Add;