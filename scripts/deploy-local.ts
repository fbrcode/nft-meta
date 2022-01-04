// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
//import { createAlchemyWeb3 } from "@alch/alchemy-web3";
//import * as Web3 from "@nomiclabs/hardhat-web3";


async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // a) grab the address of the contract owner / b) grab a random wallet address
  const [owner, randomWallet] = await ethers.getSigners();

  // step #1 - deploy the contract
  const MetaNFT = await ethers.getContractFactory("MetaNFT");
  const nft = await MetaNFT.deploy();
  await nft.deployed();
  console.log("NFT contract deployed to:", nft.address);

  // define token URI (metadata)
  const tokenURI = 'https://123';

  const mint1stTx = await nft.mintNFT(randomWallet.address, tokenURI);
  await mint1stTx.wait();
  console.log('NFT index:',await nft.getCurrentIndex()); 

  //const web3 = createAlchemyWeb3(API_URL);
  //const web3 = new Web3('http://127.0.0.1:8545');


  // step #2 - define contract ABI (Application Binary Interface) & adresses
  //const contract = require("../artifacts/contracts/MetaNFT.sol/MetaNFT.json");
  //const contractAddress = nft.address;
  //const x = await web3.eth.getAccounts();
  //const nftContract = new web3.eth.Contract(contract.abi, contractAddress);


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
