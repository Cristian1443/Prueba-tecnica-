import React, { useState, useRef, useEffect } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { sendMessage } from '../services/chatService';
import './ChatWidget.css';

// Ícono para el chat (SVG simple)
const ChatIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
        <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15z"/>
    </svg>
);

const TypingIndicator = () => (
  <div className="message bot">
    <div className="typing-indicator">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
);

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([{ text: '¡Hola! Soy tu asistente de ventas. ¿En qué puedo ayudarte?', sender: 'bot' }]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const toggleOpen = () => setIsOpen(!isOpen);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const userMessage = { text: inputValue, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            const data = await sendMessage(inputValue);
            const botMessage = { text: data.reply, sender: 'bot' };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            const errorMessage = { text: 'Lo siento, no puedo responder en este momento.', sender: 'bot' };
            setMessages(prev => [...prev, errorMessage]);
            console.error("Error al contactar al chatbot:", error);
        }
        setIsLoading(false);
    };

    if (!isOpen) {
        return (
            <div className="chat-widget-container">
                <div className="chat-bubble" onClick={toggleOpen}>
                    <ChatIcon />
                </div>
            </div>
        );
    }

    return (
        <div className="chat-widget-container">
            <div className="chat-window">
                <div className="chat-header">
                    <span>Asistente Foodboleros</span>
                    <button className="close-btn" onClick={toggleOpen}>&times;</button>
                </div>
                <div className="chat-messages">
                    {messages.map((msg, index) => (
                        <div key={index} className={`message ${msg.sender}`}>
                            {msg.text}
                        </div>
                    ))}
                    {isLoading && <TypingIndicator />}
                    <div ref={messagesEndRef} />
                </div>
                <Form onSubmit={handleSend} className="chat-input-form">
                    <InputGroup>
                        <Form.Control
                            type="text"
                            placeholder="Escribe un mensaje..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            disabled={isLoading}
                            autoComplete="off"
                        />
                        <Button variant="primary" type="submit" disabled={isLoading} className="btn-custom-primary">
                            Enviar
                        </Button>
                    </InputGroup>
                </Form>
            </div>
        </div>
    );
};

export default ChatWidget; 