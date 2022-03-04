import React, { useState } from "react";
import { ethers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";
const Web3 = require("web3");
const web3 = new Web3("wss://rinkeby.infura.io/ws/v3/0f3a6fad96f04d13bbbf4654d9099af7");
// const web3 = new Web3("http://localhost:7545");
const { mnemonic, publicKey, privateKey } = require("../../secret.json");
const nftBuild = require("../../../build/contracts/TicketNFT.json");
// const contract = new web3.eth.Contract(nftBuild.abi, nftBuild.networks[5777].address);
// for rinkeby
const contract = new web3.eth.Contract(nftBuild.abi, nftBuild.networks[4].address);

export const transferTicket = async (buyer: string, ticketCid: string) => {
  const tokenURI = `https://gateway.pinata.cloud/ipfs/${ticketCid}`;

  const tokenId = await contract.methods.tokenIds(tokenURI).call();

  //OR
  // const tokenId = await contract.methods.getValueAtMapping(tokenURI).call();

  console.log(tokenId);

  const seller = await contract.methods.checkOwner(tokenId).call();
  const baseCost = await contract.methods.cost().call();
  const txnCount = await web3.eth.getTransactionCount(buyer);
  const nonce = await ethers.utils.hexlify(txnCount);

  const createTransaction = await web3.eth.accounts.signTransaction(
    {
      from: buyer,
      nonce: nonce,
      //change on new contract deployment.
      //   0x162205217344115d92A5339A27C9795f49B5Ce17
      to: contract,
      value: baseCost,
      gas: 10000000,
      gasPrice: 100000,
      data: contract.methods._transferFrom(seller, buyer, tokenId).encodeABI(),
    },
    privateKey
  );

  const createReceipt = await web3.eth
    .sendSignedTransaction(createTransaction.rawTransaction)
    .once("sending", () => {
      console.log("sending...");
      // setLoading(true);
      // setOpen(true);
    })
    .once("sent", () => {
      console.log("sent");
    })
    .on("confirmation", (confNumber: any, receipt: any, latestBlockHash: any) => {
      console.log(confNumber, receipt, latestBlockHash);
      // setLoading(false);
    })
    .on("error", (error: any) => {
      console.log(error);
    });

  console.log(`Transaction successful with hash: ${createReceipt.transactionHash}`);
};
