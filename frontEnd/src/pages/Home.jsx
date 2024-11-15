import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import skyImage from '../assets/greenhome.png'; 
import Btns from '../components/UI/Btns';

// Circle images
import circle1 from '../assets/circle1.png';
import circle2 from '../assets/circle2.png';
import circle3 from '../assets/circle3.png';

function Home() {
  const navigate = useNavigate(); 
  const divRef = useRef(null);
  const [fadeIn, setFadeIn] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false); 

  // Styles for the greenhome section
  const divStyle = {
    position: 'relative',
    minHeight: '100vh',  // Full screen height for greenhome
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
    transition: 'background 0.8s ease-in-out', // Smooth background transition
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
    <div>
      {/* Full Screen Greenhome Section */}
      <div style={divStyle} ref={divRef}>
     

        {/* Heading with OneTrickPony font */}
        <h1
          style={{
            color: 'white',
            textAlign: 'center',
            marginBottom: '10px',
            opacity: fadeIn ? 1 : 0,
            fontSize: '70px', // Reduced font size for cleaner look
            zIndex: 2,
            animation: 'fadeUp 3s ease forwards',
            fontFamily: 'OneTrickPony, sans-serif', // Using OneTrickPony font
            fontWeight: 'bold', // Strong emphasis on heading
            letterSpacing: '5px', // Adjusted letter spacing for better legibility
            textTransform: 'uppercase', // Uppercase for a more distinct look
          }}
        >
          Welcome to Reacher
        </h1>

        {/* Subheading */}
        <div 
          style={{
            color: 'white',
            textAlign: 'center',
            opacity: fadeIn ? 1 : 0,
            animation: 'fadeUp 3s ease forwards',
            marginBottom: '40px', // Increased margin for spacing
            fontSize: '22px', // Slightly larger for readability
            fontFamily: 'Arial, sans-serif',
            fontWeight: '300', // Lighter font weight for a balanced look
            letterSpacing: '1px', // Consistent letter spacing
          }}
        >
          Teaching Made Simple, Learning Made Fun
        </div>

        {/* Button Design */}
        <div style={{ 
          opacity: buttonVisible ? 1 : 0,  
          transition: 'opacity 1s ease-in-out',
          zIndex: 2,
          marginTop: '30px', // Added space for breathing room
        }}>  
          <Btns onClick={handleLoginClick} /> 
        </div>
      </div>

      {/* White Section with Centered Circles */}
      <div
        style={{
          backgroundColor: '#70bc4f', // Subtle white background to reduce contrast
          padding: '50px 0',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '0',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            width: '80%',
            maxWidth: '1200px',
            textAlign: 'center',
            flexWrap: 'wrap',
            gap: '40px', // Larger gap between circles for a more spacious look
          }}
        >
          {/* Circle 1 */}
          <div className="circle-container">
            <img
              src={circle1}
              alt="Dynamic Learning Platform"
              className="circle-img"
            />
            <p style={{ fontSize: '18px', color: '#fff', fontWeight: '500' }}>Dynamic Learning Platform</p>
          </div>

          {/* Circle 2 */}
          <div className="circle-container">
            <img
              src={circle2}
              alt="Hassle-Free Grading System"
              className="circle-img"
            />
            <p style={{ fontSize: '18px', color: '#fff', fontWeight: '500' }}>Hassle-Free Grading System</p>
          </div>

          {/* Circle 3 */}
          <div className="circle-container">
            <img
              src={circle3}
              alt="Teacher-Friendly Interface"
              className="circle-img"
            />
            <p style={{ fontSize: '18px', color: '#fff', fontWeight: '500' }}>Teacher-Friendly Interface</p>
          </div>
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

          .circle-container {
            text-align: center;
            transition: transform 0.4s ease, box-shadow 0.4s ease;
          }

          .circle-img {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            margin-bottom: 20px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            transition: transform 0.4s ease, box-shadow 0.4s ease;
          }

          .circle-container:hover .circle-img {
            transform: translateY(-10px);  /* Hover effect to lift the circle */
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);  /* Stronger shadow on hover */
          }
        `}
      </style>
    </div>
  );
}

export default Home;
