import React, { useState, useEffect, useRef } from 'react';
import './ChatComponent.css';

const ChatComponent = ({ contacts, initialMessages, onSendMessage }) => {
  const [activeContact, setActiveContact] = useState(null);
  const [messages, setMessages] = useState(initialMessages || []);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (activeContact) {
      // Symulacja pobierania wiadomości dla wybranego kontaktu
      setMessages([
        { id: 1, sender: activeContact.name, content: 'Cześć!', time: '10:00' },
        { id: 2, sender: 'Ja', content: 'Hej!', time: '10:02' },
      ]);
    }
  }, [activeContact]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        sender: 'Ja',
        content: newMessage,
        time: 'Teraz',
      };
      setMessages([...messages, message]);
      setNewMessage('');
      if (onSendMessage) onSendMessage(message);
    }
  };

  return (
    <div className="chat-component">
      <div className="contacts-list">
        <h2>Kontakty</h2>
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className={`contact-item ${activeContact?.id === contact.id ? 'active' : ''}`}
            onClick={() => setActiveContact(contact)}
          >
            <h3>{contact.name}</h3>
            <p>{contact.lastMessage}</p>
          </div>
        ))}
      </div>
      <div className="chat-section">
        {activeContact ? (
          <>
            <div className="chat-header">
              <h2>{activeContact.name}</h2>
            </div>
            <div className="messages">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`message ${msg.sender === 'Ja' ? 'sent' : 'received'}`}
                >
                  <p>{msg.content}</p>
                  <span>{msg.time}</span>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="message-input">
              <input
                type="text"
                placeholder="Napisz wiadomość..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button onClick={handleSendMessage}>Wyślij</button>
            </div>
          </>
        ) : (
          <div className="no-chat">
            <p>Wybierz kontakt, aby rozpocząć czat</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatComponent;
