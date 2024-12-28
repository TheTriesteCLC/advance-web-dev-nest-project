import { useState, useEffect, useCallback } from "react";
import { io } from "socket.io-client";

const socket = io('http://localhost:3000'); 
const useSocket = () => {
  const [state, setState] = useState(true); // Trạng thái nhận được (true/false)
  const [isInitialized, setIsInitialized] = useState(false); // Kiểm tra đã khởi tạo chưa

  // Khởi tạo socket với ID người dùng
  const initialize = useCallback((id) => {
    if (!id || id.trim() === "") {
      throw new Error("ID không được bỏ trống");
    }
    socket.emit("initialize", { id });
    setIsInitialized(true);
  }, []);

  // Hàm gửi dữ liệu tới backend
  const send = useCallback((recipientId) => {
    if (!recipientId || recipientId.trim() === "") {
      throw new Error("ID người nhận không được bỏ trống");
    }
    socket.emit("send", { recipientId });
  }, []);

  // Lắng nghe sự kiện nhận dữ liệu
  useEffect(() => {
    const handleReceive = (newState) => {
      setState(newState); // Cập nhật trạng thái nhận được
    };

    socket.on("receive", handleReceive);

    // Dọn dẹp socket khi component bị hủy
    return () => {
      socket.off("receive", handleReceive);
    };
  }, []);

  return { state, isInitialized, initialize, send };
};

export default useSocket;
