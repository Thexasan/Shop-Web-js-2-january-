import { deleteBrand, putBrand, postBrand } from "./api1.js";

let tbody = document.querySelector(".tbody");
let brandInput = document.querySelector(".brand");
let createBtn = document.querySelector(".create");

let editId = null;

export function get(brands) {
    tbody.innerHTML = "";
    brands.forEach((brand) => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${brand.brandName}</td>
            <td>
                <span class="edit" data-id="${brand.id}">✎</span>
                <span class="delete" data-id="${brand.id}">✖</span>
            </td>
        `;

        //! Edit 
        tr.querySelector(".edit").onclick = () => {
            editId = brand.id; 
            brandInput.value = brand.brandName;
            createBtn.textContent = "Save"; 
        };

        //! Delete 
        tr.querySelector(".delete").onclick = async () => {
            await deleteBrand(brand.id);
        };

        tbody.appendChild(tr);
    });
}
createBtn.onclick = async () => {
    let brandName = brandInput.value.trim();
    if (!brandName) {
        alert("Brand name cannot be empty!");
        return;
    }

    let newBrand = { brandName };

    if (editId) {
        await putBrand(editId, newBrand);
        editId = null;
        createBtn.textContent = "Create";
    } else {
        
        await postBrand(newBrand);
    }

    brandInput.value = ""
};
