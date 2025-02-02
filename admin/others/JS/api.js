import { deleteData, putData } from "../../../requests/request.js";
import { getData, postData } from "../../../requests/request.js   ";
import { get } from "./dom.js"

export async function getCategory(name) {
    try {
        if (name){
            let data = await getData(`/category?name=${name}`)
            get(data)
        }
        else {
            let data = await getData("/category")
            get(data)
        }
    } catch (error) {
        console.error(error);

    }
}

export async function postCategory(newCategory) {
    try {
        await postData('/category', newCategory)
        getCategory()
    } catch (error) {
        console.error(error);
    }
}

export async function putCategory(id,newCategory) {
    console.log(id,newCategory);
    try {
        console.log(id)
      let {data}=  await putData(`/category/${id}`, newCategory)
      console.log(data);  
      getCategory()
    } catch (error) {
        console.error(error);
    }
}

// delete
export async function deleteCategory(id) {
    try {
        await deleteData(`/category/${id}`)
        getCategory()
    } catch (error) {
        console.error(error);
    }
}


