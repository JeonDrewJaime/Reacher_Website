import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import skyImage from '../assets/home.jpg'; 
import Btns from '../components/UI/Btns';

function Home() {
  const navigate = useNavigate(); 
  const divRef = useRef(null);
  const [fadeIn, setFadeIn] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false); 

  const divStyle = {
    position: 'relative',
    minHeight: 'calc(100vh - 64px)', 
    width: '100%', 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundImage: `url(${skyImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center', 
    padding: '20px', 
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Black overlay with transparency
    zIndex: 1,
  };

  const handleLoginClick = () => navigate('/login');

  useEffect(() => {
    const timeout = setTimeout(() => setFadeIn(true), 2000);
    const buttonTimeout = setTimeout(() => setButtonVisible(true), 4000);

    return () => {
      clearTimeout(timeout);
      clearTimeout(buttonTimeout); 
    };
  }, []);

  return (
    <div style={divStyle} ref={divRef}>
      <div style={overlayStyle}></div>

      <h1
        style={{
          color: 'white',
          textAlign: 'center',
          marginBottom: '-120px',
          opacity: fadeIn ? 1 : 0,
          zIndex: 2,
          animation: 'fadeUp 3s ease forwards',
        }}
      >
        Welcome to Reacher
      </h1>

      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        marginTop: '0', 
        marginBottom: '10px' 
      }}>
        <div style={{ 
          marginTop: '-150px',  
          opacity: buttonVisible ? 1 : 0,  
          transition: 'opacity 1s ease-in-out',
          zIndex: 2,
        }}>  
          <Btns onClick={handleLoginClick} /> 
        </div>
      </div>

      <style>
        {`
          @keyframes fadeUp {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
}

export default Home;



















