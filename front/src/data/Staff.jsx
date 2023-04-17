import React, {useEffect, useState} from 'react';
import {Lucide} from "@/components/base-components/index.js";
import {env} from "@/env.js";

let number = 20;
const columns = (actionDelete, actionEdit, handleOnClickModalImage) => {
    return [
        {
            name: '#',
            selector: row => row.auto_increment,
            width: "4rem",
        },
        {
            name: 'Nombre',
            selector: row => row.person_Name,
        },

        {
            name: 'DNI',
            selector: row => row.person_NumberDocumentID,
        },

        {
            name: 'Cargo',
            selector: row => row.position_ID,
        },
        {
            name: 'Fecha de moficiacion',
            selector: row => row.staff_CreationDate,
        },
        {
            name: 'Inicio',
            selector: row => row.staff_StartDate,
        },

        {
            name: 'Fin',
            selector: row => row.staff_finalDate,
        },
        {
            name: 'Acciones',
            selector: row => row.staff_ID,
            cell: (selector) =>
                <div className="flex justify-center items-center">
                    <button className="flex items-center mr-3" onClick={(e) => actionEdit(selector.staff_ID)}>
                        <Lucide icon="Edit3" className="w-4 h-4 mr-1 text-primary"/>{" "}
                    </button>
                    <button className="flex items-center mr-3" onClick={(e) => actionDelete(selector.staff_ID)}>
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