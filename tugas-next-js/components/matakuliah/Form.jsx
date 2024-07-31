"use client"

import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'

import axios from "axios"
import { baseUrl } from "@/utils/constants"

const MataKuliahForm = ({ id }) => {
  const router = useRouter()
  const initialForm = { nama: "", id: null }
  const [input, setInput] = useState(initialForm)
  const [isSubmit, setIsSubmit] = useState(false)

  useEffect(() => {
    if (id) {
      axios.get(`${baseUrl}/api/matakuliahs/${id}`).then((res) => {
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
        await axios.put(`${baseUrl}/api/matakuliahs/${id}`, { nama })
      } else {
        await axios.post(`${baseUrl}/api/matakuliahs`, { nama })
      }
      setInput(initialForm)
      setIsSubmit(false)
      router.push("/matakuliah")
    } catch (err) {
      console.log(err)
    }
  }

  const backToTable = () => {
    router.push("/matakuliah")
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
          {input.id !== null ? <>Edit Mata Kuliah {input.nama}</> : <>Add New Mata Kuliah</>}
        </h2>
      </div>
      <div className="custom-form mt-[50px]">
        <form onSubmit={handleSubmit}>
          <label htmlFor="matakuliahName" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
          <input
            type="text"
            autoComplete="off"
            disabled={isSubmit}
            id="matakuliahName"
            onChange={handleInput}
            value={input.nama}
            name="nama"
            placeholder="Mata Kuliah name.."
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

export default MataKuliahForm
