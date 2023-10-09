require("dotenv").config();

fetch(process.env.NIKE_API)
  .then((res) => res.json())
  .then((data) => {
    const shoes = data.data.products.products;

    console.log(shoes[0]);
  });

// const obj = [
//   { name: "james" },
//   { name: "andrew" },
//   { name: "alec" },
//   { name: "faded" },
// ];

// obj.forEach((person) => {
//   console.log(person.name);
// });

// console.log(obj.data.products);
