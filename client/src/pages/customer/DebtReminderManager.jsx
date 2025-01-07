import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Popconfirm,
  Tag,
  message,
  Modal,
  Form,
  Input,
  InputNumber,
  Tabs,
  Space,
  AutoComplete,
} from "antd";
import { useSelector } from "react-redux";
import PublicService from "../../services/Public.service";
import CustomerService from "../../services/Customer.service";
import useSocket from "../../hooks/useSocket";

const { TabPane } = Tabs;

const DebtReminderManager = () => {
  // const mycustomerID = "675babee10466a57086768ed";
  const mycustomerID = useSelector((state) => state.profile._id);
  const MyFullName = useSelector((state) => state.profile.full_name);

  const [sentDebtReminders, setSentDebtReminders] = useState([]);
  const [receivedDebtReminders, setReceivedDebtReminders] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [customer, setCustomer] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isCollectionModalVisible, setIsCollectionModalVisible] =
    useState(false);
  const [selectedDebt, setSelectedDebt] = useState(null);
  const [collectionForm] = Form.useForm();
  const [isOTPModalVisible, setIsOTPModalVisible] = useState(false);
  const [otpForm] = Form.useForm();
  const [otpId, setOtpId] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  //

  const { state, initialize, send } = useSocket();

  //
  const fetchAcount = async () => {
    try {
      const response = await CustomerService.getAllCustomer();
      if (response.data) {
        setCustomer(response.data);
      }
    } catch (error) {
      message.error("Không thể tải danh sách tài khoản");
    }
  };

  const fetchDebtReminders = async () => {
    try {
      const sentResponse = await PublicService.debt.getAllDebt_send(
        mycustomerID
      );
      const receivedResponse = await PublicService.debt.getAllDebt_received(
        mycustomerID
      );

      if (sentResponse.data) {
        setSentDebtReminders(sentResponse.data);
      }
      if (receivedResponse.data) {
        setReceivedDebtReminders(receivedResponse.data);
      }
    } catch (error) {
      message.error("Không thể tải danh sách nhắc nợ");
    }
  };

  const handleDebtCollection = async (values) => {
    try {
      await CustomerService.notification.createNotification(
        selectedDebt.debtor, // ID người nợ
        "Nhắc nhở thanh toán nợ",
        values.message
      );
      message.success("Đã gửi thông báo đòi nợ thành công!");
      setIsCollectionModalVisible(false);
      send(selectedDebt.debtor);
      collectionForm.resetFields();
    } catch (error) {
      message.error("Gửi thông báo đòi nợ thất bại");
    }
  };

  useEffect(() => {
    initialize(mycustomerID);
    fetchDebtReminders();
    fetchAcount();
  }, []);
  const handleCreateDebt = async (values) => {
    try {
      const response = await PublicService.debt.createDebtReminder(
        mycustomerID,
        values.debtor,
        values.amount,
        values.message,
        "Pending"
      );

      if (response.data) {
        message.success("Tạo nhắc nợ thành công!");
        setIsModalVisible(false);
        form.resetFields();
        fetchDebtReminders();
        send(values.debtor);
      } else {
        message.error("Tạo nhắc nợ thất bại!");
      }
    } catch (error) {
      message.error("Đã xảy ra lỗi khi tạo nhắc nợ");
    }
  };

  const handleDelete = async (record) => {
    try {
      await PublicService.debt.deleteDebtReminder(record._id);
      setSentDebtReminders((prev) =>
        prev.filter((item) => item._id !== record._id)
      );
      setReceivedDebtReminders((prev) =>
        prev.filter((item) => item._id !== record._id)
      );
      message.success("Xóa nhắc nợ thành công");
    } catch (error) {
      message.error("Xóa nhắc nợ thất bại");
    }
  };

  const handlePaymentClick = async (debtId) => {
    setIsProcessing(true);
    // message.info(mycustomerID); // err001

    try {
      const response = await PublicService.debt.getCodeDebtOTP(mycustomerID);
      if (response.data) {
        setOtpId(response.data._id);
        setIsOTPModalVisible(true);
      } else {
        message.error("Không thể tạo mã OTP");
      }
    } catch (error) {
      message.error("Có lỗi xảy ra khi tạo mã OTP");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleOTPSubmit = async (values) => {
    setIsProcessing(true);
    try {
      const response = await PublicService.debt.payDebtReminder(
        otpId,
        values.otpCode
      );
      if (response.data) {
        message.success("Thanh toán thành công!");
        setIsOTPModalVisible(false);
        otpForm.resetFields();
        fetchDebtReminders(); // Refresh danh sách nợ
      } else {
        message.error("Mã OTP không chính xác");
      }
    } catch (error) {
      message.error("Có lỗi xảy ra khi thanh toán");
    } finally {
      setIsProcessing(false);
    }
  };

  const columns = {
    sent: [
      {
        title: "Người Nợ",
        dataIndex: "debtor_name",
        key: "debtor_name",
      },
      {
        title: "Số Tiền",
        dataIndex: "amount",
        key: "amount",
        render: (amount) => `${amount.toLocaleString()} VND`,
      },
      {
        title: "Lời Nhắn",
        dataIndex: "message",
        key: "message",
      },
      {
        title: "Ngày Tạo",
        dataIndex: "createdAt",
        key: "createdAt",
        render: (date) => new Date(date).toLocaleString(),
      },
      {
        title: "Trạng Thái",
        dataIndex: "status",
        key: "status",
        render: (status) => (
          <Tag color={status === "Pending" ? "orange" : "green"}>{status}</Tag>
        ),
      },
      {
        title: "Hành Động",
        key: "action",
        render: (_, record) => (
          <Space>
            {record.status === "Pending" && (
              <Button
                type="primary"
                onClick={() => {
                  setSelectedDebt(record);
                  setIsCollectionModalVisible(true);
                }}
              >
                Đòi Nợ
              </Button>
            )}
            <Popconfirm
              title="Bạn có chắc chắn muốn xóa không?"
              onConfirm={() => handleDelete(record)}
              okText="Xóa"
              cancelText="Hủy"
            >
              <Button type="link" danger>
                Xóa
              </Button>
            </Popconfirm>
          </Space>
        ),
      },
    ],
    received: [
      {
        title: "Chủ Nợ",
        dataIndex: "creditor_name",
        key: "creditor_name",
      },
      {
        title: "Số Tiền",
        dataIndex: "amount",
        key: "amount",
        render: (amount) => `${amount.toLocaleString()} VND`,
      },
      {
        title: "Lời Nhắn",
        dataIndex: "message",
        key: "message",
      },
      {
        title: "Ngày Tạo",
        dataIndex: "createdAt",
        key: "createdAt",
        render: (date) => new Date(date).toLocaleString(),
      },
      {
        title: "Trạng Thái",
        dataIndex: "status",
        key: "status",
        render: (status) => (
          <Tag color={status === "Pending" ? "orange" : "green"}>{status}</Tag>
        ),
      },
      {
        title: "Hành Động",
        key: "action",
        render: (_, record) => (
          <Space>
            <Button
              type="primary"
              onClick={() => handlePaymentClick(record._id)}
            >
              Thanh toán
            </Button>
          </Space>
        ),
      },
    ],
  };

  const getCustomerOptions = (searchText) => {
    if (!searchText) return [];

    return customer
      .filter(
        (cust) =>
          cust.full_name.toLowerCase().includes(searchText.toLowerCase()) ||
          cust._id.includes(searchText)
      )
      .map((cust) => ({
        value: cust._id,
        label: (
          <div className="flex justify-between">
            <span>{cust.full_name}</span>
            <span className="text-gray-400">{cust._id}</span>
          </div>
        ),
        fullData: cust,
      }));
  };

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handleSelect = (value, option) => {
    form.setFieldsValue({
      debtor: value,
      debtorName: option.fullData.full_name,
    });
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Quản Lý Nhắc Nợ</h1>
        <Button type="primary" onClick={() => setIsModalVisible(true)}>
          Tạo Nhắc Nợ
        </Button>
      </div>

      <Tabs defaultActiveKey="sent">
        <TabPane tab="Danh Sách Người Đang Nợ Bạn" key="sent">
          <Table
            columns={columns.sent}
            dataSource={sentDebtReminders}
            rowKey="_id"
          />
        </TabPane>
        <TabPane tab="Danh Sách Bạn Đang Nợ" key="received">
          <Table
            columns={columns.received}
            dataSource={receivedDebtReminders}
            rowKey="_id"
          />
        </TabPane>
      </Tabs>

      {/* Modal Đòi Nợ */}
      <Modal
        title="Gửi Thông Báo Đòi Nợ"
        open={isCollectionModalVisible}
        onOk={() => collectionForm.submit()}
        onCancel={() => {
          setIsCollectionModalVisible(false);
          collectionForm.resetFields();
          setSelectedDebt(null);
        }}
        okText="Gửi"
        cancelText="Hủy"
      >
        <Form
          form={collectionForm}
          layout="vertical"
          onFinish={handleDebtCollection}
        >
          {selectedDebt && (
            <div className="mb-4">
              <p>
                <strong>Người nợ:</strong> {selectedDebt.debtor_name}
              </p>
              <p>
                <strong>Số tiền:</strong> {selectedDebt.amount.toLocaleString()}{" "}
                VND
              </p>
              <p>
                <strong>Ngày tạo:</strong>{" "}
                {new Date(selectedDebt.createdAt).toLocaleString()}
              </p>
            </div>
          )}

          <Form.Item
            name="message"
            label="Lời Nhắc"
            initialValue={
              selectedDebt
                ? `Vui lòng thanh toán khoản nợ ${
                    selectedDebt?.amount?.toLocaleString() || ""
                  } VND cho ${MyFullName}`
                : ""
            }
            rules={[{ required: true, message: "Vui lòng nhập lời nhắc!" }]}
          >
            <Input.TextArea
              placeholder="Nhập lời nhắc"
              rows={4}
              maxLength={200}
              showCount
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal Tạo Nhắc Nợ */}
      <Modal
        title="Tạo Nhắc Nợ Mới"
        open={isModalVisible}
        onOk={() => form.submit()}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
        }}
        okText="Tạo"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical" onFinish={handleCreateDebt}>
          <Form.Item
            name="debtorName"
            label="Tên Người Nợ"
            rules={[{ required: true, message: "Vui lòng chọn người nợ!" }]}
          >
            <AutoComplete
              placeholder="Nhập tên để tìm kiếm"
              options={getCustomerOptions(searchText)}
              onSearch={handleSearch}
              onSelect={handleSelect}
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            name="debtor"
            label="ID Người Nợ"
            rules={[{ required: true, message: "Vui lòng chọn người nợ!" }]}
          >
            <Input placeholder="ID sẽ tự động điền khi chọn tên" disabled />
          </Form.Item>

          <Form.Item
            name="amount"
            label="Số Tiền"
            rules={[
              { required: true, message: "Vui lòng nhập số tiền!" },
              {
                validator: async (_, value) => {
                  if (value <= 0) {
                    throw new Error("Số tiền phải lớn hơn 0!");
                  }
                },
              },
            ]}
          >
            <InputNumber
              style={{ width: "100%" }}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              placeholder="Nhập số tiền"
            />
          </Form.Item>

          <Form.Item
            name="message"
            label="Lời Nhắn"
            rules={[{ required: true, message: "Vui lòng nhập lời nhắn!" }]}
          >
            <Input.TextArea placeholder="Nhập lời nhắn" />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal nhập OTP */}
      <Modal
        title="Xác nhận thanh toán"
        open={isOTPModalVisible}
        onCancel={() => {
          setIsOTPModalVisible(false);
          otpForm.resetFields();
        }}
        footer={null}
      >
        <Form form={otpForm} onFinish={handleOTPSubmit} layout="vertical">
          <div className="mb-4">
            <p>Mã OTP đã được gửi đến email của bạn</p>
            <p>Vui lòng kiểm tra và nhập mã để xác nhận thanh toán</p>
          </div>

          <Form.Item
            name="otpCode"
            label="Mã OTP"
            rules={[
              { required: true, message: "Vui lòng nhập mã OTP!" },
              { len: 6, message: "Mã OTP phải có 6 ký tự!" },
            ]}
          >
            <Input placeholder="Nhập mã OTP" maxLength={6} />
          </Form.Item>

          <Form.Item className="text-right">
            <Button
              type="default"
              onClick={() => setIsOTPModalVisible(false)}
              className="mr-2"
            >
              Hủy
            </Button>
            <Button type="primary" htmlType="submit" loading={isProcessing}>
              Xác nhận
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DebtReminderManager;
