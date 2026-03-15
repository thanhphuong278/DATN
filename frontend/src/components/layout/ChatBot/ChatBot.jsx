
import React, { useState } from "react";
import "./ChatBot.css";
import robot from "../../../../public/assets/icons/robot.png";

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Xin chào! Tôi có thể giúp gì cho bạn?" },
  ]);
  const [input, setInput] = useState("");

  const toggleChat = () => {
    setOpen(!open);
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };

    let botReply = "Xin lỗi, tôi chưa hiểu câu hỏi.";

    if (input.toLowerCase().includes("giờ mở cửa")) {
      botReply = "Chúng tôi mở cửa từ 8h đến 22h mỗi ngày.";
    }

    if (input.toLowerCase().includes("địa chỉ")) {
      botReply = "Chúng tôi ở 470 Trần Đại Nghĩa, Đà Nẵng.";
    }

    if (input.toLowerCase().includes("liên hệ")) {
      botReply = "Bạn có thể gọi 0123456789 hoặc email costay@gmail.com.";
    }

    const botMessage = { sender: "bot", text: botReply };

    setMessages([...messages, userMessage, botMessage]);
    setInput("");
  };

  return (
    <div>

      <div className="chat-button" onClick={toggleChat}>
        <img src={robot} alt="chatbot" />
      </div>

      {open && (
        <div className="chat-window">

          <div className="chat-header">
            <span>AI Support</span>
            <button onClick={toggleChat}>✕</button>
          </div>

          <div className="chat-body">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={msg.sender === "user" ? "user-msg" : "bot-msg"}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chat-input">
            <input
              type="text"
              placeholder="Nhập câu hỏi..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={sendMessage}>Gửi</button>
          </div>

        </div>
      )}

    </div>
  );
};

export default ChatBot;

