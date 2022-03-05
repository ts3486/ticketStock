import React, { useState } from "react";
import { ethers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";
const { mnemonic, publicKey, privateKey, projectId } = require("../../secret.json");
const Web3 = require("web3");
// const web3 = new Web3(`wss://rinkeby.infura.io/ws/v3/${projectId}`);
const web3 = new Web3("http://localhost:7545");
const nftBuild = require("../../../build/contracts/TicketNFT.json");
const contract = new web3.eth.Contract(nftBuild.abi, nftBuild.networks[5777].address);
// for rinkeby
// const contract = new web3.eth.Contract(nftBuild.abi, nftBuild.networks[4].address);

export const mintTicket = async (account: string, ticketURI: string) => {
  console.log(contract);
  console.log(account, ticketURI);

  const baseCost = await contract.methods.cost().call();
  const txnCount = await web3.eth.getTransactionCount(account);
  const nonce = await ethers.utils.hexlify(txnCount);

  const createTransaction = await web3.eth.accounts.signTransaction(
    {
      from: account,
      nonce: nonce,
      to: contract._address,
      value: baseCost,
      gas: 300000,
      gasPrice: 2500000,
      data: contract.methods.mintTicket(ticketURI).encodeABI(),
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

  const tokenId = Web3.utils.hexToNumber(createReceipt.logs[0].topics[3]);
  return tokenId;
};
