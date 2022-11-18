package models

import (
	"fmt"
	"goapi/config"
)

type AddTindakan struct {
	DOKTER_ID int    `json:"dokter_id"`
	TINDAKAN string `json:"tindakan"`
}

type resTindakan struct {
	Error bool
	Text  string
	
}

type resTambah struct {
	Status   bool
	Tindakan resTindakan
}

type Delete struct {
	ID_TREATMENT int `json:"idt"`
	DELETE_BY    int `json:"del"`
}


func ValidateFormTambah(data AddTindakan) resTambah {
	var result resTindakan
	respon := resTambah{}
	cekName := CekNamaTindakan(data.TINDAKAN)
	if cekName.Error {
		respon = resTambah{
			Status:   false,
			Tindakan: cekName,
		}
	} else {
		result = InsertTindakan(data)
		respon = resTambah{
			Status:   true,
			Tindakan: result,
		}
	}
	return respon
}

func InsertTindakan(data AddTindakan) resTindakan {

	var res resTindakan
	db := config.ConnectDB()
	defer db.Close()

	sql := "insert into t_doctor_treatment (doctor_id,name,created_by,created_on) values ($1,$2,1,now()) "
	_, err := db.Exec(sql,data.DOKTER_ID, data.TINDAKAN)
	if err != nil {
		res = resTindakan{
			Error: true,
			Text:  "Data Gagal Ditambah",
		}
		fmt.Println("sqlinserror:", err)
	} else {
		res = resTindakan{
			Error: false,
			Text:  "Data Berhasil Ditambah",
		}
	}
	return res
}

func CekNamaTindakan( data string) resTindakan {
	var res resTindakan
	var getId int
	db := config.ConnectDB()
	defer db.Close()
	sql := "select id from t_doctor_treatment where lower(name) = lower($1) and is_delete=false"
//sql:=`select id from t_doctor_treatment  where doctor_id=$1 and lower(name) = lower($2) and is_delete=false `
	row, err := db.Query(sql, data)
	if err != nil {
		fmt.Println("errorCek:", err)
	}
	defer row.Close()
	for row.Next() {
		row.Scan(&getId)
	}
	fmt.Println(getId)

	if getId != 0 {
		res = resTindakan{
			Error: true,
			Text:  "Data Nama Sudah Ada",
		}
	}
	return res
}

func DeleteTindakan(data Delete) string {
	var respon string
	db := config.ConnectDB()
	defer db.Close()
	sql := "update t_doctor_treatment set deleted_by=$1,deleted_on=now(),is_delete=true where id=$2"
	_, err := db.Exec(sql, data.DELETE_BY, data.ID_TREATMENT)
	if err != nil {
		respon = "true"
		fmt.Println("ErrDelete:", err)
	} else {
		respon = "false"
	}
	return respon
}

func UploadFileDokter(str string, id string) {
	db := config.ConnectDB()
	defer db.Close()
	sql := "update m_biodata set image_path= $1, modified_by=$2, modified_on= now() where id= $3"
	_, err := db.Exec(sql, str, id, id)
	if err != nil {
		fmt.Println("error Query Upload :", err)
	}
}
