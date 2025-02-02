import { fetchOrders } from "./api.js";
// CATEGORY LIST
let categoryListDiv = document.querySelector(".categorylist");
let seeMoreBtn = document.querySelector(".see-more");
let seeLessBtn = document.querySelector(".see-less");

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

// Create Category Element
function createCategoryElement(category, containerDiv) {
    let categoryElement = document.createElement("div");
    categoryElement.classList.add("category1");
    categoryElement.innerText = category.name;
    containerDiv.appendChild(categoryElement);

    categoryElement.onclick = () => fetchOrders("category", category.id);
}

function createBrandElement(brand, containerDiv) {
    let brandElement = document.createElement("div");
    brandElement.classList.add("brand1");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("brandcheckbox");

    let brandName = document.createElement("span");
    brandName.innerText = brand.brandName;

    brandElement.append(checkbox,brandName);

    containerDiv.appendChild(brandElement);
}

// features
const features = [
    "Metallic",
    "Plastic cover",
    "8GB Ram",
    "Super power",
    "Large Memory"
];
const featureListDiv = document.querySelector(".featureslist");
const seeAllBtn = document.querySelector(".see-all");
let visibleFeatures = features.slice(0, 3);

function displayFeatures(featuresArray) {
    featureListDiv.innerHTML = ""; 
    featuresArray.forEach(feature => {
        let checkboxDiv = document.createElement("div");
        checkboxDiv.innerHTML = `<input type="checkbox"> ${feature}`;
        featureListDiv.appendChild(checkboxDiv);
    });
}
displayFeatures(visibleFeatures);

seeAllBtn.onclick = function (e) {
    e.preventDefault();
    displayFeatures(features); 
    seeAllBtn.style.display = "none"; 
};


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
function displayProducts(products) {
    let container = document.querySelector(".filteredProducts"); 
    container.innerHTML = ""; 
    if (products.length === 0) {
        container.innerHTML = "<p>No products found in this range.</p>";
    }
    products.forEach(product => {
        let productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML = `<p>${product.productName} - ${product.price.cost}</p>`;
        container.append(productDiv);
    });
}


// PRODUCTS
const productsContainer = document.querySelector(".productsContainer");
export function fetchProduct(products) {
    /* productsContainer.innerHTML = ""; */
    console.log(products)

    products.forEach(product => {
        let productCard = document.createElement("div");
        productCard.classList.add("product-card");
   /*      let p = document.createElement("p")
        p.innerHTML = product.productName
        productCard.appendChild(p)
 */
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
