import DosenTable from "@/components/dosen/Table"
import { baseUrl } from "@/utils/constants"

const getDosens = async () => {
  let result = await fetch(`${baseUrl}/api/dosens`, {cache: "no-store"})
  let data = await result.json()

  return data
}

const Dosens = async ()=>{
  const res = await getDosens()

  return(
    <>
      <DosenTable dosens={res.data}/>
    </>
  )

}

export default Dosens