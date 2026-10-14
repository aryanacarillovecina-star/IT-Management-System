<?php

return [
    'paths' => ['api/*'],
    'allowed_methods' => ['*'],
    // Comma-separated list in .env, e.g. FRONTEND_URL=http://localhost:5173,https://your-app.vercel.app
    'allowed_origins' => array_map('trim', explode(',', env('FRONTEND_URL', 'http://localhost:5173'))),
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false,
];
