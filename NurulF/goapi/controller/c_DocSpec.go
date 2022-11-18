package controller

import (
	"encoding/json"
	"fmt"
	"goapi/models"
	"net/http"
)

func GetSpesialisasi(w http.ResponseWriter, r *http.Request) {
	// getdokterSL := mux.Vars(r)
	// GetConv, _ := strconv.Atoi(getdokterSL["id"])

	w.Header().Add("Content-Type", "application/json") // set header api to jason

	w.Header().Set("Access-Control-Allow-Origin", "*")

	spec := models.GetSpesialisasi()

	json.NewEncoder(w).Encode(spec)
}

func GetSpesialisasiD(w http.ResponseWriter, r *http.Request) {
	// getdokterSL := mux.Vars(r)
	// GetConv, _ := strconv.Atoi(getdokterSL["id"])

	w.Header().Add("Content-Type", "application/json") // set header api to jason

	w.Header().Set("Access-Control-Allow-Origin", "*")

	spec := models.GetSpesialisasiD()

	json.NewEncoder(w).Encode(spec)
}
func UpdateSpec(w http.ResponseWriter,r *http.Request){
	var data models.EditSpec
	err:=json.NewDecoder(r.Body).Decode(&data)
	if err!=nil{
		fmt.Println("errUpdcntr:",err)
	}
	result:=models.ValidateFormUbah(data)
	json.NewEncoder(w).Encode(result)
}
func InsertSpec(w http.ResponseWriter, r *http.Request) {
	var addSpec models.AddSpec
	err := json.NewDecoder(r.Body).Decode(&addSpec)
	if err != nil {
		fmt.Println("insrolecon:", err)
	}
	result := models.ValidateFormTambahS(addSpec)
	json.NewEncoder(w).Encode(result)
}