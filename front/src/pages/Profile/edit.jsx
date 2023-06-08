import React from 'react';
import Button from '@/components/Button/Button.jsx';
import 'sweetalert2/src/sweetalert2.scss';
import Input from '../../components/Input/Input.jsx';

function Edit({
    user_Name,
    setUser_Name,
    person_Name,
    setPerson_Name,
    person_LastNamePaternal,
    setPerson_LastNamePaternal,
    person_LastNameMaternal,
    setPerson_LastNameMaternal,
    person_Direction,
    setPerson_Direction,
    person_Email,
    setPerson_Email,
    person_Phone,
    setPerson_Phone,
    person_CellPhone,
    setPerson_CellPhone,
    handleOnClickProfile,
    handleOnClickUpdate,
}) {
    return (
        <div className="mt-5">
            <div className="grid grid-cols-12 gap-6">
                {/* BEGIN: DATA Person */}
                <div className="intro-y box col-span-12 lg:col-span-6">
                    <div className="flex items-center px-5 py-5 sm:py-3 border-b border-slate-200/60 dark:border-darkmode-400">
                        <h2 className="font-medium text-base mr-auto">
                            Data Persona
                        </h2>
                    </div>
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="w-40">Nombres</div>
                            <Input
                                dataType="text"
                                dataName="emailssss"
                                dataId="emailssss"
                                className="form-control"
                                dataValue={person_Name}
                                dataPlaceholder="Name Cargo"
                                dataOnchange={setPerson_Name}
                            />
                        </div>
                        <div className="flex items-center mt-5">
                            <div className="w-40">Apellido Paterno</div>
                            <Input
                                dataType="text"
                                dataName="email"
                                dataId="email"
                                className="form-control"
                                dataValue={person_LastNamePaternal}
                                dataPlaceholder="Name Cargo"
                                dataOnchange={setPerson_LastNamePaternal}
                            />
                        </div>
                        <div className="flex items-center mt-5">
                            <div className="w-40">Apellido Materno</div>
                            <Input
                                dataType="text"
                                dataName="email"
                                dataId="email"
                                className="form-control"
                                dataValue={person_LastNameMaternal}
                                dataPlaceholder="Name Cargo"
                                dataOnchange={setPerson_LastNameMaternal}
                            />
                        </div>
                    </div>
                </div>
                {/* END: DATA Person */}
                {/* BEGIN: Info User */}
                <div className="intro-y box col-span-12 lg:col-span-6">
                    <div className="flex items-center px-5 py-5 sm:py-3 border-b border-slate-200/60 dark:border-darkmode-400">
                        <h2 className="font-medium text-base mr-auto">Info</h2>
                    </div>
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="w-40">Nombre Usuario</div>
                            <Input
                                dataType="text"
                                dataName="email"
                                dataId="email"
                                className="form-control"
                                dataValue={user_Name}
                                dataPlaceholder="Name Cargo"
                                dataOnchange={setUser_Name}
                            />
                        </div>
                        <div className="flex items-center mt-5" />
                    </div>
                </div>
                {/* END: Info User */}

                {/* BEGIN: Info User */}
                <div className="intro-y box col-span-12 lg:col-span-6">
                    <div className="flex items-center px-5 py-5 sm:py-3 border-b border-slate-200/60 dark:border-darkmode-400">
                        <h2 className="font-medium text-base mr-auto">
                            Detalle de Contacto
                        </h2>
                    </div>
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="w-40">Email</div>
                            <Input
                                dataType="text"
                                dataName="email"
                                dataId="email"
                                className="form-control"
                                dataValue={person_Email}
                                dataPlaceholder="Name Cargo"
                                dataOnchange={setPerson_Email}
                            />
                        </div>
                        <div className="flex items-center mt-5">
                            <div className="w-40">Direccion</div>
                            <Input
                                dataType="text"
                                dataName="email"
                                dataId="email"
                                className="form-control"
                                dataValue={person_Direction}
                                dataPlaceholder="Name Cargo"
                                dataOnchange={setPerson_Direction}
                            />
                        </div>
                        <div className="flex items-center mt-5">
                            <div className="w-40">Telefono fijo</div>
                            <Input
                                dataType="text"
                                dataName="email"
                                dataId="email"
                                className="form-control"
                                dataValue={person_Phone}
                                dataPlaceholder="Name Cargo"
                                dataOnchange={setPerson_Phone}
                            />
                        </div>
                        <div className="flex items-center mt-5">
                            <div className="w-40">Celular</div>
                            <Input
                                dataType="text"
                                dataName="email"
                                dataId="email"
                                className="form-control"
                                dataValue={person_CellPhone}
                                dataPlaceholder="Name Cargo"
                                dataOnchange={setPerson_CellPhone}
                            />
                        </div>
                    </div>
                </div>
                {/* END: Info User */}
            </div>
            <div className="mt-5">
                <div className="grid grid-cols-24 gap-6">
                    <div className="intro-y box col-span-24 lg:col-span-6">
                        <div className="flex justify-end flex-col md:flex-row gap-2 mt-2">
                            <Button
                                textName="Cancelar"
                                color="btn-light"
                                onClick={handleOnClickProfile}
                            />
                            <Button
                                textName="Guardar"
                                onClick={handleOnClickUpdate}
                            />
                        </div>
                        <div className="mt-2" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Edit;
