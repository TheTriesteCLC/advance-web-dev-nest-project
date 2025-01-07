import React, { useState, useEffect } from "react";
import {
  Tabs,
  Form,
  Input,
  Button,
  Select,
  message,
  Modal,
  Switch,
} from "antd";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import AccountService from "../../services/Account.service";
import PublicService from "../../services/Public.service";
import { debounce } from "lodash";
const { TabPane } = Tabs;
const { Option } = Select;

const TransferService = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [isExternalTransfer, setIsExternalTransfer] = useState(false);
  const [form] = Form.useForm();

  const accountBanking = useSelector((state) => state.accountBanking);
  const myAccountNumber = accountBanking?.account_number || "445566778899";
  const [saveRecipientModal, setSaveRecipientModal] = useState(false);
  const [lastTransferInfo, setLastTransferInfo] = useState(null);

  const handleTransfer = async (values) => {
    if (!myAccountNumber) {
      message.error("Không tìm thấy thông tin tài khoản của bạn!");
      return;
    }

    setLoading(true);
    try {
      const payer =
        values.feeType === "sender" ? myAccountNumber : values.accountNumber;
      const amount = parseInt(values.amount, 10);

      if (isNaN(amount) || amount <= 0) {
        message.error("Số tiền không hợp lệ!");
        return;
      }

      const response = isExternalTransfer
        ? await PublicService.transaction.ExternalTransfer(
            myAccountNumber,
            values.accountNumber,
            values.bank,
            amount,
            values.content || "Chuyển tiền",
            payer
          )
        : await PublicService.transaction.InternalTransfer(
            myAccountNumber,
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
          bank: isExternalTransfer ? values.bank : "SACOMBANK",
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
    } finally {
      setLoading(false);
    }
  };

  return {
    accountNumber,
    setAccountNumber,
    fullName,
    setFullName,
    loading,
    setLoading,
    myAccountNumber,
    handleTransfer,
    form,
    isExternalTransfer,
    setIsExternalTransfer,
    saveRecipientModal,
    setSaveRecipientModal,
    lastTransferInfo,
    setLastTransferInfo,
  };
};

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
  const {
    accountNumber,
    setAccountNumber,
    fullName,
    setFullName,
    loading,
    setLoading,
    myAccountNumber,
  } = TransferService();

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

const Transfer = () => {
  const {
    form,
    isExternalTransfer,
    setIsExternalTransfer,
    handleTransfer,
    loading,
  } = TransferService();

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-md">
      <Form form={form} layout="vertical" onFinish={handleTransfer}>
        <Form.Item name="transferType" className="mb-4">
          <div className="flex items-center gap-2">
            <Switch
              checked={isExternalTransfer}
              onChange={setIsExternalTransfer}
            />
            <span>Chuyển khoản liên ngân hàng</span>
          </div>
        </Form.Item>

        {isExternalTransfer && (
          <Form.Item
            name="bank"
            label="Tên ngân hàng"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên ngân hàng!",
              },
            ]}
          >
            <Input placeholder="Nhập tên ngân hàng" maxLength={50} />
          </Form.Item>
        )}

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
          {isExternalTransfer ? "Chuyển khoản liên ngân hàng" : "Chuyển khoản"}
        </Button>
      </Form>
    </div>
  );
};

export default Transfer;
