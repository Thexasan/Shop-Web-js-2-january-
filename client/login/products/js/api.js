import { getData } from "../../../../requests/request.js";
import { fetchBrands, fetchCategories, fetchProduct } from "./dom.js";

export async function fetchOrders(type, id = null) {
    try {
        let endpoint;
        if (type === "category") {
            endpoint = id ? `/category?categoryId=${id}` : "/category";
        } else if (type === "brand") { 
            endpoint = id ? `/brands?brandId=${id}` : "/brands";
        } else if (type === "product") { 
            endpoint = id ? `/products?productId=${id}` : "/products";
            
        } else {
            console.error("Invalid type:", type);
            return;
        }

        const data = await getData(endpoint);

        if (type === "category") {
            fetchCategories(data);
        } else if (type === "brand") {
            fetchBrands(data);
        } else if (type === "product") {
            fetchProduct(data);  // Added function to handle products
        }
        
    } catch (error) {
        console.error(`Error fetching ${type}:`, error);
    }
}
