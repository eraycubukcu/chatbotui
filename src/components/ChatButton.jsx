import React, { use, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ChatButton() {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: '#044074',
        borderRadius: '50px',
        padding: '10px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'width 0.3s ease',
        overflow: 'hidden',
        width: isHovered ? '130px' : '60px',
      }}
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate("/chatbot")}
    >
      <img
        src="https://png.pngtree.com/png-vector/20220611/ourmid/pngtree-chatbot-icon-chat-bot-robot-png-image_4841963.png"
        alt="Chat Icon"
        className='invert-100'
        style={{ width: '40px', height: '40px' }}
      />
      <span
        style={{
          color: 'white',
          fontFamily: 'Arial, sans-serif',
          marginLeft: '10px',
          paddingRight: '10px',
          whiteSpace: 'nowrap',
          fontSize: '14px',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      >
        Chatbot
      </span>
    </div>
  );
}