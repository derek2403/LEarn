import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';
import { useCounter } from '../components/CounterContext';
import ChatBox from '../components/ChatBox';
import { createWallet, walletConnect, inAppWallet } from "thirdweb/wallets";
import { client, contract } from '../utils/constants';
import { prepareContractCall, resolveMethod } from "thirdweb";
import { ThirdwebProvider, ConnectButton, useSendTransaction, useActiveAccount } from 'thirdweb/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ethers } from 'ethers';

// Create a QueryClient instance
const queryClient = new QueryClient();

function MapComponent() {
  const [enabledSpots, setEnabledSpots] = useState([true, true, false, false, false, false, false, false]);
  const [animationClass, setAnimationClass] = useState('walkPath1');
  const { counter } = useCounter();
  const router = useRouter();
  const activeAccount = useActiveAccount();

  const wallets = [
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
    walletConnect(),
    inAppWallet({
      auth: {
        options: [
          "email",
          "google",
          "apple",
          "facebook",
          "phone",
        ],
      },
    }),
  ];

  const { mutate: sendTransaction, isPending } = useSendTransaction();

  const [activeCrab, setActiveCrab] = useState(counter);

  useEffect(() => {
    const updatedSpots = [true, true, counter > 1, counter > 2, counter > 3, false, false, false];
    setEnabledSpots(updatedSpots);
  }, [counter]);

  const showCrab = async (index) => {
    setActiveCrab(index);
    setAnimationClass(`walkPath${index}`);

    if (index === 3) {
      if (activeAccount) {
        try {
          const transaction = prepareContractCall({
            contract,
            method: resolveMethod("claimEth"),
            params: [ethers.parseEther("0.0005")],
          });

          await new Promise((resolve, reject) => {
            sendTransaction(transaction, {
              onSuccess: resolve,
              onError: reject,
            });
          });

        } catch (error) {
          console.error(error);
        }
      } else {
        alert("Please connect your wallet to claim tokens.");
      }
    }

    if (index === 2) {
      setTimeout(() => {
        router.push('/learningContent');
      }, 5000); // 5 seconds delay
    }
  };

  return (
    <div>
      <div className={styles.ConnectButton}>
        <ConnectButton
          client={client}
          wallets={wallets}
          theme="dark"
          connectModal={{ size: "wide" }}
          detailsModal={{
            payOptions: {
              buyWithFiat: false,
              buyWithCrypto: false,
            },
          }}
        />
      </div>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.map}>
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} className={`${styles.spot} ${styles[`spot${i + 1}`]}`}>
                <button
                  className={`${styles.circleButton} ${!enabledSpots[i] ? styles.lock : ''}`}
                  onClick={() => showCrab(i + 1)}
                  disabled={!enabledSpots[i]}
                >
                  {activeCrab === i + 1 && (
                    <img
                      src="/Img/ccharac.png"
                      className={`${styles.crab} ${styles[animationClass]}`}
                      alt="Crab Character"
                    />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ChatBox /> {/* Moved ChatBox here to ensure it has a higher z-index */}
    </div>
  );
}

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThirdwebProvider clientId={client}>
        <MapComponent />
      </ThirdwebProvider>
    </QueryClientProvider>
  );
}
