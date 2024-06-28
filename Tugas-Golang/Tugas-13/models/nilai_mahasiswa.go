package models

import (
	"fmt"
	"time"
)

type NilaiMahasiswa struct {
	ID           int       `json:"id"`
	Indeks       string    `json:"indeks"`
	Skor         int       `json:"skor"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
	MahasiswaID  int       `json:"mahasiswa_id"`
	MataKuliahID int       `json:"mata_kuliah_id"`
}

func (nm *NilaiMahasiswa) SkorValidation() error {
	if nm.Skor > 100 {
		return fmt.Errorf("Skor tidak boleh lebih dari 100")
	}
	return nil
}

func (nm *NilaiMahasiswa) IndeksValidation() string {
	if nm.Skor >= 80 {
		nm.Indeks = "A"
	} else if nm.Skor >= 70 {
		nm.Indeks = "B"
	} else if nm.Skor >= 60 {
		nm.Indeks = "C"
	} else if nm.Skor >= 50 {
		nm.Indeks = "D"
	} else {
		nm.Indeks = "E"
	}

	return nm.Indeks
}

type DetailNilaiMahasiswa struct {
	ID             int       `json:"id"`
	MahasiswaID    int       `json:"mahasiswa_id"`
	NamaMahasiswa  string    `json:"nama_mahasiswa"`
	MataKuliahID   int       `json:"mata_kuliah_id"`
	NamaMataKuliah string    `json:"mata_kuliah"`
	Indeks         string    `json:"indeks"`
	Skor           int       `json:"skor"`
	CreatedAt      time.Time `json:"created_at"`
	UpdatedAt      time.Time `json:"updated_at"`
}
