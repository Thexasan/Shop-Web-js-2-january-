import { fetchOrders } from "./api.js";
import { displayProducts } from "./dom.js";

fetchOrders("category"); // ✅ Fetch categories
fetchOrders("brand");    // ✅ Fetch brands
fetchOrders("product").then(displayProducts) // ✅ Fetch products (this calls fetchProduct internally)
