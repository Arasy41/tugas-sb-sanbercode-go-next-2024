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

// GetAllMataKuliah
func GetAllMataKuliah(w http.ResponseWriter, _ *http.Request, _ httprouter.Params) {
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	matakuliahs, err := repo.GetAllMataKuliah(ctx)

	if err != nil {
		utils.ResponseJSON(w, err, http.StatusInternalServerError)
		return
	}

	utils.ResponseJSON(w, matakuliahs, http.StatusOK)
}

// GetByIDMataKuliah
func GetByIdMataKuliah(w http.ResponseWriter, _ *http.Request, ps httprouter.Params) {
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	var idMataKuliah = ps.ByName("id")

	if idMataKuliah == "" || idMataKuliah == "0" {
		utils.ResponseJSON(w, fmt.Errorf("ID tidak boleh kosong atau 0"), http.StatusBadRequest)
		return
	}

	// Optional: Check if ID is a valid integer
	if _, err := strconv.Atoi(idMataKuliah); err != nil {
		utils.ResponseJSON(w, fmt.Errorf("ID tidak valid"), http.StatusBadRequest)
		return
	}

	matakuliahs, err := repo.GetMataKuliahByID(ctx, idMataKuliah)

	if err != nil {
		utils.ResponseJSON(w, err, http.StatusInternalServerError)
		return
	}

	utils.ResponseJSON(w, matakuliahs, http.StatusOK)
}

// PostMataKuliah
func CreateMataKuliah(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	if r.Header.Get("Content-Type") != "application/json" {
		http.Error(w, "Gunakan content type application / json", http.StatusBadRequest)
		return
	}

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	var matkul models.MataKuliah
	if err := json.NewDecoder(r.Body).Decode(&matkul); err != nil {
		utils.ResponseJSON(w, err, http.StatusBadRequest)
		return
	}

	if err := repo.InsertMataKuliah(ctx, matkul); err != nil {
		utils.ResponseJSON(w, err, http.StatusInternalServerError)
		return
	}

	res := map[string]string{
		"status": "Succesfully Created",
	}

	utils.ResponseJSON(w, res, http.StatusCreated)

}

// UpdateMataKuliah
func UpdateMataKuliah(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	if r.Header.Get("Content-Type") != "application/json" {
		http.Error(w, "Gunakan content type application / json", http.StatusBadRequest)
		return
	}

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	var matkul models.MataKuliah

	if err := json.NewDecoder(r.Body).Decode(&matkul); err != nil {
		utils.ResponseJSON(w, err, http.StatusBadRequest)
		return
	}

	var idMataKuliah = ps.ByName("id")

	if idMataKuliah == "" || idMataKuliah == "0" {
		utils.ResponseJSON(w, fmt.Errorf("ID tidak boleh kosong atau 0"), http.StatusBadRequest)
		return
	}

	// Optional: Check if ID is a valid integer
	if _, err := strconv.Atoi(idMataKuliah); err != nil {
		utils.ResponseJSON(w, fmt.Errorf("ID tidak valid"), http.StatusBadRequest)
		return
	}

	if err := repo.UpdateMataKuliah(ctx, matkul, idMataKuliah); err != nil {
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

// DeleteMataKuliah
func DeleteMataKuliah(w http.ResponseWriter, _ *http.Request, ps httprouter.Params) {
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	var idMataKuliah = ps.ByName("id")
	if idMataKuliah == "" || idMataKuliah == "0" {
		utils.ResponseJSON(w, fmt.Errorf("ID tidak boleh kosong atau 0"), http.StatusBadRequest)
		return
	}

	if _, err := strconv.Atoi(idMataKuliah); err != nil {
		utils.ResponseJSON(w, fmt.Errorf("ID tidak valid"), http.StatusBadRequest)
		return
	}

	if err := repo.DeleteMataKuliah(ctx, idMataKuliah); err != nil {
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
