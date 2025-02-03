import { getData,deleteData } from "../../../requests/request.js";
import { showOrdersTable } from "./dom.js";

export async function fetchOrders() {
   try {
     let orders = await getData("/orders"); 
     showOrdersTable(orders);
     return orders; 
   } catch (error) {
      console.error(error);
   }
  }
  

export async function deleteUser(id) {
 try {
   await deleteData(`/orders/${id}`);
   fetchOrders()
 } catch (error) {
    console.error(error);
 }
}
