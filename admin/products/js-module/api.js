import { getData , deleteData } from "../../../requests/request.js";
import { get } from "./dom.js";
export async function fetchData() {
  try {
    let products = await getData(`/products`);
    console.log(products);
    get(products);
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
