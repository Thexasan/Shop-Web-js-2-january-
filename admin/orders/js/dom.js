import { deleteUser, fetchOrders } from "./api.js";

let emptyMSG = document.querySelector(".emptyMSG");
let tbody = document.querySelector(".tbody");
let tContainer = document.querySelector(".tContainer");

let trash = document.querySelector(".trash");
let checkAll = document.querySelector(".checkAll");
let isCheckAll = false;
let deleteItems = [];
let resultsCount = document.querySelector(".resultsCount"); 
// pagination
let currentPage = 1;
let limit = 5;
let totalData = 0;
let totalPages = 1;

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
    totalData = orders.length;
    totalPages = Math.ceil(totalData / limit);
    let start = (currentPage - 1) * limit;
    let end = start + limit;
    let paginatedOrders = orders.slice(start, end);
    paginatedOrders.forEach((order) => {
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
                deleteItems.forEach((id) => {
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
          deleteItems.push(order.id);
        } else {
          deleteItems = deleteItems.filter((id) => id !== order.id);
        }
        updateControl(orders);
      };
      box.append(checkbox, tdId);
      tr.prepend(box);
      tbody.appendChild(tr);
    });
    updateControl(orders);
  }
}
let nextBut = document.querySelector(".nextBut");
let prevBut = document.querySelector(".prevBut");
let numbers = document.querySelector(".numbers");

export async function updateControl(products) {
  prevBut.disabled = currentPage <= 1;
  nextBut.disabled = currentPage >= totalPages;
  numbers.innerHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    let pageBut = document.createElement("span");
    pageBut.innerHTML = i;
    pageBut.classList.add("number");
    if (i == currentPage) {
      pageBut.classList.remove("number");
      pageBut.classList.add("activePag");
    }
    pageBut.onclick = () => {
      currentPage = i;
      showOrdersTable(products);
    };
    numbers.append(pageBut);
  }
  prevBut.onclick = () => {
    if (currentPage > 1) {
      currentPage--;
      showOrdersTable(products);
    }
  };
  nextBut.onclick = () => {
    if (currentPage < totalPages) {
      currentPage++;
      showOrdersTable(products);
    }
  };
}

// search
let search= document.querySelector(".search");
search.oninput = async() => {
  let value = search.value.toLowerCase().trim();
  let order = await fetchOrders("orders")
  let filterData = order.filter(e => e.fullName.toLowerCase().includes(value))
  showOrdersTable(filterData);  
};
