package api_test

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/erichugy/erichugy-portfolio/backend/internal/api"
	"github.com/erichugy/erichugy-portfolio/backend/internal/config"
	"github.com/erichugy/erichugy-portfolio/backend/internal/models"
	"github.com/erichugy/erichugy-portfolio/backend/internal/services"
)

func setupRouter() http.Handler {
	cfg := &config.Config{
		Port:             8080,
		PollIntervalSecs: 60,
		AllowedOrigins:   []string{"http://localhost:3000"},
	}
	svc := services.NewStockService(cfg)
	return api.NewRouter(svc, cfg.AllowedOrigins)
}

func TestHealthCheck(t *testing.T) {
	router := setupRouter()

	req := httptest.NewRequest(http.MethodGet, "/health", nil)
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Errorf("expected status 200, got %d", w.Code)
	}

	var resp map[string]string
	json.NewDecoder(w.Body).Decode(&resp)
	if resp["status"] != "ok" {
		t.Errorf("expected status ok, got %s", resp["status"])
	}
}

func TestGetQuote(t *testing.T) {
	router := setupRouter()

	req := httptest.NewRequest(http.MethodGet, "/api/stocks/AAPL", nil)
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Errorf("expected status 200, got %d", w.Code)
	}

	var quote models.StockQuote
	json.NewDecoder(w.Body).Decode(&quote)
	if quote.Symbol != "AAPL" {
		t.Errorf("expected symbol AAPL, got %s", quote.Symbol)
	}
}

func TestCreateAndGetAlerts(t *testing.T) {
	router := setupRouter()

	// Create an alert
	alert := models.StockAlert{
		UserID:      "user1",
		Symbol:      "AAPL",
		TargetPrice: 150.0,
		Condition:   models.AlertAbove,
	}
	body, _ := json.Marshal(alert)

	req := httptest.NewRequest(http.MethodPost, "/api/alerts", bytes.NewReader(body))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	if w.Code != http.StatusCreated {
		t.Errorf("expected status 201, got %d", w.Code)
	}

	var created models.StockAlert
	json.NewDecoder(w.Body).Decode(&created)
	if created.Symbol != "AAPL" || !created.Active {
		t.Errorf("unexpected alert: %+v", created)
	}

	// Get alerts for user
	req = httptest.NewRequest(http.MethodGet, "/api/alerts?user_id=user1", nil)
	w = httptest.NewRecorder()
	router.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Errorf("expected status 200, got %d", w.Code)
	}

	var alerts []models.StockAlert
	json.NewDecoder(w.Body).Decode(&alerts)
	if len(alerts) != 1 {
		t.Errorf("expected 1 alert, got %d", len(alerts))
	}
}

func TestDeleteAlert(t *testing.T) {
	router := setupRouter()

	// Create an alert first
	alert := models.StockAlert{
		UserID:      "user1",
		Symbol:      "TSLA",
		TargetPrice: 200.0,
		Condition:   models.AlertBelow,
	}
	body, _ := json.Marshal(alert)

	req := httptest.NewRequest(http.MethodPost, "/api/alerts", bytes.NewReader(body))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	var created models.StockAlert
	json.NewDecoder(w.Body).Decode(&created)

	// Delete the alert
	req = httptest.NewRequest(http.MethodDelete, "/api/alerts/"+created.ID, nil)
	w = httptest.NewRecorder()
	router.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Errorf("expected status 200, got %d", w.Code)
	}

	// Delete non-existent alert
	req = httptest.NewRequest(http.MethodDelete, "/api/alerts/nonexistent", nil)
	w = httptest.NewRecorder()
	router.ServeHTTP(w, req)

	if w.Code != http.StatusNotFound {
		t.Errorf("expected status 404, got %d", w.Code)
	}
}

func TestCreateAlertValidation(t *testing.T) {
	router := setupRouter()

	// Missing required fields
	body, _ := json.Marshal(map[string]string{"symbol": ""})
	req := httptest.NewRequest(http.MethodPost, "/api/alerts", bytes.NewReader(body))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	if w.Code != http.StatusBadRequest {
		t.Errorf("expected status 400, got %d", w.Code)
	}
}

func TestGetNotifications(t *testing.T) {
	router := setupRouter()

	req := httptest.NewRequest(http.MethodGet, "/api/notifications?user_id=user1", nil)
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Errorf("expected status 200, got %d", w.Code)
	}
}

func TestGetAlertsMissingUserID(t *testing.T) {
	router := setupRouter()

	req := httptest.NewRequest(http.MethodGet, "/api/alerts", nil)
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	if w.Code != http.StatusBadRequest {
		t.Errorf("expected status 400, got %d", w.Code)
	}
}
