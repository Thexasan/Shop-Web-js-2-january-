// import { BASIC_API } from "../config.js";
// import { getCategory} from "../../../requests/request"; 

import { fileTobase64 } from "../../../config.js";
import { postCategory } from "./api.js";


let grid = document.querySelector(".grid")

export function get(categories) {
    grid.innerHTML = "";
    categories.forEach((category) => {
        let card = document.createElement("div")
        card.classList.add("card")
        card.innerHTML = `
        <img src="${category.avatar}" alt="Phones">
        <p>${category.name}</p>
        <span class="edit">✎</span>
        <button class="delete">Delete</button>
       </div>
    `
        grid.appendChild(card)

    })
}




let categoryModal = document.querySelector("#categoryModal")

let add_new = document.querySelector(".add-new")

add_new.onclick = () => {
    categoryModal.showModal()
}

let file = null;
let modalForm = document.querySelector(".modal")
modalForm["base"].onchange = async (e) => {
    file = await fileTobase64(e.target.files[0])
    console.log(file);
}
modalForm.onsubmit = (event) => {
    event.preventDefault()
    let newCategory = {
        name: modalForm["categoryInp"].value,
        avatar: file,
    }
    postCategory(newCategory)
}
