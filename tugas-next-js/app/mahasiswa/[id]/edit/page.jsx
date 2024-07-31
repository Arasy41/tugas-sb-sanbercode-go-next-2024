"use client"

import { useParams } from 'next/navigation'
import MahasiswaForm from '@/components/mahasiswa/Form'

const EditMahasiswa = () =>{
  const {id} = useParams()


  return(
    <MahasiswaForm id={id}/>
  )
}

export default EditMahasiswa