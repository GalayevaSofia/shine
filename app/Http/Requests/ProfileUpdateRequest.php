<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($this->user()->id),
            ],
            'phone' => ['nullable', 'string', 'max:20'],
        ];

        // Если передан текущий пароль, добавляем валидацию для смены пароля
        if ($this->filled('current_password')) {
            $rules['current_password'] = ['required', 'string', 'current_password'];
            $rules['new_password'] = ['required', 'string', Password::defaults(), 'confirmed'];
            $rules['new_password_confirmation'] = ['required', 'string'];
        }

        return $rules;
    }
}
