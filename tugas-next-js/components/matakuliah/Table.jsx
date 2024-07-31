"use client"

import { baseUrl } from "@/utils/constants";
import axios from "axios";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import Link from "next/link";
import { useState, useEffect } from "react";

const MataKuliahTable = ({ matakuliahs }) => {
  const [data, setData] = useState(matakuliahs);
  const [fetchStatus, setFetchStatus] = useState(false);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/matakuliahs`);
      setData(res.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (fetchStatus) {
      fetchData();
      setFetchStatus(false);
    }
  }, [fetchStatus]);

  const handleDelete = async (deletedId) => {
    const confirmDelete = confirm("Are you sure?");
    if (confirmDelete) {
      try {
        await axios.delete(`${baseUrl}/api/matakuliahs/${deletedId}`);
        setFetchStatus(true);
      } catch (error) {
        alert("Error deleting data:", error);
      }
    }
  };

  return (
    <div className=" w-9/12 mx-auto mt-[50px]">
      <h1 className="text-[20px] text-center font-bold mb-[50px]">Mata Kuliah List</h1>
      <div className="flex justify-end">
        <Link href={`/matakuliah/create`} 
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Add new Mata Kuliah
        </Link>
      </div>
      <Table className="mt-[50px] text-black" striped>
        <TableHead>
          <TableHeadCell>No</TableHeadCell>
          <TableHeadCell>Name</TableHeadCell>
          <TableHeadCell>
            <span className="sr-only">Action</span>
          </TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
          {data.length > 0 && data.map((item, index)=>{
            return(
              <TableRow key={index} className="bg-white dark:text-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {index+1}
                </TableCell>
                <TableCell>{item.nama}</TableCell>
                <TableCell>
                  <Link href={`/matakuliah/${item.id}/edit`} className="font-medium mr-[10px] text-cyan-600 hover:underline dark:text-cyan-500">
                    Edit
                  </Link>
                  <a onClick={()=>{handleDelete(item.id)}} className="cursor-pointer font-medium text-red-600 hover:underline dark:text-red-600">
                    Delete
                  </a>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default MataKuliahTable;
