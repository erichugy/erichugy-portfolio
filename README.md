# erichugy-portfolio

Monorepo containing the portfolio frontend and stock notification backend.

## Structure

```
├── frontend/   # Next.js portfolio app (deployed on Vercel)
└── backend/    # Go stock notification service
```

## Frontend

Next.js app with React, TypeScript, and Tailwind CSS.

```bash
cd frontend
npm install
npm run dev      # http://localhost:3000
npm run build
```

**Vercel deployment:** Set the Root Directory to `frontend` in your Vercel project settings.

## Backend

Go HTTP server for stock price alerts and notifications.

```bash
cd backend
make build       # compile to bin/server
make run         # run the server (default :8080)
make test        # run tests
```

### Environment Variables

| Variable | Description | Default |
|---|---|---|
| `PORT` | Server port | `8080` |
| `STOCK_API_KEY` | API key for stock data provider | — |
| `STOCK_API_BASE_URL` | Stock API base URL | `https://api.example.com` |
| `POLL_INTERVAL_SECS` | How often to check stock prices | `60` |
| `ALLOWED_ORIGINS` | Comma-separated CORS origins | `http://localhost:3000` |

### API Endpoints

| Method | Path | Description |
|---|---|---|
| `GET` | `/health` | Health check |
| `GET` | `/api/stocks/{symbol}` | Get stock quote |
| `POST` | `/api/alerts` | Create a price alert |
| `GET` | `/api/alerts?user_id=` | List alerts for a user |
| `DELETE` | `/api/alerts/{id}` | Delete an alert |
| `GET` | `/api/notifications?user_id=` | List notifications for a user |

## Ideas

- Add a coin collecting game
- Add a blog section that is integrated with linkedin???
- Google maps but with crowd-sourced parking time restrictions for quebec
- Timeline of experiences