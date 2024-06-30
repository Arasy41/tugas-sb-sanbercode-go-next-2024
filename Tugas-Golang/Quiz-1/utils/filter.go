package utils

import (
	"fmt"
	"strings"
)

// BuildQuery membangun query SQL dengan filter dinamis untuk berbagai tabel
func BuildFilter(baseQuery string, filters map[string]interface{}, sortField string, sortOrder string) (string, []interface{}) {
	var args []interface{}
	var conditions []string

	for key, value := range filters {
		switch key {
		case "title":
			conditions = append(conditions, "LOWER(title) LIKE ?")
			args = append(args, fmt.Sprintf("%%%s%%", strings.ToLower(value.(string))))
		case "minYear":
			conditions = append(conditions, "YEAR(created_at) >= ?")
			args = append(args, value.(int))
		case "maxYear":
			conditions = append(conditions, "YEAR(created_at) <= ?")
			args = append(args, value.(int))
		case "minWord":
			conditions = append(conditions, "LENGTH(content) >= ?")
			args = append(args, value.(int))
		case "maxWord":
			conditions = append(conditions, "LENGTH(content) <= ?")
			args = append(args, value.(int))
		default:
			conditions = append(conditions, fmt.Sprintf("%s = ?", key))
			args = append(args, value)
		}
	}

	query := baseQuery
	if len(conditions) > 0 {
		query += " WHERE " + strings.Join(conditions, " AND ")
	}

	// Tambahkan pengurutan jika diberikan
	if sortField != "" {
		query += fmt.Sprintf(" ORDER BY %s %s", sortField, sortOrder)
	}

	return query, args
}
