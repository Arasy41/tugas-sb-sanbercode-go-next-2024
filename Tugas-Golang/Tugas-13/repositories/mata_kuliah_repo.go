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
	tableMatkul = "mata_kuliah"
)

// GetAll
func GetAllMataKuliah(ctx context.Context) ([]models.MataKuliah, error) {
	var mataKuliahs []models.MataKuliah
	db, err := config.ConnectDB()

	if err != nil {
		log.Fatal("Cant connect to Database", err)
	}

	queryText := fmt.Sprintf("SELECT * FROM %v Order By created_at DESC", tableMatkul)
	rowQuery, err := db.QueryContext(ctx, queryText)

	if err != nil {
		log.Fatal(err)
	}

	for rowQuery.Next() {
		var mataKuliah models.MataKuliah
		var createdAt, updatedAt string
		if err = rowQuery.Scan(&mataKuliah.ID,
			&mataKuliah.Nama,
			&createdAt,
			&updatedAt); err != nil {
			return nil, err
		}

		//  Change format string to datetime for created_at and updated_at
		mataKuliah.CreatedAt, err = time.Parse(layoutDateTime, createdAt)

		if err != nil {
			log.Fatal(err)
		}

		mataKuliah.UpdatedAt, err = time.Parse(layoutDateTime, updatedAt)
		if err != nil {
			log.Fatal(err)
		}

		mataKuliahs = append(mataKuliahs, mataKuliah)
	}
	return mataKuliahs, nil
}

// Get By Id MataKuliah
func GetMataKuliahByID(ctx context.Context, id string) (*models.MataKuliah, error) {
	db, err := config.ConnectDB()
	if err != nil {
		return nil, fmt.Errorf("cant connect to database: %w", err)
	}
	defer db.Close()

	var mataKuliah models.MataKuliah
	queryText := fmt.Sprintf("SELECT id, nama, created_at, updated_at FROM %v WHERE id = %v", tableMatkul, id)
	row := db.QueryRowContext(ctx, queryText)

	var createdAt, updatedAt string
	if err := row.Scan(&mataKuliah.ID, &mataKuliah.Nama, &createdAt, &updatedAt); err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}

	if mataKuliah.CreatedAt, err = time.Parse(layoutDateTime, createdAt); err != nil {
		return nil, err
	}
	if mataKuliah.UpdatedAt, err = time.Parse(layoutDateTime, updatedAt); err != nil {
		return nil, err
	}

	return &mataKuliah, nil
}

// Insert MataKuliah
func InsertMataKuliah(ctx context.Context, mataKuliah models.MataKuliah) error {
	db, err := config.ConnectDB()
	if err != nil {
		log.Fatal("Can't connect to ConnectDB", err)
	}

	queryText := fmt.Sprintf("INSERT INTO %v (nama, created_at, updated_at) values('%v', NOW(), NOW())", tableMatkul, mataKuliah.Nama)

	_, err = db.ExecContext(ctx, queryText)
	if err != nil {
		return err
	}
	return nil
}

// Update MataKuliah
func UpdateMataKuliah(ctx context.Context, mataKuliah models.MataKuliah, id string) error {
	db, err := config.ConnectDB()
	if err != nil {
		log.Fatal("Can't connect to ConnectDB", err)
	}

	queryText := fmt.Sprintf("UPDATE %v set nama ='%s', updated_at = NOW() where id = %s",
		tableMatkul,
		mataKuliah.Nama,
		id,
	)

	_, err = db.ExecContext(ctx, queryText)
	if err != nil {
		return err
	}

	return nil
}

// Delete MataKuliah
func DeleteMataKuliah(ctx context.Context, id string) error {
	db, err := config.ConnectDB()
	if err != nil {
		log.Fatal("Can't connect to ConnectDB", err)
	}

	queryText := fmt.Sprintf("DELETE FROM %v where id = %s", tableMatkul, id)

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
