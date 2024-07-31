package handlers

import (
	"go-vercel-app/app/config"
	"go-vercel-app/app/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// GetAllMahasiswa godoc
// @Summary Get all mahasiswas
// @Description Get a list of all mahasiswas
// @Tags mahasiswas
// @Produce json
// @Success 200 {array} models.Mahasiswa
// @Router /api/mahasiswas [get]
func GetAllMahasiswa(ctx *gin.Context) {
	var mahasiswas []models.Mahasiswa

	if err := config.DB.Find(&mahasiswas).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"data": mahasiswas})
}

// GetMahasiswaByID godoc
// @Summary Get mahasiswa by ID
// @Description Get a single mahasiswa by ID
// @Tags mahasiswas
// @Produce json
// @Param id path int true "Mahasiswa ID"
// @Success 200 {object} models.Mahasiswa
// @Failure 404 {object} map[string]interface{}
// @Router /api/mahasiswas/{id} [get]
func GetMahasiswaByID(ctx *gin.Context) {
	var mahasiswa models.Mahasiswa
	id := ctx.Param("id")

	if err := config.DB.First(&mahasiswa, id).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"data": mahasiswa})
}

// CreateMahasiswa godoc
// @Summary Create a new mahasiswa
// @Description Create a new mahasiswa with the input payload
// @Tags mahasiswas
// @Accept json
// @Produce json
// @Param mahasiswa body models.Mahasiswa true "Mahasiswa Request"
// @Success 201 {object} models.Mahasiswa
// @Failure 400 {object} map[string]interface{}
// @Failure 500 {object} map[string]interface{}
// @Router /api/mahasiswas [post]
func CreateMahasiswa(ctx *gin.Context) {
	var mahasiswa models.Mahasiswa
	if err := ctx.ShouldBindJSON(&mahasiswa); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB.Create(&mahasiswa).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusCreated, gin.H{"data": mahasiswa})
}

// UpdateMahasiswa godoc
// @Summary Update an existing mahasiswa
// @Description Update a mahasiswa by ID with the input payload
// @Tags mahasiswas
// @Accept json
// @Produce json
// @Param id path int true "Mahasiswa ID"
// @Param mahasiswa body models.Mahasiswa true "Mahasiswa Request"
// @Success 200 {object} models.Mahasiswa
// @Failure 400 {object} map[string]interface{}
// @Failure 404 {object} map[string]interface{}
// @Failure 500 {object} map[string]interface{}
// @Router /api/mahasiswas/{id} [put]
func UpdateMahasiswa(ctx *gin.Context) {
	var mahasiswaRequest models.Mahasiswa
	var mahasiswa models.Mahasiswa
	idStr := ctx.Param("id")

	id, _ := strconv.Atoi(idStr)

	if err := ctx.ShouldBindJSON(&mahasiswaRequest); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB.First(&mahasiswa, id).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Mahasiswa not found"})
		return
	}

	mahasiswa.Nama = mahasiswaRequest.Nama

	if err := config.DB.Save(&mahasiswa).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"data": mahasiswa})
}

// DeleteMahasiswa godoc
// @Summary Delete a mahasiswa
// @Description Delete a mahasiswa by ID
// @Tags mahasiswas
// @Produce json
// @Param id path int true "Mahasiswa ID"
// @Success 200 {object} map[string]interface{}
// @Failure 404 {object} map[string]interface{}
// @Failure 500 {object} map[string]interface{}
// @Router /api/mahasiswas/{id} [delete]
func DeleteMahasiswa(ctx *gin.Context) {
	idStr := ctx.Param("id")

	id, _ := strconv.Atoi(idStr)

	if err := config.DB.First(&models.Mahasiswa{}, id).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Mahasiswa not found"})
		return
	}

	if err := config.DB.Delete(&models.Mahasiswa{}, id).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Mahasiswa deleted"})
}
