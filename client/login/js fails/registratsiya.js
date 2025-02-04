
import { postUser } from "./api.js";


let addForm=document.querySelector(".registration")
let fail=document.querySelector('.fail')

addForm.onsubmit= async (e)=>{
e.preventDefault()
if(addForm['inpName'].value=='' &&  addForm['inpEmail'].value=='' && addForm['inpPassword'].value==''){
   fail.innerHTML='Заполните все данные'
   fail.style.color='red'
} else{
   let newUser = {
    firstName: addForm['inpName'].value,
    email: addForm['inpEmail'].value,
    password: addForm['inpPassword'].value,
    roleId: 1,
}
await postUser(newUser)
addForm.reset() 
window.location='./login.html'
}

}
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
  window.location = "../Account/index.html";
  clickModal.close();
};
logout.onclick = () => {
  window.location = "./login.html";
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

