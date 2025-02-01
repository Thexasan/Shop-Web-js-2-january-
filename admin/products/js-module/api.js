import { getData , deleteData } from "../../../requests/request.js";
import { get } from "./dom.js";
import { updateControl } from "./dom.js";
export async function fetchData(params = "") {
  try {
    let products = await getData(`/products${params}`);
    console.log(products);
    get(products);
    updateControl(products.length)
  } catch (error) {
    console.error(error);
    get(error);
  }
}

export async function deleteProduct(params = "")
{
    await deleteData(`/products/${params}`)
    fetchData()
}
