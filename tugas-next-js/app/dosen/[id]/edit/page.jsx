"use client"

import DosenForm from '@/components/dosen/Form'
import { useParams } from 'next/navigation'

const EditDosen = () =>{
  const {id} = useParams()


  return(
    <DosenForm id={id}/>
  )
}

export default EditDosen