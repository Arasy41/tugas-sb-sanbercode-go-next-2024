package src

import (
	"fmt"
	"strings"
)

// Struct, Interface & Method Soal 1
type SegitigaSamaSisi struct {
	Alas, Tinggi int
}

type PersegiPanjang struct {
	Panjang, Lebar int
}

type HitungBangunDatar interface {
	Luas() int
	Keliling() int
}

func (s SegitigaSamaSisi) Luas() int {
	return s.Alas * s.Tinggi / 2
}

func (s SegitigaSamaSisi) Keliling() int {
	return s.Alas * 3
}

func (p PersegiPanjang) Luas() int {
	return p.Panjang * p.Lebar
}

func (p PersegiPanjang) Keliling() int {
	return (p.Panjang + p.Lebar) * 2
}

type Tabung struct {
	JariJari, Tinggi float64
}

type Balok struct {
	Panjang, Lebar, Tinggi int
}

type HitungBangunRuang interface {
	Volume() float64
	LuasPermukaan() float64
}

func (t Tabung) Volume() float64 {
	return 3.14 * t.JariJari * t.JariJari * t.Tinggi
}

func (t Tabung) LuasPermukaan() float64 {
	return 2*(3.14*(t.JariJari*t.JariJari)) + ((3.14 * t.JariJari * 2) * t.Tinggi)
}

func (b Balok) Volume() float64 {
	return float64(b.Panjang * b.Lebar * b.Tinggi)
}

func (b Balok) LuasPermukaan() float64 {
	return float64(2*(b.Panjang*b.Lebar) + (b.Panjang * b.Tinggi) + (b.Lebar * b.Tinggi))
}

// Struct, Interface & Method Soal 2
type Phone struct {
	Name, Brand string
	Year        int
	Colors      []string
}

type PhoneInfo interface {
	GetPhoneInfo() string
}

func (p Phone) GetPhoneInfo() string {
	colorsJoin := strings.Join(p.Colors, ", ")
	return fmt.Sprintf("name : %s\nbrand : %s\nyear : %d\ncolors : %s", p.Name, p.Brand, p.Year, colorsJoin)
}

// Function Soal 3
func LuasPersegi(sisi int, isTrue bool) interface{} {
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
type Person struct {
	Name, Job, Gender string
	Age               int
}

type Sentence interface {
	Introduction() string
}

func (p Person) Introduction() string {
	call := "Pak"
	if p.Gender == "female" {
		call = "Bu"
	}
	return fmt.Sprintf("%s %s adalah %s yang berusia %d tahun", call, p.Name, p.Job, p.Age)
}
