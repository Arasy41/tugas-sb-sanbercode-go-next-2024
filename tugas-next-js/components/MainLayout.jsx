"use client"

import useAuthStore from "@/stores/auth";
import { Navbar } from "flowbite-react";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

const MainLayout = ({children})=>{

  const {user, logout} = useAuthStore()

  return(
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-white py-4 px-6 md:px-12 lg:px-24 fixed z-50 w-full top-0">
          <div className="container mx-auto flex flex-row md:flex-row justify-between items-center">
            <div className="text-2xl font-bold mb-4 md:mb-0">LOGO</div>
            <div className="space-y-4 space-x-6 md:space-y-0 md:space-x-6 flex-row md:flex-row">
              <Link href="/" className="text-gray-800 hover:text-gray-600">Home</Link>
              <Link href="/product" className="text-gray-800 hover:text-gray-600">Product</Link>
              <Link href="/mahasiswa" className="text-gray-800 hover:text-gray-600">Mahasiswa</Link>
              <Link href="/dosen" className="text-gray-800 hover:text-gray-600">Dosen</Link>
              <Link href="/matakuliah" className="text-gray-800 hover:text-gray-600">Mata Kuliah</Link>
              <Link href="/jadwalkuliah" className="text-gray-800 hover:text-gray-600">Jadwal Kuliah</Link>
              {user &&
                <Link className="text-gray-800 hover:text-gray-600" href="/nilai">
                  Nilai
                </Link>
              }
              {user ? (<>
                <Link className="text-gray-800 hover:text-gray-600 cursor-pointer">
                  {user.username}
                </Link>
                <Link className="text-gray-800 hover:text-gray-600 cursor-pointer" onClick={()=>{logout()}}>
                  Logout
                </Link>
              </>) : (
                <>              
                  <Link href="/auth/login" className="text-gray-800 hover:text-gray-600 cursor-pointer">
                    Login
                  </Link>
                  <Link href="/auth/register " className="text-gray-800 hover:text-gray-600 cursor-pointer">
                    Register
                  </Link>
                </>
              )}
              {/* <button 
                onClick={toggleTheme} 
                className={`transition-transform duration-500 ${theme === 'light' ? 'rotate-0' : 'rotate-180'} text-black dark:text-white hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-black p-2 rounded-full`}
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <FaMoon /> : <FaSun />}
              </button> */}
            </div>
          </div>
        </nav>

        {children}
      </body>
    </html>
  )
}

export default MainLayout