import React from 'react';
import { Lucide } from '@/components/base-components/index';
import env from '@/env';

const columns = (actionDelete, actionEdit, handleOnClickModalImage) => [
    {
        name: '#',
        selector: (row) => row.auto_increment,
        width: '4rem',
    },
    {
        name: 'Imagen',
        selector: (row) => row.maker_NameImage,
        cell: (selector) => (
            <div className="w-10 h-10 image-fit zoom-in -ml-5">
                {selector.maker_NameImage === '' ? (
                    <p />
                ) : (
                    <img
                        src={env.URL + selector.maker_NameImage}
                        className="tooltip rounded-full"
                        width={60}
                        onClick={() =>
                            handleOnClickModalImage(
                                selector.maker_NameImage,
                                selector.maker_Name,
                                selector.maker_Description
                            )
                        }
                    />
                )}
            </div>
        ),
    },
    {
        name: 'Fabricante',
        selector: (row) => row.maker_Name,
    },
    {
        name: 'Descripcion',
        selector: (row) => row.maker_Description,
    },
    {
        name: 'Fecha de Creacion',
        selector: (row) => row.maker_CreationDate,
    },
    {
        name: 'Acciones',
        selector: (row) => row.maker_ID,
        cell: (selector) => (
            <div className="flex justify-center items-center">
                <button
                    type="button"
                    className="flex items-center mr-3"
                    onClick={() => actionEdit(selector.maker_ID)}
                >
                    <Lucide
                        icon="Edit3"
                        className="w-4 h-4 mr-1 text-primary"
                    />{' '}
                </button>
                <button
                    type="button"
                    className="flex items-center mr-3"
                    onClick={() => actionDelete(selector.maker_ID)}
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
