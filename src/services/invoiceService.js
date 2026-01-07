import axios from "axios";

export const saveInvoice = (invoice) => {
  return axios.post("http://localhost:8080/api/invoice/save", invoice);
};
