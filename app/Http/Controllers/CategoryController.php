<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class CategoryController extends Controller
{
    /**
     * Get all categories for API.
     */
    public function all(): JsonResponse
    {
        return $this->getCategoriesResponse();
    }

    /**
     * Get all categories for API.
     */
    public function list(): JsonResponse
    {
        $categories = Category::with('children')->whereNull('parent_id')->get();
        
        return response()->json([
            'success' => true,
            'data' => $categories,
        ]);
    }

    /**
     * Get featured categories for homepage
     */
    public function featured(): JsonResponse
    {
        return $this->getCategoriesResponse(true);
    }

    /**
     * Get categories with common filtering options
     */
    private function getCategoriesResponse(bool $onlyFeatured = false): JsonResponse
    {
        try {
            $query = Category::whereNull('parent_id')
                ->with(['children' => function($query) {
                    $query->select('id', 'name', 'slug', 'parent_id')
                        ->orderBy('name');
                }])
                ->select('id', 'name', 'slug', 'description', 'image')
                ->orderBy('name');
                
            if ($onlyFeatured) {
                $query->where('featured', true);
            }
            
            $categories = $query->get();

            return response()->json([
                'success' => true,
                'data' => $categories
            ]);
        } catch (\Exception $e) {
            Log::error('Ошибка при загрузке категорий', [
                'error' => $e->getMessage(),
                'featured_only' => $onlyFeatured
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Ошибка при загрузке категорий'
            ], 500);
        }
    }
    
    /**
     * Validate category request data
     */
    private function validateCategory(Request $request): array
    {
        return $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
            'parent_id' => 'nullable|exists:categories,id',
        ]);
    }
} 