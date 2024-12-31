import instance from "./axios.config";

const AccountService = {
  async getAllAccount() {
    try {
      const response = await instance.get(`/api/account`);
      return response;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return { data: null, error: error.message || "An error occurred" };
    }
  },
  async selectAccountByCustomerid(customer_id) {
    try {
      const response = await instance.get(`/api/account/${customer_id}`);
      return response;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return { data: null, error: error.message || "An error occurred" };
    }
  },
  async deleteAccount(accountID) {
    try {
      const response = await instance.delete(`/api/account/${accountID}`);
      return response;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return { data: null, error: error.message || "An error occurred" };
    }
  },
  async getCusomerInfo(account_number) {
    try {
      const response = await instance.get(
        `/api/account/customer-infomation${account_number}`
      );
      return response;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return { data: null, error: error.message || "An error occurred" };
    }
  },

  async deposit(receiver, amount) {
    try {
      const response = await instance.post(`/api/account/deposit`, {
        receiver,
        amount,
      });
      return response;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return { data: null, error: error.message || "An error occurred" };
    }
  },
  //   transfer
  // async transfer(
  //   sender,
  //   receiver,
  //   amount,
  //   content,
  //   sender_balance,
  //   receiver_balance,
  //   receiver_balance,
  //   payer,
  //   type
  // ) {
  //   try {
  //     const response = await instance.post(`/api/account/transfer`, {
  //       sender,
  //       receiver,
  //       amount,
  //       content,
  //       sender_balance,
  //       receiver_balance,
  //       payer,
  //       type,
  //     });
  //     return response;
  //   } catch (error) {
  //     console.error("Error fetching data: ", error);
  //     return { data: null, error: error.message || "An error occurred" };
  //   }
  // },
};

export default AccountService;
