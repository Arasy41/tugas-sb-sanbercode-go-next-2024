package handlers

import (
	"go-vercel-app/app/config"
	"go-vercel-app/app/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// GetAllMataKuliah godoc
// @Summary Get all matakuliahs
// @Description Get a list of all matakuliahs
// @Tags matakuliahs
// @Produce json
// @Success 200 {array} models.MataKuliah
// @Router /api/matakuliahs [get]
func GetAllMataKuliah(ctx *gin.Context) {
	var matakuliahs []models.MataKuliah

	if err := config.DB.Find(&matakuliahs).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"data": matakuliahs})
}

// GetMataKuliahByID godoc
// @Summary Get matakuliah by ID
// @Description Get a single matakuliah by ID
// @Tags matakuliahs
// @Produce json
// @Param id path int true "MataKuliah ID"
// @Success 200 {object} models.MataKuliah
// @Failure 404 {object} map[string]interface{}
// @Router /api/matakuliahs/{id} [get]
func GetMataKuliahByID(ctx *gin.Context) {
	var matakuliah models.MataKuliah
	id := ctx.Param("id")

	if err := config.DB.First(&matakuliah, id).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"data": matakuliah})
}

// CreateMataKuliah godoc
// @Summary Create a new matakuliah
// @Description Create a new matakuliah with the input payload
// @Tags matakuliahs
// @Accept json
// @Produce json
// @Param matakuliah body models.MataKuliahRequest true "MataKuliah Request"
// @Success 201 {object} models.MataKuliahRequest
// @Failure 400 {object} map[string]interface{}
// @Failure 500 {object} map[string]interface{}
// @Router /api/matakuliahs [post]
func CreateMataKuliah(ctx *gin.Context) {
	var matakuliah models.MataKuliah
	if err := ctx.ShouldBindJSON(&matakuliah); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB.Create(&matakuliah).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusCreated, gin.H{"data": matakuliah})
}

// UpdateMataKuliah godoc
// @Summary Update an existing matakuliah
// @Description Update a matakuliah by ID with the input payload
// @Tags matakuliahs
// @Accept json
// @Produce json
// @Param id path int true "MataKuliah ID"
// @Param matakuliah body models.MataKuliah true "MataKuliah Request"
// @Success 200 {object} models.MataKuliah
// @Failure 400 {object} map[string]interface{}
// @Failure 404 {object} map[string]interface{}
// @Failure 500 {object} map[string]interface{}
// @Router /api/matakuliahs/{id} [put]
func UpdateMataKuliah(ctx *gin.Context) {
	var matakuliahRequest models.MataKuliah
	var matakuliah models.MataKuliah
	idStr := ctx.Param("id")

	id, _ := strconv.Atoi(idStr)

	if err := ctx.ShouldBindJSON(&matakuliahRequest); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB.First(&matakuliah, id).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "MataKuliah not found"})
		return
	}

	matakuliah.Nama = matakuliahRequest.Nama

	if err := config.DB.Save(&matakuliah).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"data": matakuliah})
}

// DeleteMataKuliah godoc
// @Summary Delete a matakuliah
// @Description Delete a matakuliah by ID
// @Tags matakuliahs
// @Produce json
// @Param id path int true "MataKuliah ID"
// @Success 200 {object} map[string]interface{}
// @Failure 404 {object} map[string]interface{}
// @Failure 500 {object} map[string]interface{}
// @Router /api/matakuliahs/{id} [delete]
func DeleteMataKuliah(ctx *gin.Context) {
	idStr := ctx.Param("id")

	id, _ := strconv.Atoi(idStr)

	if err := config.DB.First(&models.MataKuliah{}, id).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "MataKuliah not found"})
		return
	}

	if err := config.DB.Delete(&models.MataKuliah{}, id).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "MataKuliah deleted"})
}
