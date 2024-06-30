package controllers

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"tugas-quiz-1-sb-sanbercode/config"
	"tugas-quiz-1-sb-sanbercode/models"
	repo "tugas-quiz-1-sb-sanbercode/repositories"
	"tugas-quiz-1-sb-sanbercode/utils"

	"github.com/julienschmidt/httprouter"
)

// GetAllCategory
func GetAllCategory(w http.ResponseWriter, _ *http.Request, _ httprouter.Params) {
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	categories, err := repo.GetAllCategory(ctx)

	if err != nil {
		utils.ResponseJSON(w, err, http.StatusInternalServerError)
		return
	}

	utils.ResponseJSON(w, categories, http.StatusOK)
}

// GetByIdCategoryArticle
func GetByIdCategoryArticle(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	var idCategory = ps.ByName("id")

	if idCategory == "" || idCategory == "0" {
		utils.ResponseJSON(w, fmt.Errorf("ID tidak boleh kosong atau 0"), http.StatusBadRequest)
		return
	}

	// Optional: Check if ID is a valid integer
	if _, err := strconv.Atoi(idCategory); err != nil {
		utils.ResponseJSON(w, fmt.Errorf("ID tidak valid"), http.StatusBadRequest)
		return
	}

	db, err := config.ConnectDB()
	if err != nil {
		utils.ResponseJSON(w, fmt.Errorf("can't connect to database: %v", err), http.StatusInternalServerError)
		return
	}
	defer db.Close()

	filters := make(map[string]interface{})

	// Ambil parameter query dari URL jika tersedia
	title := r.URL.Query().Get("title")
	if title != "" {
		filters["title"] = title
	}

	if minYear, err := strconv.Atoi(r.URL.Query().Get("minYear")); err == nil {
		filters["minYear"] = minYear
	}
	if maxYear, err := strconv.Atoi(r.URL.Query().Get("maxYear")); err == nil {
		filters["maxYear"] = maxYear
	}
	if minWord, err := strconv.Atoi(r.URL.Query().Get("minWord")); err == nil {
		filters["minWord"] = minWord
	}
	if maxWord, err := strconv.Atoi(r.URL.Query().Get("maxWord")); err == nil {
		filters["maxWord"] = maxWord
	}

	sortField := "created_at"
	sortOrder := "DESC"
	if sortBy := r.URL.Query().Get("sortBy"); sortBy != "" {
		sortField = "title"
		sortOrder = sortBy
	}

	category, err := repo.GetByIdCategoryArticle(ctx, db, idCategory, filters, sortField, sortOrder)
	if err != nil {
		utils.ResponseJSON(w, err, http.StatusInternalServerError)
		return
	}

	if category == nil {
		utils.ResponseJSON(w, fmt.Errorf("category not found"), http.StatusNotFound)
		return
	}

	utils.ResponseJSON(w, category, http.StatusOK)
}

// PostCategory
func CreateCategory(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	if r.Header.Get("Content-Type") != "application/json" {
		http.Error(w, "Gunakan content type application / json", http.StatusBadRequest)
		return
	}

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	var mhs models.Category
	if err := json.NewDecoder(r.Body).Decode(&mhs); err != nil {
		utils.ResponseJSON(w, err, http.StatusBadRequest)
		return
	}

	if err := repo.InsertCategory(ctx, mhs); err != nil {
		utils.ResponseJSON(w, err, http.StatusInternalServerError)
		return
	}

	res := map[string]string{
		"status": "Succesfully Created",
	}

	utils.ResponseJSON(w, res, http.StatusCreated)

}

// UpdateCategory
func UpdateCategory(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	if r.Header.Get("Content-Type") != "application/json" {
		http.Error(w, "Gunakan content type application / json", http.StatusBadRequest)
		return
	}

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	var mhs models.Category

	if err := json.NewDecoder(r.Body).Decode(&mhs); err != nil {
		utils.ResponseJSON(w, err, http.StatusBadRequest)
		return
	}

	var idCategory = ps.ByName("id")

	if idCategory == "" || idCategory == "0" {
		utils.ResponseJSON(w, fmt.Errorf("ID tidak boleh kosong atau 0"), http.StatusBadRequest)
		return
	}

	// Optional: Check if ID is a valid integer
	if _, err := strconv.Atoi(idCategory); err != nil {
		utils.ResponseJSON(w, fmt.Errorf("ID tidak valid"), http.StatusBadRequest)
		return
	}

	if err := repo.UpdateCategory(ctx, mhs, idCategory); err != nil {
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

// DeleteCategory
func DeleteCategory(w http.ResponseWriter, _ *http.Request, ps httprouter.Params) {
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	var idCategory = ps.ByName("id")
	if idCategory == "" || idCategory == "0" {
		utils.ResponseJSON(w, fmt.Errorf("ID tidak boleh kosong atau 0"), http.StatusBadRequest)
		return
	}

	if _, err := strconv.Atoi(idCategory); err != nil {
		utils.ResponseJSON(w, fmt.Errorf("ID tidak valid"), http.StatusBadRequest)
		return
	}

	if err := repo.DeleteCategory(ctx, idCategory); err != nil {
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
