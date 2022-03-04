const TicketNFT = artifacts.require("TicketNFT");

const IPFS_IMAGE_METADATA_URI = `https://gateway.pinata.cloud/ipfs/`;

module.exports = function (deployer) {
  deployer.deploy(TicketNFT, "TicketNFT", "TKT", IPFS_IMAGE_METADATA_URI);
};
