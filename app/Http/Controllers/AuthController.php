<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;

class AuthController extends Controller
{
    /**
     * Check if the user is authenticated
     */
    public function check(): JsonResponse
    {
        $isAuthenticated = Auth::check();
        $userId = $isAuthenticated ? Auth::id() : null;
        $user = $isAuthenticated ? Auth::user() : null;
        
        Log::info('Auth check: ' . ($isAuthenticated ? 'true' : 'false') . ', User ID: ' . ($userId ?: 'null'));
        Log::info('Session ID: ' . Session::getId());
        Log::info('Cart session ID: ' . (session('cart_id') ?: 'null'));
        
        if ($isAuthenticated) {
            Log::info('User details: ' . json_encode([
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ]));
        }
        
        return response()->json([
            'authenticated' => $isAuthenticated,
            'user' => $user,
            'sessionId' => Session::getId(),
            'cartSessionId' => session('cart_id')
        ]);
    }
}
