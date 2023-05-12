import React, {useState} from 'react';
import Button from "@/components/Button/Button.jsx";
import 'sweetalert2/src/sweetalert2.scss';
import {Lucide} from "@/components/base-components/index.js";
import Input from "../../components/Input/Input.jsx";
import Select from "react-select";

function Add(props) {
    const {
        handleOnClickRegister,
        setFormType,
        name,
        setName,
        description,
        setDescription,
        img,
        setImg,
        familyContainer,
        setFamilyContainer,
        product_service_type_Container,
        setProduct_service_type_Container,
        brandContainer,
        setBrandContainer,
        lineContainer,
        setLineContainer,
        makerContainer,
        setMakerContainer,
        unit_of_measurement_Container,
        setUnit_of_measurement_Container,
        type,
        setType,
        comment,
        setComment,
        model,
        setModel,
        minimun_stock,
        setMinimun_stock,
        maximun_stock,
        setMaximun_stock,
        internal_code,
        setInternal_code,
        original_code,
        setOriginal_code,
        user_code,
        setUser_code,
        cost,
        setCost,

        family,
        setFamily,
        productServiceType,
        setProductServiceType,
        brand,
        setBrand,
        line,
        setLine,
        maker,
        setMaker,
        unitMeasure,
        setUnitMeasure,
        statusDinamic,
        setStatusDinamic

    } = props;

    const handleOnClickList = () => {
        setName('');
        setDescription('');
        setFormType('list');
    };
    const optionsFamily = familyContainer.map(obj =>
        ({
            value: obj.family_id,
            label: obj.name
        })
    );

    const optionsMaker = makerContainer.map(obj =>
        ({
            value: obj.maker_ID,
            label: obj.maker_Name
        })
    );

    const optionsLine = lineContainer.map(obj =>
        ({
            value: obj.line_ID,
            label: obj.line_Name
        })
    );

    const optionsUnitMeasure = unit_of_measurement_Container.map(obj =>
        ({
            value: obj.unitmeasure_ID,
            label: obj.unitmeasure_Description
        })
    );

    const optionsProductServiceType = product_service_type_Container.map(obj =>
        ({
            value: obj.product_service_type_id,
            label: obj.name
        })
    );

    const optionsBrand = brandContainer.map(obj =>
        ({
            value: obj.brand_ID,
            label: obj.brand_Name
        })
    );

    const optionsStatusDinamic = [
        {value: 0, label: 'INACTIVO', isSelected: true},
        {value: 1, label: 'ACTIVO', isSelected: true},
    ];

    let defaultSelectedOptionsStatusDinamic = [];

    if (statusDinamic === 0) {
        defaultSelectedOptionsStatusDinamic = [
            optionsStatusDinamic[0],
        ];
    }
    if (statusDinamic === 1) {
        defaultSelectedOptionsStatusDinamic = [
            optionsStatusDinamic[1],
        ];
    }
    const defaultSelectedOptionsFamily = familyContainer.map(obj => family === obj.family_id ? ({
        value: obj.family_id,
        label: obj.name
    }) : '');
    const defaultSelectedOptionsMarker = makerContainer.map(obj => maker === obj.maker_ID ? ({
        value: obj.maker_ID,
        label: obj.maker_Name

    }) : '');
    const defaultSelectedOptionsLine = lineContainer.map(obj => line === obj.line_ID ? ({
        value: obj.line_ID,
        label: obj.line_Name
    }) : '');

    const defaultSelectedOptionsUnitMeasure = unit_of_measurement_Container.map(obj => unitMeasure === obj.unitmeasure_ID ? ({
        value: obj.unitmeasure_ID,
        label: obj.unitmeasure_Description
    }) : '');

    const defaultSelectedOptionsProductServiceType = product_service_type_Container.map(obj => productServiceType === obj.product_service_type_id ? ({
        value: obj.product_service_type_id,
        label: obj.name
    }) : '');

    const defaultSelectedOptionsBrand = brandContainer.map(obj => brand === obj.brand_ID ? ({
        value: obj.brand_ID,
        label: obj.brand_Name
    }) : '');

    const [selectedOptionsFamily, setSelectedOptionsFamily] = useState(defaultSelectedOptionsFamily);
    const [selectedOptionsMaker, setSelectedOptionsMaker] = useState(defaultSelectedOptionsMarker);
    const [selectedOptionsLine, setSelectedOptionsLine] = useState(defaultSelectedOptionsLine);
    const [selectedOptionsUnitMeasure, setSelectedOptionsUnitMeasure] = useState(defaultSelectedOptionsUnitMeasure);
    const [selectedOptionsProductServiceType, setSelectedOptionsProductServiceType] = useState(defaultSelectedOptionsProductServiceType);
    const [selectedOptionsBrand, setSelectedOptionsBrand] = useState(defaultSelectedOptionsBrand);
    const [selectedOptionsStatusDinamic, setSelectedOptionsStatusDinamic] = useState(defaultSelectedOptionsStatusDinamic);

    const handleChangeFamily = (selected) => {
        setSelectedOptionsFamily(selected);
        setFamily(selected.value);
    };
    const handleChangeMaker = (selected) => {
        setSelectedOptionsMaker(selected);
        setMaker(selected.value);
    };
    const handleChangeLine = (selected) => {
        setSelectedOptionsLine(selected);
        setLine(selected.value);
    };
    const handleChangeUnitMeasure = (selected) => {
        setSelectedOptionsUnitMeasure(selected);
        setUnitMeasure(selected.value);
    };
    const handleChangeProductServiceType = (selected) => {
        setSelectedOptionsProductServiceType(selected);
        setProductServiceType(selected.value);
    };
    const handleChangeBrand = (selected) => {
        setSelectedOptionsBrand(selected);
        setBrand(selected.value);
    };
    const handleChangeStatusDinamic = (selected) => {
        setSelectedOptionsStatusDinamic(selected);
        setStatusDinamic(selected.value);
    };

    const customStyles = {
        control: (provided) => ({
            ...provided,
            textAlign: 'center',
        }),
    };

    return (
        <div>
            <h2 className="intro-y text-lg font-medium mt-10">
                Añadir Producto
            </h2>
            <div className="intro-y box p-5 mt-5">
                <div className="flex">
                    <div className=" w-6/12">
                        <div className="border w-full border-slate-200/60 dark:border-darkmode-400 rounded-md p-5">
                            <div
                                className="font-medium text-base flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5">
                                <Lucide icon="ChevronDown" className="w-4 h-4 mr-2"/>Producto
                                Info
                            </div>
                            <div className="mt-5">
                                <div className="mt-3">
                                    <label className="form-label">Familia</label>
                                    <div className="dropdown">
                                        <Select
                                            styles={customStyles}
                                            options={optionsFamily}
                                            value={selectedOptionsFamily}
                                            onChange={handleChangeFamily}
                                            className="w-full"
                                        />
                                    </div>
                                </div>
                                <div
                                    className="form-inproduct items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                                    <div className="form-label xl:w-64 xl:!mr-10">
                                        <div className="text-left">
                                            <div className="flex items-center">
                                                <div className="font-medium">Nombre Producto</div>
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
                                        <Input dataType="text" dataName="email" dataId="email"
                                               className="form-control"
                                               dataPlaceholder="Name Producto" dataValue={name}
                                               dataOnchange={setName}/>
                                        <div className="form-help text-right">
                                            Maximum character 0/50
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="form-inproduct items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                                    <div className="form-label xl:w-64 xl:!mr-10">
                                        <div className="text-left">
                                            <div className="flex items-center">
                                                <div className="font-medium">Stock Minimo</div>
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
                                        <Input dataType="text" dataName="email" dataId="email"
                                               className="form-control"
                                               dataPlaceholder="0" dataValue={minimun_stock}
                                               dataOnchange={setMinimun_stock}/>
                                        <div className="form-help text-right">
                                            Maximum character 0/50
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="form-inproduct items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                                    <div className="form-label xl:w-64 xl:!mr-10">
                                        <div className="text-left">
                                            <div className="flex items-center">
                                                <div className="font-medium">Stock Maximo</div>
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
                                        <Input dataType="text" dataName="email" dataId="email"
                                               className="form-control"
                                               dataPlaceholder="0" dataValue={maximun_stock}
                                               dataOnchange={setMaximun_stock}/>
                                        <div className="form-help text-right">
                                            Maximum character 0/50
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="form-inproduct items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
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
                                        <Input dataType="text" dataName="emailll" dataId="emailll"
                                               className="form-control"
                                               dataPlaceholder="Este Producto es exclusivo para ...."
                                               dataValue={description}
                                               dataOnchange={setDescription}/>
                                        <div className="form-help text-right">
                                            Maximum character 0/50
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-3">
                                    <label className="form-label">Tipo Servicio</label>
                                    <div className="dropdown">
                                        <Select
                                            styles={customStyles}
                                            options={optionsProductServiceType}
                                            value={selectedOptionsProductServiceType}
                                            onChange={handleChangeProductServiceType}
                                            className="w-full"
                                        />
                                    </div>
                                </div>
                                <div
                                    className="form-inproduct items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                                    <div className="form-label xl:w-64 xl:!mr-10">
                                        <div className="text-left">
                                            <div className="flex items-center">
                                                <div className="font-medium">Comentario</div>
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
                                        <Input dataType="text" dataName="email" dataId="email"
                                               className="form-control"
                                               dataPlaceholder="Name Producto" dataValue={comment}
                                               dataOnchange={setComment}/>
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
                            <Lucide icon="ChevronDown" className="w-4 h-4 mr-2"/> Producto
                            Config
                        </div>
                        <div className="mt-5">
                            <div
                                className="form-inproduct items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                                <div className="form-label xl:w-64 xl:!mr-10">
                                    <div className="text-left">
                                        <div className="flex items-center">
                                            <div className="font-medium">Codigo Interno</div>
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
                                    <Input dataType="text" dataName="email" dataId="email"
                                           className="form-control"
                                           dataPlaceholder="0000000" dataValue={internal_code}
                                           dataOnchange={setInternal_code}/>
                                    <div className="form-help text-right">
                                        Maximum character 0/50
                                    </div>
                                </div>
                            </div>
                            <div
                                className="form-inproduct items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                                <div className="form-label xl:w-64 xl:!mr-10">
                                    <div className="text-left">
                                        <div className="flex items-center">
                                            <div className="font-medium">Codigo de Usuario</div>
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
                                    <Input dataType="text" dataName="email" dataId="email"
                                           className="form-control"
                                           dataPlaceholder="0000000" dataValue={user_code}
                                           dataOnchange={setUser_code}/>
                                    <div className="form-help text-right">
                                        Maximum character 0/50
                                    </div>
                                </div>
                            </div>
                            <div
                                className="form-inproduct items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                                <div className="form-label xl:w-64 xl:!mr-10">
                                    <div className="text-left">
                                        <div className="flex items-center">
                                            <div className="font-medium">Codigo Original</div>
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
                                    <Input dataType="text" dataName="email" dataId="email"
                                           className="form-control"
                                           dataPlaceholder="0000000" dataValue={original_code}
                                           dataOnchange={setOriginal_code}/>
                                    <div className="form-help text-right">
                                        Maximum character 0/50
                                    </div>
                                </div>
                            </div>
                            
                            <div hidden
                                 className="form-inproduct items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                                <div className="form-label xl:w-50 xl:!mr-10">
                                    <div className="text-left">
                                        <div className="flex items-center">
                                            <div className="font-medium">Imagen</div>
                                            <div
                                                className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                                Required
                                            </div>
                                        </div>
                                        <div className="leading-relaxed text-slate-500 text-xs mt-3"/>
                                    </div>
                                </div>
                                <div className="xl:w-50">
                                    <span className="sr-only">Choose File</span>
                                    <input type="file" name="img" onChange={(e) => setImg(e.target.files)}
                                           className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
                                </div>
                            </div>

                            <div className="mt-3">
                                <label className="form-label">Estado</label>
                                <div className="dropdown">
                                    <Select
                                        styles={customStyles}
                                        options={optionsStatusDinamic}
                                        value={selectedOptionsStatusDinamic}
                                        onChange={handleChangeStatusDinamic}
                                        className="w-full"
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
            <br/>
        </div>
    );
}

export default Add;