import React, {useEffect, useState} from 'react';
import {Lucide} from "@/components/base-components/index.js";
import {env} from "@/env.js";

let number = 20;
const columns = ( actionDelete,actionEdit) => {
    return [
        {
            name: '#',
            selector: row => row.auto_increment,
            width: "4rem",
        },
        {
            name: 'Acciones',
            selector: row => row.brand_NameImage,
            cell: (selector) =>
                   <img src={env.URL + selector.brand_NameImage}
                        width={60}
                   />
        },
        {
            name: 'Marca',
            selector: row => row.brand_Name,
        },
        {
            name: 'Descripcion',
            selector: row => row.brand_Description,
        },
        {
            name: 'Fecha de Creacion',
            selector: row => row.brand_CreationDate,
        },
        {
            name: 'Acciones',
            selector: row => row.brand_ID,
            cell: (selector) =>
                <div className="flex justify-center items-center">
                    <button className="flex items-center mr-3" onClick={(e) => actionEdit(selector.brand_ID)}>
                        <Lucide icon="Edit3" className="w-4 h-4 mr-1 text-primary"/>{" "}
                    </button>
                    <button className="flex items-center mr-3" onClick={(e) => actionDelete(selector.brand_ID)}>
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