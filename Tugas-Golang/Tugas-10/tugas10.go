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
	// Validasi Method GET
	if r.Method != http.MethodGet {
		http.Error(w, "ERROR....", http.StatusNotFound)
		return
	}

	// Menampilkan Semua Data Nilai Mahasiswa
	dataNilaiMahasiswa, err := json.Marshal(nilaiNilaiMahasiswa)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Menampilkan Hasil Data atau Response
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
			name := r.PostFormValue("nama")
			matkul := r.PostFormValue("mata_kuliah")
			getNilai := r.PostFormValue("nilai")
			nilai, err := strconv.Atoi(getNilai)
			// Validasi input Nilai
			if err != nil {
				http.Error(w, "Nilai must be a number", http.StatusBadRequest)
				return
			}
			indeks := r.PostFormValue("indeks_nilai")

			nm = NilaiMahasiswa{
				ID:          idCounter,
				Nama:        name,
				MataKuliah:  matkul,
				Nilai:       uint(nilai),
				IndeksNilai: indeks,
			}
		}

		// Validate name and matkul
		if nm.Nama == "" || nm.MataKuliah == "" {
			http.Error(w, "Nama and Mata Kuliah cannot be empty", http.StatusBadRequest)
			return
		}

		// Validasi input Nilai
		if nm.Nilai > 100 {
			http.Error(w, "Nilai cannot be more than 100", http.StatusBadRequest)
			return
		}

		// Tambahkan ID
		nm.ID = idCounter
		idCounter++

		// Switch Case Untuk Indeks Nilai
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

		// Menambahkan ke dalam Data
		nilaiNilaiMahasiswa = append(nilaiNilaiMahasiswa, nm)

		// Response setelah data ditambahkan
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
