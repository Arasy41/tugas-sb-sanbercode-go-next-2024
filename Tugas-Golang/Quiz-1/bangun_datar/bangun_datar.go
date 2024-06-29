package bangundatar

import (
	"math"
)

type BangunDatar interface {
	Luas() float64
	Keliling() float64
}

type Persegi struct {
	Sisi int
}

func (p Persegi) Luas() float64 {
	chLuas := make(chan float64)
	go func() {
		luas := p.Sisi * p.Sisi
		chLuas <- float64(luas)
	}()
	return <-chLuas
}

func (p Persegi) Keliling() float64 {
	chKeliling := make(chan float64)
	go func() {
		keliling := p.Sisi * 4
		chKeliling <- float64(keliling)
	}()
	return <-chKeliling
}

type PersegiPanjang struct {
	Panjang int
	Lebar   int
}

func (pp PersegiPanjang) Luas() float64 {
	chLuas := make(chan float64)
	go func() {
		luas := float64(pp.Panjang) * float64(pp.Lebar)
		chLuas <- luas
	}()
	return <-chLuas
}

func (pp PersegiPanjang) Keliling() float64 {
	chKeliling := make(chan float64)
	go func() {
		keliling := 2 * (float64(pp.Panjang) + float64(pp.Lebar))
		chKeliling <- keliling
	}()
	return <-chKeliling
}

type Lingkaran struct {
	JariJari float64
}

func (l Lingkaran) Luas() float64 {
	chLuas := make(chan float64)
	go func() {
		luas := math.Pi * l.JariJari * l.JariJari
		chLuas <- luas
	}()
	return <-chLuas
}

func (l Lingkaran) Keliling() float64 {
	chKeliling := make(chan float64)
	go func() {
		keliling := 2 * math.Pi * l.JariJari
		chKeliling <- keliling
	}()
	return <-chKeliling
}
