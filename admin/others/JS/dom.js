import { BASIC_URL } from "../config.js";
import { deleteData, getData, postData,putData } from "../requests/request.js"; 


function showSection(sectionId) {
    document.querySelectorAll('.content').forEach(section => {
        section.classList.remove('active');
    });

    document.querySelectorAll('.tabs button').forEach(button => {
        button.classList.remove('active');
    });

    document.getElementById(sectionId).classList.add('active');
    document.getElementById(sectionId + "Btn").classList.add('active');
}

document.addEventListener("DOMContentLoaded", () => {
    showSection('categories');
});
