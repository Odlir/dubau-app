import React, {useState} from 'react'
import Input from "../../Input/Input.jsx";
import Button from "../../Button/Button.jsx";

const Index = (props) => {
    const {
        nameSection,
        dataType,
        dataSearch1,
        setdataSearch1,
        dataType2,
        dataSearch2,
        setdataSearch2,
        captureType,
        handleOnClickSearch,
        handleOnClickClean,
        actionAdd,
    } = props

    return(
        <>
            <h2 className="intro-y text-lg font-medium mt-10">
                Listado de {nameSection}
            </h2>
            <div className="grid grid-cols-12 gap-6 mt-5">
                <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2 ">
                    <div className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
                        <div className="w-56 relative text-slate-500">
                            <Input dataType={dataType} dataName={'email'} dataId={'email'} className={'form-control w-56 box pr-10'}
                                   dataPlaceholder={'name@company.com'} dataValue={dataSearch1}
                                   dataOnchange={setdataSearch1}/>
                            <i className="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0 btn-primary"
                               data-lucide="search"></i>
                        </div>
                    </div>
                    <div className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0 p-1">
                        <div className="w-56 relative text-slate-500 p-1">
                            <Input dataType={dataType2} dataName={'email'} dataId={'email'} className={'form-control w-56 box pr-10'}
                                   dataPlaceholder={'2022-11-08'} dataValue={dataSearch2}
                                   dataOnchange={setdataSearch2}/>
                            <i className="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0 btn-primary"
                               data-lucide="search"></i>
                        </div>
                    </div>
                    <div className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0 p-1">
                        <div className="w-56 relative text-slate-500 p-1">
                            <div className="w-full mt-3 xl:mt-0 flex-1">
                                <div className="w-full">
                                    <select className="form-select w-full" onChange={captureType}>
                                        <option value="1">Aprobado</option>
                                        <option value="0">En Espera</option>
                                    </select>
                                </div>
                            </div>
                            <i className="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0 btn-primary"
                               data-lucide="search"></i>
                        </div>
                    </div>
                    <div className="hidden md:block mx-auto text-slate-500"></div>
                    <button className="btn btn-facebook shadow-md mr-2" onClick={handleOnClickSearch}>Buscar
                    </button>
                    <button className="btn btn-close shadow-md mr-2" onClick={handleOnClickClean}>X Limpiar
                    </button>
                    <button className="btn btn-primary shadow-md mr-2" onClick={actionAdd}>Nuevo {nameSection}
                    </button>
                </div>
            </div>
            <br/>
        </>
    );
};

Index.defaultProps = {
    dataType: 'text',
};

export default Index ;
