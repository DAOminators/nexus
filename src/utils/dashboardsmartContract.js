import { ethers } from 'ethers';

// Your contract's ABI and address
const contractAddress = "YOUR_CONTRACT_ADDRESS";
const abi = [
  // Add your contract ABI here
];

let provider, signer, contract;

// Initialize the connection to Ethereum
const initializeContract = async () => {
  // Use your RPC URL (e.g., Infura or Alchemy) if MetaMask isn't available
  const rpcUrl = "https://mainnet.infura.io/v3/YOUR_PROJECT_ID"; // Replace with your RPC URL

  if (window.ethereum) {
    provider = new ethers.BrowserProvider(window.ethereum); // MetaMask
    signer = provider.getSigner();
  } else {
    // Fallback provider using an RPC URL
    provider = new ethers.JsonRpcProvider(rpcUrl);
  }
  contract = new ethers.Contract(contractAddress, abi, signer || provider);
};


// Function to create a new team
export const createTeam = async (teamName, teamDescription) => {
  if (!contract) {
    await initializeContract();
  }
  try {
    const transaction = await contract.createTeam(teamName, teamDescription);
    await transaction.wait();
    console.log("Team created successfully!");
  } catch (error) {
    console.error("Error creating team:", error);
  }
};

// Function to fetch team details by team ID
export const getTeamDetails = async (teamId) => {
  if (!contract) {
    await initializeContract();
  }
  try {
    const team = await contract.teams(teamId);
    return team;
  } catch (error) {
    console.error("Error fetching team details:", error);
  }
};

// Function to add a contributor to a team
export const addContributorToTeam = async (teamId, contributorAddress) => {
  if (!contract) {
    await initializeContract();
  }
  try {
    const transaction = await contract.addContributorToTeam(teamId, contributorAddress);
    await transaction.wait();
    console.log("Contributor added to team!");
  } catch (error) {
    console.error("Error adding contributor:", error);
  }
};
