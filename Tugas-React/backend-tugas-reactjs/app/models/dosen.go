package models

import "time"

type Dosen struct {
	ID           int        `gorm:"primaryKey" json:"id"`
	Nama         string     `gorm:"type:varchar(255)" json:"nama" validate:"required"`
	CreatedAt    time.Time  `json:"created_at"`
	UpdatedAt    time.Time  `json:"updated_at"`
	MataKuliahID int        `json:"matakuliah_id"`
	MataKuliah   MataKuliah `gorm:"foreignKey:MataKuliahID; manyToMany:MataKuliah;" json:"matakuliah"`
}
