package routes

import (
	"net/http"
	c "tugas-quiz-1-sb-sanbercode/controllers"

	"github.com/julienschmidt/httprouter"
)

func NewRoutes() *httprouter.Router {

	router := httprouter.New()

	router.GET("/", func(w http.ResponseWriter, _ *http.Request, _ httprouter.Params) {
		w.Write([]byte("Hello World"))
	})

	router.GET("/bangun-datar/:bangun", c.HitungBangunDatar)
	router.GET("/bangun-ruang/:bangun", c.HitungBangunRuang)

	return router
}
