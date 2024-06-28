package utils

import (
	"net/http"

	"github.com/julienschmidt/httprouter"
)

func BasicAuth(next httprouter.Handle) httprouter.Handle {

	// return func(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	// 	username, password, ok := r.BasicAuth()
	// 	if ok && username == "admin" && password == "password" {
	// 		next(w, r, ps)
	// 	} else {
	// 		w.Header().Set("WWW-Authenticate", `Basic realm="Please enter your username and password"`)
	// 		http.Error(w, "Unauthorized.", http.StatusUnauthorized)
	// 	}
	// }

	return func(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
		username, password, ok := r.BasicAuth()

		verifUsername := "admin"
		verifPassword := "admin"

		if !ok || username != verifUsername || password != verifPassword {
			w.Header().Set("WWW-Authenticate", `Basic realm="Please enter your username and password"`)
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}
		next(w, r, ps)
	}
}
