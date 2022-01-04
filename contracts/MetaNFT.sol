// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol"; // Library to enable console logs in the contract
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract MetaNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    //string private V;
    uint256 private newItemId;

    constructor() ERC721 ("Awair Meta NFT", "AWRM") { // Init NFT with Name & Symbol
        console.log("Awair NFT contract constructor executed");
    }

    function mintNFT(address recipient, string memory tokenURI)
        public onlyOwner
        returns (uint256 itemId)
    {
        //uint256 newItemId = _tokenIds.current();
        newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        console.log("Awair NFT minted with index", Strings.toString(newItemId));
        _tokenIds.increment();
        return newItemId;
    }

    function getCurrentIndex() 
      public view
      returns (uint256) 
    {
      return newItemId;
    }
}