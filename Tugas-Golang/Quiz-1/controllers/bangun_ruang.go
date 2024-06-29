package controllers

import (
	"errors"
	"fmt"
	"net/http"
	"strconv"
	bangunruang "tugas-quiz-1-sb-sanbercode/bangun_ruang"

	"github.com/julienschmidt/httprouter"
)

func ValidasiHitungBangunRuang(hitung string) error {
	if hitung != "volume" && hitung != "luas-permukaan" {
		return errors.New("parameter hitung tidak valid untuk bangun ruang")
	}
	return nil
}

func HitungBangunRuang(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	var query = r.URL.Query()
	bangun := ps.ByName("bangun")
	hitung := query.Get("hitung")

	err := ValidasiHitungBangunRuang(hitung)
	if err != nil {
		fmt.Fprintf(w, err.Error(), http.StatusBadRequest)
		return
	}

	switch bangun {
	case "kubus":
		sisi, err := strconv.ParseFloat(query.Get("sisi"), 64)
		if err != nil {
			http.Error(w, "parameter sisi harus berupa angka", http.StatusBadRequest)
			return
		}
		kubus := bangunruang.Kubus{Sisi: sisi}
		if hitung == "volume" {
			fmt.Fprintf(w, "Volume kubus adalah: %f", kubus.Volume())
		} else if hitung == "luas-permukaan" {
			fmt.Fprintf(w, "Luas permukaan kubus adalah: %f", kubus.LuasPermukaan())
		}
	case "balok":
		panjang, err := strconv.ParseFloat(query.Get("panjang"), 64)
		if err != nil {
			http.Error(w, "parameter panjang harus berupa angka", http.StatusBadRequest)
			return
		}
		lebar, err := strconv.ParseFloat(query.Get("lebar"), 64)
		if err != nil {
			http.Error(w, "parameter lebar harus berupa angka", http.StatusBadRequest)
			return
		}
		tinggi, err := strconv.ParseFloat(query.Get("tinggi"), 64)
		if err != nil {
			http.Error(w, "parameter tinggi harus berupa angka", http.StatusBadRequest)
			return
		}
		balok := bangunruang.Balok{Panjang: panjang, Lebar: lebar, Tinggi: tinggi}
		if hitung == "volume" {
			fmt.Fprintf(w, "Volume balok adalah: %f", balok.Volume())
		} else if hitung == "luas-permukaan" {
			fmt.Fprintf(w, "Luas permukaan balok adalah: %f", balok.LuasPermukaan())
		}
	case "tabung":
		jariJari, err := strconv.ParseFloat(query.Get("jariJari"), 64)
		if err != nil {
			http.Error(w, "parameter jariJari harus berupa angka", http.StatusBadRequest)
			return
		}
		tinggi, err := strconv.ParseFloat(query.Get("tinggi"), 64)
		if err != nil {
			http.Error(w, "parameter tinggi harus berupa angka", http.StatusBadRequest)
			return
		}
		tabung := bangunruang.Tabung{JariJari: jariJari, Tinggi: float64(tinggi)}
		if hitung == "volume" {
			fmt.Fprintf(w, "Volume tabung adalah: %f", tabung.Volume())
		} else if hitung == "luas-permukaan" {
			fmt.Fprintf(w, "Luas permukaan tabung adalah: %f", tabung.LuasPermukaan())
		}
	}
}
