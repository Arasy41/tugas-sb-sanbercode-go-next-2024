"use client"

import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import axios from "axios"
import { baseUrl } from "@/utils/constants"

const JadwalForm = ({ id }) => {
  const router = useRouter()
  const [form, setForm] = useState({
    dosenID: "",
    mahasiswaID: "",
    nama: "",
    hari: "",
    jamMulai: "",
    jamSelesai: ""
  })
  const [dosenOptions, setDosenOptions] = useState([])
  const [mahasiswaOptions, setMahasiswaOptions] = useState([])
  const [errors, setErrors] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)

  useEffect(() => {
    // Fetch dosen and mahasiswa options
    const fetchOptions = async () => {
      try {
        const dosenRes = await axios.get(`${baseUrl}/api/dosens`)
        setDosenOptions(dosenRes.data.data.map(dosen => ({
          id: dosen.id,
          label: `${dosen.nama} - ${dosen.mataKuliah}`
        })))
        
        const mahasiswaRes = await axios.get(`${baseUrl}/api/mahasiswas`)
        setMahasiswaOptions(mahasiswaRes.data.data.map(mahasiswa => ({
          id: mahasiswa.id,
          label: mahasiswa.nama
        })))

        if (id) {
          const jadwalRes = await axios.get(`${baseUrl}/api/jadwals/${id}`)
          setForm(jadwalRes.data.data)
        }
      } catch (err) {
        console.log(err)
      }
    }

    fetchOptions()
  }, [id])

  const handleInput = (event) => {
    const { name, value } = event.target
    setForm({ ...form, [name]: value })
  }

  const validateForm = () => {
    const newErrors = {}
    if (!form.hari || !["Senin", "Selasa", "Rabu", "Kamis", "Jumat"].includes(form.hari)) {
      newErrors.hari = "Hari harus di antara Senin hingga Jumat"
    }
    if (form.jamMulai >= form.jamSelesai) {
      newErrors.jam = "Jam selesai tidak boleh mendahului jam mulai dan tidak boleh sama"
    }
    // Additional validations can be added here
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmit(true)

    if (validateForm()) {
      try {
        if (id) {
          await axios.put(`${baseUrl}/api/jadwals/${id}`, form)
        } else {
          await axios.post(`${baseUrl}/api/jadwals`, form)
        }
        setForm({
          dosenID: "",
          mahasiswaID: "",
          nama: "",
          hari: "",
          jamMulai: "",
          jamSelesai: ""
        })
        setIsSubmit(false)
        router.push("/jadwals")
      } catch (err) {
        console.log(err)
      }
    } else {
      setIsSubmit(false)
    }
  }

  const backToTable = () => {
    router.push("/jadwals")
  }

  return (
    <div className="w-9/12 mx-auto mt-[50px]">
      <div className="flex justify-between items-center mb-[50px]">
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={backToTable}
          style={{ marginLeft: "20px" }}
        >
          Back to Table
        </button>
        <h2 className="text-[20px] text-center font-bold">
          {id ? `Edit Jadwal Kuliah ${form.nama}` : `Add New Jadwal Kuliah`}
        </h2>
      </div>
      <div className="custom-form mt-[50px]">
        <form onSubmit={handleSubmit}>
          <label htmlFor="dosen" className="block mb-2 text-sm font-medium text-gray-900">Dosen</label>
          <select
            id="dosen"
            name="dosenID"
            value={form.dosenID}
            onChange={handleInput}
            disabled={isSubmit}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-1/4 p-2.5 mr-2"
          >
            <option value="">Select Dosen</option>
            {dosenOptions.map(dosen => (
              <option key={dosen.id} value={dosen.id}>{dosen.label}</option>
            ))}
          </select>

          <label htmlFor="mahasiswa" className="block mb-2 text-sm font-medium text-gray-900">Mahasiswa</label>
          <select
            id="mahasiswa"
            name="mahasiswaID"
            value={form.mahasiswaID}
            onChange={handleInput}
            disabled={isSubmit}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-1/4 p-2.5 mr-2"
          >
            <option value="">Select Mahasiswa</option>
            {mahasiswaOptions.map(mahasiswa => (
              <option key={mahasiswa.id} value={mahasiswa.id}>{mahasiswa.label}</option>
            ))}
          </select>

          <label htmlFor="hari" className="block mb-2 text-sm font-medium text-gray-900">Hari</label>
          <select
            id="hari"
            name="hari"
            value={form.hari}
            onChange={handleInput}
            disabled={isSubmit}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-1/4 p-2.5 mr-2"
          >
            <option value="">Select Hari</option>
            <option value="Senin">Senin</option>
            <option value="Selasa">Selasa</option>
            <option value="Rabu">Rabu</option>
            <option value="Kamis">Kamis</option>
            <option value="Jumat">Jumat</option>
          </select>

          <label htmlFor="jamMulai" className="block mb-2 text-sm font-medium text-gray-900">Jam Mulai</label>
          <input
            type="time"
            id="jamMulai"
            name="jamMulai"
            value={form.jamMulai}
            onChange={handleInput}
            disabled={isSubmit}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-1/4 p-2.5 mr-2"
          />

          <label htmlFor="jamSelesai" className="block mb-2 text-sm font-medium text-gray-900">Jam Selesai</label>
          <input
            type="time"
            id="jamSelesai"
            name="jamSelesai"
            value={form.jamSelesai}
            onChange={handleInput}
            disabled={isSubmit}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-1/4 p-2.5 mr-2"
          />

          {errors.hari && <p className="text-red-600">{errors.hari}</p>}
          {errors.jam && <p className="text-red-600">{errors.jam}</p>}

          <button
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            {isSubmit ? "Please Wait...." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default JadwalForm
