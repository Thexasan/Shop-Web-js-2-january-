export function updateCartCount() {
    let cartCount = document.querySelector(".cntCartAdd");
    if (!cartCount) return; // Если элемента нет на странице, просто выходим

    let cart = JSON.parse(localStorage.getItem("cartSend")) || [];
    let totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0); // Считаем общее количество

    if (totalItems > 0) {
        cartCount.style.display = "flex";
        cartCount.textContent = totalItems;
    } else {
        cartCount.style.display = "none";
    }
}

// Обновляем счетчик на всех вкладках
window.addEventListener("storage", () => {
    updateCartCount();
});
