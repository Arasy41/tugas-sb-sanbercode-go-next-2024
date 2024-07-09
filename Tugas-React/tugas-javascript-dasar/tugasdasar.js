// Jawaban Nomor 1
console.log("Jawaban Nomor 1");
function introduce(name, gender, job, age) {
  if (gender === "laki-laki") {
    return (
      "Pak " +
      name +
      " adalah seorang " +
      job +
      " yang berusia " +
      age +
      " tahun"
    );
  } else {
    return (
      "Bu " +
      name +
      " adalah seorang " +
      job +
      " yang berusia " +
      age +
      " tahun"
    );
  }
}

var john = introduce("John", "laki-laki", "penulis", "30");
console.log(john); // Menampilkan "Pak John adalah seorang penulis yang berusia 30 tahun"

var sarah = introduce("Sarah", "perempuan", "model", "28");
console.log(sarah); // Menampilkan "Bu Sarah adalah seorang model yang berusia 28 tahun"

// Jawaban Nomor 2
console.log("\nJawaban Nomor 2");
function uniqueChar(text) {
  let charCount = {};

  for (let char of text) {
    if (char !== " ") {
      charCount[char] = (charCount[char] || 0) + 1;
    }
  }

  let uniqueChar = "";
  for (let char in charCount) {
    if (charCount[char] === 1) {
      uniqueChar += char;
    }
  }

  return uniqueChar;
}
var text = "Super Bootcamp Fullstack Dev 2022";
console.log("text awal :", text);
console.log("text unique :", uniqueChar(text));

// Jawaban Nomor 3
console.log("\nJawaban Nomor 3");
function FindMinMax(number) {
  let min = Math.min(...number);
  let max = Math.max(...number);

  return "angka terbesar adalah " + max + " dan angka terkecil adalah " + min;
}

var angka = [2, 3, 1, 9, 12, 8, 9, 7];
console.log("angka :", FindMinMax(angka));

// Jawaban Nomor 4
console.log("\nJawaban Nomor 4");
function longNames(names) {
  let longest = "";

  for (let name of names) {
    if (name.length > longest.length) {
      longest = name;
    }
  }
  return longest;
}

var names = [
  "Andrew Gillett",
  "Chris Sawyer",
  "David Walsh",
  "John D Rockefeller",
];
console.log("Nama terpanjang :", longNames(names));

// Jawaban Nomor 5
console.log("\nJawaban Nomor 5");
function arrangeString(str) {
  str.split("").sort().join("");
  if (str.length === 0) {
    return `"${str}"`;
  } else {
    return str;
  }
}

// TEST CASE
console.log(arrangeString("bahasa")); // Output : aaabhs
console.log(arrangeString("similikiti")); // Output : iiiiiklmst
console.log(arrangeString("sanbercode")); // Output : abcdeenors
console.log(arrangeString("")); // Output : ""

// Jawaban Nomor 6
console.log("\nJawaban Nomor 6");
function compressString(str) {
  let charCount = {};
  let sortedChars = str.split("").sort();
  let result = "";

  // Menghitung jumlah kemunculan setiap karakter
  for (let char of sortedChars) {
    charCount[char] = (charCount[char] || 0) + 1;
  }

  // Menyusun hasil kompresi berdasarkan jumlah kemunculan
  for (let char in charCount) {
    result += char + charCount[char];
  }

  // Jika string kompresi tidak lebih pendek, kembalikan string asli yang sudah disusun alfabetis
  if (result.length >= str.length) {
    return sortedChars.join("");
  }

  return result;
}

// TEST CASES
console.log(compressString("abrakadabra")); // a5b2d1k1r2
console.log(compressString("aabcccccaaa")); // a5b1c5
console.log(compressString("abdul")); // abdlu
console.log(compressString("maman")); // aamn

