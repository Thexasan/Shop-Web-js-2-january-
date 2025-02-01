import { BASIC_API } from "../config.js";

const request = {
  async getData(params = "") {
    try {
      const { data } = await axios.get(`${BASIC_API}${params}`);
      return data;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  async postData(params = "", user) {
    try {
      await axios.post(`${BASIC_API}${params}`, user);
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  async putData(params = "", user) {
    try {
      await axios.put(`${BASIC_API}${params}`, user);
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  async deleteData(params = "") {
    try {
      await axios.delete(`${BASIC_API}${params}`);
    } catch (error) {
      console.error(error);
      return error;
    }
  },
};

export const { getData, postData, putData, deleteData } = request;
