import React from 'react';
import { Lucide } from '@/components/base-components/index';

const columns = (actionDelete, actionEdit) => [
    {
        name: '#',
        selector: (row) => row.auto_increment,
        width: '4rem',
    },
    {
        name: 'Cod. Interno',
        selector: (row) => row.internal_code,
    },
    {
        name: 'Cod. Usuario',
        selector: (row) => row.user_code,
    },
    {
        name: 'Nombre',
        selector: (row) => row.name,
    },
    {
        name: 'Tipo',
        selector: (row) => row.type,
        cell: (selector) => (
            <p>{selector.type === 'S' ? 'SERVICIO' : 'PRODUCTO'}</p>
        ),
    },

    {
        name: 'Fecha de Creacion',
        selector: (row) => row.created_in,
    },
    {
        name: 'Acciones',
        selector: (row) => row.family_id,
        cell: (selector) => (
            <div className="flex justify-center items-center">
                <button
                    type="button"
                    className="flex items-center mr-3"
                    onClick={() => actionEdit(selector.family_id)}
                >
                    <Lucide
                        icon="Edit3"
                        className="w-4 h-4 mr-1 text-primary"
                    />{' '}
                </button>
                <button
                    type="button"
                    className="flex items-center mr-3"
                    onClick={() => actionDelete(selector.family_id)}
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
