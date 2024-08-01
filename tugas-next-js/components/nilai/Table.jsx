"use client"

import useAuthStore from "@/stores/auth";
import { baseUrl } from "@/utils/constants";
import axios from "axios";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import Link from "next/link";
import { useState, useEffect } from "react"

const FootballerTable = ({nilai})=>{
  const {user} = useAuthStore()
  const [data, setData] = useState(nilai)
  const [fetchStatus, setFetchStatus] = useState(false)

  const fetchData = async ()=>{
    let res = await axios.get(`${baseUrl}/api/nilai`)

    setData(res.data.data)
  }

  useEffect(()=>{
    if (fetchStatus){
      fetchData()
      setFetchStatus(false)
    }
  }, [fetchStatus])

  const handleDelete = async(deletedId)=>{
    let text = "Are you sure?";
    console.log(baseUrl)
    if (confirm(text) == true) {
      try{
        await axios.delete(`${baseUrl}/api/nilai/${deletedId}`, {headers: {Authorization: `Bearer ${user.token}`}})
        setFetchStatus(true)
      }catch(err){
        alert(err)
      }
    } 
  }

  return (
    <div className=" w-9/12 mx-auto mt-36">
      <h1 className="text-[20px] text-center font-bold mb-[50px]">Nilai List</h1>
      <div className="flex justify-end">
        <Link href={`/nilai/create`} 
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Add new Nilai
        </Link>
      </div>
      <Table className="mt-[50px]" striped>
        <TableHead>
          <TableHeadCell>No</TableHeadCell>
          <TableHeadCell>Indeks</TableHeadCell>
          <TableHeadCell>Skor</TableHeadCell>
          <TableHeadCell>Mahasiswa</TableHeadCell>
          <TableHeadCell>Mata Kuliah</TableHeadCell>
          <TableHeadCell>Dibuat Oleh</TableHeadCell>
          <TableHeadCell>
            <span className="sr-only">Action</span>
          </TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
          {data.length > 0 && data.map((item, index)=>{
            return(
              <TableRow key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {index+1}
                </TableCell>
                <TableCell>{item.indeks}</TableCell>
                <TableCell>{item.skor}</TableCell>
                <TableCell>{item.mahasiswa_name}</TableCell>
                <TableCell>{item.mata_kuliah}</TableCell>
                <TableCell>{item.user}</TableCell>
                <TableCell>
                  <Link href={`/nilai/${item.id}/edit`} className="font-medium mr-[10px] text-cyan-600 hover:underline dark:text-cyan-500">
                    Edit
                  </Link>
                  <a onClick={()=>{handleDelete(item.id)}} className="cursor-pointer font-medium text-red-600 hover:underline dark:text-cyan-500">
                    Delete
                  </a>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

export default FootballerTable