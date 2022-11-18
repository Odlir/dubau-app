import {
    Lucide,
    Tippy,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownContent,
    DropdownItem,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    TabGroup,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    TomSelect,
    Highlight,
  } from "@/base-components";
  import { faker as $f } from "@/utils";
  import * as $_ from "lodash";
  import classnames from "classnames";
  import { useState } from "react";

  import "./styles.css";

  import TablaMain from "./TablaMain";


  function Main() {

    const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
    const [headerFooterModalPreview, setHeaderFooterModalPreview] = useState(false);

    /* TIPO EMPRESA*/
    const [selectTipo_Codigo_EMP, setSelectTipo_Codigo_EMP] = useState("0");
    const [selectSectorComercial_EMP, setSelectSectorComercial_EMP] = useState("0");
    const [selectDepartamento_EMP, setSelectDepartamento_EMP] = useState("0");
    const [selectProvincia_EMP, setSelectProvincia_EMP] = useState("0");
    const [selectDistrito_EMP, setSelectDistrito_EMP] = useState("0");


    /* TIPO PERSONA*/
      const [selectTipo_Codigo_PER, setSelectTipo_Codigo_PER] = useState("0");
      const [selectNacionalidad_PER, setSelectNacionalidad_PER] = useState("0");
      const [selectSexo_PER, setSelectSexo_PER] = useState("0");
      const [selectEstadoCivil_PER, setSelectEstadoCivil_PER] = useState("0");

      const [selectDepartamento_PER, setSelectDepartamento_PER] = useState("0");
      const [selectProvincia_PER, setSelectProvincia_PER] = useState("0");
      const [selectDistrito_PER, setSelectDistrito_PER] = useState("0");

      const [selected, setSelected] = useState("");

      
      const changeHandlerTipoPersona = e => {
        setSelected(e.target.value);
      };


      

    return (
      <>
            <h2 className="intro-y text-lg font-medium mt-10">Proveedores</h2>
            <div className="grid grid-cols-12 gap-6 mt-5">
              <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">
                <button className="btn btn-primary shadow-md mr-2" onClick={()=> {setHeaderFooterModalPreview(true);}}>
                  Agregar a un nuevo Proveedor
                </button>
                <Dropdown>
                  <DropdownToggle className="btn px-2 box">
                    <span className="w-5 h-5 flex items-center justify-center">
                      <Lucide icon="Plus" className="w-4 h-4" />
                    </span>
                  </DropdownToggle>
                  <DropdownMenu className="w-40">
                    <DropdownContent>
                      <DropdownItem>
                        <Lucide icon="Printer" className="w-4 h-4 mr-2" /> Imprimir
                      </DropdownItem>
                      <DropdownItem>
                        <Lucide icon="FileText" className="w-4 h-4 mr-2" /> Exportar a
                        Excel
                      </DropdownItem>
                      <DropdownItem>
                        <Lucide icon="FileText" className="w-4 h-4 mr-2" /> Exportar a
                        PDF
                      </DropdownItem>
                    </DropdownContent>
                  </DropdownMenu>
                </Dropdown>
              </div>

              {/* BEGIN: Data List */}

                <TablaMain/>

              {/* END: Data List */}


            </div>

            {/* BEGIN: Delete Confirmation Modal */}
            <Modal
              show={deleteConfirmationModal}
              onHidden={() => {
                setDeleteConfirmationModal(false);
              }}
            >
              <ModalBody className="p-0">
                <div className="p-5 text-center">
                    <Lucide
                      icon="XCircle"
                      className="w-16 h-16 text-danger mx-auto mt-3"
                    />
                    <div className="text-3xl mt-5">Are you sure?</div>
                    <div className="text-slate-500 mt-2">
                      Do you really want to delete these records? <br />
                      This process cannot be undone.
                    </div>
                </div>
                <div className="px-5 pb-8 text-center">
                    <button
                      type="button"
                      onClick={() => {
                        setDeleteConfirmationModal(false);
                      }}
                      className="btn btn-outline-secondary w-24 mr-1"
                    >
                      Cancel
                    </button>
                    <button type="button" className="btn btn-danger w-24">
                      Delete
                    </button>
                </div>
              </ModalBody>
            </Modal>
            {/* END: Delete Confirmation Modal */}


            {/* BEGIN: Modal Content */}
              <form>

                  <Modal size="modal-xl" backdrop="static" show={headerFooterModalPreview} onHidden={()=> {
                      setHeaderFooterModalPreview(false);
                      }}
                      >
                      <ModalHeader>
                          <h2 className="font-medium text-base mr-auto">
                              Crear Proveedor
                          </h2>
                          <button className="btn btn-outline-secondary hidden sm:flex">
                              <Lucide icon="File" className="w-4 h-4 mr-2" />{" "}
                              Descargar
                          </button>
                          <Dropdown className="sm:hidden">
                              <DropdownToggle className="w-5 h-5 block" href="#">
                                  <Lucide icon="MoreHorizontal" className="w-5 h-5 text-slate-500" />
                              </DropdownToggle>
                              <DropdownMenu className="w-40">
                                  <DropdownContent>
                                      <DropdownItem>
                                          <Lucide icon="File" className="w-4 h-4 mr-2" />
                                          Download Docs
                                      </DropdownItem>
                                  </DropdownContent>
                              </DropdownMenu>
                          </Dropdown>
                      </ModalHeader>
                      <ModalBody >

                        <TabGroup>
                            <TabList className="nav-boxed-tabs">
                                <Tab className="w-full py-2" tag="button">General</Tab>
                                <Tab className="w-full py-2" tag="button">Sucursales</Tab>
                                <Tab className="w-full py-2" tag="button">Contactos</Tab>
                            </TabList>
                            <TabPanels className="mt-5">
                                <TabPanel className="leading-relaxed">

                                              <div className="col-span-12 sm:col-span-12">
                                                  <label htmlFor="modal-form-1" className="form-label">
                                                    Tipo Persona <span className="text-red-600" >*</span> 
                                                  </label>
                                                  <div className="flex flex-col sm:flex-row mt-2">
                                                      <div className="form-check mr-2">
                                                        <input
                                                              className="form-check-input"
                                                              type="radio"
                                                              name="tipo_persona"
                                                              value="0"
                                                              id="tipo_natural"
                                                              checked={selected === "0"}
                                                              onChange={changeHandlerTipoPersona}
                                                        />
                                                        <label
                                                          className="form-check-label"
                                                          htmlFor="tipo_natural"
                                                        >
                                                          Persona Natural
                                                        </label>
                                                      </div>
                                                      <div className="form-check mr-2 mt-2 sm:mt-0">
                                                        <input
                                                          className="form-check-input"
                                                          type="radio"
                                                          value="1"
                                                          id="tipo_empresa"
                                                          checked={selected === "1"}
                                                          name="tipo_persona"
                                                          onChange={changeHandlerTipoPersona}
                                                        />
                                                        <label
                                                          className="form-check-label"
                                                          htmlFor="tipo_empresa"
                                                        >
                                                          Persona Jurídica
                                                        </label>
                                                      </div>
                                                  </div>
                                              </div>

                                              <br />
                                              <br />

                                              <div  aria-hidden={selected !== "0" ? true : false}>

                                                    <div className="grid grid-cols-12 gap-4 gap-y-3">

                                                          <div className="col-span-12 sm:col-span-6">
                                                            <label htmlFor="modal-form-2" className="form-label">
                                                                Tipo de documento <span className="text-red-600" >*</span> 
                                                            </label>
                                                            <TomSelect
                                                              value={selectTipo_Codigo_PER}
                                                              onChange={setSelectTipo_Codigo_PER}
                                                              options={{
                                                                placeholder: "SELECCIONE TIPO DE DOCUMENTO",
                                                              }}
                                                              className="w-full"
                                                              id="tipo_doc_per" name="tipo_doc_per"
                                                            >
                                                              <option value="0">::Seleccione::</option>
                                                              <option value="1">DNI</option>
                                                              <option value="2">CE</option>
                                                            </TomSelect>
                                                          </div>
                                                          <div className="col-span-12 sm:col-span-6">
                                                            <label htmlFor="modal-form-3" className="form-label">
                                                                Nombres <span className="text-red-600" >*</span> 
                                                            </label>
                                                            <input
                                                              id="nombre_per"
                                                              name="nombre_per"
                                                              type="text"
                                                              className="form-control"
                                                              placeholder="INGRESE NOMBRE"
                                                            />
                                                          </div>
                                                          <div className="col-span-12 sm:col-span-6">
                                                            <label htmlFor="modal-form-3" className="form-label">
                                                                Apellido Paterno <span className="text-red-600" >*</span> 
                                                            </label>
                                                            <input
                                                              id="apellido_parterno_per"
                                                              name="apellido_parterno_per"
                                                              type="text"
                                                              className="form-control"
                                                              placeholder="INGRESE APELLIDO PATERNO"
                                                            />
                                                          </div>
                                                          <div className="col-span-12 sm:col-span-6">
                                                            <label htmlFor="modal-form-3" className="form-label">
                                                                Apellido Materno <span className="text-red-600" >*</span> 
                                                            </label>
                                                            <input
                                                              id="apellido_materno_per"
                                                              name="apellido_materno_per"
                                                              type="text"
                                                              className="form-control"
                                                              placeholder="INGRESE APELLIDO MATERNO"
                                                            />
                                                          </div>

                                                          <div className="col-span-12 sm:col-span-6">
                                                            <label htmlFor="modal-form-3" className="form-label">
                                                                Apellido Materno <span className="text-red-600" >*</span> 
                                                            </label>
                                                            <input
                                                              id="apellido_materno_per"
                                                              name="apellido_materno_per"
                                                              type="text"
                                                              className="form-control"
                                                              placeholder="INGRESE APELLIDO MATERNO"
                                                            />
                                                          </div>

                                                          <div className="col-span-12 sm:col-span-6">
                                                            <label htmlFor="modal-form-5" className="form-label">
                                                              Nacionalidad
                                                            </label>

                                                            <TomSelect
                                                              value={selectNacionalidad_PER}
                                                              onChange={setSelectNacionalidad_PER}
                                                              options={{
                                                                placeholder: "SELECCIONE NACIONALIDAD",
                                                              }}
                                                              className="w-full"
                                                              id="nacionalidad_per"
                                                              name="nacionalidad_per"
                                                            >
                                                                <option value="0">::Seleccione::</option>	
                                                                <option value="2">MADERA</option>
                                                                <option value="3">METALMECANICA</option>
                                                                <option value="1">TRANSPORTE</option>
                                                            </TomSelect>
                                                          </div>
                                                          <div className="col-span-12 sm:col-span-6">
                                                            <label htmlFor="modal-form-4" className="form-label">
                                                              Número de Documento	<span className="text-red-600" >*</span> 	
                                                            </label>
                                                            <input
                                                              id="num_doc_per"
                                                              name="num_doc_per"
                                                              type="text"
                                                              className="form-control"
                                                              placeholder="INGRESE NÚMERO DE DOCUMENTO"
                                                            />
                                                          </div>

                                                          <div className="col-span-12 sm:col-span-6">
                                                            <label htmlFor="modal-form-4" className="form-label">
                                                              Lugar de Nacimiento <span className="text-red-600" >*</span> 		<span className="text-yellow-600" >( Departamento , Provincia , Distrito  )</span> 	
                                                            </label>
                                                            <input
                                                              id="num_doc_per"
                                                              name="num_doc_per"
                                                              type="text"
                                                              className="form-control"
                                                              placeholder="INGRESE LUGAR DE NACIMIENTO"
                                                            />
                                                          </div>

                                                          <div className="col-span-12 sm:col-span-6">
                                                            <label htmlFor="modal-form-5" className="form-label">
                                                              Sexo (*) <span className="text-red-600" >* </span> 	
                                                            </label>

                                                            <TomSelect
                                                              value={selectSexo_PER}
                                                              onChange={setSelectSexo_PER}
                                                              options={{
                                                                placeholder: "SELECCIONE SECTOR COMERCIAL",
                                                              }}
                                                              className="w-full"
                                                              id="sexo_per"
                                                              name="sexo_per"
                                                            >
                                                                <option value="0">::Seleccione::</option>	
                                                                <option value="1">MASCULINO</option>
                                                                <option value="2">FEMENINO</option>
                                                            </TomSelect>
                                                          </div>

                                                          <div className="col-span-12 sm:col-span-6">
                                                            <label htmlFor="modal-form-5" className="form-label">
                                                            Estado Civil	 (*) <span className="text-red-600" >* </span> 	
                                                            </label>

                                                            <TomSelect
                                                              value={selectEstadoCivil_PER}
                                                              onChange={setSelectEstadoCivil_PER}
                                                              options={{
                                                                placeholder: "SELECCIONE SECTOR COMERCIAL",
                                                              }}
                                                              className="w-full"
                                                              id="estado_civil_per"
                                                              name="estado_civil_per"
                                                            >
                                                                  <option value="0">::Seleccione::</option>
                                                                  <option value="2">CASADO</option>
                                                                  <option value="5">CONVIVIENTE</option>
                                                                  <option value="4">DIVORCIADO</option>
                                                                  <option value="7">NO REGISTRADO</option>
                                                                  <option value="1">SOLTERO</option>
                                                                  <option value="3">VIUDO</option>
                                                            </TomSelect>
                                                          </div>

                                                          <div className="col-span-12 sm:col-span-6">
                                                            <label htmlFor="modal-form-5" className="form-label">
                                                              Departamento
                                                            </label>

                                                            <TomSelect
                                                              value={selectDepartamento_PER}
                                                              onChange={setSelectDepartamento_PER}
                                                              options={{
                                                                placeholder: "SELECCIONE DEPARTAMENTO",
                                                              }}
                                                              className="w-full"
                                                              id="departamento_per"
                                                              name="departamento_per"
                                                            >
                                                                <option value="0">::Seleccione::</option>	
                                                                <option value="2">MADERA</option>
                                                                <option value="3">METALMECANICA</option>
                                                                <option value="1">TRANSPORTE</option>
                                                            </TomSelect>
                                                          </div>
                                                          <div className="col-span-12 sm:col-span-6">
                                                            <label htmlFor="modal-form-5" className="form-label">
                                                              Provincia
                                                            </label>

                                                            <TomSelect
                                                              value={selectProvincia_PER}
                                                              onChange={setSelectProvincia_PER}
                                                              options={{
                                                                placeholder: "SELECCIONE PROVINCIA",
                                                              }}
                                                              className="w-full"
                                                                
                                                              id="provincia_per"
                                                              name="provincia_per"
                                                            >
                                                                <option value="0">::Seleccione::</option>	
                                                                <option value="2">MADERA</option>
                                                                <option value="3">METALMECANICA</option>
                                                                <option value="1">TRANSPORTE</option>
                                                            </TomSelect>
                                                          </div>
                                                          <div className="col-span-12 sm:col-span-6">
                                                            <label htmlFor="modal-form-5" className="form-label">
                                                              Distrito
                                                            </label>

                                                            <TomSelect
                                                              value={selectDistrito_PER}
                                                              onChange={setSelectDistrito_PER}
                                                              options={{
                                                                placeholder: "SELECCIONE DISTRITO",
                                                              }}
                                                              className="w-full"
                                                              
                                                              id="distrito_per"
                                                              name="distrito_per"
                                                            >
                                                                <option value="0">::Seleccione::</option>	
                                                                <option value="2">MADERA</option>
                                                                <option value="3">METALMECANICA</option>
                                                                <option value="1">TRANSPORTE</option>
                                                            </TomSelect>
                                                          </div>
                                                          <div className="col-span-12 sm:col-span-6">
                                                            <label htmlFor="modal-form-4" className="form-label">
                                                              Dirección fiscal	<span className="text-yellow-600" >TIPO VIA / NOMBRE VIA / N° / INTERIOR / ZONA	</span> 
                                                            </label>
                                                            <input
                                                              type="text"
                                                              className="form-control"
                                                              placeholder="INGRESE DIREECIÓN FISCAL"
                                                              id="direc_fiscal_per"
                                                              name="direc_fiscal_per"
                                                            />
                                                          </div>


                                                          <div className="col-span-12 sm:col-span-6">
                                                            <label htmlFor="modal-form-4" className="form-label">
                                                            Teléfono	
                                                            </label>
                                                            <input
                                                              id="telefono_per"
                                                              name="telefono_per"
                                                              type="text"
                                                              className="form-control"
                                                              placeholder="INGRESE TELÉFONO"
                                                            />
                                                          </div>
                                                          <div className="col-span-12 sm:col-span-6">
                                                            <label htmlFor="modal-form-4" className="form-label">
                                                            Móvil	
                                                            </label>
                                                            <input
                                                              id="movil_per"
                                                              name="movil_per"
                                                              type="text"
                                                              className="form-control"
                                                              placeholder="INGRESE MOVIL"
                                                            />
                                                          </div>
                                                          <div className="col-span-12 sm:col-span-6">
                                                            <label htmlFor="modal-form-4" className="form-label">
                                                            Fax	
                                                            </label>
                                                            <input
                                                              id="fax_per"
                                                              name="fax_per"
                                                              type="text"
                                                              className="form-control"
                                                              placeholder="INGRESE FAX"
                                                            />
                                                          </div>
                                                          <div className="col-span-12 sm:col-span-6">
                                                            <label htmlFor="modal-form-4" className="form-label">
                                                            Correo electrónico		
                                                            </label>
                                                            <input
                                                              id="correo_elect_per"
                                                              name="correo_elect_per"                                            
                                                              type="text"
                                                              className="form-control"
                                                              placeholder="INGRESE CORREO ELECTRÓNICO"
                                                            />
                                                          </div>         
                                                          <div className="col-span-12 sm:col-span-6">
                                                            <label htmlFor="modal-form-4" className="form-label">
                                                            Dirección web		
                                                            </label>
                                                            <input
                                                              id="direc_web_per"
                                                              name="direc_web_per"  
                                                              type="text"
                                                              className="form-control"
                                                              placeholder="INGRESE DIRECCIÓN WEB"
                                                            />
                                                          </div>
                                                            
                                                          <div className="col-span-12 sm:col-span-6">
                                                            <label htmlFor="modal-form-4" className="form-label">
                                                            Cta. Cte. Soles		
                                                            </label>
                                                            <input
                                                              id="cta_cte_sol_per"
                                                              name="cta_cte_sol_per"  
                                                              type="text"
                                                              className="form-control"
                                                              placeholder="INGRESE CUENTA CORRENTE EN SOLES"
                                                            />
                                                          </div>
                                                          <div className="col-span-12 sm:col-span-6">
                                                            <label htmlFor="modal-form-4" className="form-label">
                                                            Cta. Cte. Dolares	
                                                            </label>
                                                            <input
                                                              id="cta_cte_dolar_per"
                                                              name="cta_cte_dolar_per"  
                                                              type="text"
                                                              className="form-control"
                                                              placeholder="INGRESE CUENTA CORRIENTE EN DOLARES"
                                                            />
                                                          </div>
                                                    </div>

                                              </div>

                                              <div  aria-hidden={selected !== "1" ? true : false}>

                                                    <div className="grid grid-cols-12 gap-4 gap-y-3">

                                                          <div className="col-span-12 sm:col-span-6">
                                                            <label htmlFor="modal-form-2" className="form-label">
                                                                Tipo de Código <span className="text-red-600" >*</span> 
                                                            </label>
                                                            <TomSelect
                                                              value={selectTipo_Codigo_EMP}
                                                              onChange={setSelectTipo_Codigo_EMP}
                                                              options={{
                                                                placeholder: "SELECCIONE TIPO DE CÓDIGO",
                                                              }}
                                                              className="w-full"
                                                              id="tipo_cod_emp" name="tipo_cod_emp"
                                                            >
                                                              <option value="0">::Seleccione::</option>
                                                              <option value="1">NIC.</option>
                                                              <option value="2">RUC.</option>
                                                            </TomSelect>
                                                          </div>
                                                          <div className="col-span-12 sm:col-span-6">
                                                            <label htmlFor="modal-form-3" className="form-label">
                                                                RUC / NIC <span className="text-red-600" >*</span> 
                                                            </label>
                                                            <input
                                                              id="nr_doc_emp"
                                                              name="nr_doc_emp"
                                                              type="text"
                                                              className="form-control"
                                                              placeholder="INGRESE NÚMERO DE DOCUMENTO"
                                                            />
                                                          </div>
                                                          <div className="col-span-12 sm:col-span-6">
                                                            <label htmlFor="modal-form-4" className="form-label">
                                                                Nombre o Razón Social <span className="text-red-600" >*</span> 	
                                                            </label>
                                                            <input
                                                              id="nom_rz_soc_emp"
                                                              name="nom_rz_soc_emp"
                                                              type="text"
                                                              className="form-control"
                                                              placeholder="INGRESE NOMBRE O RAZÓN SOCIAL"
                                                            />
                                                          </div>
                                                          <div className="col-span-12 sm:col-span-6">
                                                            <label htmlFor="modal-form-5" className="form-label">
                                                              Sector Comercial
                                                            </label>
                                                          
                                                            <TomSelect
                                                              value={selectSectorComercial_EMP}
                                                              onChange={setSelectSectorComercial_EMP}
                                                              options={{
                                                                placeholder: "SELECCIONE SECTOR COMERCIAL",
                                                              }}
                                                              className="w-full"
                                                              id="sector_comer_emp"
                                                              name="sector_comer_emp"
                                                            >
                                                                <option value="0">::Seleccione::</option>	
                                                                <option value="2">MADERA</option>
                                                                <option value="3">METALMECANICA</option>
                                                                <option value="1">TRANSPORTE</option>
                                                            </TomSelect>
                                                          </div>


                                                          <div className="col-span-12 sm:col-span-6">
                                                            <label htmlFor="modal-form-5" className="form-label">
                                                              Departamento
                                                            </label>
                                                          
                                                            <TomSelect
                                                              value={selectDepartamento_EMP}
                                                              onChange={setSelectDepartamento_EMP}
                                                              options={{
                                                                placeholder: "SELECCIONE DEPARTAMENTO",
                                                              }}
                                                              className="w-full"
                                                              id="departamento_emp"
                                                              name="departamento_emp"
                                                            >
                                                                <option value="0">::Seleccione::</option>	
                                                                <option value="2">MADERA</option>
                                                                <option value="3">METALMECANICA</option>
                                                                <option value="1">TRANSPORTE</option>
                                                            </TomSelect>
                                                          </div>
                                                          <div className="col-span-12 sm:col-span-6">
                                                            <label htmlFor="modal-form-5" className="form-label">
                                                              Provincia
                                                            </label>
                                                          
                                                            <TomSelect
                                                              value={selectProvincia_EMP}
                                                              onChange={setSelectProvincia_EMP}
                                                              options={{
                                                                placeholder: "SELECCIONE PROVINCIA",
                                                              }}
                                                              className="w-full"
                                                                
                                                              id="provincia_emp"
                                                              name="provincia_emp"
                                                            >
                                                                <option value="0">::Seleccione::</option>	
                                                                <option value="2">MADERA</option>
                                                                <option value="3">METALMECANICA</option>
                                                                <option value="1">TRANSPORTE</option>
                                                            </TomSelect>
                                                          </div>
                                                          <div className="col-span-12 sm:col-span-6">
                                                            <label htmlFor="modal-form-5" className="form-label">
                                                              Distrito
                                                            </label>
                                                          
                                                            <TomSelect
                                                              value={selectDistrito_EMP}
                                                              onChange={setSelectDistrito_EMP}
                                                              options={{
                                                                placeholder: "SELECCIONE DISTRITO",
                                                              }}
                                                              className="w-full"
                                                              
                                                              id="distrito_emp"
                                                              name="distrito_emp"
                                                            >
                                                                <option value="0">::Seleccione::</option>	
                                                                <option value="2">MADERA</option>
                                                                <option value="3">METALMECANICA</option>
                                                                <option value="1">TRANSPORTE</option>
                                                            </TomSelect>
                                                          </div>
                                                          <div className="col-span-12 sm:col-span-6">
                                                            <label htmlFor="modal-form-4" className="form-label">
                                                              Dirección fiscal	<span className="text-yellow-600" >TIPO VIA / NOMBRE VIA / N° / INTERIOR / ZONA	</span> 
                                                            </label>
                                                            <input
                                                              type="text"
                                                              className="form-control"
                                                              placeholder="INGRESE DIREECIÓN FISCAL"
                                                              id="direc_fiscal_emp"
                                                              name="direc_fiscal_emp"
                                                            />
                                                          </div>


                                                          <div className="col-span-12 sm:col-span-6">
                                                            <label htmlFor="modal-form-4" className="form-label">
                                                            Teléfono	
                                                            </label>
                                                            <input
                                                              id="telefono_emp"
                                                              name="telefono_emp"
                                                              type="text"
                                                              className="form-control"
                                                              placeholder="INGRESE TELÉFONO"
                                                            />
                                                          </div>
                                                          <div className="col-span-12 sm:col-span-6">
                                                            <label htmlFor="modal-form-4" className="form-label">
                                                            Móvil	
                                                            </label>
                                                            <input
                                                              id="movil_emp"
                                                              name="movil_emp"
                                                              type="text"
                                                              className="form-control"
                                                              placeholder="INGRESE MOVIL"
                                                            />
                                                          </div>
                                                          <div className="col-span-12 sm:col-span-6">
                                                            <label htmlFor="modal-form-4" className="form-label">
                                                            Fax	
                                                            </label>
                                                            <input
                                                              id="fax_emp"
                                                              name="fax_emp"
                                                              type="text"
                                                              className="form-control"
                                                              placeholder="INGRESE FAX"
                                                            />
                                                          </div>
                                                          <div className="col-span-12 sm:col-span-6">
                                                            <label htmlFor="modal-form-4" className="form-label">
                                                            Correo electrónico		
                                                            </label>
                                                            <input
                                                              id="correo_elect_emp"
                                                              name="correo_elect_emp"                                            
                                                              type="text"
                                                              className="form-control"
                                                              placeholder="INGRESE CORREO ELECTRÓNICO"
                                                            />
                                                          </div>         
                                                          <div className="col-span-12 sm:col-span-6">
                                                            <label htmlFor="modal-form-4" className="form-label">
                                                            Dirección web		
                                                            </label>
                                                            <input
                                                              id="direc_web_emp"
                                                              name="direc_web_emp"  
                                                              type="text"
                                                              className="form-control"
                                                              placeholder="INGRESE DIRECCIÓN WEB"
                                                            />
                                                          </div>
                                                            
                                                          <div className="col-span-12 sm:col-span-6">
                                                            <label htmlFor="modal-form-4" className="form-label">
                                                            Cta. Cte. Soles		
                                                            </label>
                                                            <input
                                                              id="cta_cte_sol_emp"
                                                              name="cta_cte_sol_emp"  
                                                              type="text"
                                                              className="form-control"
                                                              placeholder="INGRESE CUENTA CORRENTE EN SOLES"
                                                            />
                                                          </div>
                                                          <div className="col-span-12 sm:col-span-6">
                                                            <label htmlFor="modal-form-4" className="form-label">
                                                            Cta. Cte. Dolares	
                                                            </label>
                                                            <input
                                                              id="cta_cte_dolar_emp"
                                                              name="cta_cte_dolar_emp"  
                                                              type="text"
                                                              className="form-control"
                                                              placeholder="INGRESE CUENTA CORRIENTE EN DOLARES"
                                                            />
                                                          </div>
                                                      
                                                    </div>

                                              </div>

                                </TabPanel>
                                <TabPanel className="leading-relaxed">
                                    2  .
                                </TabPanel>
                                <TabPanel className="leading-relaxed">
                                    3  .
                                </TabPanel>
                            </TabPanels>
                        </TabGroup>

                      </ModalBody>
                      <ModalFooter>
                          <button type="button"
                              onClick={()=> { setHeaderFooterModalPreview(false); }}
                              className="btn btn-outline-secondary w-20 mr-1"
                              >
                              Cancelar
                          </button>
                          <button type="button" className="btn btn-primary w-20">
                              Grabar
                          </button>
                      </ModalFooter>
                  </Modal>

              </form>
            {/* END: Modal Content */}

      </>
    );
  }

  export default Main;
