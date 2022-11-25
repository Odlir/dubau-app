<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User2;
use Illuminate\Support\Facades\DB;
class AuthController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login','register','list','verifyUser']]);
    }

    public function ruta()
    {
        echo 'wee';
        return response()->json([
            'status' => 'success',
            'user' => 'Holaaaaaa',
        ]);
    }

    public function list()
    {
        //$user = DB::table('cji_usuario')->get();
        $user = User2::all();
        sleep(1);
       return $user;
    }

    public function verifyUser(Request $request)
    {
        DB::table('cji_usuario')
            ->where('PERSP_Codigo', $request->PERSP_Codigo)
            ->update([
                'cji_usuario_estadoVerificado' => $request->cji_usuario_estadoVerificado
            ]);
    }


    public function login(Request $request)
    {
        auth()->shouldUse('api');
        $user = User2::where('USUA_usuario', $request->all()['USUA_usuario'])->first();
        // Check Password
        if (!$user || !Hash::check($request->all()['USUA_Password'], $user->USUA_Password)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized',
            ], 401);
        }

        $token = Auth::login($user);
        return response()->json([
            'status' => 'success',
            'user' => $user,
            'authorisation' => [
                'token' => $token,
                'type' => 'bearer',
            ]
        ]);
    }

    public function register(Request $request){
        $request->validate([
            'USUA_usuario' => 'required|email|max:255|unique:cji_usuario',
            'USUA_Password' => 'required|string|min:6',
            'cji_usuario_estadoVerificado' => 'required|string|min:1',
            'cji_usuario_estadoID' => 'required|string|min:1',
        ]);

        $user = User2::create([
            'USUA_usuario' => $request->USUA_usuario,
            'USUA_Password' => Hash::make($request->USUA_Password),
            'cji_usuario_estadoVerificado' => $request->cji_usuario_estadoVerificado,
            'cji_usuario_estadoID' => $request->cji_usuario_estadoID,
        ]);

        $token = Auth::login($user);
        return response()->json([
            'status' => 'success',
            'message' => 'User created successfully',
            'user' => $user,
            'authorisation' => [
                'token' => $token,
                'type' => 'bearer',
            ]
        ]);
    }

    public function logout()
    {
        Auth::logout();
        return response()->json([
            'status' => 'success',
            'message' => 'Successfully logged out',
        ]);
    }

    public function me()
    {
        return response()->json([
            'status' => 'success',
            'user' => Auth::user(),
        ]);
    }

    public function refresh()
    {
        return response()->json([
            'status' => 'success',
            'user' => Auth::user(),
            'authorisation' => [
                'token' => Auth::refresh(),
                'type' => 'bearer',
            ]
        ]);
    }

}
