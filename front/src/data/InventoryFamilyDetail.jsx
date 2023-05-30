import React from 'react';
import {Lucide} from "@/components/base-components/index.js";

const number = 20;
const columns = (actionActiveDetail, actionDeleteDetail, actionEditDetail) => [
    {
        name: '#s',
        selector: row => row.auto_increment,
        width: "3rem",
    },
    {
        name: 'ARTICULO',
        selector: row => row.name,
        width: "40rem",
    },
    {
        name: 'CANTIDAD',
        selector: row => row.amount,
    },
    {
        name: 'PRECIO',
        selector: row => row.inventoryDetailCost,
    },
    {
        name: 'Acciones',
        selector: row => row.inventory_detail_id,
        cell: (selector) =>


            <div className="flex justify-center items-center">
                {(selector.status_dinamic === 0) ?
                    <button className="flex items-center mr-3"
                            onClick={(e) => actionActiveDetail(selector.inventory_detail_id)}>
                        <Lucide icon="XOctagon" className="w-4 h-4 mr-1 text-danger"/>
                    </button>

                    :
                    <button className="flex items-center mr-3"
                            onClick={(e) => actionActiveDetail(selector.inventory_detail_id)}>
                        <Lucide icon="ShieldCheck" className="w-4 h-4 mr-1 text-success"/>
                    </button>
                }

                <button className="flex items-center mr-3"
                        onClick={(e) => actionEditDetail(selector.inventory_detail_id)}>
                    <Lucide icon="Edit3" className="w-4 h-4 mr-1 text-primary"/>{" "}
                </button>
                <button className="flex items-center mr-3"
                        onClick={(e) => actionDeleteDetail(selector.inventory_detail_id)}>
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