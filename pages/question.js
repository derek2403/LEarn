"use client";

import { useState } from 'react';
import ChatBox from '../components/ChatBox';
import { useRouter } from 'next/router';
const initialQuestions = [
  { question: "What is your age?", type: "long" },
  { question: "Why are you interested in improving your financial literacy?", type: "long" },
  { question: "How would you describe your current understanding of personal finance? (e.g., basic, intermediate, advanced)", type: "long" },
  { question: "Have you ever created a personal budget? If yes, how often do you use it?", type: "long" },
  { question: "Do you have any experience with investing? Please elaborate.", type: "long" },
  { question: "What financial topics are you most interested in learning about? (e.g., savings, investments, crypto, taxes)", type: "long" },
  { question: "How do you prefer to learn about finance? (e.g., videos, articles, interactive exercises)", type: "long" },
  { question: "What is your primary financial goal right now? (e.g., saving for a house, paying off debt, investing for retirement)", type: "long" },
  { question: "Have you ever taken any financial education courses or used financial apps before? If yes, which ones and how was your experience?", type: "long" },
  { question: "Do you have any specific questions or concerns about your finances that you'd like us to address in this app?", type: "long" }
];

export default function ChatComponent() {
  const [questions, setQuestions] = useState(initialQuestions);
  const [responses, setResponses] = useState(Array(initialQuestions.length).fill(''));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState('');
  const router = useRouter();

  const handleInputChange = (index, value) => {
    const newResponses = [...responses];
    newResponses[index] = value;
    setResponses(newResponses);
  };

  const areAllResponsesFilled = () => {
    return responses.every(response => response.trim() !== '');
  };

  const handleSubmit = async () => {
    if (!areAllResponsesFilled()) {
      setError('Please fill in all the responses before submitting.');
      return;
    }
    console.log(responses);
    setLoading(true);
    setError('');
    setResult('');
    try {
      const res = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'evaluateLiteracy', questions, responses }),
      });

      const data = await res.json();
      if (res.ok) {
        setResult(data.message);
        console.log(data.message);
        setResponses(Array(initialQuestions.length).fill('')); // Clear the input fields
        // Redirect to the mainPage
        router.push('/mainPage');
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      setError('Failed to fetch data');
    }
    setLoading(false);
  };

  return (
    <div className='Universal'>
      <ChatBox />
      <div className="container">
        <h1 className="title">Financial Literacy Questionnaire</h1>
        {questions.map((q, index) => (
          <div key={index} className="question-block">
            <label className="question-label">{q.question}</label>
            {q.type === "short" ? (
              <input
                type="text"
                value={responses[index]}
                onChange={(e) => handleInputChange(index, e.target.value)}
                className="input"
              />
            ) : (
              <textarea
                value={responses[index]}
                onChange={(e) => handleInputChange(index, e.target.value)}
                rows="4"
                className="textarea"
              />
            )}
          </div>
        ))}
        <button
          onClick={handleSubmit}
          className="submit-button"
        >
          Submit
        </button>
        {loading && <p className="loading-text">Loading...</p>}
        {error && <p className="error-text">{error}</p>}
      </div>

      <style jsx>{`
        .Universal {
          display: flex;
          justify-content: center;
          align-items: center;  
          background-image: url("./Img/sea.jpg");
          padding: 20px;
        }

        .container {
          background-color: rgba(45, 45, 45, 0.9);
          max-width: 60%;
          margin: 0 auto;
          padding: 20px;
          border-radius: 20px;
          color: white;
        }
        .title {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 16px;
          text-align: center;
        }
        .question-block {
          margin-bottom: 16px;
        }
        .question-label {
          display: block;
          margin-bottom: 8px;
          font-weight: bold;
          margin-left: 5%;
        }
        .input, .textarea {
          width: 90%;
          margin-left: 5%;
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
          outline: none;
          transition: border-color 0.3s;
          color: black; 
        }
        .input:focus, .textarea:focus {
          border-color: #0070f3;
        }
        .submit-button {
          width: 20%;
          margin-left: 40%;
          padding: 12px;
          background-color: #fff;
          color: black;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .submit-button:hover {
          background-color: lightgray;
        }
        .loading-text {
          text-align: center;
          color: #888;
          margin-top: 16px;
        }
        .error-text {
          text-align: center;
          color: red;
          margin-top: 16px;
        }
      `}</style>
    </div>
  );
}