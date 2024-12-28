import instance from "./axios.config";

const CustomerService = {

  async createCustomer(username, full_name, email, phone, password, refresh_token) {
    try {
      const response = await instance.post(`/customer`, {
        username,
        full_name,
        email,
        phone,
        password,
        refresh_token
      });
      return response;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return { data: null, error: error.message || "An error occurred" };
    }
  },
  async getAllCustomer() {
    try {
      const response = await instance.get(`/api/account`);
      return response;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return { data: null, error: error.message || "An error occurred" };
    }
  }
};

export default CustomerService;
