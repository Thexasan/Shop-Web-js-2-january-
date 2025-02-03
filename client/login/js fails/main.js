import { postData, getData } from "../../../requests/request.js";
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
        card.innerHTML=`<div class="topOfCard">
                    <img src="${el.images[0].src}" alt="">
                    <p style="position: absolute; top: 0; left: 10px; padding: 5px; text-align: center; letter-spacing: 1px; border-radius: 5px; width: 50px; color: white; background-color: #DB4444;">${0} </p>
                    <img src="./images/Fill Eye.png" alt="" style="position: absolute; top: 10px; right: 10px;">
                </div>
                <p>${el.productName}</p>
                <span style="  color: #DB4444;">${el.price.cost - el.price.discount}</span>  <span style="text-decoration: line-through;">${el.price.cost}</span>`

         cards.appendChild(card)       
    })
}