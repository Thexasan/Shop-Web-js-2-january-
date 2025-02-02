import { fetchOrders } from "./api.js";
// CATEGORY LIST
let categoryListDiv = document.querySelector(".categorylist");

export function fetchCategories(categories) {
    categoryListDiv.innerHTML = ""; 

    let visibleCategories = categories.slice(0, 5);
    let hiddenCategories = categories.slice(5);

    visibleCategories.forEach(category => createCategoryElement(category, categoryListDiv));

    if (hiddenCategories.length > 0) {
        let seeMoreBtn = document.createElement("button");
        seeMoreBtn.classList.add("see-more");
        seeMoreBtn.innerText = "See More";
        categoryListDiv.appendChild(seeMoreBtn);

        seeMoreBtn.onclick = () => {
            hiddenCategories.forEach(category => createCategoryElement(category, categoryListDiv));
            seeMoreBtn.remove(); 
        };
    }
}

// BRANDS LIST
let brandListDiv = document.querySelector(".brandlist");

export function fetchBrands(brands) {
    brandListDiv.innerHTML = ""; 

    let visibleBrands = brands.slice(0, 5);
    let hiddenBrands = brands.slice(5);

    visibleBrands.forEach(brand => createBrandElement(brand, brandListDiv));

    if (hiddenBrands.length > 0) {
        let seeMoreBtn = document.createElement("button");
        seeMoreBtn.classList.add("see-more");
        seeMoreBtn.innerText = "See More";
        brandListDiv.appendChild(seeMoreBtn);

        seeMoreBtn.onclick = () => {
            hiddenBrands.forEach(brand => createBrandElement(brand, brandListDiv));
            seeMoreBtn.remove(); 
        };
    }
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
    brandElement.classList.add("brand");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("brandcheckbox");

    let brandName = document.createElement("span");
    brandName.innerText = brand.brandName;

    brandElement.appendChild(checkbox);
    brandElement.appendChild(brandName);

    containerDiv.appendChild(brandElement);

    brandElement.onclick = () => fetchOrders("brand", brand.id);
}
