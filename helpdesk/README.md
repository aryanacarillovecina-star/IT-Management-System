# IT Helpdesk System

```
helpdesk/
├── backend/    Laravel REST API files (overlay for a fresh Laravel install, see backend/README.md)
└── frontend/   React + Vite SPA
```

## Run locally
1. Backend: follow `backend/README.md` (serves on http://localhost:8000).
2. Frontend:
   ```bash
   cd frontend
   cp .env.example .env     # set VITE_API_URL
   npm install
   npm run dev              # http://localhost:5173
   ```
3. Log in with `itadmin` / `helpdesk123`.

## Deploy
- Backend: Render / Railway / Fly.io with a cloud PostgreSQL or MySQL database.
- Frontend: Vercel / Netlify / Render Static Site. Set `VITE_API_URL=https://<backend-domain>/api`
  at build time (SPA rewrite files are already included).
- Set the backend's `FRONTEND_URL` to the deployed frontend URL so CORS allows it.
