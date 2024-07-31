package main

import "go-vercel-app/api"

// @title Kuliahs API
// @version 1.0
// @description This is a sample server for managing books.
// @host go-vercel-app-arasys-projects.vercel.app
// @BasePath /
func main() {
	api.App.Run()
}
