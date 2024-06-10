import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import confetti from 'canvas-confetti';
import ChatBox from '../components/ChatBox';
const FinalPage = () => {
  const [isHovered, setIsHovered] = useState(false);
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    triggerConfetti();
    playClapSound();
  }, []);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const triggerConfetti = () => {
    const myConfetti = confetti.create(canvasRef.current, {
      resize: true,
      useWorker: true,
    });

    myConfetti({
      particleCount: 200,
      spread: 160,
      origin: { y: 0.6 },
    });
  };

  const playClapSound = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const handleButtonClick = () => {
    router.push('/mainPage');
  };

  return (
    <div style={styles.container}>
          <ChatBox/>
      <img src="/Img/finalPage.gif" alt="Centered Image" style={styles.image} />
      <canvas ref={canvasRef} style={styles.canvas}></canvas>
      <audio ref={audioRef} src="/audio/clap.mp3" preload="loop"></audio>
      <div
        style={isHovered ? { ...styles.button, ...styles.buttonHover } : styles.button}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleButtonClick}
      >
        Continue
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '100%',
    maxHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
    position: 'relative',
    overflow: 'hidden',
  },
  image: {
    marginBottom: '20px',
    width: '60%',
    height: 'auto',
    border: '4px solid #000',
  },
  canvas: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundImage: 'url(/Img/playBtn.png)',
    backgroundSize: 'cover',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    transition: 'all 0.2s ease',
  },
  buttonHover: {
    border: '4px solid #000',
  },
};

export default FinalPage;
