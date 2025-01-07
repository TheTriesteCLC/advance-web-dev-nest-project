import React, { useState, useEffect } from "react";
import { Tabs, Form, Input, Button, Select, message, Modal } from "antd";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import AccountService from "../../services/Account.service";
import PublicService from "../../services/Public.service";
import { debounce } from "lodash";
const { TabPane } = Tabs;
const { Option } = Select;

const FeeSelect = () => (
  <Form.Item
    name="feeType"
    label="Phí giao dịch"
    rules={[{ required: true, message: "Vui lòng chọn người trả phí!" }]}
  >
    <Select placeholder="Chọn người trả phí">
      <Option value="sender">Người gửi trả phí</Option>
      <Option value="receiver">Người nhận trả phí</Option>
    </Select>
  </Form.Item>
);

const AccountAutocomplete = ({ form, onAccountSelect }) => {
  const [accountNumber, setAccountNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);

  const debouncedFetchInfo = debounce(async (accNumber) => {
    if (!accNumber) {
      setFullName("");
      form.setFieldsValue({ recipientName: "" });
      return;
    }

    setLoading(true);
    try {
      const response = await AccountService.getInfoAccountNumberID(accNumber);
      if (response.data) {
        setFullName(response.data.full_name);
        form.setFieldsValue({
          recipientName: response.data.full_name,
          accountNumber: accNumber,
        });
        onAccountSelect && onAccountSelect(response.data);
      }
    } catch (error) {
      console.error("Error fetching data: ");
      setFullName("");
      form.setFieldsValue({ recipientName: "" });
    } finally {
      setLoading(false);
    }
  }, 1500);

  useEffect(() => {
    return () => {
      debouncedFetchInfo.cancel();
    };
  }, []);

  const handleAccountNumberChange = (e) => {
    const value = e.target.value;
    setAccountNumber(value);
    if (value) {
      debouncedFetchInfo(value);
    } else {
      setFullName("");
      form.setFieldsValue({ recipientName: "" });
    }
  };

  return (
    <>
      <Form.Item
        name="accountNumber"
        label="Số tài khoản"
        rules={[{ required: true, message: "Vui lòng nhập số tài khoản!" }]}
      >
        <Input
          placeholder="Nhập số tài khoản"
          onChange={handleAccountNumberChange}
          value={accountNumber}
        />
      </Form.Item>

      <Form.Item
        name="recipientName"
        label="Tên người nhận"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập số tài khoản để hiển thị tên người nhận!",
          },
        ]}
      >
        <Input
          placeholder="Tên người nhận sẽ tự động hiển thị"
          readOnly
          value={fullName}
          suffix={loading && <span>Đang tìm...</span>}
        />
      </Form.Item>
    </>
  );
};

