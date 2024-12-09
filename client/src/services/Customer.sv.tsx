import instance from "./axios.config";

const CustomerService = {
  async Login(username: string, password: string) {
    try {
      const response = await instance.post(`/admin/get_all_instructor`, {
        username,
        password,
      });
      return response;
    } catch (error: any) {
      console.error("Error fetching data: ", error);
      return { data: null, error: error.message || "An error occurred" };
    }
  },
};

export default CustomerService;
