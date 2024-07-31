"use client"

import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation'
import axios from "axios"
import { baseUrl } from "@/utils/constants"

const DosenForm = ({ id }) => {
  const router = useRouter()
  const [input, setInput] = useState({ nama: "", matakuliah_id: null })
  const [matakuliahList, setMatakuliahList] = useState([])
  const [isSubmit, setIsSubmit] = useState(false)

  useEffect(() => {
    const fetchMatakuliah = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/matakuliahs`)
        setMatakuliahList(res.data.data)
        console.log(res.data.data);
      } catch (err) {
        console.log(err)
      }
    }

    fetchMatakuliah()

    if (id) {
      axios.get(`${baseUrl}/api/dosen/${id}`).then((res) => {
        const { nama, matakuliah_id } = res.data.data
        setInput({ nama, matakuliah_id })
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
        await axios.put(`${baseUrl}/api/dosen/${id}`, input)
      } else {
        await axios.post(`${baseUrl}/api/dosen`, input)
      }
      setInput({ nama: "", matakuliah_id: null })
      setIsSubmit(false)
      router.push("/dosen")
    } catch (err) {
      console.log(err)
    }
  }

  const backToTable = () => {
    router.push("/dosen")
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
          {id ? <>Edit Dosen {input.nama}</> : <>Add New Dosen</>}
        </h2>
      </div>
      <div className="custom-form mt-[50px]">
        <form onSubmit={handleSubmit}>
          <label htmlFor="dosenName" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
          <input
            type="text"
            autoComplete="off"
            disabled={isSubmit}
            id="dosenName"
            onChange={handleInput}
            value={input.nama}
            name="nama"
            placeholder="Dosen name.."
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-1/4 p-2.5 mr-2"
          />
          <label htmlFor="matakuliah" className="block mb-2 text-sm font-medium text-gray-900">Mata Kuliah</label>
          <select
            id="matakuliah"
            name="matakuliah_id"
            value={input.matakuliah_id || ""}
            onChange={handleInput}
            disabled={isSubmit}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-1/4 p-2.5 mr-2"
          >
            <option value="">Select Mata Kuliah</option>
            {matakuliahList.map((mk) => (
              <option key={mk.ID} value={mk.ID}>{mk.nama}</option>
            ))}
          </select>
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

export default DosenForm
