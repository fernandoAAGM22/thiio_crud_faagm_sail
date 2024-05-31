<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class Locale extends Controller
{
    public function setLocale(Request $request)
    {
        $locale = $request->input('locale');

        // Validate the provided locale if necessary

        // Update the application locale
        app()->setLocale($locale);

        return response()->json(['success' => true]);
    }
}
