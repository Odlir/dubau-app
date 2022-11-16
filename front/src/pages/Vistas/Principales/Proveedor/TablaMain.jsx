import './styles.css';
//import 'styled-components'
import styled from 'styled-components';
import React, {useState, useEffect} from 'react';
import DataTable , {createTheme} from 'react-data-table-component';

const TablaMain = () => {
  //1 - Configurar los hooks
  const [users, setUsers] = useState( [] )

  //2 - Función para mostrar los datos con fetch
  const URL = 'https://gorest.co.in/public/v2/users'
  const showData = async () => {
    const response = await fetch(URL)
    const data     = await response.json()
    console.log(data)
    setUsers(data)
  }

  const customSort = (rows, selector, direction) => {
    return rows.sort((rowA, rowB) => {
     // use the selector function to resolve your field names by passing the sort comparitors
     const aField = selector(rowA)
     const bField = selector(rowB)
   
     let comparison = 0;
   
     if (aField > bField) {
      comparison = 1;
     } else if (aField < bField) {
      comparison = -1;
     }
   
     return direction === 'desc' ? comparison * -1 : comparison;
    });
   };

  useEffect( ()=>{
    showData()
  }, [])

  //3 - Configuramos las columns para Datatable
  const columns = [
    {
      name: 'ID',
      selector: row => row.id
    },
    {
      name: 'NAME',
      selector: row => row.name
    },
    {
      name: 'E-MAIL',
      selector: row => row.email
    },

  ]

  //personalizar temas
 /*  createTheme('custom', {
    text: {
      primary: '#268bd2',
      secondary: '#2aa198',
    },
    background: {
      default: '#002b36',
    },
    context: {
      background: '#cb4b16',
      text: '#FFFFFF',
    },
    divider: {
      default: '#073642',
    },
    action: {
      button: 'rgba(0,0,0,.54)',
      hover: 'rgba(0,0,0,.08)',
      disabled: 'rgba(0,0,0,.12)',
    },
  }, 'dark'); */
  

  //4 - Mostramos la data en DataTable
  return (
    <div>

        <DataTable 
            columns={columns}
            data={users}
            //theme='custom' //habilitar esta linea y descomentar createTheme()
            pagination
            sortFunction={customSort}
        />

    </div>
  );
}

export default TablaMain;



// ---------------------------------------------------------------


// const TextField = styled.input`
// 	height: 32px;
//   width: 200px;
// 	border-radius: 3px;
// 	border-top-left-radius: 5px;
// 	border-bottom-left-radius: 5px;
// 	border-top-right-radius: 0;
// 	border-bottom-right-radius: 0;
// 	border: 1px solid #e5e5e5;
// 	padding: 0 32px 0 16px;

// 	&:hover {
// 		cursor: pointer;
// 	}
// `;

// const ClearButton = styled.Button`
// 	border-top-left-radius: 0;
// 	border-bottom-left-radius: 0;
//   border-top-right-radius: 5px;
// 	border-bottom-right-radius: 5px;
// 	height: 34px;
// 	width: 32px;
// 	text-align: center;
// 	display: flex;
// 	align-items: center;
// 	justify-content: center;
// `;


// const FilterComponent = ({ filterText, onFilter, onClear }) => (
// 	<>
// 		<TextField
// 			id="search"
// 			type="text"
// 			placeholder="Filter By Name"
// 			aria-label="Search Input"
// 			value={filterText}
// 			onChange={onFilter}
// 		/>
// 	<ClearButton type="button" onClick={onClear}>
// 			X
// 		</ClearButton>
// 	</>
// );

// const columns = [
// 	{
// 		name: 'Name',
// 		selector: row => row.name,
// 		sortable: true,
// 	},
// 	{
// 		name: 'Email',
// 		selector: row => row.email,
// 		sortable: true,
// 	},
// 	{
// 		name: 'Address',
// 		selector: row => row.address,
// 		sortable: true,
// 	},
// ];

// export const Filtering = () => {
// 	const [filterText, setFilterText] = React.useState('');
// 	const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
// 	const filteredItems = fakeUsers.filter(
// 		item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()),
// 	);

// 	const subHeaderComponentMemo = React.useMemo(() => {
// 		const handleClear = () => {
// 			if (filterText) {
// 				setResetPaginationToggle(!resetPaginationToggle);
// 				setFilterText('');
// 			}
// 		};

// 		return (
// 			<FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
// 		);
// 	}, [filterText, resetPaginationToggle]);
// 	return (
// 		<DataTable
// 			title="Contact List"
// 			columns={columns}
// 			data={filteredItems}
// 			pagination
// 			paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
// 			subHeader
// 			subHeaderComponent={subHeaderComponentMemo}
// 			selectableRows
// 			persistTableHead
// 		/>
// 	);
// };

// export default {
// 	title: 'Examples/Filtering',
// 	component: Filtering,
// };
