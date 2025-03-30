<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\Promotion;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class HomeController extends Controller
{
    /**
     * Get home page data for public view
     */
    public function index(): JsonResponse
    {
        $featuredProducts = Product::where('status', 'active')
            ->where('featured', true)
            ->with('category')
            ->limit(4)
            ->get();
            
        $categories = Category::all();
        
        $promotions = Promotion::where('status', 'active')
            ->where('end_date', '>=', now())
            ->limit(3)
            ->get();
            
        return response()->json([
            'success' => true,
            'data' => [
                'featuredProducts' => $featuredProducts,
                'categories' => $categories,
                'promotions' => $promotions
            ]
        ]);
    }
} 