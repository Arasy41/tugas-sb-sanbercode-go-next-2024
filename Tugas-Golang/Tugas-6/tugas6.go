package main

import (
	"errors"
	_ "errors"
	"flag"
	"fmt"
	"math"
	"time"
)

// FUnction Soal 1
func Sentence(kalimat string, tahun int) {
	fmt.Println("\n", kalimat, tahun)
}

// Function Soal 2
func kelilingSegitigaSamaSisi(sisi int, isTrue bool) (string, error) {
	if sisi == 0 {
		if isTrue {
			return "", errors.New("Maaf anda belum menginput sisi dari segitiga sama sisi")
		} else {
			defer func() {
				err := recover()
				if err != nil {
					fmt.Print("Error: ", err)
				}
			}()
			panic("Maaf anda belum menginput sisi dari segitiga sama sisi")
		}
	}

	if isTrue {
		return fmt.Sprintf("Keliling segitiga sama sisinya dengan sisi %d cm adalah %d cm", sisi, sisi*3), nil
	} else {
		return fmt.Sprintf("%d", sisi*3), nil
	}
}

// Function Soal 3
func cetakAngka(angka *int) {
	fmt.Println("\nJumlah angka adalah :", *angka)
}

func tambahAngka(nilai int, angka *int) {
	*angka += nilai
}

// Function Soal 4
func addPhones(phones *[]string) {
	*phones = append(*phones, "Xiaomi", "Asus", "Iphone", "Samsung", "Oppo", "Realme", "Vivo")
}

// Function Soal 5
func luasLingkaran(jariJari float64) float64 {
	luas := math.Pi * math.Pow(jariJari, 2)
	return math.Round(luas)
}

func kelilingLingkaran(jariJari float64) float64 {
	keliling := 2 * math.Pi * jariJari
	return math.Round(keliling)
}

//

func main() {
	// Deklarasi Variabel Angka
	angka := 1

	// Jawaban Soal 1
	fmt.Println("\nJawaban Soal 1")
	kalimat := "Golang Backend Development"
	tahun := 2021

	defer Sentence(kalimat, tahun)
	fmt.Println("Lewatin Aja Ada Diakhiran")

	// Jawaban Soal 2
	fmt.Println("\nJawaban Soal 2")
	fmt.Println(kelilingSegitigaSamaSisi(4, true))
	fmt.Println(kelilingSegitigaSamaSisi(8, false))
	fmt.Println(kelilingSegitigaSamaSisi(0, true))
	fmt.Println(kelilingSegitigaSamaSisi(0, false))

	// Jawaban Soal3
	fmt.Println("\nJawaban Soal 3")
	defer cetakAngka(&angka)
	fmt.Println("Angka awal:", angka)
	tambahAngka(7, &angka)
	tambahAngka(6, &angka)
	tambahAngka(-1, &angka)
	tambahAngka(9, &angka)

	// Jawaban Soal 4
	fmt.Println("\nJawaban Soal 4")
	var phones = []string{}
	addPhones(&phones)

	for i, phone := range phones {
		fmt.Printf("%d. %v\n", i+1, phone)
		time.Sleep(time.Second)
	}

	// Jawaban Soal 5
	fmt.Println("\nJawaban Soal 5")
	fmt.Println(luasLingkaran(7))
	fmt.Println(luasLingkaran(10))
	fmt.Println(luasLingkaran(15))
	fmt.Println(kelilingLingkaran(7))
	fmt.Println(kelilingLingkaran(10))
	fmt.Println(kelilingLingkaran(15))

	// Jawaban Soal 6
	fmt.Println("\nJawaban Soal 6")
	var pAwal = flag.Int64("Panjang", 7, "type the lenght")
	var lAwal = flag.Int64("Lebar", 4, "type the width")

	flag.Parse()

	panjang := *pAwal
	lebar := *lAwal

	if panjang == 0 || lebar == 0 {
		fmt.Println("Panjang dan lebar persegi panjang tidak boleh 0!")
		return
	}

	luas := panjang * lebar
	keliling := 2 * (panjang + lebar)

	fmt.Printf("Panjang persegi panjang: %d cm\n", panjang)
	fmt.Printf("Lebar persegi panjang: %d cm\n", lebar)
	fmt.Printf("Luas persegi panjang: %d cm²\n", luas)
	fmt.Printf("Keliling persegi panjang: %d cm\n", keliling)
}
