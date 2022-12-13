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
            name: 'Imagen',
            selector: row => row.line_NameImage,
            cell: (selector) =>
                <div className={'w-10 h-10 image-fit zoom-in -ml-5'}>
                    <img src={env.URL + selector.line_NameImage} className={'tooltip rounded-full'}
                         width={60} onClick={(e) => handleOnClickModalImage(selector.line_NameImage,selector.line_Name,selector.line_Description)}
                    />
                </div>
        },
        {
            name: 'Linea',
            selector: row => row.line_Name,
        },
        {
            name: 'Descripcion',
            selector: row => row.line_Description,
        },
        {
            name: 'Fecha de Creacion',
            selector: row => row.line_CreationDate,
        },
        {
            name: 'Acciones',
            selector: row => row.line_ID,
            cell: (selector) =>
                <div className="flex justify-center items-center">
                    <button className="flex items-center mr-3" onClick={(e) => actionEdit(selector.line_ID)}>
                        <Lucide icon="Edit3" className="w-4 h-4 mr-1 text-primary"/>{" "}
                    </button>
                    <button className="flex items-center mr-3" onClick={(e) => actionDelete(selector.line_ID)}>
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