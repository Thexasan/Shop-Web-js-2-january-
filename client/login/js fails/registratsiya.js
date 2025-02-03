
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


// {
//     "id": "1",
//     "firstName": "John Doe",
//     "email": "example@example.com",
//     "password": "admin123",
//     "roleId": 0
//   },
