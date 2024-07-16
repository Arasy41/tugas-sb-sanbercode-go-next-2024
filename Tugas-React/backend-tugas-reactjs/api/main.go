package handler

import (
	"go-vercel-app/app/config"
	"go-vercel-app/app/routes"
	"go-vercel-app/app/utils"
	"go-vercel-app/docs"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/vercel/go-bridge/go/bridge"
)

var (
	app *gin.Engine
)

// @title Books API
// @version 1.0
// @description This is a sample server for managing books.
// @host localhost:8080
// @BasePath /
func main() {
	app = gin.New()

	environment := utils.Getenv("ENVIRONMENT", "development")

	if environment == "development" {
		err := godotenv.Load()
		if err != nil {
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

	bridge.Start(app)
}

// Entrypoint
func Handler(w http.ResponseWriter, r *http.Request) {
	app.ServeHTTP(w, r)
}
