// const SimpleStorage = artifacts.require("SimpleStorage");
// const TutorialToken = artifacts.require("TutorialToken");
// const ComplexStorage = artifacts.require("ComplexStorage");
const Ticket = artifacts.require("Ticket");
const TicketNFT = artifacts.require("TicketNFT");

module.exports = function (deployer) {
  // deployer.deploy(SimpleStorage);
  // deployer.deploy(TutorialToken);
  // deployer.deploy(ComplexStorage);
  deployer.deploy(Ticket);
  deployer.deploy(TicketNFT);
};
