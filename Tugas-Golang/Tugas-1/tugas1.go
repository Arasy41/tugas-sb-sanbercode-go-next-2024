package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	// Soal 1
	var judul1 = "Super"
	var judul2 = "Bootcamp"
	var judul3 = "Sanbercode"
	var judul4 = "Golang"
	var judul5 = "Nextjs"
	var judul6 = "2024"

	// Jawaban Penggabungan Kata
	judulUtama := judul1 + " " + judul2 + " " + judul3 + " " + judul4 + " " + judul5 + " " + judul6

	fmt.Println(judulUtama)

	// Jawaban Soal 2
	halo := "Halo Dunia"
	// Ubah kata Dunia Menjadi Golang
	fmt.Println(strings.Replace(halo, "Dunia", "Golang", 1))

	// Jawaban Soal 3
	var kataPertama = "saya"
	var kataKedua = "senang"
	var kataKetiga = "belajar"
	var kataKeempat = "golang"

	kataKedua = strings.Title(kataKedua) // Bisa juga pakai Replace = kataKedua = strings.Replace(kataKedua, "s", "S", -1)
	kataKetiga = strings.Replace(kataKetiga, "r", "R", -1)
	kataKeempat = strings.ToUpper(kataKeempat)

	kataGabungan := kataPertama + " " + kataKedua + " " + kataKetiga + " " + kataKeempat
	fmt.Println(kataGabungan)

	// Jawaban Soal 4
	var panjangPersegiPanjang = "8"
	var lebarPersegiPanjang = "5"
	var alasSegitiga = "6"
	var tinggiSegitiga = "7"

	pPersegiPanjang, _ := strconv.Atoi(panjangPersegiPanjang)
	lPersegiPanjang, _ := strconv.Atoi(lebarPersegiPanjang)
	aSegitiga, _ := strconv.Atoi(alasSegitiga)
	tSegitiga, _ := strconv.Atoi(tinggiSegitiga)

	var luasPersegiPanjang int = pPersegiPanjang * lPersegiPanjang
	var kelilingPersegiPanjang int = (pPersegiPanjang + lPersegiPanjang) * 2
	var luasSegitiga int = aSegitiga * tSegitiga / 2

	fmt.Println("Jadi, Luas Persegi Panjang adalah :", luasPersegiPanjang)
	fmt.Println("Jadi, Keliling Persegi Panjang adalah :", kelilingPersegiPanjang)
	fmt.Println("Jadi, Luas Segitiga Panjang adalah :", luasSegitiga)

	// Jawaban Soal 5
	kalimat := "halo halo bandung"
	angka := 2024

	kalimat = strings.Replace(kalimat, "halo", "Hi", 2)

	fmt.Printf("\"%s\" - %d\n", kalimat, angka)

	// Jawaban Soal 6
	var sentence = "Saya Sangat Senang Sekali Belajar Programming dan Saya Juga Senang Belajar Javascript"
	lengthSentence := len(sentence)
	fmt.Println("Panjang kalimat adalah", lengthSentence)
	if lengthSentence < 10 {
		fmt.Println("Kalimat dikategorikan pendek")
	} else if lengthSentence >= 10 && lengthSentence <= 30 {
		fmt.Println("Kalimat dikategorikan sedang")
	} else {
		fmt.Println("Kalimat dikategorikan panjang")
	}

	// Jawaban Soal 7
	var nilaiJohn = 80
	var nilaiDoe = 50

	var indeksJohn string
	var indeksDoe string
	if nilaiJohn >= 80 {
		indeksJohn = "A"
	} else if nilaiJohn >= 70 {
		indeksJohn = "B"
	} else if nilaiJohn >= 60 {
		indeksJohn = "C"
	} else if nilaiJohn >= 50 {
		indeksJohn = "D"
	} else {
		indeksJohn = "E"
	}

	if nilaiDoe >= 80 {
		indeksDoe = "A"
	} else if nilaiDoe >= 70 {
		indeksDoe = "B"
	} else if nilaiDoe >= 60 {
		indeksDoe = "C"
	} else if nilaiDoe >= 50 {
		indeksDoe = "D"
	} else {
		indeksDoe = "E"
	}

	fmt.Println("Nilai Indeks John Adalah", indeksJohn)
	fmt.Println("Nilai Indeks Doe Adalah", indeksDoe)

	// Jawaban Soal 8
	var tanggal = 14
	var bulan = 1
	var tahun = 2006

	switch bulan {
	case 1:
		fmt.Println(tanggal, "Januari", tahun)
	case 2:
		fmt.Println(tanggal, "Februari", tahun)
	case 3:
		fmt.Println(tanggal, "Maret", tahun)
	case 4:
		fmt.Println(tanggal, "April", tahun)
	case 5:
		fmt.Println(tanggal, "Mei", tahun)
	case 6:
		fmt.Println(tanggal, "Juni", tahun)
	case 7:
		fmt.Println(tanggal, "Juli", tahun)
	case 8:
		fmt.Println(tanggal, "Agustus", tahun)
	case 9:
		fmt.Println(tanggal, "September", tahun)
	case 10:
		fmt.Println(tanggal, "Oktober", tahun)
	case 11:
		fmt.Println(tanggal, "November", tahun)
	case 12:
		fmt.Println(tanggal, "Desember", tahun)
	default:
		fmt.Println("Bulan lahir tidak Valid")
	}

	// Jawaban Soal 9
	var tahunKelahiran = 2006
	if tahunKelahiran >= 1944 && tahunKelahiran <= 1964 {
		fmt.Println("Tahun lahir anda adalah tahun :", tahunKelahiran, "\nAnda termasuk Generasi Baby Boomer")
	} else if tahunKelahiran >= 1965 && tahunKelahiran <= 1979 {
		fmt.Println("Tahun lahir anda adalah tahun :", tahunKelahiran, "\nAnda termasuk Generasi X")
	} else if tahunKelahiran >= 1980 && tahunKelahiran <= 1994 {
		fmt.Println("Tahun lahir anda adalah tahun :", tahunKelahiran, "\nAnda termasuk Generasi Y")
	} else if tahunKelahiran >= 1995 && tahunKelahiran <= 2015 {
		fmt.Println("Tahun lahir anda adalah tahun :", tahunKelahiran, "\nAnda termasuk Generasi Z")
	}

	// Jawaban Soal 10
	penjualan := 2500000
	var uangJasa int
	var komisi int

	if penjualan <= 2000000 {
		uangJasa = 100000
		komisi = penjualan * 10 / 100
	} else if penjualan <= 5000000 {
		uangJasa = 200000
		komisi = penjualan * 15 / 100
	} else {
		uangJasa = 300000
		komisi = penjualan * 20 / 100
	}

	totalPendapatan := uangJasa + komisi
	fmt.Println("Total pendapatan salesman :", totalPendapatan)

}
