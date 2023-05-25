import React from 'react';
import Accordion from "@/components/Accordion/Accordion";

const number = 20;


const columns = () => [
    {
        name: 'Acciones',
        selector: row => row.inventory_detail_id,
        cell: (selector) =>
            <div className="container mx-auto p-4">
                <Accordion items={accordionItems}/>
            </div>,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
        width: "9rem"
    },
];


export default columns;