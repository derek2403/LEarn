import React, { useState, useEffect } from "react";
import styles from "../styles/subjectiveQuiz.module.css"; // Ensure this path is correct
import '../styles/globals.css';
import { useRouter } from 'next/router';
import ChatBox from '../components/ChatBox';

function SubjectiveQuiz() {
    const [isBlinking, setIsBlinking] = useState(false);
    const [inputAnswer, setInputAnswer] = useState('');
    const blinkIntervalTime = 300;
    const stopBlinkingTime = 5000;
    const router = useRouter();

    useEffect(() => {
        const interval = setInterval(() => {
            setIsBlinking(prev => !prev);
        }, blinkIntervalTime);

        const timeout = setTimeout(() => {
            clearInterval(interval);
        }, stopBlinkingTime);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, []);

    const handleInputChange = (e) => {
        setInputAnswer(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputAnswer.trim()) {
            localStorage.setItem('subjectiveAnswer', inputAnswer);
            router.push('/summary'); // Replace with the actual path you want to navigate to
        } else {
            alert('Please enter an answer.');
        }
    };

    return (
        <div className={styles.quiz}>
            <ChatBox/>
            <form onSubmit={handleSubmit}>
                <div className={styles.question}>
                    <p>What is the primary purpose of a budget?</p>
                </div>
                <div className={styles.character}>
                    <img className="character" src={isBlinking ? "/Img/tutor-open.png" : "/Img/tutor-close.png"} alt="octopus" />
                </div>
                <div className={styles.answer}>
                    <textarea
                        name="inputAnswer"
                        id="inputAnswer"
                        placeholder="Enter your answer here.."
                        value={inputAnswer}
                        onChange={handleInputChange}
                    ></textarea>
                    <input type="submit" value="Submit" />
                </div>
            </form>
        </div>
    );
}

export default SubjectiveQuiz;