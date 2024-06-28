package controllers

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/Arasy41/tugas-sb-sanbercode-go-next-2024/models"
	repo "github.com/Arasy41/tugas-sb-sanbercode-go-next-2024/repositories"
	"github.com/Arasy41/tugas-sb-sanbercode-go-next-2024/utils"
	"github.com/julienschmidt/httprouter"
)

// CreateNilaiMahasiswa creates a new NilaiMahasiswa record.
func CreateNilaiMahasiswa(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	if r.Header.Get("Content-Type") != "application/json" {
		http.Error(w, "Gunakan content type application/json", http.StatusBadRequest)
		return
	}

	ctx := context.Background()

	var nilai models.NilaiMahasiswa
	if err := json.NewDecoder(r.Body).Decode(&nilai); err != nil {
		utils.ResponseJSON(w, err, http.StatusBadRequest)
		return
	}

	// Validate Skor
	if err := nilai.SkorValidation(); err != nil {
		utils.ResponseJSON(w, err.Error(), http.StatusBadRequest)
		return
	}

	nilai.IndeksValidation()

	if err := repo.InsertNilaiMahasiswa(ctx, nilai); err != nil {
		utils.ResponseJSON(w, err, http.StatusInternalServerError)
		return
	}

	res := map[string]string{"message": "Nilai Mahasiswa berhasil ditambahkan"}
	utils.ResponseJSON(w, res, http.StatusCreated)
}

// GetAllNilaiMahasiswa retrieves all NilaiMahasiswa records.
func GetAllNilaiMahasiswa(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	ctx := context.Background()

	nilais, err := repo.GetAllNilaiMahasiswa(ctx)
	if err != nil {
		utils.ResponseJSON(w, err, http.StatusInternalServerError)
		return
	}

	utils.ResponseJSON(w, nilais, http.StatusOK)
}

// Get Nilai Mahasiswa By Id
// GetByIDMataKuliah
func GetByIdNilaiMahasiswa(w http.ResponseWriter, _ *http.Request, ps httprouter.Params) {
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	var idNilai = ps.ByName("id")

	if idNilai == "" || idNilai == "0" {
		utils.ResponseJSON(w, fmt.Errorf("ID tidak boleh kosong atau 0"), http.StatusBadRequest)
		return
	}

	// Optional: Check if ID is a valid integer
	if _, err := strconv.Atoi(idNilai); err != nil {
		utils.ResponseJSON(w, fmt.Errorf("ID tidak valid"), http.StatusBadRequest)
		return
	}

	nilaiMahasiswa, err := repo.GetNilaiMahasiswaByID(ctx, idNilai)

	if err != nil {
		utils.ResponseJSON(w, err, http.StatusInternalServerError)
		return
	}

	utils.ResponseJSON(w, nilaiMahasiswa, http.StatusOK)
}

// Get detail nilai by id
func GetDetailNilaiMahasiswaById(w http.ResponseWriter, _ *http.Request, ps httprouter.Params) {
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	var idNilai = ps.ByName("id")

	if idNilai == "" || idNilai == "0" {
		utils.ResponseJSON(w, fmt.Errorf("ID tidak boleh kosong atau 0"), http.StatusBadRequest)
		return
	}

	// Optional: Check if ID is a valid integer
	if _, err := strconv.Atoi(idNilai); err != nil {
		utils.ResponseJSON(w, fmt.Errorf("ID tidak valid"), http.StatusBadRequest)
		return
	}

	nilaiMahasiswa, err := repo.GetDetailNilaiId(ctx, idNilai)

	if err != nil {
		utils.ResponseJSON(w, err, http.StatusInternalServerError)
		return
	}

	utils.ResponseJSON(w, nilaiMahasiswa, http.StatusOK)
}

// UpdateNilaiMahasiswa updates an existing NilaiMahasiswa record.
func UpdateNilaiMahasiswa(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	if r.Header.Get("Content-Type") != "application/json" {
		http.Error(w, "Gunakan content type application/json", http.StatusBadRequest)
		return
	}

	ctx := context.Background()

	var nilai models.NilaiMahasiswa
	if err := json.NewDecoder(r.Body).Decode(&nilai); err != nil {
		utils.ResponseJSON(w, err, http.StatusBadRequest)
		return
	}

	// Validate Skor
	if err := nilai.SkorValidation(); err != nil {
		utils.ResponseJSON(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Validate Indeks (if needed)
	nilai.IndeksValidation()

	id := ps.ByName("id")
	if id == "" {
		utils.ResponseJSON(w, fmt.Errorf("ID tidak boleh kosong"), http.StatusBadRequest)
		return
	}

	// Convert id to int
	idInt, err := strconv.Atoi(id)
	if err != nil {
		utils.ResponseJSON(w, fmt.Errorf("ID tidak valid"), http.StatusBadRequest)
		return
	}

	nilai.ID = idInt

	if err := repo.UpdateNilaiMahasiswa(ctx, nilai, id); err != nil {
		utils.ResponseJSON(w, err, http.StatusInternalServerError)
		return
	}

	res := map[string]string{"message": "Nilai Mahasiswa berhasil diperbarui"}
	utils.ResponseJSON(w, res, http.StatusOK)
}

// DeleteNilaiMahasiswa deletes an existing NilaiMahasiswa record.
func DeleteNilaiMahasiswa(w http.ResponseWriter, _ *http.Request, ps httprouter.Params) {
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	var idNilai = ps.ByName("id")
	if idNilai == "" || idNilai == "0" {
		utils.ResponseJSON(w, fmt.Errorf("ID tidak boleh kosong atau 0"), http.StatusBadRequest)
		return
	}

	if _, err := strconv.Atoi(idNilai); err != nil {
		utils.ResponseJSON(w, fmt.Errorf("ID tidak valid"), http.StatusBadRequest)
		return
	}

	if err := repo.DeleteNilaiMahasiswa(ctx, idNilai); err != nil {
		kesalahan := map[string]string{
			"error": fmt.Sprintf("%v", err),
		}
		utils.ResponseJSON(w, kesalahan, http.StatusInternalServerError)
		return
	}

	res := map[string]string{
		"status": "Succesfully Deleted",
	}

	utils.ResponseJSON(w, res, http.StatusOK)
}
