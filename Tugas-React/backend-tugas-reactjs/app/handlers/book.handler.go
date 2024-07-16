package handlers

import (
	"go-vercel-app/app/config"
	"go-vercel-app/app/models"
	"go-vercel-app/app/utils"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// GetAllBooks godoc
// @Summary Get all books
// @Description Get a list of all books
// @Tags books
// @Produce json
// @Success 200 {array} models.Book
// @Router /books [get]
func GetAllBooks(ctx *gin.Context) {
	var books []models.Book

	if err := config.DB.Find(&books).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"data": books})
}

// GetBookByID godoc
// @Summary Get book by ID
// @Description Get a single book by ID
// @Tags books
// @Produce json
// @Param id path int true "Book ID"
// @Success 200 {object} models.Book
// @Failure 404 {object} map[string]interface{}
// @Router /books/{id} [get]
func GetBookByID(ctx *gin.Context) {
	var book models.Book
	id := ctx.Param("id")

	if err := config.DB.First(&book, id).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"data": book})
}

// CreateBook godoc
// @Summary Create a new book
// @Description Create a new book with the input payload
// @Tags books
// @Accept json
// @Produce json
// @Param book body models.BookRequest true "Book Request"
// @Success 201 {object} models.Book
// @Failure 400 {object} map[string]interface{}
// @Failure 500 {object} map[string]interface{}
// @Router /books [post]
func CreateBook(ctx *gin.Context) {
	var book models.BookRequest
	if err := ctx.ShouldBindJSON(&book); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := utils.ValidateBookRequest(&book); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	book.Thickness = utils.CalculateThickness(book.TotalPage)

	if err := config.DB.Create(&book).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusCreated, gin.H{"data": book})
}

// UpdateBook godoc
// @Summary Update an existing book
// @Description Update a book by ID with the input payload
// @Tags books
// @Accept json
// @Produce json
// @Param id path int true "Book ID"
// @Param book body models.BookRequest true "Book Request"
// @Success 200 {object} models.Book
// @Failure 400 {object} map[string]interface{}
// @Failure 404 {object} map[string]interface{}
// @Failure 500 {object} map[string]interface{}
// @Router /books/{id} [patch]
func UpdateBook(ctx *gin.Context) {
	var book models.BookRequest
	idStr := ctx.Param("id")

	id, _ := strconv.Atoi(idStr)

	if err := ctx.ShouldBindJSON(&book); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB.First(&book, id).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Book not found"})
		return
	}

	if err := utils.ValidateBookRequest(&book); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	book.Thickness = utils.CalculateThickness(book.TotalPage)
	if err := config.DB.Save(&book).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"data": book})
}

// DeleteBook godoc
// @Summary Delete a book
// @Description Delete a book by ID
// @Tags books
// @Produce json
// @Param id path int true "Book ID"
// @Success 200 {object} map[string]interface{}
// @Failure 404 {object} map[string]interface{}
// @Failure 500 {object} map[string]interface{}
// @Router /books/{id} [delete]
func DeleteBook(ctx *gin.Context) {
	idStr := ctx.Param("id")

	id, _ := strconv.Atoi(idStr)

	if err := config.DB.First(&models.Book{}, id).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Book not found"})
		return
	}

	if err := config.DB.Delete(&models.Book{}, id).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Book deleted"})
}
