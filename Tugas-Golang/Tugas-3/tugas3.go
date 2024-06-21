package main

import (
	"fmt"
	"math"
	"strings"
)

// Function Soal 1
func descriptionPhone(name, brand, color, launchYear string) string {
	return fmt.Sprintf("%s adalah smarthphone yang dirilis oleh %s pada tahun %s dan memiliki varian warna %s", name, brand, launchYear, color)
}

// Function Soal 2
func luasPersegiPanjang(panjang, lebar int) int {
	return panjang * lebar
}
func kelilingPersegiPanjang(panjang, lebar int) int {
	return (panjang + lebar) / 2
}
func volumeBalok(panjang, lebar, tinggi int) int {
	return panjang * lebar * tinggi
}

// Function Soal 3
func buahFavorit(nama string, buah ...string) string {
	banyakBuah := make([]string, len(buah))
	for i, b := range buah {
		banyakBuah[i] = fmt.Sprintf("\"%s\"", b)
	}
	strBuah := strings.Join(banyakBuah, ", ")
	return fmt.Sprintf("Halo nama saya %s dan buah favorit saya adalah %s", nama, strBuah)
}

// function soal 5
func hitungLingkaran(jarijari float64, luasLingkaran *float64, kelilingLingkaran *float64) {
	*luasLingkaran = math.Pi * jarijari * jarijari
	*kelilingLingkaran = 2 * math.Pi * jarijari
}

// function soal 6
func introduce(sentence *string, name, gender, job, age string) string {
	if gender == "laki-laki" {
		*sentence = fmt.Sprintf("Pak %s adalah seorang %s yang berusia %s tahun", name, job, age)
	} else if gender == "perempuan" {
		*sentence = fmt.Sprintf("Bu %s adalah seorang %s yang berusia %s tahun", name, job, age)
	}
	return *sentence
}

// function soal 7
func tambahDataBuah(buah *[]string, nameFruit ...string) {
	*buah = append(*buah, nameFruit...)
}

// function soal 8
func tambahDataFilm(title, duration, genre, year string, dataFilm *[]map[string]string) {
	dataFilmBaru := map[string]string{
		"title":    title,
		"duration": duration,
		"genre":    genre,
		"year":     year,
	}
	*dataFilm = append(*dataFilm, dataFilmBaru)
}

func main() {
	// Soal 1
	fmt.Println("Jawaban Soal 1 :")
	samsung := descriptionPhone("Samsung Galaxy Note 20", "Samsung", "Bronze", "2021")
	fmt.Println(samsung) // Samsung Galaxy Note 20 adalah smartphone yang dirilis oleh Samsung pada tahun 2021 dan memiliki varian warna Bronze

	xiaomi := descriptionPhone("Redmi Note 10 Pro", "Xiaomi", "Black", "2021")
	fmt.Println(xiaomi) // Redmi Note 10 Pro adalah smartphone yang dirilis oleh Xiaomi pada tahun 2021 dan memiliki varian warna Black

	fmt.Printf("\n")
	// Soal 2
	fmt.Println("Jawaban Soal 2 :")
	panjang := 12
	lebar := 4
	tinggi := 8

	luas := luasPersegiPanjang(panjang, lebar)
	keliling := kelilingPersegiPanjang(panjang, lebar)
	volume := volumeBalok(panjang, lebar, tinggi)

	fmt.Println(luas)
	fmt.Println(keliling)
	fmt.Println(volume)

	fmt.Printf("\n")
	// Soal 3
	fmt.Println("Jawaban Soal 3 :")
	var buah = []string{"semangka", "jeruk", "melon", "pepaya"}

	var buahFavoritJohn = buahFavorit("John", buah...)

	fmt.Println(buahFavoritJohn) // halo nama saya john dan buah favorit saya adalah "semangka", "jeruk", "melon", "pepaya"

	fmt.Printf("\n")
	// Soal 4
	fmt.Println("Jawaban Soal 4 :")
	var dataBuku = []map[string]string{}

	tambahDataBuku := func(title, author, category, year string) {
		dataBukuBaru := map[string]string{
			"title":    title,
			"author":   author,
			"category": category,
			"year":     year,
		}
		dataBuku = append(dataBuku, dataBukuBaru)
	}

	tambahDataBuku("Harry Potter", "J.K Rowling", "Novel", "1997")
	tambahDataBuku("Dracula", "Bram Stoker", "Novel", "2019")
	tambahDataBuku("Algoritma Dan Pemrograman", "Rinaldi Munnir", "Pelajaran", "2010")
	tambahDataBuku("Matematika Diskrit", "Rinaldi Munir", "Pelajaran", "2010")

	for _, item := range dataBuku {
		fmt.Println(item)
	}

	fmt.Printf("\n")
	// Soal 5
	fmt.Println("Jawaban Soal 5 :")
	var luasLingkaran float64
	var kelilingLingkaran float64

	hitungLingkaran(14, &luasLingkaran, &kelilingLingkaran)
	fmt.Println("Luas lingkaran adalah :", luasLingkaran)
	fmt.Println("Keliling lingkaran adalah :", kelilingLingkaran)

	fmt.Printf("\n")
	// Soal 6
	fmt.Println("Jawaban Soal 6 :")
	var sentence string
	introduce(&sentence, "John", "laki-laki", "penulis", "30")

	fmt.Println(sentence) // Pak John adalah seorang penulis yang berusia 30 tahun
	introduce(&sentence, "Sarah", "perempuan", "model", "28")

	fmt.Println(sentence) // Bu Sarah adalah seorang model yang berusia 28 tahun

	fmt.Printf("\n")
	// Soal 7
	{
		fmt.Println("Jawaban Soal 7 :")
		var buah = []string{}

		tambahDataBuah(&buah, "Jeruk",
			"Semangka",
			"Mangga",
			"Strawberry",
			"Durian",
			"Manggis",
			"Alpukat",
		)

		for i, buahBuahan := range buah {
			fmt.Printf("%d. %s\n", i+1, buahBuahan)
		}
	}

	fmt.Printf("\n")
	// Soal 8
	fmt.Println("Jawaban Soal 8 :")
	var dataFilm = []map[string]string{}

	tambahDataFilm("LOTR", "2 jam", "action", "1999", &dataFilm)
	tambahDataFilm("avenger", "2 jam", "action", "2019", &dataFilm)
	tambahDataFilm("spiderman", "2 jam", "action", "2004", &dataFilm)
	tambahDataFilm("juon", "2 jam", "horror", "2004", &dataFilm)

	for i, item := range dataFilm {
		fmt.Printf("%d. title : %s\n   duration : %s\n   genre : %s\n   year : %s\n", i+1, item["title"], item["duration"], item["genre"], item["year"])
	}

}
