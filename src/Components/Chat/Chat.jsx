import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Chat.css';

const ChatBox = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const getToken = () => localStorage.getItem('tkn');

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const sessionId = localStorage.getItem('chat_session_id');
    const token = getToken();

    if (sessionId && token) {
      axios
        .get(`https://campus-finder.runasp.net/api/Chatbot/history/${sessionId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.data.statusCode === 200) {
            const history = res.data.data.map((msg) => ({
              text: msg.content,
              sender: msg.role.toLowerCase(),
              timestamp: msg.timestamp,
            }));
            setMessages(history);
          } else {
            console.error('Error fetching chat history:', res.data);
          }
        })
        .catch((err) => console.error('Error:', err));
    }
  }, []);

  const handleSend = () => {
    if (message.trim() === '') return;

    const userMsg = {
      text: message,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setMessage('');

    const sessionId = localStorage.getItem('chat_session_id');
    const token = getToken();

    if (sessionId && token) {
      axios
        .post(
          `https://campus-finder.runasp.net/api/Chatbot/ask`,
          {
            message,
            sessionId,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if (res.data.statusCode === 200 && res.data.data.answer) {
            setMessages((prev) => [
              ...prev,
              {
                text: res.data.data.answer,
                sender: 'bot',
                timestamp: new Date().toISOString(),
              },
            ]);
          }
        })
        .catch((err) => console.error('Error sending message:', err));
    }
  };

  return (
    <div className="chatbox-container">
      <div className="chatbox-inner">
        <h2 className="chatbox-title">How Can I Help You?</h2>

        <div className="chatbox-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-msg ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="chatbox-input-wrapper">
          <textarea
            className="chatbox-input"
            placeholder="Write Your Message.."
            value={message}
            rows={1}
            onChange={(e) => {
              setMessage(e.target.value);
              e.target.style.height = 'auto';
              e.target.style.height = e.target.scrollHeight + 'px';
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <button className="chatbox-send-btn" onClick={handleSend}>
            ➤
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
