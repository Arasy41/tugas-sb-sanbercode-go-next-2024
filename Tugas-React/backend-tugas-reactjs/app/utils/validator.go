package utils

import (
	"errors"
	"go-vercel-app/app/models"
	"net/url"
	"strings"

	"github.com/go-playground/validator/v10"
)

var validate *validator.Validate

func init() {
	validate = validator.New()
}

func ValidateStruct(s interface{}) error {
	return validate.Struct(s)
}

func ValidateBookRequest(book *models.BookRequest) error {
	var errMessage []string

	if _, err := url.ParseRequestURI(book.ImageURL); err != nil {
		errMessage = append(errMessage, "Invalid Image URL")
	}

	if book.ReleaseYear <= 1980 && book.ReleaseYear >= 2021 {
		errMessage = append(errMessage, "The range of release year is only between 1980 - 2021")
	}

	if len(errMessage) > 0 {
		return errors.New(strings.Join(errMessage, ", "))
	}

	return nil
}

func CalculateThickness(totalPage int) string {
	if totalPage <= 100 {
		return "tipis"
	} else if totalPage <= 200 {
		return "sedang"
	} else {
		return "tebal"
	}
}
