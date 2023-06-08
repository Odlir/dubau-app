import React from 'react';
import { Lucide } from '@/components/base-components/index';

const columns = (actionDelete, actionEdit) => [
    {
        name: '#',
        selector: (row) => row.auto_increment,
        width: '4rem',
    },
    {
        name: 'Tipo de Calificacion',
        selector: (row) => row.position_Name,
    },
    {
        name: 'Descripcion',
        selector: (row) => row.position_Description,
    },
    {
        name: 'Fecha de Creacion',
        selector: (row) => row.position_CreationDate,
    },
    {
        name: 'Acciones',
        selector: (row) => row.position_ID,
        cell: (selector) => (
            <div className="flex justify-center items-center">
                <button
                    type="button"
                    className="flex items-center mr-3"
                    onClick={() => actionEdit(selector.position_ID)}
                >
                    <Lucide
                        icon="Edit3"
                        className="w-4 h-4 mr-1 text-primary"
                    />{' '}
                </button>
                <button
                    type="button"
                    className="flex items-center mr-3"
                    onClick={() => actionDelete(selector.position_ID)}
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
