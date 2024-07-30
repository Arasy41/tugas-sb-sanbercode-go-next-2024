package handlers

import (
	"go-vercel-app/app/config"
	"go-vercel-app/app/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// GetAllDosen godoc
// @Summary Get all dosen
// @Description Get a list of all dosen
// @Tags dosen
// @Produce json
// @Success 200 {array} models.Dosen
// @Router /dosen [get]
func GetAllDosen(ctx *gin.Context) {
	var dosen []models.Dosen

	if err := config.DB.Preload("MataKuliah").Find(&dosen).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"data": dosen})
}

// CreateDosen godoc
// @Summary Create a new dosen
// @Description Create a new dosen with the input payload
// @Tags dosen
// @Accept json
// @Produce json
// @Param dosen body models.Dosen true "Dosen Request"
// @Success 201 {object} models.Dosen
// @Failure 400 {object} map[string]interface{}
// @Failure 500 {object} map[string]interface{}
// @Router /dosen [post]
func CreateDosen(ctx *gin.Context) {
	var dosen models.Dosen
	if err := ctx.ShouldBindJSON(&dosen); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB.Create(&dosen).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusCreated, gin.H{"data": dosen})
}

// UpdateDosen godoc
// @Summary Update an existing dosen
// @Description Update a dosen by ID with the input payload
// @Tags dosen
// @Accept json
// @Produce json
// @Param id path int true "Dosen ID"
// @Param dosen body models.Dosen true "Dosen Request"
// @Success 200 {object} models.Dosen
// @Failure 400 {object} map[string]interface{}
// @Failure 404 {object} map[string]interface{}
// @Failure 500 {object} map[string]interface{}
// @Router /dosen/{id} [put]
func UpdateDosen(ctx *gin.Context) {
	var dosen models.Dosen
	idStr := ctx.Param("id")
	id, _ := strconv.Atoi(idStr)

	if err := config.DB.First(&dosen, id).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Dosen not found"})
		return
	}

	if err := ctx.ShouldBindJSON(&dosen); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB.Save(&dosen).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"data": dosen})
}

// DeleteDosen godoc
// @Summary Delete a dosen
// @Description Delete a dosen by ID
// @Tags dosen
// @Produce json
// @Param id path int true "Dosen ID"
// @Success 200 {object} map[string]interface{}
// @Failure 404 {object} map[string]interface{}
// @Failure 500 {object} map[string]interface{}
// @Router /dosen/{id} [delete]
func DeleteDosen(ctx *gin.Context) {
	idStr := ctx.Param("id")
	id, _ := strconv.Atoi(idStr)

	if err := config.DB.First(&models.Dosen{}, id).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Dosen not found"})
		return
	}

	if err := config.DB.Delete(&models.Dosen{}, id).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Dosen deleted"})
}
