"use client"

import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation'
import axios from "axios"
import { baseUrl } from "@/utils/constants"

const JadwalForm = ({ id }) => {
  const router = useRouter()
  const [input, setInput] = useState({
    dosen_id: 0,
    mahasiswa_id: 0,
    hari: "",
    jam_mulai: "00:00",
    jam_selesai: "00:00",
  })
  const [dosenList, setDosenList] = useState([])
  const [mahasiswaList, setMahasiswaList] = useState([])
  const [isSubmit, setIsSubmit] = useState(false)

  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'))
  const minutes = ['00', '15', '30', '45']

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

    fetchDosen()
    fetchMahasiswa()

    if (id) {
      axios.get(`${baseUrl}/api/jadwals/${id}`).then((res) => {
        const { dosen_id, mahasiswa_id, nama, hari, jam_mulai, jam_selesai } = res.data.data
        setInput({
          dosen_id,
          mahasiswa_id,
          hari,
          jam_mulai: jam_mulai.substring(0, 5),
          jam_selesai: jam_selesai.substring(0, 5),
        })
      }).catch((err) => {
        console.log(err)
      })
    }
  }, [id])

  const handleInput = (event) => {
    const { value, name } = event.target
    setInput({ ...input, [name]: value })
  }

  const handleTimeChange = (event, timeType, part) => {
    const { value } = event.target
    const currentValue = input[timeType].split(':')
    if (part === 'hour') {
      currentValue[0] = value
    } else {
      currentValue[1] = value
    }
    setInput({ ...input, [timeType]: currentValue.join(':') })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmit(true)

    const inputToSubmit = {
      ...input,
      dosen_id: parseInt(input.dosen_id, 10),
      mahasiswa_id: parseInt(input.mahasiswa_id, 10),      
    }

    try {
      if (id) {
        await axios.put(`${baseUrl}/api/jadwals/${id}`, inputToSubmit)
      } else {
        await axios.post(`${baseUrl}/api/jadwals`, inputToSubmit)
      }
      setInput({
        dosen_id: 0,
        mahasiswa_id: 0,
        hari: "",
        jam_mulai: "00:00",
        jam_selesai: "00:00",
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
            value={input.dosen_id || 0}
            onChange={handleInput}
            disabled={isSubmit}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-1/2 p-2.5 mr-2"
          >
            <option value={0}>Select Dosen</option>
            {dosenList.map((dosen) => (
              <option key={dosen.id} value={dosen.id}>{dosen.nama} - {dosen.matakuliah.nama}</option>
            ))}
          </select>
          <label htmlFor="mahasiswa" className="block mt-2 mb-2 text-sm font-medium text-gray-900">Mahasiswa</label>
          <select
            id="mahasiswa"
            name="mahasiswa_id"
            value={input.mahasiswa_id || 0}
            onChange={handleInput}
            disabled={isSubmit}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-1/2 p-2.5 mr-2"
          >
            <option value={0}>Select Mahasiswa</option>
            {mahasiswaList.map((mahasiswa) => (
              <option key={mahasiswa.id} value={mahasiswa.id}>{mahasiswa.nama}</option>
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
          <div className="flex">
            <select
              id="jam_mulai_hour"
              onChange={(e) => handleTimeChange(e, 'jam_mulai', 'hour')}
              value={input.jam_mulai.split(':')[0]}
              disabled={isSubmit}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-1/4 p-2.5 mr-2"
            >
              <option value="">HH</option>
              {hours.map((hour) => (
                <option key={hour} value={hour}>{hour}</option>
              ))}
            </select>
            <select
                id="jam_mulai_minute"
                onChange={(e) => handleTimeChange(e, 'jam_mulai', 'minute')}
                value={input.jam_mulai.split(':')[1]}
                disabled={isSubmit}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-1/4 p-2.5"
              >
                <option value="">MM</option>
                {minutes.map((minute) => (
                  <option key={minute} value={minute}>{minute}</option>
                ))}
              </select>
            </div>
          <label htmlFor="jam_selesai" className="block mt-2 mb-2 text-sm font-medium text-gray-900">Jam Selesai</label>
          <div className="flex">
            <select
              id="jam_selesai_hour"
              onChange={(e) => handleTimeChange(e, 'jam_selesai', 'hour')}
              value={input.jam_selesai.split(':')[0]}
              disabled={isSubmit}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-1/4 p-2.5 mr-2"
            >
              <option value="">HH</option>
              {hours.map((hour) => (
                <option key={hour} value={hour}>{hour}</option>
              ))}
            </select>
            <select
              id="jam_selesai_minute"
              onChange={(e) => handleTimeChange(e, 'jam_selesai', 'minute')}
              value={input.jam_selesai.split(':')[1]}
              disabled={isSubmit}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-1/4 p-2.5"
            >
              <option value="">MM</option>
              {minutes.map((minute) => (
                <option key={minute} value={minute}>{minute}</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            disabled={isSubmit}
            className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            {id ? 'Update' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default JadwalForm

