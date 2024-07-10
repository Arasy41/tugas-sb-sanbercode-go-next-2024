const filterCarsPromise = require("./promise3.js");

filterCarsPromise("black", 2019)
  .then((cars) => {
    let toyota = cars.filter((c) => c.brand === "toyota");
    console.log(toyota);
  })
  .catch((error) => {
    console.log(error);
  });

filterCarsPromise("silver", 2017)
  .then((cars) => {
    console.log(cars);
  })
  .catch((err) => {
    console.log("Maaf data tidak ditemukan");
  });

const asyncGreyCars2019 = async () => {
  try {
    const cars = await filterCarsPromise("grey", 2019);
    console.log(cars);
  } catch (err) {
    console.log("Maaf data tidak ditemukan");
  }
};
asyncGreyCars2019();

const asyncGreyCars2018 = async () => {
  try {
    const cars = await filterCarsPromise("grey", 2018);
    console.log(cars);
  } catch (err) {
    console.log("Maaf data tidak ditemukan");
  }
};
asyncGreyCars2018();

const asyncBlackCars2020 = async () => {
  try {
    const cars = await filterCarsPromise("black", 2020);
    console.log(cars);
  } catch (err) {
    console.log("Maaf data tidak ditemukan");
  }
};
asyncBlackCars2020();
