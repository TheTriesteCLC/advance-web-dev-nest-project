import instance from "./axios.config";

const CustomerService = {
  async createCustomer(
    username,
    full_name,
    email,
    phone,
    password,
    refresh_token
  ) {
    try {
      const response = await instance.post(`/api/customer`, {
        username,
        full_name,
        email,
        phone,
        password,
        refresh_token,
      });
      return response;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return { data: null, error: error.message || "An error occurred" };
    }
  },
  async getAllCustomer() {
    try {
      const response = await instance.get(`/api/customer`);
      return response;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return { data: null, error: error.message || "An error occurred" };
    }
  },
  notification: {
    async createNotification(customer_id, title, content) {
      try {
        const response = await instance.post(
          `/api/debt-reminder-notification`,
          {
            customer_id,
            title,
            content,
          }
        );
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },

    async getNotification(customer_id) {
      try {
        const response = await instance.get(
          `/api/debt-reminder-notification/customer/${customer_id}`
        );
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },
    async deleteNotification(notification_id) {
      try {
        const response = await instance.delete(
          `/api/debt-reminder-notification/${notification_id}`
        );
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },
    // read notification
    async readNotification(notification_id) {
      try {
        const response = await instance.put(
          `/api/debt-reminder-notification/${notification_id}/read`
        );
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },
  },
};

export default CustomerService;