// Jawaban Nomor 7
console.log("\nJawaban Nomor 7");
function palindrome(kata) {
  kata = kata.toLowerCase().replace(/\s/g, "");

  const balikKata = kata.split("").reverse().join("");

  if (balikKata === kata) {
    return true;
  } else {
    return false;
  }
}

// TEST CASES
console.log(palindrome("katak")); // true
console.log(palindrome("blanket")); // false
console.log(palindrome("nababan")); // true
console.log(palindrome("haji ijah")); // true
console.log(palindrome("mister")); // false

// Jawaban Nomor 8
console.log("\nJawaban Nomor 8");
function angkaPalindrome(num) {
  num++;

  while (true) {
    let str = num.toString();
    if (str === str.split("").reverse().join("")) {
      return num;
    }

    num++;
  }
}

// TEST CASES
console.log(angkaPalindrome(8)); // 9
console.log(angkaPalindrome(10)); // 11
console.log(angkaPalindrome(117)); // 121
console.log(angkaPalindrome(175)); // 181
console.log(angkaPalindrome(1000)); // 1001

// Jawaban Nomor 9
console.log("\nJawaban Nomor 9");
function pasanganTerbesar(num) {
  let str = num.toString();
  let max = 0;

  for (let i = 0; i < str.length; i++) {
    const pair = parseInt(str.substring(i, i + 2));

    if (pair > max) {
      max = pair;
    }
  }

  return max;
}

// TEST CASES
console.log(pasanganTerbesar(641573)); // 73
console.log(pasanganTerbesar(12783456)); // 83
console.log(pasanganTerbesar(910233)); // 91
console.log(pasanganTerbesar(71856421)); // 85
console.log(pasanganTerbesar(79918293)); // 99

// Jawaban Nomor 10
console.log("\nJawaban Nomor 10");
function cekPermutasi(str1, str2) {
  if (str1.length !== str2.length) {
    return false;
  }

  str1 = str1.split("").sort().join("");
  str2 = str2.split("").sort().join("");

  if (str1 === str2) {
    return true;
  } else {
    return false;
  }
}

// TEST CASES
console.log(cekPermutasi("abah", "baha")); // true
console.log(cekPermutasi("ondel", "delon")); // true
console.log(cekPermutasi("paul sernine", "arsene lupin")); // true
console.log(cekPermutasi("taco", "taca")); // false

// Jawaban Nomor 11
console.log("\nJawaban Nomor 11");
function urlify(str, length) {
  let newStr = "";

  for (let i = 0; i < length; i++) {
    if (str[i] === " ") {
      newStr += "%20";
    } else {
      newStr += str[i];
    }
  }

  return newStr;
}

// TEST CASES
console.log(urlify("Mr John Smith    ", 13)); // Mr%20John%20Smith
console.log(urlify("Bizzare world of Javascript     ", 27)); // Bizzare%20world%20of%20Javascript

// Jawaban Nomor 12
console.log("\nJawaban Nomor 12");
var arrayDaftarPeserta = ["John Doe", "laki-laki", "baca buku", 1992];
var objDaftarPeserta = {
  nama: arrayDaftarPeserta[0],
  gender: arrayDaftarPeserta[1],
  hobi: arrayDaftarPeserta[2],
  tahunlahir: arrayDaftarPeserta[3],
};
console.log(objDaftarPeserta);

// Jawaban Nomor 13
console.log("\nJawaban Nomor 13");
var sentence = "Super Bootcamp Golang Nextjs 2024";
let res = "";

for (let i = 0; i < sentence.length; i++) {
  var char = sentence[i];

  if ("aiueoAIUEO1234567890".includes(char)) {
    res += char;
  }
}
console.log(res);

// Jawaban Nomor 14
console.log("\nJawaban Nomor 14");
var buah = [
  { nama: "Nanas", warna: "Kuning", "ada bijinya": "ada", harga: 9000 },
  { nama: "Jeruk", warna: "Oranye", "ada bijinya": "ada", harga: 8000 },
  { nama: "Semangka", warna: "Hijau", "ada bijinya": "ada", harga: 10000 },
  { nama: "Pisang", warna: "Kuning", "ada bijinya": "tidak", harga: 5000 },
];

