// pages/_app.js
import React from 'react';
import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import "../styles/global.css"

function MyApp({ Component, pageProps }) {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: 'dc8abf8b-6786-4920-bfa3-6d6e32a280f8',
        walletConnectors: [ EthereumWalletConnectors ],


      }}
    >
      <Component {...pageProps} />
    </DynamicContextProvider>
  );
}

export default MyApp;
