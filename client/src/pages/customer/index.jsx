import React, { useState } from "react";
import useSocket from "../../hooks/useSocket";

const App = () => {
  const [myId, setMyId] = useState(""); // ID người dùng
  const [recipientId, setRecipientId] = useState(""); // ID người nhận
  const { state, isInitialized, initialize, send } = useSocket();

  const handleInitialize = () => {
    try {
      initialize(myId); // Khởi tạo socket với ID của người dùng
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSend = () => {
    try {
      send(recipientId); // Gửi thông điệp tới ID người nhận
    } catch (error) {
      alert(error.message);
    }
  };
  console.log("myId", myId);
  console.log("state", state);
  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Socket Hook Example</h1>

      {!isInitialized ? (
        <div>
          <input
            type="text"
            placeholder="Nhập ID của bạn"
            value={myId}
            onChange={(e) => setMyId(e.target.value)}
            style={{ padding: "8px", fontSize: "16px", marginRight: "8px" }}
          />
          <button
            onClick={handleInitialize}
            style={{
              padding: "8px 16px",
              fontSize: "16px",
              backgroundColor: "blue",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Xác nhận ID
          </button>
        </div>
      ) : (
        <div>
          <p>My ID: {myId}</p>
          <p>Current State: {state ? "ON" : "OFF"}</p>
          <input
            type="text"
            placeholder="Nhập ID người nhận"
            value={recipientId}
            onChange={(e) => setRecipientId(e.target.value)}
            style={{ padding: "8px", fontSize: "16px", marginRight: "8px" }}
          />
          <button
            onClick={handleSend}
            style={{
              padding: "8px 16px",
              fontSize: "16px",
              backgroundColor: "green",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Gửi
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
