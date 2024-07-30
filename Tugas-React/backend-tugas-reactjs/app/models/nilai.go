package models

import "time"

type Nilai struct {
	ID           int        `gorm:"primaryKey" json:"id"`
	Indeks       string     `json:"indeks" validate:"required"`
	Skor         int        `json:"skor" validate:"required"`
	CreatedAt    time.Time  `json:"created_at"`
	UpdatedAt    time.Time  `json:"updated_at"`
	MahasiswaID  int        `json:"mahasiswa_id"`
	Mahasiswa    Mahasiswa  `json:"mahasiswa" gorm:"foreignKey:MahasiswaID"`
	MataKuliahID int        `json:"mata_kuliah_id"`
	MataKuliah   MataKuliah `json:"mata_kuliah" gorm:"foreignKey:MataKuliahID"`
	DosenID      int        `json:"dosen_id"`
	Dosen        Dosen      `json:"dosen" gorm:"foreignKey:DosenID"`
}
