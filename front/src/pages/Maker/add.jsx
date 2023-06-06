import React from 'react';
import Button from '@/components/Button/Button.jsx';
import 'sweetalert2/src/sweetalert2.scss';
import { Lucide } from '@/components/base-components/index.js';
import Input from '../../components/Input/Input.jsx';

function Add({
    handleOnClickRegister,
    setFormType,
    maker_Name,
    setMaker_Name,
    maker_Description,
    setMaker_Description,
    setImg,
}) {
    const handleOnClickList = () => {
        setMaker_Name('');
        setMaker_Description('');
        setFormType('list');
    };

    return (
        <div>
            <h2 className="intro-y text-lg font-medium mt-10">Añadir Makers</h2>
            <div className="intro-y box p-5 mt-5">
                <div className="flex">
                    <div className=" w-6/12">
                        <div className="border w-full border-slate-200/60 dark:border-darkmode-400 rounded-md p-5">
                            <div className="font-medium text-base flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5">
                                <Lucide
                                    icon="ChevronDown"
                                    className="w-4 h-4 mr-2"
                                />
                                Fabricante Info
                            </div>
                            <div className="mt-5">
                                <div className="form-inmaker items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                                    <div className="form-label xl:w-64 xl:!mr-10">
                                        <div className="text-left">
                                            <div className="flex items-center">
                                                <div className="font-medium">
                                                    NombreFabricante
                                                </div>
                                                <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                                    Required
                                                </div>
                                            </div>
                                            <div className="leading-relaxed text-slate-500 text-xs mt-3">
                                                Por favor ingrese el nombre
                                                completo
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full mt-3 xl:mt-0 flex-1">
                                        <Input
                                            dataType="text"
                                            dataName="email"
                                            dataId="email"
                                            className="form-control"
                                            dataPlaceholder="NameFabricante"
                                            dataValue={maker_Name}
                                            dataOnchange={setMaker_Name}
                                        />
                                        <div className="form-help text-right">
                                            Maximum character 0/50
                                        </div>
                                    </div>
                                </div>
                                <div className="form-inmaker items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                                    <div className="form-label xl:w-64 xl:!mr-10">
                                        <div className="text-left">
                                            <div className="flex items-center">
                                                <div className="font-medium">
                                                    Descripcion
                                                </div>
                                                <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                                    Required
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full mt-3 xl:mt-0 flex-1">
                                        <Input
                                            dataType="text"
                                            dataName="emailll"
                                            dataId="emailll"
                                            className="form-control"
                                            dataPlaceholder="Este Fabricante es exclusivo para ...."
                                            dataValue={maker_Description}
                                            dataOnchange={setMaker_Description}
                                        />
                                        <div className="form-help text-right">
                                            Maximum character 0/50
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div width="4%">
                        <p>&nbsp;</p>
                    </div>
                    <div className="border w-6/12 border-slate-200/60 dark:border-darkmode-400 rounded-md p-5">
                        <div className="font-medium text-base flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5">
                            <Lucide
                                icon="ChevronDown"
                                className="w-4 h-4 mr-2"
                            />{' '}
                            Fabricante Config
                        </div>
                        <div className="mt-5">
                            <div className="form-inmaker items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                                <div className="form-label xl:w-50 xl:!mr-10">
                                    <div className="text-left">
                                        <div className="flex items-center">
                                            <div className="font-medium">
                                                Logo
                                            </div>
                                            <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                                Required
                                            </div>
                                        </div>
                                        <div className="leading-relaxed text-slate-500 text-xs mt-3" />
                                    </div>
                                </div>
                                <div className="xl:w-50">
                                    <span className="sr-only">Choose File</span>
                                    <input
                                        type="file"
                                        name="img"
                                        onChange={(e) => setImg(e.target.files)}
                                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                    />
                                </div>
                            </div>
                        </div>
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
            <br />
        </div>
    );
}

export default Add;
