import { useState, useMemo } from 'react'
import { sortRows, filterRows, paginateRows } from './Helpers'
import { Pagination } from './Pagination'


import {
  Lucide,
} from "@/base-components";

export const Table = ({ columns, rows }) => {

  const [activePage, setActivePage] = useState(1)
  const [filters, setFilters] = useState({})
  const [sort, setSort] = useState({ order: 'asc', orderBy: 'id' })
  const rowsPerPage = 10

  const filteredRows = useMemo(() => filterRows(rows, filters), [rows, filters])
  const sortedRows = useMemo(() => sortRows(filteredRows, sort), [filteredRows, sort])
  const calculatedRows = paginateRows(sortedRows, activePage, rowsPerPage)

  const count = filteredRows.length
  const totalPages = Math.ceil(count / rowsPerPage)

  const handleSearch = (value, accessor) => {
    setActivePage(1)

    if (value) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [accessor]: value,
      }))
    } else {
      setFilters((prevFilters) => {
        const updatedFilters = { ...prevFilters }
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
    setSort({ order: 'asc', orderBy: 'id' })
    setActivePage(1)
    setFilters({})
  }

  return (
    <>
    {/* BEGIN: Data List */}
        <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">


          <table className="table table-report -mt-2">
            <thead>
              <tr>
                {columns.map((column) => {
                  const sortIcon = () => {
                    if (column.accessor === sort.orderBy) {
                      if (sort.order === 'asc') {
                        return '⬆️'
                      }
                      return '⬇️'
                    } else {
                      return '️↕️'
                    }
                  }
                  return (
                    <th className="whitespace-nowrap" key={column.accessor}>
                      <span>{column.label}</span>
                      <button onClick={() => handleSort(column.accessor)}>{sortIcon()}</button>
                    </th>
                  )
                })}
              </tr>
              <tr>
                {columns.map((column) => {
                  return (
                    <th className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
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
                  <tr key={row.id}  className="intro-x">
                    {columns.map((column) => {
                      if (column.format) {
                        return <td key={column.accessor}>{column.format(row[column.accessor])}</td>
                      }
                      return <td key={column.accessor}>{row[column.accessor]}</td>
                    })}
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
        <p>Datos no encontrados</p>
      )}




      <div>
        <p>
          <button onClick={clearAll}>Limpiar Todo</button>
        </p>
      </div>
    </>
  )
}
