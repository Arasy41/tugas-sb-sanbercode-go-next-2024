"use client";

import { baseUrl } from "@/utils/constants";
import axios from "axios";
import { Button, Label, TextInput } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function Register() {
  const inputRef = useRef(null)
  const router = useRouter()

  const submitRegister = async (event)=>{
    event.preventDefault()
    const {username:{value:username}, email:{value:email}, password:{value:password}} = inputRef.current

    try{
      await axios.post(`${baseUrl}/api/register`, {username, email, password})
      alert("Register Success, you can login with this email")
      inputRef.current.reset()
      router.push("/auth/login")
    }catch(err){
      alert(err)
    }
    inputRef.current.reset()
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center dark:bg-gray-950">
      <div className="w-[400px] mx-auto ">
        <h1 className="text-2xl font-bold mb-6 text-center dark:text-white">Register</h1>
        <form ref={inputRef} onSubmit={submitRegister} className="flex max-w-md flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="username" value="Your username" />
            </div>
            <TextInput autoComplete="off" name="username" id="username" type="username" required shadow />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Your email" />
            </div>
            <TextInput autoComplete="off" name="email" id="email" type="email" required shadow />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Password" />
            </div>
            <TextInput autoComplete="off" name="password" id="password" type="password" required shadow />
          </div>
          <Button className="text-white bg-gray-800 hover:bg-slate-600" type="submit">Register new account</Button>
        </form>
      </div>
    </div>
  );
}