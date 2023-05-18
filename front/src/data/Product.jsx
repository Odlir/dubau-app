import React from 'react';
import {Lucide} from "@/components/base-components/index.js";
import {env} from "@/env.js";

const number = 20;
const columns = (actionDelete, actionEdit, handleOnClickModalImage) => [
    {
        name: '#',
        selector: row => row.auto_increment,
        width: "4rem",
    },
    {
        name: 'Imagen',
        selector: row => row.image,
        cell: (selector) =>
            <div className="w-10 h-10 image-fit zoom-in -ml-5">

                {selector.image == '' ?
                    <p/>
                    :
                    <img src={env.URL + selector.image} className="tooltip rounded-full"
                         width={60}
                         onClick={(e) => handleOnClickModalImage(selector.image, selector.line_Name, selector.line_Description)}
                    />
                }
            </div>
    },
    {
        name: 'Articulo',
        selector: row => row.name,
    },
    {
        name: 'Familia',
        selector: row => row.familyName,
    },
    {
        name: 'Fecha de Creacion',
        selector: row => row.created_in,
    },
    {
        name: 'Estado',
        cell: (selector) => selector.status_dinamic === 1 ?
            <>
                <Lucide icon="CheckSquare" className="w-4 h-4 mr-1 text-success"/><p
                className="text-success">Activo</p>
            </>

            :
            <>
                <Lucide icon="CheckSquare" className="w-4 h-4 mr-1 text-danger"/><p
                className="text-danger">Inactivo</p>
            </>

    },


    {
        name: 'Acciones',
        selector: row => row.product_id,
        cell: (selector) =>
            <div className="flex justify-center items-center">
                <button className="flex items-center mr-3" onClick={(e) => actionEdit(selector.product_id)}>
                    <Lucide icon="Edit3" className="w-4 h-4 mr-1 text-primary"/>{" "}
                </button>
                <button className="flex items-center mr-3" onClick={(e) => actionDelete(selector.product_id)}>
                    <Lucide icon="Trash2" className="w-4 h-4 mr-1 text-danger"/>
                </button>
            </div>,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
        width: "9rem"
    },
];


export default columns;