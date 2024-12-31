import instance from "./axios.config";

const AccountService = {
  getAllAccount: async () => {
    try {
      const response = await instance.get("/api/account");
      return response;
    } catch (error) {
      console.error("Error fetching accounts:", error);
      throw error;
    }
  },

  createAccount: async (accountData) => {
    try {
      const response = await instance.post("/api/account", accountData);
      return response;
    } catch (error) {
      console.error("Error creating account:", error);
      throw error;
    }
  },

  updateAccount: async (accountId, accountData) => {
    try {
      const response = await instance.put(
        `/api/account/${accountId}`,
        accountData
      );
      return response;
    } catch (error) {
      console.error("Error updating account:", error);
      throw error;
    }
  },

  updateBalance: async (accountId, balance) => {
    try {
      const response = await instance.patch(
        `/api/account/${accountId}/balance`,
        {
          balance,
        }
      );
      return response;
    } catch (error) {
      console.error("Error updating balance:", error);
      throw error;
    }
  },

  deleteAccount: async (accountId) => {
    try {
      const response = await instance.delete(`/api/account/${accountId}`);
      return response;
    } catch (error) {
      console.error("Error deleting account:", error);
      throw error;
    }
  },
};

export default AccountService;
