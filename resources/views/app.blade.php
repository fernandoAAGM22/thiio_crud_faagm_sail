<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="shortcut icon" type="image/x-icon" href="{{ asset('favicon.ico') }}">
        <link rel="apple-touch-icon" sizes="180x180" href="/img/meta/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/img/meta/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/img/meta/favicon-16x16.png">
        <link rel="manifest" href="/img/meta/site.webmanifest">

        <title inertia>{{ config('app.name', 'Thiio CRUD FAAGM') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @routes
        @vite(['resources/js/app.ts', "resources/js/Pages/{$page['component']}.vue"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
