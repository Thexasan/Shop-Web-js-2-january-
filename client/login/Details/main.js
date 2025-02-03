let product = JSON.parse(localStorage.getItem("productById"))

console.log(product);

let productName = document.querySelector(".product-name")

productName.textContent = product.productName



// let thumbnails = document.querySelector(".thumbnails")
// product.images.forEach(e => {
//     let image = document.createElement('img')
//     image.src = e.src

//     thumbnails.append(image)
// })


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
    console.log(e.rgb);
    color1.append(color)

})

//! clicking img

let thumbnailsPhoto = document.querySelector(".thumbnails");
product.images.forEach(e => {
    let image = document.createElement('img');
    image.src = e.src;
    image.addEventListener("click", function() {
        swapImages(image);
    });

    thumbnailsPhoto.append(image);
});

//! Clicking img function
function swapImages(clickedImg) {
    let mainImg = document.getElementById('mainImg');
    let tempSrc = mainImg.src;
    mainImg.src = clickedImg.src;
    clickedImg.src = tempSrc;
}

// ! burger

document.addEventListener("DOMContentLoaded", () => {
    const burgerMenu = document.getElementById("burgerMenu");
    const mobileNav = document.getElementById("mobileNav");
  
    burgerMenu.addEventListener("click", () => {
      mobileNav.classList.toggle("active");
    });
  
    // Закрытие меню при клике вне его
    document.addEventListener("click", (event) => {
      if (!mobileNav.contains(event.target) && !burgerMenu.contains(event.target)) {
        mobileNav.classList.remove("active");
      }
    });
  });


