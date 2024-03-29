import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import 'sweetalert2/src/sweetalert2.scss';
import Button from '@/components/Button/Button.jsx';
import Input from '../../components/Input/Input.jsx';

function Add({
    handleOnClickRegister,
    person_Name,
    person_LastNamePaternal,
    person_LastNameMaternal,
    person_Direction,
    person_Phone,
    person_CellPhone,
    person_Email,
    person_WebSite,
    type_person_id,
    setType_person_id,
    person_Gender,
    statusmarital_ID,
    formType,
    customer_id,
    supplier_id,
    staff_id,
    nationalityContainer,
    typeDocumentContainer,
    setPerson_Name,
    setPerson_LastNamePaternal,
    setPerson_LastNameMaternal,
    setPerson_Direction,
    setPerson_Phone,
    setPerson_CellPhone,
    setPerson_Email,
    setPerson_WebSite,
    setPerson_Gender,
    setStatusmarital_ID,
    setFormType,
    setSelectedOptionsNaturality,
    selectedOptionsNaturalitys,
    setSelectedOptionsNaturalitys,
    person_DNI,
    setPerson_DNI,
    typeQualificationContainer,
    categoryContainer,
    waytopayContainer,
    paymentConditionContainer,
    creditLine,
    setCreditLine,
    typeQualification,
    category,
    waytopay,
    paymentCondition,
}) {
    const handleOnClickList = () => {
        setFormType('list');
    };

    const [selectMultiple, setSelectMultiple] = useState(['1', '3']);
    const [select, setSelect] = useState('1');
    const [showDiv, setShowDiv] = useState(true);
    const [showDivCliente, setShowDivCliente] = useState(false);
    const [showDivProveedor, setShowDivProveedor] = useState(false);
    const [showDivPersonal, setShowDivPersonal] = useState(false);

    const [showNavCliente, setShowNavCliente] = useState(false);
    const [showNavProveedor, setShowNavProveedor] = useState(false);
    const [showNavPersonal, setShowNavPersonal] = useState(false);

    const [optionPerson, setOptionPerson] = useState([]);

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

    const optionsNaturality = nationalityContainer.map((obj) => ({
        value: obj.nationality_ID,
        label: obj.nationality_Name,
    }));

    const optionsTypeDocument = typeDocumentContainer.map((obj) => ({
        value: obj.typedocument_ID,
        label: obj.typedocument_Initial,
    }));

    const optionsTypeQualificationContainer = typeQualificationContainer.map(
        (obj) => ({
            value: obj.typequalification_ID,
            label: obj.typequalification_Name,
        })
    );

    const optionsCategoryContainer = categoryContainer.map((obj) => ({
        value: obj.category_ID,
        label: obj.category_Name,
    }));

    const optionsPaymentConditionContainer = paymentConditionContainer.map(
        (obj) => ({
            value: obj.payment_condition_ID,
            label: obj.payment_condition_Name,
        })
    );

    const optionsWaytoPay = waytopayContainer.map((obj) => ({
        value: obj.waytopay_ID,
        label: obj.waytopay_Name,
    }));

    const optionsGender = [
        { value: 0, label: 'MASCULINO', isSelected: true },
        { value: 1, label: 'FEMENINO', isSelected: true },
    ];

    const optionsStatusmarital = [
        { value: 0, label: 'CASADO' },
        { value: 1, label: 'CONVIVIENTE' },
        { value: 2, label: 'DIVORCIADO' },
        { value: 3, label: 'NO REGISTRADO' },
        { value: 4, label: 'SOLTERO' },
        { value: 5, label: 'VIUDO' },
    ];

    const optionsTypePerson = [
        { value: 0, label: 'P. NATURAL' },
        { value: 1, label: 'P. JURIDICA' },
    ];

    const options = [
        { value: 'Cliente', label: 'Cliente', isSelected: true },
        { value: 'Proveedor', label: 'Proveedor', isSelected: true },
        { value: 'Personal', label: 'Personal' },
    ];

    const options2 = [
        { value: 'A 15 DIAS', label: 'A 15 DIAS' },
        { value: 'A 30 DIAS', label: 'A 30 DIAS' },
        { value: 'A 50 DIAS', label: 'A 50 DIAS' },
        { value: 'A 90 DIAS', label: 'A 90 DIAS' },
        { value: 'A 120 DIAS', label: 'A 120 DIAS' },
        { value: 'A 150 DIAS', label: 'A 150 DIAS' },
    ];

    /*   console.log(customer_id, supplier_id, staff_id)
     */
    let defaultSelectedOptions = [];
    let defaultSelectedOptionsGender = [];
    let defaultSelectedOptionsStatusmarital = [];
    let defaultSelectedOptionsTypePerson = [];

    if (formType === 'edit') {
        if (customer_id > 0 && supplier_id > 0 && staff_id > 0) {
            defaultSelectedOptions = [options[0], options[1], options[2]];
        }

        if (customer_id > 0 && supplier_id > 0 && staff_id === 0) {
            defaultSelectedOptions = [options[0], options[1]];
        }

        if (customer_id > 0 && supplier_id === 0 && staff_id > 0) {
            defaultSelectedOptions = [options[0], options[2]];
        }

        if (customer_id === 0 && supplier_id === 0 && staff_id === 0) {
            defaultSelectedOptions = [];
        }

        if (customer_id > 0 && supplier_id === 0 && staff_id === 0) {
            defaultSelectedOptions = [options[0]];
        }

        if (customer_id === 0 && supplier_id > 0 && staff_id === 0) {
            defaultSelectedOptions = [options[1]];
        }

        if (customer_id === 0 && supplier_id === 0 && staff_id > 0) {
            defaultSelectedOptions = [options[2]];
        }

        if (person_Gender === '0') {
            defaultSelectedOptionsGender = [optionsGender[0]];
        }
        if (person_Gender === '1') {
            defaultSelectedOptionsGender = [optionsGender[1]];
        }

        if (type_person_id === '0') {
            defaultSelectedOptionsTypePerson = [optionsTypePerson[0]];
        }
        if (type_person_id === '1') {
            defaultSelectedOptionsTypePerson = [optionsTypePerson[1]];
        }

        if (statusmarital_ID === 0) {
            defaultSelectedOptionsStatusmarital = [optionsStatusmarital[0]];
        }
        if (statusmarital_ID === 1) {
            defaultSelectedOptionsStatusmarital = [optionsStatusmarital[1]];
        }
        if (statusmarital_ID === 2) {
            defaultSelectedOptionsStatusmarital = [optionsStatusmarital[2]];
        }
        if (statusmarital_ID === 3) {
            defaultSelectedOptionsStatusmarital = [optionsStatusmarital[3]];
        }
        if (statusmarital_ID === 4) {
            defaultSelectedOptionsStatusmarital = [optionsStatusmarital[4]];
        }
        if (statusmarital_ID === 5) {
            defaultSelectedOptionsStatusmarital = [optionsStatusmarital[5]];
        }
    }

    // const defaultSelectedOptionsNationality = [];

    const defaultSelectedOptionsNationality = nationalityContainer.map((obj) =>
        selectedOptionsNaturalitys === obj.nationality_ID
            ? {
                  value: obj.nationality_ID,
                  label: obj.nationality_Name,
              }
            : ''
    );

    const defaultSelectedOptionsTypeQualification =
        typeQualificationContainer.map((obj) =>
            typeQualification === obj.typequalification_ID
                ? {
                      value: obj.typequalification_ID,
                      label: obj.typequalification_Name,
                  }
                : ''
        );

    const defaultSelectedOptionsCategory = categoryContainer.map((obj) =>
        category === obj.category_ID
            ? {
                  value: obj.category_ID,
                  label: obj.category_Name,
              }
            : ''
    );

    const defaultSelectedOptionsWaytoPay = waytopayContainer.map((obj) =>
        waytopay === obj.waytopay_ID
            ? {
                  value: obj.waytopay_ID,
                  label: obj.waytopay_Name,
              }
            : ''
    );

    const defaultSelectedPaymentCondition = paymentConditionContainer.map(
        (obj) =>
            paymentCondition === obj.payment_condition_ID
                ? {
                      value: obj.payment_condition_ID,
                      label: obj.payment_condition_Name,
                  }
                : ''
    );

    const [selectedOptions, setSelectedOptions] = useState(
        defaultSelectedOptions
    );
    const [selectedOptionsGender, setSelectedOptionsGender] = useState(
        defaultSelectedOptionsGender
    );
    const [selectedOptionsTypePerson, setSelectedOptionsTypePerson] = useState(
        defaultSelectedOptionsTypePerson
    );
    const [selectedOptions2, setSelectedOptions2] = useState([]);
    const [selectedOptionsNaturalityy, setSelectedOptionsNaturalityy] =
        useState(defaultSelectedOptionsNationality);
    const [selectedOptionsTypeDocument, setSelectedOptionsTypeDocument] =
        useState();
    const [selectedOptionsStatusmarital, setSelectedOptionsStatusmarital] =
        useState(defaultSelectedOptionsStatusmarital);
    const [
        selectedOptionsWaytopayContainer,
        setSelectedOptionsWaytopayContainer,
    ] = useState(defaultSelectedOptionsWaytoPay);
    const [
        selectedOptionsCategoryContainer,
        setSelectedOptionsCategoryContainer,
    ] = useState(defaultSelectedOptionsCategory);
    const [
        selectedOptionsPaymentConditionContainer,
        setSelectedOptionsPaymentConditionContainer,
    ] = useState(defaultSelectedPaymentCondition);
    const [
        selectedOptionsTypeQualificationContainer,
        setSelectedOptionsTypeQualificationContainer,
    ] = useState(defaultSelectedOptionsTypeQualification);

    const handleChange = (selected) => {
        setSelectedOptions(selected);
    };

    const handleChange3 = (selected) => {
        setSelectedOptionsNaturalityy(selected);
        setSelectedOptionsNaturality(selected.value);
        setSelectedOptionsNaturalitys(selected.value);
    };
    const handleChangeGender = (selected) => {
        setSelectedOptionsGender(selected);
        setPerson_Gender(selected.value);
    };

    const handleChangeStatusmarital = (selected) => {
        setSelectedOptionsStatusmarital(selected);
        setStatusmarital_ID(selected.value);
    };

    const handleChangeTypePerson = (selected) => {
        setSelectedOptionsTypePerson(selected);
        setType_person_id(selected.value);
    };

    const handleChangeTypeDocument = (selected) => {
        setSelectedOptionsTypeDocument(selected);
    };

    const handleChangeWaytopay = (selected) => {
        setSelectedOptionsWaytopayContainer(selected);
    };
    const handleChangeCategory = (selected) => {
        setSelectedOptionsCategoryContainer(selected);
    };
    const handleChangeTypeQualification = (selected) => {
        setSelectedOptionsTypeQualificationContainer(selected);
    };
    const handleChangePaymentCondition = (selected) => {
        setSelectedOptionsPaymentConditionContainer(selected);
    };

    useEffect(() => {
        const clienteLabel = selectedOptions.some(
            (client) => client.label === 'Cliente'
        );
        if (clienteLabel) {
            setShowNavCliente(true);
        } else {
            setShowNavCliente(false);
        }

        const proveedorLabel = selectedOptions.some(
            (proveeder) => proveeder.label === 'Proveedor'
        );
        if (proveedorLabel) {
            setShowNavProveedor(true);
        } else {
            setShowNavProveedor(false);
        }

        const personalLabel = selectedOptions.some(
            (personnel) => personnel.label === 'Personal'
        );
        if (personalLabel) {
            setShowNavPersonal(true);
        } else {
            setShowNavPersonal(false);
        }
    }, []);
    const customStyles = {
        control: (provided) => ({
            ...provided,
            textAlign: 'center',
        }),
    };

    return (
        <div className="">
            <div className="intro-y flex flex-col sm:flex-row items-center mt-8">
                <h2 className="text-lg font-medium mr-auto">Nueva Persona</h2>
                <div className="w-full sm:w-auto flex mt-4 sm:mt-0">
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
            </div>
            <div className="pos intro-y grid grid-cols-12 gap-5 mt-5">
                <div className="intro-y col-span-12 lg:col-span-8">
                    <div className="flex z-10">
                        <p className="flex w-10">Tipo: </p>
                        <p />
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
                        <ul
                            className="post__tabs nav nav-tabs flex-col sm:flex-row bg-slate-200 dark:bg-darkmode-800"
                            role="tablist"
                        >
                            <li className="nav-item">
                                <button
                                    title=""
                                    className="nav-link tooltip w-full sm:w-40 py-4 active"
                                    id="content-tab"
                                    role="tab"
                                    aria-controls="content"
                                    onClick={general}
                                >
                                    <i
                                        data-lucide="file-text"
                                        className="w-4 h-4 mr-2"
                                    />{' '}
                                    General
                                </button>
                            </li>
                            {showNavCliente && (
                                <li className="nav-item">
                                    <button
                                        title=""
                                        className="nav-link tooltip w-full sm:w-40 py-4"
                                        id="meta-title-tab"
                                        role="tab"
                                        aria-hidden="true"
                                        onClick={cliente}
                                    >
                                        <i
                                            data-lucide="code"
                                            className="w-4 h-4 mr-2"
                                        />{' '}
                                        Cliente
                                    </button>
                                </li>
                            )}
                            {showNavProveedor && (
                                <div>
                                    <li className="nav-item">
                                        <button
                                            title="Use search keywords"
                                            data-toggle="tab"
                                            data-target="#keywords"
                                            className="nav-link tooltip w-full sm:w-40 py-4"
                                            id="keywords-tab"
                                            role="tab"
                                            onClick={proveedor}
                                        >
                                            <i
                                                data-lucide="align-left"
                                                className="w-4 h-4 mr-2"
                                            />{' '}
                                            Proveedor
                                        </button>
                                    </li>
                                </div>
                            )}
                            {showNavPersonal && (
                                <div>
                                    <li className="nav-item">
                                        <button
                                            title="Use search keywords"
                                            data-toggle="tab"
                                            data-target="#keywords"
                                            className="nav-link tooltip w-full sm:w-40 py-4"
                                            id="keywords-tab"
                                            role="tab"
                                            onClick={personal}
                                        >
                                            <i
                                                data-lucide="align-left"
                                                className="w-4 h-4 mr-2"
                                            />{' '}
                                            Personal
                                        </button>
                                    </li>
                                </div>
                            )}
                        </ul>
                        {showDivProveedor && (
                            <div
                                className="post__content tab-content"
                                id="targetGeneral"
                            >
                                <div
                                    id="content"
                                    className="tab-pane p-5 active"
                                    role="tabpanel"
                                    aria-labelledby="content-tab"
                                >
                                    <div className="border border-slate-200/60 dark:border-darkmode-400 rounded-md p-5 w-full ">
                                        <div className="font-medium flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5">
                                            <i
                                                data-lucide="chevron-down"
                                                className="w-4 h-4 mr-2"
                                            />{' '}
                                            Data
                                        </div>
                                        <div className="flex">
                                            <div className="mt-5 w-2/4">
                                                <div className="mt-3">
                                                    <label className="form-label">
                                                        Sector Comercial
                                                    </label>
                                                    <div className="dropdown">
                                                        <select className="dropdown-toggle btn w-full btn-outline-secondary dark:bg-darkmode-800 dark:border-darkmode-800 flex items-center justify-start">
                                                            <option>
                                                                MADERA
                                                            </option>
                                                            <option>
                                                                METAL MECANICA
                                                            </option>
                                                            <option>
                                                                TRANSPORTE
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {showDivPersonal && (
                            <div
                                className="post__content tab-content"
                                id="targetGeneral"
                            >
                                <div
                                    id="content"
                                    className="tab-pane p-5 active"
                                    role="tabpanel"
                                    aria-labelledby="content-tab"
                                >
                                    <div className="border border-slate-200/60 dark:border-darkmode-400 rounded-md p-5 w-full ">
                                        <div className="font-medium flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5">
                                            <i
                                                data-lucide="chevron-down"
                                                className="w-4 h-4 mr-2"
                                            />{' '}
                                            Data
                                        </div>
                                        <div className="flex">
                                            <div className="mt-5 w-2/4">
                                                <div className="mt-3">
                                                    <label className="form-label">
                                                        Fecha Inicio
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="datepicker form-control"
                                                        id="post-form-2"
                                                        data-single-mode="true"
                                                        placeholder=" 01-01-23 "
                                                    />
                                                </div>
                                                <div className="mt-3">
                                                    <label className="form-label">
                                                        Cargo
                                                    </label>
                                                    <div className="dropdown">
                                                        <select className="dropdown-toggle btn w-full btn-outline-secondary dark:bg-darkmode-800 dark:border-darkmode-800 flex items-center justify-start">
                                                            <option>
                                                                ADMINISTRADOR
                                                            </option>
                                                            <option>
                                                                ASISTENTE
                                                                ADMINISTRATIVO
                                                            </option>
                                                            <option>
                                                                ASISTENTE
                                                                PERSONAL
                                                            </option>
                                                            <option>
                                                                AYUDANTE
                                                            </option>
                                                            <option>
                                                                CONTADOR
                                                            </option>
                                                            <option>
                                                                GERENTE
                                                                COMERCIAL
                                                            </option>
                                                            <option>
                                                                GERENTE GENERAL
                                                            </option>
                                                            <option>
                                                                JEFE DE VENTA
                                                            </option>
                                                            <option>
                                                                LOGISTICA
                                                            </option>
                                                            <option>
                                                                MAESTRO
                                                            </option>
                                                            <option>
                                                                PRACTICANTES
                                                            </option>
                                                            <option>
                                                                SUB GERENTE
                                                            </option>
                                                            <option>
                                                                VENDEDOR
                                                            </option>
                                                            <option>
                                                                VENDEDOR NORTE
                                                            </option>
                                                            <option>
                                                                VENDEDOR
                                                                SUPERVISOR
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="mt-3">
                                                    <label className="form-label">
                                                        Lista
                                                    </label>
                                                    <div className="dropdown">
                                                        <select className="dropdown-toggle btn w-full btn-outline-secondary dark:bg-darkmode-800 dark:border-darkmode-800 flex items-center justify-start">
                                                            <option>
                                                                DUBAU 01
                                                            </option>
                                                            <option>
                                                                DUBAU 02
                                                            </option>
                                                            <option>
                                                                DUBAU 03
                                                            </option>
                                                            <option>
                                                                DUBAU 04
                                                            </option>
                                                            <option>
                                                                DUBAU 05
                                                            </option>
                                                            <option>
                                                                DUBAU 06
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-5 w-1/5" />
                                            <div className="mt-5 w-2/4">
                                                <div className="mt-3">
                                                    <label className="form-label">
                                                        Fecha Fin
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="datepicker form-control"
                                                        id="post-form-2"
                                                        data-single-mode="true"
                                                        placeholder=" 01-01-23 "
                                                    />
                                                </div>
                                                <div className="mt-3">
                                                    <label className="form-label">
                                                        Nro. Contrato
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="datepicker form-control"
                                                        id="post-form-2"
                                                        data-single-mode="true"
                                                        placeholder=" 00000 "
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {showDivCliente && (
                            <div
                                className="post__content tab-content"
                                id="targetGeneral"
                            >
                                <div
                                    id="content"
                                    className="tab-pane p-5 active"
                                    role="tabpanel"
                                    aria-labelledby="content-tab"
                                >
                                    <div className="border border-slate-200/60 dark:border-darkmode-400 rounded-md p-5 w-full ">
                                        <div className="font-medium flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5">
                                            <i
                                                data-lucide="chevron-down"
                                                className="w-4 h-4 mr-2"
                                            />{' '}
                                            Data
                                        </div>
                                        <div className="flex">
                                            <div className="mt-5 w-2/4">
                                                <div className="mt-3">
                                                    <label className="form-label">
                                                        Calificacion
                                                    </label>
                                                    <div className="dropdown">
                                                        <Select
                                                            styles={
                                                                customStyles
                                                            }
                                                            options={
                                                                optionsTypeQualificationContainer
                                                            }
                                                            value={
                                                                selectedOptionsTypeQualificationContainer
                                                            }
                                                            onChange={
                                                                handleChangeTypeQualification
                                                            }
                                                            className="w-full"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="mt-3">
                                                    <label className="form-label">
                                                        Linea de Credito
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="datepicker form-control"
                                                        id="post-form-2"
                                                        value={creditLine}
                                                        data-single-mode="true"
                                                        placeholder=" 0.00 "
                                                        onChange={(e) =>
                                                            setCreditLine(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="mt-3">
                                                    <label className="form-label">
                                                        Categoria
                                                    </label>
                                                    <div className="dropdown">
                                                        <Select
                                                            styles={
                                                                customStyles
                                                            }
                                                            options={
                                                                optionsCategoryContainer
                                                            }
                                                            value={
                                                                selectedOptionsCategoryContainer
                                                            }
                                                            onChange={
                                                                handleChangeCategory
                                                            }
                                                            className="w-full"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="mt-3">
                                                    <label className="form-label">
                                                        Forma de Pago
                                                    </label>
                                                    <div className="dropdown">
                                                        <Select
                                                            styles={
                                                                customStyles
                                                            }
                                                            options={
                                                                optionsWaytoPay
                                                            }
                                                            value={
                                                                selectedOptionsWaytopayContainer
                                                            }
                                                            onChange={
                                                                handleChangeWaytopay
                                                            }
                                                            className="w-full"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="mt-3" />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                            </div>

                                            <div className="mt-5 w-1/5" />
                                            <div className="mt-5 w-2/4">
                                                <div className="mt-3">
                                                    <label className="form-label">
                                                        Condiciones
                                                    </label>
                                                    <div className="dropdown z-40">
                                                        <Select
                                                            options={
                                                                optionsPaymentConditionContainer
                                                            }
                                                            closeMenuOnSelect={
                                                                false
                                                            }
                                                            value={
                                                                selectedOptionsPaymentConditionContainer
                                                            }
                                                            onChange={
                                                                handleChangePaymentCondition
                                                            }
                                                            isMulti
                                                            className="w-full"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {showDiv && (
                            <div
                                className="post__content tab-content"
                                id="targetGeneral"
                            >
                                <div
                                    id="content"
                                    className="tab-pane p-5 active"
                                    role="tabpanel"
                                    aria-labelledby="content-tab"
                                >
                                    <div className="border border-slate-200/60 dark:border-darkmode-400 rounded-md p-5 w-full ">
                                        <div className="font-medium flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5">
                                            <i
                                                data-lucide="chevron-down"
                                                className="w-4 h-4 mr-2"
                                            />{' '}
                                            Data
                                        </div>
                                        <div className="flex">
                                            <div className="mt-5 w-2/4">
                                                <div className="mt-3">
                                                    <label className="form-label">
                                                        Nombres
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="datepicker form-control"
                                                        id="post-form-2"
                                                        value={person_Name}
                                                        data-single-mode="true"
                                                        placeholder=" name "
                                                        onChange={(e) =>
                                                            setPerson_Name(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="mt-3">
                                                    <label className="form-label">
                                                        Apellido Paterno
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="datepicker form-control"
                                                        id="post-form-2"
                                                        value={
                                                            person_LastNamePaternal
                                                        }
                                                        data-single-mode="true"
                                                        placeholder=" last name"
                                                        onChange={(e) =>
                                                            setPerson_LastNamePaternal(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="mt-3">
                                                    <label className="form-label">
                                                        Apellido Materno
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="datepicker form-control"
                                                        id="post-form-2"
                                                        value={
                                                            person_LastNameMaternal
                                                        }
                                                        data-single-mode="true"
                                                        placeholder=" mother's last name"
                                                        onChange={(e) =>
                                                            setPerson_LastNameMaternal(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="mt-5 w-1/5" />
                                            <div className="mt-5 w-2/4">
                                                <div className="mt-3">
                                                    <label className="form-label">
                                                        Pais de Origen
                                                    </label>
                                                    <div className="dropdown ">
                                                        <Select
                                                            styles={
                                                                customStyles
                                                            }
                                                            options={
                                                                optionsNaturality
                                                            }
                                                            value={
                                                                selectedOptionsNaturalityy
                                                            }
                                                            onChange={
                                                                handleChange3
                                                            }
                                                            className="w-full"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="mt-3">
                                                    <label className="form-label">
                                                        Sexo
                                                    </label>
                                                    <div className="dropdown">
                                                        <Select
                                                            styles={
                                                                customStyles
                                                            }
                                                            options={
                                                                optionsGender
                                                            }
                                                            value={
                                                                selectedOptionsGender
                                                            }
                                                            onChange={
                                                                handleChangeGender
                                                            }
                                                            className="w-full"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="mt-3">
                                                    <label className="form-label">
                                                        Estado Civil
                                                    </label>
                                                    <div className="dropdown">
                                                        <Select
                                                            styles={
                                                                customStyles
                                                            }
                                                            options={
                                                                optionsStatusmarital
                                                            }
                                                            value={
                                                                selectedOptionsStatusmarital
                                                            }
                                                            onChange={
                                                                handleChangeStatusmarital
                                                            }
                                                            className="w-full"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    id="content"
                                    className="tab-pane p-5 active"
                                    role="tabpanel"
                                    aria-labelledby="content-tab"
                                >
                                    <div className="border border-slate-200/60 dark:border-darkmode-400 rounded-md p-5">
                                        <div className="font-medium flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5">
                                            <i
                                                data-lucide="chevron-down"
                                                className="w-4 h-4 mr-2"
                                            />{' '}
                                            Contacto
                                        </div>
                                        <div className="mt-5">
                                            <div className="mt-3">
                                                <label className="form-label">
                                                    Telefono
                                                </label>
                                                <Input
                                                    dataType="text"
                                                    dataName="phone"
                                                    dataId="phone"
                                                    className="form-control"
                                                    dataPlaceholder="01 - 0000 - 0"
                                                    dataValue={person_Phone}
                                                    dataOnchange={
                                                        setPerson_Phone
                                                    }
                                                />
                                            </div>
                                            <div className="mt-3">
                                                <label className="form-label">
                                                    Celular
                                                </label>
                                                <Input
                                                    dataType="text"
                                                    dataName="cellphone"
                                                    dataId="cellphone"
                                                    className="form-control"
                                                    dataPlaceholder="999999999"
                                                    dataValue={person_CellPhone}
                                                    dataOnchange={
                                                        setPerson_CellPhone
                                                    }
                                                />
                                            </div>
                                            <div className="mt-3">
                                                <label className="form-label">
                                                    Correo
                                                </label>
                                                <Input
                                                    dataType="text"
                                                    dataName="cellphone"
                                                    dataId="cellphone"
                                                    className="form-control"
                                                    dataPlaceholder="example@example.com"
                                                    dataValue={person_Email}
                                                    dataOnchange={
                                                        setPerson_Email
                                                    }
                                                />
                                            </div>
                                            <div className="mt-3">
                                                <label className="form-label">
                                                    Sitio Web
                                                </label>
                                                <Input
                                                    dataType="text"
                                                    dataName="cellphone"
                                                    dataId="cellphone"
                                                    className="form-control"
                                                    dataPlaceholder="www.example.com"
                                                    dataValue={person_WebSite}
                                                    dataOnchange={
                                                        setPerson_WebSite
                                                    }
                                                />
                                            </div>
                                            <div className="mt-3">
                                                <label className="form-label">
                                                    Numero de Cuenta S/.
                                                </label>
                                                <Input
                                                    dataType="text"
                                                    dataName="cellphone"
                                                    dataId="cellphone"
                                                    className="form-control"
                                                    dataPlaceholder="00 - 000 - 0"
                                                    /*            dataValue={person_Phone}
                                                                dataOnchange={setPerson_Phone} */
                                                />
                                            </div>
                                            <div className="mt-3">
                                                <label className="form-label">
                                                    Numero de Cuenta $.
                                                </label>
                                                <Input
                                                    dataType="text"
                                                    dataName="cellphone"
                                                    dataId="cellphone"
                                                    className="form-control"
                                                    dataPlaceholder="00 - 0000 - 0"
                                                    /*    dataValue={person_Phone}
                                                        dataOnchange={setPerson_} */
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="col-span-12 lg:col-span-4">
                    <div className="intro-y box p-5">
                        <div className="mt-3">
                            <label className="form-label">Tipo Persona</label>
                            <div className="dropdown">
                                <Select
                                    styles={customStyles}
                                    options={optionsTypePerson}
                                    value={selectedOptionsTypePerson}
                                    onChange={handleChangeTypePerson}
                                    className="w-full"
                                />
                            </div>
                        </div>

                        <div className="mt-3">
                            <label className="form-label">Tipo Documento</label>
                            <div className="dropdown">
                                <Select
                                    styles={customStyles}
                                    options={optionsTypeDocument}
                                    value={selectedOptionsTypeDocument}
                                    onChange={handleChangeTypeDocument}
                                    className="w-full"
                                />
                            </div>
                        </div>

                        <div className="mt-3">
                            <label htmlFor="post-form-2" className="form-label">
                                Número de Documento
                            </label>
                            <Input
                                dataType="text"
                                dataName="cellphone"
                                dataId="cellphone"
                                className="form-control"
                                dataPlaceholder="000000000"
                                dataValue={person_DNI}
                                dataOnchange={setPerson_DNI}
                            />
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

                        <div className="mt-3">
                            <label htmlFor="post-form-2" className="form-label">
                                Direccion
                            </label>
                            <Input
                                dataType="text"
                                dataName="direction"
                                dataId="direction"
                                className="form-control"
                                dataPlaceholder="Av. Los Algarrobos"
                                dataValue={person_Direction}
                                dataOnchange={setPerson_Direction}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Add;
