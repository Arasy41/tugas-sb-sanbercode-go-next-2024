package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/Arasy41/tugas-sb-sanbercode-go-next-2024/config"
	"github.com/Arasy41/tugas-sb-sanbercode-go-next-2024/routes"
)

func main() {
	db, e := config.ConnectDB()

	if e != nil {
		log.Fatal(e)
	}

	eb := db.Ping()
	if eb != nil {
		panic(eb.Error())
	}

	fmt.Println("Database Connected")

	router := routes.MainRouter()
	fmt.Println("Server Running at http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", router))
}
