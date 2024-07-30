import Image from "next/image";
import Link from "next/link";
import shopingImage from "@/public/shoping_hero.svg";
import Layout from "./components/Layout";

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col gap-5 p-5 md:p-10 overflow-x-hidden">
        <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-rose-100 p-5 md:p-10 shadow-lg w-screen">
          <div className="flex flex-col md:flex-row-reverse mx-auto max-w-screen-xl">
            <div className="flex justify-center md:relative md:w-1/2">
              <Image
                src={shopingImage}
                height={250}
                width={250}
                priority
                alt="Shopping Hero Image"
              />
            </div>
            <div className="flex-col md:w-1/2 md:pl-8 lg:pl-16 xl:pl-24 mt-5 md:mt-0">
              <h1 className="text-3xl md:text-4xl font-bold">
                Temukan produk pilihan kamu disini!
              </h1>
              <p className="text-sm mt-2">
                Nikmati diskon hingga 100% setiap pembelian yang kamu lakukan
              </p>
              <div className="mt-10">
                <Link
                  href="/"
                  className="bg-pink-400 hover:bg-pink-500 text-white py-2 px-4 rounded-xl w-full md:w-1/4 text-center items-center"
                >
                  Find Product
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col px-1 md:px-32 max-w-screen-xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-6 md:mb-10">
            <div className="flex flex-row gap-2 items-center w-full md:w-3/5">
              <svg
                className="w-6 h-6 bg-rose-500 rounded-full px-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search Product..."
                className="border rounded-lg px-3 py-2 w-full"
              />
            </div>

            <div className="flex flex-wrap flex-row gap-2 mt-2 md:mt-0 w-full md:w-auto right-0">
              <Link
                href="/"
                className="text-blue-600 ml-2 hover:bg-blue-100"
              >
                Shirt
              </Link>
              <Link
                href="/"
                className="text-blue-600 ml-2 hover:bg-blue-100"
              >
                Elektronik
              </Link>
              <Link
                href="/"
                className="text-blue-600 ml-2 hover:bg-blue-100"
              >
                Game
              </Link>
              <Link
                href="/"
                className="text-blue-600 ml-2 hover:bg-blue-100"
              >
                Hijab
              </Link>
              <Link
                href="/"
                className="text-blue-600 ml-2 hover:bg-blue-100"
              >
                Shoes
              </Link>
              <Link
                href="/"
                className="text-blue-600 ml-2 hover:bg-blue-100"
              >
                Laptop
              </Link>
            </div>
          </div>

          <div className="relative border border-gray-100 " style={{ width: "300px" }}>
            <div className="relative object-cover w-full ">
                <img
                    src={`https://fitinline.com/data/article/20210909/Foto-Produk-Baju-001.jpg`}
                    alt="Flowbite Logo"
                />
            </div>
            {/* <img className="object-cover w-full h-56 lg:h-72" src={data.image_url} alt="Build Your Own Drone" loading="lazy" /> */}
            <div className="p-6">
                <small>
                    <span className="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-r-lg dark:bg-green-200 dark:text-green-900">Kategori Produk</span>
                </small>
                <h5 className="mt-4 ">
                    Nama Produk
                </h5>
                <ul className="mt-5 text-sm font-thin text-gray-500 ">
                    <li>Stock : stok produk</li>
                    <li className="text-lg font-bold">Harga : Rp Produk Harga</li>
                </ul>


                <div className="flex items-center justify-between mt-4 border">
                    <button className="h-full px-2 text-black bg-gray-200">-</button>
                    <input className="inline-block w-full h-full text-center focus:outline-none" placeholder="1" />
                    <button className="h-full px-2 text-black bg-gray-200">+</button>
                </div>
                <button className="block w-full p-4 mt-5 text-sm font-medium text-white bg-rose-400 border rounded-sm" type="button">
                    Add to Cart
                </button>


                <Link href={``} className="block w-full p-4 mt-2 text-sm font-medium text-center text-rose-400 bg-white border border-rose-400 rounded-sm">
                    Detail Product
                </Link>
            </div>
          </div>

          <div className="text-left py-5  mt-5">
            Created by Jhon <span className="text-red-500">&#10084;</span> Student
            Sanbercode Batch 40
          </div>
        </div>
      </div>
    </Layout>
  );
}
