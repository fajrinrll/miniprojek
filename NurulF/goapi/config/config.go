package config

import (
	"database/sql"
	"fmt"
	"os"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

func ConnectDB() *sql.DB {
	//buka env
	err := godotenv.Load(".env")
	//error env
	if err != nil {
		fmt.Println("error env : ", err)
	}

	//buka database
	db, err := sql.Open("postgres", os.Getenv("POSTGRES_URL"))
	if err != nil {
		fmt.Println("error buka db : ", err)
	}

	//cek koneksi
	err = db.Ping()
	if err != nil {
		fmt.Println("error tes konek : ", err)
	}
	

	return db
}
