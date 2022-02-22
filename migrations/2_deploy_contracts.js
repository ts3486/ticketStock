// const SimpleStorage = artifacts.require("SimpleStorage");
// const TutorialToken = artifacts.require("TutorialToken");
// const ComplexStorage = artifacts.require("ComplexStorage");
const TicketNFT = artifacts.require("TicketNFT");

const IPFS_IMAGE_METADATA_URI = `https://gateway.pinata.cloud/ipfs/QmUojKBcTFu9vNEGp2AVjPn2t6TXFstBKt9rQHkjjjXMJd/`;

module.exports = function (deployer) {
  // deployer.deploy(SimpleStorage);
  // deployer.deploy(TutorialToken);
  // deployer.deploy(ComplexStorage);
  deployer.deploy(TicketNFT, "TicketNFT", "TKT", IPFS_IMAGE_METADATA_URI);
};
