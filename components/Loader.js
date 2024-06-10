import React from 'react';
import styles from '../styles/Loader.module.css';
import '../styles/globals.css';

const Loader = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen w-screen bg-white">
            <div className={styles.loader}></div>
            <div className="mt-5 text-2xl text-blue-600 font-joystix">Loading...</div>
        </div>
    );
};

export default Loader;
