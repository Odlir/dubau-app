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
                $accion         =
                                    '<div className="flex justify-center items-center">'.
                                    '<a className="flex items-center mr-3" href="#">'.
                                    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide block mx-auto"><circle cx="9" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M2 2H4.5L7.62 14.49A2 2 0 0 0 9.56 16h8.88a2 2 0 0 0 1.94-1.51L22 8H6"></path></svg>'.
                                    'Precios</a>'.
                                    '<a className="flex items-center mr-3" href="#">'.
                                    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide w-4 h-4 mr-1"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>'.
                                    'Edit</a>'.
                                    '<a className="flex items-center text-danger"href="#" >'.
                                    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide w-4 h-4 mr-1"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>'.
                                    'Delete</a>'.
                                    '</div>';

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
