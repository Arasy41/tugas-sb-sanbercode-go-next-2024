package models

import "time"

type Mahasiswa struct {
	ID        int       `gorm:"primaryKey" json:"id"`
	Nama      string    `json:"nama" validate:"required"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
