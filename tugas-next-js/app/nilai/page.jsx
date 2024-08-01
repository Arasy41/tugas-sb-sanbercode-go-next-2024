import FootballerTable from "@/components/nilai/Table"
import { baseUrl } from "@/utils/constants"


const getNilai = async () => {
  let result = await fetch(`${baseUrl}/nilai`, {cache: "no-store"})
  let data = await result.json()

  return data
}

const Nilai = async ()=>{
  const res = await getNilai()

  return(
    <>
      <FootballerTable nilai={res.data}/>
    </>
  )

}

export default Nilai