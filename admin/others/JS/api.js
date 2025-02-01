import { getData } from "../../../requests/request.js   ";
import {get} from "./dom.js"
export async function  getCategory() {
    try {
        let data = await getData('/category')
    get(data)
    } catch (error) {
        console.error(error);
        
    }
}
