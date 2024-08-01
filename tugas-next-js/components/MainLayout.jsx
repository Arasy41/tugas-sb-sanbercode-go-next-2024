"use client"

import useAuthStore from "@/stores/auth";
import useThemeStore from "@/stores/theme";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

const MainLayout = ({children})=>{

  const {user, logout} = useAuthStore();
  const {theme, toggleTheme} = useThemeStore();

  return(
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-white py-4 px-6 md:px-12 lg:px-24 fixed z-50 w-full top-0 text-gray-800 hover:text-gray-600 dark:bg-gray-900 dark:text-white">
          <div className="container mx-auto flex flex-row md:flex-row justify-between items-center">
            <div className="text-2xl font-bold mb-4 md:mb-0">LOGO</div>
            <div className="space-y-4 space-x-6 md:space-y-0 md:space-x-6 flex-row md:flex-row">
              <Link href="/" className="">Home</Link>
              <Link href="/product" className="">Product</Link>
              <Link href="/mahasiswa" className="">Mahasiswa</Link>
              <Link href="/dosen" className="">Dosen</Link>
              <Link href="/matakuliah" className="">Mata Kuliah</Link>
              <Link href="/jadwalkuliah" className="">Jadwal Kuliah</Link>
              {user &&
                <Link className="cursor-pointer" href="/nilai">
                  Nilai
                </Link>
              }
              {user ? (<>
                <Link className="cursor-pointer" href="#"> 
                  {user.username}
                </Link>
                <Link className="cursor-pointer" href="/" onClick={()=>{logout()}}>
                  Logout
                </Link>
              </>) : (
                <>              
                  <Link href="/auth/login" className=" cursor-pointer">
                    Login
                  </Link>
                  <Link href="/auth/register " className=" cursor-pointer">
                    Register
                  </Link>
                </>
              )}
              <button 
                onClick={toggleTheme} 
                className={`transition-transform duration-500 text-black dark:text-white hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-black p-2 rounded-full`}
                aria-label="Toggle theme"
              >
                {theme === 'light' ? 'dark' : 'light'}
              </button>
            </div>
          </div>
        </nav>

        {children}
      </body>
    </html>
  )
}

export default MainLayout