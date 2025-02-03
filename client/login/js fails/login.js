import { getUser } from "./api.js"

let wrong=document.querySelector('.oshibka')
let formLogin =document.querySelector('.login')
let inputPassword=document.querySelectorAll('.inputPassword')
let lega=document.querySelectorAll('.lega')
formLogin.onsubmit= async (e)=>{
  e.preventDefault()

  let userEmail=formLogin['emailLogin'].value
  let userPassword=formLogin['passwordlogin'].value
   let user=await getUser()
    const users= user.find(u=> u.email == userEmail && u.password == userPassword)

    if(users) {
        window.location='./homepage.html'
    } else{
        inputPassword.forEach((el)=> el.style.border='2px solid red')
        lega.forEach((el) => el.style.color='red')
       wrong.innerHTML=`Something wrong`
    }
    
    
}
