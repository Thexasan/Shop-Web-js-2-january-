export function updateCartCount() {
  let cartCount = document.querySelector(".cntCartAdd");
  if (!cartCount) return;

  let cart = JSON.parse(localStorage.getItem("cartSend")) || [];

  let totalItems = cart.length;

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
