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

  // جلب تاريخ الشات القديم لو في sessionId
  useEffect(() => {
    const sessionId = localStorage.getItem('chat_session_id');
    const token = getToken();
    if (sessionId && token) {
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

    // عرض الرسالة في الواجهة فوراً
    setMessages(prev => [
      ...prev,
      { text: message, sender: 'user', timestamp: new Date().toISOString() },
    ]);
    const outgoing = message;
    setMessage('');

    const token = getToken();
    let sessionId = localStorage.getItem('chat_session_id');

    if (!token) {
      console.error('No token found in localStorage');
      return;
    }

    // جهّز جسم الطلب؛ لو sessionId موجود خليه، وإلا أبصله
    const body = { message: outgoing };
    if (sessionId) body.sessionId = sessionId;

    axios
      .post('https://campus-finder.runasp.net/api/Chatbot/ask', body, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        const { statusCode, data } = res.data;
        if (statusCode === 200) {
          // أضف جواب البوت
          setMessages(prev => [
            ...prev,
            { text: data.answer, sender: 'bot', timestamp: new Date().toISOString() },
          ]);
          // خزّن sessionId لو رجع مع الرد
          if (data.sessionId) {
            localStorage.setItem('chat_session_id', data.sessionId);
          }
        } else {
          console.error('API error:', res.data);
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
              e.target.style.height = e.target.scrollHeight + 'px';
            }}
            onKeyDown={e => {
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
