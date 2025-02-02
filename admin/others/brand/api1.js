import { deleteData, getData, postData, putData } from "../../../requests/request.js";
import { get } from "./brand.js";

export async function getBrand() {
    try {
        let data = await getData("/brands")
        get(data)
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}
export async function postBrand(newBrand) {
    try {
        await postData('/brands', newBrand)
        getBrand()
    } catch (error) {
        console.error(error);
    }
}


export async function putBrand(id, newBrand) {
    console.log(id, newBrand);
    try {
        let { data } = await putData(`/brands/${id}`, newBrand)
        console.log(data);
        getBrand()
    } catch (error) {
        console.error(error);
    }
}

export async function deleteBrand(id) {
    try {
        await deleteData(`/brands/${id}`)
        getBrand()
    } catch (error) {
        console.error(error);
    }
}