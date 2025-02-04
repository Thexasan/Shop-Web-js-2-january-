import { updateCartCount } from "../../Cart/JS/cartsUtils.js";

let product = JSON.parse(localStorage.getItem("productById")) || null;
if (!product) {
    console.error("Ошибка: продукт не найден в localStorage!");
} else {
    console.log(product);
}

if (product) {
    let productName = document.querySelector(".product-name");
    if (productName) productName.textContent = product.productName;

    let mainImage = document.querySelector(".mainImage");
    if (mainImage) mainImage.src = product.images[0]?.src || "";

    let active = document.querySelector(".active");
    if (active) active.textContent = product.price.discount > 0 ? "In Stock" : "Stock";

    let price = document.querySelector(".price");
    if (price) price.textContent = "$" + product.price.cost;

    let description = document.querySelector(".description");
    if (description) description.textContent = product.description;

    let color1 = document.querySelector(".colors");
    if (color1 && product.color) {
        product.color.forEach(e => {
            let color = document.createElement("span");
            color.classList.add("color");
            color.style.backgroundColor = e.rgb;
            color1.append(color);
        });
    }
}

//! Добавление миниатюр изображений и смена основного изображения
let thumbnailsPhoto = document.querySelector(".thumbnails");
if (thumbnailsPhoto && product.images) {
    product.images.forEach(e => {
        let image = document.createElement("img");
        image.src = e.src;
        image.addEventListener("click", function () {
            swapImages(image);
        });
        thumbnailsPhoto.append(image);
    });
}

function swapImages(clickedImg) {
    let mainImg = document.getElementById("mainImg");
    if (mainImg) {
        let tempSrc = mainImg.src;
        mainImg.src = clickedImg.src;
        clickedImg.src = tempSrc;
    }
}

//! Открытие/закрытие бургер-меню
document.addEventListener("DOMContentLoaded", () => {
    const burgerMenu = document.getElementById("burgerMenu");
    const mobileNav = document.getElementById("mobileNav");

    if (burgerMenu && mobileNav) {
        burgerMenu.addEventListener("click", () => {
            mobileNav.classList.toggle("active");
        });

        document.addEventListener("click", (event) => {
            if (!mobileNav.contains(event.target) && !burgerMenu.contains(event.target)) {
                mobileNav.classList.remove("active");
            }
        });
    }
});

//! Переход в корзину по клику
let cartClick = document.querySelector(".cartClick");
if (cartClick) {
    cartClick.style.cursor = "pointer";
    cartClick.onclick = () => {
        window.location.href = "/client/Cart/cart.html";
    };
}

//! Обновление цены при изменении количества
document.addEventListener("DOMContentLoaded", () => {
    let quantityInput = document.querySelector(".purchase input");
    let totalPriceElement = document.querySelector(".total-price");

    if (quantityInput && totalPriceElement && product) {
        quantityInput.addEventListener("input", () => {
            let quantity = parseInt(quantityInput.value);
            if (isNaN(quantity) || quantity < 1) quantity = 1;
            let newTotal = quantity * product.price.cost;
            totalPriceElement.textContent = "$" + newTotal;
        });

        totalPriceElement.textContent = "$" + product.price.cost;
    }

    //! Добавление товара в корзину
    let addToCartBtn = document.querySelector(".buy");
addToCartBtn.addEventListener("click", () => {
    let quantity = parseInt(quantityInput.value);
    if (isNaN(quantity) || quantity < 1) quantity = 1;

    let cart = JSON.parse(localStorage.getItem("cartSend")) || [];

    let cartItem = {
        productName: product.productName,
        images: product.images,
        price: { cost: product.price.cost },
        quantity: quantity 
    };

    cart.push(cartItem);
    localStorage.setItem("cartSend", JSON.stringify(cart));
    updateCartCount(1);

    window.location.href = "/client/Cart/cart.html";
});
    updateCartCount();
});
