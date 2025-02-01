import { getData } from "../../../requests/request.js";
import { findUsers } from "./dom.js";

export async function fetchDatas() {
  try {
    let users = await getData("/users");
    findUsers(users);
  } catch (error) {
    console.log(error);
  }
}
