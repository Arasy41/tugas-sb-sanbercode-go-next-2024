package models

import "time"

type JadwalKuliah struct {
	ID          int       `gorm:"primaryKey" json:"id"`
	DosenID     int       `json:"dosen_id"`
	Dosen       Dosen     `json:"dosen" gorm:"foreignKey:DosenID"`
	MahasiswaID int       `json:"mahasiswa_id"`
	Mahasiswa   Mahasiswa `json:"mahasiswa" gorm:"foreignKey:MahasiswaID"`
	Nama        string    `json:"nama" validate:"required"`
	Hari        time.Time `json:"hari"`
	JamMulai    time.Time `json:"jam_mulai"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}
