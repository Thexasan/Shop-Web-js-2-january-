
import { postData, getData } from "../../../requests/request.js";


export async function postUser(newUser){
    try {
        await postData(`/users`, newUser)
    } catch (error) {
        console.error(error);
    }
}


export async function getUser(){
    try {
         let data= await getData(`/users`)
          return data
    } catch (error) {
        console.error(error);
    }
}


