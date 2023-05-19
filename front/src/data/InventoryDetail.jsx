import React from 'react';
import {Lucide} from "@/components/base-components/index.js";

const number = 20;
const columns = (actionDelete, actionEdit) => [
    {
        name: '#',
        selector: row => row.auto_increment,
        width: "4rem",
    },
    {
        name: 'ARTICULO',
        selector: row => row.name,
    },
    {
        name: 'CANTIDAD',
        selector: row => row.amount,
    },
    {
        name: 'PRECIO',
        selector: row => row.cost,
    },
    {
        name: 'Acciones',
        selector: row => row.inventory_detail_id,
        cell: (selector) =>
            <div className="flex justify-center items-center">
                <button className="flex items-center mr-3" onClick={(e) => actionEdit(selector.inventory_detail_id)}>
                    <Lucide icon="Edit3" className="w-4 h-4 mr-1 text-primary"/>{" "}
                </button>
                <button className="flex items-center mr-3" onClick={(e) => actionDelete(selector.inventory_detail_id)}>
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