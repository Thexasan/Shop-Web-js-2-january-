import { BASIC_API } from "../config.js";
import { deleteData, getData, postData,putData } from "../requests/request.js"; 





// ! JS
// function showSection(sectionId) {
//     document.querySelectorAll('.content').forEach(section => {
//         section.classList.remove('active');
//     });

//     document.querySelectorAll('.tabs button').forEach(button => {
//         button.classList.remove('active');
//     });

//     document.getElementById(sectionId).classList.add('active');
//     document.getElementById(sectionId + "Btn").classList.add('active');
// }

// document.addEventListener("DOMContentLoaded", () => {
//     showSection('categories');
// });



// ! HTML
// <div class="tabs">
// <button id="categoriesBtn" class="active" onclick="showSection('categories')">Categories</button>
// <button id="brandsBtn" onclick="showSection('brands')">Brands</button>
// </div>

// <div id="categories" class="content active">
// <h2>Categories</h2>
// <p>List of categories displayed here...</p>
// </div>

// <div id="brands" class="content">
// <h2>Brands</h2>
// <p>List of brands displayed here...</p>
// </div>