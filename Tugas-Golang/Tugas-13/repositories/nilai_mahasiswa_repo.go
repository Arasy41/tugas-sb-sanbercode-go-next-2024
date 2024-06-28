package repositories

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
	"time"

	"github.com/Arasy41/tugas-sb-sanbercode-go-next-2024/config"
	"github.com/Arasy41/tugas-sb-sanbercode-go-next-2024/models"
)

const (
	tableNilaiMahasiswa = "nilai"
)

// GetAllNilaiMahasiswa retrieves all NilaiMahasiswa records.
func GetAllNilaiMahasiswa(ctx context.Context) ([]models.NilaiMahasiswa, error) {
	var nilais []models.NilaiMahasiswa

	db, err := config.ConnectDB()
	if err != nil {
		return nil, fmt.Errorf("can't connect to database: %w", err)
	}
	defer db.Close()

	queryText := fmt.Sprintf("SELECT id, indeks, skor, created_at, updated_at, mahasiswa_id, mata_kuliah_id FROM %v ORDER BY created_at DESC", tableNilaiMahasiswa)
	rows, err := db.QueryContext(ctx, queryText)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var nilai models.NilaiMahasiswa
		var createdAt, updatedAt string

		if err := rows.Scan(
			&nilai.ID,
			&nilai.Indeks,
			&nilai.Skor,
			&createdAt,
			&updatedAt,
			&nilai.MahasiswaID,
			&nilai.MataKuliahID,
		); err != nil {
			return nil, err
		}

		nilai.CreatedAt, err = time.Parse(layoutDateTime, createdAt)
		if err != nil {
			return nil, err
		}

		nilai.UpdatedAt, err = time.Parse(layoutDateTime, updatedAt)
		if err != nil {
			return nil, err
		}

		nilais = append(nilais, nilai)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return nilais, nil
}

// GetNilaiMahasiswaByID retrieves a single NilaiMahasiswa record by ID.
func GetNilaiMahasiswaByID(ctx context.Context, id string) (*models.NilaiMahasiswa, error) {
	db, err := config.ConnectDB()
	if err != nil {
		return nil, fmt.Errorf("can't connect to database: %w", err)
	}
	defer db.Close()

	var nilai models.NilaiMahasiswa
	queryText := fmt.Sprintf("SELECT id, indeks, skor, created_at, updated_at, mahasiswa_id, mata_kuliah_id FROM %v WHERE id = %v", tableNilaiMahasiswa, id)
	row := db.QueryRowContext(ctx, queryText)

	var createdAt, updatedAt string
	err = row.Scan(
		&nilai.ID,
		&nilai.Indeks,
		&nilai.Skor,
		&createdAt,
		&updatedAt,
		&nilai.MahasiswaID,
		&nilai.MataKuliahID,
	)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, nil // Return nil if no rows found
		}
		return nil, err
	}

	nilai.CreatedAt, err = time.Parse(layoutDateTime, createdAt)
	if err != nil {
		return nil, err
	}

	nilai.UpdatedAt, err = time.Parse(layoutDateTime, updatedAt)
	if err != nil {
		return nil, err
	}

	return &nilai, nil
}

// GetDetailNilaiById
func GetDetailNilaiId(ctx context.Context, id string) (*models.DetailNilaiMahasiswa, error) {
	db, err := config.ConnectDB()
	if err != nil {
		return nil, fmt.Errorf("cant connect to database: %w", err)
	}
	defer db.Close()

	var nilaiMahasiswa models.DetailNilaiMahasiswa
	queryText := fmt.Sprintf("SELECT nm.id, nm.skor, nm.indeks, nm.mahasiswa_id, m.nama, nm.mata_kuliah_id, mk.nama, nm.created_at, nm.updated_at FROM %v nm INNER JOIN mahasiswa m ON nm.mahasiswa_id = m.id INNER JOIN mata_kuliah mk ON nm.mata_kuliah_id = mk.id WHERE nm.id = %s ORDER BY nm.created_at DESC", tableNilaiMahasiswa, id)
	row := db.QueryRowContext(ctx, queryText)

	var createdAt, updatedAt string
	if err := row.Scan(
		&nilaiMahasiswa.ID,
		&nilaiMahasiswa.Skor,
		&nilaiMahasiswa.Indeks,
		&nilaiMahasiswa.MahasiswaID,
		&nilaiMahasiswa.NamaMahasiswa,
		&nilaiMahasiswa.MataKuliahID,
		&nilaiMahasiswa.NamaMataKuliah,
		&createdAt,
		&updatedAt); err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}

	if nilaiMahasiswa.CreatedAt, err = time.Parse(layoutDateTime, createdAt); err != nil {
		return nil, err
	}
	if nilaiMahasiswa.UpdatedAt, err = time.Parse(layoutDateTime, updatedAt); err != nil {
		return nil, err
	}

	return &nilaiMahasiswa, nil
}

// InsertNilaiMahasiswa inserts a new NilaiMahasiswa record.
func InsertNilaiMahasiswa(ctx context.Context, nilai models.NilaiMahasiswa) error {
	db, err := config.ConnectDB()
	if err != nil {
		return fmt.Errorf("can't connect to database: %w", err)
	}
	defer db.Close()

	if err := nilai.SkorValidation(); err != nil {
		return fmt.Errorf("validation error: %w", err)
	}

	nilai.IndeksValidation()

	queryText := fmt.Sprintf("INSERT INTO %v (indeks, skor, created_at, updated_at, mahasiswa_id, mata_kuliah_id) VALUES ('%v', %v, NOW(), NOW(), %v, %v)",
		tableNilaiMahasiswa,
		nilai.Indeks,
		nilai.Skor,
		nilai.MahasiswaID,
		nilai.MataKuliahID,
	)

	_, err = db.ExecContext(ctx, queryText)
	if err != nil {
		return err
	}

	return nil
}

func UpdateNilaiMahasiswa(ctx context.Context, nilai models.NilaiMahasiswa, id string) error {
	db, err := config.ConnectDB()
	if err != nil {
		return fmt.Errorf("can't connect to database: %w", err)
	}
	defer db.Close()

	if err := nilai.SkorValidation(); err != nil {
		return fmt.Errorf("validation error: %w", err)
	}

	nilai.IndeksValidation()

	queryText := fmt.Sprintf("UPDATE %v SET indeks = '%v', skor = %v, updated_at = NOW() WHERE id = %v",
		tableNilaiMahasiswa,
		nilai.Indeks,
		nilai.Skor,
		id,
	)

	_, err = db.ExecContext(ctx, queryText)
	if err != nil {
		return err
	}

	return nil
}

// DeleteNilaiMahasiswa deletes a NilaiMahasiswa record by ID.
func DeleteNilaiMahasiswa(ctx context.Context, id string) error {
	db, err := config.ConnectDB()
	if err != nil {
		return fmt.Errorf("can't connect to database: %w", err)
	}
	defer db.Close()

	queryText := fmt.Sprintf("DELETE FROM %v WHERE id = %v", tableNilaiMahasiswa, id)

	result, err := db.ExecContext(ctx, queryText)
	if err != nil {
		return err
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return err
	}

	if rowsAffected == 0 {
		return errors.New("no rows affected, record not found")
	}

	return nil
}
