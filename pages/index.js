import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { ThirdwebProvider, ConnectButton } from 'thirdweb/react';
import { client } from '../utils/constants';
import { createWallet, walletConnect, inAppWallet } from 'thirdweb/wallets';
import { CounterProvider, useCounter } from '../components/CounterContext'; // Adjust the path as necessary
import ChatBox from '@components/ChatBox';

function LandingPage() {
  const router = useRouter();
  const audioRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const { counter, incrementCounter } = useCounter(); // Use useCounter hook

  const handleClick = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    router.push('/story');
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(error => {
        console.log('Audio playback failed:', error);
      });
    }
  }, []);

  const wallets = [
    createWallet('io.metamask'),
    createWallet('com.coinbase.wallet'),
    walletConnect(),
    inAppWallet({
      auth: {
        options: [
          'email',
          'google',
          'apple',
          'facebook',
          'phone',
        ],
      },
    }),
  ];

  const styles = {
    container: {
      height: '100vh',
      width: '100%',
      marginTop: '10px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    board: {
      position: 'relative',
      width: '1280px',
      height: '570px',
      backgroundImage: 'url(/Img/Image.png)',
      backgroundPosition: '0px -60px',
      border: '4px solid #000',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1)', // 3D effect
      marginBottom: '20px',
    },
    imageContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: '-80px',
      left: '-280px',
    },
    image: {
      marginTop: '30px',
      borderRadius: '50%',
      maxWidth: '40%',
      maxHeight: 'auto',
      border: '6px solid #000',
    },
    button: {
      padding: '10px 20px',
      fontSize: '30px',
      cursor: 'pointer',
      backgroundImage: 'url(/Img/playBtn.png)',
      color: 'white',
      width: '30%',
      textAlign: 'center',
      borderRadius: '25px',
      transition: 'all 0.2s ease',
    },
    buttonHover: {
      border: '4px solid #000',
    },
    wallet:{
      marginLeft: '70%',
    }
  };

  return (
    <ThirdwebProvider clientId={client}>
      <div className='universal' style={styles.universal}>
        <div style={styles.container}>
          <div style={styles.wallet}>
            <ConnectButton
              client={client}
              wallets={wallets}
              theme="dark"
              connectModal={{ size: 'wide' }}
              detailsModal={{
                payOptions: {
                  buyWithFiat: false,
                  buyWithCrypto: false,
                },
              }}
            />
          </div>
          <div style={styles.board}>
            <div style={styles.imageContainer}>
              <img src='/Img/gif2.gif' alt='Landing Page Image' style={styles.image} />
            </div>
          </div>
          <div
            style={isHovered ? { ...styles.button, ...styles.buttonHover } : styles.button}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Play Game
          </div>
          <audio ref={audioRef} src='/audio/intro.mp3' loop />
        </div>
      </div>
    </ThirdwebProvider>
  );
}

export default function App() {
  return (
    <CounterProvider>
      <LandingPage />
    </CounterProvider>
  );
}