console.log(buah.filter((x) => x["ada bijinya"] === "tidak"));

// Jawaban Nomor 15
console.log("\nJawaban Nomor 15");
var people = [
  { name: "John", job: "Programmer", gender: "male", age: 30 },
  { name: "Sarah", job: "Model", gender: "female", age: 27 },
  { name: "Jack", job: "Engineer", gender: "male", age: 25 },
  { name: "Ellie", job: "Designer", gender: "female", age: 35 },
  { name: "Danny", job: "Footballer", gender: "male", age: 30 },
];

console.log(people.filter((x) => x.age > 29 && x.gender === "male"));

// Jawaban Nomor 16
console.log("\nJawaban Nomor 16");
var people = [
  { name: "John", job: "Programmer", gender: "male", age: 30 },
  { name: "Sarah", job: "Model", gender: "female", age: 27 },
  { name: "Jack", job: "Engineer", gender: "male", age: 25 },
  { name: "Ellie", job: "Designer", gender: "female", age: 35 },
  { name: "Danny", job: "Footballer", gender: "male", age: 30 },
];

function averageAge(arr) {
  var totalAge = 0;
  for (var i = 0; i < arr.length; i++) {
    totalAge += arr[i].age;
  }
  return totalAge / arr.length;
}

console.log(averageAge(people));

// Jawaban Nomor 17
console.log("\nJawaban Nomor 17");
var people = [
  { name: "John", job: "Programmer", gender: "male", age: 30 },
  { name: "Sarah", job: "Model", gender: "female", age: 27 },
  { name: "Jack", job: "Engineer", gender: "male", age: 25 },
  { name: "Ellie", job: "Designer", gender: "female", age: 35 },
  { name: "Danny", job: "Footballer", gender: "male", age: 30 },
];
// Mengurutkan berdasarkan nama dan usia
people.sort((a, b) => (a.name > b.name ? 1 : -1) && (a.age > b.age ? 1 : -1));

// Menampilkan nama beserta nomor urut
for (let i = 0; i < people.length; i++) {
  console.log(`${i + 1}. ${people[i].name}`);
}

// Jawaban Nomor 18
console.log("\nJawaban Nomor 18");
var phone = {
  name: "Samsung Galaxy Note 20",
  brand: "Samsung",
  colors: ["Black"],
  release: 2020,
};

function addColors(value) {
  phone.colors.push(value);
  return phone;
}

addColors("Gold");
addColors("Silver");
addColors("Brown");

console.log(phone);

// Jawaban Nomor 19
console.log("\nJawaban Nomor 19");
var phones = [
  {
    name: "Samsung Galaxy A52",
    brand: "Samsung",
    year: 2021,
    colors: ["black", "white"],
  },
  {
    name: "Redmi Note 10 Pro",
    brand: "Xiaomi",
    year: 2021,
    colors: ["white", "blue"],
  },
  {
    name: "Redmi Note 9 Pro",
    brand: "Xiaomi",
    year: 2020,
    colors: ["white", "blue", "black"],
  },
  { name: "Iphone 12", brand: "Apple", year: 2020, colors: ["silver", "gold"] },
  {
    name: "Iphone 11",
    brand: "Apple",
    year: 2019,
    colors: ["gold", "black", "silver"],
  },
];
const filteredPhones = phones.filter((phone) => phone.colors.includes("black"));

filteredPhones.sort((a, b) => a.year - b.year);

function displayPhoneInfo(phones, index) {
  if (index >= phones.length) return;

  const phone = phones[index];
  console.log(
    `${index + 1}. ${phone.name}, colors available: ${phone.colors.join(", ")}`
  );

  displayPhoneInfo(phones, index + 1);
}

displayPhoneInfo(filteredPhones, 0);
