import MataKuliahTable from "@/components/matakuliah/Table"
import { baseUrl } from "@/utils/constants"

const getMataKuliahs = async () => {
  let result = await fetch(`${baseUrl}/api/matakuliahs`, {cache: "no-store"})
  let data = await result.json()

  return data
}

const MataKuliahs = async ()=>{
  const res = await getMataKuliahs()

  return(
    <>
      <MataKuliahTable matakuliahs={res.data}/>
    </>
  )

}

export default MataKuliahs