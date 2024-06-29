package bangun_ruang

import (
	"math"
)

type BangunRuang interface {
	Volume() float64
	LuasPermukaan() float64
}

type Kubus struct {
	Sisi float64
}

func (k Kubus) Volume() float64 {
	chVolume := make(chan float64)
	go func() {
		volume := math.Pow(k.Sisi, 3)
		chVolume <- volume
	}()
	return <-chVolume
}

func (k Kubus) LuasPermukaan() float64 {
	chLuasPermukaan := make(chan float64)
	go func() {
		luasPermukaan := 6 * math.Pow(k.Sisi, 2)
		chLuasPermukaan <- luasPermukaan
	}()
	return <-chLuasPermukaan
}

type Balok struct {
	Panjang float64
	Lebar   float64
	Tinggi  float64
}

func (b Balok) Volume() float64 {
	chVolume := make(chan float64)
	go func() {
		volume := b.Panjang * b.Lebar * b.Tinggi
		chVolume <- volume
	}()
	return <-chVolume
}

func (b Balok) LuasPermukaan() float64 {
	chLuasPermukaan := make(chan float64)
	go func() {
		luasPermukaan := 2 * ((b.Panjang * b.Lebar) + (b.Panjang * b.Tinggi) + (b.Lebar * b.Tinggi))
		chLuasPermukaan <- luasPermukaan
	}()
	return <-chLuasPermukaan
}

type Tabung struct {
	JariJari float64
	Tinggi   float64
}

func (t Tabung) Volume() float64 {
	chVolume := make(chan float64)
	go func() {
		volume := math.Pi * math.Pow(t.JariJari, 2) * t.Tinggi
		chVolume <- volume
	}()
	return <-chVolume
}

func (t Tabung) LuasPermukaan() float64 {
	chLuasPermukaan := make(chan float64)
	go func() {
		luasPermukaan := 2 * math.Pi * t.JariJari * (t.JariJari + t.Tinggi)
		chLuasPermukaan <- luasPermukaan
	}()
	return <-chLuasPermukaan
}
