import { expect } from "chai";
import { ethers } from "hardhat";
import * as crypto from "crypto";

// var wallet = new ethers.Wallet(privateKey);
// console.log("Address: " + wallet.address);

describe("MetaNFT", function () {
  it("Should return correct NFT indexes once minted", async function () {
    // generate random wallet address
    const randomPrivateKey = "0x" + crypto.randomBytes(32).toString('hex');
    const randomWallet = new ethers.Wallet(randomPrivateKey);

    // define token URI (metadata)
    const tokenURI = 'https://123';

    // setup
    const MetaNFT = await ethers.getContractFactory("MetaNFT");
    const nft = await MetaNFT.deploy();
    await nft.deployed();

    // run 1st test = index: 0
    const mint1stTx = await nft.mintNFT(randomWallet.address, tokenURI);
    await mint1stTx.wait();
    //const mint1stdResult = await nft.getCurrentIndex();
    //console.log("response =", mint1stdResult);
    //expect(mint1stdResult).to.equal(0);
    expect(await nft.getCurrentIndex()).to.equal(0);

    // run 2nd test = index: 1
    const mint2ndTx = await nft.mintNFT(randomWallet.address, tokenURI);
    await mint2ndTx.wait();
    expect(await nft.getCurrentIndex()).to.equal(1);

  });
});
