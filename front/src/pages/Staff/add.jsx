import React from 'react';
import Button from '@/components/Button/Button.jsx';
import 'sweetalert2/src/sweetalert2.scss';
import { Lucide } from '@/components/base-components/index.js';
import Input from '../../components/Input/Input.jsx';

function Add({
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
    staff_FinalDate,
    staff_ContractNumber,
    ubigeous_PlaceBirth,
    numberDocument,
    person_Gender,
    statusmarital_ID,
    nationality_ID,
    ubigeous_Home,
    position_ID,
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
    setStaff_FinalDate,
    setStaff_ContractNumber,
    setUbigeous_PlaceBirth,
    setNumberDocument,
    setPerson_Gender,
    setStatusmarital_ID,
    setNationality_ID,
    setUbigeous_Home,
    setPosition_ID,
    setFormType,
}) {
    const handleOnClickList = () => {
        setFormType('list');
    };

    return (
        <div>
            <h2 className="intro-y text-lg font-medium mt-10">
                Añadir Personal
            </h2>

            <div className="flex">
                <div className=" w-full">
                    <div className="intro-y box p-5 mt-5">
                        <div className="border w-full border-slate-200/60 dark:border-darkmode-400 rounded-md p-5">
                            <div className="font-medium text-base flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5">
                                <Lucide
                                    icon="ChevronDown"
                                    className="w-4 h-4 mr-2"
                                />{' '}
                                Personal Info
                            </div>
                            <div className="flex">
                                <div className="mt-5 w-3/6 ">
                                    <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                                        <div className="form-label xl:w-64 xl:!mr-10">
                                            <div className="text-left">
                                                <div className="flex items-center">
                                                    <div className="font-medium">
                                                        Nombre Personal
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
                                                dataName="person_Name"
                                                dataId="person_Name"
                                                className="form-control"
                                                dataPlaceholder="Nombre"
                                                dataValue={person_Name}
                                                dataOnchange={setPerson_Name}
                                            />
                                            <div className="form-help text-right">
                                                Maximum character 0/50
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                                        <div className="form-label xl:w-64 xl:!mr-10">
                                            <div className="text-left">
                                                <div className="flex items-center">
                                                    <div className="font-medium">
                                                        Apellido Paterno
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
                                                dataName="person_LastNamePaternal"
                                                dataId="person_LastNamePaternal"
                                                className="form-control"
                                                dataPlaceholder="Apellido"
                                                dataValue={
                                                    person_LastNamePaternal
                                                }
                                                dataOnchange={
                                                    setPerson_LastNamePaternal
                                                }
                                            />
                                            <div className="form-help text-right">
                                                Maximum character 0/50
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                                        <div className="form-label xl:w-64 xl:!mr-10">
                                            <div className="text-left">
                                                <div className="flex items-center">
                                                    <div className="font-medium">
                                                        Apellido Materno
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
                                                dataName="person_LastNameMaternal"
                                                dataId="person_LastNameMaternal"
                                                className="form-control"
                                                dataPlaceholder="Name Personal"
                                                dataValue={
                                                    person_LastNameMaternal
                                                }
                                                dataOnchange={
                                                    setPerson_LastNameMaternal
                                                }
                                            />
                                            <div className="form-help text-right">
                                                Maximum character 0/50
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                                        <div className="form-label xl:w-64 xl:!mr-10">
                                            <div className="text-left">
                                                <div className="flex items-center">
                                                    <div className="font-medium">
                                                        Fecha de Nacimiento
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
                                                dataName="person_DateBirth"
                                                dataId="person_DateBirth"
                                                className="form-control"
                                                dataPlaceholder="Name Personal"
                                                dataValue={person_DateBirth}
                                                dataOnchange={
                                                    setPerson_DateBirth
                                                }
                                            />
                                            <div className="form-help text-right">
                                                Maximum character 0/50
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                                        <div className="form-label xl:w-64 xl:!mr-10">
                                            <div className="text-left">
                                                <div className="flex items-center">
                                                    <div className="font-medium">
                                                        Lugar de Nacimiento
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
                                                dataName="ubigeous_PlaceBirth"
                                                dataId="ubigeous_PlaceBirth"
                                                className="form-control"
                                                dataPlaceholder="Esta Personal es exclusivo para ...."
                                                dataValue={ubigeous_PlaceBirth}
                                                dataOnchange={
                                                    setUbigeous_PlaceBirth
                                                }
                                            />
                                            <div className="form-help text-right">
                                                Maximum character 0/50
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 w-20 " />
                                <div className="mt-5 w-3/6 ">
                                    <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                                        <div className="form-label xl:w-64 xl:!mr-10">
                                            <div className="text-left">
                                                <div className="flex items-center">
                                                    <div className="font-medium">
                                                        Numero de Documento
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
                                                dataName="numberDocument"
                                                dataId="numberDocument"
                                                className="form-control"
                                                dataPlaceholder="Esta Personal es exclusivo para ...."
                                                dataValue={numberDocument}
                                                dataOnchange={setNumberDocument}
                                            />
                                            <div className="form-help text-right">
                                                Maximum character 0/50
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                                        <div className="form-label xl:w-64 xl:!mr-10">
                                            <div className="text-left">
                                                <div className="flex items-center">
                                                    <div className="font-medium">
                                                        Sexo
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
                                                dataName="person_Gender"
                                                dataId="person_Gender"
                                                className="form-control"
                                                dataPlaceholder="Esta Personal es exclusivo para ...."
                                                dataValue={person_Gender}
                                                dataOnchange={setPerson_Gender}
                                            />
                                            <div className="form-help text-right">
                                                Maximum character 0/50
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                                        <div className="form-label xl:w-64 xl:!mr-10">
                                            <div className="text-left">
                                                <div className="flex items-center">
                                                    <div className="font-medium">
                                                        Estado Civil
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
                                                dataName="statusmarital_ID"
                                                dataId="statusmarital_ID"
                                                className="form-control"
                                                dataPlaceholder="Esta Personal es exclusivo para ...."
                                                dataValue={statusmarital_ID}
                                                dataOnchange={
                                                    setStatusmarital_ID
                                                }
                                            />
                                            <div className="form-help text-right">
                                                Maximum character 0/50
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                                        <div className="form-label xl:w-64 xl:!mr-10">
                                            <div className="text-left">
                                                <div className="flex items-center">
                                                    <div className="font-medium">
                                                        Nacionalidad
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
                                                dataName="nationality_ID"
                                                dataId="nationality_ID"
                                                className="form-control"
                                                dataPlaceholder="Esta Personal es exclusivo para ...."
                                                dataValue={nationality_ID}
                                                dataOnchange={setNationality_ID}
                                            />
                                            <div className="form-help text-right">
                                                Maximum character 0/50
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 w-3/6 " />
                    <div className="intro-y box p-5 mt-5">
                        <div className="border w-full border-slate-200/60 dark:border-darkmode-400 rounded-md p-5">
                            <div className="font-medium text-base flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5">
                                <Lucide
                                    icon="ChevronDown"
                                    className="w-4 h-4 mr-2"
                                />{' '}
                                Personal Contacto
                            </div>
                            <div className="flex">
                                <div className="mt-5 w-3/6 ">
                                    <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                                        <div className="form-label xl:w-64 xl:!mr-10">
                                            <div className="text-left">
                                                <div className="flex items-center">
                                                    <div className="font-medium">
                                                        Departamento
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
                                                dataName="ubigeous_Home"
                                                dataId="ubigeous_Home"
                                                className="form-control"
                                                dataPlaceholder="Name Personal"
                                                dataValue={ubigeous_Home}
                                                dataOnchange={setUbigeous_Home}
                                            />
                                            <div className="form-help text-right">
                                                Maximum character 0/50
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                                        <div className="form-label xl:w-64 xl:!mr-10">
                                            <div className="text-left">
                                                <div className="flex items-center">
                                                    <div className="font-medium">
                                                        Provincia
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
                                                dataName="ubigeous_Home"
                                                dataId="ubigeous_Home"
                                                className="form-control"
                                                dataPlaceholder="Name Personal"
                                                dataValue={ubigeous_Home}
                                                dataOnchange={setUbigeous_Home}
                                            />
                                            <div className="form-help text-right">
                                                Maximum character 0/50
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                                        <div className="form-label xl:w-64 xl:!mr-10">
                                            <div className="text-left">
                                                <div className="flex items-center">
                                                    <div className="font-medium">
                                                        Distrito
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
                                                dataName="ubigeous_Home"
                                                dataId="ubigeous_Home"
                                                className="form-control"
                                                dataPlaceholder="Name Personal"
                                                dataValue={ubigeous_Home}
                                                dataOnchange={setUbigeous_Home}
                                            />
                                            <div className="form-help text-right">
                                                Maximum character 0/50
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                                        <div className="form-label xl:w-64 xl:!mr-10">
                                            <div className="text-left">
                                                <div className="flex items-center">
                                                    <div className="font-medium">
                                                        Direccion Fiscal
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
                                                dataName="person_Direction"
                                                dataId="person_Direction"
                                                className="form-control"
                                                dataPlaceholder="Name Personal"
                                                dataValue={person_Direction}
                                                dataOnchange={
                                                    setPerson_Direction
                                                }
                                            />
                                            <div className="form-help text-right">
                                                Maximum character 0/50
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                                        <div className="form-label xl:w-64 xl:!mr-10">
                                            <div className="text-left">
                                                <div className="flex items-center">
                                                    <div className="font-medium">
                                                        Telefono
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
                                                dataName="person_Phone"
                                                dataId="person_Phone"
                                                className="form-control"
                                                dataPlaceholder="Esta Personal es exclusivo para ...."
                                                dataValue={person_Phone}
                                                dataOnchange={setPerson_Phone}
                                            />
                                            <div className="form-help text-right">
                                                Maximum character 0/50
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 w-20 " />
                                <div className="mt-5 w-3/6 ">
                                    <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                                        <div className="form-label xl:w-64 xl:!mr-10">
                                            <div className="text-left">
                                                <div className="flex items-center">
                                                    <div className="font-medium">
                                                        Correo Electronico
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
                                                dataName="person_Email"
                                                dataId="person_Email"
                                                className="form-control"
                                                dataPlaceholder="Esta Personal es exclusivo para ...."
                                                dataValue={person_Email}
                                                dataOnchange={setPerson_Email}
                                            />
                                            <div className="form-help text-right">
                                                Maximum character 0/50
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                                        <div className="form-label xl:w-64 xl:!mr-10">
                                            <div className="text-left">
                                                <div className="flex items-center">
                                                    <div className="font-medium">
                                                        Movil
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
                                                dataName="person_CellPhone"
                                                dataId="person_CellPhone"
                                                className="form-control"
                                                dataPlaceholder="Esta Personal es exclusivo para ...."
                                                dataValue={person_CellPhone}
                                                dataOnchange={
                                                    setPerson_CellPhone
                                                }
                                            />
                                            <div className="form-help text-right">
                                                Maximum character 0/50
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                                        <div className="form-label xl:w-64 xl:!mr-10">
                                            <div className="text-left">
                                                <div className="flex items-center">
                                                    <div className="font-medium">
                                                        Direccion WEB
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
                                                dataName="person_WebSite"
                                                dataId="person_WebSite"
                                                className="form-control"
                                                dataPlaceholder="Esta Personal es exclusivo para ...."
                                                dataValue={person_WebSite}
                                                dataOnchange={setPerson_WebSite}
                                            />
                                            <div className="form-help text-right">
                                                Maximum character 0/50
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="intro-y box p-5 mt-5">
                        <div className="border w-full border-slate-200/60 dark:border-darkmode-400 rounded-md p-5">
                            <div className="font-medium text-base flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5">
                                <Lucide
                                    icon="ChevronDown"
                                    className="w-4 h-4 mr-2"
                                />{' '}
                                Personal Configuracion
                            </div>
                            <div className="flex">
                                <div className="mt-5 w-3/6 ">
                                    <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                                        <div className="form-label xl:w-64 xl:!mr-10">
                                            <div className="text-left">
                                                <div className="flex items-center">
                                                    <div className="font-medium">
                                                        Fecha Inicio
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
                                                dataName="staff_StartDate"
                                                dataId="staff_StartDate"
                                                className="form-control"
                                                dataPlaceholder="Name Personal"
                                                dataValue={staff_StartDate}
                                                dataOnchange={
                                                    setStaff_StartDate
                                                }
                                            />
                                            <div className="form-help text-right">
                                                Maximum character 0/50
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                                        <div className="form-label xl:w-64 xl:!mr-10">
                                            <div className="text-left">
                                                <div className="flex items-center">
                                                    <div className="font-medium">
                                                        Cargo
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
                                                dataName="position_ID"
                                                dataId="position_ID"
                                                className="form-control"
                                                dataPlaceholder="Name Personal"
                                                dataValue={position_ID}
                                                dataOnchange={setPosition_ID}
                                            />
                                            <div className="form-help text-right">
                                                Maximum character 0/50
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 w-20 " />
                                <div className="mt-5 w-3/6 ">
                                    <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                                        <div className="form-label xl:w-64 xl:!mr-10">
                                            <div className="text-left">
                                                <div className="flex items-center">
                                                    <div className="font-medium">
                                                        Fecha Final
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
                                                dataName="staff_FinalDate"
                                                dataId="staff_FinalDate"
                                                className="form-control"
                                                dataPlaceholder="Esta Personal es exclusivo para ...."
                                                dataValue={staff_FinalDate}
                                                dataOnchange={
                                                    setStaff_FinalDate
                                                }
                                            />
                                            <div className="form-help text-right">
                                                Maximum character 0/50
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                                        <div className="form-label xl:w-64 xl:!mr-10">
                                            <div className="text-left">
                                                <div className="flex items-center">
                                                    <div className="font-medium">
                                                        Nro. Contrato
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
                                                dataName="staff_ContractNumber"
                                                dataId="staff_ContractNumber"
                                                className="form-control"
                                                dataPlaceholder="Esta Personal es exclusivo para ...."
                                                dataValue={staff_ContractNumber}
                                                dataOnchange={
                                                    setStaff_ContractNumber
                                                }
                                            />
                                            <div className="form-help text-right">
                                                Maximum character 0/50
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="intro-y box p-5 mt-5">
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
