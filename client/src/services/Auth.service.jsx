import instance from "./axios.config";

const AuthService = {
  customer: {
    async login(username, password) {
      try {
        const response = await instance.post(`/api/auth/customer/login`, {
          username,
          password,
        });
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },
    async register(username, full_name, email, phone, password) {
      try {
        const response = await instance.post(`/api/auth/customer/register`, {
          username,
          full_name,
          email,
          phone,
          password,
        });
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },
    async logout(username) {
      try {
        const response = await instance.get(`/api/auth/customer/logout`, {
          username,
        });
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },
    async refresh(username, refresh_token) {
      try {
        const response = await instance.get(`/api/auth/customer/refresh`, {
          username,
          refresh_token,
        });
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },
  },
  employee: {
    async login(username, password) {
      try {
        const response = await instance.post(`/employee/login`, {
          username,
          password,
        });
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },
    async register(username, full_name, email, password) {
      try {
        const response = await instance.post(`/employee`, {
          username,
          full_name,
          email,
          password,
        });
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },
    async logout(username) {
      try {
        const response = await instance.post(`/employee/logout`, {
          username,
        });
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },
    async refresh(username, refresh_token) {
      try {
        const response = await instance.post(`/employee/refresh`, {
          username,
          refresh_token,
        });
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },
  },
};

export default AuthService;
