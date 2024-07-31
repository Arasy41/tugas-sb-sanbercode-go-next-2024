"use client"

import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'

import axios from "axios"
import { baseUrl } from "@/utils/constants"

const MahasiswaForm = ({ id }) => {
  const router = useRouter()
  const initialForm = { nama: "", id: null }
  const [input, setInput] = useState(initialForm)
  const [isSubmit, setIsSubmit] = useState(false)

  useEffect(() => {
    if (id) {
      axios.get(`${baseUrl}/api/mahasiswas/${id}`).then((res) => {
        let { id, nama } = res.data.data
        setInput({ id, nama })
      }).catch((err) => {
        console.log(err)
      })
    }
  }, [id])

  const handleInput = (event) => {
    let { value, name } = event.target
    setInput({ ...input, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmit(true)
    const { nama, id } = input
    try {
      if (id) {
        await axios.put(`${baseUrl}/api/mahasiswas/${id}`, { nama })
      } else {
        await axios.post(`${baseUrl}/api/mahasiswas`, { nama })
      }
      setInput(initialForm)
      setIsSubmit(false)
      router.push("/mahasiswa")
    } catch (err) {
      console.log(err)
    }
  }

  const backToTable = () => {
    router.push("/mahasiswa")
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
          {input.id !== null ? <>Edit Mahasiswa {input.nama}</> : <>Add New Mahasiswa</>}
        </h2>
      </div>
      <div className="custom-form mt-[50px]">
        <form onSubmit={handleSubmit}>
          <label htmlFor="mahasiswaName" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
          <input
            type="text"
            autoComplete="off"
            disabled={isSubmit}
            id="mahasiswaName"
            onChange={handleInput}
            value={input.nama}
            name="nama"
            placeholder="Mahasiswa name.."
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-1/4 p-2.5 mr-2"
          />
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

export default MahasiswaForm
