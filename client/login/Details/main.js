let product = JSON.parse(localStorage.getItem("productById"))

console.log(product);

let productName = document.querySelector(".product-name")

productName.textContent = product.productName


let thumbnails = document.querySelector(".thumbnails")
product.images.forEach(e => {
    let image = document.createElement('img')
    image.src = e.src

    thumbnails.append(image)
})


document.querySelector(".mainImage").src= product.images[0].src

let active = document.querySelector(".active")
active.textContent = product.price.discount > 0? " In Stock" : " Stock"

let price = document.querySelector(".price")
price.textContent ="$"+ product.price.cost 

let description = document.querySelector(".description")
description.textContent = product.description



let color1 = document.querySelector(".colors")
product.color.forEach(e => {
    let color = document.createElement('span')
    color.classList.add("color")
    color.style.backgroundColor = e.rgb
    color1.append(color)

})


