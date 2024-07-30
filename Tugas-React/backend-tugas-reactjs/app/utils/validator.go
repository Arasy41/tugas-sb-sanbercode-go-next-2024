package utils

import (
	"errors"
	"fmt"
	"go-vercel-app/app/config"
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

func ValidateBookRequest(book *models.Book) error {
	var errMessage []string

	if _, err := url.ParseRequestURI(book.ImageURL); err != nil {
		errMessage = append(errMessage, "Invalid Image URL")
	}

	if book.ReleaseYear < 1980 || book.ReleaseYear > 2021 {
		errMessage = append(errMessage, "The range of release year should be between 1980 and 2021")
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

func ValidateJadwal(schedule *models.JadwalKuliah) error {
	// Validasi hari
	validDays := []string{"Senin", "Selasa", "Rabu", "Kamis", "Jumat"}
	isValidDay := false
	for _, day := range validDays {
		if schedule.Hari == day {
			isValidDay = true
			break
		}
	}
	if !isValidDay {
		return fmt.Errorf("Invalid day, must be one of: %v", validDays)
	}

	// Validasi waktu
	if schedule.JamMulai == schedule.JamSelesai {
		return fmt.Errorf("Jam mulai dan jam selesai tidak boleh sama")
	}
	if schedule.JamMulai.After(schedule.JamSelesai) {
		return fmt.Errorf("Jam selesai tidak boleh mendahului jam mulai")
	}

	// Validasi dosen dan mahasiswa
	var count int64
	config.DB.Model(&models.JadwalKuliah{}).
		Where("dosen_id = ? AND mahasiswa_id = ?", schedule.DosenID, schedule.MahasiswaID).
		Count(&count)
	if count > 0 {
		return fmt.Errorf("Dosen dan mahasiswa sudah memiliki jadwal yang sama")
	}

	return nil
}
