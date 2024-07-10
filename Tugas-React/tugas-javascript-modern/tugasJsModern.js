// Jawaban Nomor 1
console.log("Jawaban Nomor 1");

const luasLingkaran = (jariJari) => {
  return Math.PI * jariJari * jariJari;
};

const kelilingLingkaran = (jariJari) => {
  return 2 * Math.PI * jariJari;
};

let jariJari = 7;

console.log(
  `Luas lingkaran dengan jari-jari ${jariJari} adalah ${luasLingkaran(
    jariJari
  )}`
);

console.log(
  `Keliling lingkaran dengan jari-jari ${jariJari} adalah ${kelilingLingkaran(
    jariJari
  )}`
);

// Jawaban Nomor 2
console.log("\nJawaban Nomor 2");

const introduce = (...param) => {
  const [firstName, age, gender, job] = param;
  const filter = gender.toLowerCase() === "laki-laki" ? "Pak" : "Bu";

  return `${filter} ${firstName} adalah seorang ${job} yang berusia ${age} tahun`;
};

//kode di bawah ini jangan dirubah atau dihapus
const perkenalanJohn = introduce("john", "30", "Laki-Laki", "penulis");
console.log(perkenalanJohn); // Menampilkan "pak john adalah seorang penulis yang berusia 30 tahun"

//kode di bawah ini jangan dirubah atau dihapus
const perkenalanSarah = introduce("sarah", "28", "Perempuan", "guru");
console.log(perkenalanSarah); // Menampilkan "bu sarah adalah seorang penulis yang berusia 30 tahun"

// Jawaban Nomor 3
console.log("\nJawaban Nomor 3");
const newFunction = (firstName, lastName) => {
  return {
    firstName,
    lastName,
    fullName() {
      console.log(`${firstName} ${lastName}`);
    },
  };
};

// kode di bawah ini jangan diubah atau dihapus sama sekali
console.log(newFunction("John", "Doe").firstName);
console.log(newFunction("Richard", "Roe").lastName);
newFunction("William", "Imoh").fullName();

// Jawaban Nomor 4
console.log("\nJawaban Nomor 4");
let phone = {
  name: "Galaxy Note 20",
  brand: "Samsung",
  year: 2020,
  colors: ["Mystic Bronze", "Mystic White", "Mystic Black"],
};
// kode diatas ini jangan di rubah atau di hapus sama sekali

// Jawaban :
const { name, brand, year, colors } = phone;

// kode di bawah ini jangan dirubah atau dihapus
console.log(phone);

// Jawaban Nomor 5
console.log("\nJawaban Nomor 5");
let warna = ["biru", "merah", "kuning", "hijau"];

let dataBukuTambahan = {
  penulis: "john doe",
  tahunTerbit: 2020,
};

let buku = {
  nama: "pemograman dasar",
  jumlahHalaman: 172,
  warnaSampul: ["hitam"],
};
// kode diatas ini jangan di rubah atau di hapus sama sekali

buku = {
  ...buku,
  ...dataBukuTambahan,
  warnaSampul: [...buku.warnaSampul, ...warna],
};

console.log(buku);

// Jawaban Nomor 6
console.log("\nJawaban Nomor 6");

const addProducts = (samsung, newProducts) => {
  const updatedProducts = [...samsung.products, ...newProducts];

  const formatedProducts = updatedProducts.map((product) => {
    return {
      ...product,
      colors: product.colors.join(", "),
    };
  });

  return {
    ...samsung,
    products: formatedProducts,
  };
};

let samsung = {
  name: "Samsung",
  products: [
    { name: "Samsung Galaxy Note 10", colors: ["black", "gold", "silver"] },
    { name: "Samsung Galaxy Note 10s", colors: ["blue", "silver"] },
    { name: "Samsung Galaxy Note 20s", colors: ["white", "black"] },
  ],
};

let newProducts = [
  { name: "Samsung Galaxy A52", colors: ["white", "black"] },
  { name: "Samsung Galaxy M52", colors: ["blue", "grey", "white"] },
];

samsung = addProducts(samsung, newProducts);

console.log(samsung);

// Jawaban Nomor 7
console.log("\nJawaban Nomor 7");
const dataFunction = (nama, domisili, umur) => {
  const data = {
    nama,
    domisili,
    umur,
  };

  const Bondra = {
    nama: data.nama,
    domisili: data.domisili,
    umur: data.umur,
  };

  return `{ "nama" : "${Bondra.nama}", "domisili": "${Bondra.domisili}", "umur": ${Bondra.umur} }`;
};

let data = ["Bondra", "Medan", 25];

console.log(dataFunction(...data));
// Output
// { "nama" : "Bondra", "domisili": "Medan", "umur": 25 }

// Jawaban Nomor 8
console.log("\nJawaban Nomor 8");

const graduate = (data) => {
  const result = {};

  for (let i = 0; i < data.length; i++) {
    const { class: className, name } = data[i];

    if (!result[className]) {
      result[className] = [];
    }

    result[className].push(name);
  }
  return result;
};

const data1 = [
  { name: "Ahmad", class: "adonis" },
  { name: "Regi", class: "laravel" },
  { name: "Bondra", class: "adonis" },
  { name: "Iqbal", class: "vuejs" },
  { name: "Putri", class: "laravel" },
];

const data2 = [
  { name: "Yogi", class: "react" },
  { name: "Fikri", class: "agile" },
  { name: "Arief", class: "agile" },
];

console.log(graduate(data1));
console.log(graduate(data2));
// Output
//   {
//     "adonis": [ "Ahmad", "Bondra" ],
//     "laravel": [" Regi", "Putri"],
//     "vuejs": ["Iqbal"]
//   }
//   {
//     "react": ["Yogi"],
//     "agile": ["Fikri", "Arief"]
//   }
