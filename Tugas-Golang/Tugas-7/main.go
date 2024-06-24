package main

import (
	"fmt"
	"strings"
	"tugas-sb-sanbercode-golang/src"
)

func main() {
	// Jawaban Soal 1
	fmt.Println("Jawaban Soal 1")
	s := src.SegitigaSamaSisi{Alas: 5, Tinggi: 6}
	p := src.PersegiPanjang{Panjang: 4, Lebar: 5}
	t := src.Tabung{JariJari: 7, Tinggi: 10}
	b := src.Balok{Panjang: 4, Lebar: 5, Tinggi: 6}

	fmt.Println("Keliling Segitiga adalah", s.Keliling(), "dan Luasnya adalah", s.Luas())
	fmt.Println("Keliling Persegi Panjang adalah", p.Keliling(), "dan Luasnya adalah", p.Luas())
	fmt.Println("Volume tabung adalah", t.Volume(), "dan Luas permukaannya adalah", t.LuasPermukaan())
	fmt.Println("Volume Balok adalah", b.Volume(), "dan Luas permukaannya adalah", b.LuasPermukaan())

	// Jawaban Soal 2
	fmt.Println("\nJawaban Soal 2")
	samsungGalaxy := src.Phone{
		Name:   "Samsung Galaxy Note 20",
		Brand:  "Samsung",
		Year:   2020,
		Colors: []string{"Mystic Bronze", "Mystic White", "Mystic Black"},
	}

	var phoneInfo src.PhoneInfo = samsungGalaxy
	fmt.Println(phoneInfo.GetPhoneInfo())

	// Jawaban Soal 3
	fmt.Println("\nJawaban Soal 3")
	fmt.Println(src.LuasPersegi(2, true))
	fmt.Println(src.LuasPersegi(4, false))
	fmt.Println(src.LuasPersegi(0, true))
	fmt.Println(src.LuasPersegi(0, false))

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
	var people []src.Sentence
	people = append(people, src.Person{Name: "John", Job: "Programmer", Gender: "male", Age: 30})
	people = append(people, src.Person{Name: "Sarah", Job: "Model", Gender: "female", Age: 27})
	people = append(people, src.Person{Name: "Jack", Job: "Engineer", Gender: "male", Age: 25})
	people = append(people, src.Person{Name: "Ellie", Job: "Designer", Gender: "female", Age: 35})
	people = append(people, src.Person{Name: "Danny", Job: "Footballer", Gender: "male", Age: 31})

	for i, p := range people {
		fmt.Printf("%d. %v\n", i+1, p.Introduction())
	}
}
