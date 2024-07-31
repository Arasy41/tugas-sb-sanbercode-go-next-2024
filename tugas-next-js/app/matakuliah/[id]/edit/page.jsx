"use client"

import MataKuliahForm from '@/components/matakuliah/Form'
import { useParams } from 'next/navigation'

const EditMataKuliah = () =>{
  const {id} = useParams()


  return(
    <MataKuliahForm id={id}/>
  )
}

export default EditMataKuliah