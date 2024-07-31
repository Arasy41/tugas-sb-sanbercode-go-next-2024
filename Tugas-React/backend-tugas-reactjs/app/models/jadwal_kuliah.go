package models

import (
	"fmt"
	"time"
)

type JadwalKuliah struct {
	ID          int       `gorm:"primaryKey" json:"id"`
	DosenID     int       `json:"dosen_id"`
	Dosen       Dosen     `json:"dosen" gorm:"foreignKey:DosenID"`
	MahasiswaID int       `json:"mahasiswa_id"`
	Mahasiswa   Mahasiswa `json:"mahasiswa" gorm:"foreignKey:MahasiswaID"`
	Nama        string    `json:"nama" validate:"required"`
	Hari        string    `json:"hari"`
	JamMulai    time.Time `json:"jam_mulai"`
	JamSelesai  time.Time `json:"jam_selesai"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

type JadwalKuliahRequest struct {
	DosenID     int      `json:"dosen_id"`
	MahasiswaID int      `json:"mahasiswa_id"`
	Nama        string   `json:"nama" validate:"required"`
	Hari        string   `json:"hari"`
	JamMulai    TimeOnly `json:"jam_mulai"`
	JamSelesai  TimeOnly `json:"jam_selesai"`
}

type TimeOnly struct {
	time.Time
}

func (t *TimeOnly) UnmarshalJSON(b []byte) error {
	timeStr := string(b)
	timeStr = timeStr[1 : len(timeStr)-1]

	parsedTime, err := time.Parse("15:04", timeStr)
	if err != nil {
		return fmt.Errorf("invalid time format, expected HH:MM")
	}
	t.Time = parsedTime
	return nil
}

type JadwalKuliahResponse struct {
	ID          int    `json:"id"`
	DosenID     int    `json:"dosen_id"`
	Dosen       string `json:"dosen"`
	MahasiswaID int    `json:"mahasiswa_id"`
	Mahasiswa   string `json:"mahasiswa"`
	Nama        string `json:"nama"`
	Hari        string `json:"hari"`
	JamMulai    string `json:"jam_mulai"`
	JamSelesai  string `json:"jam_selesai"`
	CreatedAt   string `json:"created_at"`
	UpdatedAt   string `json:"updated_at"`
}
