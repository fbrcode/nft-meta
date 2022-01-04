// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // deploy the contract on testnet
  const MetaNFT = await ethers.getContractFactory("MetaNFT");
  const nft = await MetaNFT.deploy();
  await nft.deployed();
  console.log("NFT contract deployed to:", nft.address);
  // contract deployed to: 0xc3723e3fefd819cC6b302d3f0D012F02C8EdF5Ab 
  // https://ropsten.etherscan.io/tx/0xb87884b3ae25a1beaee0438764cd7188532cdd99bb80ee11862042ca08622615
  // https://ropsten.etherscan.io/bytecode-decompiler?a=0xc3723e3fefd819cc6b302d3f0d012f02c8edf5ab

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
