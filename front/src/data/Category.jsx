import React from 'react';
import { Lucide } from '@/components/base-components/index';

const columns = (actionDelete, actionEdit) => [
    {
        name: '#',
        selector: (row) => row.auto_increment,
        width: '4rem',
    },
    {
        name: 'Categoria',
        selector: (row) => row.category_Name,
    },
    {
        name: 'Descripcion',
        selector: (row) => row.category_Description,
    },
    {
        name: 'Fecha de Creacion',
        selector: (row) => row.category_CreationDate,
    },
    {
        name: 'Acciones',
        selector: (row) => row.category_ID,
        cell: (selector) => (
            <div className="flex justify-center items-center">
                <button
                    type="button"
                    className="flex items-center mr-3"
                    onClick={() => actionEdit(selector.category_ID)}
                >
                    <Lucide
                        icon="Edit3"
                        className="w-4 h-4 mr-1 text-primary"
                    />{' '}
                </button>
                <button
                    type="button"
                    className="flex items-center mr-3"
                    onClick={() => actionDelete(selector.category_ID)}
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
