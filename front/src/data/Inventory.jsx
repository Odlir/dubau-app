import React from 'react';
import { Lucide } from '@/components/base-components/index';

const columns = (actionDelete, actionViewDetail, actionEdit) => [
    {
        name: '#',
        selector: (row) => row.auto_increment,
        width: '4rem',
    },
    {
        name: 'Nombre',
        selector: (row) => row.name,
    },
    {
        name: 'Fecha Inicio',
        selector: (row) => row.start_date,
    },
    {
        name: 'Fecha Final',
        selector: (row) => row.final_date,
    },
    {
        name: 'Fecha de Creacion',
        selector: (row) => row.created_in,
    },
    {
        name: 'Acciones',
        selector: (row) => row.inventory_id,
        cell: (selector) => (
            <div className="flex justify-center items-center">
                <button
                    type="button"
                    className="flex items-center mr-3"
                    onClick={() => actionViewDetail(selector.inventory_id)}
                >
                    <Lucide
                        icon="Archive"
                        className="w-4 h-4 mr-1 text-indigo-700"
                    />{' '}
                </button>
                <button
                    type="button"
                    className="flex items-center mr-3"
                    onClick={() => actionEdit(selector.inventory_id)}
                >
                    <Lucide
                        icon="Edit3"
                        className="w-4 h-4 mr-1 text-primary"
                    />{' '}
                </button>
                <button
                    type="button"
                    className="flex items-center mr-3"
                    onClick={() => actionDelete(selector.inventory_id)}
                >
                    <Lucide
                        icon="Trash2"
                        className="w-4 h-4 mr-1 text-danger"
                    />
                </button>
            </div>
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
        width: '9rem',
    },
];

export default columns;
