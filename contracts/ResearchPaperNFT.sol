// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ResearchPaperNFT is ERC721URIStorage, Ownable {
    uint256 public tokenCounter; // Counter to keep track of token IDs
    mapping(uint256 => uint256) public tokenPrices; // Mapping to store NFT prices

    // Constructor allows dynamic name and symbol selection
    constructor(
        string memory name,
        string memory symbol,
        address initialOwner
    ) ERC721(name, symbol) Ownable(initialOwner) {
        tokenCounter = 0;
    }

    // Mint function allows users to mint their NFT and set themselves as owners
    function mintNFT(
        address recipient,
        string memory tokenURI,
        uint256 price
    ) public returns (uint256) {
        require(recipient != address(0), "Invalid recipient address");
        require(bytes(tokenURI).length > 0, "Empty tokenURI");
        uint256 newTokenId = tokenCounter; // Assign a new token ID
        _safeMint(recipient, newTokenId); // Mint the NFT safely
        _setTokenURI(newTokenId, tokenURI); // Set metadata URI for the token
        tokenCounter += 1; // Increment tokenCounter
        tokenPrices[newTokenId] = price; // Set the initial price of the NFT
        return newTokenId; // Return the new token ID
    }

    // Function to purchase an NFT
    function purchaseNFT(uint256 tokenId) public payable {
        address owner = ownerOf(tokenId);
        require(msg.sender != owner, "You already own this token");
        require(msg.value >= tokenPrices[tokenId], "Insufficient payment");
        uint256 price = tokenPrices[tokenId];

        // Update state first
        tokenPrices[tokenId] = 0;
        _transfer(owner, msg.sender, tokenId);

        // Transfer funds last
        payable(owner).transfer(price);
    }

    // Function to set a token price for resale
    function setTokenPrice(uint256 tokenId, uint256 price) public {
        require(ownerOf(tokenId) == msg.sender, "You are not the owner"); // Ensure caller is the owner
        require(price > 0, "Price must be greater than 0");
        tokenPrices[tokenId] = price; // Update token price
    }
}
