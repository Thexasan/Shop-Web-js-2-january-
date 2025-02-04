import { getUser } from "./api.js";

let wrong = document.querySelector(".oshibka");
let formLogin = document.querySelector(".login");
let inputPassword = document.querySelectorAll(".inputPassword");
let lega = document.querySelectorAll(".lega");

formLogin.onsubmit = async (e) => {
  e.preventDefault();
  let userEmail = formLogin["emailLogin"].value.trim();
  let userPassword = formLogin["passwordlogin"].value.trim();

  if (!userEmail || !userPassword) {
    showError("Введите email и пароль!");
    return;
  }

  try {
    let users = await getUser();
    let user = users.find(
      (u) => u.email === userEmail && u.password === userPassword
    );

    if (user) {
      localStorage.setItem("userId", user.id);
      window.location = "./homepage.html";
    } else {
      showError("Неверный email или пароль!");
    }
  } catch (error) {
    console.error("Ошибка при авторизации:", error);
    showError("Ошибка сервера. Попробуйте позже.");
  }
};

function showError(message) {
  wrong.innerHTML = message;
  inputPassword.forEach((el) => (el.style.border = "2px solid red"));
  lega.forEach((el) => (el.style.color = "red"));
}

inputPassword.forEach((el) => {
  el.addEventListener("input", () => {
    el.style.border = "";
    wrong.innerHTML = "";
    lega.forEach((el) => (el.style.color = ""));
  });
});

let clickModal = document.querySelector(".infoClick");
let btnInfo = document.querySelector(".aboutUser");


btnInfo.onclick = () => {
  clickModal.showModal();
};

let acc = document.querySelector(".acc");
let order = document.querySelector(".ord");
let logout = document.querySelector(".log");

acc.onclick = () => {
  window.location = "../Account/index.html";
  clickModal.close();
};
order.onclick = () => {
  window.location = "#";
  clickModal.close();
};
logout.onclick = () => {
  window.location = "./registratsiya.html";
  clickModal.close();
};

let closeBtnSec=document.querySelector('.dialogCloseBtnSec')
let closeBtn=document.querySelector('.dialogCloseBtn')
let burgerBtn = document.querySelector('.burgerBtn')
let burgerModal = document.querySelector('.burgerModal')
burgerBtn.onclick=()=>{
    burgerModal.showModal()
    closeBtn.onclick=()=>{
        burgerModal.close()
    }
}

closeBtnSec.onclick=()=>{
    clickModal.close()
}
