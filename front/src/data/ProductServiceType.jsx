import React from 'react';
import { Lucide } from '@/components/base-components/index';

const columns = (actionDelete, actionEdit) => [
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
        name: 'Tipo',
        selector: (row) => row.type,
        cell: (selector) => (
            <p>{selector.type === 'P' ? 'PRODUCTO' : 'SERVICIO'}</p>
        ),
    },

    {
        name: 'Fecha de Creacion',
        selector: (row) => row.created_in,
    },
    {
        name: 'Acciones',
        selector: (row) => row.product_service_type_id,
        cell: (selector) => (
            <div className="flex justify-center items-center">
                <button
                    type="button"
                    className="flex items-center mr-3"
                    onClick={() => actionEdit(selector.product_service_type_id)}
                >
                    <Lucide
                        icon="Edit3"
                        className="w-4 h-4 mr-1 text-primary"
                    />{' '}
                </button>
                <button
                    type="button"
                    className="flex items-center mr-3"
                    onClick={() =>
                        actionDelete(selector.product_service_type_id)
                    }
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
