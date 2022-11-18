package controller

import (
	"encoding/json"
	"fmt"
	"goapi/models"
	"net/http"
)

func InsertTindakan(w http.ResponseWriter, r *http.Request) {
	var addTindakan models.AddTindakan
	err := json.NewDecoder(r.Body).Decode(&addTindakan)
	if err != nil {
		fmt.Println("insrolecon:", err)
	}
	result := models.ValidateFormTambah(addTindakan)
	json.NewEncoder(w).Encode(result)
}

func DeleteTindakan(w http.ResponseWriter, r *http.Request) {
	var data models.Delete
	err := json.NewDecoder(r.Body).Decode(&data)
	if err != nil {
		fmt.Println("errorDeletCntr:", err)
	}
	result := models.DeleteTindakan(data)
	json.NewEncoder(w).Encode(result)
}
