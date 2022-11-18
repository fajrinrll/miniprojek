package controller

import (
	"encoding/json" // package untuk enkode dan mendekode json menjadi struct dan sebaliknya
	"fmt"
	"goapi/models"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/teris-io/shortid"
)

func GetProfilDok(w http.ResponseWriter, r *http.Request) {
	getID := mux.Vars(r)
	idConv, _ := strconv.Atoi(getID["id"])
	w.Header().Add("Content-Type", "application/json") // set header api to jason

	p, _ := json.MarshalIndent(models.GetProfilDok(idConv), "", "\t")

	w.Write(p)
}

func GetDokTindakan(w http.ResponseWriter, r *http.Request) {
	getdokterSL := mux.Vars(r)
	GetConv, _ := strconv.Atoi(getdokterSL["id"])

	w.Header().Add("Content-Type", "application/json") // set header api to jason

	w.Header().Set("Access-Control-Allow-Origin", "*")

	tindakans := models.GetTindakan(GetConv)

	json.NewEncoder(w).Encode(tindakans)
}
func GetDokPendidikan(w http.ResponseWriter, r *http.Request) {
	getdokterSL := mux.Vars(r)
	GetConv, _ := strconv.Atoi(getdokterSL["id"])

	w.Header().Add("Content-Type", "application/json") // set header api to jason

	w.Header().Set("Access-Control-Allow-Origin", "*")
	// memanggil models AmbilSemuaBuku
	pends, err := models.GetPendidikan(GetConv)

	if err != nil {
		fmt.Print("err")
	}
	json.NewEncoder(w).Encode(pends)
}
func GetDokter(w http.ResponseWriter, r *http.Request) {
	getdokterSL := mux.Vars(r)
	GetConv, _ := strconv.Atoi(getdokterSL["id"])

	w.Header().Add("Content-Type", "application/json") // set header api to jason

	p, _ := json.MarshalIndent(models.GetDokSL(GetConv), "", "\t")

	w.Write(p)
}

func UploadFileDokter(w http.ResponseWriter, r *http.Request) {
	refid, _ := shortid.Generate()
	id := r.FormValue("user")
	uploadedFile, handler, err := r.FormFile("file")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	defer uploadedFile.Close()

	// dir, err := os.Getwd()
	// if err != nil {
	// 	http.Error(w, err.Error(), http.StatusInternalServerError)
	// 	return
	// }
	filename := handler.Filename
	if refid != "" {
		filename = fmt.Sprintf("%s%s", refid, filepath.Ext(handler.Filename))
	}
	fileLocation := filepath.Join("C:/TeamB_Batch300/teamb_batch300/NurulF/react/my-app/public/assets/img", filename)
	targetFile, err := os.OpenFile(fileLocation, os.O_WRONLY|os.O_CREATE, 0666)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer targetFile.Close()

	if _, err := io.Copy(targetFile, uploadedFile); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	models.UploadFileDokter(filename, id)
}
