import {
  Lucide,
} from "@/base-components";


export const Pagination = ({ activePage, count, rowsPerPage, totalPages, setActivePage }) => {

  var beginning = activePage === 1 ? 1 : rowsPerPage * (activePage - 1) + 1
  var end = activePage === totalPages ? count : Number(beginning) + Number(rowsPerPage) - 1

  return (
    <>
        <div className="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center">
          <nav className="w-full sm:w-auto sm:mr-auto">
            <ul className="pagination">
              <li className="page-item" >
                
                <button  className="page-link cursor-pointer"  disabled={activePage === 1} onClick={() => setActivePage(1)}>
                  <Lucide icon="ChevronsLeft" className="w-4 h-4" />
                </button>

              </li>
              <li className="page-item" >
                
                <button className="page-link cursor-pointer" disabled={activePage === 1} onClick={() => setActivePage(activePage - 1)}>
                  <Lucide icon="ChevronLeft" className="w-4 h-4" />
                </button>
              </li>
            
              <li className="page-item" >
                <button  className="page-link cursor-pointer" disabled={activePage === totalPages} onClick={() => setActivePage(activePage + 1)}>
                    <Lucide icon="ChevronRight" className="w-4 h-4" />
                </button>


              </li>
              <li className="page-item" >
          
                <button  className="page-link cursor-pointer"  disabled={activePage === totalPages} onClick={() => setActivePage(totalPages)}>
                    <Lucide icon="ChevronsRight" className="w-4 h-4" />
                </button>

              </li>
            </ul>
          </nav>
     
        </div>
    </>
  )
}
