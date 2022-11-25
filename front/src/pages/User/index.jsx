import React, {useEffect, useState} from 'react';
import axios from "axios";
import DataTable from 'react-data-table-component';
import {env} from "@/env.js";
import columns from '../../data/Users.jsx';
import Preload from "@/components/preload/preload";

const Index = () => {
    const endpoint = `${env.apiURL}list`;
    const [dataUser, setDataUser] = useState(null);
    const [pending, setPending] = React.useState(true);

    const getDataUser = async () => {
        let userList = [];
        try {
            userList = await axios.get(endpoint)
                .then((response) => {
                    setDataUser(response.data);
                    setPending(false);
                    console.log("Tabla Cargada correctamente ");
                })
                .catch(error => {
                    alert('Tabla con data incorrecta')
                });
            ;
        } catch (e) {
            console.log('Error 404');
        }

        return userList;
    }

    useEffect(() => {
        getDataUser();

    }, []);

    const actionVerify = async (PERSP_Codigo) => {
        const endpoint = `${env.apiURL}verifyUser`;
        await axios.post(endpoint, {PERSP_Codigo: PERSP_Codigo, cji_usuario_estadoVerificado: 1})
            .then(function (response) {
                getDataUser();
            })
            .catch(error => {
                alert('Usuario o Contraseña incorrectos')
            })
    }

    return (
        <div>
            <br/>
            {dataUser ?
                <DataTable
                    columns={columns(actionVerify)}
                    data={dataUser}
                    pagination
                    progressPending={pending}
                    progressComponent={<Preload/>}
                    highlightOnHover
                    pointerOnHover
                />
                :
                <Preload/>
            }

        </div>
    )
}

export default Index