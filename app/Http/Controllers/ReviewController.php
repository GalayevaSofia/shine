<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    /**
     * Get reviews for a product.
     */
    public function index($productId)
    {
        $reviews = Review::where('product_id', $productId)
            ->where('status', 'approved')
            ->with('user:id,name')
            ->latest()
            ->get();
            
        return response()->json([
            'reviews' => $reviews,
        ]);
    }
    
    /**
     * Store a new review.
     */
    public function store(Request $request, $productId)
    {
        $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:1000',
        ]);
        
        // Check if product exists
        $product = Product::findOrFail($productId);
        
        // Check if user already reviewed this product
        $existingReview = Review::where('product_id', $productId)
            ->where('user_id', Auth::id())
            ->first();
            
        if ($existingReview) {
            return response()->json([
                'message' => 'You have already reviewed this product',
            ], 422);
        }
        
        // Create review
        $review = Review::create([
            'product_id' => $productId,
            'user_id' => Auth::id(),
            'rating' => $request->rating,
            'comment' => $request->comment,
            'status' => 'approved', // Auto-approve for now, could be 'pending' for moderation
        ]);
        
        return response()->json([
            'message' => 'Review submitted successfully',
            'review' => $review->load('user:id,name'),
        ]);
    }
    
    /**
     * Update an existing review.
     */
    public function update(Request $request, $productId, $reviewId)
    {
        $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:1000',
        ]);
        
        $review = Review::where('product_id', $productId)
            ->where('id', $reviewId)
            ->where('user_id', Auth::id())
            ->firstOrFail();
            
        $review->update([
            'rating' => $request->rating,
            'comment' => $request->comment,
        ]);
        
        return response()->json([
            'message' => 'Review updated successfully',
            'review' => $review->fresh(),
        ]);
    }
    
    /**
     * Delete a review.
     */
    public function destroy($productId, $reviewId)
    {
        $review = Review::where('product_id', $productId)
            ->where('id', $reviewId)
            ->where('user_id', Auth::id())
            ->firstOrFail();
            
        $review->delete();
        
        return response()->json([
            'message' => 'Review deleted successfully',
        ]);
    }
    
    /**
     * Admin: Get all reviews.
     */
    public function adminIndex()
    {
        $reviews = Review::with(['user:id,name,email', 'product:id,name'])
            ->latest()
            ->paginate(20);
            
        return response()->json([
            'reviews' => $reviews,
        ]);
    }
    
    /**
     * Admin: Update review status.
     */
    public function adminUpdateStatus(Request $request, $reviewId)
    {
        $request->validate([
            'status' => 'required|in:approved,pending,rejected',
        ]);
        
        $review = Review::findOrFail($reviewId);
        
        $review->status = $request->status;
        $review->save();
        
        return response()->json([
            'message' => 'Review status updated successfully',
            'review' => $review->fresh(),
        ]);
    }
} 