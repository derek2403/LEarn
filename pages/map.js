import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { ThirdwebProvider, ConnectButton, useSendTransaction, useActiveAccount } from 'thirdweb/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ethers } from 'ethers';
import styles from '../styles/map.module.css';
import ChatBox from '../components/ChatBox';
import { createWallet, walletConnect, inAppWallet } from "thirdweb/wallets";
import { client, contract } from '../utils/constants';
import { prepareContractCall, sendTransaction, resolveMethod } from "thirdweb";
const queryClient = new QueryClient();

function MapComponent() {
  const [activeCrab, setActiveCrab] = useState(4);
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

  const showCrab = async (index) => {
    setActiveCrab(index);
    if (index === 4 && activeAccount) {
      try {
        const transaction = prepareContractCall({
          contract,
          method: resolveMethod("claimEth"),
          params: [ethers.parseEther("0.0008", 'ether')],
        });
        sendTransaction(transaction);
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Please connect your wallet to claim tokens.");
    }
  };

  return (
    <div className={styles.container}>
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
      <div className={styles.map}>
        <div className={`${styles.spot} ${styles.spot1}`}>
          <ChatBox />
          <button
            className={styles.circleButton}
            onClick={() => showCrab(1)}
          >
            {activeCrab === 1 && <img src="/Img/ccharac.png" className={styles.crab} />}
          </button>
        </div>
        <div className={`${styles.spot} ${styles.spot2}`}>
          <button
            className={styles.circleButton}
            onClick={() => showCrab(2)}
          >
            {activeCrab === 2 && <img src="/Img/ccharac.png" className={styles.crab} />}
          </button>
        </div>
        <div className={`${styles.spot} ${styles.spot3}`}>
          <button
            className={styles.circleButton}
            onClick={() => showCrab(3)}
          >
            {activeCrab === 3 && <img src="/Img/ccharac.png" className={styles.crab} />}
          </button>
        </div>
        <div className={`${styles.spot} ${styles.spot4}`}>
          <button
            className={styles.circleButton}
            onClick={() => showCrab(4)}
          >
            {activeCrab === 4 && <img src="/Img/ccharac.png" className={styles.crab} />}
          </button>
        </div>
        <div className={`${styles.spot} ${styles.spot5}`}>
          <button
            className={styles.circleButton}
            onClick={() => showCrab(5)}
          >
            {activeCrab === 5 && <img src="/Img/ccharac.png" className={styles.crab} />}
          </button>
        </div>
        <div className={`${styles.spot} ${styles.spot6}`}>
          <button
            className={styles.circleButton}
            onClick={() => showCrab(6)}
          >
            {activeCrab === 6 && <img src="/Img/ccharac.png" className={styles.crab} />}
          </button>
        </div>
        <div className={`${styles.spot} ${styles.spot7}`}>
          <button
            className={styles.circleButton}
            onClick={() => showCrab(7)}
          >
            {activeCrab === 7 && <img src="/Img/ccharac.png" className={styles.crab} />}
          </button>
        </div>
        <div className={`${styles.spot} ${styles.spot8}`}>
          <button
            className={styles.circleButton}
            onClick={() => showCrab(8)}
          >
            {activeCrab === 8 && <img src="/Img/ccharac.png" className={styles.crab} />}
          </button>
        </div>
      </div>
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
