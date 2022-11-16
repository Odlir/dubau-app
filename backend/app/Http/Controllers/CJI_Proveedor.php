<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CJI_Proveedor extends Controller
{
    //

    public function index()
    {

        // $data = DB::select('SELECT * FROM podst where id=1');

        // $data = DB::select('SELECT * FROM podst where id=?',[1]);

        // $data = DB::select('SELECT * FROM podst where id=:id',['id'=>1]);


        // $insertar= DB::insert('INSERT INTO post
        // (title, excertp, body, image_path, is published, min_to_read)
        // VALUES(?,?,?,?,?,?)',[
        //     'Test','test','test','test',true, 1
        // ]);


        // $update= DB::update('UPDATE post set body = ? where id=?',[
        //     'Body 2', 203
        // ]);

        // $delete = DB::delete('DELETE  FROM post where id= ?',[203]);
        $compania = 1;
        $COMPARTIR_PROVCOMPANIA =1;
        if($COMPARTIR_PROVCOMPANIA==1){
            $provedorcompania="";
        }else{
                $provedorcompania=  "and cc.COMPP_Codigo=".$compania." ";
        };


        $consulta1 = DB::table('cji_proveedorcompania as pc')
                    ->select(
                        'prov.PROVP_Codigo as PROVP_Codigo',
                        'prov.EMPRP_Codigo as EMPRP_Codigo',
                        'prov.PERSP_Codigo as PERSP_Codigo',
                        'prov.PROVC_TipoPersona as PROVC_TipoPersona',
                        'pc.COMPP_Codigo as COMPP_Codigo',
                        'concat(pers.PERSC_Nombre," ",pers.PERSC_ApellidoPaterno) as nombre',
                        'pers.PERSC_Ruc as ruc',
                        'pers.PERSC_NumeroDocIdentidad as dni',
                        'pers.PERSC_Telefono as telefono',
                        'pers.PERSC_Fax as fax',
                        'pers.PERSC_Movil as movil',
                        'pers.PERSC_CtaCteSoles as ctactedoles',
                        'pers.PERSC_CtaCteDolares as ctactedolares'
                            )
                    ->join('cji_proveedor as prov', 'prov.PROVP_Codigo', '=', 'pc.PROVP_Codigo')
                    ->join('cji_persona as pers', 'prov.PERSP_Codigo', '=', 'pers.PERSP_Codigo')
                    ->where('prov.PROVC_TipoPersona', 0)
                    ->where('prov.PROVC_FlagEstado', 1)
                    ->where('prov.PROVP_Codigo', '<>', 0)
                    ->whereRaw($provedorcompania)
                    ->get();


        $data = DB::table('cji_proveedorcompania as pc')
            ->select(
                        'prov.PROVP_Codigo as PROVP_Codigo',
                        'prov.EMPRP_Codigo as EMPRP_Codigo',
                        'prov.PERSP_Codigo as PERSP_Codigo',
                        'prov.PROVC_TipoPersona as PROVC_TipoPersona',
                        'pc.COMPP_Codigo as COMPP_Codigo',
                        'emp.EMPRC_RazonSocial as nombre',
                        'emp.EMPRC_Ruc as ruc',
                        '"" as dni',
                        'emp.EMPRC_Telefono telefono',
                        'emp.EMPRC_Fax fax',
                        'emp.EMPRC_Movil movil',
                        'emp.EMPRC_CtaCteSoles ctactesoles',
                        'emp.EMPRC_CtaCteDolares ctactedolares'
                    )
            ->join('cji_proveedor as prov', 'prov.PROVP_Codigo', '=', 'pc.PROVP_Codigo')
            ->join('cji_empresa as emp', 'prov.EMPRP_Codigo', '=', 'emp.EMPRP_Codigo')
            ->where('prov.PROVC_TipoPersona', 1)
            ->where('prov.PROVC_FlagEstado', 1)
            ->where('prov.PROVP_Codigo', '<>', 0)
            ->whereRaw($provedorcompania)
            ->union($consulta1)
            ->orderBy('nombre', 'desc')
            ->get();


            return $data;


    }
}
