import instance from "./axios.config";

const AuthService = {
  customer: {
    login: async (username, password, recaptchaToken) => {
      try {
        const response = await instance.post("/api/auth/customer/login", {
          username,
          password,
          recaptchaToken,
        });
        return response;
      } catch (error) {
        return { error: error.response?.data?.message || error.message };
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
    async getCodeOTP(email, username) {
      try {
        const response = await instance.post(
          `/api/auth/customer/forgot-password`,
          {
            email,
            username,
          }
        );
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },
    async resetPassword(username, code, password, confirm_password) {
      try {
        const response = await instance.post(
          `/api/auth/customer/reset-password`,
          {
            username,
            code,
            password,
            confirm_password,
          }
        );
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },
  },
  employee: {
    login: async (username, password, recaptchaToken) => {
      try {
        const response = await instance.post("/api/auth/employee/login", {
          username,
          password,
          recaptchaToken,
        });
        return response;
      } catch (error) {
        return { error: error.response?.data?.message || error.message };
      }
    },
    async register(username, full_name, email, password) {
      try {
        const response = await instance.post(`/api/auth/employee/register`, {
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
        const response = await instance.post(`/api/auth/employee/logout`, {
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
        const response = await instance.post(`/api/auth/employee/refresh`, {
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
  admin: {
    login: async (username, password, recaptchaToken) => {
      try {
        const response = await instance.post("/api/auth/admin/login", {
          username,
          password,
          recaptchaToken,
        });
        return response;
      } catch (error) {
        return { error: error.response?.data?.message || error.message };
      }
    },
    async register(username, full_name, email, password) {
      try {
        const response = await instance.post(`/api/auth/admin/register`, {
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
        const response = await instance.post(`/api/auth/admin/logout`, {
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
        const response = await instance.post(`/api/auth/admin/refresh`, {
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
