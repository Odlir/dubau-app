import React from 'react';
import { Lucide } from '@/components/base-components/index.js';

const columns = (actionDelete, actionEdit) => [
    {
        name: '#',
        selector: (row) => row.auto_increment,
        width: '4rem',
    },
    {
        name: 'Servicio',
        selector: (row) => row.name,
    },
    {
        name: 'Familia',
        selector: (row) => row.familyName,
    },
    {
        name: 'Fecha de Creacion',
        selector: (row) => row.created_in,
    },
    {
        name: 'Estado',
        cell: (selector) =>
            selector.status_dinamic === 1 ? (
                <>
                    <Lucide
                        icon="CheckSquare"
                        className="w-4 h-4 mr-1 text-success"
                    />
                    <p className="text-success">Activo</p>
                </>
            ) : (
                <>
                    <Lucide
                        icon="CheckSquare"
                        className="w-4 h-4 mr-1 text-danger"
                    />
                    <p className="text-danger">Inactivo</p>
                </>
            ),
    },

    {
        name: 'Acciones',
        selector: (row) => row.product_id,
        cell: (selector) => (
            <div className="flex justify-center items-center">
                <button
                    type="button"
                    className="flex items-center mr-3"
                    onClick={() => actionEdit(selector.product_id)}
                >
                    <Lucide
                        icon="Edit3"
                        className="w-4 h-4 mr-1 text-primary"
                    />{' '}
                </button>
                <button
                    type="button"
                    className="flex items-center mr-3"
                    onClick={() => actionDelete(selector.product_id)}
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
