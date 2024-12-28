import React, { useState } from "react";
import { Form, Input, Button, Alert } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";

const SignUp = () => {
  const [step, setStep] = useState(1); // Step 1: Signup Form, Step 2: OTP Verification
  const [errorMessage, setErrorMessage] = useState(null);

  const onFinishSignup = (values) => {
    console.log("Signup Form Submitted: ", values);
    setStep(2); // Move to OTP Verification step
  };

  const onFinishOTP = (values) => {
    console.log("OTP Submitted: ", values);
    alert("Signup successful!");
  };

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
      <div
        style={{
          width: 400,
          padding: 24,
          backgroundColor: "#fff",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          borderRadius: 8,
        }}
      >
        {step === 1 && (
          <>
            <h1
              className="text-xl font-semibold mb-4"
              style={{ textAlign: "center" }}
            >
              Sign Up
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
            <Form name="signup" onFinish={onFinishSignup}>
              <Form.Item
                name="fullName"
                rules={[
                  { required: true, message: "Please input your full name!" },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Full Name"
                />
              </Form.Item>
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                    type: "email",
                  },
                ]}
              >
                <Input
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  placeholder="Email"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                >
                  Sign Up
                </Button>
              </Form.Item>
            </Form>
          </>
        )}

        {step === 2 && (
          <>
            <h1
              className="text-xl font-semibold mb-4"
              style={{ textAlign: "center" }}
            >
              Verify OTP
            </h1>
            <Form name="otp" onFinish={onFinishOTP}>
              <Form.Item
                name="otp"
                rules={[
                  {
                    required: true,
                    message: "Please input the OTP sent to your email!",
                  },
                ]}
              >
                <Input
                  placeholder="Enter OTP"
                  maxLength={6}
                  style={{ textAlign: "center" }}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                >
                  Verify OTP
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </div>
    </div>
  );
};

export default SignUp;
