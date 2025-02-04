document.addEventListener("DOMContentLoaded", () => {
    const burgerMenu = document.getElementById("burgerMenu");
    const mobileNav = document.getElementById("mobileNav");
    const navLinks = document.querySelector(".nav-links");

    burgerMenu.addEventListener("click", () => {
        burgerMenu.classList.toggle("active");
        mobileNav.classList.toggle("active");
        navLinks.classList.toggle("active");
    });

    document.addEventListener("click", (event) => {
        if (!mobileNav.contains(event.target) && !burgerMenu.contains(event.target)) {
            mobileNav.classList.remove("active");
            burgerMenu.classList.remove("active");
            navLinks.classList.remove("active");
        }
    });
});
import { getData } from "../../requests/request.js";
let userId = localStorage.getItem("userId")
let input_box = document.querySelector(".input-box")
let input_box2 = document.querySelector(".input-box2")
let email_box = document.querySelector(".input-box3")
let password_box = document.querySelector(".password")
async function getUser() {
    try {
        let user = await getData(`/users/${userId}`)
        renderUSer(user)
        console.log(user);
        
    } catch (error) {
        console.error(error);
    }
}
getUser()
function renderUSer(user)
{
    input_box.innerHTML = user.firstName.split(" ")[0]
    input_box2.innerHTML = user.firstName.split(" ")[1]
    email_box.innerHTML = user.email
    password_box.innerHTML = user.password
}