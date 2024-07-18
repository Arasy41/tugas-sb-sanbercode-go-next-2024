import React, { useState } from 'react';
import './TugasCRUDHooks.css';

const daftarBuah = [
  { nama: "Nanas", hargaTotal: 100000, beratTotal: 4000 },
  { nama: "Manggis", hargaTotal: 350000, beratTotal: 10000 },
  { nama: "Nangka", hargaTotal: 90000, beratTotal: 2000 },
  { nama: "Durian", hargaTotal: 400000, beratTotal: 5000 },
  { nama: "Strawberry", hargaTotal: 120000, beratTotal: 6000 }
];

const TugasCRUDHooks = () => {
  const [buah, setBuah] = useState(daftarBuah);
  const [formData, setFormData] = useState({
    nama: "",
    hargaTotal: "",
    beratTotal: ""
  });

  const [editIndex, setEditIndex] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nama || !formData.hargaTotal || !formData.beratTotal) {
      alert("Semua inputan wajib diisi");
      return;
    }
    if (isNaN(formData.hargaTotal) || isNaN(formData.beratTotal)) {
      alert("Harga total dan total berat harus berupa angka");
      return;
    }
    if (formData.beratTotal < 2000) {
      alert("Inputan total berat minimal 2 kg");
      return;
    }

    const updatedBuah = editIndex === null ? [...buah, formData] : buah.map((item, index) => index === editIndex ? formData : item);
    setBuah(updatedBuah);
    setFormData({ nama: "", hargaTotal: "", beratTotal: "" });
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    setFormData(buah[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setBuah(buah.filter((_, i) => i !== index));
  };

  return (
    <div className="container-crud">
      <h1>Daftar Harga Buah</h1>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Harga Total</th>
            <th>Berat Total</th>
            <th>Harga per Kg</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {buah.map((buah, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{buah.nama}</td>
              <td>{buah.hargaTotal}</td>
              <td>{buah.beratTotal / 1000} kg</td>
              <td>{buah.hargaTotal / (buah.beratTotal / 1000)}</td>
              <td>
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button className="btn-delete" onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="container-form">
        <h2>Form Daftar Harga Buah</h2>
        <form onSubmit={handleSubmit} className="form-crud">
          <div className="form-group">
            <label>Nama:</label>
            <input type="text" name="nama" value={formData.nama} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Harga Total:</label>
            <input type="text" name="hargaTotal" value={formData.hargaTotal} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Berat Total (dalam gram):</label>
            <input type="text" name="beratTotal" value={formData.beratTotal} onChange={handleInputChange} />
          </div>
          <button type="submit" className="btn-submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default TugasCRUDHooks;
