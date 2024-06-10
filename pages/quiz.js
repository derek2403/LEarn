import React, { useState, useEffect } from "react";
import styles from "../styles/quiz.module.css";
import '../styles/globals.css';
import { useRouter } from 'next/router';
import { useCounter } from '../components/CounterContext'; // Import the counter context
import ChatBox from '../components/ChatBox';
function Quiz() {
    const [isBlinking, setIsBlinking] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [quizContent, setQuizContent] = useState({ Q: "", A: "", B: "", C: "", D: "" });
    const blinkIntervalTime = 300;
    const stopBlinkingTime = 5000;
    const router = useRouter();
    const { data } = router.query;
    const { incrementCounter } = useCounter(); // Get the incrementCounter function

    useEffect(() => {
        if (data) {
            try {
                const decodedData = JSON.parse(decodeURIComponent(data));
                setQuizContent(decodedData.MCQ);
            } catch (error) {
                console.error('Failed to decode data:', error);
            }
        }

        const interval = setInterval(() => {
            setIsBlinking(prev => !prev);
        }, blinkIntervalTime);

        const timeout = setTimeout(() => {
            clearInterval(interval);
        }, stopBlinkingTime);

        // Cleanup both interval and timeout on component unmount
        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [data]);

    const handleAnswerClick = (answer) => {
        setSelectedAnswer(answer);
        incrementCounter(); // Increment the counter when an answer is selected
        const encodedData = encodeURIComponent(JSON.stringify({ MCQ: quizContent }));
        router.push({
            pathname: '/subjectiveQuestion',
            query: { data: encodedData }
        });
    };

    return (
        <div className={styles.quiz}>
            <ChatBox/>
            <div className={styles.question}>
                <p>{quizContent.Q}</p>
            </div>
            <div className={styles.character}>
                <img src={isBlinking ? "/Img/tutor-open.png" : "/Img/tutor-close.png"} alt="octopus" />
            </div>
            <div className={styles.answer}>
                {['A', 'B', 'C', 'D'].map((option, index) => (
                    <div key={index}>
                        <button onClick={() => handleAnswerClick(option)}>
                            {quizContent[option]}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Quiz;