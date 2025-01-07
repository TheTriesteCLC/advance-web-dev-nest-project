import React, { useState } from "react";
import { Form, Input, Button, Checkbox, Alert, Tabs, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import AuthService from "../../services/Auth.service";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import ReCAPTCHA from "react-google-recaptcha";
import { updateUserInfo } from "../../redux/features/profileSlice";

const SignIn = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (values, role) => {
    if (!recaptchaValue) {
      message.error("Vui lòng xác thực Captcha trước khi đăng nhập!");
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      let response;
      switch (role) {
        case "customer":
          response = await AuthService.customer.login(
            values.username,
            values.password,
            recaptchaValue
          );
          if (response.data) {
            dispatch(updateUserInfo(response.data));
            navigate("/customer");
          }
          break;

        case "employee":
          response = await AuthService.employee.login(
            values.username,
            values.password,
            recaptchaValue
          );
          if (response.data) {
            dispatch(updateUserInfo(response.data));
            navigate("/employee");
          }
          break;

        case "admin":
          response = await AuthService.admin.login(
            values.username,
            values.password,
            recaptchaValue
          );
          if (response.data) {
            dispatch(updateUserInfo(response.data));
            navigate("/admin");
          }
          break;
      }

      if (response.error) {
        setErrorMessage(response.error);
      }
    } catch (error) {
      setErrorMessage(error.message || "Đã xảy ra lỗi khi đăng nhập");
    } finally {
      setLoading(false);
    }
  };

  const onRecaptchaChange = (value) => {
    setRecaptchaValue(value);
    if (value) {
      message.success("Xác thực Captcha thành công!");
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
        <a
          className="login-form-forgot"
          onClick={() => {
            navigate("/forgot-password");
          }}
          style={{ float: "right" }}
        >
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
