import { fileTobase64 } from "../../../config.js";
import { deleteCategory, getCategory, postCategory, putCategory } from "./api.js";

let categoryInputEdit = document.querySelector(".input-fieldEdit");
let imageEdit = document.querySelector(".imageEdit");
let idx = null;
let grid = document.querySelector(".grid");
let modalFormEdit = document.querySelector(".modaleEdit");
let modalEdit = document.querySelector("#categoryModalE");
let myFiles = ""



export function get(categories) {
    grid.innerHTML = "";
    categories.forEach((category) => {
        let card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
        <img src="${category.avatar}" alt="Phones">
        <p>${category.name}</p>
        <span class="edit">✎</span>
        <button class="delete">Delete</button>
       `;
        card.querySelector(".delete").onclick = () => deleteCategory(category.id);
        card.querySelector(".edit").onclick = () => {
            handlOpenModalEdit(category);
        };
        grid.appendChild(card);
    });
}

if (modalFormEdit) {
    modalFormEdit.onsubmit = async (event) => {
        event.preventDefault();
        let fileInput = document.querySelector("#file-uploadEdit");
        console.log(fileInput)
        let file = fileInput && fileInput.files.length > 0 ? await fileTobase64(fileInput.files[0]) : null;
        console.log(file)
        if (file) {
            imageEdit.src = file;
        }
        console.log(file);
        
        let editCategory = {
            name: categoryInputEdit ? categoryInputEdit.value : "",
            avatar: myFiles,
        };
        await putCategory(idx, editCategory);
        modalFormEdit.reset();
        modalEdit.close();
    };
    
    let fileInputEdit = document.querySelector("#file-uploadEdit");
    if (fileInputEdit) {
        fileInputEdit.onchange = async (e) => {
            let file = await fileTobase64(e.target.files[0]);
            imageEdit.src = file;
        };
    }
}


// ! edit
const handlOpenModalEdit = (category) => {
    modalEdit.showModal();
    if (modalFormEdit) {
        modalFormEdit["categoryInpE"].value = category.name;
        idx = category.id;

    }
};

// ! addd
let categoryModal = document.querySelector("#categoryModal");
let add_new = document.querySelector(".add-new");

add_new.onclick = () => {
    categoryModal.showModal();
};

let file = null;
let modalForm = document.querySelector(".modal");

if (modalForm) {
    modalForm["base"].onchange = async (e) => {
        file = await fileTobase64(e.target.files[0]);
        myFiles=file
    };
    
    modalForm.onsubmit = async (event) => {
        event.preventDefault();
        let newCategory = {
            name: modalForm["categoryInp"].value,
            avatar: file,
        };
        await postCategory(newCategory);
        modalForm.reset();
    };
}

// ! search

let searchForm = document.querySelector(".searchForm");
searchForm.onsubmit = (e) => {
    e.preventDefault();
    let value = e.target["search"].value
   
  getCategory(value);
};



// 


