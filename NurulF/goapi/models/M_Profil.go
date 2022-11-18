package models

import (
	"fmt"
	"goapi/config"
	"strings"
)

type Profile2 struct {
	FOTO  string
	SINCE string
}

type Profile struct {
	NAMA     string
	TTL      string
	PHONE    string
	EMAIL    string
	PASSWORD string
}

func GetProfile2(id int) Profile2 {
	var rw Profile2
	db := config.ConnectDB()
	defer db.Close()
	sql := "  select m_biodata.image_path as foto, m_user.created_on as since from m_biodata join m_user  on m_biodata.id=m_user.biodata_id where m_biodata.id=$1"
	row, err := db.Query(sql, id)
	if err != nil {
		fmt.Println("Error db profile", err)
	}
	defer row.Close()
	for row.Next() {
		err = row.Scan(&rw.FOTO, &rw.SINCE)
		if err != nil {
			fmt.Println("error ambil data :", err)
		}
	}
	tahun := rw.SINCE
	arr2 := strings.Split(tahun, "-")
	pecahTahun := arr2[0]
	rw.SINCE = pecahTahun
	return rw
}
func GetProfile(id int) Profile {
	var rw Profile
	db := config.ConnectDB()
	defer db.Close()
	sql := "select m_biodata.fullname as nama,  m_customer.dob as ttl, m_biodata.mobile_phone, lower(m_user.email) as email, m_user.password  from m_biodata join m_customer on m_biodata.id=m_customer.biodata_id join m_user  on m_biodata.id=m_user.biodata_id where m_biodata.id=$1"
	row, err := db.Query(sql, id)
	if err != nil {
		fmt.Println("Error db profile", err)
	}
	defer row.Close()
	for row.Next() {
		err = row.Scan(&rw.NAMA, &rw.TTL, &rw.PHONE, &rw.EMAIL, &rw.PASSWORD)
		if err != nil {
			fmt.Println("error ambil data :", err)
		}
	}
	var Bulan = rw.TTL
	arr := strings.Split(Bulan, "-")
	pecahan := arr[2][:2]
	month := bulan(arr[1])
	tgl := arr[0]
	arr[0] = pecahan
	arr[1] = month
	arr[2] = tgl
	gabung := strings.Join(arr, " ")
	rw.TTL = gabung

	return rw
}

func bulan(data string) string {
	var result string
	switch data {
	case "01":
		result = "Januari"
	case "02":
		result = "Februari"
	case "03":
		result = "Maret"
	case "04":
		result = "April"
	case "05":
		result = "Mei"
	case "06":
		result = "Juni"
	case "07":
		result = "Agusts"
	case "09":
		result = "September"
	case "10":
		result = "Oktober"
	case "11":
		result = "November"
	case "12":

		result = "Desember"
	}
	return result
}

func UploadFileProfile(str string, id string) {
	db := config.ConnectDB()
	defer db.Close()
	sql := "update m_biodata set image_path= $1, modified_by=$2, modified_on= now() where id= $3"
	_, err := db.Exec(sql, str, id, id)
	if err != nil {
		fmt.Println("error Query Upload :", err)
	}
}

