import { fetchOrders } from "./api.js";

// CATEGORY LIST
let categoryListDiv = document.querySelector(".categorylist");
let seeMoreBtn = document.querySelector(".see-more");
let seeLessBtn = document.querySelector(".see-less");
let allProductsBtn = document.querySelector(".all-products-btn");
allProductsBtn.style.color = "red";
export function fetchCategories(categories) {
    categoryListDiv.innerHTML = ""; 
    let visibleCategories = categories.slice(0, 5);
    let hiddenCategories = categories.slice(5);
    visibleCategories.forEach(category => createCategoryElement(category, categoryListDiv));
    seeMoreBtn.style.display = hiddenCategories.length > 0 ? "block" : "none";

    seeMoreBtn.onclick = () => {
        hiddenCategories.forEach(category => createCategoryElement(category, categoryListDiv));
        seeMoreBtn.style.display = "none";
        seeLessBtn.style.display = "block";
    };

    seeLessBtn.onclick = () => {
        document.querySelectorAll(".category1").forEach((element, index) => {
            if (index >= 5) element.remove(); 
        });
        seeLessBtn.style.display = "none";
        seeMoreBtn.style.display = "block";
    };
}
function createCategoryElement(category, containerDiv) {
    let categoryElement = document.createElement("div");
    categoryElement.classList.add("category1");
    categoryElement.innerText = category.name;

    categoryElement.onclick = async () => {
        document.querySelectorAll(".category1").forEach(el => el.style.color = "black"); 
        allProductsBtn.style.color ="black"
        categoryElement.style.color = "red"; 
        let products = await fetchOrders("product", category.name); 
        console.log(products);
        
        displayProducts(products);
    };
    containerDiv.appendChild(categoryElement);
}
allProductsBtn.onclick = async () => {
    document.querySelectorAll(".category1").forEach(el => el.style.color = "black"); 
    allProductsBtn.style.color = "red";
    let allProducts = await fetchOrders("product");
    displayProducts(allProducts);
};

// BRANDS LIST
let brandListDiv = document.querySelector(".brandlist");
let seeMoreBtnB = document.querySelector(".see-moreB");
let seeLessBtnB = document.querySelector(".see-lessB");
export function fetchBrands(brands) {
    brandListDiv.innerHTML = ""; 
    let visibleBrands = brands.slice(0, 5);
    let hiddenBrands = brands.slice(5);

    seeMoreBtnB.style.display = hiddenBrands.length > 0 ? "block" : "none";
    seeLessBtnB.style.display = "none"; 

    visibleBrands.forEach(brand => createBrandElement(brand, brandListDiv));

    seeMoreBtnB.onclick = () => {
        hiddenBrands.forEach(brand => createBrandElement(brand, brandListDiv));
        seeMoreBtnB.style.display = "none";
        seeLessBtnB.style.display = "block";
    };

    seeLessBtnB.onclick = () => {
        document.querySelectorAll(".brand1").forEach((element, index) => {
            if (index >= 5) element.remove(); 
        });
        seeLessBtnB.style.display = "none";
        seeMoreBtnB.style.display = "block";
    };
}

function createBrandElement(brand, containerDiv) {
    let brandElement = document.createElement("div");
    brandElement.classList.add("brand1");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("brandcheckbox");
    checkbox.value = brand.brandName;

    let brandName = document.createElement("span");
    brandName.innerText = brand.brandName;

    checkbox.onchange = async () => {
        let checkedBrands = Array.from(document.querySelectorAll(".brandcheckbox:checked"))
            .map(checkbox => checkbox.value);
        let products = await fetchOrders("product", null, checkedBrands.join(","));
        displayProducts(products); 
    };
    brandElement.append(checkbox, brandName);
    containerDiv.appendChild(brandElement);
}


// features
let features = [
    "Metallic",
    "Plastic cover",
    "8GB Ram",
    "Super power",
    "Large Memory",
    "Water Resistant",
    "Fast Charging",
    "Touchscreen",
    "Wireless Connectivity",
    "Ultra HD Display",
    "Energy Efficient",
    "Lightweight Design",
    "Noise Cancellation",
    "Long Battery Life",
    "Dual SIM Support"
];
const featureListDiv = document.querySelector(".featureslist");
const seeMoreBtnF = document.querySelector(".see-allF");
const seeLessBtnF = document.querySelector(".see-lessF");
export function fetchFeatures() {
    featureListDiv.innerHTML = ""; 
    let visibleFeatures = features.slice(0, 6);
    let hiddenFeatures = features.slice(6);
    visibleFeatures.forEach(feature => createFeatureElement(feature, featureListDiv));
    seeMoreBtnF.style.display = hiddenFeatures.length > 0 ? "block" : "none";
    seeLessBtnF.style.display = "none"; 

    seeMoreBtnF.onclick = () => {
        hiddenFeatures.forEach(feature => createFeatureElement(feature, featureListDiv));
        seeMoreBtnF.style.display = "none";
        seeLessBtnF.style.display = "block";
    };

    seeLessBtnF.onclick = () => {
        document.querySelectorAll(".feature1").forEach((element, index) => {
            if (index >= 3) element.remove(); 
        });
        seeLessBtnF.style.display = "none";
        seeMoreBtnF.style.display = "block";
    };
}
function createFeatureElement(feature, containerDiv) {
    let featureElement = document.createElement("div");
    featureElement.classList.add("feature1");
    featureElement.innerHTML = `<input type="checkbox"> ${feature}`;
    containerDiv.appendChild(featureElement);
}
fetchFeatures();



