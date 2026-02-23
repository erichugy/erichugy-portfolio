package services

import (
	"context"
	"fmt"
	"log"
	"sync"
	"time"

	"github.com/erichugy/erichugy-portfolio/backend/internal/config"
	"github.com/erichugy/erichugy-portfolio/backend/internal/models"
)

type StockService struct {
	cfg    *config.Config
	mu     sync.RWMutex
	alerts []models.StockAlert
	notifs []models.Notification
}

func NewStockService(cfg *config.Config) *StockService {
	return &StockService{
		cfg:    cfg,
		alerts: make([]models.StockAlert, 0),
		notifs: make([]models.Notification, 0),
	}
}

// GetQuote fetches the current price for a stock symbol.
// TODO: Integrate with a real stock API (e.g., Alpha Vantage, Finnhub, Polygon.io).
func (s *StockService) GetQuote(_ context.Context, symbol string) (*models.StockQuote, error) {
	return &models.StockQuote{
		Symbol:    symbol,
		Price:     0,
		Change:    0,
		ChangePct: 0,
		Volume:    0,
		Timestamp: time.Now(),
	}, nil
}

func (s *StockService) CreateAlert(alert models.StockAlert) models.StockAlert {
	s.mu.Lock()
	defer s.mu.Unlock()

	alert.ID = fmt.Sprintf("alert_%d", time.Now().UnixNano())
	alert.Active = true
	alert.CreatedAt = time.Now()
	s.alerts = append(s.alerts, alert)
	return alert
}

func (s *StockService) GetAlerts(userID string) []models.StockAlert {
	s.mu.RLock()
	defer s.mu.RUnlock()

	var result []models.StockAlert
	for _, a := range s.alerts {
		if a.UserID == userID {
			result = append(result, a)
		}
	}
	return result
}

func (s *StockService) DeleteAlert(alertID string) bool {
	s.mu.Lock()
	defer s.mu.Unlock()

	for i, a := range s.alerts {
		if a.ID == alertID {
			s.alerts = append(s.alerts[:i], s.alerts[i+1:]...)
			return true
		}
	}
	return false
}

func (s *StockService) GetNotifications(userID string) []models.Notification {
	s.mu.RLock()
	defer s.mu.RUnlock()

	var result []models.Notification
	for _, n := range s.notifs {
		if n.UserID == userID {
			result = append(result, n)
		}
	}
	return result
}

// StartMonitor begins polling stock prices and checking alerts.
func (s *StockService) StartMonitor(ctx context.Context) {
	ticker := time.NewTicker(time.Duration(s.cfg.PollIntervalSecs) * time.Second)
	defer ticker.Stop()

	log.Printf("Stock monitor started (polling every %ds)", s.cfg.PollIntervalSecs)

	for {
		select {
		case <-ctx.Done():
			log.Println("Stock monitor stopped")
			return
		case <-ticker.C:
			s.checkAlerts(ctx)
		}
	}
}

func (s *StockService) checkAlerts(ctx context.Context) {
	s.mu.RLock()
	activeAlerts := make([]models.StockAlert, 0)
	for _, a := range s.alerts {
		if a.Active {
			activeAlerts = append(activeAlerts, a)
		}
	}
	s.mu.RUnlock()

	for _, alert := range activeAlerts {
		quote, err := s.GetQuote(ctx, alert.Symbol)
		if err != nil {
			log.Printf("Error fetching quote for %s: %v", alert.Symbol, err)
			continue
		}

		triggered := false
		switch alert.Condition {
		case models.AlertAbove:
			triggered = quote.Price >= alert.TargetPrice
		case models.AlertBelow:
			triggered = quote.Price <= alert.TargetPrice
		}

		if triggered {
			s.triggerNotification(alert, quote)
		}
	}
}

func (s *StockService) triggerNotification(alert models.StockAlert, quote *models.StockQuote) {
	s.mu.Lock()
	defer s.mu.Unlock()

	now := time.Now()

	// Deactivate the alert after triggering
	for i, a := range s.alerts {
		if a.ID == alert.ID {
			s.alerts[i].Active = false
			s.alerts[i].LastTriggeredAt = &now
			break
		}
	}

	notif := models.Notification{
		ID:        fmt.Sprintf("notif_%d", now.UnixNano()),
		AlertID:   alert.ID,
		UserID:    alert.UserID,
		Symbol:    alert.Symbol,
		Message:   fmt.Sprintf("%s reached $%.2f (target: $%.2f, condition: %s)", alert.Symbol, quote.Price, alert.TargetPrice, alert.Condition),
		Read:      false,
		CreatedAt: now,
	}
	s.notifs = append(s.notifs, notif)

	log.Printf("Notification triggered: %s", notif.Message)
}
