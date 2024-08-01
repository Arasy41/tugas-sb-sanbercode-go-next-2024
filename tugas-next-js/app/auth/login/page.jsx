"use client";

import useAuthStore from "@/stores/auth";
import { baseUrl } from "@/utils/constants";
import axios from "axios";
import { Button, Label, TextInput } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function Login() {
  const inputRef = useRef(null);
  const router = useRouter();
  const { login } = useAuthStore();

  const submitLogin = async (event) => {
    event.preventDefault();
    const { username: { value: inputUsername }, password: { value: password } } = inputRef.current;
    
    try {
      let res = await axios.post(`${baseUrl}/api/login`, { username: inputUsername, password });
      let { token } = res.data;
      login({ token });
      alert("Login success");
      router.push("/");
    } catch (err) {
      alert("Invalid username or password");
    }
    
    inputRef.current.reset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-r flex items-center justify-center dark:bg-gray-950">
      <div className="w-full max-w-sm p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">Login</h1>
        <form ref={inputRef} onSubmit={submitLogin} className="flex flex-col gap-4">
          <div>
            <Label htmlFor="username" value="Your username" className="block mb-2 text-gray-700 font-medium" />
            <TextInput 
              name="username" 
              id="username" 
              type="text" 
              autoComplete="off" 
              required 
              className="w-full px-3 py-2 rounded-md shadow-sm dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <Label htmlFor="password" value="Your password" className="block mb-2 text-gray-700 font-medium" />
            <TextInput 
              name="password" 
              id="password" 
              type="password" 
              autoComplete="off" 
              required 
              className="w-full px-3 py-2 rounded-md shadow-sm dark:bg-gray-700 dark:text-white"
            />
          </div>
          <Button 
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
    </div>    
  );
}
