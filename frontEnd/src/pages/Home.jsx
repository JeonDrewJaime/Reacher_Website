import React from 'react';
import skyImage from '../assets/sky.png'; 

function Home() {
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

  return (
    <div style={divStyle}>
      <h1 style={{ color: 'white' }}>Welcome kunyare</h1>
      <p style={{ color: 'white' }}>eme eme muna</p>
     
    </div>
  );
}

export default Home;







