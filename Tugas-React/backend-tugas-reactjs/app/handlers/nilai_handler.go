package handlers

import (
	"go-vercel-app/app/config"
	"go-vercel-app/app/models"
	"go-vercel-app/app/utils"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

// GetAllNilai godoc
// @Summary Get all nilai
// @Description Get a list of all nilai
// @Tags nilai
// @Produce json
// @Success 200 {array} models.NilaiList
// @Router /api/nilai [get]
func GetAllNilai(ctx *gin.Context) {
	var nilai []models.Nilai

	if err := config.DB.Preload("Mahasiswa").Preload("MataKuliah").Preload("User").Find(&nilai).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	var listNilai []models.NilaiList
	for _, res := range nilai {
		listNilai = append(listNilai, models.NilaiList{
			Indeks:        res.Indeks,
			Skor:          res.Skor,
			MahasiswaName: res.Mahasiswa.Nama,
			MataKuliah:    res.MataKuliah.Nama,
			User:          res.User.Username,
		})
	}
	ctx.JSON(http.StatusOK, gin.H{"data": listNilai})
}

// GetNilaiByID godoc
// @Summary Get nilai by ID
// @Description Get a single nilai by ID
// @Tags nilai
// @Produce json
// @Param id path int true "Nilai ID"
// @Success 200 {object} models.Nilai
// @Failure 404 {object} map[string]interface{}
// @Router /api/nilai/{id} [get]
func GetNilaiByID(ctx *gin.Context) {
	var nilai models.Nilai
	id := ctx.Param("id")

	if err := config.DB.Preload("MataKuliah").Preload("User").Preload("Mahasiswa").First(&nilai, id).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"data": nilai})
}

// CreateNilai godoc
// @Summary Create a new nilai
// @Description Create a new nilai with the input payload
// @Tags nilai
// @Accept json
// @Produce json
// @Param nilai body models.NilaiRequest true "Nilai Request"
// @Success 201 {object} models.Nilai
// @Failure 400 {object} map[string]interface{}
// @Failure 500 {object} map[string]interface{}
// @Router /api/nilai [post]
func CreateNilai(ctx *gin.Context) {
	var req models.NilaiRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userId, exists := ctx.Get("userID")
	if !exists {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	userIdInt, ok := userId.(int)
	if !ok {
		log.Fatal("user id :", userId, "and", userIdInt)
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse user ID"})
		return
	}

	req.UserID = userIdInt

	if err := utils.SkorValidation(req.Skor); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	indeks, err := utils.IndeksValidation(req.Skor)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Can't create Index"})
		return
	}

	nilai := models.Nilai{
		Indeks:       indeks,
		Skor:         req.Skor,
		CreatedAt:    time.Now(),
		MahasiswaID:  req.MahasiswaID,
		MataKuliahID: req.MataKuliahID,
		UserID:       req.UserID,
	}

	if err := config.DB.Create(&nilai).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusCreated, gin.H{"data": nilai})
}

// UpdateNilai godoc
// @Summary Update an existing nilai
// @Description Update a nilai by ID with the input payload
// @Tags nilai
// @Accept json
// @Produce json
// @Param id path int true "Nilai ID"
// @Param nilai body models.NilaiRequest true "Nilai Request"
// @Success 200 {object} models.Nilai
// @Failure 400 {object} map[string]interface{}
// @Failure 404 {object} map[string]interface{}
// @Failure 500 {object} map[string]interface{}
// @Router /api/nilai/{id} [put]
func UpdateNilai(ctx *gin.Context) {
	var nilaiRequest models.NilaiRequest
	var nilai models.Nilai
	idStr := ctx.Param("id")

	id, _ := strconv.Atoi(idStr)

	if err := ctx.ShouldBindJSON(&nilaiRequest); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userId, exists := ctx.Get("userID")
	if !exists {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	userIdInt, ok := userId.(int)
	if !ok {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse user ID"})
		return
	}

	nilaiRequest.UserID = userIdInt

	if err := config.DB.First(&nilai, id).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Nilai not found"})
		return
	}

	if err := utils.SkorValidation(nilaiRequest.Skor); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	indeks, err := utils.IndeksValidation(nilaiRequest.Skor)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Can't create Index"})
		return
	}

	nilai.Indeks = indeks
	nilai.Skor = nilaiRequest.Skor
	nilai.MahasiswaID = nilaiRequest.MahasiswaID
	nilai.MataKuliahID = nilaiRequest.MataKuliahID
	nilai.UserID = nilaiRequest.UserID

	if err := config.DB.Save(&nilai).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"data": nilai})
}

// DeleteNilai godoc
// @Summary Delete a nilai
// @Description Delete a nilai by ID
// @Tags nilai
// @Produce json
// @Param id path int true "Nilai ID"
// @Success 200 {object} map[string]interface{}
// @Failure 404 {object} map[string]interface{}
// @Failure 500 {object} map[string]interface{}
// @Router /api/nilai/{id} [delete]
func DeleteNilai(ctx *gin.Context) {
	idStr := ctx.Param("id")

	id, _ := strconv.Atoi(idStr)

	if err := config.DB.First(&models.Nilai{}, id).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Nilai not found"})
		return
	}

	if err := config.DB.Delete(&models.Nilai{}, id).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Nilai deleted"})
}
