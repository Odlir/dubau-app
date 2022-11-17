<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class CJI_Proveedor extends Controller
{

    public function index()
    {
        $consulta1 = DB::table('cji_proveedorcompania as pc')
            ->select(
                'prov.PROVP_Codigo as PROVP_Codigo',
                'prov.EMPRP_Codigo as EMPRP_Codigo',
                'prov.PERSP_Codigo as PERSP_Codigo',
                'prov.PROVC_TipoPersona as PROVC_TipoPersona',
                'pc.COMPP_Codigo as COMPP_Codigo',
                'pers.PERSC_Ruc as ruc',
                'pers.PERSC_NumeroDocIdentidad as dni',
                'pers.PERSC_Telefono as telefono',
                'pers.PERSC_Fax as fax',
                'pers.PERSC_Movil as movil',
                'pers.PERSC_CtaCteSoles as ctactedoles',
                'pers.PERSC_CtaCteDolares as ctactedolares'
            )
            ->selectRaw('concat(pers.PERSC_Nombre," ",pers.PERSC_ApellidoPaterno) as nombre')
            ->join('cji_proveedor as prov', 'prov.PROVP_Codigo', '=', 'pc.PROVP_Codigo')
            ->join('cji_persona as pers', 'prov.PERSP_Codigo', '=', 'pers.PERSP_Codigo')
            ->where('prov.PROVC_TipoPersona', 0)
            ->where('prov.PROVC_FlagEstado', 1)
            ->where('prov.PROVP_Codigo', '<>', 0)
            ->get();

            $item            = 1;
            $lista           = array();

            foreach( $consulta1 as $indice=>$valor ) {
                $codigo         = $valor->PROVP_Codigo;
                $ruc            = $valor->ruc;
                $dni            = $valor->dni;
                $razon_social   = $valor->nombre;
                $tipo_proveedor = $valor->PROVC_TipoPersona==1?"P.JURIDICA":"P.NATURAL";
                $telefono       = $valor->telefono;
                $movil          = $valor->movil;
                $accion         = `

                <a className="flex items-center mr-3" href="#">
                    <Lucide icon="CheckSquare" className="w-4 h-4 mr-1" />{" "}
                    Edit
                </a>
                <a
                        className="flex items-center text-danger"
                        href="#"
                        onClick={() => {
                        setDeleteConfirmationModal(true);
                        }}
                >
                        <Lucide icon="Trash2" className="w-4 h-4 mr-1" /> Delete
                </a>

                `;
                // $precio         = "<a href='#' id='precio_New' onclick='precio_proveedor(".$codigo.")'><img src='".base_url()."images/dolar.png' width='16' height='16' border='0' title='Precio' ></a>";
                // $editar         = "<a href='#' onclick='editar_proveedor(".$codigo.")'><img src='".base_url()."images/modificar.png' width='16' height='16' border='0' title='Modificar'></a>";
                // $ver            = "<a href='#' onclick='ver_proveedor(".$codigo.")'><img src='".base_url()."images/ver.png' width='16' height='16' border='0' title='Modificar'></a>";
                // $eliminar       = "<a href='#' onclick='eliminar_proveedor(".$codigo.")'><img src='".base_url()."images/eliminar.png' width='16' height='16' border='0' title='Modificar'></a>";


                $lista[]        = array("id" => $item,
                                        "ruc" => $ruc,
                                        "dni" => $dni,
                                        "nombre" => $razon_social,
                                        "tipo_proveedor" => $tipo_proveedor,
                                        "telefono" => $telefono,
                                        "movil" => $movil,
                                        "accion" => $accion,
                                    );
                $item++;
            }


            return response()->json($lista, 200);





    }
}
