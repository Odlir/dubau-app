import React, {useEffect} from 'react';
import Button from "@/components/Button/Button.jsx";
import 'sweetalert2/src/sweetalert2.scss';
import {Lucide} from "@/components/base-components/index.js";
import Input from "../../components/Input/Input.jsx";

function Add(props) {
    const {
        handleOnClickRegister,
        setFormType,
        name,
        setName,
        user_code,
        setUserCode,
        internal_code,
        setInternalCode,
        percentage,
        setPercentage,

        category_id,
        setCategory_id,
        category_Name,
        setCategory_Name,
        profit_by_family_percentage,
        setProfit_by_family_percentage,
        coin_id,
        setCoin_id,
        categoryContainer,
        setCategoryContainer,
        type,
        setPercentageSol,
        percentageSol,
        percentageDollar,
        setPercentageDollar,
        inputFields,
        setInputFields,

        setType

    } = props;

    const handleOnClickList = () => {
        setName('');
        setFormType('list');
    };


    const handleFormChange = (index, event) => {
        const data = [...inputFields];
        data[index][event.target.name] = event.target.value;
        setInputFields(data);
    };

    useEffect(() => {
        addFields();
    }, []);

    const addFields = () => {
        const categoryObject = categoryContainer.map((category, index) => ({
                    id: category.category_ID,
                    name: category.category_Name,
                    coinSol: '',
                    coinDollar: ''
                }
            )
        );
        setInputFields(categoryObject);
    };


    const submit = (e) => {
        e.preventDefault();
    };


    return (
        <div>
            <h2 className="intro-y text-lg font-medium mt-10">
                Añadir Familia
            </h2>
            <div className="intro-y box p-5 mt-5">
                <div className="flex">
                    <div className=" w-6/12">
                        <div className="border w-full border-slate-200/60 dark:border-darkmode-400 rounded-md p-5">
                            <div
                                className="font-medium text-base flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5">
                                <Lucide icon="ChevronDown" className="w-4 h-4 mr-2"/> Familia
                                Info
                            </div>

                            <div className="mt-5">
                                <div
                                    className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
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
                                                Por favor ingrese el codigo Interno
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full mt-3 xl:mt-0 flex-1">
                                        <Input dataType="text" dataName="email" dataId="email"
                                               className="form-control"
                                               dataPlaceholder="000000" dataValue={internal_code}
                                               dataOnchange={setInternalCode}/>
                                        <div className="form-help text-right">
                                            Maximum character 0/50
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5">
                                <div
                                    className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                                    <div className="form-label xl:w-64 xl:!mr-10">
                                        <div className="text-left">
                                            <div className="flex items-center">
                                                <div className="font-medium">Codigo Usuario</div>
                                                <div
                                                    className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                                    Required
                                                </div>
                                            </div>
                                            <div className="leading-relaxed text-slate-500 text-xs mt-3">
                                                Por favor ingrese el codigo Interno
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full mt-3 xl:mt-0 flex-1">
                                        <Input dataType="text" dataName="email" dataId="email"
                                               className="form-control"
                                               dataPlaceholder="000000" dataValue={user_code}
                                               dataOnchange={setUserCode}/>
                                        <div className="form-help text-right">
                                            Maximum character 0/50
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-5">
                                <div
                                    className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                                    <div className="form-label xl:w-64 xl:!mr-10">
                                        <div className="text-left">
                                            <div className="flex items-center">
                                                <div className="font-medium">Nombre</div>
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
                                               dataPlaceholder="Name" dataValue={name}
                                               dataOnchange={setName}/>
                                        <div className="form-help text-right">
                                            Maximum character 0/50
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5">
                                <div
                                    className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                                    <div className="form-label xl:w-64 xl:!mr-10">
                                        <div className="text-left">
                                            <div className="flex items-center">
                                                <div className="font-medium">Porcentaje</div>
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
                                               dataPlaceholder="0 %" dataValue={percentage}
                                               dataOnchange={setPercentage}/>
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
                            <Lucide icon="ChevronDown" className="w-4 h-4 mr-2"/> Porcentaje
                            de Ganancia por Familia
                        </div>
                        <div className="mt-5"/>
                        <table className="border-collapse border-2 border-gray-500 w-full ">
                            <thead>
                            <tr>
                                <th className="border border-gray-400 p-2 w-10	" rowSpan={2}>#</th>
                                <th className="border border-gray-400 p-2 w-2/5		" rowSpan={2}>Categoria Cliente
                                </th>
                                <th className="border border-gray-400 p-2 " rowSpan={2} colSpan={1}>Porcentajes %
                                    <div className="flex">
                                        <th className="border border-separate  border-gray-400 p-2 col-span-4 w-1/2 ">Soles
                                            S/.
                                        </th>
                                        <th className=""/>
                                        <th className="border border-separate border-gray-400 p-2 col-span-4 w-1/2">Dolares
                                            $
                                        </th>
                                    </div>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {/* <form> */}

                            {inputFields.map((value, index) => (
                                <tr>
                                    <td className="border border-gray-400 p-2 ">{index + 1}</td>
                                    <td className="border border-gray-400 p-2 ">{value.name}</td>
                                    <td className="border border-gray-400 p-2 " rowSpan={1} colSpan={2}>
                                        <div className="flex" key={index}>
                                            <input
                                                name="coinSol"
                                                placeholder="0.00 S/."
                                                value={value.coinSol}
                                                onChange={event => handleFormChange(index, event)}
                                            />
                                            <td><p>&nbsp;</p></td>
                                            <input
                                                name="coinDollar"
                                                placeholder="0.00 $"
                                                value={value.coinDollar}
                                                onChange={event => handleFormChange(index, event)}
                                            />
                                        </div>

                                    </td>

                                </tr>
                            ))}

                            {/*  </form>
*/}
                            </tbody>
                        </table>

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