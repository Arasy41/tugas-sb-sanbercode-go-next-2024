"use client"

import { useContext, useEffect, useState } from "react"
import { useRouter } from 'next/navigation'

import axios from "axios"
import Swal from "sweetalert2";
import { baseUrl } from "@/utils/constants";
import useAuthStore from "@/stores/auth";


const NilaiForm = ({id})=>{
  const router = useRouter()
  const {user} = useAuthStore()
  const initialForm = {indeks: "", nationality: "", age:0, id: null}
  const [input, setInput] = useState(initialForm)
  const [isSubmit, setIsSubmit] = useState(false)



  useEffect(()=>{
    if (id){
      axios.get(`${baseUrl}/nilai/${id}`).then((res)=>{
        let {id, indeks, nationality, age, photo_url} = res.data.data
        setInput({id, indeks, nationality, age})
      }).catch((err)=>{
        console.log(err)
      })
    }
  }, [id])


  const handleInput = (event)=>{
    let {value, name} = event.target
    if (name === "age"){
      value = Number(value)
    }
    setInput({...input, [name]: value})
  }

  const handleSubmit = async (event)=>{
    event.preventDefault()
    setIsSubmit(true)
    const {name, nationality, age, id} = input
    try{
      if (id){
        await axios.put(`${baseUrl}/nilai/${id}`, {name, nationality, age}, {headers: {Authorization: `Bearer ${user.token}`}})
      }else{
        await axios.post(`${baseUrl}/nilai`, {name, nationality, age}, {headers: {Authorization: `Bearer ${user.token}`}})
      }
      setInput(initialForm)
      setIsSubmit(false)
      router.push("/nilai")

    }catch(err){
      console.log(err)
    }
  }


  const backToTable = ()=>{
    router.push("/nilai")
  }

  
  return(
    <div className="w-9/12 mx-auto mt-[50px]">
      <h2 className="text-[20px] text-center font-bold mb-[50]">{input.id !== null && <>Edit Nilai {input.mahasiswa_name}</>}</h2>
      <h2 className="text-[20px] text-center font-bold mb-[50]">{input.id === null && <>Add New Nilai</>}</h2>
      <div className="custom-form mt-[50px]">
        <form onSubmit={handleSubmit}>
          
          <label htmlFor="skorNilai">Skor</label>
          <input type="number" min={0} max={100} autoComplete="off" disabled={isSubmit} id="skorNilai" onChange={handleInput} value={input.skor} name="skor" placeholder="Nilai skor.." />
          <label htmlFor="mahasiswaID">Mahasiswa ID</label>
          <input type="number" autoComplete="off" disabled={isSubmit} id="mahasiswaID" onChange={handleInput} value={input.mahasiswa_id} name="mahasiswa_id" placeholder="Mahasiswa Id.." />
          <label htmlFor="mataKuliahID">Age</label>
          <input type="number" min={0} autoComplete="off" disabled={isSubmit} id="mataKuliahID" onChange={handleInput} value={input.matakuliah_id} name="matakuliah_id" placeholder="Mata Kuliah Id.." />
            <button className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">{isSubmit ? "Please Wait...." : "Submit"}</button>
        </form>
        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={()=>{
          backToTable()
        }} style={{marginRight: "20px"}}>Back to Table</button>
      </div>
    </div>

  )
}

export default NilaiForm