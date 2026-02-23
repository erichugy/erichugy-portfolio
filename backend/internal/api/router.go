package api

import (
	"net/http"

	"github.com/erichugy/erichugy-portfolio/backend/internal/services"
)

func NewRouter(stockService *services.StockService, allowedOrigins []string) http.Handler {
	mux := http.NewServeMux()
	h := NewHandler(stockService)

	mux.HandleFunc("GET /health", h.HealthCheck)
	mux.HandleFunc("GET /api/stocks/{symbol}", h.GetQuote)
	mux.HandleFunc("POST /api/alerts", h.CreateAlert)
	mux.HandleFunc("GET /api/alerts", h.GetAlerts)
	mux.HandleFunc("DELETE /api/alerts/{id}", h.DeleteAlert)
	mux.HandleFunc("GET /api/notifications", h.GetNotifications)

	return corsMiddleware(mux, allowedOrigins)
}

func corsMiddleware(next http.Handler, allowedOrigins []string) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		origin := r.Header.Get("Origin")

		for _, allowed := range allowedOrigins {
			if origin == allowed {
				w.Header().Set("Access-Control-Allow-Origin", origin)
				break
			}
		}

		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}

		next.ServeHTTP(w, r)
	})
}
