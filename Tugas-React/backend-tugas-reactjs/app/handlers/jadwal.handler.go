package handlers

import (
	"go-vercel-app/app/config"
	"go-vercel-app/app/models"
	"go-vercel-app/app/utils"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

// GetAllJadwals godoc
// @Summary Get all jadwals
// @Description Get a list of all jadwals
// @Tags jadwals
// @Produce json
// @Success 200 {array} models.JadwalKuliahResponse
// @Router /api/jadwals [get]
func GetAllJadwal(ctx *gin.Context) {
	var jadwals []models.JadwalKuliah

	if err := config.DB.Preload("Dosen.MataKuliah").Preload("Mahasiswa").Find(&jadwals).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	var response []models.JadwalKuliahResponse
	for _, j := range jadwals {
		response = append(response, models.JadwalKuliahResponse{
			ID:          j.ID,
			DosenID:     j.DosenID,
			Dosen:       j.Dosen.Nama + " - " + j.Dosen.MataKuliah.Nama,
			MahasiswaID: j.MahasiswaID,
			Mahasiswa:   j.Mahasiswa.Nama,
			Hari:        j.Hari,
			JamMulai:    j.JamMulai.Format("15:04"),
			JamSelesai:  j.JamSelesai.Format("15:04"),
			CreatedAt:   j.CreatedAt.Format("2006-01-02 15:04:05"),
			UpdatedAt:   j.UpdatedAt.Format("2006-01-02 15:04:05"),
		})
	}

	ctx.JSON(http.StatusOK, gin.H{"data": response})
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
	var req models.JadwalKuliahRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Konversi JamMulai dan JamSelesai
	jamMulai := req.JamMulai.Format("15:04")
	jamSelesai := req.JamSelesai.Format("15:04")

	// Parsing JamMulai dan JamSelesai
	timeStart, err := time.Parse("15:04", jamMulai)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JamMulai format"})
		return
	}

	timeEnd, err := time.Parse("15:04", jamSelesai)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JamSelesai format"})
		return
	}

	jadwal := models.JadwalKuliah{
		DosenID:     req.DosenID,
		MahasiswaID: req.MahasiswaID,
		Hari:        req.Hari,
		JamMulai:    timeStart,
		JamSelesai:  timeEnd,
		CreatedAt:   time.Now(),
	}

	// Validasi jadwal
	if err := utils.ValidateJadwal(&jadwal); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Validasi Dosen dan Mahasiswa
	if err := utils.ValidateJadwalDosenMahasiswa(&jadwal); err != nil {
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
	var req models.JadwalKuliahRequest
	idStr := ctx.Param("id")
	id, _ := strconv.Atoi(idStr)

	var jadwal models.JadwalKuliah
	if err := config.DB.First(&jadwal, id).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Jadwal not found"})
		return
	}

	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Konversi JamMulai dan JamSelesai
	jamMulai := req.JamMulai.Format("15:04")
	jamSelesai := req.JamSelesai.Format("15:04")

	// Parsing JamMulai dan JamSelesai
	timeStart, err := time.Parse("15:04", jamMulai)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JamMulai format"})
		return
	}

	timeEnd, err := time.Parse("15:04", jamSelesai)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JamSelesai format"})
		return
	}

	jadwal.MahasiswaID = req.MahasiswaID
	jadwal.Hari = req.Hari
	jadwal.JamMulai = timeStart
	jadwal.JamSelesai = timeEnd
	jadwal.UpdatedAt = time.Now()

	// Validasi jadwal
	if err := utils.ValidateJadwal(&jadwal); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Validasi Dosen dan Mahasiswa
	if err := utils.ValidateJadwalDosenMahasiswa(&jadwal); err != nil {
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
