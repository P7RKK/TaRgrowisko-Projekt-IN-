import React, { useState } from 'react';
import './ChatPage.css';

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const chats = [
    { id: 1, name: 'Jan Kowalski', lastMessage: '' },
    { id: 2, name: 'Anna Nowak', lastMessage: 'Jaki stan płyty? Zdjęcia nie do końca oddają. Pozdrawiam' },
  ];

  const handleChatSelect = (chatId) => {
    setSelectedChat(chatId);
    // Wczytaj wiadomości dla wybranej rozmowy
    setMessages([
      { id: 1, text: 'Cześć!', sender: 'Jan Kowalski' },
      { id: 1, text: 'Cześć!', sender: 'Ty' },
      { id: 1, text: 'Na ile możemy się umówić?', sender: 'Jan Kowalski' },
      { id: 1, text: 'Pana propozycja?', sender: 'Ty' },
      { id: 1, text: '120', sender: 'Jan Kowalski' },
      { id: 1, text: '150 i zmieniam cenę :)', sender: 'Ty' },
      { id: 1, text: 'Może być 150 :)', sender: 'Jan Kowalski' },

      { id: 2, text: '150 i zmieniam cenę :)', sender: 'Ty' },
    ]);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([...messages, { id: Date.now(), text: newMessage, sender: 'Ty' }]);
      setNewMessage('');
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-list">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={`chat-item ${selectedChat === chat.id ? 'active' : ''}`}
            onClick={() => handleChatSelect(chat.id)}
          >
            <h4>{chat.name}</h4>
            <p>{chat.lastMessage}</p>
          </div>
        ))}
      </div>
      <div className="chat-details">
        {selectedChat ? (
          <>
            <div className="messages">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`message ${msg.sender === 'Ty' ? 'sent' : 'received'}`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="message-input">
              <input
                type="text"
                placeholder="Napisz wiadomość..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button onClick={handleSendMessage}>Wyślij</button>
            </div>
          </>
        ) : (
          <p className="no-chat">Wybierz rozmowę, aby wyświetlić wiadomości.</p>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
