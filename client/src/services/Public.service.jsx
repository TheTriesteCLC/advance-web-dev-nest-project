import instance from "./axios.config";

const PublicService = {
  proifle: {
    updateProfile: async (_id, full_name, email, phone) => {
      try {
        const response = await instance.patch(`/api/customer/${_id}`, {
          full_name,
          email,
          phone,
        });
        return response;
      } catch (error) {
        console.error("Error updating profile: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },
  },
  transaction: {
    async checking_transaction(bank_name, from, to) {},

    async checking_transaction_all(from, to) {
      try {
        const response = await instance.get(
          `/api/transaction/checking?from=${from}&to=${to}`
        );
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },

    async get_trans_bankname(name_bank, from, to) {
      try {
        const response = await instance.get(`/api/transaction/cheking`, {
          params: {
            name_bank,
            from,
            to,
          },
        });
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },
    async deposit(receiver, amount) {
      try {
        const response = await instance.post(`/api/transaction/deposit`, {
          receiver,
          amount,
        });
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },
    async transfer(sender, receiver, amount, content) {
      //pending
      try {
        const response = await instance.post(`/api/transaction/transfer`, {
          sender,
          receiver,
          amount,
          content,
        });
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },
    async select_his_trans_anb(account_number) {
      try {
        const response = await instance.get(
          `/api/transaction/transfer/history/${account_number}`
        );
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },
    async get_all_trans_his_anb(account_number) {
      try {
        const response = await instance.get(
          `/api/transaction/all-transaction-history/${account_number}`
        );
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },
    async get_transfer_trans_his_anb(account_number) {
      try {
        const response = await instance.get(
          `/api/transaction/transfer-transaction-history/${account_number}`
        );
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },
    async get_receive_trans_his_anb(account_number) {
      try {
        const response = await instance.get(
          `/api/transaction/receive-transaction-history/${account_number}`
        );
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },
    async get_debt_trans_history_anb(account_number) {
      try {
        const response = await instance.get(
          `/api/transaction/debt-payment-transaction-history/${account_number}`
        );
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },
  },

  debt: {
    async createDebtReminder(
      creditor,
      debtor,
      amount,
      message,
      createdAt,
      status = "Pending"
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
        console.error("Error creating debt reminder: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },
    // get list debt reminder created customer
    async getAllDebt_send(customerID) {
      try {
        const response = await instance.get(
          `/api/debt-reminder/send/${customerID}`
        );
        return response;
      } catch (error) {
        console.error("Error fetching sent debt reminders: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },
    // get list debt reminder received customer
    async getAllDebt_received(customerID) {
      try {
        const response = await instance.get(
          `/api/debt-reminder/received/${customerID}`
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
