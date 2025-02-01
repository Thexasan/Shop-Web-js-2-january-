import { fetchOrders } from "./api.js";

let emptyMSG = document.querySelector(".emptyMSG");
let tbody = document.querySelector(".tbody");
let tContainer = document.querySelector(".tContainer");


export function showOrdersTable(orders) {
    if(orders.length === 0){
       emptyMSG.style.display = "block";  
       tContainer.style.display = "none"; 
    }else {        
        tContainer.style.display = "block";
        emptyMSG.style.display = "none";
        
        tbody.innerHTML = ""; 
    
        orders.forEach(order => {
            let tr = document.createElement("tr");
            tr.innerHTML = `
                <td class="ch"><input type="checkbox">${order.orderId}</td>
                <td>${new Date(order.orderDate).toLocaleDateString("en-US", { month: "short", day: "numeric",hour: "numeric",minute: "2-digit",hour12: true })}</td>                
                <td>${order.fullName}</td>
                <td><button class="paid">Paid</button></td>
                <td><button class="ready">Ready</button></td>
                <td>$${order.totalPrice}</td>
            `;
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


