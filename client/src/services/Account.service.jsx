import instance from "./axios.config";

const AccountService = {
  async getAllAccount() {
    try {
      const response = await instance.get(`/account`);
      return response;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return { data: null, error: error.message || "An error occurred" };
    }
  },
  async selectAccount(accountID) {
    try {
      const response = await instance.post(`/account/${accountID}`);
      return response;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return { data: null, error: error.message || "An error occurred" };
    }
  },
  async deleteAccount(accountID) {
    try {
      const response = await instance.delete(`/account/${accountID}`);
      return response;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return { data: null, error: error.message || "An error occurred" };
    }
  },
  async deposit() {
    // pending
    try {
      const response = await instance.post(`/account/${1}`);
      return response;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return { data: null, error: error.message || "An error occurred" };
    }
  },
  //   transfer
  async transfer() {
    // pending
    try {
      const response = await instance.post(`/account/${1}`);
      return response;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return { data: null, error: error.message || "An error occurred" };
    }
  },
};

export default AccountService;
