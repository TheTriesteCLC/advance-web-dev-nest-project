import React, { useState } from "react";
import { Button, Modal, Form, Input, notification } from "antd";

const user = {
  FullName: "Nguyen Van A",
  UserName: "nguyenvana",
  Phone: "0123456789",
  Email: "nguyenvana@gmail.com",
  Password: "123456",
};

const Profile = () => {
  const [isEditProfileVisible, setIsEditProfileVisible] = useState(false);
  const [isEditPasswordVisible, setIsEditPasswordVisible] = useState(false);
  const [isOTPVisible, setIsOTPVisible] = useState(false);
  const [userData, setUserData] = useState(user);

  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [otpForm] = Form.useForm();

  const handleEditProfile = () => {
    setIsEditProfileVisible(true);
    form.setFieldsValue(userData);
  };

  const handleEditPassword = () => {
    setIsEditPasswordVisible(true);
    passwordForm.resetFields();
  };

  const handleSaveProfile = () => {
    form.validateFields().then((values) => {
      setUserData({ ...userData, ...values });
      setIsEditProfileVisible(false);
    });
  };

  const handleSavePassword = () => {
    passwordForm.validateFields().then(() => {
      setIsEditPasswordVisible(false);
      setIsOTPVisible(true); // Show OTP modal
    });
  };

  const handleVerifyOTP = () => {
    otpForm.validateFields().then((values) => {
      if (values.otp === "123456") {
        // Example static OTP
        notification.success({
          message: "Mật khẩu đã được thay đổi thành công!",
        });
        setIsOTPVisible(false);
      } else {
        notification.error({ message: "Mã OTP không chính xác!" });
      }
    });
  };

  return (
    <div className="flex justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-xl font-bold mb-4">Thông Tin Người Dùng</h1>
        <div className="mb-4">
          <p>
            <strong>Họ và tên:</strong> {userData.FullName}
          </p>
          <p>
            <strong>Tên đăng nhập:</strong> {userData.UserName}
          </p>
          <p>
            <strong>Số điện thoại:</strong> {userData.Phone}
          </p>
          <p>
            <strong>Email:</strong> {userData.Email}
          </p>
        </div>
        <Button type="primary" onClick={handleEditProfile} className="mr-2">
          Chỉnh Sửa Thông Tin
        </Button>
        <Button type="default" onClick={handleEditPassword}>
          Chỉnh Sửa Mật Khẩu
        </Button>

        {/* Modal for Editing Profile */}
        <Modal
          title="Chỉnh Sửa Thông Tin"
          visible={isEditProfileVisible}
          onOk={handleSaveProfile}
          onCancel={() => setIsEditProfileVisible(false)}
          okText="Lưu"
          cancelText="Hủy"
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="FullName"
              label="Họ và Tên"
              rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
            >
              <Input placeholder="Nhập họ và tên" />
            </Form.Item>
            <Form.Item
              name="Phone"
              label="Số Điện Thoại"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại!" },
              ]}
            >
              <Input placeholder="Nhập số điện thoại" />
            </Form.Item>
            <Form.Item
              name="Email"
              label="Email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Vui lòng nhập email hợp lệ!",
                },
              ]}
            >
              <Input placeholder="Nhập email" />
            </Form.Item>
          </Form>
        </Modal>

        {/* Modal for Editing Password */}
        <Modal
          title="Chỉnh Sửa Mật Khẩu"
          visible={isEditPasswordVisible}
          onOk={handleSavePassword}
          onCancel={() => setIsEditPasswordVisible(false)}
          okText="Lưu"
          cancelText="Hủy"
        >
          <Form form={passwordForm} layout="vertical">
            <Form.Item
              name="newPassword"
              label="Mật Khẩu Mới"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu mới!" },
              ]}
            >
              <Input.Password placeholder="Nhập mật khẩu mới" />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              label="Xác Nhận Mật Khẩu"
              dependencies={["newPassword"]}
              rules={[
                { required: true, message: "Vui lòng xác nhận mật khẩu!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Mật khẩu xác nhận không khớp!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Xác nhận mật khẩu mới" />
            </Form.Item>
          </Form>
        </Modal>

        {/* Modal for OTP Verification */}
        <Modal
          title="Xác Minh OTP"
          visible={isOTPVisible}
          onOk={handleVerifyOTP}
          onCancel={() => setIsOTPVisible(false)}
          okText="Xác Nhận"
          cancelText="Hủy"
        >
          <Form form={otpForm} layout="vertical">
            <Form.Item
              name="otp"
              label="Mã OTP"
              rules={[{ required: true, message: "Vui lòng nhập mã OTP!" }]}
            >
              <Input placeholder="Nhập mã OTP" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default Profile;
