package api

import (
	"encoding/json"
	"net/http"

	"github.com/erichugy/erichugy-portfolio/backend/internal/models"
	"github.com/erichugy/erichugy-portfolio/backend/internal/services"
)

type Handler struct {
	stockService *services.StockService
}

func NewHandler(stockService *services.StockService) *Handler {
	return &Handler{stockService: stockService}
}

func (h *Handler) HealthCheck(w http.ResponseWriter, _ *http.Request) {
	writeJSON(w, http.StatusOK, map[string]string{"status": "ok"})
}

func (h *Handler) GetQuote(w http.ResponseWriter, r *http.Request) {
	symbol := r.PathValue("symbol")
	if symbol == "" {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "symbol is required"})
		return
	}

	quote, err := h.stockService.GetQuote(r.Context(), symbol)
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": err.Error()})
		return
	}

	writeJSON(w, http.StatusOK, quote)
}

func (h *Handler) CreateAlert(w http.ResponseWriter, r *http.Request) {
	var alert models.StockAlert
	if err := json.NewDecoder(r.Body).Decode(&alert); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "invalid request body"})
		return
	}

	if alert.Symbol == "" || alert.TargetPrice <= 0 || alert.UserID == "" {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "symbol, user_id, and target_price are required"})
		return
	}

	if alert.Condition != models.AlertAbove && alert.Condition != models.AlertBelow {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "condition must be 'above' or 'below'"})
		return
	}

	created := h.stockService.CreateAlert(alert)
	writeJSON(w, http.StatusCreated, created)
}

func (h *Handler) GetAlerts(w http.ResponseWriter, r *http.Request) {
	userID := r.URL.Query().Get("user_id")
	if userID == "" {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "user_id query parameter is required"})
		return
	}

	alerts := h.stockService.GetAlerts(userID)
	writeJSON(w, http.StatusOK, alerts)
}

func (h *Handler) DeleteAlert(w http.ResponseWriter, r *http.Request) {
	alertID := r.PathValue("id")
	if alertID == "" {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "alert id is required"})
		return
	}

	if h.stockService.DeleteAlert(alertID) {
		writeJSON(w, http.StatusOK, map[string]string{"status": "deleted"})
	} else {
		writeJSON(w, http.StatusNotFound, map[string]string{"error": "alert not found"})
	}
}

func (h *Handler) GetNotifications(w http.ResponseWriter, r *http.Request) {
	userID := r.URL.Query().Get("user_id")
	if userID == "" {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "user_id query parameter is required"})
		return
	}

	notifications := h.stockService.GetNotifications(userID)
	writeJSON(w, http.StatusOK, notifications)
}

func writeJSON(w http.ResponseWriter, status int, data any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(data)
}