const InternalBankTransfer = ({ form, handleSubmit }) => {
  const [accountNumber, setAccountNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const accountBanking = useSelector((state) => state.accountBanking);
  const myAccount = accountBanking?.account_number || "445566778899";

  const [saveRecipientModal, setSaveRecipientModal] = useState(false);
  const [recipientForm] = Form.useForm();
  const [lastTransferInfo, setLastTransferInfo] = useState(null);
  const my_id = useSelector((state) => state.profile._id);

  const fetchInfo = async (accNumber) => {
    if (accNumber === myAccount) {
      message.error("Không thể chuyển tiền cho chính mình!");
      setFullName("");
      form.setFieldsValue({ recipientName: "" });
      return;
    }

    try {
      const response = await AccountService.getInfoAccountNumberID(accNumber);
      if (response.data) {
        setFullName(response.data.full_name);
        form.setFieldsValue({
          recipientName: response.data.full_name,
          accountNumber: accNumber,
        });
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
      setFullName("");
      form.setFieldsValue({ recipientName: "" });
    }
  };

  const handleTransfer = async (values) => {
    if (!myAccount) {
      message.error("Không tìm thấy thông tin tài khoản của bạn!");
      return;
    }

    setLoading(true);
    try {
      const payer =
        values.feeType === "sender" ? myAccount : values.accountNumber;

      const amount = parseInt(values.amount, 10);

      if (isNaN(amount) || amount <= 0) {
        message.error("Số tiền không hợp lệ!");
        return;
      }

      const response = await PublicService.transaction.InternalTransfer(
        myAccount,
        values.accountNumber,
        amount,
        values.content || "Chuyển tiền",
        payer
      );

      if (response.data) {
        message.success("Chuyển khoản thành công!");
        setLastTransferInfo({
          account_number: values.accountNumber,
          nickname: fullName,
          bank: "SACOMBANK",
        });
        setSaveRecipientModal(true);
        form.resetFields();
        setAccountNumber("");
        setFullName("");
      } else if (response.error) {
        message.error(response.error);
      }
    } catch (error) {
      message.error("Có lỗi xảy ra khi chuyển khoản");
      console.error("Error transfer: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveRecipient = async () => {
    try {
      const values = await recipientForm.validateFields();
      const response = await PublicService.reciept.createReciept(
        my_id,
        lastTransferInfo.account_number,
        values.nickname || lastTransferInfo.nickname,
        lastTransferInfo.bank
      );

      if (response.data) {
        message.success("Đã lưu người nhận vào danh sách!");
      }
    } catch (error) {
      message.error("Không thể lưu người nhận");
    } finally {
      setSaveRecipientModal(false);
      recipientForm.resetFields();
    }
  };

  const handleAccountNumberChange = (e) => {
    const value = e.target.value;
    setAccountNumber(value);
    if (value) {
      fetchInfo(value);
    } else {
      setFullName("");
      form.setFieldsValue({ recipientName: "" });
    }
  };

  useEffect(() => {
    if (location.state?.accountNumber) {
      const accNumber = location.state.accountNumber;
      setAccountNumber(accNumber);
      fetchInfo(accNumber);
    }
  }, [location.state]);
  return (
    <>
      <Form form={form} layout="vertical" onFinish={handleTransfer}>
        <AccountAutocomplete
          form={form}
          onAccountSelect={(data) => setFullName(data.full_name)}
        />

        <Form.Item
          name="amount"
          label="Số tiền"
          rules={[
            { required: true, message: "Vui lòng nhập số tiền!" },
            {
              validator: async (_, value) => {
                const amount = parseInt(value, 10);
                if (isNaN(amount) || amount <= 0) {
                  throw new Error("Số tiền phải lớn hơn 0!");
                }
                if (amount % 1 !== 0) {
                  throw new Error("Số tiền phải là số nguyên!");
                }
              },
            },
          ]}
        >
          <Input type="number" placeholder="Nhập số tiền" min={1} step={1} />
        </Form.Item>

        <Form.Item
          name="content"
          label="Nội dung chuyển khoản"
          rules={[{ required: true, message: "Vui lòng nhập nội dung!" }]}
        >
          <Input.TextArea placeholder="Nhập nội dung chuyển khoản" />
        </Form.Item>

        <FeeSelect />

        <Button
          type="primary"
          htmlType="submit"
          className="w-full"
          loading={loading}
          disabled={!accountNumber || !fullName}
        >
          Chuyển khoản
        </Button>
      </Form>

      <Modal
        title="Lưu Thông Tin Người Nhận"
        open={saveRecipientModal}
        onOk={() => recipientForm.submit()}
        onCancel={() => {
          setSaveRecipientModal(false);
          recipientForm.resetFields();
        }}
        okText="Lưu"
        cancelText="Không lưu"
      >
        {lastTransferInfo && (
          <Form
            form={recipientForm}
            layout="vertical"
            onFinish={handleSaveRecipient}
            initialValues={{
              nickname: lastTransferInfo.nickname,
            }}
          >
            <p className="mb-4">
              Bạn có muốn lưu người này vào danh sách người nhận không?
            </p>
            <div className="mb-4">
              <p>
                <strong>Số tài khoản:</strong> {lastTransferInfo.account_number}
              </p>
              <p>
                <strong>Tên:</strong> {lastTransferInfo.nickname}
              </p>
              <p>
                <strong>Ngân hàng:</strong> {lastTransferInfo.bank}
              </p>
            </div>
            <Form.Item name="nickname" label="Tên gợi nhớ (tùy chọn)">
              <Input placeholder="Nhập tên gợi nhớ" />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </>
  );
};

const ExternalBankTransfer = ({ form }) => {
  const [loading, setLoading] = useState(false);
  const accountBanking = useSelector((state) => state.accountBanking);
  const myAccount = accountBanking?.account_number ;

  // Danh sách ngân hàng mặc định
  const defaultBanks = [
    { value: "BlueSkyBank", label: "BlueSky Bank" },
    { value: "bankB", label: "Ngân hàng B" },
    { value: "bankC", label: "Ngân hàng C" },
  ];

  const handleExternalTransfer = async (values) => {
    alert("Chuyển khoản thành công!");
    message.loading(`Đang chuyển${myAccount} khoản...`, 0);
    if (!myAccount) {
      message.error("Không tìm thấy thông tin tài khoản của bạn!");
      return;
    }

    setLoading(true);
    try {
      const amount = parseInt(values.amount, 10);

      if (isNaN(amount) || amount <= 0) {
        message.error("Số tiền không hợp lệ!");
        return;
      }

      const payer =
        values.feeType === "sender" ? myAccount : values.accountNumber;

      const response = await PublicService.transaction.ExternalTransfer(
        myAccount, // sender_number
        values.accountNumber, // receiver_number
        "sankcomba", // sender_bank
        amount, // amount
        values.content || "Chuyển tiền", // content
        payer // payer
      );

      if (response.data) {
        message.success("Chuyển khoản liên ngân hàng thành công!");
        form.resetFields();
      } else if (response.error) {
        message.error(response.error);
      }
    } catch (error) {
      message.error("Có lỗi xảy ra khi chuyển khoản");
      console.error("Error transfer:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleExternalTransfer}>
      <Form.Item
        name="bank"
        label="Chọn ngân hàng"
        rules={[
          { required: true, message: "Vui lòng chọn hoặc nhập tên ngân hàng!" },
        ]}
      >
        <Select
          showSearch
          mode="tags"
          style={{ width: "100%" }}
          placeholder="Chọn hoặc nhập tên ngân hàng"
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
        >
          {defaultBanks.map((bank) => (
            <Option key={bank.value} value={bank.value} label={bank.label}>
              {bank.label}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <AccountAutocomplete form={form} />

      <Form.Item
        name="amount"
        label="Số tiền"
        rules={[
          { required: true, message: "Vui lòng nhập số tiền!" },
          {
            validator: async (_, value) => {
              const amount = parseInt(value, 10);
              if (isNaN(amount) || amount <= 0) {
                throw new Error("Số tiền phải lớn hơn 0!");
              }
              if (amount % 1 !== 0) {
                throw new Error("Số tiền phải là số nguyên!");
              }
            },
          },
        ]}
      >
        <Input
          type="number"
          placeholder="Nhập số tiền"
          min={1}
          step={1}
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
        />
      </Form.Item>

      <Form.Item
        name="content"
        label="Nội dung chuyển khoản"
        rules={[{ required: true, message: "Vui lòng nhập nội dung!" }]}
      >
        <Input.TextArea placeholder="Nhập nội dung chuyển khoản" />
      </Form.Item>

      <FeeSelect />

      <Button
        type="primary"
        htmlType="submit"
        className="w-full"
        loading={loading}
      >
        Chuyển khoản liên ngân hàng
      </Button>
    </Form>
  );
};

const Transfer = () => {
  const [form] = Form.useForm();
  const [currentTab, setCurrentTab] = useState("internalBank");

  const handleSubmit = (values) => {
    console.log("Form values: ", values);
    const feeMessage =
      values.feeType === "sender" ? "Người gửi trả phí" : "Người nhận trả phí";
    alert(`Chuyển khoản thành công!\n${feeMessage}`);
    form.resetFields();
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-md">
      <Tabs
        defaultActiveKey="internalBank"
        onChange={(key) => setCurrentTab(key)}
      >
        <TabPane tab="Chuyển khoản trong ngân hàng" key="internalBank">
          <InternalBankTransfer form={form} handleSubmit={handleSubmit} />
        </TabPane>

        <TabPane tab="Chuyển khoản ngân hàng khác" key="externalBank">
          <ExternalBankTransfer form={form} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Transfer;
