package main

import (
	"fmt"
	"log"
	"net/http"
	"tugas-quiz-1-sb-sanbercode/config"
	"tugas-quiz-1-sb-sanbercode/routes"
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
	router := routes.NewRoutes()
	fmt.Println("Server Running at http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", router))
}
