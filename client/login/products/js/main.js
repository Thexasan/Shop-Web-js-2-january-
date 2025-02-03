import { fetchOrders } from "./api.js";
import { displayProducts } from "./dom.js";

fetchOrders("category"); 
fetchOrders("brand");   
fetchOrders("product").then(displayProducts) 
