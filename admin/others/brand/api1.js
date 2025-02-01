import { getData } from "../../../requests/request.js";

export async function  getBrand() {
    try {
        let data = await getData('/brands')
    console.log(data);
    } catch (error) {
        console.error(error);
        
    }
}