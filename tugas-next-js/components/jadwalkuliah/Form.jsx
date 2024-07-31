"use client"

import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation'
import axios from "axios"
import { baseUrl } from "@/utils/constants"

const JadwalForm = ({ id }) => {
  const router = useRouter()
  const [input, setInput] = useState({
    dosen_id: "",
    mahasiswa_id: "",
    nama: "",
    hari: "",
    jam_mulai: "",
    jam_selesai: "",
  })
  const [dosenList, setDosenList] = useState([])
  const [mahasiswaList, setMahasiswaList] = useState([])
  const [matakuliahList, setMatakuliahList] = useState([])
  const [isSubmit, setIsSubmit] = useState(false)

  useEffect(() => {
    const fetchDosen = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/dosens`)
        setDosenList(res.data.data)
      } catch (err) {
        console.log(err)
      }
    }

    const fetchMahasiswa = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/mahasiswas`)
        setMahasiswaList(res.data.data)
      } catch (err) {
        console.log(err)
      }
    }

    const fetchMatakuliah = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/matakuliahs`)
        setMatakuliahList(res.data.data)
      } catch (err) {
        console.log(err);
      }
    }

    fetchDosen()
    fetchMahasiswa()
    fetchMatakuliah()

    if (id) {
      axios.get(`${baseUrl}/api/jadwals/${id}`).then((res) => {
        const { dosen_id, mahasiswa_id, nama, hari, jam_mulai, jam_selesai } = res.data.data
        setInput({ dosen_id, mahasiswa_id, nama, hari, jam_mulai, jam_selesai })
      }).catch((err) => {
        console.log(err)
      })
    }
  }, [id])

  const handleInput = (event) => {
    const { value, name } = event.target
    setInput({ ...input, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmit(true)
    try {
      if (id) {
        await axios.put(`${baseUrl}/api/jadwals/${id}`, input)
      } else {
        await axios.post(`${baseUrl}/api/jadwals`, input)
      }
      setInput({
        dosen_id: "",
        mahasiswa_id: "",
        nama: "",
        hari: "",
        jam_mulai: "",
        jam_selesai: "",
      })
      setIsSubmit(false)
      router.push("/jadwalkuliah")
    } catch (err) {
      console.log(err)
    }
  }

  const backToTable = () => {
    router.push("/jadwalkuliah")
  }

  return (
    <div className="w-9/12 mx-auto mt-[50px]">
      <div className="flex justify-between items-center mb-[75px]">
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={backToTable}
          style={{ marginLeft: "20px" }}
        >
          Back to Table
        </button>
        <h2 className="text-[20px] text-center font-bold">
          {id ? <>Edit Jadwal Kuliah</> : <>Add New Jadwal Kuliah</>}
        </h2>
      </div>
      <div className="custom-form mt-[60px]">
        <form onSubmit={handleSubmit}>
          <label htmlFor="dosen" className="block mt-2 mb-2 text-sm font-medium text-gray-900">Dosen</label>
          <select
            id="dosen"
            name="dosen_id"
            value={input.dosen_id || ""}
            onChange={handleInput}
            disabled={isSubmit}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-1/2 p-2.5 mr-2"
          >
            <option value="">Select Dosen</option>
            {dosenList.map((dosen) => (
              <option key={dosen.id} value={dosen.id}>{dosen.nama}</option>
            ))}
          </select>
          <label htmlFor="mahasiswa" className="block mt-2 mb-2 text-sm font-medium text-gray-900">Mahasiswa</label>
          <select
            id="mahasiswa"
            name="mahasiswa_id"
            value={input.mahasiswa_id || ""}
            onChange={handleInput}
            disabled={isSubmit}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-1/2 p-2.5 mr-2"
          >
            <option value="">Select Mahasiswa</option>
            {mahasiswaList.map((mahasiswa) => (
              <option key={mahasiswa.id} value={mahasiswa.id}>{mahasiswa.nama}</option>
            ))}
          </select>
          <label htmlFor="nama" className="block mt-2 mb-2 text-sm font-medium text-gray-900">Mata Kuliah</label>
          <select
            id="matakuliah"
            name="matakuliah_id"
            value={input.matakuliah_id || ""}
            onChange={handleInput}
            disabled={isSubmit}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-1/2 p-2.5 mr-2"
          >
            <option value="">Select Mata Kuliah</option>
            {matakuliahList.map((matkul) => (
              <option key={matkul.id} value={matkul.id}>{matkul.nama}</option>
            ))}
          </select>
          <label htmlFor="hari" className="block mt-2 mb-2 text-sm font-medium text-gray-900">Hari</label>
          <select
            id="hari"
            name="hari"
            value={input.hari || ""}
            onChange={handleInput}
            disabled={isSubmit}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-1/2 p-2.5 mr-2"
          >
            <option value="">Select Hari</option>
            <option value="Senin">Senin</option>
            <option value="Selasa">Selasa</option>
            <option value="Rabu">Rabu</option>
            <option value="Kamis">Kamis</option>
            <option value="Jumat">Jumat</option>
          </select>
          <label htmlFor="jam_mulai" className="block mt-2 mb-2 text-sm font-medium text-gray-900">Jam Mulai</label>
          <input
            type="time"
            disabled={isSubmit}
            id="jam_mulai"
            onChange={handleInput}
            value={input.jam_mulai}
            name="jam_mulai"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-1/2 p-2.5 mr-2"
          />
          <label htmlFor="jam_selesai" className="block mt-2 mb-2 text-sm font-medium text-gray-900">Jam Selesai</label>
          <input
            type="time"
            disabled={isSubmit}
            id="jam_selesai"
            onChange={handleInput}
            value={input.jam_selesai}
            name="jam_selesai"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-1/2 p-2.5 mr-2"
          />
          <button
            className="focus:outline-none block mt-2 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            {isSubmit ? "Please Wait...." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default JadwalForm
