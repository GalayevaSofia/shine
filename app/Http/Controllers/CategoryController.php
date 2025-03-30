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
     * Display a listing of the categories.
     */
    public function index()
    {
        $categories = Category::with('children')->whereNull('parent_id')->get();
        
        return Inertia::render('Admin/Categories/Index', [
            'categories' => $categories,
        ]);
    }

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
     * Show the form for creating a new category.
     */
    public function create()
    {
        return Inertia::render('Admin/Categories/Create', [
            'categories' => Category::all(),
        ]);
    }

    /**
     * Store a newly created category.
     */
    public function store(Request $request)
    {
        $validated = $this->validateCategory($request);
        $validated['slug'] = Str::slug($validated['name']);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('categories', 'public');
        }

        Category::create($validated);

        return redirect()->route('admin.categories.index')
            ->with('success', 'Категория успешно создана');
    }

    /**
     * Display the specified category.
     */
    public function show(Category $category)
    {
        return Inertia::render('Admin/Categories/Show', [
            'category' => $category->load(['children', 'products']),
        ]);
    }

    /**
     * Show the form for editing the specified category.
     */
    public function edit(Category $category)
    {
        return Inertia::render('Admin/Categories/Edit', [
            'category' => $category,
            'categories' => Category::where('id', '!=', $category->id)->get(),
        ]);
    }

    /**
     * Update the specified category.
     */
    public function update(Request $request, Category $category)
    {
        $validated = $this->validateCategory($request);
        $validated['slug'] = Str::slug($validated['name']);

        if ($request->hasFile('image')) {
            if ($category->image) {
                Storage::disk('public')->delete($category->image);
            }
            $validated['image'] = $request->file('image')->store('categories', 'public');
        }

        $category->update($validated);

        return redirect()->route('admin.categories.index')
            ->with('success', 'Категория успешно обновлена');
    }

    /**
     * Remove the specified category.
     */
    public function destroy(Category $category)
    {
        if ($category->image) {
            Storage::disk('public')->delete($category->image);
        }
        
        $category->delete();

        return redirect()->route('admin.categories.index')
            ->with('success', 'Категория успешно удалена');
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