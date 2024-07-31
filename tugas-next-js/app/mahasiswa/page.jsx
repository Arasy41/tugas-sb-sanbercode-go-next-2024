import MahasiswaTable from "@/components/mahasiswa/Table"
import { baseUrl } from "@/utils/constants"

const getMahasiswas = async () => {
  let result = await fetch(`${baseUrl}/api/mahasiswas`, {cache: "no-store"})
  let data = await result.json()

  return data
}

const Mahasiswas = async ()=>{
  const res = await getMahasiswas()

  return(
    <>
      <MahasiswaTable mahasiswas={res.data}/>
    </>
  )

}

export default Mahasiswas