import React from 'react';
import { Lucide } from '@/components/base-components/index';

const columns = (actionDelete, actionEdit) => [
    {
        name: '#',
        selector: (row) => row.auto_increment,
        width: '4rem',
    },
    {
        name: 'Sector',
        selector: (row) => row.commercial_section_Name,
    },
    {
        name: 'Descripcion',
        selector: (row) => row.commercial_section_Description,
    },
    {
        name: 'Fecha de Creacion',
        selector: (row) => row.commercial_section_CreationDate,
    },
    {
        name: 'Acciones',
        selector: (row) => row.commercial_section_ID,
        cell: (selector) => (
            <div className="flex justify-center items-center">
                <button
                    type="button"
                    className="flex items-center mr-3"
                    onClick={() => actionEdit(selector.commercial_section_ID)}
                >
                    <Lucide
                        icon="Edit3"
                        className="w-4 h-4 mr-1 text-primary"
                    />{' '}
                </button>
                <button
                    type="button"
                    className="flex items-center mr-3"
                    onClick={() => actionDelete(selector.commercial_section_ID)}
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
