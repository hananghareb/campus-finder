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
    console.log('Messages changed, scrolling to bottom');
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    let sessionId = localStorage.getItem('chat_session_id');
    const token = getToken();

    console.log('Fetching chat history');
    if (sessionId && token) {
      console.log(`Session ID found: ${sessionId}`);
      axios
        .get(`https://campus-finder.runasp.net/api/Chatbot/history/${sessionId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log('Chat history response:', res.data);
          if (res.data.statusCode === 200) {
            const history = res.data.data.map((msg) => ({
              text: msg.content,
              sender: msg.role.toLowerCase(),
              timestamp: msg.timestamp,
            }));
            setMessages(history);
          } else {
            console.error('No chat history found for this session.');
          }
        })
        .catch((err) => console.error('Error fetching chat history:', err));
    } else {
      console.log('No sessionId, starting new session...');
    }
  }, []);

  const handleSend = () => {
    if (message.trim() === '') return;

    const userMsg = {
      text: message,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    console.log('Sending message:', message);
    setMessages((prev) => [...prev, userMsg]);
    setMessage('');

    let sessionId = localStorage.getItem('chat_session_id');
    const token = getToken();

    if (!sessionId && token) {
      console.log('Session ID not found, starting new session...');
      axios
        .post(
          'https://campus-finder.runasp.net/api/Chatbot/start',
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log('Start session response:', res.data);
          if (res.data.statusCode === 200 && res.data.data.sessionId) {
            sessionId = res.data.data.sessionId;
            localStorage.setItem('chat_session_id', sessionId);
            sendMessage(sessionId, message);
          }
        })
        .catch((err) => console.error('Failed to start chat session:', err));
    } else {
      console.log(`Session ID found: ${sessionId}, sending message...`);
      sendMessage(sessionId, message);
    }
  };

  const sendMessage = (sessionId, message) => {
    const token = getToken();
    if (sessionId && token) {
      console.log(`Sending message to bot: ${message}`);
      axios
        .post(
          'https://campus-finder.runasp.net/api/Chatbot/ask',
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
          console.log('Bot response:', res.data);
          if (res.data.statusCode === 200 && res.data.data.answer) {
            setMessages((prev) => [
              ...prev,
              {
                text: res.data.data.answer,
                sender: 'bot',
                timestamp: new Date().toISOString(),
              },
            ]);
            // إضافة sessionId إذا لم يكن موجود
            if (res.data.data.sessionId) {
              localStorage.setItem('chat_session_id', res.data.data.sessionId);
            }
          }
        })
        .catch((err) => console.error('Error sending message:', err));
    } else {
      console.log('No sessionId or token found, unable to send message');
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
