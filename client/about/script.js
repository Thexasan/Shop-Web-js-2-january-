import { updateCartCount } from "../Cart/JS/cartsUtils.js";

document.addEventListener("DOMContentLoaded", () => {
  const burgerMenu = document.getElementById("burgerMenu");
  const mobileNav = document.getElementById("mobileNav");

  burgerMenu.addEventListener("click", () => {
    mobileNav.classList.toggle("active");
  });

  // Закрытие меню при клике вне его
  document.addEventListener("click", (event) => {
    if (
      !mobileNav.contains(event.target) &&
      !burgerMenu.contains(event.target)
    ) {
      mobileNav.classList.remove("active");
    }
  });

  updateCartCount();

  let cartClick = document.querySelector(".cartClick");
  cartClick.style.cursor = "pointer";
  cartClick.onclick = () => {
    window.location = "/client/Cart/cart.html";
  };
});
