# Helpdesk Backend (Laravel REST API)

These files are an overlay for a fresh Laravel project.

## Setup
```bash
composer create-project laravel/laravel backend-app
cd backend-app
php artisan install:api          # enables routes/api.php
```
Copy the contents of this `backend/` folder into `backend-app/`, overwriting `routes/api.php`
and adding the migration, model, controller and `config/cors.php`.

## Local (SQLite)
In `.env`:
```
DB_CONNECTION=sqlite
FRONTEND_URL=http://localhost:5173
```
```bash
touch database/database.sqlite
php artisan migrate
php artisan serve                # http://localhost:8000
```

## Endpoints (all under /api)
| Method | URL | Purpose |
|---|---|---|
| GET | /tickets | list |
| POST | /tickets | create |
| GET | /tickets/{id} | details |
| PUT | /tickets/{id} | update |
| DELETE | /tickets/{id} | delete |

## Deploy (Render / Railway / Fly.io + cloud PostgreSQL/MySQL)
Set env vars: `APP_KEY`, `APP_ENV=production`, `APP_DEBUG=false`, `DB_CONNECTION=pgsql`
(or `mysql`), `DB_URL` (or host/port/database/username/password),
`FRONTEND_URL=https://<your-frontend-domain>`.
Run `php artisan migrate --force` on release. Serve over HTTPS.
