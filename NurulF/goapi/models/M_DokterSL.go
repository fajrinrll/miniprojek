package models

import (
	"fmt"
	"goapi/config"
	"strings"
	//"strings"
)

type DokterSL1 struct {
	FOTO         string
	NAMA         string
	SPESIALISASI string
}

type DokterSL3 struct {
	RS              string `json:"rs"`
	LOKASI          string `json:"lokasi"`
	SPESIALISASI_RS string `json:"spesialisasi_rs"`
	THE_START       string `json:"the_start"`
	THE_LAST        string `json:"the_last"`
}
type Tindakan struct {
	Id_tindakan int    `json:"Id_tindakan"`
	Tindakan    string `json:"tindakan"`
}
type Pendidikan struct {
	INSTITUSI string `json:"institusi"`
	MAJOR     string `json:"major"`
	TAHUN     string `json:"tahun"`
}

func GetProfilDok(id int) DokterSL1 {
	var rw DokterSL1
	db := config.ConnectDB()
	defer db.Close()
	sql := "select m_biodata.image_path as foto, m_biodata.fullname as nama, m_specialization.name as spesialisasi from m_biodata join m_doctor on m_biodata.id=m_doctor.biodata_id join t_current_doctor_specialization  on m_doctor.id=t_current_doctor_specialization.doctor_id join m_specialization on t_current_doctor_specialization.specialization_id=m_specialization.id join t_doctor_office on m_doctor.id=t_doctor_office.doctor_id where t_doctor_office.doctor_id=$1"
	row, err := db.Query(sql, id)
	if err != nil {
		fmt.Println("Error db profile", err)
	}
	defer row.Close()
	for row.Next() {
		err = row.Scan(&rw.FOTO, &rw.NAMA, &rw.SPESIALISASI)
		if err != nil {
			fmt.Println("error ambil data :", err)
		}
	}
	return rw
}

func GetTindakan(id int) []Tindakan {

	db := config.ConnectDB()
	defer db.Close()
	var tindakans []Tindakan
	sql2 := "SELECT t_doctor_treatment.id, t_doctor_treatment.name as tindakan  from  t_doctor_treatment join m_doctor on t_doctor_treatment.doctor_id=m_doctor.id  where t_doctor_treatment.is_delete=false and m_doctor.id=$1"
	//execute sql
	rows, err2 := db.Query(sql2, id)
	// mengeksekusi sql query

	if err2 != nil {
		fmt.Println("error di exec db :", err2)
	}
	defer rows.Close()

	//execute sql
	//iterasi rows

	for rows.Next() {
		var tr Tindakan
		err2 = rows.Scan(&tr.Id_tindakan, &tr.Tindakan) //ambil data lalu di unmarshal ke STRUC

		if err2 != nil {
			fmt.Println("error ambil data :", err2)
		}
		tindakans = append(tindakans, tr)
	}

	return tindakans

}

func GetDokSL(id int) DokterSL3 {
	var dokterSL DokterSL3
	db := config.ConnectDB()
	defer db.Close()

	sql1 := "SELECT m_medical_facility.name as RS, m_location.name as domisili, t_doctor_office.specialization as spesialisasi_rs, t_doctor_office.created_on  as the_start, t_doctor_office.deleted_on as the_last from t_current_doctor_specialization join m_doctor  on m_doctor.id=t_current_doctor_specialization.doctor_id join m_specialization on t_current_doctor_specialization.specialization_id=m_specialization.id join t_doctor_office on m_doctor.id=t_doctor_office.doctor_id join m_medical_facility on t_doctor_office.medical_facility_id=m_medical_facility.id  join m_location on m_location.id=m_medical_facility.location_id join m_location_level on m_location_level.id=m_location.location_level_id where  t_doctor_office.id=$1"
	//execute sql
	rows, err := db.Query(sql1, id)

	if err != nil {
		fmt.Println("error di exec db :", err)
	}
	defer rows.Close()

	for rows.Next() {

		err = rows.Scan(&dokterSL.RS, &dokterSL.LOKASI, &dokterSL.SPESIALISASI_RS, &dokterSL.THE_START, &dokterSL.THE_LAST) //ambil data lalu di unmarshal ke STRUC
		tahunAw := dokterSL.THE_START
		tahun := dokterSL.THE_LAST
		if tahun == "" {
			dokterSL.THE_LAST = "sekarang"
		}
		fmt.Println(dokterSL)
		arr2 := strings.Split(tahunAw, "-")
		pecahTahunS := arr2[0]
		dokterSL.THE_START = pecahTahunS
		if err != nil {
			fmt.Println("error ambil data :", err)
		}
	}
	//sql

	//execute sql
	//iterasi rows

	// sql3 := " SELECT t_doctor_office.deleted_on from m_biodata join m_doctor  on m_biodata.id=m_doctor.biodata_id join t_current_doctor_specialization  on m_doctor.id=t_current_doctor_specialization.doctor_id join m_specialization on t_current_doctor_specialization.specialization_id=m_specialization.id join m_doctor_education on m_doctor_education.doctor_id=m_doctor.id join t_doctor_treatment on t_doctor_treatment.doctor_id=m_doctor.id join t_doctor_office on m_doctor.id=t_doctor_office.doctor_id join m_medical_facility on t_doctor_office.medical_facility_id=m_medical_facility.id  join m_location on m_location.id=m_medical_facility.location_id join m_location_level on m_location_level.id=m_location.location_level_id where t_doctor_office.id=$1"
	// last, err3 := db.Query(sql3, dokterSL.THE_LAST)
	// if err3 != nil {
	// 	fmt.Println("error add prop : ", err3)
	// }
	// for  {

	// }
	// if dokterSL.THE_LAST == "" {
	// 	tlast := "Sekarang"
	// 	dokterSL.THE_LAST = tlast
	// }
	// tahunAk := dokterSL.THE_LAST
	// arr3 := strings.Split(tahunAk, "-")
	// pecahTahunL := arr3[0]
	// dokterSL.THE_LAST = pecahTahunL

	return dokterSL

}
func GetPendidikan(id int) ([]Pendidikan, error) {

	db := config.ConnectDB()
	defer db.Close()
	var pends []Pendidikan
	sql := "select m_doctor_education.institution_name as institusi, m_doctor_education.major as major, m_doctor_education.end_year as tahun from m_doctor_education join m_doctor on m_doctor.id=m_doctor_education.doctor_id where m_doctor.id=$1"
	//execute sql
	rows, err := db.Query(sql, id)
	// mengeksekusi sql query

	if err != nil {
		fmt.Println("error di exec db :", err)
	}
	defer rows.Close()

	//execute sql
	//iterasi rows
	var pend Pendidikan
	for rows.Next() {

		err = rows.Scan(&pend.INSTITUSI, &pend.MAJOR, &pend.TAHUN) //ambil data lalu di unmarshal ke STRUC
		tahunMajor := pend.TAHUN
		arr1 := strings.Split(tahunMajor, "-")
		pecahTahunM := arr1[0]
		pend.TAHUN = pecahTahunM
		if err != nil {
			fmt.Println("error ambil data :", err)
		}
		pends = append(pends, pend)
	}

	return pends, err

}
