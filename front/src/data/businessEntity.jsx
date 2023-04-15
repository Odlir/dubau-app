import React, {useEffect, useState} from 'react';
import {Lucide} from "@/components/base-components/index.js";
import {env} from "@/env.js";

let number = 20;
const columns = (actionDelete, actionEdit, handleOnClickModalImage) => {
    return [
        {
            name: '#',
            selector: row => row.auto_increment,
            width: "4rem",
        },
        {
            name: 'name',
            selector: row => 'Ivan',
        },

        {
            name: 'Actions',
            selector: 'Edit',
        },


    ];
}


export default columns;