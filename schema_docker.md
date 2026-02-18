                        ┌────────────────────┐
                        │    Navigateur      │
                        │  (localhost)       │
                        └─────────┬─────────┘
                                  │
                -----------------│-----------------
                │                               │
        ┌───────▼────────┐               ┌──────▼────────┐
        │ Reader Front    │               │ Writer Front   │
        │ (React TS)      │               │ (React JS)     │
        │ localhost:5174  │               │ localhost:5173 │
        │ VITE_API_URL=   │               │ VITE_API_URL=  │
        │ reader-back:3000│               │ writer-back:3000│
        └───────┬────────┘               └───────┬────────┘
                │                               │
                │                               │
        ┌───────▼────────┐               ┌──────▼────────┐
        │ Reader Back    │               │ Writer Back    │
        │ (Node.js)      │               │ (Node.js)      │
        │ 3000 (interne) │               │ 3000 (interne) │
        │ .env variables │               │ .env variables │
        └────────────────┘               └────────────────┘
