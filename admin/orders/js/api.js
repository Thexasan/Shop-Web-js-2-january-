import { getData,deleteData } from "../../../requests/request.js";
import { showOrdersTable } from "./dom.js";

<<<<<<< HEAD
export async function fetchOrders() {
  try {
    let orders = await getData("/orders");
    showOrdersTable(orders);
  } catch (error) {
    console.error(error);
    showOrdersTable(error);
  }
}

=======
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
>>>>>>> 8920ef0d24059351707e109ed6142a19349f17c3
