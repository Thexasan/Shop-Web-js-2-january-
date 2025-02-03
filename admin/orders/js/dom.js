import { deleteUser, fetchOrders } from "./api.js";

let emptyMSG = document.querySelector(".emptyMSG");
let tbody = document.querySelector(".tbody");
let tContainer = document.querySelector(".tContainer");

let trash = document.querySelector(".trash");
let checkAll = document.querySelector(".checkAll");
let isCheckAll = false;
let deleteItems = [];
let resultsCount = document.querySelector(".resultsCount"); // Select the element for results count

export function showOrdersTable(orders) {
    resultsCount.textContent = `${orders.length} Results`;
  if (orders.length === 0) {
    emptyMSG.style.display = "block";
    tContainer.style.display = "none";
  } else {
    tContainer.style.display = "block";
    emptyMSG.style.display = "none";

    tbody.innerHTML = "";
    checkAll.onclick = () => {
      if (checkAll.checked) {
        deleteItems = orders.map((order) => order.id);
        isCheckAll = true;
        showOrdersTable(orders);
      } else {
        deleteItems = [];
        isCheckAll = false;
        showOrdersTable(orders);
      }
    };
    orders.forEach((order) => {
      let tr = document.createElement("tr");
      tr.innerHTML = `
                    <td>${new Date(order.orderDate).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      }
                    )}</td>                
                <td>${order.fullName}</td>
                <td><button class="paid">Paid</button></td>
                <td><button class="ready">Ready</button></td>
                <td>$${order.totalPrice}</td>
            `;

            trash.onclick = () => {
                console.log("Delete Items before request:", deleteItems); // Debugging
                deleteItems.forEach((id) => {
                  console.log("Deleting order ID:", id); // Debugging
                  deleteUser(id);
                });
                deleteItems = [];
              };
              

      let box = document.createElement("td");
      box.classList.add("ch")
      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = isCheckAll;

      let tdId = document.createElement('span');
      tdId.innerHTML = order.orderId
      checkbox.onclick = () => {
        if (checkbox.checked) {
          deleteItems.push(order.orderId);
        } else {
          deleteItems = deleteItems.filter((id) => id !== order.orderId);
        }
      };
      box.append(checkbox, tdId);
      tr.prepend(box);
      tbody.appendChild(tr);
    });
  }
}

<<<<<<< HEAD
//! search
let searchForm = document.querySelector(".searchForm");
searchForm.onsubmit = (e) => {
    e.preventDefault();
    let value = e.target["search"].value
  fetchOrders(value);
=======
// search
let search= document.querySelector(".search");
search.oninput = async() => {
  let value = search.value.toLowerCase().trim();
  let order = await fetchOrders("orders")
  let filterData = order.filter(e => e.fullName.toLowerCase().includes(value))
  showOrdersTable(filterData);  
>>>>>>> 03d906452632bb7fc8a5d78ff8ae8edaf2e4d551
};
