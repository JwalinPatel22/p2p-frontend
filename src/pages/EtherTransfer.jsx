import React, { useState } from "react";
import { ethers } from "ethers";
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const EtherTransfer = () => {
  // State variables for managing account details, inputs, and transaction status
  const [account, setAccount] = useState(null);
  const [senderName, setSenderName] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [txStatus, setTxStatus] = useState("");

  // Function to connect to MetaMask and fetch wallet details
  async function connectWallet() {
    if (!window.ethereum) {
      alert("MetaMask not detected. Please install MetaMask.");
      return;
    }
    try {
      // Request access to accounts
      await window.ethereum.request({ method: "eth_requestAccounts" });
      // Create a provider using ethers v6 API
      const provider = new ethers.BrowserProvider(window.ethereum);
      // Get the signer (i.e. the connected account)
      const signer = await provider.getSigner();
      // Retrieve the account address
      const accountAddress = await signer.getAddress();
      setAccount(accountAddress);

      // Lookup ENS name (if exists)
      const ensName = await provider.lookupAddress(accountAddress);
      setSenderName(ensName || "No ENS Name Found");

      // Derive public key by signing a known message and recovering it from the signature.
      const message = "Get my public key";
      const signature = await signer.signMessage(message);
      const messageHash = ethers.hashMessage(message);
      const recoveredPublicKey = ethers.recoverPublicKey(
        messageHash,
        signature
      );
      setPublicKey(recoveredPublicKey);
    } catch (error) {
      console.error("Error connecting to wallet:", error);
    }
  }

  // Function to send Ether from the connected account to a recipient address
  async function sendEther() {
    if (!window.ethereum) {
      alert("MetaMask not detected");
      return;
    }
    try {
      setTxStatus("Initiating transaction...");
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Send Ether transaction using ethers.js
      const tx = await signer.sendTransaction({
        to: recipient,
        value: ethers.parseEther(amount),
      });
      setTxStatus("Transaction sent. Waiting for confirmation...");
      await tx.wait();
      setTxStatus("Transaction confirmed!");
    } catch (error) {
      console.error("Transaction error:", error);
      setTxStatus(`Transaction failed! ${error.message}`);
    }
  }

  return (
    <AppLayout>
      <div className="space-y-8 p-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Wallet Transfer DApp
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Connect your wallet and transfer Ether
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Account Details Card */}
          <Card className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg text-gray-700 dark:text-gray-300">
                Account Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {account ? (
                <>
                  <p>
                    <strong>Address:</strong> {account}
                  </p>
                  <p>
                    <strong>ENS Name:</strong> {senderName}
                  </p>
                  <p className="break-all">
                    <strong>Public Key:</strong> {publicKey}
                  </p>
                </>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">
                  No wallet connected.
                </p>
              )}
              <Button
                onClick={connectWallet}
                variant="outline"
                className="mt-2 w-full"
              >
                {account ? "Connected" : "Connect Wallet"}
              </Button>
            </CardContent>
          </Card>

          {/* Transfer Ether Card */}
          <Card className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg text-gray-700 dark:text-gray-300">
                Transfer Ether
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col">
                <label className="text-gray-700 dark:text-gray-300 mb-1">
                  Recipient Address
                </label>
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="0x..."
                  className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-700 dark:text-gray-300 mb-1">
                  Amount (Ether)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="e.g., 0.1"
                  className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <Button onClick={sendEther} variant="outline" className="w-full">
                Send Ether
              </Button>
              {txStatus && (
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                  {txStatus}
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default EtherTransfer;
