package repositories

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
	"log"
	"time"

	"github.com/Arasy41/tugas-sb-sanbercode-go-next-2024/config"
	"github.com/Arasy41/tugas-sb-sanbercode-go-next-2024/models"
)

const (
	tableMahasiswa = "mahasiswa"
	layoutDateTime = "2006-01-02 15:04:05"
)

// GetAll
func GetAllMahasiswa(ctx context.Context) ([]models.Mahasiswa, error) {
	var mahasiswas []models.Mahasiswa
	db, err := config.ConnectDB()

	if err != nil {
		log.Fatal("Cant connect to Database", err)
	}

	queryText := fmt.Sprintf("SELECT * FROM %v Order By created_at DESC", tableMahasiswa)
	rowQuery, err := db.QueryContext(ctx, queryText)

	if err != nil {
		log.Fatal(err)
	}

	for rowQuery.Next() {
		var mahasiswa models.Mahasiswa
		var createdAt, updatedAt string
		if err = rowQuery.Scan(&mahasiswa.ID,
			&mahasiswa.Nama,
			&createdAt,
			&updatedAt); err != nil {
			return nil, err
		}

		//  Change format string to datetime for created_at and updated_at
		mahasiswa.CreatedAt, err = time.Parse(layoutDateTime, createdAt)

		if err != nil {
			log.Fatal(err)
		}

		mahasiswa.UpdatedAt, err = time.Parse(layoutDateTime, updatedAt)
		if err != nil {
			log.Fatal(err)
		}

		mahasiswas = append(mahasiswas, mahasiswa)
	}
	return mahasiswas, nil
}

// Get By Id Mahasiswa
func GetMahasiswaByID(ctx context.Context, id string) (*models.Mahasiswa, error) {
	db, err := config.ConnectDB()
	var mahasiswa models.Mahasiswa
	var createdAt, updatedAt string

	if err != nil {
		return nil, fmt.Errorf("cant connect to database: %w", err)
	}
	defer db.Close()

	stmt, err := db.Prepare("SELECT * FROM mahasiswa WHERE id = ?")
	if err != nil {
		log.Fatal(err)
	}

	err = stmt.QueryRow(id).Scan(&mahasiswa.ID, &mahasiswa.Nama, &createdAt, &updatedAt)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return &mahasiswa, err
	}
	if mahasiswa.CreatedAt, err = time.Parse(layoutDateTime, createdAt); err != nil {
		return nil, err
	}
	if mahasiswa.UpdatedAt, err = time.Parse(layoutDateTime, updatedAt); err != nil {
		return nil, err
	}

	return &mahasiswa, nil
}

// Insert Mahasiswa
func InsertMahasiswa(ctx context.Context, mahasiswa models.Mahasiswa) error {
	db, err := config.ConnectDB()
	if err != nil {
		log.Fatal("Can't connect to ConnectDB", err)
	}

	queryText := fmt.Sprintf("INSERT INTO %v (nama, created_at, updated_at) values('%v', NOW(), NOW())", tableMahasiswa, mahasiswa.Nama)

	_, err = db.ExecContext(ctx, queryText)
	if err != nil {
		return err
	}
	return nil
}

// Update Mahasiswa
func UpdateMahasiswa(ctx context.Context, mahasiswa models.Mahasiswa, id string) error {
	db, err := config.ConnectDB()
	if err != nil {
		log.Fatal("Can't connect to ConnectDB", err)
	}

	queryText := fmt.Sprintf("UPDATE %v set nama ='%s', updated_at = NOW() where id = %s",
		tableMahasiswa,
		mahasiswa.Nama,
		id,
	)

	_, err = db.ExecContext(ctx, queryText)
	if err != nil {
		return err
	}

	return nil
}

// Delete Mahasiswa
func DeleteMahasiswa(ctx context.Context, id string) error {
	db, err := config.ConnectDB()
	if err != nil {
		log.Fatal("Can't connect to ConnectDB", err)
	}

	queryText := fmt.Sprintf("DELETE FROM %v where id = %s", tableMahasiswa, id)

	s, err := db.ExecContext(ctx, queryText)

	if err != nil && err != sql.ErrNoRows {
		return err
	}

	check, err := s.RowsAffected()
	fmt.Println(check)
	if check == 0 {
		return errors.New("id tidak ada")
	}

	if err != nil {
		fmt.Println(err.Error())
	}

	return nil
}
