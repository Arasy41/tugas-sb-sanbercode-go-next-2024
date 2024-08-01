"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { baseUrl } from "@/utils/constants";
import useAuthStore from "@/stores/auth";

const NilaiForm = ({ id }) => {
  const router = useRouter();
  const { user } = useAuthStore();
  const initialForm = { skor: "", mahasiswa_id: "", matakuliah_id: "", id: null };
  const [input, setInput] = useState(initialForm);
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    if (id) {
      axios.get(`${baseUrl}/api/nilai/${id}`)
        .then((res) => {          
          const { id, skor, mahasiswa_id, matakuliah_id } = res.data.data;
          setInput({ id, skor, mahasiswa_id, matakuliah_id });
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

  const handleInput = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmit(true);
    const { skor, mahasiswa_id, matakuliah_id, id } = input;

    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      if (id) {
        await axios.put(`${baseUrl}/api/nilai/${id}`, { skor: Number(skor), mahasiswa_id: Number(mahasiswa_id), matakuliah_id: Number(matakuliah_id) }, config);
      } else {
        await axios.post(`${baseUrl}/api/nilai`, { skor: Number(skor), mahasiswa_id: Number(mahasiswa_id), matakuliah_id: Number(matakuliah_id) }, config);
      }
      setInput(initialForm);
      setIsSubmit(false);
      router.push("/nilai");
    } catch (err) {
      console.log(err);
      setIsSubmit(false);
    }
  };

  const backToTable = () => {
    router.push("/nilai");
  };

  return (
    <div className="w-9/12 mx-auto mt-[50px]">
      <h2 className="text-[20px] text-center font-bold mb-[50px]">
        {input.id ? `Edit Nilai ${input.id}` : "Add New Nilai"}
      </h2>
      <div className="custom-form mt-[50px]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label htmlFor="skor">Skor</label>
          <input
            type="number"
            min={0}
            max={100}
            autoComplete="off"
            disabled={isSubmit}
            id="skor"
            onChange={handleInput}
            value={input.skor}
            name="skor"
            placeholder="Nilai skor.."
            required
          />
          <label htmlFor="mahasiswa_id">Mahasiswa ID</label>
          <input
            type="number"
            autoComplete="off"
            disabled={isSubmit}
            id="mahasiswa_id"
            onChange={handleInput}
            value={input.mahasiswa_id}
            name="mahasiswa_id"
            placeholder="Mahasiswa ID.."
            required
          />
          <label htmlFor="matakuliah_id">Mata Kuliah ID</label>
          <input
            type="number"
            autoComplete="off"
            disabled={isSubmit}
            id="matakuliah_id"
            onChange={handleInput}
            value={input.matakuliah_id}
            name="matakuliah_id"
            placeholder="Mata Kuliah ID.."
            required
          />
          <button
            type="submit"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            {isSubmit ? "Please Wait...." : "Submit"}
          </button>
        </form>
        <button
          onClick={backToTable}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Back to Table
        </button>
      </div>
    </div>
  );
};

export default NilaiForm;
