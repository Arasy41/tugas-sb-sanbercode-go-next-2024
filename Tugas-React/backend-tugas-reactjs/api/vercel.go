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

func init() {
	app = gin.New()

	environment := utils.Getenv("ENVIRONMENT", "development")

	if environment == "development" {
		err := godotenv.Load()
		if err != nil {
			log.Fatal("Error loading .env file")
		}
	}

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
	sqlDB := db.DB()
	defer sqlDB.Close()

	routes.InitRouter(db, app)
}

// Entrypoint
func Handler(w http.ResponseWriter, r *http.Request) {
	app.ServeHTTP(w, r)
}
