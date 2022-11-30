import React, {useEffect, useState} from 'react';
import {Lucide} from "@/components/base-components/index.js";

let number = 20;
const columns = (actionVerify, actionDelete,actionEdit) => {
    return [
        {
            name: '#',
            selector: row => row.auto_increment,
            width: "4rem",
        },
        {
            name: 'Usuario',
            selector: row => row.USUA_usuario,
        },
        {
            name: 'Fecha de Creacion',
            selector: row => row.USUA_FechaRegistro,
        },
        {
            name: 'Estado',
            cell: (selector) => selector.cji_usuario_estadoVerificado && selector.cji_usuario_estadoVerificado != 0 ?
                <>
                    <Lucide icon="CheckSquare" className="w-4 h-4 mr-1 text-success"/><p
                    className="text-success">{"Verificado"}</p>
                </>

                :
                <>
                    <Lucide icon="CheckSquare" className="w-4 h-4 mr-1 text-danger"/><p
                    className="text-danger">{"En Espera"}</p>
                </>
        },
        {
            name: 'Acciones',
            selector: row => row.USUA_Codigo,
            cell: (selector) =>
                <div className="flex justify-center items-center">
                    <button className="flex items-center mr-3" onClick={(e) => actionVerify(selector.USUA_Codigo)}>
                        <Lucide icon="CheckSquare" className="w-4 h-4 mr-1"/>{" "}
                        Aprobar
                    </button>
                    <button className="flex items-center mr-3" onClick={(e) => actionEdit(selector.USUA_Codigo)}>
                        <Lucide icon="Edit3" className="w-4 h-4 mr-1 text-primary"/>{" "}
                    </button>
                    <button className="flex items-center mr-3" onClick={(e) => actionDelete(selector.USUA_Codigo)}>
                        <Lucide icon="Trash2" className="w-4 h-4 mr-1 text-danger" />

                    </button>
                </div>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: "9rem"
        },
    ];
}


export default columns;