
export const PagCabecera = ({ activePage, count, rowsPerPage, totalPages, setActivePage }) => {

  var beginning = activePage === 1 ? 1 : rowsPerPage * (activePage - 1) + 1
  var end = activePage === totalPages ? count : Number(beginning) + Number(rowsPerPage) - 1

  return (
    <>

        <div className="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center">
          <div className="hidden md:block mx-auto text-slate-500">
            Mostrando del {beginning === end ? end : `${beginning} hasta ${end}`} de {count} registros
          </div>
        </div>

        <div className="hidden md:block mx-auto text-slate-500">
            Pagina {activePage} de {totalPages}
        </div>
    </>
  )
}
