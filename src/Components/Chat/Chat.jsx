import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Chat.css';

const ChatBox = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getToken = () => localStorage.getItem('tkn');

  useEffect(() => {
    const currentSessionId = localStorage.getItem('chat_session_id');
    const token = getToken();

    console.log('Fetching history for session:', currentSessionId);

    if (currentSessionId && token) {
      axios
        .get(`https://campus-finder.runasp.net/api/Chatbot/history/${currentSessionId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.data.statusCode === 200 && res.data.data?.$values) {
            const history = res.data.data.$values.map((msg) => ({
              text: msg.content,
              sender: msg.role.toLowerCase(),
              timestamp: msg.timestamp,
            }));
            setMessages(history);
          }
        })
        .catch((err) => console.error('Error fetching chat history:', err));
    }
  }, []);

  const handleSend = () => {
    if (message.trim() === '') return;

    const userMessage = {
      text: message,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);

    const token = getToken();
    const sessionId = localStorage.getItem('chat_session_id') || '';

    axios
      .post(
        'https://campus-finder.runasp.net/api/Chatbot/ask',
        {
          sessionId: sessionId,
          message: message,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.data.statusCode === 200 && res.data.data?.answer) {
          const botMessage = {
            text: res.data.data.answer,
            sender: 'bot',
            timestamp: new Date().toISOString(),
          };
          setMessages((prev) => [...prev, botMessage]);

          // Always update sessionId
          if (res.data.data.sessionId) {
            localStorage.setItem('chat_session_id', res.data.data.sessionId);
            console.log('Updated sessionId:', res.data.data.sessionId);
          }
        }
      })
      .catch((err) => console.error('Error sending message:', err))
      .finally(() => setIsLoading(false));
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

          {isLoading && (
            <div className="chat-msg bot">
              <span className="loader-dot"></span>
              <span className="loader-dot"></span>
              <span className="loader-dot"></span>
            </div>
          )}
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
