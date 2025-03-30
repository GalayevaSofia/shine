<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Wishlist;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class WishlistController extends Controller
{
    /**
     * Get current user's wishlist
     */
    public function index(): JsonResponse
    {
        $wishlistItems = Auth::user()->wishlists()->with('product')->get();
        
        return response()->json([
            'success' => true,
            'data' => $wishlistItems
        ]);
    }
    
    /**
     * Add product to wishlist
     */
    public function store($productId): JsonResponse
    {
        // Check if product exists
        if (!Product::find($productId)) {
            return response()->json([
                'success' => false,
                'message' => 'Product not found'
            ], 404);
        }
        
        // Check if already in wishlist
        $user = Auth::user();
        if ($user->wishlists()->where('product_id', $productId)->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'Product already in wishlist'
            ], 400);
        }
        
        // Add to wishlist
        $wishlistItem = $user->wishlists()->create(['product_id' => $productId]);
        
        return response()->json([
            'success' => true,
            'message' => 'Product added to wishlist',
            'data' => $wishlistItem
        ], 201);
    }
    
    /**
     * Remove product from wishlist
     */
    public function destroy($productId): JsonResponse
    {
        $deleted = Auth::user()->wishlists()->where('product_id', $productId)->delete();
        
        return response()->json([
            'success' => (bool)$deleted,
            'message' => $deleted ? 'Product removed from wishlist' : 'Product not found in wishlist'
        ], $deleted ? 200 : 404);
    }
    
    /**
     * Check if a product is in the user's wishlist
     */
    public function check($productId): JsonResponse
    {
        $inWishlist = Auth::user()->wishlists()->where('product_id', $productId)->exists();
        
        return response()->json([
            'success' => true,
            'inWishlist' => $inWishlist
        ]);
    }
    
    /**
     * Check multiple products in user's wishlist at once
     */
    public function checkBatch(Request $request): JsonResponse
    {
        $ids = $request->query('ids');
        
        if (!$ids) {
            return response()->json([
                'success' => false,
                'message' => 'No product IDs provided'
            ], 400);
        }
        
        // Parse comma-separated IDs
        $productIds = array_map('intval', explode(',', $ids));
        
        // Get all wishlist items for this user with the requested product IDs
        $wishlistItems = Auth::user()->wishlists()
            ->whereIn('product_id', $productIds)
            ->pluck('product_id')
            ->toArray();
        
        // Create result map with boolean status for each product ID
        $results = [];
        foreach ($productIds as $id) {
            $results[$id] = in_array($id, $wishlistItems);
        }
        
        return response()->json([
            'success' => true,
            'items' => $results
        ]);
    }
} 