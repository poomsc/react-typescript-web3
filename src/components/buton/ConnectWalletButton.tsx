import { useWeb3React } from "@web3-react/core";
import { ConnectWalletModal } from "components/modal/ConnectWalletModal";
import React, { useState, useEffect } from "react";
import { shortenAddress } from "utils";

const ConnectWalletButton: React.FC = (): JSX.Element => {
  const { account } = useWeb3React();
  const [activeModal, setActiveModal] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      if (!account) setActiveModal(true);
    }, 200);
  }, [account]);
  return (
    <>
      <div
        onClick={() => {
          setActiveModal(true);
          console.log("hello");
        }}
      >
        {account ? shortenAddress(account) : "Connect Wallet"}
      </div>

      <ConnectWalletModal
        isOpen={activeModal}
        closeModalEvent={() => setActiveModal(false)}
      />
    </>
  );
};

export default ConnectWalletButton;
