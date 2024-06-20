package main

import "fmt"

func main() {

	// Jawaban Soal 1
	fmt.Println("LOOPING PERTAMA")
	for i := 0; i <= 20; i += 2 {
		if i/2 == 20 {
			continue
		}
		fmt.Printf("%d - I Love Coding\n", i)
	}

	fmt.Println("LOOPING KEDUA")
	for i := 20; i >= 1; i -= 2 {
		if i/2 == 0 {
			break
		}
		fmt.Printf("%d - I  will become a fullstack developer\n", i)
	}

	fmt.Printf("\n")

	// Jawaban Soal 2
	for i := 1; i <= 20; i++ {
		if i%2 != 0 {
			if i%3 == 0 {
				fmt.Printf("%d - Super Bootcamp\n", i)
			} else {
				fmt.Printf("%d - Santai\n", i)
			}
		} else {
			if i%3 == 0 {
				fmt.Printf("%d - I Love Coding\n", i)
			} else {
				fmt.Printf("%d - Berkualitas\n", i)
			}
		}
	}

	fmt.Printf("\n")

	// Jawaban Soal 3
	for i := 1; i <= 7; i++ {
		for j := 1; j <= i; j++ {
			fmt.Print("#")
		}
		fmt.Println()
	}

	fmt.Printf("\n")

	// Jawaban Soal 4
	for i := 1; i <= 7; i++ {
		for j := 7; j > i; j-- {
			fmt.Print(" ")
		}
		for h := 1; h <= i; h++ {
			fmt.Print("#")
		}
		fmt.Println()
	}

	fmt.Printf("\n")

	// Jawaban Soal 5
	var kalimat = [...]string{"aku", "dan", "saya", "sangat", "senang", "belajar", "golang"}

	fmt.Println(kalimat[2:])

	fmt.Printf("\n")

	// Jawaban Soal 6
	var sayuran = []string{
		"Bayam",
		"Buncis",
		"Kangkung",
		"Kubis",
		"Seledri",
		"Tauge",
		"Timun",
	}
	for i, sayur := range sayuran {
		fmt.Printf("%d. %s\n", i+1, sayur)
	}

	fmt.Printf("\n")

	// Jawaban Soal 7
	var satuan = map[string]int{
		"panjang": 7,
		"lebar":   4,
		"tinggi":  6,
	}

	var volumeBalok = 1

	for key, value := range satuan {
		fmt.Printf("%s = %d\n", key, value)
		volumeBalok *= value
	}

	fmt.Printf("Volume Balok = %d\n", volumeBalok)

	fmt.Printf("\n")

	// Jawaban Soal 8
	var word = "car"
	var combiChar []string

	for i := 0; i < len(word); i++ {
		for j := i + 1; j <= len(word); j++ {
			combiChar = append(combiChar, word[i:j])
		}
	}
	fmt.Println(combiChar)

	fmt.Printf("\n")
	// Jawaban Soal 9
	kumpulanAngkaBerurut := [...]int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}

	for _, angka := range kumpulanAngkaBerurut {
		if angka%2 == 0 {
			fmt.Println(angka)
		}
	}

	fmt.Printf("\n")
	// Jawaban Soal 10
	kumpulanAngkaDuaDimensi := [][]int{
		{1, 3, 5, 7, 8, 9},
		{4, 5, 6, 2, 3, 1},
		{6, 7, 8, 1, 3, 5},
	}

	var hasilAngka []int

	for _, baris := range kumpulanAngkaDuaDimensi {
		total := 0

		for _, angka := range baris {
			total += angka
		}
		hasilAngka = append(hasilAngka, total)
	}

	fmt.Println(hasilAngka)

}
