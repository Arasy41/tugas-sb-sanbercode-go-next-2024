package routes

import (
	c "github.com/Arasy41/tugas-sb-sanbercode-go-next-2024/controllers"
	"github.com/Arasy41/tugas-sb-sanbercode-go-next-2024/utils"
	"github.com/julienschmidt/httprouter"
)

func MainRouter() *httprouter.Router {
	router := httprouter.New()

	// Mahasiswa
	router.GET("/mahasiswas", c.GetAllMahasiswa)
	router.POST("/mahasiswa", utils.BasicAuth(c.CreateMahasiswa))
	router.GET("/mahasiswa/:id", c.GetByIdMahasiswa)
	router.PUT("/mahasiswa/:id", utils.BasicAuth(c.UpdateMahasiswa))
	router.DELETE("/mahasiswa/:id", utils.BasicAuth(c.DeleteMahasiswa))

	// Mata Kuliah
	router.GET("/matakuliah-all", c.GetAllMataKuliah)
	router.POST("/mata-kuliah", utils.BasicAuth(c.CreateMataKuliah))
	router.GET("/mata-kuliah/:id", c.GetByIdMataKuliah)
	router.PUT("/mata-kuliah/:id", utils.BasicAuth(c.UpdateMataKuliah))
	router.DELETE("/mata-kuliah/:id", utils.BasicAuth(c.DeleteMataKuliah))

	// Nilai Mahasiswa
	router.GET("/nilaimahasiswas", c.GetAllNilaiMahasiswa)
	router.POST("/nilaimahasiswa", utils.BasicAuth(c.CreateNilaiMahasiswa))
	router.GET("/nilaimahasiswa/:id", c.GetByIdNilaiMahasiswa)
	router.GET("/detail/nilaimahasiswa/:id", c.GetDetailNilaiMahasiswaById)
	router.PUT("/nilaimahasiswa/:id", utils.BasicAuth(c.UpdateNilaiMahasiswa))
	router.DELETE("/nilaimahasiswa/:id", utils.BasicAuth(c.DeleteNilaiMahasiswa))
	return router
}
