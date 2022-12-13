import React, {useEffect, useState} from 'react';
import {Lucide} from "@/components/base-components/index.js";
import {env} from "@/env.js";
let number = 20;
const columns = ( actionDelete,actionEdit,handleOnClickModalImage) => {
    return [
        {
            name: '#',
            selector: row => row.auto_increment,
            width: "4rem",
        },
        {
            name: 'Tipo de Calificacion',
            selector: row => row.position_Name,
        },
        {
            name: 'Descripcion',
            selector: row => row.position_Description,
        },
        {
            name: 'Fecha de Creacion',
            selector: row => row.position_CreationDate,
        },
        {
            name: 'Acciones',
            selector: row => row.position_ID,
            cell: (selector) =>
                <div className="flex justify-center items-center">
                    <button className="flex items-center mr-3" onClick={(e) => actionEdit(selector.position_ID)}>
                        <Lucide icon="Edit3" className="w-4 h-4 mr-1 text-primary"/>{" "}
                    </button>
                    <button className="flex items-center mr-3" onClick={(e) => actionDelete(selector.position_ID)}>
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