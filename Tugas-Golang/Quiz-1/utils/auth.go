package utils

import (
	"net/http"

	"github.com/julienschmidt/httprouter"
)

var users = map[string]string{
	"admin":   "password",
	"editor":  "secret",
	"trainer": "rahasia",
}

func BasicAuth(next httprouter.Handle) httprouter.Handle {
	return func(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
		username, password, ok := r.BasicAuth()

		if !ok || !CheckUser(username, password) {
			w.Header().Set("WWW-Authenticate", `Basic realm="Please enter your username and password"`)
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}
		next(w, r, ps)
	}
}

func CheckUser(username, password string) bool {
	if pass, ok := users[username]; ok {
		return pass == password
	}
	return false
}
