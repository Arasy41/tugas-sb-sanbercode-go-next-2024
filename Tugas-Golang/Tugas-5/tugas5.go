package main

import (
	"fmt"
	"strings"
)

// Struct, Interface & Method Soal 1
type segitigaSamaSisi struct {
	alas, tinggi int
}

type persegiPanjang struct {
	panjang, lebar int
}

type hitungBangunDatar interface {
	luas() int
	keliling() int
}

func (s segitigaSamaSisi) luas() int {
	return s.alas * s.tinggi / 2
}

func (s segitigaSamaSisi) keliling() int {
	return s.alas * 3
}

func (p persegiPanjang) luas() int {
	return p.panjang * p.lebar
}

func (p persegiPanjang) keliling() int {
	return (p.panjang + p.lebar) * 2
}

type tabung struct {
	jariJari, tinggi float64
}

type balok struct {
	panjang, lebar, tinggi int
}

type hitungBangunRuang interface {
	volume() float64
	luasPermukaan() float64
}

func (t tabung) volume() float64 {
	return 3.14 * t.jariJari * t.jariJari * t.tinggi
}

func (t tabung) luasPermukaan() float64 {
	return 2*(3.14*(t.jariJari*t.jariJari)) + ((3.14 * t.jariJari * 2) * t.tinggi)
}

func (b balok) volume() float64 {
	return float64(b.panjang * b.lebar * b.tinggi)
}

func (b balok) luasPermukaan() float64 {
	return float64(2*(b.panjang*b.lebar) + (b.panjang * b.tinggi) + (b.lebar * b.tinggi))
}

// Struct, Interface & Method Soal 2
type phone struct {
	name, brand string
	year        int
	colors      []string
}

type PhoneInfo interface {
	getPhoneInfo() string
}

func (p phone) getPhoneInfo() string {
	colorsJoin := strings.Join(p.colors, ", ")
	return fmt.Sprintf("name : %s\nbrand : %s\nyear : %d\ncolors : %s", p.name, p.brand, p.year, colorsJoin)
}

// Function Soal 3
func luasPersegi(sisi int, isTrue bool) interface{} {
	if isTrue == true {
		return fmt.Sprintf("luas persegi dengan sisi %d cm adalah %d cm", sisi, sisi*sisi)
	} else if isTrue == false {
		return fmt.Sprint(sisi)
	} else if sisi == 0 && isTrue == true {
		return fmt.Sprintf("Maaf anda belum menginput sisi dari persegi")
	} else {
		return nil
	}
}

// Struct, Method & Interface Soal 5
type person struct {
	name, job, gender string
	age               int
}

type sentence interface {
	introduction() string
}

func (p person) introduction() string {
	call := "Pak"
	if p.gender == "female" {
		call = "Bu"
	}
	return fmt.Sprintf("%s %s adalah %s yang berusia %d tahun", call, p.name, p.job, p.age)
}

func main() {
	// Jawaban Soal 1
	fmt.Println("Jawaban Soal 1")
	s := segitigaSamaSisi{alas: 5, tinggi: 6}
	p := persegiPanjang{panjang: 4, lebar: 5}
	t := tabung{jariJari: 7, tinggi: 10}
	b := balok{panjang: 4, lebar: 5, tinggi: 6}

	fmt.Println("Keliling Segitiga adalah", s.keliling(), "dan Luasnya adalah", s.luas())
	fmt.Println("Keliling Persegi Panjang adalah", p.keliling(), "dan Luasnya adalah", p.luas())
	fmt.Println("Volume tabung adalah", t.volume(), "dan Luas permukaannya adalah", t.luasPermukaan())
	fmt.Println("Volume Balok adalah", b.volume(), "dan Luas permukaannya adalah", b.luasPermukaan())

	// Jawaban Soal 2
	fmt.Println("\nJawaban Soal 2")
	samsungGalaxy := phone{
		name:   "Samsung Galaxy Note 20",
		brand:  "Samsung",
		year:   2020,
		colors: []string{"Mystic Bronze", "Mystic White", "Mystic Black"},
	}

	var phoneInfo PhoneInfo = samsungGalaxy
	fmt.Println(phoneInfo.getPhoneInfo())

	// Jawaban Soal 3
	fmt.Println("\nJawaban Soal 3")
	fmt.Println(luasPersegi(2, true))
	fmt.Println(luasPersegi(4, false))
	fmt.Println(luasPersegi(0, true))
	fmt.Println(luasPersegi(0, false))

	// Jawaban Soal 4
	fmt.Println("\nJawaban Soal 4")
	var prefix interface{} = "hasil penjumlahan dari "
	var kumpulanAngkaPertama interface{} = []int{6, 8}
	var kumpulanAngkaKedua interface{} = []int{12, 14}

	preSTR := prefix.(string)
	kumpulanAngka := append(kumpulanAngkaPertama.([]int), kumpulanAngkaKedua.([]int)...)

	total := 0
	var angkaStr []string
	for _, angka := range kumpulanAngka {
		total += angka
		angkaStr = append(angkaStr, fmt.Sprintf("%d", angka))
	}
	hasil := fmt.Sprintf("%s%s = %d", preSTR, strings.Join(angkaStr, " + "), total)
	fmt.Println(hasil)

	// Jawaban Soal 5
	fmt.Println("\nJawaban Soal 5")
	var people []sentence
	people = append(people, person{"John", "Programmer", "male", 30})
	people = append(people, person{"Sarah", "Model", "female", 27})
	people = append(people, person{"Jack", "Engineer", "male", 25})
	people = append(people, person{"Ellie", "Designer", "female", 35})
	people = append(people, person{"Danny", "Footballer", "male", 31})

	for i, p := range people {
		fmt.Printf("%d. %v\n", i+1, p.introduction())
	}

}
