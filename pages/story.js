import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/story.module.css'; // Import the CSS module
import '../styles/globals.css'; // Import the global CSS file

const scenes = [
  {
    image: '/img/Crabby.png',
    title: 'Deep beneath the oceans, in the bustling city of Coralville, lived a curious crab named Crabby. However, he is always curious about the world above the ocean.',
    audio: '/audio/scene1.mp3'
  },
  {
    image: '/img/Book.png',
    title: 'One day, while exploring a sunken ship, Crabby found a book titled \'The World of Human Finance.\' Intrigued, Crabby decided to embark on an adventure to the surface to learn how humans managed their money.',
    audio: '/audio/scene2.mp3'
  },
  {
    image: '/img/scene1.png',
    title: 'Crabby emerged from the ocean and scuttled into a bustling market. Here, he saw humans exchanging money for goods and services. He was amazed by this concept and wanted to dive deeper into the world of human finance.',
    audio: '/audio/scene3.mp3'
  },
  {
    image: '/img/scene2.png',
    title: 'In the heart of the market, Crabby met Mr. Fin, a wise old man who had lived among humans for many years. Seeing Crabby\'s curiosity, Mr. Fin offered to mentor him.',
    audio: '/audio/scene4.mp3'
  },
  {
    image: '/img/letter.png',
    title: 'However, Mr. Fin had one condition: Crabby had to complete a series of challenges to prove his dedication to learning about human finance. Crabby accepted the challenge and eagerly awaited his first task.',
    audio: '/audio/scene5.mp3'
  }
];

const Story = () => {
  const [currentScene, setCurrentScene] = useState(0);
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [animationClass, setAnimationClass] = useState('');
  const [userInteracted, setUserInteracted] = useState(false); 
  const router = useRouter();
  const audioRef = useRef(null);

  useEffect(() => {
    const handleUserInteraction = () => {
      setUserInteracted(true);
    };

    document.addEventListener('click', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
    };
  }, []);


  useEffect(() => {
    const fullTitle = scenes[currentScene].title;
    let titleIndex = 0;

    const typeWriterEffect = () => {
      if (titleIndex < fullTitle.length) {
        setDisplayedTitle(fullTitle.substring(0, titleIndex + 1));
        titleIndex++;
      }
    };

    const intervalId = setInterval(typeWriterEffect, 50);

    return () => clearInterval(intervalId);
  }, [currentScene]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      audioRef.current.play();
    }
  }, [currentScene]);

  const handleNextScene = () => {
    if (currentScene < scenes.length - 1) {
      setAnimationClass('next');
      setTimeout(() => {
        setCurrentScene((prevScene) => (prevScene + 1));
        setDisplayedTitle('');
        setAnimationClass('');
      }, 500);
    } else {
      router.push('/question'); 
    }
  };

  const handlePrevScene = () => {
    if (currentScene > 0) {
      setAnimationClass('prev');
      setTimeout(() => {
        setCurrentScene((prevScene) => (prevScene - 1));
        setDisplayedTitle('');
        setAnimationClass('');
      }, 500);
    } else {
      router.push('/'); // Redirect to root when on the first scene
    }
  };
  


  return (
    <div className={styles['story-container']}>
      <div className={`${styles['story-background']} ${animationClass}`}>
        <img src={scenes[currentScene].image} alt={`scene ${currentScene + 1}`} className={styles['story-image']} />
        <div className={styles['story-text-box']}>
          <div className={styles['story-frame']}>
            <h2 className="font-joystix">{displayedTitle}</h2>
            <div className={styles['button-container']}>
              <button onClick={handlePrevScene} className={styles['nav-button']} disabled={currentScene === 0}>Previous</button>
              <button onClick={handleNextScene} className={styles['nav-button']} disabled={currentScene === scenes.length - 1 && currentScene !== 4}>Next</button>
            </div>
          </div>
        </div>
      </div>
      <audio ref={audioRef} key={scenes[currentScene].audio}>
        <source src={scenes[currentScene].audio} type="audio/mpeg" />
      </audio>
    </div>
  );
};

export default Story;
