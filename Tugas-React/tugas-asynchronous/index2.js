const readBooksPromise = require("./promise.js");

var books = [
  { name: "LOTR", timeSpent: 3000 },
  { name: "Fidas", timeSpent: 2000 },
  { name: "Kalkulus", timeSpent: 4000 },
];

function readAllBooks(time, bookIndex) {
  if (bookIndex < books.length) {
    const book = books[bookIndex];
    readBooksPromise(time, book)
      .then((remainingTime) => {
        if (remainingTime > 0 && bookIndex + 1 < books.length) {
          readAllBooks(remainingTime, bookIndex + 1);
        } else if (remainingTime <= 0) {
          console.log("");
        } else {
          console.log("");
        }
      })
      .catch((sisaWaktu) => {
        console.log("sisa waktu saya " + sisaWaktu);
      });
  } else {
    console.log("Semua buku telah dibaca");
  }
}

readAllBooks(10000, 0);
