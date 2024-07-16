package main

import "go-vercel-app/api"

// @title Books API
// @version 1.0
// @description This is a sample server for managing books.
// @host https://go-vercel-app-arasys-projects.vercel.app/
// @BasePath /
func main() {
	api.App.Run()
}
