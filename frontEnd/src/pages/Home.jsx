import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import skyImage from '../assets/sky.png'; 
import Btns from '../components/UI/Btns';
import Lottie from 'lottie-react';  
import staryAnimation from '../assets/lottieAnimations/stary.json';
import bookAnimation from '../assets/lottieAnimations/book.json';

function Home() {
  const navigate = useNavigate(); 
  const divRef = useRef(null);
  
  const [animationPositions, setAnimationPositions] = useState({
    fixedAnimation1: { top: '15%', left: '15%' },
    fixedAnimation2: { top: '30%', left: '70%' },
    staryAnimation1: { top: '5%', left: '30%' },
    staryAnimation2: { top: '10%', right: '30%' },
    staryAnimation3: { top: '20%', left: '50%' },
    staryAnimation4: { top: '25%', right: '15%' },
  });

  const [fadeIn, setFadeIn] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false); 

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
    position: 'relative',
    overflowX: 'hidden',
  };

  const handleLoginClick = () => {
    navigate('/login'); 
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFadeIn(true);
    }, 2000); 

    
    const buttonTimeout = setTimeout(() => {
      setButtonVisible(true);
    }, 4000); 

    return () => {
      clearTimeout(timeout);
      clearTimeout(buttonTimeout); 
    }; 
  }, []);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      const { offsetWidth, offsetHeight } = divRef.current;

      const centerX = offsetWidth / 2;
      const centerY = offsetHeight / 2;
      const distanceX = clientX - centerX;
      const distanceY = clientY - centerY;
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

      const threshold = 500;

      if (distance < threshold) {
        const newX = (clientX / offsetWidth) * 100;
        const newY = (clientY / offsetHeight) * 100;

        const movementFactor = 0.1;
        setAnimationPositions((prevPositions) => ({
          ...prevPositions,
          fixedAnimation1: { 
            top: `${15 - newY * movementFactor}%`, 
            left: `${15 - newX * movementFactor}%` 
          },
          fixedAnimation2: { 
            top: `${30 - newY * movementFactor}%`, 
            left: `${70 - newX * movementFactor}%` 
          },
          staryAnimation1: { 
            top: `${5 - newY * movementFactor}%`, 
            left: `${30 - newX * movementFactor}%` 
          },
          staryAnimation2: { 
            top: `${10 - newY * movementFactor}%`, 
            right: `${30 - newX * movementFactor}%` 
          },
          staryAnimation3: { 
            top: `${20 - newY * movementFactor}%`, 
            left: `${50 - newX * movementFactor}%` 
          },
          staryAnimation4: { 
            top: `${25 - newY * movementFactor}%`, 
            right: `${15 - newX * movementFactor}%` 
          },
        }));
      }
    };

    const divElement = divRef.current;
    divElement.addEventListener('mousemove', handleMouseMove);

    return () => {
      divElement.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const renderLottie = (animationData, position, width, height, index) => (
    <Lottie 
      animationData={animationData} 
      loop={true} 
      style={{ 
        position: 'absolute', 
        top: position.top, 
        left: position.left, 
        right: position.right, 
        width: width, 
        height: height, 
        opacity: fadeIn ? 1 : 0, 
        transition: `opacity 0.5s ease-in-out ${index * 0.4}s`, 
      }} 
    />
  );

  return (
    <div style={divStyle} ref={divRef}>
     
     <h1
  style={{
    color: 'white',
    textAlign: 'center',
    marginBottom: '-120px',
    opacity: 0,
    animation: 'fadeUp 3s ease forwards',
  }}
>
  Welcome to Reacher
</h1>
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


   
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        marginTop: '0', 
        marginBottom: '10px' 
      }}>
        <Lottie 
          animationData={bookAnimation} 
          loop={true} 
          style={{ 
            marginTop: '-50px',
            width: '100vw',  
            height: '60vh'  
          }} 
        />
        
        
        <div style={{ 
          marginTop: '-150px',  
          opacity: buttonVisible ? 1 : 0,  
          transition: 'opacity 1s ease-in-out' 
        }}>  
          <Btns onClick={handleLoginClick} /> 
        </div>
      </div>

      {/* Fixed Lottie animations with fade-in transition */}
      {renderLottie(staryAnimation, animationPositions.fixedAnimation1, '10vw', '8vw', 0)}
      {renderLottie(staryAnimation, animationPositions.fixedAnimation2, '10vw', '9vw', 1)}

      {/* Star animations with fade-in transition */}
      {renderLottie(staryAnimation, animationPositions.staryAnimation1, '6vw', '12vw', 3)}
      {renderLottie(staryAnimation, animationPositions.staryAnimation2, '5vw', '9vw', 4)}
      {renderLottie(staryAnimation, animationPositions.staryAnimation3, '7vw', '10vw', 5)}
      {renderLottie(staryAnimation, animationPositions.staryAnimation4, '7vw', '5vw', 6)}
    </div>
  );
}

export default Home;

















