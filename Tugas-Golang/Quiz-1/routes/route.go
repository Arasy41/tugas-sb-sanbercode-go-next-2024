package routes

import (
	"net/http"
	c "tugas-quiz-1-sb-sanbercode/controllers"
	u "tugas-quiz-1-sb-sanbercode/utils"

	"github.com/julienschmidt/httprouter"
)

func NewRoutes() *httprouter.Router {

	router := httprouter.New()

	router.GET("/", func(w http.ResponseWriter, _ *http.Request, _ httprouter.Params) {
		w.Write([]byte("Hello World"))
	})

	router.GET("/bangun-datar/:bangun", c.HitungBangunDatar)
	router.GET("/bangun-ruang/:bangun", c.HitungBangunRuang)

	router.GET("/categories", c.GetAllCategory)
	router.POST("/categories", u.BasicAuth(c.CreateCategory))
	router.PUT("/categories/:id", u.BasicAuth(c.UpdateCategory))
	router.DELETE("/categories/:id", u.BasicAuth(c.DeleteCategory))
	router.GET("/categories/:id/articles", c.GetByIdCategoryArticle)

	router.GET("/articles", c.GetAllArticles)
	router.POST("/articles", u.BasicAuth(c.CreateArticle))
	router.PUT("/articles/:id", u.BasicAuth(c.UpdateArticle))
	router.DELETE("/articles/:id", u.BasicAuth(c.DeleteArticle))

	return router
}
