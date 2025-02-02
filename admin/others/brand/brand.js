import { deleteBrand, putBrand } from "./api1.js"

import { postBrand } from "./api1.js"


let tbody = document.querySelector(".tbody")

export function get(brands) {
    tbody.innerHTML = ""
    brands.forEach((brand) => {
        let tr = document.createElement("tr")
        tr.innerHTML = `
       <td>${brand.brandName}</td>
      <td>
      <span class="edit">✏️</span>
       <span class="delete">🗑️</span>
      </td>
     `
         tr.querySelector(".delete").onclick = () => deleteBrand(brand.id)
         tr.querySelector(".edit").onclick = () => editBrend(brand)

        tbody.appendChild(tr)
    })
}


// ! EDITBRAND
// let idx =null;

// const editBrend = (brand) =>{

// }


// ! ADDBRAND

let brandInput = document.querySelector(".brand");
let createBtn = document.querySelector(".create");

createBtn.onclick = async () => {
    let brandName = brandInput.value.trim();
    if (!brandName) {
        alert("Brand name cannot be empty!");
        return;
    }

    let newBrand = { brandName};
    try {
        await postBrand(newBrand);
        brandInput.value = ""; 
        alert("Brand added successfully!");
    } catch (error) {
        console.error("Failed to add brand:", error);
    }
};




