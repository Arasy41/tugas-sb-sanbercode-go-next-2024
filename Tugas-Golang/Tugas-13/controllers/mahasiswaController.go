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

// GetAllMahasiswa
func GetAllMahasiswa(w http.ResponseWriter, _ *http.Request, _ httprouter.Params) {
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	mahasiswas, err := repo.GetAllMahasiswa(ctx)

	if err != nil {
		utils.ResponseJSON(w, err, http.StatusInternalServerError)
		return
	}

	utils.ResponseJSON(w, mahasiswas, http.StatusOK)
}

// GetByIDMahasiswa
func GetByIdMahasiswa(w http.ResponseWriter, _ *http.Request, ps httprouter.Params) {
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	var idMahasiswa = ps.ByName("id")

	if idMahasiswa == "" || idMahasiswa == "0" {
		utils.ResponseJSON(w, fmt.Errorf("ID tidak boleh kosong atau 0"), http.StatusBadRequest)
		return
	}

	// Optional: Check if ID is a valid integer
	if _, err := strconv.Atoi(idMahasiswa); err != nil {
		utils.ResponseJSON(w, fmt.Errorf("ID tidak valid"), http.StatusBadRequest)
		return
	}

	mahasiswas, err := repo.GetMahasiswaByID(ctx, idMahasiswa)

	if err != nil {
		utils.ResponseJSON(w, err, http.StatusInternalServerError)
		return
	}

	utils.ResponseJSON(w, mahasiswas, http.StatusOK)
}

// PostMahasiswa
func CreateMahasiswa(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	if r.Header.Get("Content-Type") != "application/json" {
		http.Error(w, "Gunakan content type application / json", http.StatusBadRequest)
		return
	}

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	var mhs models.Mahasiswa
	if err := json.NewDecoder(r.Body).Decode(&mhs); err != nil {
		utils.ResponseJSON(w, err, http.StatusBadRequest)
		return
	}

	if err := repo.InsertMahasiswa(ctx, mhs); err != nil {
		utils.ResponseJSON(w, err, http.StatusInternalServerError)
		return
	}

	res := map[string]string{
		"status": "Succesfully Created",
	}

	utils.ResponseJSON(w, res, http.StatusCreated)

}

// UpdateMahasiswa
func UpdateMahasiswa(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	if r.Header.Get("Content-Type") != "application/json" {
		http.Error(w, "Gunakan content type application / json", http.StatusBadRequest)
		return
	}

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	var mhs models.Mahasiswa

	if err := json.NewDecoder(r.Body).Decode(&mhs); err != nil {
		utils.ResponseJSON(w, err, http.StatusBadRequest)
		return
	}

	var idMahasiswa = ps.ByName("id")

	if idMahasiswa == "" || idMahasiswa == "0" {
		utils.ResponseJSON(w, fmt.Errorf("ID tidak boleh kosong atau 0"), http.StatusBadRequest)
		return
	}

	// Optional: Check if ID is a valid integer
	if _, err := strconv.Atoi(idMahasiswa); err != nil {
		utils.ResponseJSON(w, fmt.Errorf("ID tidak valid"), http.StatusBadRequest)
		return
	}

	if err := repo.UpdateMahasiswa(ctx, mhs, idMahasiswa); err != nil {
		if err.Error() == "id does not exist" {
			utils.ResponseJSON(w, fmt.Errorf("ID tidak ditemukan"), http.StatusNotFound)
		} else {
			utils.ResponseJSON(w, err, http.StatusInternalServerError)
		}
		return
	}

	res := map[string]string{
		"status": "Succesfully Updated",
	}

	utils.ResponseJSON(w, res, http.StatusCreated)
}

// DeleteMahasiswa
func DeleteMahasiswa(w http.ResponseWriter, _ *http.Request, ps httprouter.Params) {
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	var idMahasiswa = ps.ByName("id")
	if idMahasiswa == "" || idMahasiswa == "0" {
		utils.ResponseJSON(w, fmt.Errorf("ID tidak boleh kosong atau 0"), http.StatusBadRequest)
		return
	}

	if _, err := strconv.Atoi(idMahasiswa); err != nil {
		utils.ResponseJSON(w, fmt.Errorf("ID tidak valid"), http.StatusBadRequest)
		return
	}

	if err := repo.DeleteMahasiswa(ctx, idMahasiswa); err != nil {
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
