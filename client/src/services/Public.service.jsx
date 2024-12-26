import instance from "./axios.config";

const PublicService = {
  debt: {
    async createDebtReminder(
      creditor,
      debtor,
      amount,
      message,
      createdAt,
      status
    ) {
      try {
        const response = await instance.post(`/api/debt-reminder`, {
          creditor,
          debtor,
          amount,
          message,
          createdAt,
          status,
        });
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },
    // get list debt reminder created customer
    async getAllDebtbyCustomer(customerID) {
      try {
        const response = await instance.get(
          `/api/debt-reminder/send/${customerID}`
        );
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },
    // get list debt reminder received customer
    async getAllDebttoCustomer(customerID) {
      try {
        const response = await instance.get(
          `/api/debt-reminder/receive/${customerID}`
        );
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },
    // delete debt reminder
    async deleteDebtReminder(debtID) {
      try {
        const response = await instance.delete(`/api/debt_reminder/${debtID}`);
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },
    // Pay a debt reminder
    async payDebtReminder(debtID) {
      //pending
      try {
        const response = await instance.post(`/api/debt_reminder/${debtID}/pay`, {
          status: "Paid",
        });
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },
  },
  reciept: {
    async createReciept(customer_id, account_number, nickname, bank) {

      try {
        const response = await instance.post(`/api/recipient`, {
          customer_id,
          account_number,
          nickname,
          bank,
        });
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },

    async getRecieptByCustomerID(customerID) {
      try {
        const response = await instance.get(`/api/recipient/${customerID}`);
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },
    async updateReciept(customer_id, account_number, nickname, bank) {
      try {
        const response = await instance.patch(`/api/recipient/${customer_id}`, {
          account_number,
          nickname,
          bank,
        });
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },
    async deleteReciept(customer_id) {
      //pending
      try {
        const response = await instance.delete(`/api/recipient/${customer_id}`);
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },
  },
};

export default PublicService;
