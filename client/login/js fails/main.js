import {  getData } from "../../../requests/request.js";
async function getCategory(){
    try {
         let data= await getData(`/category`)
          get(data)
          
    } catch (error) {
        console.error(error);
    }
}
getCategory()

let categories=document.querySelector('.categories')
let get=(data)=>{
   categories.innerHTML=''
   data.forEach(el=> {
      let ul=document.createElement('ul')
      ul.innerHTML=`
      <a href="./products/index.html" class='productPage' target='_blank'>
      <li>${el.name}</li></a> `
        categories.appendChild(ul)
   });
}

async function getProducts(){
    try {
         let data= await getData(`/products`)
         getFromProducts(data)  
         getProductsWithoutSale(data)
    } catch (error) {
        console.error(error);
    }
}
getProducts()

let cards=document.querySelector('.cards')
let getFromProducts=(data)=>{
   cards.innerHTML=''
    data.forEach((el)=>{
        let card=document.createElement('div')
        card.classList.add('card')
        let num=el.price.cost /100 ;
        card.innerHTML=`<div class="topOfCard">
                    <img src="${el.images[0].src}" alt="" class='topp'>
                    <p style="position: absolute; top: 0; left: 10px; padding: 5px; text-align: center; letter-spacing: 1px; border-radius: 5px; width: 50px; color: white; background-color: #DB4444;"> -${Math.round( el.price.discount / num)}%</p>
                    <img src="./images/Fill Eye.png" alt="" style="position: absolute; top: 10px; right: 10px;">
                </div>
                <p>${el.productName}</p>
                <span style="  color: #DB4444;">$ ${el.price.cost - el.price.discount}</span>  <span style="text-decoration: line-through;">${el.price.cost}</span>`

         cards.appendChild(card)     
    })
}

let cardss= document.querySelector('.cardss')

let getProductsWithoutSale= (data)=>{
    cardss.innerHTML=''
    data.forEach((el)=>{
        let card=document.createElement('div')
        card.classList.add('card')
        card.innerHTML=`<div class="topOfCard">
                    <img src="${el.images[0].src}" alt="" class='topp'>
                    <img src="./images/Fill Eye.png" alt="" style="position: absolute; top: 10px; right: 10px;">
                </div>
                <p>${el.productName}</p>
                <span style="  color: #DB4444;">$ ${el.price.cost}</span> `

                cardss.appendChild(card)
    })
}

let more = document.querySelectorAll('.more')


more.forEach((el)=>{
el.onclick=()=>{
    window.location='./products/index.html'
}
})


let clickModal=document.querySelector('.infoClick')
let btnInfo=document.querySelector('.aboutUser')

btnInfo.onclick=()=>{
    clickModal.showModal()
}

let acc=document.querySelector('.acc')
let order=document.querySelector('.ord')
let logout=document.querySelector('.log')

acc.onclick=()=>{
    window.location="#"
    clickModal.close()
}
order.onclick=()=>{
    window.location="#"
    clickModal.close()
}
logout.onclick=()=>{
    window.location="./registratsiya.html"
    clickModal.close()
}


const days=document.querySelector('.days')
const hrs=document.querySelector('.hours')
const min=document.querySelector('.min')
const sec=document.querySelector('.sec')

const dayss=document.querySelector('.dayys')
const hours=document.querySelector('.hrss')
const mins=document.querySelector('.mins')
const secs=document.querySelector('.secs')

const currentDay= new Date().getDate()
// console.log(currentDay);

const newDay=new Date(`${currentDay + 3} Feb 2025  00:00:00` )
// console.log(newDay);

function countdownTimer(){
    const currentDayy= Date.now()
    const gap = newDay - currentDayy;
    // console.log(gap);
    const d = Math.floor(gap / 1000 /60 / 60 / 24)
    const h = Math.floor((gap / 1000 / 60 / 60) % 24)
    const m = Math.floor((gap / 1000 / 60) % 60)
    const s = Math.floor((gap / 1000) % 60)
    // console.log(d);
    // console.log(h);
    // console.log(m);
    // console.log(s);
    days.innerHTML= d < 10 ? '0' + d : d
    hrs.innerHTML= h < 10 ? '0' + h : h
    min.innerHTML= m < 10 ? '0' + m : m
    sec.innerHTML= s < 10 ? '0' + s : s
    
}
setInterval(countdownTimer, 1000)


function countdownTimerr(){
    const currentDayy= Date.now()
    const gap = newDay - currentDayy;
    // console.log(gap);
    const dd = Math.floor(gap / 1000 /60 / 60 / 24)
    const hh= Math.floor((gap / 1000 / 60 / 60) % 24)
    const mm = Math.floor((gap / 1000 / 60) % 60)
    const ss = Math.floor((gap / 1000) % 60)
    // console.log(d);
    // console.log(h);
    // console.log(m);
    // console.log(s);
    dayss.innerHTML= dd < 10 ? '0' + dd : dd
    hours.innerHTML= hh < 10 ? '0' + hh : hh
    mins.innerHTML= mm < 10 ? '0' + mm : mm
    secs.innerHTML= ss < 10 ? '0' + ss : ss
    
}
setInterval(countdownTimerr, 1000)


