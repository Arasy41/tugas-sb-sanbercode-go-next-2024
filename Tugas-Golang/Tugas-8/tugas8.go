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
func luasLingkaran(jariJari float64, resCh chan string) {
	luas := math.Pi * jariJari * jariJari
	resCh <- fmt.Sprintf("Jadi luas lingkaran dengan jari-jari %f adalah %f", jariJari, math.Round(luas))
}

func kelilingLingkaran(jariJari float64, resCh chan string) {
	keliling := 2 * math.Pi * jariJari
	resCh <- fmt.Sprintf("Jadi keliling lingkaran dengan jari-jari %f adalah %f", jariJari, math.Round(keliling))
}

func volumeTabung(jariJari, tinggi float64, resCh chan string) {
	volume := math.Pi * jariJari * jariJari * tinggi
	resCh <- fmt.Sprintf("Jadi volume Tabung dengan jari-jari %f dan tinggi %f adalah %f", jariJari, tinggi, math.Round(volume))
}

// Function Soal 4
func luasPersegiPanjang(panjang, lebar int, resCh chan int) {
	luas := panjang * lebar
	resCh <- luas
}

func kelilingPersegiPanjang(panjang, lebar int, resChan chan int) {
	keliling := (panjang + lebar) * 2
	resChan <- keliling
}

func volumeBalok(panjang, lebar, tinggi int, resCh chan int) {
	volume := panjang * lebar * tinggi
	resCh <- volume
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
	tinggiTabung := 10.0

	luasCh := make(chan string)
	kelilingCh := make(chan string)
	volumeCh := make(chan string)

	for _, r := range jariJari {
		go luasLingkaran(r, luasCh)
		go kelilingLingkaran(r, kelilingCh)
		go volumeTabung(r, tinggiTabung, volumeCh)
	}

	for i := 0; i < len(jariJari); i++ {
		fmt.Println(<-luasCh)
		fmt.Println(<-kelilingCh)
		fmt.Println(<-volumeCh)
	}

	// Jawaban Soal 4
	fmt.Println("\nJawaban Soal 4")

	panjang := 10
	lebar := 7
	tinggiBalok := 5

	ch1 := make(chan int)
	go luasPersegiPanjang(panjang, lebar, ch1)

	ch2 := make(chan int)
	go kelilingPersegiPanjang(panjang, lebar, ch2)

	ch3 := make(chan int)
	go volumeBalok(panjang, lebar, tinggiBalok, ch3)

	for i := 0; i < 3; i++ {
		select {
		case luas := <-ch1:
			fmt.Println("Luas Persegi Panjang:", luas)
		case keliling := <-ch2:
			fmt.Println("Keliling Persegi Panjang:", keliling)
		case volume := <-ch3:
			fmt.Println("Volume Balok:", volume)
		}
	}

}
