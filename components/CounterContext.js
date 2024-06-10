import React, { createContext, useState, useContext } from 'react';

// Create the context
const CounterContext = createContext();

// Create a provider component
export const CounterProvider = ({ children }) => {
    const [counter, setCounter] = useState(1);

    const incrementCounter = () => {
        setCounter(prevCounter => prevCounter + 1);
    };

    return (
        <CounterContext.Provider value={{ counter, incrementCounter }}>
            {children}
        </CounterContext.Provider>
    );
};

// Create a custom hook to use the counter context
export const useCounter = () => useContext(CounterContext);
