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
    const [formValues, setFormValues] = useState(null);
    const [currentRole, setCurrentRole] = useState("customer");
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
                        message.success("Đăng nhập thành công!");
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
                        message.success("Đăng nhập thành công!");
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
                        message.success("Đăng nhập thành công!");
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

    const handleValuesChange = (changedValues, allValues) => {
        setFormValues(allValues);
    };

    const onRecaptchaChange = (value) => {
        setRecaptchaValue(value);
        if (value && formValues) {
            handleLogin(formValues, currentRole);
        }
    };

    const LoginForm = ({ role }) => (
        <Form
            name={`${role}_login`}
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={(values) => handleLogin(values, role)}
            onValuesChange={handleValuesChange}
        >
            <Form.Item
                name="username"
                rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập!" }]}
            >
                <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Tên đăng nhập"
                />
            </Form.Item>

            <Form.Item
                name="password"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
            >
                <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    placeholder="Mật khẩu"
                />
            </Form.Item>

            <Form.Item>
                <ReCAPTCHA
                    sitekey="6Lf30qkqAAAAAEQ8dVaN-zQBy4XtjP-VnlR3ZsJ6"
                    onChange={onRecaptchaChange}
                />
            </Form.Item>

            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Ghi nhớ đăng nhập</Checkbox>
                </Form.Item>
                <a className="login-form-forgot" href="#" style={{ float: "right" }}>
                    Quên mật khẩu?
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
                    Đăng nhập
                </Button>
            </Form.Item>
        </Form>
    );

    const items = [
        {
            key: "customer",
            label: "Khách hàng",
            children: <LoginForm role="customer" />,
        },
        {
            key: "employee",
            label: "Nhân viên",
            children: <LoginForm role="employee" />,
        },
        {
            key: "admin",
            label: "Quản trị",
            children: <LoginForm role="admin" />,
        },
    ];

    const handleTabChange = (activeKey) => {
        setCurrentRole(activeKey);
        setFormValues(null);
        setRecaptchaValue(null);
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
                <h1
                    className="text-xl font-semibold mb-4"
                    style={{ textAlign: "center" }}
                >
                    Đăng nhập
                </h1>
                {errorMessage && (
                    <Alert
                        message="Lỗi"
                        description={errorMessage}
                        type="error"
                        showIcon
                        closable
                        onClose={() => setErrorMessage(null)}
                        style={{ marginBottom: 16 }}
                    />
                )}

                <Tabs
                    defaultActiveKey="customer"
                    items={items}
                    centered
                    onChange={handleTabChange}
                />
            </div>
        </div>
    );
};

export default SignIn;
