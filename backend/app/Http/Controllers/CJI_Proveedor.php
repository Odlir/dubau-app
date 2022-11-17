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

        return response()->json($consulta1, 200);
    }
}
