const columns = () => [
    {
        name: '#',
        selector: (row) => row.auto_increment,
        width: '4rem',
    },
    {
        name: 'Nombre',
        selector: (row) => row.person_Name,
    },

    {
        name: 'DNI',
        selector: (row) => row.person_DNI,
    },

    {
        name: 'Cargo',
        selector: (row) => row.position_ID,
    },
    {
        name: 'Fecha de moficiacion',
        selector: (row) => row.staff3_CreationDate,
    },
    {
        name: 'Inicio',
        selector: (row) => row.staff3_StartDate,
    },

    {
        name: 'Fin',
        selector: (row) => row.staff3_finalDate,
    },
];

export default columns;
