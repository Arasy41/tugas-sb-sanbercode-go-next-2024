package models

import (
	"regexp"
	"strings"
	"time"
)

type Article struct {
	ID            int       `json:"id"`
	Title         string    `json:"title"`
	Content       string    `json:"content"`
	ImageURL      string    `json:"image_url"`
	ArticleLength string    `json:"article_length"`
	CreatedAt     time.Time `json:"created_at"`
	UpdatedAt     time.Time `json:"updated_at"`
	CategoryID    int       `json:"category_id"`
}

func ValidateArticle(a Article) []string {
	var errors []string

	if len(strings.Fields(a.Title)) > 3 {
		errors = append(errors, "Title should not be more than 3 words")
	}

	urlRegex := `^(http|https):\/\/[^\s$.?#].[^\s]*$`
	if matched, _ := regexp.MatchString(urlRegex, a.ImageURL); !matched {
		errors = append(errors, "Image URL must be a valid URL")
	}

	return errors
}

func ValidateArticleLength(content string) string {
	wordCount := len(strings.Fields(content))
	charCount := len(content)

	switch {
	case wordCount <= 100 || charCount <= 400:
		return "pendek"
	case wordCount <= 200 || charCount <= 800:
		return "sedang"
	default:
		return "panjang"
	}
}
