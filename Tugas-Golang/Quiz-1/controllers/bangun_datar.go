package controllers

import (
	"errors"
	"fmt"
	"net/http"
	"strconv"
	bangundatar "tugas-quiz-1-sb-sanbercode/bangun_datar"

	"github.com/julienschmidt/httprouter"
)

func ValidasiHitungBangunDatar(hitung string) error {
	if hitung != "luas" && hitung != "keliling" {
		return errors.New("parameter hitung tidak valid untuk bangun datar")
	}
	return nil
}

func HitungBangunDatar(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	var query = r.URL.Query()
	bangun := ps.ByName("bangun")
	hitung := query.Get("hitung")

	err := ValidasiHitungBangunDatar(hitung)
	if err != nil {
		fmt.Fprintf(w, "%v", err)
		return
	}

	switch bangun {
	case "persegi":
		sisi, err := strconv.Atoi(query.Get("sisi"))
		if err != nil {
			http.Error(w, "parameter sisi harus berupa angka", http.StatusBadRequest)
			return
		}
		persegi := bangundatar.Persegi{Sisi: sisi}
		if hitung == "luas" {
			fmt.Fprintf(w, "Luas persegi: %f", persegi.Luas())
		} else if hitung == "keliling" {
			fmt.Fprintf(w, "Keliling persegi: %f", persegi.Keliling())
		}
	case "persegi-panjang":
		panjang, err := strconv.Atoi(query.Get("panjang"))
		if err != nil {
			http.Error(w, "parameter panjang harus berupa angka", http.StatusBadRequest)
			return
		}
		lebar, err := strconv.Atoi(query.Get("lebar"))
		if err != nil {
			http.Error(w, "parameter lebar harus berupa angka", http.StatusBadRequest)
			return
		}
		persegiPanjang := bangundatar.PersegiPanjang{Panjang: panjang, Lebar: lebar}
		if hitung == "luas" {
			fmt.Fprintf(w, "Luas persegi panjang: %f", persegiPanjang.Luas())
		} else if hitung == "keliling" {
			fmt.Fprintf(w, "Keliling persegi panjang: %f", persegiPanjang.Keliling())
		}
	case "lingkaran":
		jariJari, err := strconv.ParseFloat(query.Get("jariJari"), 64)
		if err != nil {
			http.Error(w, "parameter jariJari harus berupa angka", http.StatusBadRequest)
			return
		}
		lingkaran := bangundatar.Lingkaran{JariJari: jariJari}
		if hitung == "luas" {
			fmt.Fprintf(w, "Luas lingkaran: %f", lingkaran.Luas())
		} else if hitung == "keliling" {
			fmt.Fprintf(w, "Keliling lingkaran: %f", lingkaran.Keliling())
		}
	}
}
