export function updateCartCount() {
    let cartCount = document.querySelector(".cntCartAdd");
    if (!cartCount) return;

    let cart = JSON.parse(localStorage.getItem("cartSend")) || [];
    let totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0); 

    if (totalItems > 0) {
        cartCount.style.display = "flex";
        cartCount.textContent = totalItems;
    } else {
        cartCount.style.display = "none";
    }
}


window.addEventListener("storage", () => {  
    updateCartCount();
});
