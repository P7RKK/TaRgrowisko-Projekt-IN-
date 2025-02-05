import React, { useState, useEffect } from 'react';
import { FaComments } from 'react-icons/fa'; // Import ikonki
import './FloatingChat.css'; // Import stylów

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      // Dodanie wiadomości od chatbota po otwarciu chatu
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now(), text: 'Witaj! Czy mogę w czymś pomóc?', sender: 'Chatbot' },
      ]);
    }
  }, [isOpen]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now(), text: newMessage, sender: 'Ty' },
      ]);
      setNewMessage('');
    }
  };

  return (
    <>
      {!isOpen && (
        <div className="chat-icon" onClick={toggleChat}>
          <FaComments size={24} />
        </div>
      )}
      {isOpen && (
        <div className={`floating-chat ${isOpen ? 'open' : ''}`}>
          <div className="chat-header" onClick={toggleChat}>
            Chatbot
          </div>
          <div className="chat-body">
            <div className="chat-messages">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`message ${msg.sender === 'Ty' ? 'sent' : 'received'}`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="chat-input">
              <input
                type="text"
                placeholder="Napisz wiadomość..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button onClick={handleSendMessage}>Wyślij</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingChat;
