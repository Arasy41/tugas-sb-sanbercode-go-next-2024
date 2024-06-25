package main

import (
	"fmt"
	"math"
	"sync"
	"time"
)

// Funtion Soal 1
func printText(phone []string, wg *sync.WaitGroup) {
	for i, phone := range phone {
		fmt.Printf("%d. %v\n", i+1, phone)
		time.Sleep(time.Second * 1)
	}
	wg.Done()
}

// Function Soal 2
var movies = []string{"Harry Potter", "LOTR", "SpiderMan", "Logan", "Avengers", "Insidious", "Toy Story"}

func getMovies(moviesChannel chan string, movies ...string) {
	fmt.Print("List Movies :\n")
	for i, movie := range movies {
		moviesChannel <- fmt.Sprintf("%d. %s", i+1, movie)
	}
	close(moviesChannel)
}

// Function Soal 3
func luasLingkaran(jariJari float64, chanRes chan string) {
	luas := math.Pi * jariJari * jariJari
	chanRes <- fmt.Sprintf("Jadi luas lingkaran dengan jari-jari %f adalah %f", jariJari, math.Round(luas))
}

func kelilingLingkaran(jariJari float64, chanRes chan string) {
	keliling := 2 * math.Pi * jariJari
	chanRes <- fmt.Sprintf("Jadi keliling lingkaran dengan jari-jari %f adalah %f", jariJari, math.Round(keliling))
}

func volumeTabung(jariJari, tinggi float64, chanRes chan string) {
	volume := math.Pi * jariJari * jariJari * tinggi
	chanRes <- fmt.Sprintf("Jadi luas lingkaran dengan jari-jari %f adalah %f", jariJari, math.Round(volume))
}

func luasPersegiPanjang(panjang, lebar int, reschan chan int) {
	luas := panjang * lebar
	reschan <- luas
}

func kelilingPersegiPanjang(panjang, lebar int, resChan chan int) {
	keliling := (panjang + lebar) * 2
	resChan <- keliling
}

func volumeBalok(panjang, lebar, tinggi int, reschan chan int) {
	volume := panjang * lebar * tinggi
	reschan <- volume
}

func main() {
	// Jawaban Soal 1
	fmt.Println("Jawaban Soal 1")
	var wg sync.WaitGroup
	var phones = []string{"Xiaomi", "Asus", "Iphone", "Samsung", "Oppo", "Realme", "Vivo"}

	wg.Add(1)

	go printText(phones, &wg)

	wg.Wait()

	// Jawaban Soal 2
	fmt.Println("\nJawaban Soal 2")
	moviesChannel := make(chan string)

	go getMovies(moviesChannel, movies...)

	for movie := range moviesChannel {
		fmt.Printf("%s\n", movie)
	}

	// Jawaban Soal 3
	fmt.Println("\nJawaban Soal 3")
	jariJari := []float64{8, 14, 20}
	tinggi := 10.0

	luasChan := make(chan string)
	kelilingChan := make(chan string)
	volumeChan := make(chan string)

	for _, r := range jariJari {
		go luasLingkaran(r, luasChan)
		go kelilingLingkaran(r, kelilingChan)
		go volumeTabung(r, tinggi, volumeChan)
	}

	for i := 0; i < len(jariJari); i++ {
		fmt.Println(<-luasChan)
		fmt.Println(<-kelilingChan)
		fmt.Println(<-volumeChan)
	}

	{
		// Jawaban Soal 4
		fmt.Println("\nJawaban Soal 4")

		panjang := 10
		lebar := 7
		tinggi := 5

		luasChan := make(chan int)
		go luasPersegiPanjang(panjang, lebar, luasChan)

		kelilingChan := make(chan int)
		go kelilingPersegiPanjang(panjang, lebar, kelilingChan)

		volumeChan := make(chan int)
		go volumeBalok(panjang, lebar, tinggi, volumeChan)

		for i := 0; i < 3; i++ {
			select {
			case luas := <-luasChan:
				fmt.Println("Luas Persegi Panjang:", luas)
			case keliling := <-kelilingChan:
				fmt.Println("Keliling Persegi Panjang:", keliling)
			case volume := <-volumeChan:
				fmt.Println("Volume Balok:", volume)
			}
		}
	}

}
