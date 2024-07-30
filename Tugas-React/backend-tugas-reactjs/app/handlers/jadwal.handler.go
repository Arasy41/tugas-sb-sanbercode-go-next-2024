package handlers

import (
	"go-vercel-app/app/config"
	"go-vercel-app/app/models"
	"go-vercel-app/app/utils"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// GetAllJadwals godoc
// @Summary Get all jadwals
// @Description Get a list of all jadwals
// @Tags jadwals
// @Produce json
// @Success 200 {array} models.JadwalKuliah
// @Router /api/jadwals [get]
func GetAllJadwal(ctx *gin.Context) {
	var jadwals []models.JadwalKuliah

	if err := config.DB.Find(&jadwals).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"data": jadwals})
}

// GetJadwalByID godoc
// @Summary Get jadwal by ID
// @Description Get a single jadwal by ID
// @Tags jadwals
// @Produce json
// @Param id path int true "Jadwal ID"
// @Success 200 {object} models.JadwalKuliah
// @Failure 404 {object} map[string]interface{}
// @Router /api/jadwals/{id} [get]
func GetJadwalByID(ctx *gin.Context) {
	var jadwal models.JadwalKuliah
	id := ctx.Param("id")

	if err := config.DB.Preload("Dosen").Preload("Mahasiswa").First(&jadwal, id).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Jadwal not found"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"data": jadwal})
}

// CreateJadwal godoc
// @Summary Create a new jadwal
// @Description Create a new jadwal with the input payload
// @Tags jadwals
// @Accept json
// @Produce json
// @Param jadwal body models.JadwalKuliahRequest true "Jadwal Request"
// @Success 201 {object} models.JadwalKuliah
// @Failure 400 {object} map[string]interface{}
// @Failure 500 {object} map[string]interface{}
// @Router /api/jadwals [post]
func CreateJadwal(ctx *gin.Context) {
	var jadwal models.JadwalKuliah
	if err := ctx.ShouldBindJSON(&jadwal); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Validasi hari dan waktu
	if err := utils.ValidateJadwal(&jadwal); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB.Create(&jadwal).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusCreated, gin.H{"data": jadwal})
}

// UpdateJadwal godoc
// @Summary Update an existing jadwal
// @Description Update a jadwal by ID with the input payload
// @Tags jadwals
// @Accept json
// @Produce json
// @Param id path int true "Jadwal ID"
// @Param jadwal body models.JadwalKuliahRequest true "Jadwal Request"
// @Success 200 {object} models.JadwalKuliah
// @Failure 400 {object} map[string]interface{}
// @Failure 404 {object} map[string]interface{}
// @Failure 500 {object} map[string]interface{}
// @Router /api/jadwals/{id} [put]
func UpdateJadwal(ctx *gin.Context) {
	var jadwal models.JadwalKuliah
	idStr := ctx.Param("id")
	id, _ := strconv.Atoi(idStr)

	if err := config.DB.First(&jadwal, id).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Jadwal not found"})
		return
	}

	if err := ctx.ShouldBindJSON(&jadwal); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Validasi hari dan waktu
	if err := utils.ValidateJadwal(&jadwal); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB.Save(&jadwal).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"data": jadwal})
}

// DeleteJadwal godoc
// @Summary Delete a jadwal
// @Description Delete a jadwal by ID
// @Tags jadwals
// @Produce json
// @Param id path int true "Jadwal ID"
// @Success 200 {object} map[string]interface{}
// @Failure 404 {object} map[string]interface{}
// @Failure 500 {object} map[string]interface{}
// @Router /api/jadwals/{id} [delete]
func DeleteJadwal(ctx *gin.Context) {
	idStr := ctx.Param("id")
	id, _ := strconv.Atoi(idStr)

	if err := config.DB.First(&models.JadwalKuliah{}, id).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Jadwal not found"})
		return
	}

	if err := config.DB.Delete(&models.JadwalKuliah{}, id).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Jadwal deleted"})
}
