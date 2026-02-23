package config

import (
	"os"
	"strconv"
)

type Config struct {
	Port             int
	StockAPIKey      string
	StockAPIBaseURL  string
	PollIntervalSecs int
	AllowedOrigins   []string
}

func Load() *Config {
	port := 8080
	if v := os.Getenv("PORT"); v != "" {
		if p, err := strconv.Atoi(v); err == nil {
			port = p
		}
	}

	pollInterval := 60
	if v := os.Getenv("POLL_INTERVAL_SECS"); v != "" {
		if p, err := strconv.Atoi(v); err == nil {
			pollInterval = p
		}
	}

	allowedOrigins := []string{"http://localhost:3000"}
	if v := os.Getenv("ALLOWED_ORIGINS"); v != "" {
		allowedOrigins = splitAndTrim(v)
	}

	return &Config{
		Port:             port,
		StockAPIKey:      os.Getenv("STOCK_API_KEY"),
		StockAPIBaseURL:  getEnvOrDefault("STOCK_API_BASE_URL", "https://api.example.com"),
		PollIntervalSecs: pollInterval,
		AllowedOrigins:   allowedOrigins,
	}
}

func getEnvOrDefault(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}

func splitAndTrim(s string) []string {
	var result []string
	for _, part := range splitByComma(s) {
		trimmed := trimSpace(part)
		if trimmed != "" {
			result = append(result, trimmed)
		}
	}
	return result
}

func splitByComma(s string) []string {
	var parts []string
	start := 0
	for i := 0; i < len(s); i++ {
		if s[i] == ',' {
			parts = append(parts, s[start:i])
			start = i + 1
		}
	}
	parts = append(parts, s[start:])
	return parts
}

func trimSpace(s string) string {
	start := 0
	for start < len(s) && s[start] == ' ' {
		start++
	}
	end := len(s)
	for end > start && s[end-1] == ' ' {
		end--
	}
	return s[start:end]
}
