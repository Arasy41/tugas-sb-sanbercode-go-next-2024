"use client"

import NilaiForm from '@/components/nilai/Form'
import { useParams } from 'next/navigation'

const EditNilai = () =>{
  const {id} = useParams()


  return(
    <NilaiForm id={id}/>
  )
}

export default EditNilai