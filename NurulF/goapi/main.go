package main

import (
	"fmt"
	"goapi/router"
	"log"
	"net/http"
	"github.com/gorilla/handlers"
)

func main(){
	fmt.Println("Jalan-Jalan")
	
	r := router.Router() //memanggil fungsi router
	headers := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"})
    methods := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE"})
    origins := handlers.AllowedOrigins([]string{"*"})
	log.Fatal(http.ListenAndServe(":80",handlers.CORS(headers,methods,origins)(r))) //menjalankan server dengan port 80
}