"use client"

import { usePathname, useRouter, useParams } from "next/navigation"
import useAuthStore from "@/stores/auth";
import { useEffect } from "react";

const ProtectedRoute = ({children})=>{
  let router = useRouter()
  let pathname = usePathname()
  const {id} = useParams()

  const {user} = useAuthStore()

  useEffect(()=>{
    if (user){
      let loginRoutesList = ["/auth/login", "/auth/path"] 
      if (loginRoutesList.includes(pathname)){
        router.push("/")
      }
    }else{
      let privateRouteList = [`/nilai/${id}/edit`, "/nilai/create"] 
      if (privateRouteList.includes(pathname)){
        router.push("/auth/login")
      }
    }
  })


  return <>{children}</>
}

export default ProtectedRoute