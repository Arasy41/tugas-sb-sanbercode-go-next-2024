package main

import "fmt"

// Struct & Method Soal 1
type buah struct {
	nama       string
	warna      string
	adaBijinya string
	harga      int
}

func adaBijinyaToBoolean(adaBijinya string) bool {
	if adaBijinya == "iya" {
		return true
	}
	return false
}

// Struct & Method Soal 2
type segitiga struct {
	alas, tinggi int
}

func (s segitiga) luas() int {
	return s.alas * s.tinggi / 2
}

type persegi struct {
	sisi int
}

func (p persegi) luas() int {
	return p.sisi * p.sisi
}

type persegiPanjang struct {
	panjang, lebar int
}

func (pp persegiPanjang) luas() int {
	return pp.panjang * pp.lebar
}

// Struct & Method Soal 3
type phone struct {
	name, brand string
	year        int
	colors      []string
}

func (p *phone) addColors(colors ...string) {
	p.colors = append(p.colors, colors...)
}

// Struct & Method Soal 4
type movie struct {
	title, genre   string
	duration, year int
}

var dataFilm = []movie{}

func tambahDataFilm(title string, duration int, genre string, year int, dataFilm *[]movie) {
	*dataFilm = append(*dataFilm, movie{title: title, duration: duration, genre: genre, year: year})
}

// Struct Soal 5 sampai 7
type person struct {
	name, job, gender string
	age               int
}

func main() {
	// Jawaban Soal 1
	fmt.Println("Jawaban Soal 1")
	nanas := buah{nama: "Nanas", warna: "Kuning", adaBijinya: "tidak", harga: 9000}
	jeruk := buah{nama: "Jeruk", warna: "Oranye", adaBijinya: "iya", harga: 8000}
	semangka := buah{nama: "Semangka", warna: "Hijau & Merah", adaBijinya: "iya", harga: 10000}
	pisang := buah{nama: "Pisang", warna: "Kuning", adaBijinya: "tidak", harga: 5000}

	buahList := []buah{nanas, jeruk, semangka, pisang}

	fmt.Println("Data Buah:")
	for _, b := range buahList {
		fmt.Printf("{%s %s %t %d}\n", b.nama, b.warna, adaBijinyaToBoolean(b.adaBijinya), b.harga)
	}

	// Jawaban Soal 2
	fmt.Println("\nJawaban Soal 2")
	s := segitiga{alas: 10, tinggi: 5}
	p := persegi{sisi: 4}
	pp := persegiPanjang{panjang: 7, lebar: 3}

	fmt.Println("Luas Geometri:")
	fmt.Println("Luas segitiga:", s.luas())
	fmt.Println("Luas persegi:", p.luas())
	fmt.Println("Luas persegi panjang:", pp.luas())

	// Jawaban Soal 3
	fmt.Println("\nJawaban Soal 3")
	samsung := phone{name: "Samsung Galaxy Note 20", brand: "Samsung", year: 2020}
	fmt.Println("Data Phone:")
	fmt.Println(samsung)
	samsung.addColors("Black", "Bronze", "Silver")
	fmt.Println(samsung)

	// Jawaban Soal 4
	fmt.Println("\nJawaban Soal 4")
	tambahDataFilm("LOTR", 120, "action", 1999, &dataFilm)
	tambahDataFilm("avenger", 120, "action", 2019, &dataFilm)
	tambahDataFilm("spiderman", 120, "action", 2004, &dataFilm)
	tambahDataFilm("juon", 120, "horror", 2004, &dataFilm)

	fmt.Println("Data Film:")
	for i, film := range dataFilm {
		durasiJam := film.duration / 60
		fmt.Printf("%d. title : %s\n   duration : %d Jam\n   genre : %s\n   year : %d\n", i+1, film.title, durasiJam, film.genre, film.year)
	}

	// Jawaban Soal 5
	fmt.Println("\nJawaban Soal 5")
	people := []person{
		{name: "John", job: "Programmer", gender: "male", age: 30},
		{name: "Sarah", job: "Model", gender: "female", age: 27},
		{name: "Jack", job: "Engineer", gender: "male", age: 25},
		{name: "Ellie", job: "Designer", gender: "female", age: 35},
		{name: "Danny", job: "Footballer", gender: "male", age: 31},
	}

	for i, p := range people {
		fmt.Printf("%d. %+v\n", i+1, p)
	}

	// Jawaban Soal 6
	fmt.Println("\nJawaban Soal 6")
	fmt.Println("Data yang usianya di atas 29:")
	count := 1
	for _, p := range people {
		if p.age > 29 {
			fmt.Printf("%d. %s\n", count, p.name)
			count++
		}
	}

	// Jawaban Soal 7
	fmt.Println("\nJawaban Soal 7")
	fmt.Println("Data yang gendernya perempuan saja:")
	count = 1
	for _, p := range people {
		if p.gender == "female" {
			fmt.Printf("%d. %s\n", count, p.name)
			count++
		}
	}
}
