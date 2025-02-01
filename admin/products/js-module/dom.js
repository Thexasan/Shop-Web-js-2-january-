let tbody = document.querySelector(".tbody");
import { fetchData } from "./api.js";
import { BASIC_API } from "../../../config.js";
import { deleteProduct } from "./api.js";
export function get(products) {
  tbody.innerHTML = "";
  products.forEach((product) => {
    let tr = document.createElement("tr");
    tr.innerHTML = `
        <td class="checkbox">
                    <input type="checkbox" name="" id="">
                </td>
              <td class="productTd">
                <div class="product">
                    <img src="${product.images[0].src}" alt="" />
                    <p class="productName">${product.productName}</p>
                </div>
              </td>
              <td class="invertory">
                in stock
              </td>
              <td class="CategoryTd">${product.category}</td>
              <td class="priceTd">$${product.price.cost}</td>
              <td class="actionsTd">
                <div class="actionsDiv">
                  <i class="bi bi-pencil-fill" id="editBut"></i>
                  <i class="bi bi-trash-fill" id="deleteBut"></i>
                </div>
              </td>
        `;
    tbody.append(tr);
    let deleteBut = tr.querySelector("#deleteBut");
    deleteBut.onclick = () => deleteProduct(product.id);
  });
}

let nextBut = document.querySelector(".nextBut");
let prevBut = document.querySelector(".prevBut");
let numbers = document.querySelector(".numbers");

let currentPage = 1;
let limit = 5;

export async function updateControl(products) {
  let totalPages = Math.ceil(products / limit)  
  prevBut.disabled = currentPage <= 1;
  nextBut.disabled = currentPage >= totalPages;
  numbers.innerHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    let pageBut = document.createElement("span");
    pageBut.innerHTML = i;
    pageBut.classList.add("number");
    if (i == currentPage) {
      pageBut.classList.remove("number");
      pageBut.classList.add("active");
    }
    numbers.append(pageBut);
  }
  prevBut.onclick = () => {
    if (currentPage > 1) {
      currentPage--;
      fetchData(`/products?_page=${currentPage}&_per_page=${limit}`);
    }
  };
  nextBut.onclick = () => {
    if (currentPage < totalPages) {
      currentPage++;
      fetchData(`/products?_page=${currentPage}&_per_page=${limit}`);
    }
  };
}
