package models

import "time"

type Book struct {
	ID          int       `gorm:"primaryKey" json:"id"`
	Title       string    `json:"title" validate:"required"`
	Description string    `json:"description" validate:"required"`
	ImageURL    string    `json:"image_url" validate:"required; url" `
	ReleaseYear int       `json:"release_year" validate:"required"`
	Prize       string    `json:"prize" validate:"required"`
	TotalPage   int       `json:"total_page"`
	Thickness   string    `json:"thickness"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

type BookRequest struct {
	Title       string `json:"title"`
	Description string `json:"description"`
	ImageURL    string `json:"image_url"`
	ReleaseYear int    `json:"release_year"`
	Prize       string `json:"prize"`
	TotalPage   int    `json:"total_page"`
	Thickness   string `json:"thickness"`
}
