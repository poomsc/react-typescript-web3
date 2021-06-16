import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { BscConnector } from '@binance-chain/bsc-connector';
import { ConnectorType } from 'types/connectorType';

const chainId = parseInt(process.env.REACT_APP_CHAIN_ID as string, 10);
const POLLING_INTERVAL = 12000;
const RPC_URLS: { [chainId: number]: string } = {
  [chainId]: process.env.REACT_APP_RPC_URL_56 as string,
};

export const injected = new InjectedConnector({ supportedChainIds: [chainId,1] });

export const walletconnect = new WalletConnectConnector({
  rpc: { 56: RPC_URLS[56] },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
});

export const bscConnector = new BscConnector({ supportedChainIds: [chainId,1] });

export enum ConnectorNames {
  Injected = 'Injected',
  WalletConnect = 'WalletConnect',
  BscConnector = 'BscConnector',
}

export const connectorsByName: { [connectorName: string]: ConnectorType } = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.WalletConnect]: walletconnect,
  [ConnectorNames.BscConnector]: bscConnector,
};
