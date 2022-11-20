<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User2;

class AuthController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login','register']]);
    }

    public function ruta()
    {
        echo 'wee';
        return response()->json([
            'status' => 'success',
            'user' => 'Holaaaaaa',
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
            'USUA_usuario' => 'required|string|max:255|unique:cji_usuario',
            'USUA_Password' => 'required|string|min:6',
        ]);

        $user = User2::create([
            'USUA_usuario' => $request->USUA_usuario,
            'USUA_Password' => Hash::make($request->USUA_Password),
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
