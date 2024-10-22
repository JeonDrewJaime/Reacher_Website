import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import skyImage from '../assets/sky.png'; 
import Btns from '../components/UI/Btns';

function Home() {
  const navigate = useNavigate(); // Initialize useNavigate

  const divStyle = {
    backgroundImage: `url(${skyImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center', 
    backgroundRepeat: 'no-repeat', 
    minHeight: 'calc(100vh - 64px)', 
    width: '100%', 
    margin: 0, 
    padding: '20px', 
    boxSizing: 'border-box', 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    justifyContent: 'center', 
  };

  const handleLoginClick = () => {
    navigate('/login'); 
  };

  return (
    <div style={divStyle}>
      <h1 style={{ color: 'white' }}>Welcome kunyare</h1>
      <p style={{ color: 'white' }}>eme eme muna</p>
      <Btns onClick={handleLoginClick} /> 
    </div>
  );
}

export default Home;








