package router

import (
	"goapi/controller"

	"github.com/gorilla/mux"
)

func Router() *mux.Router {

	router := mux.NewRouter()
	srouter := router.PathPrefix("/api/v1").Subrouter() //global router api
	//get with db

	//profile
	srouter.HandleFunc("/getprofil/{id}", controller.GetProfile).Methods("GET")
	srouter.HandleFunc("/getprofil2/{id}", controller.GetProfile2).Methods("GET")
	srouter.HandleFunc("/getdoktertindakan/{id}", controller.GetDokTindakan).Methods("GET")
	srouter.HandleFunc("/getdokterfoto/{id}", controller.GetProfilDok).Methods("GET")
	srouter.HandleFunc("/getdokterRS/{id}", controller.GetDokter).Methods("GET")
	srouter.HandleFunc("/getdokterpend/{id}", controller.GetDokPendidikan).Methods("GET")
	srouter.HandleFunc("/getspesialisasi", controller.GetSpesialisasi).Methods("GET")
	srouter.HandleFunc("/getspesialisasid", controller.GetSpesialisasiD).Methods("GET")
	srouter.HandleFunc("/addtindakan", controller.InsertTindakan).Methods("POST")
	srouter.HandleFunc("/uploadprofile", controller.UploadFileProfile).Methods("POST")
	srouter.HandleFunc("/uploaddokter", controller.UploadFileDokter).Methods("POST")
	srouter.HandleFunc("/deletetindakan", controller.DeleteTindakan).Methods("PUT")
	srouter.HandleFunc("/editspesialisasi", controller.UpdateSpec).Methods("PUT")
	srouter.HandleFunc("/addspesialisasi", controller.InsertSpec).Methods("POST")
	return router

}
