
import './styles.css'

import { Table } from './Table'


const TablaMain = () => {

  const columns = [
    { accessor: 'name', label: 'Name' },
    { accessor: 'age', label: 'Age' },
    { accessor: 'is_manager', label: 'Manager', format: (value) => (value ? '✔️' : '✖️') },
    { accessor: 'start_date', label: 'Start Date' },
  ]
  
  const rows = [
    { id: 1, name: 'Liz Lemon', age: 36, is_manager: true, start_date: '02-28-1999' },
    { id: 2, name: 'Jack Donaghy', age: 40, is_manager: true, start_date: '03-05-1997' },
    { id: 3, name: 'Tracy Morgan', age: 39, is_manager: false, start_date: '07-12-2002' },
    { id: 4, name: 'Jenna Maroney', age: 40, is_manager: false, start_date: '02-28-1999' },
    { id: 5, name: 'Acosta Guerra', age: Infinity, is_manager: false, start_date: '01-01-1970' },
    { id: 6, name: 'Pete Hornberger', age: 42, is_manager: true, start_date: '04-01-2000' },
    { id: 7, name: 'Frank Rossitano', age: 36, is_manager: false, start_date: '06-09-2004' },
    { id: 8, name: 'Liz Lemon', age: 36, is_manager: true, start_date: '02-28-1999' },
    { id: 9, name: 'Jack Donaghy', age: 40, is_manager: true, start_date: '03-05-1997' },
    { id: 10, name: 'Tracy Morgan', age: 39, is_manager: false, start_date: '07-12-2002' },
    { id: 11, name: 'Jenna Maroney', age: 40, is_manager: false, start_date: '02-28-1999' },
    { id: 12, name: 'Kenneth Parcell', age: Infinity, is_manager: false, start_date: '01-01-1970' },
    { id: 13, name: 'Pete Hornberger', age: 42, is_manager: true, start_date: '04-01-2000' },
    { id: 14, name: 'Frank Rossitano', age: 36, is_manager: false, start_date: '06-09-2004' },
    { id: 15, name: 'Liz Lemon', age: 36, is_manager: true, start_date: '02-28-1999' },
    { id: 16, name: 'Jack Donaghy', age: 40, is_manager: true, start_date: '03-05-1997' },
    { id: 17, name: 'Tracy Morgan', age: 39, is_manager: false, start_date: '07-12-2002' },
    { id: 18, name: 'Jenna Maroney', age: 40, is_manager: false, start_date: '02-28-1999' },
    { id: 19, name: 'Kenneth Parcell', age: Infinity, is_manager: false, start_date: '01-01-1970' },
    { id: 22, name: null, age: null, is_manager: null, start_date: null },
  ]

  return (
    <Table rows={rows} columns={columns} />
  );
}

export default TablaMain;

