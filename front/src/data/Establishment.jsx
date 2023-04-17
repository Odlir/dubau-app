import React, {useEffect, useState} from 'react';
import {Lucide} from "@/components/base-components/index.js";
import {env} from "@/env.js";
let number = 20;
const columns = ( actionDelete,actionEdit,handleOnClickModalImage) => {
    return [
        {
            name: '#',
            selector: row => row.auto_increment,
            width: "4rem",
        },
        {
            name: 'Imagen',
            selector: row => row.establishment_NameImage,
            cell: (selector) =>
                <div className={'w-10 h-10 image-fit zoom-in -ml-5'}>
                    {selector.establishment_NameImage == '' ?
                        <p></p>
                        :
                        <img src={env.URL + selector.establishment_NameImage} className={'tooltip rounded-full'}
                             width={60}
                             onClick={(e) => handleOnClickModalImage(selector.establishment_NameImage, selector.establishment_Name, selector.establishment_Description)}
                        />
                    }
                </div>
        },
        {
            name: 'Fabricante',
            selector: row => row.establishment_Name,
        },
        {
            name: 'Descripcion',
            selector: row => row.establishment_Description,
        },
        {
            name: 'Fecha de Creacion',
            selector: row => row.establishment_CreationDate,
        },
        {
            name: 'Acciones',
            selector: row => row.establishment_ID,
            cell: (selector) =>
                <div className="flex justify-center items-center">
                    <button className="flex items-center mr-3" onClick={(e) => actionEdit(selector.establishment_ID)}>
                        <Lucide icon="Edit3" className="w-4 h-4 mr-1 text-primary"/>{" "}
                    </button>
                    <button className="flex items-center mr-3" onClick={(e) => actionDelete(selector.establishment_ID)}>
                        <Lucide icon="Trash2" className="w-4 h-4 mr-1 text-danger" />

                    </button>
                </div>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: "9rem"
        },
    ];
}


export default columns;