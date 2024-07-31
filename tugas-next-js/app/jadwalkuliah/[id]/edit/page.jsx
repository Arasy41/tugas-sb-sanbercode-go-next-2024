"use client"

import { useParams } from 'next/navigation'
import JadwalForm from '@/components/jadwalkuliah/Form'

const EditMahasiswa = () =>{
  const {id} = useParams()


  return(
    <JadwalForm id={id}/>
  )
}

export default EditMahasiswa