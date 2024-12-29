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
    ) // create debt reminder
    {
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
        console.error("Error creating debt reminder: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },
    // get list debt reminder created customer
    async getAllDebtbyCustomer(customerID) {
      try {
        const response = await instance.get(
          `/api/debt-reminder/send/${"675babee10466a57086768eb"}`
        );
        return response;
      } catch (error) {
        console.error("Error fetching sent debt reminders: ", error);
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
        console.error("Error fetching received debt reminders: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },
    // delete debt reminder
    async deleteDebtReminder(debtID) {
      try {
        const response = await instance.delete(`/api/debt-reminder/${debtID}`);
        return response;
      } catch (error) {
        console.error("Error deleting debt reminder: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },
    // Pay a debt reminder
    async payDebtReminder(debtID) {
      try {
        const response = await instance.post(
          `/api/debt-reminder/${debtID}/pay`,
          {
            status: "Paid",
          }
        );
        return response;
      } catch (error) {
        console.error("Error paying debt reminder: ", error);
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
          account_number: account_number,
          nickname: nickname,
          bank: "default",
        });
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },
    async deleteReciept(recipientID) {
      //pending
      try {
        const response = await instance.delete(`/api/recipient/${recipientID}`);
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },
  },
};

export default PublicService;
