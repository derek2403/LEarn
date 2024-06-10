// pages/_app.js
import '../styles/globals.css';
import { CounterProvider } from '../components/CounterContext'; // Adjust the path as necessary

function MyApp({ Component, pageProps }) {
    return (
        <CounterProvider>
            <Component {...pageProps} />
        </CounterProvider>
    );
}

export default MyApp;
