import instance from "./axios.config";

const PublicService = {
  // create 2 objects debt and reciept
  debt: {
    async createDebtReminder(
      creditor,
      debtor,
      amount,
      message,
      createdAt,
      status
    ) {
      //         {
      //   "creditor": "675db7c4cb2b0bf8ef4ffbf3",
      //   "debtor": "675babee10466a57086768eb",
      //   "amount": 10000000,
      //   "message": "You owe me money",
      //   "createdAt": "2021-09-01T00:00:00.000Z",
      //   "status": "Pending"
      // }
      try {
        const response = await instance.post(`/debt`, {
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
          `/debt-reminder/send/${customerID}`
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
          `/debt-reminder/receive/${customerID}`
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
        const response = await instance.delete(`/debt_reminder/${debtID}`);
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
        const response = await instance.patch(`/debt_reminder/${debtID}/pay`, {
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
      //   "customer_id": "675db7c4cb2b0bf8ef4ffbf3",
      //   "account_number": "112233445566",
      //   "nickname": "Uncle John",
      //   "bank": "default"
      try {
        const response = await instance.post(`/reciept`, {
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

    async selectReciept(recieptID) {
      try {
        const response = await instance.get(`/reciept/${recieptID}`);
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },
    async updateReciept(recieptID, amount, date, description) {
      //pending
      try {
        const response = await instance.patch(`/reciept/${recieptID}`, {
          amount,
          date,
          description,
        });
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },
    async deleteReciept(recieptID) {
      //pending
      try {
        const response = await instance.delete(`/reciept/${recieptID}`);
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },
  },
};

export default PublicService;
