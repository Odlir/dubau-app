import React from 'react';
import {Lucide} from "@/components/base-components/index.js";

const number = 20;
const columns = (actionDelete, actionEdit, handleOnClickModalImage) => [
    {
        name: '#',
        selector: row => row.auto_increment,
        width: "4rem",
    },
    {
        name: 'RUC',
        selector: row => row.person_RUC,
        width: "7rem",
    },
    {
        name: 'DNI',
        selector: row => row.person_DNI,
        width: "7rem",
    },
    {
        name: 'Nombre',
        selector: row => row.person_Name,
        width: "25rem",
    },

    {
        name: 'Tipo de persona',
        selector: row => '',
        width: "10rem",
    },

    {
        name: 'Acciones',
        selector: row => row.business_entity_id,
        cell: (selector) =>
            <div className="flex justify-center items-center">
                <button className="flex items-center mr-3" onClick={(e) => actionEdit(selector.business_entity_id)}>
                    <Lucide icon="Edit3" className="w-4 h-4 mr-1 text-primary"/>{" "}
                </button>
                <button className="flex items-center mr-3"
                        onClick={(e) => actionDelete(selector.business_entity_id)}>
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