// range
let applyFilter = document.querySelector(".applyFilter");  
let minPrice = document.querySelector(".min-price")
let maxPrice = document.querySelector(".max-price")
applyFilter.onclick = async() => {
    try {
        let products = await fetchOrders("product");
        console.log(products);
        
        let filteredProducts = products.filter(product => product.price.cost >= minPrice.value && product.price.cost <= maxPrice.value);
        displayProducts(filteredProducts);
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

//product show
export function displayProducts(products) {
    let container = document.querySelector(".productsContainer");
    container.innerHTML = ""; 
    if (products.length === 0) {
        let noProductsMessage = document.createElement("div");
        noProductsMessage.innerText = "No products found.";
        container.append(noProductsMessage);
        return; 
    }
    let visibleProducts = products.slice(0, 7); 
    let hiddenProducts = products.slice(7);

    visibleProducts.forEach(product => {
        let productCard = document.createElement("div");
        productCard.classList.add("product-card");

        let rating = Math.floor(Math.random() * 6); 
        let stars = '';
        for (let i = 0; i < 5; i++) {
            stars += i < rating ? "⭐" : ``; 
        }
        productCard.innerHTML = `
            <div class="product-images">
                <img src="${product.images[0].src}" alt="${product.productName}" class="product-main-image">
                <div class="column">
                    <img src="./images/heart -small.png" class="eyee">
                    <img src="./images/eye-icon.png" class="eye">
                </div>
            </div>
            <div class="product-info">
                <h4>${product.productName}</h4>
                <div class="flexx">
                    <div class="product-price">${product.price.cost}</div>
                    <div class="rating">${stars}</div> 
                </div>
            </div>
            <button class="add-to-cart-btn">Add to Cart</button>
        `;

        let eyeIcon = productCard.querySelector(".eye");
        eyeIcon.onclick = () => {
            localStorage.setItem("productById", JSON.stringify(product));
        };

        let addToCartBtn = productCard.querySelector(".add-to-cart-btn");
        addToCartBtn.onclick = () => {
            addToCart(product);
        };
        container.appendChild(productCard);
    });

    let toggleBtn = document.querySelector(".toggleBtn");
    if (hiddenProducts.length > 0) {
        toggleBtn.style.display = "block"; 
        toggleBtn.textContent = "See More Products";
    } else {
        toggleBtn.style.display = "none"; 
    }
    toggleBtn.onclick = () => {
        if (toggleBtn.textContent === "See More Products") {
            hiddenProducts.forEach(product => {
                let productCard = document.createElement("div");
                productCard.classList.add("product-card");

                productCard.innerHTML = `
                    <div class="product-images">
                        <img src="${product.images[0].src}" alt="${product.productName}" class="product-main-image">
                        <div class="column">
                            <img src="./images/heart -small.png" class="eyee">
                            <img src="./images/eye-icon.png" class="eye">
                        </div>
                    </div>
                    <div class="product-info">
                        <h4>${product.productName}</h4>
                        <div class="product-price">${product.price.cost}</div>
                    </div>
                    <button class="add-to-cart-btn">Add to Cart</button>
                `;
                container.appendChild(productCard);

                let addToCartBtn = productCard.querySelector(".add-to-cart-btn");
                addToCartBtn.onclick = () => {
                    addToCart(product);
                };
            });
            toggleBtn.textContent = "See Less Products"; 
        } else {
            container.innerHTML = ""; 
            displayProducts(products); 
            toggleBtn.textContent = "See More Products"; 
        }
    };
}

let cartCount = document.querySelector(".cntCartAdd");

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cartSend")) || [];
    if (cart.length > 0) {
        cartCount.style.display = "flex";
        cartCount.textContent = cart.length;
    } else {
        cartCount.style.display = "none";
    }
}

updateCartCount();

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cartSend")) || [];
    cart.push(product);
    localStorage.setItem("cartSend", JSON.stringify(cart));

    updateCartCount();
    alert(`${product.productName} added to cart!`);
}


// PRODUCTS
const productsContainer = document.querySelector(".productsContainer");
export function fetchProduct(products) {
    products.forEach(product => {
        let productCard = document.createElement("div");
        productCard.classList.add("product-card");
        productCard.innerHTML = `
        <img src="${product.images[0].src}">
        <div class="product-info">
            <h4>${product.productName}</h4>
            <div class="product-price">
                ${product.price.cost} 
            </div>
        </div>
    `;
    
        productsContainer.append(productCard);
    });
}

// search
let search = document.querySelector(".search");
search.oninput = async () => {
    let value = search.value.toLowerCase().trim();
    let products = await fetchOrders("product");
    let filterData = products.filter(el => el.productName.toLowerCase().includes(value));
    displayProducts(filterData);
};

// Condition
let conditionListDiv = document.querySelector(".conditionlist");
let conditions = ["Any", "Refurbished", "Brand new", "Old items"];

conditions.forEach((condition, index) => {
    let conditionElement = document.createElement("div");
    conditionElement.innerHTML = `
        <input type="radio" name="condition" ${index === 0 ? "checked" : ""}>
        <label>${condition}</label>
    `;
    conditionListDiv.appendChild(conditionElement);
});

// RATING
let ratingsListDiv = document.querySelector(".ratingslist");
for (let i = 5; i >= 2; i--) {
    let ratingElement = document.createElement("div");
    let stars = "";
    for (let j = 0; j < 5; j++) {
        if (j < i) {
            stars += `<span class="filled-star">★</span>`;
        } else {
            stars += `<span class="empty-star">★</span>`; 
        }
    }
    ratingElement.innerHTML = `
        <input type="checkbox">
        <label>${stars}</label>
    `;
    ratingsListDiv.appendChild(ratingElement);
}

let cartClick = document.querySelector(".cartClick");
cartClick.style.cursor = "pointer";
cartClick.onclick = () => {
    window.location = "/client/Cart/cart.html";
}