import React, {useEffect, useState} from 'react';
import {Lucide} from "@/components/base-components/index.js";

const columns = (actionVerify) =>{
   return  [
        {
            name: '#',
            selector: (row, index) => index + 1
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
            selector: row => row.cji_usuario_estadoVerificado && row.cji_usuario_estadoVerificado != 0 ? 'Verificado' : 'EN ESPERA',
        },
        {
            name: 'Acciones',
            selector: row => row.USUA_usuario,
            cell: (selector)=> <button className="flex items-center mr-3" onClick={(e) => actionVerify(selector.PERSP_Codigo)}>
                <Lucide icon="CheckSquare" className="w-4 h-4 mr-1" />{" "}
                Aprobar
            </button>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];
}


export default columns;