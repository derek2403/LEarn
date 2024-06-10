import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Loader from '../components/Loader';
import styles from '../styles/story.module.css'; // Import the CSS module
import '../styles/globals.css'; // Import the global CSS file

const Story = () => {
    const [currentScene, setCurrentScene] = useState(0);
    const [scenes, setScenes] = useState([]);
    const [displayedTitle, setDisplayedTitle] = useState('');
    const [animationClass, setAnimationClass] = useState('');
    const [messageData, setMessageData] = useState({});
    const [isLoading, setIsLoading] = useState(true); // New loading state
    const router = useRouter();

    useEffect(() => {
        const fetchLearningContent = async () => {
            const res = await fetch('/api/openai', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ action: 'generateQuizContent' }),
            });

            const data = await res.json();
            if (res.ok) {
                const messageData = JSON.parse(data.message);
                setMessageData(messageData);
                setScenes([
                    { image: '/Img/Saving1.png', title: messageData.Scene1 },
                    { image: '/Img/Bank.png', title: messageData.Scene2 },
                    { image: '/Img/FinancialPlan.png', title: messageData.Scene3 },
                ]);
                setDisplayedTitle(messageData.Scene1);
            } else {
                alert('Failed to load learning content');
            }
            setIsLoading(false); // Set loading to false once data is fetched
        };

        fetchLearningContent();
    }, []);

    useEffect(() => {
        if (scenes.length > 0) {
            const fullTitle = scenes[currentScene]?.title || '';
            let titleIndex = 0;

            const typeWriterEffect = () => {
                if (titleIndex < fullTitle.length) {
                    setDisplayedTitle(fullTitle.substring(0, titleIndex + 1));
                    titleIndex++;
                }
            };

            const intervalId = setInterval(typeWriterEffect, 50);

            return () => clearInterval(intervalId);
        }
    }, [currentScene, scenes]);

    const handleNextScene = () => {
        if (currentScene < scenes.length - 1) {
            setAnimationClass('next');
            setTimeout(() => {
                setCurrentScene((prevScene) => (prevScene + 1));
                setDisplayedTitle('');
                setAnimationClass('');
            }, 500);
        } else {
            const encodedData = encodeURIComponent(JSON.stringify(messageData));
            router.push({
                pathname: '/quiz',
                query: { data: encodedData }
            });

        }
    };

    const handlePrevScene = () => {
        if (currentScene > 0) {
            setAnimationClass('prev');
            setTimeout(() => {
                setCurrentScene((prevScene) => prevScene - 1);
                setDisplayedTitle('');
                setAnimationClass('');
            }, 500);
        } else {
            router.push('/');
        }
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className={styles['story-container']}>
            <div className={`${styles['story-background']} ${animationClass}`}>
                {scenes.length > 0 && (
                    <>
                        <img src={scenes[currentScene].image} alt={`scene ${currentScene + 1}`} className={styles['story-image']} />
                        <div className={styles['story-text-box']}>
                            <div className={styles['story-frame']}>
                                <h2 className="font-joystix">{displayedTitle}</h2>
                                <div className={styles['button-container']}>
                                    <button onClick={handlePrevScene} className={styles['nav-button']} disabled={currentScene === 0}>Previous</button>
                                    <button onClick={handleNextScene} className={styles['nav-button']}>Next</button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Story;
