package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
)

type NilaiMahasiswa struct {
	ID          uint   `json:"id"`
	Nama        string `json:"nama"`
	MataKuliah  string `json:"mata_kuliah"`
	Nilai       uint   `json:"nilai"`
	IndeksNilai string `json:"indeks_nilai"`
}

var nilaiNilaiMahasiswa = []NilaiMahasiswa{}
var idCounter uint = 1

func basicAuth(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		username, password, ok := r.BasicAuth()
		if ok && username == "admin" && password == "password" {
			next.ServeHTTP(w, r)
		} else {
			w.Header().Set("WWW-Authenticate", `Basic realm="Please enter your username and password"`)
			http.Error(w, "Unauthorized.", http.StatusUnauthorized)
		}
	}
}

// GET Nilai Mahasiswa
func getNilaiMahasiswa(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "ERROR....", http.StatusNotFound)
		return
	}

	dataNilaiMahasiswa, err := json.Marshal(nilaiNilaiMahasiswa)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(dataNilaiMahasiswa)
}

func postNilaiMahasiswa(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var nm NilaiMahasiswa
	if r.Method == "POST" {
		if r.Header.Get("Content-Type") == "application/json" {
			// parse dari json
			decodeJSON := json.NewDecoder(r.Body)
			if err := decodeJSON.Decode(&nm); err != nil {
				http.Error(w, "Invalid JSON format", http.StatusBadRequest)
				return
			}
		} else {
			// parse dari form
			name := r.PostFormValue("title")
			matkul := r.PostFormValue("mata-kuliah")
			getNilai := r.PostFormValue("nilai")
			nilai, err := strconv.Atoi(getNilai)
			if err != nil {
				http.Error(w, "Nilai must be a number", http.StatusBadRequest)
				return
			}
			indeks := r.PostFormValue("indeks-nilai")

			nm = NilaiMahasiswa{
				ID:          idCounter,
				Nama:        name,
				MataKuliah:  matkul,
				Nilai:       uint(nilai),
				IndeksNilai: indeks,
			}
		}

		nm.ID = idCounter
		idCounter++

		if nm.Nilai > 100 {
			http.Error(w, "Nilai cannot be more than 100", http.StatusBadRequest)
			return
		}

		switch {
		case nm.Nilai >= 80:
			nm.IndeksNilai = "A"
		case nm.Nilai >= 70:
			nm.IndeksNilai = "B"
		case nm.Nilai >= 60:
			nm.IndeksNilai = "C"
		case nm.Nilai >= 50:
			nm.IndeksNilai = "D"
		default:
			nm.IndeksNilai = "E"
		}

		nilaiNilaiMahasiswa = append(nilaiNilaiMahasiswa, nm)

		dataNilai, err := json.Marshal(nm)
		if err != nil {
			http.Error(w, "Failed to encode JSON", http.StatusInternalServerError)
			return
		}
		w.Write(dataNilai)
		return
	}

	http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
}

func main() {
	http.HandleFunc("/create-nilaimahasiswa", basicAuth(postNilaiMahasiswa))
	http.HandleFunc("/nilaimahasiswa", getNilaiMahasiswa)
	fmt.Println("Server started at :8080")
	http.ListenAndServe(":8080", nil)
}
