package routes

import (
	// "go-vercel-app/app/handlers"
	// "go-vercel-app/app/middlewares"

	"go-vercel-app/app/handlers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

func InitRouter(db *gorm.DB, r *gin.Engine) {
	corsConfig := cors.DefaultConfig()
	corsConfig.AllowAllOrigins = true
	corsConfig.AllowHeaders = []string{"Content-Type", "X-XSRF-TOKEN", "Accept", "Origin", "X-Requested-With", "Authorization"}

	// To be able to send tokens to the server.
	corsConfig.AllowCredentials = true
	// OPTIONS method for ReactJS
	corsConfig.AddAllowMethods("OPTIONS")

	r.Use(cors.New(corsConfig))

	// set db to gin context
	r.Use(func(c *gin.Context) {
		c.Set("db", db)
	})

	bookRoute := r.Group("/book")
	bookRoute.GET("/:id", handlers.GetBookByID)
	bookRoute.GET("", handlers.GetAllBooks)
	bookRoute.POST("", handlers.CreateBook)
	bookRoute.PUT("/:id", handlers.UpdateBook)
	bookRoute.DELETE("/:id", handlers.DeleteBook)

	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
}
