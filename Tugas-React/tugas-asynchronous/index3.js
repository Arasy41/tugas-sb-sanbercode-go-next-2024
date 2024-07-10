var filterBooksPromise = require("./promise2.js");

filterBooksPromise(true, 50)
  .then((books) => {
    console.log(books);
  })
  .catch((error) => {
    console.log(error);
  });

const asyncBooks = async () => {
  try {
    const books = await filterBooksPromise(false, 250);
    console.log(books);
  } catch (error) {
    console.log(error);
  }
};
asyncBooks();

const asyncCheckBooks = async () => {
  try {
    const books = await filterBooksPromise(true, 30);
    console.log(books);
  } catch (err) {
    console.log("Maaf Buku dibawah 40 halaman tidak tersedia");
  }
};
asyncCheckBooks();
