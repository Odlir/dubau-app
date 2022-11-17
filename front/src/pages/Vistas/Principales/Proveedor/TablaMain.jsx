
import React from 'react';
import axios from 'axios';
import { Table } from '@/componentes/TablaData/Table';
import { env } from '@/env.js';


export default class TablaMain extends React.Component {


  state = {
    rows: [],
    columns : [
        { accessor: 'ruc', label: 'RUC' },
        { accessor: 'dni', label: 'DNI' },
        { accessor: 'nombre', label: 'NOMBRE O RAZÓN SOCIAL' },
        { accessor: 'tipo_proveedor', label: 'TIPO PROVEEDOR' },
        { accessor: 'telefono', label: 'TELÉFONO' },
        { accessor: 'movil', label: 'MÓVIL' },
        { accessor: 'accion', label: 'ACCIONES' }
    ]
  }

  componentDidMount() {
    // const endpoint = `${env.apiURL}api/provedor/lista`;
    axios.get(`${env.apiURL}api/provedor/lista`)
      .then(res => {
        const rows = res.data;
        this.setState({ rows });
      })
  }

  render() {
    return (

      <Table rows={this.state.rows} columns={this.state.columns} />

    )
  }
}

