import React, { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

import { useEagerConnect, useInactiveListener } from 'hooks/connectWallet';
import { ConnectorNames, connectorsByName } from 'utils/connectors';
import { lcsSetItem } from 'utils/localStorage';

import metamaskIcon from 'assets/icons/metamask-wallet.png';
import walletConnectIcon from 'assets/icons/wallet-connect.png';
import binanceWalletIcon from 'assets/icons/binance-wallet.png';
import { getErrorMessage } from 'utils/connectWallet';

const textButton: { [connectorName: string]: string } = {
  [ConnectorNames.Injected]: 'Metamask',
  [ConnectorNames.WalletConnect]: 'Wallet Connect',
  [ConnectorNames.BscConnector]: 'Binance Chain',
};

const connectorsIcon: { [connectorName: string]: string } = {
  [ConnectorNames.Injected]: metamaskIcon,
  [ConnectorNames.WalletConnect]: walletConnectIcon,
  [ConnectorNames.BscConnector]: binanceWalletIcon,
};

interface Iprops {
  closeModalEvent: () => void;
  isOpen: boolean;
}

export const ConnectWalletModal: React.FC<Iprops> = ({
  isOpen,
  closeModalEvent,
}: Iprops): JSX.Element => {
  const { connector, activate, error } = useWeb3React<Web3Provider>();

  const triedEager = useEagerConnect();
  useInactiveListener(!triedEager as boolean);

  return (
    // <ModalTemplate
    //   isOpen={isOpen}
    //   closeModalEvent={closeModalEvent}
    //   width={selectSize ? '300px' : '500px'}
    //   height={selectSize ? '200px' : '400px'}
    // >
      <div
        className="relative flex flex-col items-center justify-center p-2 bg-modal rounded-xl"
      >
        <div className="text-white">
          <div className="flex flex-col">
            {Object.keys(connectorsByName).map((name, index) => {
              const currentConnector = connectorsByName[name];
              const connected = currentConnector === connector;
              const disabled = !triedEager || connected || !!error;
              return (
                <button
                  className="flex items-center justify-start mx-14 my-2 pl-16 py-5 w-80 hover:bg-black rounded-lg"
                  disabled={disabled}
                  key={name}
                  onClick={() => {
                    activate(connectorsByName[name]);
                    lcsSetItem('walletName', name);
                  }}
                >
                  <img src={connectorsIcon[name]} alt={name} className="w-10" />
                  <p className="pl-10 text-gray-300 text-base font-semibold">{textButton[name]}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    // </ModalTemplate>
  );
};
