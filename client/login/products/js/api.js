import { getData } from "../../../../requests/request.js";
import { fetchCategories, fetchBrands } from "./dom.js";

export async function fetchOrders(type, id = null) {
    try {
        let endpoint;
        if (type === "category") {
            endpoint = id ? `/category?categoryId=${id}` : "/category";
        } else if (type === "brand") { 
            endpoint = id ? `/brands?brandId=${id}` : "/brands";  // ✅ Fix for brands
        } else {
            console.error("Invalid type:", type);
            return;
        }

        const data = await getData(endpoint);
        
        console.log(`Fetched ${type}:`, data); // 🔍 Debugging

        if (!Array.isArray(data)) {
            console.error(`Error: Expected an array but got`, data);
            return;
        }

        if (type === "category") {
            fetchCategories(data);
        } else if (type === "brand") {
            fetchBrands(data);
        }
    } catch (error) {
        console.error(`Error fetching ${type}:`, error);
    }
}
