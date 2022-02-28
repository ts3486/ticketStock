import React, { useState } from "react";
import { ethers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";
const Web3 = require("web3");
// const web3 = new Web3("wss://rinkeby.infura.io/ws/v3/0f3a6fad96f04d13bbbf4654d9099af7");
const web3 = new Web3("http://localhost:7545");
const { mnemonic, publicKey, privateKey } = require("../../secret.json");
const nftBuild = require("../../../build/contracts/TicketNFT.json");
const contract = new web3.eth.Contract(nftBuild.abi, nftBuild.networks[5777].address);
// const contract = new web3.eth.Contract(nftBuild.abi, nftBuild.networks[4].address); for rinkeby

export const transferTicket = async (buyer: string, tokenId: number) => {
  // get address of current USER => get current OWNER of NFT with checkowner() => how to get ticketId.

  const seller = await contract.methods.checkowner().call();
  const baseCost = await contract.methods.cost().call();
  const txnCount = await web3.eth.getTransactionCount(buyer);
  const nonce = await ethers.utils.hexlify(txnCount);

  const createTransaction = await web3.eth.accounts.signTransaction(
    {
      from: seller,
      nonce: nonce,
      to: "0x1EB590B195F9463b19C612BaA6b947622434DdF3",
      value: baseCost,
      gas: 500000,
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
