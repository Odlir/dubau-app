const columns = () => [
    {
        name: '#',
        selector: (row) => row.auto_increment,
        width: '4rem',
    },

    {
        name: 'DNI',
        selector: (row) => row.person_DNI,
    },
    {
        name: 'Nombre',
        selector: (row) => row.person_Name,
    },
    {
        name: 'Empresa',
        selector: (row) => row.brand_CreationDate,
    },
    {
        name: 'Cargo',
        selector: (row) => row.position_ID,
    },
    {
        name: 'Contrato',
        selector: (row) => row.brand_CreationDate,
    },
    {
        name: 'Inicio',
        selector: (row) => row.staff_StartDate,
    },

    {
        name: 'Fin',
        selector: (row) => row.staff_finalDate,
    },
];

export default columns;
