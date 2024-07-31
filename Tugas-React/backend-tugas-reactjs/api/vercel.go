package api

import (
	"go-vercel-app/app/config"
	"go-vercel-app/app/routes"
	"go-vercel-app/app/utils"
	"go-vercel-app/docs"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

var (
	App *gin.Engine
)

// @title Kuliahs API
// @version 1.0
// @description This is a sample server for managing books.
// @host go-vercel-app-arasys-projects.vercel.app
// @BasePath /
func init() {
	App = gin.New()

	environment := utils.Getenv("ENVIRONMENT", "development")

	if environment == "development" {
		err := godotenv.Load()
		if err != nil {
			log.Fatal("Error loading .env file")
		} else {
			log.Println("Loaded .env file")
		}
	}

	log.Printf("ENVIRONMENT: %s", environment)

	// Log environment variables for debugging
	ginMode := os.Getenv("GIN_MODE")
	if ginMode == "" {
		ginMode = "debug"
	}
	log.Printf("GIN_MODE: %s", ginMode)
	gin.SetMode(ginMode)

	docs.SwaggerInfo.Title = "Kuliah REST API"
	docs.SwaggerInfo.Description = "This is sample for REST API Kuliah."
	docs.SwaggerInfo.Version = "1.0"
	docs.SwaggerInfo.Host = utils.Getenv("HOST", "go-vercel-app-seven.vercel.app")
	if environment == "development" {
		docs.SwaggerInfo.Schemes = []string{"http", "https"}
	} else {
		docs.SwaggerInfo.Schemes = []string{"https"}
	}
	db := config.InitDB()

	routes.InitRouter(db, App)
}

// Entrypoint
func Handler(w http.ResponseWriter, r *http.Request) {
	App.ServeHTTP(w, r)
}
