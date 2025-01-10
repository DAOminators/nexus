"use client";

import { PinataSDK } from "pinata-web3";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import ResearchPaperNFT from "./ResearchPaperNFT.json";

const pinata = new PinataSDK({
  pinataJwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhMDBmZmY1My0xMzRhLTQ2MzQtODNhZC0yMDlmMWQyOTg2NTYiLCJlbWFpbCI6Indvcmtpbmd1c2U1QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI4ZDlmNjFiZjMzZjAzMjE1OTJiZSIsInNjb3BlZEtleVNlY3JldCI6IjA5YmUxMTM4ZTQ4MjJjMzA2ZmEzZWNkZDcxNTQwZDM2MWNlYWJlMTRkMjkzZjRiYzQxMjQ4YTU4MzQ3YTU5ZDgiLCJleHAiOjE3NjgwNDk1NDZ9.S1xmo_EJDt1HV9WbDMrWmXoyG3ueeYAbBMUDsiCW2zk",
  pinataGateway: "ivory-top-clownfish-542.mypinata.cloud",
});

function UploadPaper() {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [price, setPrice] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const [metadataIpfsUrl, setMetadataIpfsUrl] = useState("");
  const [error, setError] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [userAddress, setUserAddress] = useState("");
  
  // Initialize provider
  const provider = typeof window !== 'undefined' ? new ethers.providers.Web3Provider(window.ethereum) : null;
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setError("");
  };

  const connectWallet = async () => {
    if (!provider) {
      setError("Please install MetaMask!");
      return;
    }

    try {
      setUploadStatus("Connecting to wallet...");
      await provider.send("eth_requestAccounts", []);
      
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      
      setUserAddress(address);
      setIsConnected(true);
      setUploadStatus("Wallet connected successfully!");
      setError("");
    } catch (error) {
      console.error("Connection error:", error);
      setError(`Failed to connect wallet: ${error.message}`);
      setIsConnected(false);
    }
  };

  const upload = async () => {
    if (!file || !name || !symbol || !price) {
      setError("Please fill in all fields and select a file.");
      return;
    }

    if (!isConnected) {
      setError("Please connect your wallet first.");
      return;
    }

    try {
      setUploadStatus("Uploading file to IPFS...");
      setError("");

      const upload = await pinata.upload.file(file);
      const ipfsUrl = `https://${pinata.gateways.config.pinataGateway}/ipfs/${upload.IpfsHash}`;
      console.log("IPFS URL:", ipfsUrl);

      setUploadStatus("Creating metadata...");
      const metadata = {
        name: name,
        symbol: symbol,
        description: `This NFT represents a research paper titled ${name}.`,
        file: ipfsUrl,
      };

      const metadataUpload = await pinata.upload.json(metadata);
      const metadataIpfsUrl = `https://${pinata.gateways.config.pinataGateway}/ipfs/${metadataUpload.IpfsHash}`;
      setMetadataIpfsUrl(metadataIpfsUrl);
      
      setUploadStatus("Minting NFT...");
      const receipt = await mintNFT(metadataIpfsUrl, price);
      setUploadStatus(`NFT minted successfully! Transaction hash: ${receipt.transactionHash}`);
    } catch (error) {
      console.error("Upload error:", error);
      setError(error.message || "An error occurred during the upload process.");
      setUploadStatus("");
    }
  };

  const mintNFT = async (metadataIpfsUrl, price) => {
    try {
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        ResearchPaperNFT.abi,
        signer
      );

      const priceInWei = ethers.utils.parseEther(price.toString());
      
      // Check balance
      const balance = await signer.getBalance();
      if (balance.lt(priceInWei)) {
        throw new Error("Insufficient funds to mint NFT");
      }

      const tx = await contract.mintNFT(
        await signer.getAddress(),
        metadataIpfsUrl,
        priceInWei
      );

      console.log("Transaction submitted, waiting for confirmation...");
      const receipt = await tx.wait();
      console.log("NFT minted successfully:", receipt);
      return receipt;

    } catch (error) {
      console.error("Minting error:", error);
      if (error.code === 4001) {
        throw new Error("Transaction rejected by the user.");
      } else if (error.message.includes("insufficient funds")) {
        throw new Error("Not enough funds to mint the NFT.");
      }
      throw new Error(error.message || "Failed to mint NFT.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Upload Research Paper</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <div className="mb-4">
          <button
            onClick={connectWallet}
            className={`w-full ${isConnected ? 'bg-green-500' : 'bg-blue-500'} text-white py-2 rounded-md hover:opacity-90 transition`}
          >
            {isConnected ? `Connected: ${userAddress.slice(0, 6)}...${userAddress.slice(-4)}` : 'Connect Wallet'}
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Paper Title</label>
          <input
            type="text"
            placeholder="Enter the paper's title"
            className="w-full p-2 border rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Symbol</label>
          <input
            type="text"
            placeholder="Enter the symbol (e.g., PAPER)"
            className="w-full p-2 border rounded-md"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Price (ETH)</label>
          <input
            type="number"
            step="0.0001"
            min="0"
            placeholder="Enter price in ETH"
            className="w-full p-2 border rounded-md"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Upload PDF</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <button
          onClick={upload}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition disabled:bg-blue-300"
          disabled={!file || !name || !symbol || !price || !isConnected}
        >
          Upload and Mint NFT
        </button>

        {uploadStatus && (
          <div className="mt-4 p-3 bg-blue-100 text-blue-700 rounded-md">
            {uploadStatus}
          </div>
        )}

        {metadataIpfsUrl && (
          <a
            href={metadataIpfsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-4 text-blue-500 hover:text-blue-600 underline text-center"
          >
            View Metadata on IPFS
          </a>
        )}
      </div>
    </div>
  );
}

export default UploadPaper;