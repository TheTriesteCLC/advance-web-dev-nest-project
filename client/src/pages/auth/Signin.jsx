import React, { useState } from "react";
import { Form, Input, Button, Checkbox, Alert, Tabs } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import AuthService from "../../services/Auth.service";
import AccountService from "../../services/Account.service";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUserInfo, setRole } from "../../redux/features/profileSlice";
import { updateAccount } from "../../redux/features/accountSlice";

const SignIn = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogintest = async (role) => {
    dispatch(setRole(role));
  };
  const handleLogin = async (values, role) => {
    setLoading(true);
    setErrorMessage(null);
    try {
      let response;
      switch (role) {
        case "customer":
          response = await AuthService.customer.login(
            values.username,
            values.password
          );
          if (response.data) {
            dispatch(updateUserInfo(response.data.user));
            localStorage.setItem(
              "accessToken",
              response.data.tokens.accessToken
            );
            localStorage.setItem(
              "refreshToken",
              response.data.tokens.refreshToken
            );

            try {
              const accountResponse =
                await AccountService.selectAccountByCustomerid(
                  response.data.user._id
                );
              dispatch(updateAccount(accountResponse.data[0]));
              navigate("/");
            } catch (accountError) {
              console.error("Error fetching account:", accountError);
            }
          }
          break;
        case "employee":
          response = await AuthService.employee.login(
            values.username,
            values.password
          );
          if (response.data) {
            dispatch(updateUserInfo(response.data.user));
          }
          break;
        case "admin":
          response = await AuthService.admin.login(
            values.username,
            values.password
          );
          if (response.data) {
            dispatch(updateUserInfo(response.data.user));
          }
          break;
      }

      if (response.error) {
        setErrorMessage(response.error);
      }
    } catch (error) {
      setErrorMessage(error.message || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  const LoginForm = ({ role }) => (
    <Form
      name={`${role}_login`}
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={(values) => handleLogin(values, role)}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: "Please input your Username!" }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your Password!" }]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <a className="login-form-forgot" href="#" style={{ float: "right" }}>
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          style={{ width: "100%" }}
          loading={loading}
        >
          Log in
        </Button>
      </Form.Item>
    </Form>
  );

  const items = [
    {
      key: "customer",
      label: "Customer",
      children: <LoginForm role="customer" />,
    },
    {
      key: "employee",
      label: "Employee",
      children: <LoginForm role="employee" />,
    },
    {
      key: "admin",
      label: "Admin",
      children: <LoginForm role="admin" />,
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f2f5",
      }}
    >
      <div className=" flex  flex-col">
        đăng nhập không cần mật khẩu
        <Button onClick={() => handleLogintest("admin")}>Admin </Button>
        <Button onClick={() => handleLogintest("employee")}>employree</Button>
        <Button onClick={() => handleLogintest("customer")}>Customer</Button>
      </div>
      <div
        style={{
          width: 400,
          padding: 24,
          backgroundColor: "#fff",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          borderRadius: 8,
        }}
      >
        <h1
          className="text-xl font-semibold mb-4"
          style={{ textAlign: "center" }}
        >
          Sign In
        </h1>
        {errorMessage && (
          <Alert
            message="Error"
            description={errorMessage}
            type="error"
            showIcon
            closable
            onClose={() => setErrorMessage(null)}
            style={{ marginBottom: 16 }}
          />
        )}

        <Tabs defaultActiveKey="customer" items={items} centered />
      </div>
    </div>
  );
};

export default SignIn;
