# ArchivePro — simple React JSX frontend

This version follows a straightforward structure like your earlier React project.

## Run

1. Start your Express backend on port **5000** and connect MongoDB.
2. In this folder, run `npm install` and then `npm run dev`.
3. Open the URL shown by Vite (usually http://localhost:5173).

If your backend uses a different port, edit `vite.config.js`.

## Files

- `src/App.jsx` — routes and signed-in user state.
- `src/api.js` — small collection of real API requests.
- `src/components/Layout.jsx` — sidebar and header.
- `src/pages/` — one file for each page.
- `src/index.css` — Tailwind and a few reusable classes.

## Connected backend endpoints

- POST /api/auth/signin — login
- POST /api/auth/logout — logout
- POST /api/auth/create — company registration
- POST /api/auth/signup — admin adds an employee
- GET /api/users/user — load current user
- GET /api/users/company — list company employees
- PUT /api/users/user — edit your profile
- GET /api/companies/company — company details
- PUT /api/companies/company — edit company name

## Important backend fix

In your backend's `routes/userroutes.js`, change:

```js
router.get('/user', getuser)
```

to:

```js
router.get('/user', verifytoken, getuser)
```

Without this fix, `req.user` is undefined and the application cannot load the signed-in user. Your current cookie middleware also naively splits the Cookie header; consider fixing that if login becomes unreliable with multiple cookies.

## Not included

There are **no document, category, or activity endpoints** in the backend ZIP. This frontend intentionally **does not fake** document or activity data. Document pages can be added when those endpoints exist.

No backend files or secrets are included in this ZIP.
