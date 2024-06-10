"use client";
import React, { useState } from 'react';
import '../styles/globals.css';

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const toggleChatBox = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async () => {
    if (input.trim()) {
      const newMessage = { text: input, sender: 'user' };
      setMessages([...messages, newMessage]);
      setInput('');
      setLoading(true);
      setError('');

      try {
        const res = await fetch('/api/openai', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ action: 'sendMessage', message: newMessage.text }), // Include the action parameter
        });

        const data = await res.json();
        if (res.ok) {
          const aiMessage = { text: data.message, sender: 'bot' };
          setMessages([...messages, newMessage, aiMessage]);
        } else {
          setError(data.error || 'Something went wrong');
        }
      } catch (err) {
        setError('Failed to fetch data');
      }

      setLoading(false);
    }
  };

  return (
    <>
      <img src="https://cdn-icons-png.flaticon.com/128/408/408154.png" onClick={toggleChatBox} style={styles.chatButton} />
      {isOpen && (
        <div style={styles.overlay}>
          <div style={styles.chatBox}>
            <img src="https://cdn-icons-png.flaticon.com/128/391/391331.png" alt="profile" style={styles.closeButton} onClick={toggleChatBox} />
            <div style={styles.messagesContainer}>
              {messages.map((msg, index) => (
                <div key={index} style={msg.sender === 'user' ? styles.userMessage : styles.botMessage}>
                  {msg.sender === 'user' && (
                    <>
                      <p style={styles.messageText}>{msg.text}</p>
                      <img
                        src="./Img/crab.png"
                        alt="profile"
                        style={styles.profilePic}
                      />
                    </>
                  )}
                  {msg.sender === 'bot' && (
                    <>
                      <img
                        src="./Img/bot.jpg"
                        alt="profile"
                        style={styles.profilePic}
                      />
                      <p style={styles.messageText}>{msg.text}</p>
                    </>
                  )}
                </div>
              ))}
            </div>
            <div style={styles.inputContainer}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={styles.input}
                placeholder="Type a message..."
              />
              <button onClick={handleSendMessage} style={styles.sendButton}>Send</button>
            </div>

            {error && <p style={styles.errorText}>{error}</p>}
          </div>
        </div>
      )}
    </>
  );
};

const styles = {
  chatButton: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    padding: '5px 5px',
    borderRadius: '50%',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    height: '50px',
  },
  overlay: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000, // Added to ensure the overlay appears on top
  },
  chatBox: {
    width: '80%',
    height: '70%',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    backgroundImage: 'url(https://i.redd.it/w53povuxx4e91.png)',
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: '10px',
    fontSize: '16px',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    height: '50px',
  },
  messagesContainer: {
    flex: '1',
    padding: '10px',
    overflowY: 'auto',
    
  },
  userMessage: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: '10px',
    textAlign: 'right',
  },
  botMessage: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: '10px',
    textAlign: 'left',
  },
  profilePic: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    marginLeft: '10px',
    marginRight: '10px',
  },
  messageText: {
    backgroundColor: '#f1f1f1',
    padding: '10px',
    borderRadius: '10px',
    maxWidth: '60%',
    wordBreak: 'break-word',
    border: '3px solid black',
  },
  inputContainer: {
    display: 'flex',
    padding: '10px',
    borderTop: '1px solid #ddd',
  },
  input: {
    flex: '1',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    marginRight: '10px',
  },
  sendButton: {
    padding: '10px 20px',
    borderRadius: '5px',
    backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG1MkxlSjjrw4QVEVZXGEEVmfOyY0expeByA&s)',
    color: 'black',
    border: 'none',
    cursor: 'pointer',
  },
  loadingText: {
    textAlign: 'center',
    color: 'black',
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
  }
};

export default ChatBox;
