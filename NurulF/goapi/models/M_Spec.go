package models

import (
	"fmt"
	"goapi/config"
)

type EditSpec struct {
	IDS         int `json:"ids"`
	IDT         int `json:"idt"`
	MODIFIED_BY int `json:"mspec"`
}
type AddSpec struct {
	Id_dokter       int `json:"Id_dokter"`
	Id_spesialisasi int `json:"Id_spesialisasi"`
	
}
type resNama struct {
	Error bool
	Text  string
}

type resEdit struct {
	Error   bool
	Success string
	Nama    resNama
}
type Spesialisasi struct {
	Id_spesialisasi int    `json:"Id_spesialisasi"`
	SPESIALISASI    string `json:"spesialisasi"`
}
type SpesialisasiD struct {
	Id_dok          int    `json:"Id_dok"`
	Id_spesialisasi int    `json:"Id_spesialisasi"`
	SPESIALISASI    string `json:"spesialisasi"`
}

type resTambahS struct {
	Success string
	Error bool

	Nama    resNama

}

func GetSpesialisasiD() []SpesialisasiD {

	db := config.ConnectDB()
	defer db.Close()

	var spec []SpesialisasiD
	sql2 := "select doctor_id, specialization_id, name from m_specialization join t_current_doctor_specialization on m_specialization.id=t_current_doctor_specialization.specialization_id where doctor_id=1 and t_current_doctor_specialization.is_delete=false"
	//execute sql
	rows, err2 := db.Query(sql2)
	// mengeksekusi sql query

	if err2 != nil {
		fmt.Println("error di exec db :", err2)
	}
	defer rows.Close()

	//execute sql
	//iterasi rows

	for rows.Next() {
		var tr SpesialisasiD
		err2 = rows.Scan(&tr.Id_dok, &tr.Id_spesialisasi, &tr.SPESIALISASI) //ambil data lalu di unmarshal ke STRUC

		if err2 != nil {
			fmt.Println("error ambil data :", err2)
		}
		spec = append(spec, tr)
	}

	return spec

}

func GetSpesialisasi() []Spesialisasi {

	db := config.ConnectDB()
	defer db.Close()

	var spec []Spesialisasi
	sql2 := "select id, name from m_specialization where is_delete=false order by id"
	//execute sql
	rows, err2 := db.Query(sql2)
	// mengeksekusi sql query

	if err2 != nil {
		fmt.Println("error di exec db :", err2)
	}
	defer rows.Close()

	//execute sql
	//iterasi rows

	for rows.Next() {
		var tr Spesialisasi
		err2 = rows.Scan(&tr.Id_spesialisasi, &tr.SPESIALISASI) //ambil data lalu di unmarshal ke STRUC

		if err2 != nil {
			fmt.Println("error ambil data :", err2)
		}
		spec = append(spec, tr)
	}

	return spec

}
func ValidateFormUbah(data EditSpec) resEdit {
	var result resEdit
	respon := resEdit{}
	cekIdS := CekIdSpecEdit(data.IDS, data.IDT)

	var ids int

	if cekIdS.Error {
		ids = 1
	}
	// fmt.Println(kode)
	// fmt.Println(name)

	if ids == 1 {
		respon = resEdit{
			Error: true,
			Nama:  cekIdS,
		}
	} else {
		result = UpdateSpec(data)
		respon = result
	}
	return respon
}

func CekIdSpecEdit(idt int, idd int) resNama {
	var res resNama
	var getId int
	db := config.ConnectDB()
	defer db.Close()
	sql := "select specialization_id from t_current_doctor_specialization where specialization_id=$1 and doctor_id=$2 and is_delete=false"

	row, err := db.Query(sql, idt, idd)
	if err != nil {
		fmt.Println("errorCek:", err)
	}
	defer row.Close()
	for row.Next() {
		row.Scan(&getId)
	}
	// fmt.Println(getId)

	if getId != 0 {
		res = resNama{
			Error: true,
			Text:  "Data Spesialisasi Sudah Ada",
		}
	}
	return res

}

func UpdateSpec(data EditSpec) resEdit {
	var respon resEdit
	db := config.ConnectDB()
	defer db.Close()
	sql := "update t_current_doctor_specialization set specialization_id=$1, modified_by=$2, modified_on= now() where id=$3"
	_, err := db.Exec(sql, data.IDS, data.IDT, data.MODIFIED_BY)

	if err != nil {
		fmt.Println("Updspec:", err)
	} else {
		respon = resEdit{
			Error:   false,
			Success: "Data Berhasil Diubah",
		}
	}
	return respon
}
func InsertSpec(data AddSpec) resTambahS {
	var respon resTambahS
	db := config.ConnectDB()
	defer db.Close()
	sql := "insert into t_current_doctor_specialization (doctor_id, specialization_id,created_by,created_on, modified_by, modified_on) values ($1,$2,$3,1,now(),1,now())"
	_, err := db.Exec(sql, data.Id_dokter, data.Id_spesialisasi )

	if err != nil {
		fmt.Println("Updspec:", err)
	} else {
		respon = resTambahS{
			Error:   false,
			Success: "Data Berhasil Ditambah",
		}
	}
	return respon
}
func ValidateFormTambahS(data AddSpec) resTambahS {
	var result resTambahS
	respon := resTambahS{}
	cekIdS := CekIdSpecAdd(data.Id_dokter, data.Id_spesialisasi )
	var ids int

	if cekIdS.Error {
		ids = 1
	}
	// fmt.Println(kode)
	// fmt.Println(name)

	if ids == 1 {
		respon = resTambahS{
			Error: true,
			Nama:  cekIdS,
		}
	} else {
		result = InsertSpec(data)
		respon = result
	}
	return respon
}
func CekIdSpecAdd(idd int, ids int) resNama {
	var res resNama
	var getId int
	db := config.ConnectDB()
	defer db.Close()
	
	sql := "select specialization_id from t_current_doctor_specialization where specialization_id=$1 and doctor_id=$2 and is_delete=false"
	row, err := db.Query(sql, idd, ids)
	if err != nil {
		fmt.Println("errorCek:", err)
	}
	defer row.Close()
	for row.Next() {
		row.Scan(&getId)
	}
	fmt.Println(getId)

	if getId != 0 {
		res = resNama{
			Error: true,
			Text:  "Data Nama Sudah Ada",
		}
	}
	return res
}