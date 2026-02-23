package models

import "time"

type StockQuote struct {
	Symbol    string    `json:"symbol"`
	Price     float64   `json:"price"`
	Change    float64   `json:"change"`
	ChangePct float64   `json:"change_pct"`
	Volume    int64     `json:"volume"`
	Timestamp time.Time `json:"timestamp"`
}

type AlertCondition string

const (
	AlertAbove AlertCondition = "above"
	AlertBelow AlertCondition = "below"
)

type StockAlert struct {
	ID             string         `json:"id"`
	UserID         string         `json:"user_id"`
	Symbol         string         `json:"symbol"`
	TargetPrice    float64        `json:"target_price"`
	Condition      AlertCondition `json:"condition"`
	Active         bool           `json:"active"`
	CreatedAt      time.Time      `json:"created_at"`
	LastTriggeredAt *time.Time    `json:"last_triggered_at,omitempty"`
}

type Notification struct {
	ID        string    `json:"id"`
	AlertID   string    `json:"alert_id"`
	UserID    string    `json:"user_id"`
	Symbol    string    `json:"symbol"`
	Message   string    `json:"message"`
	Read      bool      `json:"read"`
	CreatedAt time.Time `json:"created_at"`
}
