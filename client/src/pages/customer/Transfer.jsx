import React, { useState } from "react";

const Transfer = () => {
  // State để lưu trữ các giá trị nhập
  const [bank, setBank] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [nickname, setNickname] = useState("");
  const [amount, setAmount] = useState("");

  // Danh sách các ngân hàng (có thể mở rộng tùy theo yêu cầu)
  const banks = ["Ngân hàng A", "Ngân hàng B", "Ngân hàng C"];

  // Hàm xử lý khi người dùng thay đổi ngân hàng
  const handleBankChange = (e) => {
    setBank(e.target.value);
  };

  // Hàm xử lý khi người dùng thay đổi tên người nhận
  const handleRecipientNameChange = (e) => {
    setRecipientName(e.target.value);
  };

  // Hàm xử lý khi người dùng thay đổi tên gợi nhớ
  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  // Hàm xử lý khi người dùng thay đổi số tiền
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  // Hàm xử lý khi gửi form
  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý chuyển khoản (ở đây bạn có thể tích hợp API)
    alert(`Chuyển khoản thành công!`);
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Chuyển khoản ngân hàng</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Chọn ngân hàng */}
        <div>
          <label
            htmlFor="bank"
            className="block text-sm font-medium text-gray-700"
          >
            Chọn ngân hàng
          </label>
          <select
            id="bank"
            value={bank}
            onChange={handleBankChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">-- Chọn ngân hàng --</option>
            {banks.map((bankOption, index) => (
              <option key={index} value={bankOption}>
                {bankOption}
              </option>
            ))}
          </select>
        </div>

        {/* Nhập tên người nhận */}
        <div>
          <label
            htmlFor="recipientName"
            className="block text-sm font-medium text-gray-700"
          >
            Tên người nhận
          </label>
          <input
            type="text"
            id="recipientName"
            value={recipientName}
            onChange={handleRecipientNameChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Nhập tên người nhận"
          />
        </div>

        {/* Nhập tên gợi nhớ */}
        <div>
          <label
            htmlFor="nickname"
            className="block text-sm font-medium text-gray-700"
          >
            Tên gợi nhớ
          </label>
          <input
            type="text"
            id="nickname"
            value={nickname}
            onChange={handleNicknameChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Nhập tên gợi nhớ (tuỳ chọn)"
          />
        </div>

        {/* Nhập số tiền */}
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700"
          >
            Số tiền
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={handleAmountChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Nhập số tiền"
          />
        </div>

        {/* Nút gửi */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-black font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Chuyển khoản
          </button>
        </div>
      </form>
    </div>
  );
};

export default Transfer;
