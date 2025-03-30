<?php

namespace App\Http\Controllers;

use App\Models\Promotion;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class PromotionController extends Controller
{
    /**
     * Get all active promotions with their products
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        try {
            $promotions = $this->getActivePromotions()
                ->get()
                ->load($this->getProductsRelation());

            return response()->json([
                'success' => true,
                'data' => [
                    'promotions' => $promotions
                ]
            ]);
        } catch (\Exception $e) {
            return $this->errorResponse($e, 'при получении акций');
        }
    }

    /**
     * Get specific promotion by slug
     *
     * @param string $slug
     * @return JsonResponse
     */
    public function show(string $slug): JsonResponse
    {
        try {
            $promotion = $this->getActivePromotions()
                ->where('slug', $slug)
                ->with($this->getProductsRelation())
                ->first();

            if (!$promotion) {
                return response()->json([
                    'success' => false,
                    'message' => 'Акция не найдена'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => [
                    'promotion' => $promotion
                ]
            ]);
        } catch (\Exception $e) {
            return $this->errorResponse($e, 'при получении акции');
        }
    }

    /**
     * Get base query for active promotions
     */
    private function getActivePromotions()
    {
        return Promotion::query()
            ->where('is_active', true)
            ->where('start_date', '<=', now())
            ->where('end_date', '>=', now());
    }

    /**
     * Get products relation config
     */
    private function getProductsRelation()
    {
        return ['products' => function($query) {
            $query->select('products.id', 'products.name', 'products.slug', 
                          'products.description', 'products.price', 
                          'products.image', 'products.stock')
                  ->with('category:id,name,slug');
        }];
    }

    /**
     * Format error response
     */
    private function errorResponse(\Exception $e, string $context): JsonResponse
    {
        Log::error("Ошибка {$context}: " . $e->getMessage());
        
        return response()->json([
            'success' => false,
            'message' => "Ошибка {$context}"
        ], 500);
    }
}