import {useState, useMemo} from 'react'
import {sortRows, filterRows, paginateRows} from './Helpers'
import {Pagination} from './Pagination'
import {PagCabecera} from './PagCabecera'

import {
    Lucide,
} from "@/base-components";

import parse from 'html-react-parser';


export const Table = ({ columns, rows }) => {

    const [activePage, setActivePage] = useState(1)
    const [filters, setFilters] = useState({})
    const [sort, setSort] = useState({order: 'asc', orderBy: 'id'})

    const [rowsPerPage, setrowsPerPage] = useState("10");

    const filteredRows = useMemo(() => filterRows(rows, filters), [rows, filters]);
    const sortedRows = useMemo(() => sortRows(filteredRows, sort), [filteredRows, sort]);
    const calculatedRows = paginateRows(sortedRows, activePage, rowsPerPage);

    const count = filteredRows.length;
    const totalPages = Math.ceil(count / rowsPerPage);

    const handleSearch = (value, accessor) => {
        setActivePage(1)

        if (value) {
            setFilters((prevFilters) => ({
                ...prevFilters,
                [accessor]: value,
            }))
        } else {
            setFilters((prevFilters) => {
                const updatedFilters = {...prevFilters}
                delete updatedFilters[accessor]

                return updatedFilters
            })
        }
    }

    const handleSort = (accessor) => {
        setActivePage(1)
        setSort((prevSort) => ({
            order: prevSort.order === 'asc' && prevSort.orderBy === accessor ? 'desc' : 'asc',
            orderBy: accessor,
        }))
    }

    const clearAll = () => {
        setSort({order: 'asc', orderBy: 'id'})
        setActivePage(1)
        setFilters({})
    }

    const GetValue = (e) => {
        clearAll();
        setrowsPerPage(e.target.value);
    }

    return (
        <>
            <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">
                <PagCabecera
                    activePage={activePage}
                    count={count}
                    rowsPerPage={rowsPerPage}
                    totalPages={totalPages}
                    setActivePage={setActivePage}
                />
                <div className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
                    <div className="w-56 relative text-slate-500">
                        <select className="w-20 form-select box mt-3 sm:mt-0 cursor-pointer" onChange={GetValue}>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="35">35</option>
                            <option value="50">50</option>
                        </select>
                        <button className="btn btn-secondary w-24 mr-1 mb-2" onClick={clearAll}>
                            Restablecer
                        </button>
                    </div>
                </div>
            </div>
            {/* BEGIN: Data List */}
            <div className="intro-y col-span-12 overflow-x-scroll">
                <table className="table table-report -mt-2 ">
                    <thead>
                    <tr>
                        {columns.map((column) => {
                            const sortIcon = () => {
                                if (column.accessor === sort.orderBy) {
                                    if (sort.order === 'asc') {
                                        return <Lucide key={column.accessor} icon="ArrowUp" className="w-4 h-4 cursor-pointer"/>;
                                    }
                                    return <Lucide key={column.accessor} icon="ArrowDown" className="w-4 h-4 cursor-pointer"/>;
                                } else {
                                    return '↕️';
                                }
                            }
                            return (
                                <th className="whitespace-nowrap text-center" key={column.accessor}>
                                    <span>{column.label}</span>
                                    <button onClick={() => handleSort(column.accessor)}>{sortIcon()}</button>
                                </th>
                            )
                        })}
                    </tr>
                    <tr>
                        {columns.map((column) => {
                            return (
                                <th className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0" key={column.accessor}>
                                    <div className="w-56 relative text-slate-500">
                                        <input
                                            key={`${column.accessor}-search`}
                                            type="text"
                                            className="form-control w-56 box pr-10"
                                            placeholder={`Buscar ${column.label}`}
                                            value={filters[column.accessor]}
                                            onChange={(event) => handleSearch(event.target.value, column.accessor)}
                                        />

                                        <Lucide
                                            icon="Search"
                                            className="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0"
                                        />
                                    </div>
                                </th>
                            )
                        })}
                    </tr>
                    </thead>
                    <tbody>
                        {calculatedRows.map((row) => {
                            return (
                                <tr key={row.id} className="intro-x">
                                    {columns.map((column) => {
                                        if (column.format) {
                                            return <td className="text-center" key={column.accessor}>
                                                {column.format(row[column.accessor])}
                                            </td>
                                        }
                                        return <td className="text-center" key={column.accessor}>
                                            {row[column.accessor]}
                                        </td>
                                    })}
                                    <td>
                                        <a className="flex items-center mr-3" href="#">
                                            <Lucide icon="CheckSquare" className="w-4 h-4 mr-1" />
                                            {" "}Edit
                                        </a>
                                        <a className="flex items-center text-danger"href="#"
                                           onClick={() => {setDeleteConfirmationModal(true);  }}>
                                            <Lucide icon="Trash2" className="w-4 h-4 mr-1" />
                                            Delete
                                        </a>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            {/* END: Data List */}

            {count > 0 ? (
                <Pagination
                    activePage={activePage}
                    count={count}
                    rowsPerPage={rowsPerPage}
                    totalPages={totalPages}
                    setActivePage={setActivePage}
                />
            ) : (
                <div className="intro-y col-span-12 text-center">
                    Datos no encontrados
                </div>

            )}

        </>
    )
}
