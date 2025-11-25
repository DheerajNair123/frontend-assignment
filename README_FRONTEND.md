# Frontend - React (Vite)

This React app connects to the backend assignment API. Set environment variable in `.env` at the frontend root:

```
VITE_API_URL=http://localhost:5000
```

Run:

```powershell
cd frontend
npm install
npm run dev
```

Open the app at `http://localhost:5173` (Vite default) and use the UI to register, login and manage tasks. The app stores JWT in `localStorage.token` and uses it for protected API calls.
