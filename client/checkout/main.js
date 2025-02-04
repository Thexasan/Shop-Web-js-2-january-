import { postData } from "../../requests/request.js";
let products = JSON.parse(localStorage.getItem("cartSend"));
console.log(products);
let jsBox = document.querySelector(".jsBox");
let sum = 0;
let price = document.querySelector(".price");
let butOrder = document.querySelector(".place-order-btn");
let DivForm = document.querySelector(".container");

function getProducts(products) {
  jsBox.innerHTML = "";
  products.forEach((product) => {
    let div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
        <div class="with">
        <img src="${product.images[0].src}">
        <span>${product.productName}</span>
        </div>
        <span>$${product.price.cost}</span>
        `;
    jsBox.append(div);  
  });
}
getProducts(products);
sum = products.reduce((acc, el) => acc + el.price.cost, 0);
price.innerHTML = "$" + sum;

DivForm.onsubmit = (e) => {
  e.preventDefault();
  let newOrder = {
    fullName: DivForm["firstName"].value + "" + DivForm["lastName"].value,
    orderDate: new Date(),
    totalPrice: sum,
    orderProducts: products,
  };
  console.log(newOrder);
  
  postProducts(newOrder);
  DivForm.reset();
};

async function postProducts(newOrder) {
  try {
    await postData("/orders", newOrder);
  } catch (error) {
    console.error(error);
  }
}

// {
//     "orderId": 2,
//     "fullName": "John Smith",
//     "orderDate": "2025-01-01T00:00:00",
//     "totalPrice": 180,
//     "orderProducts": [
//       {
//         "id": 1,
//         "productName": "Sofa Set",
//         "description": "Lorem ipsum dolor sit amet, consect",
//         "category": "Man’s Fashion",
//         "brand": "Puma",
//         "price": {
//           "cost": 200.99,
//           "discount": 20,
//           "count": 10
//         },
//         "options": {},
//         "color": [
//           {
//             "name": "black",
//             "rgb": "#00000"
//           }
//         ],
//         "images": [
//           {
//             "id": 1,
//             "src": "base64"
//           },
//           {
//             "id": 2,
//             "src": "base64"
//           },
//           {
//             "id": 3,
//             "src": "base64"
//           }
//         ]
//       }
//     ],
//     "id": "8f28"
//   }
