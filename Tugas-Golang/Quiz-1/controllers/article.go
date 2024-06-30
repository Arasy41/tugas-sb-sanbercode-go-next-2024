package controllers

import (
	"encoding/json"
	"net/http"
	"strconv"
	"strings"
	"tugas-quiz-1-sb-sanbercode/models"
	"tugas-quiz-1-sb-sanbercode/repositories"
	"tugas-quiz-1-sb-sanbercode/utils"

	"github.com/julienschmidt/httprouter"
)

func GetAllArticles(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
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

	sortField := "created_at" // Default sorting field
	sortOrder := "DESC"       // Default sorting order
	if sortBy := r.URL.Query().Get("sortBy"); sortBy != "" {
		sortField = "title"
		sortOrder = sortBy
	}

	articles, err := repositories.GetAllArticles(r.Context(), filters, sortField, sortOrder)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Kirim response dalam bentuk JSON
	utils.ResponseJSON(w, articles, http.StatusOK)
}

func CreateArticle(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	var article models.Article
	if err := json.NewDecoder(r.Body).Decode(&article); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if errors := models.ValidateArticle(article); len(errors) > 0 {
		http.Error(w, strings.Join(errors, ", "), http.StatusBadRequest)
		return
	}

	article.ArticleLength = models.ValidateArticleLength(article.Content)
	if err := repositories.InsertArticle(r.Context(), article); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	res := map[string]string{
		"status": "Succesfully Created",
	}

	utils.ResponseJSON(w, res, http.StatusCreated)
}

func UpdateArticle(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	id, err := strconv.Atoi(ps.ByName("id"))
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}
	var article models.Article
	if err := json.NewDecoder(r.Body).Decode(&article); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if errors := models.ValidateArticle(article); len(errors) > 0 {
		http.Error(w, strings.Join(errors, ", "), http.StatusBadRequest)
		return
	}

	article.ID = id
	article.ArticleLength = models.ValidateArticleLength(article.Content)
	if err := repositories.UpdateArticle(r.Context(), article); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	res := map[string]string{
		"status": "Succesfully Updated",
	}

	utils.ResponseJSON(w, res, http.StatusCreated)
}

func DeleteArticle(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	id, err := strconv.Atoi(ps.ByName("id"))
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}
	if err := repositories.DeleteArticle(r.Context(), id); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	res := map[string]string{
		"status": "Succesfully Deleted",
	}

	utils.ResponseJSON(w, res, http.StatusOK)
}
