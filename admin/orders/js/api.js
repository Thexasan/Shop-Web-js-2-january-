import { getData,deleteData } from "../../../requests/request.js";
import { showOrdersTable } from "./dom.js";

export async function fetchOrders(name) {
 try {
   if(name){
      let orders = await getData(`/orders?fullName=${name}`); 
    showOrdersTable(orders)
   }
   else {
      let orders = await getData("/orders"); 
       showOrdersTable(orders)
   }  
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
