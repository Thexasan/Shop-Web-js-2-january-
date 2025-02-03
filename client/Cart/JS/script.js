import { updateCartCount } from "./cartsUtils.js";


let cart = JSON.parse(localStorage.getItem("cartSend")) || [];
console.log(cart);

function Cart() {
  const burgerMenu = document.getElementById("burgerMenu");
  const mobileNav = document.getElementById("mobileNav");

  burgerMenu.onclick = () => {
    mobileNav.classList.toggle("active");
  };

  document.onclick = (event) => {
    if (!mobileNav.contains(event.target) && !burgerMenu.contains(event.target)) {
      mobileNav.classList.remove("active");
    }
  };
}

function displayCart() {
  let tbody = document.querySelector(".tbody");
  tbody.innerHTML = "";

  cart.forEach((product, index) => {
    let tr = document.createElement("tr");
    tr.classList.add("prod-hover");

    tr.innerHTML = `
      <td>
        <div class="product-descript">
          <img src="${product.images[0].src}" alt="" />
          <p>${product.productName}</p>
        </div>
      </td>
      <td>$${product.price.cost}</td>
      <td>
        <input class="inpCnt" min="1" type="number" value="1" data-index="${index}" />
      </td>
      <td class="subtotal">$${product.price.cost}</td>
      <td>
        <img src="./img/icon-cancel.png" alt="Удалить" class="delete-btn" data-index="${index}" />
      </td>
    `;

    tbody.appendChild(tr);
  });

  updateTotal();

  document.querySelectorAll(".inpCnt").forEach((input) => {
    input.addEventListener("input", function () {
      let index = this.dataset.index;
      let quantity = parseInt(this.value);
      if (quantity < 1) quantity = 1;

      let price = cart[index].price.cost;
      let subtotal = quantity * price;

      let subtotalCell = this.closest("tr").querySelector(".subtotal");
      subtotalCell.textContent = `$${subtotal}`;

      updateTotal();
      updateCartCount();
    });
  });

  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      let index = this.dataset.index;
      removeFromCart(index);
    });
  });
}

function updateTotal() {
  let total = 0;
  document.querySelectorAll(".subtotal").forEach((cell) => {
    total += parseFloat(cell.textContent.replace("$", ""));
  });

  document.querySelector(".subtotal-price p:last-child").textContent = `$${total}`;
  document.querySelector(".subtotal-prices p:last-child").textContent = `$${total}`;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cartSend", JSON.stringify(cart));
  displayCart();
  updateCartCount();
}

document.addEventListener("DOMContentLoaded", () => {
  Cart();
  displayCart();
   updateCartCount();
});

document.querySelector(".btnRemove").addEventListener("click", function () {
  cart = [];
  localStorage.setItem("cartSend", JSON.stringify(cart));
  displayCart();
});