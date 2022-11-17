/* eslint-disable jsx-a11y/accessible-emoji */
import {
  Lucide,
} from "@/base-components";


export const Pagination = ({ activePage, count, rowsPerPage, totalPages, setActivePage }) => {
  const beginning = activePage === 1 ? 1 : rowsPerPage * (activePage - 1) + 1
  const end = activePage === totalPages ? count : beginning + rowsPerPage - 1

  return (
    <>


{/* 
              <div className="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center">
                <nav className="w-full sm:w-auto sm:mr-auto">
                  <ul className="pagination">
                    <li className="page-item" disabled={activePage === 1} onClick={() => setActivePage(1)}>
                      <a className="page-link" href="#">
                        <Lucide icon="ChevronsLeft" className="w-4 h-4" />
                      </a>
                    </li>
                    <li className="page-item" disabled={activePage === 1} onClick={() => setActivePage(activePage - 1)}>
                      <a className="page-link" href="#">
                        <Lucide icon="ChevronLeft" className="w-4 h-4" />
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        ...
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        1
                      </a>
                    </li>
                    <li className="page-item active">
                      <a className="page-link" href="#">
                        2
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        3
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        ...
                      </a>
                    </li>
                    <li className="page-item" disabled={activePage === totalPages} onClick={() => setActivePage(activePage + 1)}>
                      <a className="page-link" href="#">
                        <Lucide icon="ChevronRight" className="w-4 h-4" />
                      </a>
                    </li>
                    <li className="page-item"  disabled={activePage === totalPages} onClick={() => setActivePage(totalPages)}>
                      <a className="page-link" href="#">
                        <Lucide icon="ChevronsRight" className="w-4 h-4" />
                      </a>
                    </li>
                  </ul>
                </nav>
                <select className="w-20 form-select box mt-3 sm:mt-0">
                  <option>10</option>
                  <option>25</option>
                  <option>35</option>
                  <option>50</option>
                </select>
              </div> */}



              <div className="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center">
                <nav className="w-full sm:w-auto sm:mr-auto">
                  <ul className="pagination">
                    <li className="page-item" >
                      
                      <button  className="page-link"  disabled={activePage === 1} onClick={() => setActivePage(1)}>
                        <Lucide icon="ChevronsLeft" className="w-4 h-4" />
                      </button>

                    </li>
                    <li className="page-item" >
                     
                      <button className="page-link" disabled={activePage === 1} onClick={() => setActivePage(activePage - 1)}>
                        <Lucide icon="ChevronLeft" className="w-4 h-4" />
                      </button>
                    </li>
                  
                    <li className="page-item" >
                      <button  className="page-link" disabled={activePage === totalPages} onClick={() => setActivePage(activePage + 1)}>
                          <Lucide icon="ChevronRight" className="w-4 h-4" />
                      </button>


                    </li>
                    <li className="page-item" >
                
                      <button  className="page-link"  disabled={activePage === totalPages} onClick={() => setActivePage(totalPages)}>
                          <Lucide icon="ChevronsRight" className="w-4 h-4" />
                      </button>

                    </li>
                  </ul>
                </nav>
                <div className="hidden md:block mx-auto text-slate-500">
                  Mostrando  {beginning === end ? end : `${beginning} hasta ${end}`} de {count} registros
                </div>
                <select className="w-20 form-select box mt-3 sm:mt-0">
                  <option>10</option>
                  <option>25</option>
                  <option>35</option>
                  <option>50</option>
                </select>
              </div>

                <div className="hidden md:block mx-auto text-slate-500">
                   Pagina {activePage} de {totalPages}
                </div>

      {/* <p>
        Page {activePage} of {totalPages}
      </p>
      <p>
        Rows: {beginning === end ? end : `${beginning} - ${end}`} of {count}
      </p> */}


    </>
  )
}
