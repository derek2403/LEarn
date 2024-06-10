import React from 'react';
import { useRouter } from 'next/router';
import '../styles/globals.css';
import ChatBox from '../components/ChatBox';

const Summary = () => {
    const router = useRouter();

    const handleContinue = () => {
        router.push('/finalPage');
    };

    return (
        <div className='universal' style={styles.universal}>4
        <ChatBox/>
            <div className='Box' style={styles.Box}>
                <h1>Savings</h1><br/>
                <p>Saving money is essential for long-term financial stability and security. It starts with creating a detailed budget to identify areas to reduce costs and setting specific, measurable savings goals. Automating savings through scheduled transfers helps maintain regular contributions and minimizes impulsive spending. Savings provide a crucial financial buffer for emergencies, like unforeseen medical expenses or sudden unemployment, and support long-term goals such as home ownership, education, and retirement. A robust savings account reduces financial stress and enhances independence, enabling informed decisions free from immediate financial pressures. Consistent saving habits greatly contribute to overall financial well-being and personal empowerment.</p><br/>
                <button onClick={handleContinue} style={styles.button}>Continue</button>
            </div>
        </div>
    );
};

const styles = {
    universal: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'url("https://t4.ftcdn.net/jpg/05/68/62/51/360_F_568625150_RfOnYHT05o3wI6B9ao2ZqjtQh8oVjzZ4.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: '20px', 
        boxSizing: 'border-box',
    },
    Box: {
        width: '100%',
        maxWidth: '80%', 
        padding: '20px',
        border: '1px solid #ccc',
        fontSize: '20px', 
        borderRadius: '5px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: 'rgba(255, 255, 255, 0.8)', 
        textAlign: 'justify',
        overflow: 'auto', 
    },
    button: {
        fontSize: '20px',
        cursor: 'pointer',
        backgroundImage: 'url(/Img/playBtn.png)',
        backgroundSize: 'cover',
        color: 'white',
        width: '25%',
        textAlign: 'center',
        borderRadius: '25px',
        transition: 'all 0.2s ease',
      },
    buttonHover: {
        backgroundColor: '#0056b3',
    },
};

export default Summary;