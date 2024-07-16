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

// @title Books API
// @version 1.0
// @description This is a sample server for managing books.
// @host https://go-vercel-app-seven.vercel.app
// @BasePath /
func init() {
	App = gin.New()

	environment := utils.Getenv("ENVIRONMENT", "development")
	log.Printf("ENVIRONMENT: %s", environment)

	if environment == "development" {
		err := godotenv.Load()
		if err != nil {
			log.Println("No .env file found, relying on system environment variables")
		} else {
			log.Println(".env file loaded successfully")
		}
	}

	// Log environment variables for debugging
	ginMode := os.Getenv("GIN_MODE")
	if ginMode == "" {
		ginMode = "debug"
	}
	log.Printf("GIN_MODE: %s", ginMode)
	gin.SetMode(ginMode)

	docs.SwaggerInfo.Title = "Movie REST API"
	docs.SwaggerInfo.Description = "This is REST API Movie."
	docs.SwaggerInfo.Version = "1.0"
	docs.SwaggerInfo.Host = utils.Getenv("HOST", "localhost:8080")
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
