package config

import (
	"database/sql"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
)

const (
	username string = "root"
	password string = ""
	host     string = "localhost"
	port     string = "3307"
	database string = "db_quiz_1"
)

var (
	dsn = fmt.Sprintf("%v:%v@tcp(%s:%s)/%v", username, password, host, port, database)
)

// HubToMySQL
func ConnectDB() (*sql.DB, error) {
	db, err := sql.Open("mysql", dsn)

	if err != nil {
		return nil, err
	}

	return db, nil
}
