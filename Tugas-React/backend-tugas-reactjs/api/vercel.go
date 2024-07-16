package api

import (
	"go-vercel-app/app/config"
	"go-vercel-app/app/routes"
	"go-vercel-app/app/utils"
	"go-vercel-app/docs"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

var (
	app *gin.Engine
)

// @title Books API
// @version 1.0
// @description This is a sample server for managing books.
// @host localhost:8080
// @BasePath /
func init() {
	app = gin.New()

	environment := utils.Getenv("ENVIRONMENT", "development")
	log.Printf("Running in %s environment", environment)

	if environment == "development" {
		if err := godotenv.Load(); err != nil {
			log.Fatal("Error loading .env file")
		}
	}

	docs.SwaggerInfo.Title = "Book REST API"
	docs.SwaggerInfo.Description = "This is REST API Book."
	docs.SwaggerInfo.Version = "1.0"
	docs.SwaggerInfo.Host = utils.Getenv("HOST", "localhost:8080")
	if environment == "development" {
		docs.SwaggerInfo.Schemes = []string{"http", "https"}
	} else {
		docs.SwaggerInfo.Schemes = []string{"https"}
	}

	db := config.InitDB()
	defer db.Close()

	routes.InitRouter(db, app)

	port := utils.Getenv("PORT", "8080")
	log.Printf("Starting server on port %s", port)
	if err := app.Run(":" + port); err != nil {
		log.Fatalf("Failed to run server: %v", err)
	}
}

// Entrypoint
func Handler(w http.ResponseWriter, r *http.Request) {
	if app == nil {
		log.Fatal("App is not initialized")
	}
	app.ServeHTTP(w, r)
}
