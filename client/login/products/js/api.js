import { getData } from "../../../../requests/request.js";
import { fetchBrands, fetchCategories, fetchProduct } from "./dom.js";

export async function fetchOrders(type, category = null, brand = null) {
    try {
        let endpoint;
        if (type === "category") {
            endpoint = "/category";
        } else if (type === "brand") { 
            endpoint = "/brands";
        } else if (type === "product") { 
            endpoint = "/products";
            if (category) endpoint += `?category=${category}`;
            if (brand) {
                if (category) {
                    endpoint += `&brand=${brand}`;
                } else {
                    endpoint += `?brand=${brand}`;
                }
            }
        } else {
            console.error("Invalid type:", type);
            return;
        }
        const data = await getData(endpoint);
        if (type === "category") fetchCategories(data);
        else if (type === "brand") fetchBrands(data);
        else if (type === "product") fetchProduct(data);

        return data;
    } catch (error) {
        console.error(error);
    }
}
