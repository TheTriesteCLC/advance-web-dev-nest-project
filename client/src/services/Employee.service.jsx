import instance from "./axios.config";

const EmployeeService = {
  async createEmployee(username, full_name, email, password, refresh_token) {

    try {
      const response = await instance.post(`/employee`, {
        username,
        full_name,
        email,
        password,
        refresh_token,
      });
      return response;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return { data: null, error: error.message || "An error occurred" };
    }
  },
  async getAllEmployee() {
    try {
      const response = await instance.get(`/employee`);
      return response;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return { data: null, error: error.message || "An error occurred" };
    }
  },
  // select employee
  async selectEmployee(employeeID) {
    try {
      const response = await instance.get(`/employee/${employeeID}`);
      return response;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return { data: null, error: error.message || "An error occurred" };
    }
  },
  async updateEmployee(
    employeeID,
    username,
    full_name,
    email,
    password,
    refresh_token
  ) {
    try {
      const response = await instance.patch(`/employee/${employeeID}`, {
        username,
        full_name,
        email,
        password,
        refresh_token,
      });
      return response;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return { data: null, error: error.message || "An error occurred" };
    }
  },
  // delete employee
  async deleteEmployee(employeeID) {
    try {
      const response = await instance.delete(`/employee/${employeeID}`);
      return response;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return { data: null, error: error.message || "An error occurred" };
    }
  },
};

export default EmployeeService;
