import { getData } from "../../../requests/request.js";
import { showOrdersTable } from "./dom.js";

export async function fetchOrders() {
  try {
    let orders = await getData("/orders");
    showOrdersTable(orders);
  } catch (error) {
    console.error(error);
    showOrdersTable(error);
  }
}

