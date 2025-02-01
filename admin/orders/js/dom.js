import { deleteUser, fetchOrders } from "./api.js";

let emptyMSG = document.querySelector(".emptyMSG");
let tbody = document.querySelector(".tbody");
let tContainer = document.querySelector(".tContainer");

let trash = document.querySelector(".trash")
let checkAll = document.querySelector(".checkAll")
let isCheckAll = false
let deleteItems = []

export function showOrdersTable(orders) {
    if(orders.length === 0){
       emptyMSG.style.display = "block";  
       tContainer.style.display = "none"; 
    }else {        
        tContainer.style.display = "block";
        emptyMSG.style.display = "none";
        
        tbody.innerHTML = ""; 
        checkAll.onclick = () => {
            if(checkAll.checked){
               deleteItems=orders.map((order) => order.id)
               isCheckAll =true
               showOrdersTable(orders)
            } else{
               deleteItems=[]
               isCheckAll=false
               showOrdersTable(orders)
            }
           }     
            // <td class="ch"><input type="checkbox">${order.orderId}</td>
        orders.forEach(order => {
            let tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${new Date(order.orderDate).toLocaleDateString("en-US", { month: "short", day: "numeric",hour: "numeric",minute: "2-digit",hour12: true })}</td>                
                <td>${order.fullName}</td>
                <td><button class="paid">Paid</button></td>
                <td><button class="ready">Ready</button></td>
                <td>$${order.totalPrice}</td>
            `;

            trash.onclick = () => {
                deleteItems.forEach((id) =>{
                    deleteUser(id)
                })
                deleteItems = []
            }  

            let box = document.createElement("td")
            let checkbox = document.createElement("input")
            checkbox.type = "checkbox"
            checkbox.checked = isCheckAll

            checkbox.onclick = () => {
                if(checkbox.checked){
                    deleteItems.push(order.id)
                  }else{
                      deleteItems = deleteItems.filter((id) => id !== order.id)
                  }
              }
              box.append(checkbox)
              tr.prepend(box)
            tbody.appendChild(tr);
        }) 
    }
}

// search
let searchForm = document.querySelector(".searchForm");
searchForm.onsubmit = (e) => {
    e.preventDefault();
    let value = searchForm['search'].value.trim();
    fetchOrders(value ? `?fullName=${value}` : "");
};


