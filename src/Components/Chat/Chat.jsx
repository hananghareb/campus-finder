import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Chat.css';

const ChatBox = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const getToken = () => localStorage.getItem('tkn');

  // Scroll to bottom whenever messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // On mount: if we already have a sessionId, load history
  useEffect(() => {
    const token = getToken();
    const sessionId = localStorage.getItem('chat_session_id');
    if (token && sessionId) {
      axios
        .get(`https://campus-finder.runasp.net/api/Chatbot/history/${sessionId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(res => {
          if (res.data.statusCode === 200) {
            const history = res.data.data.map(msg => ({
              text: msg.content,
              sender: msg.role.toLowerCase(),
              timestamp: msg.timestamp,
            }));
            setMessages(history);
          }
        })
        .catch(err => console.error('Error fetching history:', err));
    }
  }, []);

  const handleSend = () => {
    if (!message.trim()) return;

    // Show user's message immediately
    setMessages(prev => [
      ...prev,
      { text: message, sender: 'user', timestamp: new Date().toISOString() },
    ]);
    const outgoing = message;
    setMessage('');

    const token = getToken();
    const sessionId = localStorage.getItem('chat_session_id');

    if (!token) {
      console.error('No token in localStorage');
      return;
    }

    // Build request body: include sessionId only if exists
    const body = { message: outgoing };
    if (sessionId) {
      body.sessionId = sessionId;
    }

    axios
      .post('https://campus-finder.runasp.net/api/Chatbot/ask', body, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        if (res.data.statusCode === 200 && res.data.data.answer) {
          // Show bot's reply
          setMessages(prev => [
            ...prev,
            { text: res.data.data.answer, sender: 'bot', timestamp: new Date().toISOString() },
          ]);
          // Save sessionId if returned
          if (res.data.data.sessionId) {
            localStorage.setItem('chat_session_id', res.data.data.sessionId);
          }
        } else {
          console.error('API returned error:', res.data);
        }
      })
      .catch(err => console.error('Error sending message:', err));
  };

  return (
    <div className="chatbox-container">
      <div className="chatbox-inner">
        <h2 className="chatbox-title">How Can I Help You?</h2>

        <div className="chatbox-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`chat-msg ${msg.sender}`}>
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
            onChange={e => {
              setMessage(e.target.value);
              e.target.style.height = 'auto';
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <button className="chatbox-send-btn" onClick={handleSend}>➤</button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
