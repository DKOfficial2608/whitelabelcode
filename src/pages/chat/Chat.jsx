// Chat.js

import React, { useState } from "react";
import "./chat.css";
import images from "../../constants/images";

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const chatList = [
    { id: 1, name: "Friend 1" },
    { id: 2, name: "Friend 2" },
    // Add more chat names as needed
  ];

  const filteredChatList = chatList.filter((chat) =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChatSelection = (chatId) => {
    setSelectedChat(chatId);
    setMessages([
      { text: "Hi there!", sender: "other" },
      { text: "Hello!", sender: "user" },
    ]);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, { text: newMessage, sender: "user" }]);
      setNewMessage("");
      // logic to send the message to the server or perform other actions here
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-sidebar">
        <input
          type="text"
          className="search_list"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <h2 className="h2_listchat">Erectile Dysfunction</h2>
        <ul>
          {filteredChatList.map((chat) => (
            <li key={chat.id} onClick={() => handleChatSelection(chat.id)}>
              <div className="user-info">
                <img
                  src={images.user_logo}
                  alt={`User Logo ${chat.name}`}
                  className="user-logo"
                />
                {/* <img src={`user_logo_${chat.id}.png`} alt={`User Logo ${chat.name}`} className="user-logo" /> */}
                <div>
                  <span className="user-name">{chat.name}</span>
                  {messages.length > 0 && (
                    <span className="last-message">
                      {messages[messages.length - 1].text}
                    </span>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="chat-main">
        <div className="chat-header">
          <img src={images.user_logo} className="user_logo" />
          {selectedChat
            ? chatList.find((chat) => chat.id === selectedChat).name
            : "Select a Chat"}
        </div>
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${
                message.sender === "user" ? "user" : "other"
              }`}
            >
              {message.text}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            placeholder="Type a message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
