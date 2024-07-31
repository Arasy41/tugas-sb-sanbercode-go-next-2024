package models

import "time"

type Nilai struct {
	ID           int        `gorm:"primaryKey" json:"id"`
	Indeks       string     `json:"indeks" validate:"required"`
	Skor         int        `json:"skor" validate:"required"`
	CreatedAt    time.Time  `json:"created_at"`
	UpdatedAt    time.Time  `json:"updated_at"`
	MahasiswaID  int        `json:"mahasiswa_id"`
	Mahasiswa    Mahasiswa  `gorm:"foreignKey:MahasiswaID" json:"mahasiswa"`
	MataKuliahID int        `json:"matakuliah_id"`
	MataKuliah   MataKuliah `gorm:"foreignKey:MataKuliahID" json:"mata_kuliah"`
	UserID       int        `json:"user_id"`
	User         User       `gorm:"foreignKey:UserID" json:"user"`
}

type NilaiRequest struct {
	Indeks       string `json:"indeks" validate:"required"`
	Skor         int    `json:"skor" validate:"required"`
	MahasiswaID  int    `json:"mahasiswa_id"`
	MataKuliahID int    `json:"matakuliah_id"`
	UserID       int    `json:"user_id"`
}
